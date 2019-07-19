---
layout: examples
title: Drum loop and a bassline
permalink: /examples/beat2
---

### Drum loop with a bassline

Scribbletune can be used to generate EDM beats that you'd other wise point and click to create in a DAW
{: .lead}

Before we go on, here's a sample of what we are gonna end up creating using Scribbletune.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/653204363&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

In many EDM genres, there is a inherent pattern for the kick drum to go on monotonously for about 8 bars and then do a small variation toward the end and then repeat. This ending bit, is more often than not, done randomly by manually moving a note or two, here and there till it sounds good to the producer. Same applies for the snare drum and hats. You can script this to get an instant starting point. You can certainly put together a bunch of MIDI files as start points but they would be static. With a script you can get a slightly new starting point every time.

We'll have a simple 4x4 kick drum along with a simple bass line, closed hat, open hats and a snare sound.

#### Kick

By default a single `x` implies a quarter note. 4 of these make up the common kick drum pattern.

```
const ptn = 'xxxx';
```

and 8 of these create a 8 bar section. We'll however create only 7 as we want a variation on the last bar.

```
const ptn = 'xxxx'.repeat(7);
```

Let's create variables that holds the ending bar

```
const A = 'xxx[x[RR]]';
const B = 'xx[x[RR]][x[RR]]';
const C = 'x-[x[RR]]';
```

In the above variables, we used a letter `R`. This character will randomly use a note from another property called `randomNotes`. But if such a property is not provided, then Scribbletune will randomy decide to do a MIDI note on OR MIDI note off event. This introduces a nice little variation amidst an otherwise well defined pattern.

We'll use these patterns to form our overall kick drum pattern.

```
const kick = scribble.clip({
  notes: 'c4',
  pattern: ptn + A + ptn + B + ptn + A + ptn + C,
});
```

As you can see, we have put together the base pattern along with the variable patterns to create a intricate combination of `x` and `-` characters with random usage of subdivisions via square braces and `R`.

Now we'll simply export this kick drum clip as a MIDI file,

```
scribble.midi(kick, 'kick.mid');
```

#### Hats

For the closed and open hats, we will have a single patterns sprinkled with `R` and square braces. You can pretty much play with whatever combination you want till you get a good sounding pattern. Do bear in mind to have a balanced set of square braces.

```
const ch = scribble.clip({
  pattern: '[xR][[x[xR]]]'.repeat(16),
  notes: 'c4',
  sizzle: 'sin',
  sizzleReps: 32,
});

scribble.midi(ch, 'ch.mid');

const oh = scribble.clip({
  notes: 'c4',
  pattern: '[-x][Rx][Rx][Rx]'.repeat(8),
});

scribble.midi(oh, 'oh.mid');
```

#### Snare

For the snare we will stick to the very common snare loop style where a downbeat comes on every 5th and 13th with a minor variation to the end on every second bar.

```
const D = '-x-x'; // base pattern
const E = '-[xR]-[Rx]'; // variation
const snare = scribble.clip({
  notes: 'c4',
  pattern: (D + D + E + D + D + E + D + D).repeat(4),
});

scribble.midi(snare, 'snare.mid');
```

#### Bassline

Finally for the bassline too we will use a similar format where we create 2 parts for the bass which will combine into one MIDI file. Let's use `Bb` on the second octave as the root note for the first part and G#2 as the root note on the ending part of our bassline. We will also use the `R` character along with the `randomNotes` property to setup some random notes from the `Bb minor` scale.

```
const bass = scribble.clip({
  notes: 'Bb2',
  pattern: '[-xRx][-xRR][-xRx][-xxR]'.repeat(2),
  randomNotes: scribble.scale('Bb2 minor').slice(1),
  accent: '--x-',
});

const bassEnd = scribble.clip({
  notes: 'G#2',
  pattern: '[-xRx][-xRR][-xRx][-xxR]'.repeat(2),
  randomNotes: scribble.scale('Bb2 harmonic minor').slice(2, 5),
  accent: '--x-',
});

scribble.midi(bass.concat(bassEnd), 'bass.mid');
```

That's about it. Now if you run this script from the terminal, Scribbletune will produce 5 MIDI files (I ve linked them to sample outputs):

- [kick.mid](/sounds/midi/kick.mid)
- [ch.mid](/sounds/midi/ch.mid)
- [oh.mid](/sounds/midi/oh.mid)
- [snare.mid](/sounds/midi/snare.mid)
- [bass.mid](/sounds/midi/bass.mid)

I imported these into Ableton Live and rendered them with some samples from the free Mechanimal PsyTrance sample pack and used Ozone on the Master channel. Here it is again,

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/653204363&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

Now you can use this script as a starting point to get a drum beat going. You can edit the patterns till they suit your preference. I usually use `nodemon` on the script I m working on to get MIDI files on save and keep trying them out in Ableton Live till I m satisfied with the result.

Here's the script in it's entirety (make sure you have installed [Node.js](https://nodejs.org/en/download/) and [scribbletune](/documentation/installation) before running it from the terminal)

<script src="https://gist.github.com/walmik/8c20b24492661f8ee5c1b7d6e9434108.js"></script>
