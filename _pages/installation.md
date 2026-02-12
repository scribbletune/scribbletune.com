---
layout: documentation
title: installation
permalink: /documentation/installation
---

### Installation

Scribbletune can be used as a Node.js module to export MIDI files from the terminal OR in the browser along with Tone.js.

##### Node Module

Install Scribbletune from npm

```
npm i scribbletune
```

Now you can create MIDI files from the terminal

```
const scribble = require('scribbletune');

const clip = scribble.clip({
  notes: scribble.scale('C4 major'),
  pattern: 'x'.repeat(8)
});

scribble.midi(clip); // creates a file called music.mid in the same location as this script was created and run.
```

#### Browser

There are a couple of ways to use Scribbletune in the browser.

##### 1. (Quick and dirty - not recommended) Precompiled version of Scribbletune

Use the latest available precompiled version of [Scribbletune from CDNjs](https://cdnjs.com/libraries/scribbletune) and reference it in your HTML right after Tone.js (replace LATEST_VERSION_FROM_CDNJS with the latest version from CDNjs).

{% include browser-scripts.html %}

This will make a global object called `scribble` available for you to use in your script.

```
console.log(scribble.scale('C4 major')); // outputs ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
```

##### 2. Use Scribbletune as a dependency in your package.json (recommended)

Install `scribbletune` and `webpack` from npm

```
npm i scribbletune
npm i vite --save-dev
```

Create a bare minimum `vite.config.js` file with

```
import { defineConfig } from "vite";

export default defineConfig({});
```

Create a file called `script.js` and enter the following in there

```
import { Session } from "scribbletune/browser";

const btnStart = document.getElementById("start");
const btnPlay = document.getElementById("play");
const btnStop = document.getElementById("stop");
let channel;
let isReady = false;

btnStart.addEventListener("click", async () => {
  // Resume audio context (required for browsers)
  await Tone.start();
  console.log("Audio context started");

  // Create session and channel
  const session = new Session();
  channel = session.createChannel({
    instrument: "PolySynth",
    clips: [
      { pattern: "x-x-", notes: "C4 E4 G4" },
      { pattern: "[--xx]", notes: "C4 D#4" },
      { pattern: "[-xxx]", notes: ["E4", "D#4"] },
    ],
    eventCb: (event, data) => {
      console.log("Channel event:", event, data);
      if (event === "loaded") {
        isReady = true;
        console.log("Channel is ready to play!");
      }
      if (event === "error") {
        console.error("Channel error:", data.e);
      }
    },
  });

  // Start the transport
  Tone.Transport.start();
  console.log("Transport started");
});

btnPlay.addEventListener("click", () => {
  if (!isReady) {
    console.log("Channel not ready yet. Click 'Start context' first.");
    return;
  }
  console.log("Starting clip 0");
  channel.startClip(0);
});

btnStop.addEventListener("click", () => {
  if (channel) {
    console.log("Stopping clip 0");
    channel.stopClip(0);
  }
});
```

Now create a file called `index.html` and enter the following in it

```
<!doctype html>
<html>
  <head>
    <title>Testing Scribbletune</title>
  </head>
  <body>
    <div>
      <p>The Audio context needs to be started by a user gesture.</p>
      <button id="start">Start context</button>
    </div>
    <div>
      <p>
        Once audio context is started by a user gesture, you can use the
        start/stop methods on clip objects.
      </p>
      <button id="play">Play</button>
      <button id="stop">Stop</button>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.43/Tone.js"></script>
    <script type="module" src="/script.js"></script>
  </body>
</html>
```

Run the following command to start a dev server locally,

```
npx vite
```

Now load `http://localhost:5173/` in your browser and click the start button to start the audio context. After that, click Play to hear the C4, E4, G4 notes played in a loop at an interval of a quarter note.
