---
layout: documentation
title: chord
permalink: /documentation/core/chord
---

### Chord
A chord is 2 (typically 3) or more notes that combine harmoniously. Scribbletune uses [tonal](https://github.com/danigb/tonal) as a dev dependency to create a dumbed down version of it's chords.
{: .lead}

Use chords by their commonly used names. For instance here is a chord progression set up via chord names:

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
const cMajorChord = chord('CM'); // [ 'C4', 'E4', 'G4' ]

// Get the C Major chord on the 5th octave
const cMajorChord5 = scribble.chord('CM-5'); // [ 'C5', 'E5', 'G5' ]

// Get the C minor chord (denoted with a lowercase `m`)
const cMinorChord = chord('Cm'); // [ 'C4', 'EB4', 'G4' ]
```

Lastly, you can get an array of the available chords by calling the `chords` method ([Tonal's](https://github.com/danigb/tonal) `Chord.names()` is exposed as `chords` in Scribbletune.

```
import { chords } from 'scribbletune';

// Get a list of all the available chords
const allChords = chords(); // Returns an array of all the available chords
```

{:#list}

#### List of available chords

Scribbletune uses Tonal behind the scenes to manage chords. However it renames chords such C5 and C13 to C5th and C13th as C5 and C13 can be notes as well. Here are all the possible chords in Scribbletune:

- +add#9
- 11th
- 11b9
- 13th
- 13#11
- 13#9
- 13#9#11
- 13b5
- 13b9
- 13b9#11
- 13no5
- 13sus4
- 4th
- 5th
- 64
- 69#11
- 7th
- 7#11
- 7#11b13
- 7#5
- 7#5#9
- 7#5b9
- 7#5b9#11
- 7#5sus4
- 7#9
- 7#9#11
- 7#9#11b13
- 7#9b13
- 7add6
- 7b13
- 7b5
- 7b6
- 7b9
- 7b9#11
- 7b9#9
- 7b9b13
- 7b9b13#11
- 7no5
- 7sus4
- 7sus4b9
- 7sus4b9b13
- 9th
- 9#11
- 9#11b13
- 9#5
- 9#5#11
- 9b13
- 9b5
- 9no5
- 9sus4
- M
- M#5
- M#5add9
- M13
- M13#11
- M6
- M6#11
- M69
- M69#11
- M7#11
- M7#5
- M7#5sus4
- M7#9#11
- M7add13
- M7b5
- M7b6
- M7b9
- M7sus4
- M9
- M9#11
- M9#5
- M9#5sus4
- M9b5
- M9sus4
- Madd9
- Maddb9
- Maj7
- Mb5
- Mb6
- Msus2
- Msus4
- m
- m#5
- m11
- m11A 5
- m11b5
- m13
- m6
- m69
- m7
- m7#5
- m7add11
- m7b5
- m9
- m9#5
- m9b5
- mM9
- mM9b6
- mMaj7
- mMaj7b6
- madd4
- madd9
- mb6M7
- mb6b9
- o
- o7
- o7M7
- oM7
- sus24
