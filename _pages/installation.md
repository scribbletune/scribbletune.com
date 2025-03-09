---
layout: documentation
title: installation
permalink: /documentation/installation
---

### Installation

Scribbletune can be used in the browser along with Tone.js OR as a Node.js module to export MIDI files from the terminal.

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
npm i webpack --save-dev
npm i webpack-cli --save-dev
```

Create a bare minimum `webpack.config.js` file with

```
const webpack = require('webpack')

module.exports = {
  mode: "none",
  entry: "./script.js",
  output: {
    filename: "main.js"
  },
  node: {
    fs: "empty"
  }
}
```

Create a file called `script.js` and enter the following in there

```
import { clip } from 'scribbletune/browser';

const btnStart = document.getElementById('start');
const btnPlay = document.getElementById('play');
const btnStop = document.getElementById('stop');

btnStart.addEventListener('click', () => {
    Tone.context.resume().then(() => Tone.Transport.start());
});

const simpleLoop = clip({ synth: 'Synth', notes: 'c4', pattern: 'x' });
btnPlay.addEventListener('click', () => {
    simpleLoop.start();
});

btnStop.addEventListener('click', () => {
    simpleLoop.stop();
});
```

Now create a file called `index.html` and enter the following in it

```
<!DOCTYPE html>
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
    <p>Once audio context is started by a user gesture, you can use the start/stop methods on clip objects.</p>
    <button id="play">Play</button>
    <button id="stop">Stop</button>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.43/Tone.js"></script>
  <script src="dist/main.js"></script>
</body>
</html>
```

Note that we added a `script` tag with the `src` set to a filed called `main.js`. This file is not yet created. It will be created once you run the following webpack command,

```
npx webpack
```

Now "serve" the HTML file we created by running a simple Python web server for testing purposes

```
python -m SimpleHTTPServer 3000
```

Now load `localhost:3000` in your browser and you should hear the C4 note played in a loop at an interval of a quarter note.

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

