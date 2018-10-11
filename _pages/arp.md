---
layout: documentation
title: arp
permalink: /documentation/core/arp
--- 

### Arp (arpeggiate)
Scribbletune can generate arpeggios from chords
{: .lead}

You can set the order of the notes in the arpeggiator and the count of notes in it. Take a look at this example,

```
const scribble = require('scribbletune');

const c = scribble.clip({
  notes: scribble.arp('CM FM CM GM'),
  pattern: 'x'.repeat(32)
});

scribble.midi(c, 'arp.mid');
```

This will create a MIDI clip with the notes of the chord progression in an arpeggiated format where each note is a quarter note. You can easily change by setting a property called `subdiv`

```
subdiv: '16n'
```

Now it plays a bit faster as we set the default duration of each note to sixteenth notes. By default the `arp` method uses 8 notes per arpeggio and it plays those notes from 0 to 7. But you can easily change that, as the `arp` method also accepts an object as it's argument instead of a `String`.

```
const scribble = require('scribbletune');

// we can use scribbletune's progression.getChords method to get the chord progression i iv i iv i v i II
// from a C major scale on the fourth octave
const theChords = scribble.progression.getChords('C4 major', 'i iv i iv i v i II');
// This will return 'Cm Fm Cm Fm Cm Gm Cm DM'. Here 'm' stands for a minor chord and 'M' stands for a major chord.

const notesArr = scribble.arp({
  chords: theChords, // you can even provide a string like 'Cm Fm Cm Fm Cm Gm Cm DM'
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

This will create a midi file called "arp.mid" at the same location as you run this script with `node` and it will arpeggiate the triads Cm, Fm, Cm, Fm, Cm, Gm, Cm and DM chords each with 4 notes in them ordered as 1 0 3 2. So if the first arpeggio (for Cm) was C4 D#4 G4 C5 then the order of these notes would be 1 0 3 2, which is D#4 C4 C5 G4

Here's how it sounded when I imported the MIDI file it produced into Ableton Live
<audio controls="">
  <source src="/sounds/arp.mp3" type="audio/mpeg">
</audio>

You can use this in the browser as well. Just make sure to pull in Tone.js first however!

