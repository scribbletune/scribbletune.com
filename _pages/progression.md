---
layout: documentation
title: progression
permalink: /documentation/core/progression
---

### Progression

Scribbletune generates common chord progressions for the given key
{: .lead}

This is an experimental feature. As of now it supports providing common chord progressions for major, minor and seventh chords. For e.g. I IV V ii on C Major would produce a string such as CM FM GM Dm which you can use while creating a clip as the chords you'd like as part of that clip's notes.

```
import {clip, getChordsByProgression, midi} from 'scribbletune';

const c = clip({
	notes: getChordsByProgression('C4 major', 'I IV V ii'),  // Here 4 is the octave
	pattern: 'x_'.repeat(4) + 'x_______'
});

midi(c, 'chords.mid');
```

You can even get chord degrees for select scales/modes:

```
const scribble = require('scribbletune'); // using es5 syntax
console.log(scribble.getChordDegrees('minor')); // outputs [ 'i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII' ]
```

You can pass the following scales/modes to this method:

- ionian/major
- dorian
- phrygian
- lydian
- mixolydian
- aeolian/minor
- locrian
- melodic minor
- harmonic minor
