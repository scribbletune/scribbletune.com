---
layout: examples
title: Random Chords
permalink: /examples/random-chords
---

### Random Chords

If you randomly pick 2 or 3 notes from a scale or mode, you ll end up creating random chords. They wont necessarily sound good, but since we will use JavaScript for this, we can generate a bunch of chord progressions and tweak something that we like from that bunch. We will use [lodash](https://lodash.com/) for the random picking.

```
const _ = require('lodash');
const scribble = require('scribbletune');
```

For the set of notes, we ll start with the C major scale and a simple pattern

```
const setOfNotes = scribble.scale('C3 major');
const pattern = 'x___'.repeat(4);
```

Now we need to get the count of `x` in this pattern so that we can generate that many random chords. The count here is 4, but some times a pattern can be a bit intricate and the count may not be very evident. Hence we ll compute the count.

```
const count = pattern.replace(/[^x]/g, '').length;
```

Now we will randomly pick 2 notes from our set of notes for each count and construct our notes array along the way.

```
const notes = [];
for (let i = 0; i < count; i++) {
  notes.push(_.sampleSize([...setOfNotes], 3));
}
```

And that should be good enough to produce our MIDI file for this simple chord progression

```
scribble.midi(
  scribble.clip({
    notes,
    pattern,
  })
);
```

In Ableton Live, I created a new instrument by combining Arturia's Jupiter 8 V3 and U-he's Hive 2. I use the presets Space Osborne and HS Chapel Flowers respectively. On rendering the MIDI clip it sounded like this (your results may vary a bit as we pick notes randomly from the set of notes)

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/872747692&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"></iframe>


To make this a bit more interesting, I used the C lydian scale from 2 octaves and made the patttern a bit more intricate

```
const setOfNotes = scribble
  .scale('C3 lydian')
  .concat(scribble.scale('C4 lydian'));
const pattern = 'x__[xx]x_x_'.repeat(8);
```

I left the rest as is and rendered again, this is how it turned out.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/872748478&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"></iframe>

The final code is around a dozen lines. [Here is a gist](https://gist.github.com/walmik/2460f014daf10af5b6570296dcb2cf8f) for your reference.

What next?
Try out [different scales](https://scribbletune.com/documentation/core/scale#list-of-available-scalesmodes), or notes from chords or manually set up the notes to get interesting chord progressions. Alter the pattern a bit and use the `R` character. Optionally use the randomNotes property in the `clip` method to pass the notes to be used for `R`. If you dont do this, then Scribbletune will simply adjust the level of that note or simply mute it randomly.