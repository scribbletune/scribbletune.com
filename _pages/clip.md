---
layout: documentation
title: Clip
permalink: /documentation/core/clip
---

### Clip
A clip is a container for a musical idea.  is a like a measure of music. It can be a single bar or two bars or how many ever bars you need. In DAWs such as Ableton Live and Propellerhead Reason, a clip is what you create in the session or arrangement view to capture a musical idea.
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
