---
layout: documentation
title: scale
permalink: /documentation/core/scale
---

### Scale

A scale is a set of musical notes ordered by pitch. Scribbletune uses [tonal](https://github.com/danigb/tonal) as a dev dependency to create a dumbed down version of it's scales in another node module called [harmonics](https://github.com/scribbletune/harmonics) and uses that as a dependency of Scribbletune (this is done so as to have a very small footprint in Scribbletune for the music theory).
{: .lead}

The scale method takes a string input that denotes the key and the scale you want.

```javascript
const scribble = require('scribbletune');

// Get the C major scale
let cMajor = scribble.scale('C4 major'); // [ 'C4', 'D4', 'E4' ... ]

// That's the same as
cMajor = scribble.scale('C4 ionian'); // [ 'C4', 'D4', 'E4', 'F4' ...]

// Create a clip that plays this C major scale
const clip = scribble.clip({
  notes: cMajor,
  pattern: 'xxxxxxx',
});

// Export this clip as a MIDI file
scribble.midi(clip, 'c-major.mid');
```

This will generate a MIDI file at the same location as you run this script. This is how it sounded when I imported the generated `c-major.mid` MIDI file into Garage Band

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/247076595&color=%232e2e2e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

Scales are also exposed as modes.

```javascript
let cMinor = scribble.mode('C4 aeolian'); // [ 'C4', 'D4', 'D#4', 'F4' ...]
```

You can list all the available scales by invoking `scales` or `modes` method.

```javascript
const allScales = scribble.scales(); // returns an array of all the available scales from tonal
```

#### List of available scales/modes

- aeolian
- altered
- augmented
- augmented heptatonic
- balinese
- bebop
- bebop dominant
- bebop locrian
- bebop major
- bebop minor
- chromatic
- composite blues
- diminished
- dorian
- dorian #4
- double harmonic lydian
- double harmonic major
- egyptian
- enigmatic
- flamenco
- flat six pentatonic
- flat three pentatonic
- half-whole diminished
- harmonic major
- harmonic minor
- hirajoshi
- hungarian major
- hungarian minor
- ichikosucho
- in-sen
- ionian augmented
- ionian pentatonic
- iwato
- kafi raga
- kumoijoshi
- leading whole tone
- locrian
- locrian #2
- locrian major
- locrian pentatonic
- lydian
- lydian #5P pentatonic
- lydian #9
- lydian augmented
- lydian diminished
- lydian dominant
- lydian dominant pentatonic
- lydian minor
- lydian pentatonic
- major
- major blues
- major flat two pentatonic
- major pentatonic
- malkos raga
- melodic minor
- melodic minor fifth mode
- melodic minor second mode
- minor #7M pentatonic
- minor bebop
- minor blues
- minor hexatonic
- minor pentatonic
- minor six diminished
- minor six pentatonic
- mixolydian
- mixolydian pentatonic
- mystery #1
- neopolitan
- neopolitan major
- neopolitan major pentatonic
- neopolitan minor
- oriental
- pelog
- persian
- phrygian
- phrygian dominant
- piongio
- prometheus
- prometheus neopolitan
- purvi raga
- ritusen
- romanian minor
- scriabin
- six tone symmetric
- spanish heptatonic
- super locrian pentatonic
- todi raga
- vietnamese 1
- vietnamese 2
- whole tone
- whole tone pentatonic
