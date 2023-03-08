import { createContext } from "react";
import * as Tone from "tone";
import { Sampler } from "tone";

const SoundContext = createContext({
  Sine: new Tone.Synth().toDestination(),
  Dist_Guitar: new Sampler({
    urls: { A4: "sound/distortionGuitar/A4.wav", A5: "sound/distortionGuitar/A5.wav" },
    volume: -15,
  }).toDestination(),
  Synth: new Sampler({
    urls: { C4: "sound/synth/C4.wav", C5: "sound/synth/C5.wav" },
    volume: -12,
  }).toDestination(),
  Piano: new Sampler({
    urls: { C4: "sound/piano/C4.mp3", A4: "sound/piano/A4.mp3" },
    volume: 0,
  }).toDestination(),
  Piano_Lower: new Sampler({
    urls: { C2: "sound/piano/C2.mp3", C3: "sound/piano/C3.mp3" },
    volume: 0,
  }).toDestination(),
  Bass: new Sampler({
    urls: { E1: "sound/bass/E1.wav", D2: "sound/bass/D2.wav" },
    volume: -15,
  }).toDestination(),
  Drum: {
    kick: new Tone.Player("sound/drum/kick.wav").toDestination(),
    snare: new Tone.Player("sound/drum/snare.wav").toDestination(),
    hiTom: new Tone.Player("sound/drum/hiTom.wav").toDestination(),
    midTom: new Tone.Player("sound/drum/midTom.wav").toDestination(),
    floorTom: new Tone.Player("sound/drum/floorTom.wav").toDestination(),
    closedHiHat: new Tone.Player({
      url: "sound/drum/closedHiHat.wav",
      volume: -5,
    }).toDestination(),
    openHiHat: new Tone.Player("sound/drum/openHiHat.wav").toDestination(),
    ride: new Tone.Player("sound/drum/ride.wav").toDestination(),
    crash: new Tone.Player("sound/drum/crash.wav").toDestination(),
    sideStick: new Tone.Player("sound/drum/sideStick.wav").toDestination(),
  },
});

export default SoundContext;
