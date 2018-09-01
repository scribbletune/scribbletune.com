---
layout: documentation
title: midi
permalink: /documentation/core/midi
---

### Midi
Scribbletune exports clips as MIDI files using the [jsmidgen](https://github.com/dingram/jsmidgen) module
{: .lead}

As the name suggests, the midi method generates a MIDI file from it's input. It takes 1 mandatory and 1 optional parameter:

- clip `{Array}` The clip that you create using the clip method
- filename `{String}` This is optional. If you don't provide a filename, Scribbletune will create a file called _music.mid_.

```
import { clip, progression, midi } from 'scribbletune';

const c = clip({
	notes: 'c4',
	pattern: 'x_______'
});

midi(c); // Will create a file called music.mid
// OR
midi(c, 'c.mid'); // Will create a file called c.mid
```