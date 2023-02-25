import { createContext } from "react";
import * as Tone from "tone";
import { Sampler } from "tone";

const SoundContext = createContext({
  sine: new Tone.Synth().toDestination(),
  Distortion_Guitar: new Sampler({
    urls: { A4: "distortionGuitar/A4.wav", A5: "distortionGuitar/A5.wav" },
    volume: -12,
  }).toDestination(),
  synth: new Sampler({
    urls: { C4: "synth/C4.wav", C5: "synth/C5.wav" },
    volume: -12,
  }).toDestination(),
  piano: new Sampler({
    urls: { C4: "piano/C4.mp3", A4: "piano/A4.mp3" },
    volume: 0,
  }).toDestination(),
});

export default SoundContext;
