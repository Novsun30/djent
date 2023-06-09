import { createContext } from "react";
import * as Tone from "tone";
import { Sampler } from "tone";
import distortionGuitarA4 from "../assets/sound/distortionGuitar/A4.wav";
import distortionGuitarA5 from "../assets/sound/distortionGuitar/A5.wav";
import synthC4 from "../assets/sound/synth/C4.wav";
import synthC5 from "../assets/sound/synth/C5.wav";
import pianoC4 from "../assets/sound/piano/C4.mp3";
import pianoA4 from "../assets/sound/piano/A4.mp3";
import pianoC2 from "../assets/sound/piano/C2.mp3";
import pianoC3 from "../assets/sound/piano/C3.mp3";
import bassE1 from "../assets/sound/bass/E1.wav";
import bassD2 from "../assets/sound/bass/D2.wav";
import kickSound from "../assets/sound/drum/kick.wav";
import snareSound from "../assets/sound/drum/snare.wav";
import hiTomSound from "../assets/sound/drum/hiTom.wav";
import midTomSound from "../assets/sound/drum/midTom.wav";
import floorTomSound from "../assets/sound/drum/floorTom.wav";
import closedHiHatSound from "../assets/sound/drum/closedHiHat.wav";
import openHiHatSound from "../assets/sound/drum/openHiHat.wav";
import rideSound from "../assets/sound/drum/ride.wav";
import crashSound from "../assets/sound/drum/crash.wav";
import sideStickSound from "../assets/sound/drum/sideStick.wav";

const SoundContext = createContext({
  Sine: new Tone.Synth().toDestination(),
  Dist_Guitar: new Sampler({
    urls: { A4: distortionGuitarA4, A5: distortionGuitarA5 },
    volume: -15,
  }).toDestination(),
  Synth: new Sampler({
    urls: { C4: synthC4, C5: synthC5 },
    volume: -12,
  }).toDestination(),
  Piano: new Sampler({
    urls: { C4: pianoC4, A4: pianoA4 },
    volume: 0,
  }).toDestination(),
  Piano_Lower: new Sampler({
    urls: { C2: pianoC2, C3: pianoC3 },
    volume: 0,
  }).toDestination(),
  Bass: new Sampler({
    urls: { E1: bassE1, D2: bassD2 },
    volume: -15,
  }).toDestination(),
  Drum: {
    kick: new Tone.Player(kickSound).toDestination(),
    snare: new Tone.Player(snareSound).toDestination(),
    hiTom: new Tone.Player(hiTomSound).toDestination(),
    midTom: new Tone.Player(midTomSound).toDestination(),
    floorTom: new Tone.Player(floorTomSound).toDestination(),
    closedHiHat: new Tone.Player({
      url: closedHiHatSound,
      volume: -5,
    }).toDestination(),
    openHiHat: new Tone.Player(openHiHatSound).toDestination(),
    ride: new Tone.Player(rideSound).toDestination(),
    crash: new Tone.Player(crashSound).toDestination(),
    sideStick: new Tone.Player(sideStickSound).toDestination(),
  },
});

export default SoundContext;
