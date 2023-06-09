<h1 align="center">
    <img/ src="https://github.com/Novsun30/djent/assets/107986642/1de29e44-607f-4742-a719-e36f04b69426" width="45px">
    <br/>
  Djent
</h1>
<h4 align="center">
Djent is an online sequencer that helps you make your own music.<br/>
Access here: <a href="https://djent-28b47.web.app" target="_blank">https://djent-28b47.web.app</a> 
</h4>



## Table of contents
+ [Technology stack](#technology-stack)
+ [Features](#features)
+ [Usage](#usage)
+ [License](#license)

---

## Technology stack 
[Djent](https://djent-28b47.web.app) was mainly built by [React](https://react.dev/) for front-end and [Firebase](https://firebase.google.com/) for back-end. \
I also used [Tone.js](https://tonejs.github.io/) for creating audio, scheduling audio and playing audio.

+ Front-end:
  + HTML5
  + styled-components
  + JavaScript
  + React
  + Tone.js
+ Back-end:
  + Firebase
    + Hosting
    + Cloud Firestore
    + Authentication 

---

## Features
+ Variable sounds: There are seven different sound that you can use.
+ Multitrack: You can add as many tracks as you like to your project.
+ Editable note: Note can be applied with different length and pitch. 
+ Change key easily: With just one click, you can change key quickly.
+ Save and load: After sign up for a membership, you can save or load your project.

---

## Usage 

+ [Get started](#get-started)
+ [Control panel](#control-panel)

  ---

  ### Get started 

  From the index page, click the "get started" button to go to the editor page. \
  In editor page, you need to add new track first. Simply click the "edit track" <img src="https://github.com/Novsun30/taipei-day-trip/assets/107986642/2e412472-1cce-4ae6-8712-9b30a1d91292" alt="editTrackButton" title="editTrackButton" width="70"/> 
  button, and select what track you want to add.  
  <img src="https://github.com/Novsun30/Assignments/assets/107986642/3389f166-7239-48ec-83d1-69be0a0826c3" alt="addTrackGif" title="addTrackGif"/>

  <br/>

  Here is the main area where you add or remove the note by clicking theses white buttons. \
  The note can be different length and pitch by using the control panel. Learn more about [control panel](#control-panel).

  <img src="https://github.com/Novsun30/taipei-day-trip/assets/107986642/506810ff-14da-42aa-a083-964b6594495e" width="400" />

  <br/>

  Also, there are some buttons at the bottom of page, you can demo the sound of this track by clicking the button.

  <img src="https://github.com/Novsun30/taipei-day-trip/assets/107986642/6947ada3-722f-4c9a-ab78-eb334e3f900a" width="400"  />
  <img src="https://github.com/Novsun30/taipei-day-trip/assets/107986642/e630454f-3b59-4c98-b1a1-a16993844f6d" width="305"  />

  <br/>

  ---

  ### Control panel 
  + [Note Value](#note-value)
  + [Sharp and flat](#sharp-and-flat)
  + [BPM (Beats per minute)](#bpm-beats-per-minute)
  + [Key](#key)
  + [Loop](#loop)
  + [Bar](#bar)
    

    ### Note Value 

    <img src="https://github.com/Novsun30/djent/assets/107986642/ce1ce8a5-da8c-459f-943e-9698db3c8f74" width="200"/>
    <br>

    In [Djent](https://djent-28b47.web.app), basic note value is sixteenth note.
    In other words, these multiple number mean how many times of a sixteenth note. \
    You can switch to what note value you want by clicking these buttons. 

    <br>

    ### Sharp and flat 

    <img src="https://github.com/Novsun30/djent/assets/107986642/a675f725-6c46-4f8c-870a-e3e39b68bfff" width="50" />

    Sharp and flat buttons will change the pitch of the note. Sharp button raised the note by half-step. Flat button lowered the note by half-step. To be much easier to tell if the note is sharp or flat, the color of note also changes when button clicked. Sharp button makes note green and Flat button makes note pink. The defalut note color is orange, if sharp or flat not applied.

    <br>

    ### BPM (Beats per minute)

    <img src="https://github.com/Novsun30/djent/assets/107986642/84c4fb2a-e43d-4cd1-91e5-8ca99fd83284" width="120" />

    Changing BPM will changes the playing speed of the project. Bigger value makes it playing faster and smaller one makes it slower. 
    To change the BPM, click the number of BPM and type what value you like. The acceptable range of BPM is between 1 to 300. Default BPM is 120.

    <br>

    ### Bar

    <img src="https://github.com/Novsun30/djent/assets/107986642/5c980f2a-44fd-44b2-acc9-b257a347cfd8" width="150" />

    If you want to add more bars, click the plus button. 

    <br>

    ### Key

    <img src="https://github.com/Novsun30/djent/assets/107986642/2f32e49a-0233-4d30-abae-66ce249b21dc" width="150">

    You can change the key by clicking plus and minus buttons, plus button raised the key by half-step and minus button lowered the key by half-step. Different key have different group of notes. There also have a major/minor button to change the key to major or minor. The difference between major and minor is interval.

    <br>

    ### Loop

    <img src="https://github.com/Novsun30/djent/assets/107986642/6fe4a8b6-7a47-4b20-9201-6b53a26ee29e" width="50">

    If loop button clicked, it will loop the project when playing. Clicking again will cancel the loop.


---

## License
This project is licensed under the terms of the MIT license.