---
layout: documentation
title: installation
permalink: /documentation/installation
---
### Installation

Scribbletune can be used in the browser along with Tone.js OR as a Node.js module to export MIDI files from the terminal.

##### Browser

There are a couple of ways to use Scribbletune in the browser.

###### 1. Use a precompiled version of Scribbletune

[Download the precompiled version of Scribbletune](https://raw.githubusercontent.com/scribbletune/scribbletune/master/dist/scribbletune.js) and reference it in your HTML right after Tone.js

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.3.1/Tone.min.js"></script>
<script src="/path/to/where/you/downloaded/the/precompiled/scribbletune.js"></script>
```

This will make a global object called `scribble` available for you to use in your script.

```
console.log(scribble.scale('c4 major')); // outputs ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
```

###### 2. Use Scribbletune as a dependency in your package.json

Install `scribbletune` and `webpack` from npm

```
npm i scribbletune --save
npm i webpack --save-dev
```

Create a file called `script.js` and enter the following in there
```
import { clip } from 'scribbletune';
clip({ synth: 'Synth', notes: 'c4', pattern: 'x' }).start();
Tone.Transport.start();
```

Now create a file called `index.html` and enter the following in it

```
<!DOCTYPE html>
<html>
<head>
  <title>Testing Scribbletune</title>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.3.1/Tone.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
```

Note that we added a `script` tag with the `src` set to a filed called `main.js`. This file is not yet created. It will be created once you run the following webpack command,

```
npx webpack script.js -o main.js
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
  notes: scribble.scale('c4 major'),
  pattern: 'x'.repeat(8)
});

scribble.midi(clip); // creates a file called music.mid in the same location as this script was created and run.
```