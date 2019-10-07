---
layout: examples
title: Chord Progressions
permalink: /examples/chord-progressions
---

### Generate chord progressions that always sound good

Scribbletune can be used to generate chord progressions based on basic music theory.
{: .lead}

Before we get into the code, here's what we will produce in this example

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/691481236&color=%23080404&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>

Recently I came across some fundamental chord progression theory on [the art of composing website](https://www.artofcomposing.com/composing-a-chord-progression) and quickly learnt the basics of putting together good sounding chord progressions. I decided to convert the repetitive aspect of this process to a method in Scribbletune. The result was pretty satisfying.

The instructor, [Jon Brantingham](https://www.artofcomposing.com/author/jonbrantingham), speaks about a recipe of sorts for a good chord progression. He goes pretty in-depth and explains really well and my take on it may be mediocre at best, but the theory suggests moving along the chord degrees formed by the Tonic (T), Predominant (P) and the Dominant (D) chord degrees. You are allowed to go from left to right only T -> P (otional) -> D. From D you can move to P if you like and then again you move right. If you chose to come to the Tonic from the Dominant, then the progression is complete. The instructor has a very [nice chart](https://www.artofcomposing.com/composing-a-chord-progression) for the major as well as the minor scales, that can help you visualize this really well.

One other thing Jon mentioned was, great composers avoided the `iii` chord for a major scale and he also mentioned that using the `VII°` chord degree required some amount of expertise. Hence Scribbletune leaves out `iii` and `VII°` to keep things really simple.

If we consider a Major scale, then these are the scale degrees:

```
I ii iii IV V vi VII°
```

Since we have decided to leave out `iii` and `VII°`, we are left with `I ii IV V vi`. Out of these,

- `I` and `vi` are Tonic (T)
- `ii` and `IV` are Predominant (P)
- `V` is Dominant (D).

We will move from left to right and pick the degrees as we go along, sometimes optionally returning to P and then continuing again till we are done with at least 4 chords (later we will make the number of chords dynamic).

If we were to manually put this to use, say for the C Major scale, then this is what we have:

- _Tonic_: CM, Am
- _Predominant_: Dm, FM
- _Dominant_: GM

Going from left to right (T -> P -> D), we ll take `CM` as the tonic, then pick `Dm`, `GM` and then back to `CM` (we need to come back to the tonic we picked), thus we have `CM, Dm, GM, CM`. This chord progression _will_ sound good! This is because we stuck to the rules. Let's take one more example, We ll take `Am` this time as the Tonic, and we' ll just skip the Predominant entirely and directly pick `GM` and then come back to the Tonic, and we ll pick `Am`. Thus we have `Am, GM, Am`. This too will sound fine as a progression :)

With this set of rules to follow, Scribbletune provides a method that ll help us do this instantly and yet throw out a different progression each time with the guarantee that it WILL sound good ;) Needless to say, it is not limited to the C Major scale as it can throw out chord progressions for any major or minor scale. AFAIK functional harmony does not apply to the modes, hence this method doesnt work in case of any of the modes other than Ionian and Aeolian.

```javascript
const scribble = require('scribbletune');
console.log(scribble.progression('M')); // outputs an array, e.g. ['I', 'ii', 'iii', 'V']
```

We can use Scribbletune's `getChordsByProgression` method to generate the chords from this progression:

```javascript
const scribble = require('scribbletune');
const majorChordProgression = scribble.progression('M').join(' ');
console.log(scribble.getChordsByProgression('C4 major', majorChordProgression)); // outputs something like 'Am-4 Dm-4 Dm-4 GM-4'
```

Taking this one step ahead, we can now use the chords we generate along with Scribbletune's `arp` method and patterns with the `R` character to create nice sounding arpeggios!

```javascript
const scribble = require('scribbletune');
const progMinor = progression('m').join(' ');
const c = scribble.clip({
  notes: 'D3',
  pattern: '[x-RR]'.repeat(16), // R will play notes from our progression
  randomNotes: scribble.arp({
    chords: scribble.getChordsByProgression('D4 minor', progMinor), // We are using the `m` method we generated earlier from our factory method
    count: 4,
    order: '1032',
  }),
});

scribble.midi(c, 'prog.mid');
```

Click here to [download the MIDI file](/sounds/midi/prog.mid) we generated. And finally here is the rendered Aiff file using a really nice but lesser known synth called [Loom](https://www.airmusictech.com/product/loom) which when purchased as a bundle cost me under \$13 on [pluginboutique.com](https://www.pluginboutique.com/product/1-Instruments/58-Inst-Bundle/1585-AIR-Music-Synth-Bundle). I also slapped on an instance of [Ozone](https://www.izotope.com/) on top of it with the default output of Master Assistant. Here's how it sounds:

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/691481236&color=%23080404&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>
