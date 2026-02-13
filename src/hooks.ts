import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    query.addEventListener("change", listener);
    return () => {
      query.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
}

export function useBackgroundMusic(src: string, loop = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audioRef.current = audio;
    const onCanPlay = () => setIsReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
    };
  }, [src, loop]);

  const play = async () => {
    if (!audioRef.current || !isReady) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      // autoplay might be blocked; user can tap again
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  };

  const playFrom = async (startSeconds: number) => {
    if (!audioRef.current || !isReady) return;
    audioRef.current.currentTime = startSeconds;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      // ignore autoplay errors
    }
  };

  return { isReady, isPlaying, play, playFrom, pause, toggle };
}
