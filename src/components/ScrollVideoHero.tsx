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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
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

  return (
    <section
      id="cinematic-hero"
      ref={sectionRef}
      className="relative h-[330vh] bg-black"
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
            preload="auto"
            className={`absolute inset-0 h-full w-full origin-center object-cover scale-[1.08] -translate-y-[2%] transition-opacity duration-500 ${
              activeClip === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            aria-hidden={activeClip !== index}
          />
        ))}
      </div>
    </section>
  );
}
