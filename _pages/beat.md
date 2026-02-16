---
layout: examples
title: Simple 4x4 beat in the browser
permalink: /examples/beat
---

### Simple 4x4 beat in the browser

Scribbletune can be used to generate beats made from sampled sounds right in your browser
{: .lead}

Before we go on, here's a sample of what we are gonna end up creating using Scribbletune.

<div>
  <button class="btnStartAll">&#9654;</button>
  <button class="btnStopAll">&#9632;</button>
</div>

`Please note: This will work on a desktop browser only and the play/stop buttons on this page will not work if you reload this page or directly load this page with it's URL. This is because, the Audio Context object requires a user action before it can be made available. If you've already reloaded the page (or visited purely with it's URL) then simply click on the "Beat (browser)" link in the Examples section to stay on this page and qualify as a legit user action ;)`

What follows in this example can easily be done in any DAW but when you do it with JavaScript, you can get a little bit more out of your loops than simply pointing and clicking in a piano roll (which can be time consuming over time for simple beats). I ll lay down the basics for the beat, you can use your creativity to make the patterns intricate.

We'll have a simple 4x4 kick drum along with a simple bass line, closed hat, open hats and a clap sound.

Since we are going to use sample wav files, we will depend on Scribbletune's [clip](/documentation/core/clip) method which allow us to use patterns. There are 2 aspects to Scribbletune. One is a node module that you can use to export MIDI files OR you can directly use it in the browser, which we will do in this example.

Since we are in the browser context, we need to first enable the Audio Context via a user event. For eg you could set up a button that has the following event attached to it and you can expect the user to first click that button.

```
const btnToStartAudioContext = document.getElementById("btnToStartAudioContext");
btnToStartAudioContext.addEventListener("click", async () => {
  Tone.Transport.bpm.value = 135; // optionally set BPM (default is 120)

  // Start audio context (required for browsers)
  await Tone.start();
  console.log("Audio context started");

  Tone.Transport.start();
  console.log("Transport started");
});
```

Once that is done on the page, now you can play any other clips.

By default a single `x` implies a quarter note. 4 of these make up the common kick drum pattern that looks like this,

![Quarter notes](/images/x.png)

To actually play a sample with this pattern, you can use the `clip` method. You can add an event listener for the click of a button to invoke the following method which creates a clip and starts it.

```
scribble.clip({
  pattern: 'xxxx', // or just x since we dont have any variation
  sample: 'https://scribbletune.com/sounds/kick.wav'
}).start(0); // The 0 implies "start at the very beginning"
```

This is how it sounds,

<div>
  <button id="btnStartX">&#9654;</button>
  <button class="btnStopAll">&#9632;</button>
</div>

<br>

#### Subdivide

If you wanted to subdivide the last note, then you can use square braces for the 4th note like this `xxx[xx]` which would subdivide the last note (or kick) into 2 eighth notes making it look like this,

![Quarter notes](/images/x2.png)

If you wanted to subdivide further, then you can use another set of square braces inside the square braces that you just added, like this `xxx[x[xx]]`

![Quarter notes](/images/x3.png)

If you replace the pattern in the previous clip method, this is how it sounds,

<div>
  <button id="btnStartX3">&#9654;</button>
  <button class="btnStopAll">&#9632;</button>
</div>

#### Bass

A very common bassline used in many dance tracks just has a single (low octave) note on the third downbeat of a 16 beat bar. In terms of Scribbletune patterns, it looks like this `--x---x---x---x-` or simply `[-x]` considering the default note length in Scribbletune is a quarter note (4n) to be in line with [Tone.js](https://tonejs.github.io/) which Scribbletune depends on to be able to produce compositions in the browser. This is how this bass pattern would look on a piano roll,

![Quarter notes](/images/-x.png)

Let's change the pattern and the sample in the clip method to have this simple bassline,

```
scribble.clip({
  pattern: '[-x]', // or [-x][-x][-x][-x]
  sample: 'https://scribbletune.com/sounds/kick.wav'
}).start(0);
```

This is how it sounds,

<div>
  <button id="btnStartBass">&#9654;</button>
  <button class="btnStopAll">&#9632;</button>
</div>

#### All together now

Just like the kick and the bass sound, we can also bring in some hats and a clap (or snare) sound to complete our beat. Here's the code for it,

```
// kick
scribble.clip({
  pattern: 'x',
  sample: 'https://scribbletune.com/sounds/kick.wav'
}).start(0);

// bass
scribble.clip({
  pattern: '[-x]'
  sample: 'https://scribbletune.com/sounds/bass.wav'
}).start(0);

// closed hats
scribble.clip({
  pattern: '[xx][xx][xxx][xx]', // add a triplet in there
  sample: 'https://scribbletune.com/sounds/ch.wav'
}).start(0);

// open hats
scribble.clip({
  pattern: '[-x][-x][-x][xx]',
  sample: 'https://scribbletune.com/sounds/oh.wav'
}).start(0);

// clap/snare
scribble.clip({
  pattern: '-x',
  sample: 'https://scribbletune.com/sounds/snare.wav'
}).start(0);

Tone.Transport.bpm.value = 135;
Tone.context.resume().then(() => Tone.Transport.start(0));
```

<div>
  <button class="btnStartAll">&#9654;</button>
  <button class="btnStopAll">&#9632;</button>
</div>

#### Stopping clips

At some point you may also want to stop a clip that s playing. To do that, you can define your clip and store it in a variable like,

```
const kickClip = clip({
  pattern: "x",
  sample: "https://scribbletune.com/sounds/kick.wav",
});
```

And then you can wire up buttons to start / stop this clip in your HTML,

```
<button id="btnStart">Start</button>
<button id="btnStop">Stop</button>
```

And then in your JavaScript, you can assign event handlers to these buttons,

```
btnStart.addEventListener("click", async () => {
  // Assumption is made that the Audio Context was started via
  // await Tone.start() followed by Tone.Transport.start()
  // in a separate user action
  kickClip.start(0);
});

btnStop.addEventListener("click", () => {
  kickClip.stop(0);
});
```

The above assumes that you had indeed wired yet another button that started the Audio Context to begin with. If you had only one sample that you wanted to play on the page, then you can combine the Audio Context creation and starting the clip with the same user action,

```
btnStart.addEventListener("click", async () => {
  // Start or Resume audio context
  await Tone.start();
  Tone.Transport.start();
  kickClip.start(0);
});
```

### What next?

This is just a simple example to get you started. Since patterns are just strings, you can mangle the strings to create some interesting patterns. You can write pure JavaScript functions to mangle the strings or just use underscore or lodash string methods to do that for you! There really is no limit on where you can go from here. You can create hundreds of clips and sample them out before using them in your productions!

Lastly, if you wish to build a complete application where you have multiple clips across multiple channels (similar to Ableton Live session view), the consider using the `Session` object. It provisions the creation of Channels within it which can have multiple clips which can be played in a row or individually. [Click here](/documentation/browser/session) to read the documentation for `Session` and how to use it.

And [here is an example](http://live.scribbletune.com/) where such an application is built using only Scribbletune and obviously, Tone.js is loaded in the browser to facilitate the browser specific methods from Scribbletune.

<script src="/js/beat.js"></script>
