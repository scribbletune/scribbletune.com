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

Recently I came across some fundamental [chord progression theory on artofcomposing.com](https://www.artofcomposing.com/composing-a-chord-progression) and quickly learnt the basics of putting together chord progressions. I decided to convert the repetitive aspect of this process to a JavaScript function that I could use in conjunction with Scribbletune. The result was pretty satisfying.

The instructor, [Jon Brantingham](https://www.artofcomposing.com/author/jonbrantingham), speaks about a recipe of sorts for a good chord progression. He goes pretty in-depth and explains really well and my take on it may be mediocre at best, but the theory suggests moving along the chord degrees formed by the Tonic (T), Predominant (P) and the Dominant (D) chord degrees. You are allowed to go from left to right only T -> P (otional) -> D. From D you can move to P if you like and then again you move right. If you chose to come to the Tonic from the Dominant, then the progression is complete. The instructor has a very [nice chart](https://www.artofcomposing.com/composing-a-chord-progression) for the major as well as the minor scales, that can help you visualize this really well.

One other thing Jon mentioned was, great composers avoided the `iii` chord degree and he also mentioned that using the `VII°` chord degree in the major scale chord progression required some amount of expertise. Hence we will leave out `iii` and `VII°` in this exercise and keep this really simple.

If we consider a Major scale, then these are the chord degrees: `I ii iii IV V vi VII°`. Since we have decided to leave out `iii` and `VII°`, we are left with `I ii IV V vi`. Out of these, `I` and `vi` are Tonic (T), `ii` and `IV` are Predominant (P) and V is Dominant (D). We will move from left to right and pick the degrees as we go along, sometimes optionally returning to P and then continuing again till we are done with at least 4 chords (later we will make the number of chords dynamic).

If we were to manually put this to use, say for the C Major scale, then this is what we have:

- Tonic: CM, Am
- Predominant: Dm, FM
- Dominant: GM

Going from left to right (T -> P -> D), we ll take `CM`, then pick `Dm`, `GM` and then back to `CM`, thus we have `CM, Dm, GM, CM`. This chord progression _will_ sound good! This is because we stuck to the rules. Let's take one more example, We ll take `Am` this time as the Tonic, and we' ll just skip the Predominant entirely and directly pick `GM` and then come back to the Tonic, and we ll pick `CM`. Thus we have `Am, GM, CM`. This too will sound fine as a progression :)

Now that we have a set of rules to follow, lets create a JavaScript method that ll help us do this instantly and yet throw out a different progression each time with the guarantee that it WILL sound good ;) We ll also move beyond the C Major scale and make it throw out chord progressions for any scale.

But before that, lets put together a utility method that ll let us pick a single element from an array (you could just use lodash's [pick](https://www.npmjs.com/package/lodash.pick) method too if you like):

```javascript
const pickOne = arr =>
  arr.length > 1 ? arr[Math.round(Math.random())] : arr[0];
```

And another quick method that'll flip a coin for us, or act as a random Boolean generator. We'll call it `dice`

```javascript
const dice = () => !!Math.round(Math.random());
```

Now we ll write a factory method that lets us create a random chord progression generator. The reason for chosing the factory pattern is because we will also need a chord progression generator that will work with minor scales.

```javascript
const getProgFactory = ({ T, P, D }) => {
  // our function generator comes here
};
```

In this method we are making a provision to pass in what we mean by Tonic (T), Predominant (P) and Dominant (D) as arrays. Doing this will let us stick to major vs minor scales or cook up entirely different sets of chord families. For this example however, we will stick to the major and minor scales only.

Within the method itself, we will go from Tonic to Predominant to Dominant and back to Tonic. We ll use our `dice` method to decide if we want to pick a chord for our progression or not.

```javascript
const getProgFactory = ({ T, P, D }) => {
  // return the function that we ll actually use
  return (count = 4) => {
    const chords = []; // This will be ultimately be our chord progression

    // Push a root/tonic to start with
    chords.push(pickOne(T));

    let i = 1;

    // Pick a predominant
    if (i < count - 1) {
      chords.push(pickOne(P));
      i++;
    }

    // Try another predominant
    if (i < count - 1 && dice()) {
      chords.push(pickOne(P));
      i++;
    }

    // Fill the rest with dominant
    while (i < count) {
      chords.push(pickOne(D));
      i++;
    }

    return chords;
  };
};
```

Now we can use this factory method to generate 2 methods. One of these will help us generate chord progressions from Major scales and one that will help generate chord progressions for the Minor scale:

```javascript
const M = getProgFactory({ T: ['I', 'vi'], P: ['ii', 'IV'], D: ['V'] });
const m = getProgFactory({ T: ['i', 'VI'], P: ['ii', 'iv'], D: ['V'] });

const progMajor = M(4).join(' ');
const progMinor = m(4).join(' ');

console.log(progMajor); // outputs something like 'vi IV IV V'
console.log(progMinor); // outputs something like 'i iv vii V'
```

Once we have our progression, we can use Scribbletune's `getChordsByProgression` method to generate the chords for any Major scale:

```javascript
import { getChordsByProgression } from 'scribbletune';
console.log(getChordsByProgression('C4 major', M(4).join(' '))); // outputs something like 'Am-4 Dm-4 Dm-4 GM-4' which you can use with Scribbletune directly to produce MIDI files or play in the browser
```

Taking this one step ahead, we can now use the chords we generate like this along with Scribbletune's `arp` method and patterns with the `R` character to create nice sounding arpeggios!

```javascript
const scribble = require('scribbletune'); // Using the ES5 syntax here just as an example

const c = scribble.clip({
  notes: 'D3',
  pattern: '[x-RR]'.repeat(16), // R will play notes from our progression
  randomNotes: scribble.arp({
    chords: scribble.getChordsByProgression('D4 minor', progMinor), // We are using the `m` method we generated earlier from our factory method
    count: 4,
    order: '1032',
  }),
});

scribble.midi(c, 'arp.mid');
```

This will generate a MIDI file of an arpeggiated chord progression.

Before I close, [here is a Github gist](https://gist.github.com/walmik/de21deccfb0aea88725bbd9262e9a443) of the factory method. In this I ve made a provision for enabling you to create chord progressions for more than 4 chords as well. Just call the method like this `M(8)` to get a chord progression of 8 chords.

And finally here is the MIDI file we generated rendered as a Aiff file using a synth called Loom which I recently purchased for under \$10 on pluginboutique.com and was more than satisfied with it! I also slapped on an instance of Ozone (Standard) on top of it with whatever that Master Assistant came up with.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/691481236&color=%23080404&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"></iframe>
