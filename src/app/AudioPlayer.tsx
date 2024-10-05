"use client";

import { useImperativeHandle, forwardRef, useRef } from "react";

const AudioPlayer = forwardRef((props, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Permite que o componente pai acesse a função de play
  useImperativeHandle(ref, () => ({
    playAudio() {
      if (audioRef.current) {
        audioRef.current.play();
      }
    },
  }));

  return <audio ref={audioRef} src="/audio.mp3" />;
});

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;