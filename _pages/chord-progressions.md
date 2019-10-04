---
layout: examples
title: Chord Progressions
permalink: /examples/chord-progressions
---

### Generate chord progressions that always sound good [WIP]

Scribbletune can be used to generate chord progressions based on basic music theory.
{: .lead}

Recently I came across some fundamental [chord progression theory on artofcomposing.com](https://www.artofcomposing.com/composing-a-chord-progression) and quickly learnt the basics of putting together chord progressions that always sounded good! I decided to convert the repetitive aspect of constructing chord progressions to a JavaScript function that I could use in conjunction with Scribbletune. The result was pretty satisfying.

The instructor, [Jon Brantingham](https://www.artofcomposing.com/author/jonbrantingham), spoke about the way a chord progression is constructed. He goes pretty in-depth and explains really well and my take on it may be mediocre at best. So, the theory suggests moving from the chord degrees formed by the Tonic (T) to optionally the Predominant (P) and then to the Dominant (D). You are allowed to go right only T -> P (otional) -> D. From D you can move to P if you like and then again you move right. If you chose to come to the Tonic from the Dominant, then the progression is complete. The instructor has a very nice chart for the major as well as the minor scales, that can help you visualize this really well.

One other thing Jon mentioned was, great composers avoided the iii chord degree and he also mentioned that using the VII• chord degree in the major scale chord progression required some amount of expertise. Hence we will leave out iii and VII• in this exercise and keep this really simple.

If we consider a Major scale, then these are the chord degrees: I ii iii IV V vi VII•. Since we have decided to leave out iii and VII•, we are left with I ii IV V vi. Out of these, I and vi are Tonic (T), ii and IV are Predominant (P) and V is Dominant (D). We will move from left to right and pick the degrees as we go along, sometimes optionally returning to P and then continuing again till we come back to the Tonic.

If we were to manually put this to use, say for the C Major scale, then this is what we have:
Tonic: CM, Am
Predominant: Dm, FM
Dominant: GM

Going from left to right (T -> P -> D), we ll take CM, then pick Dm, GM and then back to CM, thus we have CM, Dm, GM, CM. This chord progression WILL sound good! This is because we stuck to the rules. Let's take one more example, We ll take Am this time as the tonic, and we' ll just skip the Predominant entirely and directly pick GM and then come back to the Tonic, and we ll pick CM. Thus we have Am, GM, CM. This too WILL sound fine as a progression :)

Now that we have a set of rules to follow, lets create a JavaScript method that ll help us do this instantly and yet throw out a different progression each time with the guarantee that it WILL sound good ;) We ll also move beyond CM and make it throw out chord progressions for any scale.

But before that, lets put together a method that ll let us pick a single element from an array:

```javascript
const pickOne = arr =>
  arr.length > 1 ? arr[Math.round(Math.random())] : arr[0];
```

And another quick method that ll flip a coin for us, or act as a random boolean generator. We'll call it `dice`

```javascript
const dice = () => !!Math.round(Math.random());
```

Now we ll write a factory method that lets us create a random chord progression generator. The reason for chosing the factory pattern is because we will also need a chord progression generator that will work with minor scales.

```javascript
const getProgFactory = ({ T, P, D }) => {
  // our function generator comes here
};
```

In this method we are making a provision to pass in what we mean by Tonic, Predominant and Dominant as arrays. Doing this will let us stick to major vs minor scales or cook up entirely different sets of chord families. For this example however, we will stick to the major and minor scales only.

Within the method itself, we will go from Tonic to Predominant to Dominant and back to Tonic. We ll use our `dice` method to decide if we want to pick a chord for our progression or not.

```javascript
const getProgFactory = ({ T, P, D }) => {
  // return the function that we ll actually use
  return (count = 4) => {
    const chords = [];

    // Push root/tonic to start with
    chords.push(pickOne(T));

    let i = 1;

    // Try one more tonic
    if (i < count - 1 && dice()) {
      chords.push(pickOne(T));
      i++;
    }

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
const m = getProgFactory({ T: ['i', 'VI'], P: ['ii', 'iv'], D: ['V', 'vii'] });
console.log(M(4)); // outputs something like [ 'vi', 'IV', 'IV', 'V' ]
console.log(m(4)); // outputs something like [ 'i', 'iv', 'vii', 'V' ]
```

Once we have our progression, we can use Scribbletune's `getChordsByProgression` method to generate the chords for any Major scale:

```javascript
import { getChordsByProgression } from 'scribbletune';
console.log(getChordsByProgression('C4 major', M(4).join(' '))); // outputs something like 'Am FM FM GM'
```

Taking this one step ahead, we can now use the chords we generate like this along with Scribbletune's `arp` method and patterns to create nice sounding arpeggios!

```javascript
const scribble = require('scribbletune'); // Using the ES5 syntax here just as an example

const c = scribble.clip({
  notes: scribble.arp(M(4).join(' ')), // We are using the `M` method we generated earlier from our factory method
  pattern: 'x'.repeat(32),
});

scribble.midi(c, 'arp.mid');
```

This will generate a MIDI file of an arpeggiated chord progression that WILL sound good!

Before I close, [here is a Github gist](https://gist.github.com/walmik/de21deccfb0aea88725bbd9262e9a443) of the factory method. And in this one I ve made a provision for enabling you to create chord progressions for more than 4 chords as well. Just call the method like this `M(8)` to get a chord progression of 8 chords.
