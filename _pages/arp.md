---
layout: documentation
title: arp
permalink: /documentation/core/arp
--- 

### Arp (arpeggiate)
Scribbletune can generate arpeggios from chords
{: .lead}

You can set the order of the notes in the arpegiator and the count of notes in it. Take a look at this example,

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

const theChords = scribble.progression.getChords('C4 major', 'i iv i iv i v i II');

const notesArr = scribble.progression.arpegiate({
  chords: theChords,
  count: 4, // you can set any number from 2 to 8
  // The default value of order is 01234567 as count is 8 by default
  // but here we set count to 4 hence we are only using the first 4 indices to set a order
  order: '1032'
});

const c = scribble.clip({
  notes: notesArr,
  pattern: 'x-x_'.repeat(notesArr.length/2),
  subdiv: '16n'
});

scribble.midi(c, 'arp.mid');
```

This will create a midi file that will arpegiate the triads Cm, Fm, Cm, Fm, Cm, Gm, Cm and DMaj chords each with 4 notes in them ordered with 1 0 3 2 from each triad. 

Here's how it sounded when I imported the MIDI file it produced into Ableton Live
<audio controls="">
  <source src="/sounds/arp.mp3" type="audio/mpeg">
</audio>

You can use this in the browser as well. Just make sure to pull in Tone.js first however!

