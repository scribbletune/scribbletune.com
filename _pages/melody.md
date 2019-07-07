---
layout: examples
title: Simple melody
permalink: /examples/melody
---

### Simple melody

Adding constraints or limitations to the construction of your melody can make you creative
{: .lead}

Recently I went through [a (free) course on artofcomposing.com](https://courses.artofcomposing.com/courses/the-vocabulary-of-composition) and learnt that adding constraints or limitations to the construction of your melody can make you creative. Here are the basic constraints this course suggested as a starting point:

- Select a root note and scale
- Use only chord tones from the selected scale
- Use only half notes, eighth notes and quarter notes

Before we go on, here's a sample of what we are gonna end up creating using Scribbletune

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/606723279&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

Using the constraints the instructor created a simple melody. He laid out the chord progression I I V I for the C Major scale and randomly chosing between quarter notes and eigth notes. Of course he was a trained musician with a lot more to offer than just that but I thought this simple technique can easily be implemented with Scribbletune for creating simple melodies.

Create a file called `simpleMelody.js` and require scribbletune,

```
const scribble = require('scribbletune');
```

So lets select the C minor scale for our example and decide to use the progression i iii ii v. We can get the actual chords like this,

```
const chords = scribble.getChordsByProgression('C4 minor', 'i iii ii v');
```

This will set `chords` to a string that looks like `Cm-4 Gm-4 Cm-4 Dm-4`. The number after the hyphen indicates the octave. In Ableton Live the middle C is on the third octave, hence the 4 you see here will transpose to 3 in Ableton live. I have an article that explains middle C a bit more. You can read it if that interests you.

Since we have 4 chords, we can start accumulating notes and a pattern too. Lets start by initializing them,

```
const notes = [];
let pattern = '';
```

Next, we ll loop over the 4 chords and decide at each chord if we want to use 2 quarter notes or 1 quarter note and 2 eighth notes. We can either use `Math.random()` to determine this or we can do it based on some other condition. For instance we'll do a modulo on the current index in the loop.

```
chords.split(' ').forEach((chordName, index) => {
  // Get the chord as an array of notes
  const chord = scribble.chord(chordName);

  if (index % 2 !== 0) {
    // Use 2 quarter notes
    pattern = pattern + 'xx';

    // Since we are using 2 notes, we ll push the first 2 notes from the chord into the notes array
    // You could very well use 2 random notes, but we ll keep things straightforward for now
    notes.push(chord[0]);
    notes.push(chord[1]);

  } else {
    // Use a quarter note and 2 eigth notes
    pattern = pattern + 'x[xx]';

    // Since we are using 3 notes in all, we ll push all 3 notes of the chord to the notes array
    notes.push(chord[0]);
    notes.push(chord[1]);
    notes.push(chord[2]);
  }
});
```

At the end of this, we should now have a bunch of notes and a pattern. Let's create a clip out of these and render it out as a MIDI file:

```
const clip1 = scribble.clip({
  notes,
  pattern
});

scribble.midi(clip1, 'clip1.mid')
```

Additionally, to make it sound interesting, let's create another clip with a longer note length but the same notes and pattern. In Scribbletune note lengths are set to 4n (quarter notes) by default. We can change this by using the `subdiv` property. For this example, we ll create a clip which uses 2n (half notes) as the `subdiv` (which sets default note length).

```
const clip2 = scribble.clip({
  notes,
  pattern,
  subdiv: '2n'
});

scribble.midi(clip2, 'clip2.mid')
```

Running `node simpleMelody.js` should produce 2 MIDI files: clip1.mid and clip2.mid. Here's how it sounded like when I rendered the MIDI files with `i iii ii v` and `ii III ii v` in Ableton Live. For clip1.mid I used NI's Reaktor Factory Libray synthesizer Junatic and for clip2.mid I used Ableton's stock synth preset Epic Trance Lead. I added a beat and a riser effect to make it sound a little nicer. Here it is again ;)

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/606723279&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<br>
And finally, here's the script in it's entirety.
<script src="https://gist.github.com/walmik/08b1036b72790d1ce2e12feaa65e0fdb.js"></script>
