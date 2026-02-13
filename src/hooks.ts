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

export function useTypewriter(text: string, speed: number = 30, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, prefersReducedMotion]);

  return { displayedText, isComplete };
}

export function useBackgroundMusic(src: string, loop = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasUserInteractedRef = useRef(false);

  useEffect(() => {
    // Create audio element - iOS Safari works better with DOM elements
    const audio = document.createElement("audio");
    audio.src = src;
    audio.loop = loop;
    // iOS Safari requires these attributes
    audio.setAttribute("playsinline", "true");
    audio.setAttribute("preload", "auto");
    audio.setAttribute("webkit-playsinline", "true");
    // Don't set crossOrigin unless CORS is properly configured
    // audio.crossOrigin = "anonymous";

    // Add to DOM (hidden) - helps with iOS Safari compatibility
    audio.style.display = "none";
    audio.style.position = "absolute";
    audio.style.visibility = "hidden";
    document.body.appendChild(audio);

    audioRef.current = audio;

    const onCanPlay = () => setIsReady(true);
    const onLoadedData = () => setIsReady(true);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = (e: Event) => {
      console.log("Audio loading error:", e);
      const target = e.target as HTMLAudioElement;
      if (target.error) {
        console.log(
          "Audio error code:",
          target.error.code,
          "message:",
          target.error.message,
        );
      }
    };

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    audio.addEventListener("error", onError);

    // Try to load immediately
    try {
      audio.load();
    } catch (err) {
      console.log("Audio load error:", err);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      audio.removeEventListener("error", onError);
      // Remove from DOM
      if (audio.parentNode) {
        audio.parentNode.removeChild(audio);
      }
    };
  }, [src, loop]);

  const play = () => {
    if (!audioRef.current) return;

    // iOS Safari requires play() to be called synchronously from user interaction
    // Don't use async/await here as it breaks the call stack
    try {
      const audio = audioRef.current;

      // If not ready, try to load first
      if (audio.readyState < 2) {
        audio.load();
      }

      // iOS Safari: play() must be called synchronously
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        // Handle promise but don't await - iOS needs synchronous call
        playPromise
          .then(() => {
            setIsPlaying(true);
            hasUserInteractedRef.current = true;
          })
          .catch((error) => {
            console.log("Audio play error:", error);
            setIsPlaying(false);
          });
      } else {
        // If play() doesn't return a promise, assume it started
        setIsPlaying(true);
        hasUserInteractedRef.current = true;
      }
    } catch (error) {
      console.log("Audio play error:", error);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.pause();
      setIsPlaying(false);
    } catch (error) {
      console.log("Audio pause error:", error);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const playFrom = (startSeconds: number) => {
    if (!audioRef.current) return;

    try {
      const audio = audioRef.current;

      // If not ready, try to load first
      if (audio.readyState < 2) {
        audio.load();
      }

      // Set time first
      audio.currentTime = startSeconds;

      // iOS Safari: play() must be called synchronously
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            hasUserInteractedRef.current = true;
          })
          .catch((error) => {
            console.log("Audio playFrom error:", error);
            setIsPlaying(false);
          });
      } else {
        setIsPlaying(true);
        hasUserInteractedRef.current = true;
      }
    } catch (error) {
      console.log("Audio playFrom error:", error);
      setIsPlaying(false);
    }
  };

  return { isReady, isPlaying, play, playFrom, pause, toggle };
}
