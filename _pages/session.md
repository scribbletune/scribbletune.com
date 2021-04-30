---
layout: documentation
title: session
permalink: /documentation/browser/session
---

### Session

Scribbletune can create a session that can contain multiple channels which can have multiple clips of musical ideas.
{: .lead}

**Note:** tone.js must be loaded in the browser via SCRIPT tag before Scribbletune (or your compiled app - with Scribbletune) is loaded.
{: .text-warning}

A session is a simplistic example of [Ableton Live's session view](https://www.ableton.com/en/manual/session-view/) where you can have channels of MIDI or Audio Data. Scribbletune provides just a basic interface to simulate something like that. It would be premature to consider Scribbletune's session as an exact and complete implementation of Ableton Live's session!

You can start by creating a session like this,

```
const scribble = require('scribbletune/browser');
const session = scribble.session();
```

Now you can add channels to this session. Let's add a channel with a kick drum sound.

```
session.createChannel({
	sample: 'https://scribbletune.com/sounds/kick.wav',
	clips: [
		{ pattern: 'x' },
		{ pattern: 'xxx[xx]' },
		{ pattern: 'x' },
		{ pattern: 'xxx[-x]' }
	]
});
```

This code will create a channel with 3 clips that will play the kick.wav sample file in the pattern provided for each clip. We can do the same for a bass sample as well.

```
session.createChannel({
	sample: 'https://scribbletune.com/sounds/kick.wav',
	clips: [
		{ pattern: '[-x]' },
		{ pattern: '[--xx]' },
		{ pattern: '[-xxx]' },
		{ pattern: 'xxx' }
	]
});
```

Now we have 2 channels in the session. To play the second row in the session (which is the same as saying play the second clip in all channels),

```
session.startRow(1);
```

As always make sure Tone is loaded in the browser and it's Transport's start method is initiated

```
Tone.context.resume().then(() => Tone.Transport.start());
```

You can get a list of all the channels in the session by doing,

```
session.channels;
```
