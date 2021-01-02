### Chord Progressions

Scribbletune generates common chord progressions for the given key
{: .lead}

#### progression

This is an experimental feature. As of now it supports providing chord progressions for major and minor scales only based on the theory that the progression must start from the Tonic, optionally move to the PreDominant or SubDominant and then the Dominant. Randomly it will move from Dominant to PreDominant and then back to Dominant.

```
const scribble = require('scribbletune'); // using es5 syntax

const majorChordProgression = scribble.progression('M'); // you can substitute M with lowercase major
const minorChordProgression = scribble.progression('m', 8);
// the second param here ^ allows you to set the number of chords to return
// currently a count of 2 to 8 works best

console.log(majorChordProgression); // something like [ 'I', 'ii', 'ii', 'V' ]
console.log(minorChordProgression);  // something like [ 'i', 'VI', 'ii', 'V', 'ii', 'iv', 'iv', 'V', 'V' ]
```

#### getChordsByProgression

`getChordsByProgression` works toward translating chord degrees to actual chords for the given scale and root note. For e.g. I IV V ii on C Major would produce a string such as CM FM GM Dm which you can use while creating a clip as the chords you'd like as part of that clip's notes.

```
import {clip, getChordsByProgression, midi} from 'scribbletune'; // this will need transpilation

const c = clip({
	notes: getChordsByProgression('C4 major', 'I IV V ii'),  // Here 4 is the octave
	pattern: 'x_'.repeat(4) + 'x_______'
});

midi(c, 'chords.mid');
```

You can even get chord degrees for select scales/modes:

```
const scribble = require('scribbletune'); // using es5 syntax again
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
