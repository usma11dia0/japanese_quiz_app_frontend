import { useState } from "react";
import { Howl } from "howler";

export const useAudio = () => {
  const [sound, setSound] = useState<Howl>();

  const playAudio = (audioSrc: string, volume?: number) => {
    const sound = new Howl({
      src: [audioSrc],
      format: ["mp3", "wav"],
    });
    setSound(sound);
    sound.volume(volume ? volume : 0.5);
    sound.play();
  };
  return { playAudio, sound };
};
