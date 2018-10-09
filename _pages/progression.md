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
const scribble = require('scribbletune');

const c = scribble.clip({
	notes: scribble.progression.getChords('C4 major', 'I IV V ii'),  // Here 4 is the octave
	pattern: 'x_'.repeat(4) + 'x_______'
});

scribble.midi(c, 'chords.mid');
```

##### Arpegiate
Progression also has a method to arpegiate given chords. You can set the order of the notes in the arpegiator and the count of notes in it. Take a look at this example,

```
const scribble = require('scribbletune');

const theChords = scribble.progression.getChords('C4 major', 'I IV V IV');
const notesArr = scribble.progression.arpegiate(theChords);
const c = scribble.clip({
  notes: notesArr,
  pattern: 'x'.repeat(notesArr.length),
  subdiv: '16n'
});

scribble.midi(c, 'arp.mid');
```

This will create a MIDI clip with the notes of the chord progression in an arpegiated format. By default it uses 8 notes in the arpegiation and it plays the arpegio from 0 to 7. But you can easily change that, as the `arpegiate` method also accepts an object as it's argument.

```
const scribble = require('scribbletune');

const theChords = scribble.progression.getChords('C4 major', 'I IV V IV');
const notesArr = scribble.progression.arpegiate({
  count: 4, // you can set any number from 2 to 8
  order: '1032' // Default is 01234567 but since we set count to 4, we set the order accordingly
});
const c = clip({
  notes: notesArr,
  pattern: 'x'.repeat(notesArr.length),
  subdiv: '16n'  
});

scribble.midi(c, 'arp.mid');
```

This will create a midi file that will arpegiate the C Major, F Major, G Major and F Major chords each with 4 notes in them. 

You can use this in the browser as well. Just make sure to pull in Tone.js first however!


