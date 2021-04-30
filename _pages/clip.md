---
layout: documentation
title: clip
permalink: /documentation/core/clip
---

### Clip

A clip is a container for a musical idea. It's like a measure of music. It can be a single bar or two bars or how many ever bars you need. In DAWs such as Ableton Live and Propellerhead Reason, a clip is what you create in the session or arrangement view to capture a musical idea.
{: .lead}

The clip method takes an object literal as an argument. This object lets you define the parameters of that clip. Here is an example of the clip method being called with an object that sets up the most basic properties of the clip:

```
import { clip } from 'scribbletune';

// Create a clip that plays the middle C
const c = clip({
	notes: 'C4',
	pattern: 'x'
});

// Render a MIDI file of this clip
scribble.midi(c, 'c.mid');
```

##### Input parameters

The clip method accepts a JavaScript object as the only argument. This object can have the following properties:

{:#notes}

###### notes `{String|Array}`

This property lets you set up the notes we want to play in the clip. You can enter notes manually or use the built-in scale/mode method to generate notes from a scale and further mangle them into an array. For instance, in the preceding example we set the 'c4' note as the only note to be played across a pattern. You can even set up a bunch of notes:

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'C4 D4 E4 F4 G4 A4 B4 C5', // Or ['C4', 'D4', 'E4' ...]
	pattern: 'x'.repeat(8)
});
```

In this example we explicitly set the notes of the C major scale in the 4th octave. Thanks to [tonal](https://github.com/danigb/tonal), Scribbletune also has a method to generate scales directly and output an array which you can then manipulate with JavaScript Array functions.

{:#pattern}

###### pattern `{String}`

This is the most important parameter for the clip method's object. It abstracts away the MIDI _note on_ and _note off_ events along with the individual note durations and few other MIDI instructions to form a simple notation language. It is made up only of the following characters:

<table class="table table-dark">
	<tr><td>x</td><td>Play a note</td></tr>
	<tr><td>-</td><td>Rest (dont play a note)</td></tr>
	<tr><td>_</td><td>Sustain a note </td></tr>
	<tr><td>R</td><td>Use a random notes from the randomNotes property (if defined) OR randomly set volume</td></tr>
	<tr><td>[</td><td>Start subdividing the note duration (based on the number of characters inserted)</td></tr>
	<tr><td>]</td><td>End subdividing (you can use nest subdivisions as well)</td></tr>
</table>

This is native to Scribbletune and it's used in multiple ways across the Scribbletune library. Here's an example of what a very simply pattern looks like,

```
xxxx
```

These are 4 quarter notes. By default a single `x` is a quarter note. The default can be changed to eighth note or half note or whatever. It might look like this in a DAW (if exported as MIDI from Scribbletune):

![Quarter notes](/images/quarter-notes.png)

As you can deduce, each x implies a _note on_ event (hence shows a note in the piano roll when imported) and each hyphen implies a _note off_ event which does not have any note in that location in the 16 beat clip. Other than setting note on and off events, we can even set the duration of a note on event using the pattern language's third and final character: `_` (underscore) character instead:

```
x__-x__-x__-x__-
```

An underscore implies a sustain to the preceding x. More underscores imply more sustain of the preceding x. Here's how it now looks in a piano roll:

![Quarter notes sustained](/images/quarter-notes-sustained.png)

Square braces allow splitting a note further enabling interesting, complex patterns. For instance if the note length is set to 4n (quarter note - default), then using square braces will subdivide the note further to 8n (eighth notes) or 16n (sixteenth notes) or even triplets. For example, in this pattern `xxx[xx]`, there will be 3 quarter notes followed by 2 sixteenth notes. In `xxx[x[xx]]`, there will be 3 quarter notes followed by 1 sixteenth and then 2 thirtysecond notes!

Lastly, the letter `R` is an experimental new addition to the pattern language and it will let you randomly decide if a note is to be added or not at the specified position. For example, in this patter `xxRx`, the quarter note at `R` will be randomly decided to be added or not (random midi note on/off). The volume of this note is governed by `accentLow` property of the clip.

If you set an additional property called `randomNotes` with a string or array of notes, `R` will then randomly select a note to play from these provided notes instead of randomly deciding note on or note off events.

`R` is a powerful feature to create interestingly intricate patterns.

{:#subdiv}

###### subdiv `{String}`

Setting this property will allow you to set the duration of each `x`. If not set, the default value is "4n" (quarter note).

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'C4',
	subdiv: '8n', // the default it a quarter note
	pattern: 'xx_[xx]'
});
```
In this example, we set the `subdiv` value to be "8n" (eigth note). This will set the default duration of each `x` to be a eighth note. Using this in combination with the rest of the pattern notation will now act as per eighth notes. So if the `pattern` is set to "xx_[xx]", each `x_` will be twice it's size, each `x` in square braces will be divided by the number of `x` s in the square braces (in this example, they ll be sixteenth notes each) and finally, each individual `x` which is not followed by an underscore nor within square braces will be one eighth note long.

To round it up, each `-` note off will also be eighth note long.

Valid values for subdiv are:
- 1m  (entire measure/bar)
- 2m (two measures)
- 3m (three measures)
- 4m (four measures)
- 1n (whole note)
- 2n (half note)
- 4n (eighth)
- 8n (sixteenth)
- 16n (sixteenth)


{:#shuffle}

###### shuffle `{Boolean}`

Setting this property will randomize the order of the notes you set in the clip method.

Here is an example of how multiple clips exported as MIDI files sounded when I imported these into Garage Band and played them over samples of a kick drum, snare and hi hats and a basic synth,

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/247079528&color=%232e2e2e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

{:#sizzle}

###### sizzle `{Boolean | sin | cos | rampUp | rampDown}`

Setting this property will add a "sizzle" (in a manner of speaking) to the levels (volume) of the notes. Behind the scenes, Scribbletune will add different types of volume effects based on the property set. For example simply setting it true, will be the same as setting it to the sine function from trigonometry:

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'C4',
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
	notes: 'C4',
	pattern: 'x'.repeat(16),
	sizzle: 'rampUp',
	sizzleReps: 4
});
```

In this example, we are setting a clip with 16 notes playing the C4 note. Scribbletune will create a pattern of incremental volumens for 4 notes (coz sizzleReps is set to 4) and repeat it for the duration of the clip, creating a pattern out of ascending volumes.

{:#accent}

###### accent `{String}`

Like "sizzle", there is another property you can use in order to "accentuate" the notes in your clips. The `accent` property lets you specify a string as such `x--x`:

```
import { clip } from 'scribbletune';

// Create a clip that plays the C major scale
const c = clip({
	notes: 'C4',
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
	notes: 'C4',
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
	notes: 'C4',
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
