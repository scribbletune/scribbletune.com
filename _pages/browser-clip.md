---
layout: documentation
title: browser-clip
permalink: /documentation/browser/browser-clip
---

### Clip (extended for the browser)

Scribbletune uses Tone.js to create sequences that can be played in the browser.
{: .lead}

**Note:** Tone.js must be loaded in the browser via SCRIPT tag before Scribbletune (or your compiled app - with Scribbletune) is loaded.
{: .text-warning}

```
const scribble = require('scribbletune/browser');
```

Create a clip like you would normally do, but this time also add an additional property to make it use the global Tone.js (which you loaded via SCRIPT tag earlier).

#### Synth

```
scribble.clip({
	synth: 'PolySynth', // new property: synth
	pattern: '[xx]',
	notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3'
}).start();
```

As you can see, we have added a new prop called `synth`. Rest of the clip parameters are same as before. One other thing to note is the `.start()` at the end of this method. Basically, the browser version of Scribbletune, returns a Tone.js Sequence which has a `start` method.

Make Tone's Transport class start the audio,

```
Tone.context.resume().then(() => Tone.Transport.start());
```

#### Sample

Along with Tone.js provided synths/instruments, you can even set up an individual `wav` file to play a pattern.

```
scribble.clip({
	sample: 'https://scribbletune.com/sounds/kick.wav', // new property: sample
	pattern: 'x'
}).start();

scribble.clip({
	sample: 'https://scribbletune.com/sounds/bass.wav', // new property: sample
	pattern: '[-x]'
}).start();
```

Again, make sure you call start on Tone's Transport,

```
Tone.context.resume().then(() => Tone.Transport.start());
```

#### Sampler

Finally, you can provide a set of samples as individual notes to create an entire instrument from scratch and use that instead,

```
// Create a sampler out of individual sound files
var piano = {
	'C3' : 'https://scribbletune.com/sounds/piano/piano48.wav',
	'C#3' : 'https://scribbletune.com/sounds/piano/piano49.wav',
	'D3' : 'https://scribbletune.com/sounds/piano/piano50.wav',
	'D#3' : 'https://scribbletune.com/sounds/piano/piano51.wav',
	'E3' : 'https://scribbletune.com/sounds/piano/piano52.wav',
	'F3' : 'https://scribbletune.com/sounds/piano/piano53.wav',
	'F#3' : 'https://scribbletune.com/sounds/piano/piano54.wav',
	'G3' : 'https://scribbletune.com/sounds/piano/piano55.wav',
	'G#3' : 'https://scribbletune.com/sounds/piano/piano56.wav',
	'A4' : 'https://scribbletune.com/sounds/piano/piano57.wav',
	'A#4' : 'https://scribbletune.com/sounds/piano/piano58.wav',
	'B4' : 'https://scribbletune.com/sounds/piano/piano59.wav',
	'C4' : 'https://scribbletune.com/sounds/piano/piano60.wav'
};

var notes = scribble.chord('Cm7-3'); // returns ['C3', 'Eb3', 'G3', 'Bb4']
scribble.clip({
	samples: piano,
	pattern: 'xxx[xx]',
	notes: [...notes, ...notes.reverse()] // here we did some variation on the notes
}).start();

scribble.clip({
	samples: piano,
	pattern: 'x',
	notes: [...notes, ...notes.reverse()] // here we did some variation on the notes
}).start();
```

As always make sure Tone.Transport is started,

```
Tone.context.resume().then(() => Tone.Transport.start());
```

<br>

With the Sampler, you can create your own instruments from sampled sounds. This is a good technique in case you are not satisfied with the "sound" of the Synths purely created out of the WebAudioAPI.

Before we end this section, Tone.Transport also has a `stop` method that you can invoke too. So in most cases you'd have a button for Start Audio and another one for Stop Audio. You can assign Tone.Transport's start and stop methods to these.
