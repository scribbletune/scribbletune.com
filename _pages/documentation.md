---
layout: documentation
title: Documentation
permalink: /documentation/
---

### Scribbletune has a very minimal API.

The work flow involves creating clips which are containers for musical ideas. Once a clip is created, it can be concatenated with other clips to create longer musical ideas (or songs). You can then, either export the clip as a MIDI file or play it in the browser.
{: .lead}

Here's some sample code:

```
const scribble = require('scribbletune');

// Create a clip that plays the middle C
const clip = scribble.clip({
	notes: scribble.scale('C4 major'),
	pattern: 'xxxxxxx'
});

// Render a MIDI file of this clip
scribble.midi(clip, 'c.mid');

```

Please use the menu alongside for the various methods available or click here to learn how to [start using Scribbletune](/documentation/installation) in your project.
