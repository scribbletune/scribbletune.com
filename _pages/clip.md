---
layout: documentation
title: clip
permalink: /documentation/core/clip
---

### Clip

A clip is a container for a musical idea. is a like a measure of music. It can be a single bar or two bars or how many ever bars you need. In DAWs such as Ableton Live and Propellerhead Reason, a clip is what you create in the session or arrangement view to capture a musical idea.
{: .lead}

The clip method takes an object literal as an argument. This object lets you define the parameters of that clip. Here is an example of the clip method being called with an object that sets up the most basic properties of the clip:

```
import { clip } from 'scribbletune';

// Create a clip that plays the middle C
const c = clip({
	notes: 'c4',
	pattern: 'x'
});

// Render a MIDI file of this clip
scribble.midi(c, 'c.mid');
```

##### Input parameters

The clip method accepts a JavaScript object as the only argument. This object can have the following properties:

###### notes `{String|Array}`

This property lets you set up the notes we want to play in the clip. You can enter notes manually or use the built-in scale/mode method to generate notes from a scale and further mangle them into an array. For instance, in the preceding example we set the 'c4' note as the only note to be played across a pattern. You can even set up a bunch of notes:

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'c4 d4 e4 f4 g4 a4 b4 c5', // Or ['c4', 'd4', 'e4' ...]
	pattern: 'x'.repeat(8)
});
```

In this example we explicitly set the notes of the C major scale in the 4th octave. Thanks to [tonal](https://github.com/danigb/tonal), Scribbletune also has a method to generate scales directly and output an array which you can then manipulate with JavaScript Array functions.

###### pattern `{String}`

This is the most important parameter for the clip method's object. It abstracts away the MIDI _note on_ and _note off_ events along with the individual note durations into a nifty 3 character instruction language made up only of `x`, `-`(hyphen) and `_`(underscore). This is native to Scribbletune and it's used in multiple ways across the Scribbletune library. Here's an example of what a pattern looks like and what it means:

```
xxxx
```

These are 4 quarter notes. By default a single `x` is a quarter note. The default can be changed to eigth note or half note or whatever. It might look like this in a DAW (if exported as MIDI from Scribbletune):

![Quarter notes](/images/quarter-notes.png)

As you can deduce, each x implies a _note on_ event (hence shows a note in the piano roll when imported) and each hyphen implies a _note off_ event which does not have any note in that location in the 16 beat clip. Other than setting note on and off events, we can even set the duration of a note on event using the pattern language's third and final character: `_` (underscore) character instead:

```
x__-x__-x__-x__-
```

An underscore implies a sustain to the preceding x. More underscores imply more sustain of the preceding x. Here's how it now looks in a piano roll:

![Quarter notes sustained](/images/quarter-notes-sustained.png)

###### shuffle `{Boolean}`

Setting this property will randomize the order of the notes you set in the clip method.

Here is an example of how multiple clips exported as MIDI files sounded when I imported these into Garage Band and played them over samples of a kick drum, snare and hi hats and a basic synth,

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/247079528&color=%232e2e2e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

###### sizzle `{Boolean | sin | cos | rampUp | rampDown}`

Setting this property will add a "sizzle" (in a manner of speaking) to the levels (volume) of the notes. Behind the scenes, Scribbletune will add different types of volume effects based on the property set. For example simply setting it true, will be the same as setting it to the sine function from trigonometry:

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'c4',
	pattern: 'x'.repeat(8),
	sizzle: true, // this is the same as setting it to 'sin'
});
```

Other values include "cos" (equivalent to the cosine function from trigonometry), "rampUp" and "rampDown" (as their name suggests, these will create an ascending or descending volumes for the notes in the clip).

###### sizzleReps `{Number}`

If you set the "sizzle" property on a clip, then Scribbletune will set the volumes for the entire clip based on the value set. But if you'd like to create a repeating shape, then you can set "sizzleReps" to a particular number,

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'c4',
	pattern: 'x'.repeat(16),
	sizzle: 'rampUp',
	sizzleReps: 4
});
```

In this example, we are setting a clip with 16 notes playing the C4 note. Scribbletune will create a pattern of incremental volumens for 4 notes (coz sizzleReps is set to 4) and repeat it for the duration of the clip, creating a pattern out of ascending volumes.

###### accent `{String}`

Like "sizzle", there is another property you can use in order to "accentuate" the notes in your clips. The `accent` property lets you specify a string as such `x--x`:

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'c4',
	pattern: 'x'.repeat(8),
	accent: 'x--x',
});
```

This will create a clip with 8 notes and the volumes of each notes would be set to:

```
100, 50, 50, 100, 100, 50, 50, 100
```

100 is set for `x` and 50 is set for `-`. These numbers are default values for `amp` and `accentLow`. You can set these too,

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'c4',
	pattern: 'x'.repeat(8),
	accent: 'x--x',
	amp: 127,
	accentLow: 30,
});
```

Now the volumes generated would be,

```
127, 30, 30, 127, 127, 30, 30, 127
```

Lastly, you can set `accent` as well as `sizzle`! This will make Scribbletune to set the volumes to be an average of the `amp` or `accentLow` with whatever they get computed by `sizzle`.

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'c4',
	pattern: 'x'.repeat(8),
	accent: 'x--x',
	amp: 127,
	accentLow: 30,
	sizzle: 'sin',
});
```

Now the volumes set will be an average of `accent` and `sizzle`:

```
64, 40, 60, 122, 127, 74, 60, 88
```
