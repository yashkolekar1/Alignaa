import { useEffect, useRef, useState } from "react";

const videoSource = import.meta.env.VITE_ALIGNAA_HERO_VIDEO?.trim() || "/assets/alignaa-hero.mp4";

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSource) return;
    if (reducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }
    video.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [reducedMotion]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video || hasFailed) return;
    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`hero-media${hasFailed || !videoSource ? " is-poster-only" : ""}`}>
      <img
        className="hero-poster"
        src="/assets/alignaa-video-poster.svg"
        alt=""
        aria-hidden="true"
      />
      {videoSource && (
        <video
          ref={videoRef}
          className={`hero-video${hasFailed ? " is-hidden" : ""}`}
          src={videoSource}
          poster="/assets/alignaa-video-poster.svg"
          muted
          loop
          playsInline
          autoPlay={!reducedMotion}
          preload="auto"
          aria-label="Alignaa homepage film"
          onCanPlay={() => setIsReady(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasFailed(true)}
        />
      )}
      <div className="hero-media-caption">
        <span className="media-status-dot" aria-hidden="true" />
        {videoSource && !hasFailed ? "Alignaa patient footage" : "Approved hero video pending"}
      </div>
      <button
        className="video-control"
        type="button"
        onClick={togglePlayback}
        disabled={!videoSource || hasFailed}
        aria-label={isPlaying ? "Pause hero video" : "Play hero video"}
        title={videoSource ? (isPlaying ? "Pause video" : "Play video") : "Approved video asset pending"}
      >
        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
      </button>
      {videoSource && !isReady && !hasFailed && (
        <span className="video-loading-note">Loading video…</span>
      )}
    </div>
  );
}
