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
    // iOS Safari requires these attributes
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("preload", "auto");
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const onCanPlay = () => setIsReady(true);
    const onLoadedData = () => setIsReady(true);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("loadeddata", onLoadedData);
    // Try to load immediately
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("loadeddata", onLoadedData);
    };
  }, [src, loop]);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      // For iOS, ensure audio is loaded
      if (audioRef.current.readyState < 2) {
        await new Promise((resolve) => {
          const onCanPlay = () => {
            audioRef.current?.removeEventListener("canplay", onCanPlay);
            resolve(undefined);
          };
          audioRef.current?.addEventListener("canplay", onCanPlay);
          audioRef.current?.load();
        });
      }
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Audio play error:", error);
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
    if (!audioRef.current) return;
    try {
      // For iOS, ensure audio is loaded
      if (audioRef.current.readyState < 2) {
        await new Promise((resolve) => {
          const onCanPlay = () => {
            audioRef.current?.removeEventListener("canplay", onCanPlay);
            resolve(undefined);
          };
          audioRef.current?.addEventListener("canplay", onCanPlay);
          audioRef.current?.load();
        });
      }
      audioRef.current.currentTime = startSeconds;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Audio playFrom error:", error);
      // ignore autoplay errors
    }
  };

  return { isReady, isPlaying, play, playFrom, pause, toggle };
}
