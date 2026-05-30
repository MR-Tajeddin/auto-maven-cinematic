"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const mobileVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const lastClipRef = useRef(0);
  const [activeClip, setActiveClip] = useState(0);
  const [mobileClip, setMobileClip] = useState(0);

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

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let retryFrame = 0;
    let videosBound = false;
    const cleanups: Array<() => void> = [];

    const getVideos = () =>
      videoRefs.current.filter(Boolean) as HTMLVideoElement[];

    const onMetaReady = () => {
      if (scrollTriggerRef.current) {
        syncVideosToProgress(scrollTriggerRef.current.progress);
      } else {
        syncVideosToProgress(0);
      }
    };

    const setupScrollTrigger = () => {
      if (cancelled || scrollTriggerRef.current) return;

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
      if (ready) setupScrollTrigger();
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
          trySetup();
        };

        video.addEventListener("loadedmetadata", onMeta);
        video.addEventListener("loadeddata", onMeta);
        cleanups.push(() => {
          video.removeEventListener("loadedmetadata", onMeta);
          video.removeEventListener("loadeddata", onMeta);
        });

        if (video.readyState >= 1 && video.duration) {
          onMeta();
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
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(section);
      cleanups.push(() => resizeObserver.disconnect());

      const onLoad = () => ScrollTrigger.refresh();
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

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) return;

    const videos = mobileVideoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (!videos.length) return;

    videos.forEach((video, index) => {
      video.muted = true;
      video.playsInline = true;
      video.preload = index === mobileClip ? "auto" : "metadata";
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      if (index !== mobileClip) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          // metadata not ready
        }
      }
    });

    const activeVideo = videos[mobileClip];
    if (!activeVideo) return;

    const play = () => {
      activeVideo.play().catch(() => {
        // Mobile browsers may wait for a user gesture; the poster/first frame remains visible.
      });
    };

    const onEnded = () => {
      setMobileClip((current) => Math.min(current + 1, CLIP_COUNT - 1));
    };

    activeVideo.addEventListener("loadeddata", play, { once: true });
    activeVideo.addEventListener("ended", onEnded);

    if (activeVideo.readyState >= 2) {
      play();
    } else {
      activeVideo.load();
    }

    return () => {
      activeVideo.removeEventListener("loadeddata", play);
      activeVideo.removeEventListener("ended", onEnded);
    };
  }, [mobileClip]);

  return (
    <div id="cinematic-hero" className="bg-black">
      <section ref={sectionRef} className="relative hidden h-[330vh] bg-black md:block">
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
              preload="auto"
              className={`absolute inset-0 h-full w-full origin-center object-cover scale-[1.08] -translate-y-[2%] transition-opacity duration-500 ${
                activeClip === index ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              aria-hidden={activeClip !== index}
            />
          ))}
        </div>
      </section>

      <section className="relative min-h-[100svh] overflow-hidden bg-black md:hidden">
        {clips.map((clip, index) => (
          <video
            key={`mobile-${clip.src}`}
            ref={(element) => {
              mobileVideoRefs.current[index] = element;
            }}
            src={clip.src}
            muted
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            poster="/hero/keyframe/keyframe-01-showroom-wide.png"
            className={`absolute inset-0 h-full w-full origin-center object-cover scale-[1.24] transition-opacity duration-700 ${
              mobileClip === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={mobileClip !== index}
          />
        ))}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/20 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-10 pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
            Auto Maven
          </p>
          <h1 className="mt-3 max-w-sm text-4xl font-black leading-none tracking-tight text-white">
            Buy. Sell. Trade. Source.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
            Premium automotive guidance and vehicle sourcing across Toronto and the GTA.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href="#inventory"
              className="rounded-full bg-[#d4af37] px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-[#e6c35c]"
            >
              Inventory
            </a>
            <a
              href="#find-my-car"
              className="rounded-full border border-white/20 bg-black/30 px-4 py-3 text-center text-sm font-bold text-white backdrop-blur transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Find My Car
            </a>
          </div>

          <div className="mt-5 flex gap-2">
            {clips.map((clip, index) => (
              <span
                key={`mobile-dot-${clip.src}`}
                className={`h-1.5 flex-1 rounded-full transition ${
                  index <= mobileClip ? "bg-[#d4af37]" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
