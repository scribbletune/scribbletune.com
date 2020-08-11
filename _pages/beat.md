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
`Desktop browser only`

As you can imagine, this can easily be done in any DAW but when you do it with JavaScript, you can get a little bit more out of your loops than simply pointing and clicking in a piano roll (which can be time consuming over time for simple beats). I ll lay down the basics for the beat, you can use your creativity to make the patterns intricate.

We'll have a simple 4x4 kick drum along with a simple bass line, closed hat, open hats and a clap sound.

Since we are going to use sample wav files, we will depend on Scribbletune's [clip](/documentation/core/clip) method which allow us to use patterns. There are 2 aspects to Scribbletune. One is a node module that you can use to export MIDI files OR you can directly use it in the browser, which we will do in this example.

By default a single `x` implies a quarter note. 4 of these make up the common kick drum pattern that looks like this,

![Quarter notes](/images/x.png)

To actually play a sample with this pattern, you can use the `clip` method,

```
scribble.clip({
  pattern: 'xxxx', // or just x since we dont have any variation
  sample: 'https://scribbletune.com/sounds/kick.wav'
}).start();
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
}).start();
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
}).start();

// bass
scribble.clip({
  pattern: '[-x]'
  sample: 'https://scribbletune.com/sounds/bass.wav'
}).start();

// closed hats
scribble.clip({
  pattern: '[xx][xx][xxx][xx]', // add a triplet in there
  sample: 'https://scribbletune.com/sounds/ch.wav'
}).start();

// open hats
scribble.clip({
  pattern: '[-x][-x][-x][xx]',
  sample: 'https://scribbletune.com/sounds/oh.wav'
}).start();

// clap/snare
scribble.clip({
  pattern: '-x',
  sample: 'https://scribbletune.com/sounds/snare.wav'
}).start();

Tone.Transport.bpm.value = 135;
Tone.context.resume().then(() => Tone.Transport.start());
```

<div>
  <button class="btnStartAll">&#9654;</button>
  <button class="btnStopAll">&#9632;</button>
</div>

#### What next?

This is just a simple example to get you started. Since patterns are just strings, you can mangle the strings to create some interesting patterns. You can write pure JavaScript functions to mangle the strings or just use underscore or lodash string methods to do that for you! There really is no limit on where you can go from here. You can create hundreds of clips and sample them out before using them in your productions!

<script src="/js/beat.js"></script>
