---
layout: documentation
title: chord
permalink: /documentation/core/chord
---

### Chord
A chord is 2 (typically 3) or more notes that combine harmoniously. Scribbletune uses [tonal](https://github.com/danigb/tonal) to expose chords.
{: .lead}

Scribbletune recognizes chords by their commonly used names. For instance here is a chord progression set up via chord names:

```
import { chord, clip } from 'scribbletune';

const chordsClip = clip({
	// Use chord names directly in the notes array
	// M stands for Major, m stands for minor
	notes: 'CM FM GM CM',
	pattern: 'x---'.repeat(4)
});

midi(chordsClip, 'chords.mid');
```

Here's how _chords.mid_ looks on a piano roll when imported into a DAW:

![Chords](/images/chords.png)

Other than recognizing chords in a notes array, you can get a particular chord as an array of notes for a  chord as well. Scribbletune adds some sugar on top of ([Tonal's](https://github.com/danigb/tonal) `Tonal.chord` method to get hold of chord notes.

```
import { chord } from 'scribbletune';

// Get C Major (Major is denoted by M)
const cMajorChord = chord('CM'); // [ 'c4', 'e4', 'g4' ]

// Get the C Major chord on the 5th octave
const cMajorChord5 = scribble.chord('CM-5'); // [ 'c5', 'e5', 'g5' ]

// Get the C minor chord (denoted with a lowercase `m`)
const cMinorChord = chord('Cm'); // [ 'c4', 'eb4', 'g4' ]
```

Lastly, you can get an array of the available chords by calling the `chords` method ([Tonal's](https://github.com/danigb/tonal) `Chord.names()` is exposed as `chords` in Scribbletune.

```
import { chords } from 'scribbletune';

// Get a list of all the available chords
const allChords = chords(); // Returns an array of all the available chords
```


