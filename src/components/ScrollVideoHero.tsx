"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ScrollTriggerHandle = {
  progress: number;
  kill: () => void;
};

const CLIP_COUNT = 3;
const SEGMENT_SIZE = 1 / CLIP_COUNT;

const clips = [
  { src: "/hero/optimized/1.mp4" },
  { src: "/hero/optimized/2.mp4" },
  { src: "/hero/optimized/3.mp4" },
] as const;

function getClipIndex(progress: number): number {
  if (progress >= 1) return CLIP_COUNT - 1;
  return Math.min(CLIP_COUNT - 1, Math.floor(progress * CLIP_COUNT));
}

function getSegmentProgress(progress: number, clipIndex: number): number {
  const segmentStart = clipIndex * SEGMENT_SIZE;
  const segmentEnd = (clipIndex + 1) * SEGMENT_SIZE;
  const span = segmentEnd - segmentStart;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (progress - segmentStart) / span));
}

function seekVideo(video: HTMLVideoElement, time: number) {
  const duration = video.duration;
  if (!duration || !Number.isFinite(duration)) return;

  const target = Math.min(Math.max(0, time), duration - 0.001);
  if (Math.abs(video.currentTime - target) < 0.02) return;

  video.pause();
  try {
    if ("fastSeek" in video && typeof video.fastSeek === "function") {
      video.fastSeek(target);
    } else {
      video.currentTime = target;
    }
  } catch {
    // Safari can throw if metadata is not fully ready; ignore and retry later.
  }
}

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTriggerHandle | null>(null);
  const lastClipRef = useRef(0);
  const [activeClip, setActiveClip] = useState(0);

  const syncVideosToProgress = useCallback((progress: number) => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (videos.length !== CLIP_COUNT) return;

    const clipIndex = getClipIndex(progress);
    const segmentProgress = getSegmentProgress(progress, clipIndex);

    videos.forEach((video, index) => {
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) {
        video.pause();
        if (video.currentTime !== 0) {
          try {
            video.currentTime = 0;
          } catch {
            // wait for metadata
          }
        }
        return;
      }

      if (index === clipIndex) {
        seekVideo(video, segmentProgress * duration);
      } else if (index < clipIndex) {
        seekVideo(video, duration - 0.05);
      } else {
        seekVideo(video, 0);
      }
    });

    if (lastClipRef.current !== clipIndex) {
      lastClipRef.current = clipIndex;
      setActiveClip(clipIndex);
    }
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let retryFrame = 0;
    let videosBound = false;
    const cleanups: Array<() => void> = [];
    let refreshScrollTrigger = () => {};

    const getVideos = () =>
      videoRefs.current.filter(Boolean) as HTMLVideoElement[];

    const onMetaReady = () => {
      if (scrollTriggerRef.current) {
        syncVideosToProgress(scrollTriggerRef.current.progress);
      } else {
        syncVideosToProgress(0);
      }
    };

    const setupScrollTrigger = async () => {
      if (cancelled || scrollTriggerRef.current) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || scrollTriggerRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      refreshScrollTrigger = () => ScrollTrigger.refresh();

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          syncVideosToProgress(self.progress);
        },
      });

      syncVideosToProgress(scrollTriggerRef.current.progress);
      ScrollTrigger.refresh();
    };

    const trySetup = () => {
      const ready = videoRefs.current.every(
        (video) =>
          video &&
          video.readyState >= 1 &&
          video.duration &&
          Number.isFinite(video.duration),
      );
      if (ready) void setupScrollTrigger();
    };

    const bindVideos = () => {
      if (videosBound) return true;

      const videos = getVideos();
      if (videos.length !== CLIP_COUNT) return false;

      videosBound = true;

      videos.forEach((video) => {
        video.pause();
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        try {
          video.currentTime = 0;
        } catch {
          // metadata not ready
        }

        const onMeta = () => {
          onMetaReady();
          void trySetup();
        };

        video.addEventListener("loadedmetadata", onMeta);
        video.addEventListener("loadeddata", onMeta);
        cleanups.push(() => {
          video.removeEventListener("loadedmetadata", onMeta);
          video.removeEventListener("loadeddata", onMeta);
        });

        if (video.readyState >= 1 && video.duration) {
          void onMeta();
        } else {
          video.load();
        }
      });

      return true;
    };

    const init = () => {
      if (cancelled) return;
      if (!bindVideos()) {
        retryFrame = requestAnimationFrame(init);
        return;
      }

      const resizeObserver = new ResizeObserver(() => {
        refreshScrollTrigger();
      });
      resizeObserver.observe(section);
      cleanups.push(() => resizeObserver.disconnect());

      const onLoad = () => refreshScrollTrigger();
      window.addEventListener("load", onLoad);
      cleanups.push(() => window.removeEventListener("load", onLoad));
    };

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(retryFrame);
      cleanups.forEach((fn) => fn());
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      getVideos().forEach((video) => {
        video.pause();
      });
    };
  }, [syncVideosToProgress]);

  return (
    <div id="cinematic-hero" className="bg-black">
      <section
        ref={sectionRef}
        className="relative hidden h-[330vh] bg-black md:block"
      >
        <div className="sticky top-0 z-30 h-screen overflow-hidden bg-black">
          {clips.map((clip, index) => (
            <video
              key={clip.src}
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              src={clip.src}
              muted
              playsInline
              preload="none"
              poster="/hero/keyframe/keyframe-01-showroom-wide.png"
              className={`absolute inset-0 h-full w-full origin-center object-cover scale-[1.08] -translate-y-[2%] transition-opacity duration-500 ${
                activeClip === index ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              aria-hidden={activeClip !== index}
            />
          ))}
        </div>
      </section>

      <section className="relative min-h-[100svh] overflow-hidden bg-black md:hidden">
        <Image
          src="/hero/keyframe/keyframe-01-showroom-wide.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.05] object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.22),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.55),rgba(0,0,0,0.98))]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-9 pt-28">
          <div className="mb-5 inline-flex w-fit rounded-full border border-[#d4af37]/30 bg-black/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37] backdrop-blur-md">
            Toronto / GTA Automotive Sourcing
          </div>

          <h1 className="max-w-sm text-5xl font-black leading-[0.9] tracking-tight text-white drop-shadow-2xl">
            Auto Maven
          </h1>

          <p className="mt-4 max-w-sm text-lg font-semibold leading-6 text-white/90">
            Buy. Sell. Trade. Source.
          </p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/62">
            Premium used vehicle guidance, market-based pricing, financing, and custom sourcing across Toronto and the GTA.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <a
              href="#inventory"
              className="rounded-full bg-[#d4af37] px-5 py-3.5 text-center text-sm font-black text-black shadow-[0_14px_40px_rgba(212,175,55,0.25)] transition hover:bg-[#e6c35c]"
            >
              Browse Inventory
            </a>
            <a
              href="#find-my-car"
              className="rounded-full border border-white/20 bg-white/[0.06] px-5 py-3.5 text-center text-sm font-bold text-white backdrop-blur-md transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Find My Car
            </a>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-white/62">
            <span className="rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur">
              OMVIC
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur">
              Finance
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-2 py-2 backdrop-blur">
              Sourcing
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
