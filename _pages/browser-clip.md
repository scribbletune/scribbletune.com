---
layout: documentation
title: browser-clip
permalink: /documentation/browser/browser-clip
---

### Clip (extended for the browser)
Scribbletune uses Tone.js to creates sequences to be played in the browser. 
{: .lead}

**Note:** tone.js must be loaded in the browser via SCRIPT tag before Scribbletune (or your compiled app - with Scribbletune) is loaded.
{: .text-warning}

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.3.1/Tone.min.js"></script>
<script src="path/to/scribbletune.js/or/compiled/app.js"></script>
```

The clip method is the same as the one [from the core Scribbletune node module](/documentation/core/clip) but with some added properties to enable playing them in the browser. Behind the scenes, Scribbletune makes use of a global Tone object to create Player, Instrument and Sampler along with Sequence to enable this behavior.

If you are using scribbletune.js directly, then it exposes a global object called `scribble`. This has all the methods you need. If you are importing or requiring Scribbletune then lets assume it s fetched as such,

```
const scribble = require('scribbletune');
```

Then you can go ahead and create a clip like you d normally do, but this time you'd also add an additional property to make it use the global Tone.js (which you loaded via SCRIPT tag earlier).

#### Synth

```
scribble.clip({ 
	synth: 'PolySynth', // new property: synth
	pattern: '-x', 
	notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' 
}).start();
```

As you can see, we have added a new prop called `synth`. Rest of the clip parameters are same as before. One other thing to note is the `.start()` at the end of this method. Basically, the browser version of Scribbletune, returns a Tone.js Sequence which has a `start` method.

Make Tone's Transport class start the audio,

```
Tone.Transport.start();
```

On reloading the page you should now hear the synth play at the set pattern.

#### Sample

Along with Tone.js provided synths/instruments, you can even set up an individual `wav` file to play a pattern.
```
scribble.clip({ 
	sample: '/path/to/your/sample.wav', // new property: sample
	pattern: '-x', 
	notes: 'C4 D4 C4 D#4 C4 D4 C4 Bb3' 
}).start();
```

Again, make sure you call start on Tone's Transport,

```
Tone.Transport.start();
```

On reloading the page you should now hear your sample (wav file) play at the set pattern.


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
	pattern: 'x-[xx]-',
	notes: [...notes, ...notes.reverse()] // here we did some variation on the notes
}).start();
```
As always make sure Tone.Transport is started,
```
Tone.Transport.start();
```

With the Sampler, you can create your own instruments from sampled sounds. This is a good technique in case you are not satisfied with the "sound" of the Synths purely created out of the WebAudioAPI.

Before we end this section, Tone.Transport also has a `stop` method that you can invoke too. So in most cases you'd have a button for Start Audio and another one for Stop Audio. You can assign Tone.Transport's start and stop methods to these.


