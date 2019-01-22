---
layout: documentation
title: channel
permalink: /documentation/browser/channel
---

### Channel
Scribbletune creates channels that can contain multiple clips.
{: .lead}

**Note:** tone.js must be loaded in the browser via SCRIPT tag before Scribbletune (or your compiled app - with Scribbletune) is loaded.
{: .text-warning}

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.3.1/Tone.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/scribbletune/1.9.4/scribbletune.js"></script>
```

Before you can create a channel, you must create a [session](/documentation/browser/session). 

```
const session = scribble.session();
```

Now you can add channels to this session.

```
const kickChannel = session.createChannel({
	sample: 'https://scribbletune.com/sounds/kick.wav',
	clips: [
		{ pattern: 'x' },
		{ pattern: 'xxx[xx]' },
		{ pattern: 'x' },
		{ pattern: 'xxx[-x]' }
	]
});

const bassChannel = session.createChannel({
	sample: 'https://scribbletune.com/sounds/kick.wav',
	clips: [
		{ pattern: '[-x]' },
		{ pattern: '[--xx]' },
		{ pattern: '[-xxx]' },
		{ pattern: 'xxx' }
	]
});
```

Here we provided a list of clips to be played for each channel. We also provided a `sample` property to be used for all the clips. Apart from `sample` you could also provide an array as `samples` (plural), to create a custom sampler or you could provide a `synth` property to use a Tone.js synth as well. In these options you'd also need to add the `notes` property along with `pattern`. For example,

```
const synthChannel = session.createChannel({
	synth: 'PolySynth',
	clips: [
		{ pattern: '[-x]', notes: 'C4 D#4' }, // notes can be a string
		{ pattern: '[--xx]', notes: 'C4 Cm-4' }, // it can contain chord names
		{ pattern: '[-xxx]', notes: ['E4', 'D#4'] }, // or an array
		{ pattern: 'xxx', notes: scribble.scale('C minor') } // or the scale method
	]
});
```

#### Methods

In the [session](/documentation/browser/session) docs we didnt assign variables to the channels. Here we did. The reason is to focus on what you can do with channels. For instance you could play an individual clip on the channel. (In sessions you'd play an entire row). 

```
bassChannel.startClip(2);
```
This will play the second clip from the channel we created as `bassChannel`. Scribbletune makes use of Tone's `Tone.Transport.nextSubdivision` method to make sure clip to be played aligns itself in correct time instead of abruptly playing it. 

You can even stop a particular clip,
```
bassChannel.stopClip(2);
```

To add more clips to an existing channel, use the `addClip` method,
```
const params = { pattern: 'xx[xx]'};
bassChannel.addClip(params, 4);
```

This will add a new clip at index 4 in the channel strip. If you dont provide the index, then Scribbletune will automatically assign it to the last position in the channel's clips array.

The channel will also keep a track of the currently active clip. You can get the information by doing,
```
bassChannel.activeClipIdx(); // returns the currently playing clip
```
