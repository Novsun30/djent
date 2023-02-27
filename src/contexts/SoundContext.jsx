import { createContext } from "react";
import * as Tone from "tone";
import { Sampler } from "tone";

const SoundContext = createContext({
  sine: new Tone.Synth().toDestination(),
  Distortion_Guitar: new Sampler({
    urls: { A4: "sound/distortionGuitar/A4.wav", A5: "sound/distortionGuitar/A5.wav" },
    volume: -15,
  }).toDestination(),
  synth: new Sampler({
    urls: { C4: "sound/synth/C4.wav", C5: "sound/synth/C5.wav" },
    volume: -12,
  }).toDestination(),
  piano: new Sampler({
    urls: { C4: "sound/piano/C4.mp3", A4: "sound/piano/A4.mp3" },
    volume: 0,
  }).toDestination(),
  piano_lower: new Sampler({
    urls: { C4: "sound/piano/C4.mp3", A4: "sound/piano/A4.mp3" },
    volume: 0,
  }).toDestination(),
  bass: new Sampler({
    urls: { E1: "sound/bass/E1.wav", D2: "sound/bass/D2.wav" },
    volume: -15,
  }).toDestination(),
  drum: {
    kick: new Tone.Player("sound/drum/kick.wav").toDestination(),
    snare: new Tone.Player("sound/drum/snare.wav").toDestination(),
    closedHiHat: new Tone.Player("sound/drum/closedHiHat.wav").toDestination(),
  },
});

export default SoundContext;
