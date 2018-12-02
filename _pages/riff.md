---
layout: examples
title: Riff
permalink: /examples/riff
--- 

### Riff
Scribbletune can be used to generate a commonly used pattern for riffs in trance music.
{: .lead}

Before we go on, here's a sample of what we are gonna end up creating using Scribbletune.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/535502394&color=%230c0809&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

As you can imagine, this is a commonly used technique to create riffs. You randomly click some of the steps in a 16 beat pattern and move them around while sticking to a particular scale. Then, on a lower octave, add notes to the missing steps on a particular key to act as the counter point notes. This works great and quickly creates a nice little riff that looks a bit like this,

![Quarter notes](/images/riff-piano-roll.png)

Instead of doing it in a DAW, you can create a JavaScript function that does this and allow it to accept some things dynamically such as "key", "scale" and "chord degrees" to use as the progression. If you'd like to skip the explanation and directly use the script, then please [click here](https://gist.github.com/walmik/f3d2a0557810c68fa2e40ecff9f32343)

#### Pattern

Since we start by clicking around randomly in a DAW, we can easily create a JavaScript function that does this for us.

```
const getRandomPattern = function (count) {
  let str = '';
  for (let i=0; i < (count || 8); i++) {
    str += Math.round(Math.random()) ? 'x-' : '-x';
  }
  
  return str;
}
```
Here I m randomly alternating between `x-` and `-x` instead of `x` and `-` to avoid creating a pattern that is too sparse. The function will produce something like,

```
x--xx-x--xx--x-x
```

And it will create a slightly different pattern each time. 

#### Arp notes
Next, we'll put together some code that generates the notes we need using Scribbletune's [progression](/documentation/core/progression) and [arp](/documentation/core/arp) methods.

```
const arpNotes = scribble.arp({
  chords: scribble.progression.getChords('D4 harmonic minor', 'i III ii'),
  count: 3, // you can set any number from 2 to 8
  // The default value of order is 01234567 as count is 8 by default
  // If the `count` was 3 then you can use any combination of 0, 1 and 2
  order: '102' // Any number up to the `count`
  // Here the `count` is 3, hence any combination of 0, 1 and 2
  // If the `count` was 4 then you can use a combination of 0, 1, 3 and 3
});
```

This will create an array of notes that form the `i III ii` progression of the harmonic minor scale in the key of D.

#### Clip
We'll use these notes inside a function that does this dynamically. But before that, a quick note about the array we are going to generate here. Typically we'd use the [clip](/documentation/core/clip) method to do this. But as of this article, the clip method doesnt know how to merge 2 different styles of subdivisions. In this clip, we want the lower notes to be 1/32 notes and the higher notes to be 1/16. Hence we'll put together the clip ourselves.

The clip method just produces an array of object which look like this for each `x` (**MIDI note on**) in the pattern

```
{ note: [ 'D4' ], length: 32, level: 127 }
```

For each `-` (**MIDI note off**) in the pattern, the object looks like this,
```
{ note: null, length: 16, level: 127 }
```

Now that we know how to create a clip, we can loop over a pattern that looks like `x--xx-x--xx--x-x` and create a high note (using the arp notes we generated earlier) and 2 notes with 1/32 subdivision for each `-` where the first one would be a lower D note and the second one would be a MIDI note off event.

```
for (var i = 0; i < ptn.length; i++) {
  if (ptn[i] === 'x') {
    clip.push({ note: [ arpNotes[arpNotesCount] ], length: 32, level: 127 });
    arpNotesCount++;
  } else {
    clip.push({ note: [ scaleInKey[Math.round(Math.random() * 3)] ], length: 16, level: 127 });
    clip.push({ note: null, length: 16, level: 127 });
  }
}
```

Let's put this together into a single function that lets us pass a progression as an argument,

```
function getClip(prog = 'i III ii') {
  const arpNotes = scribble.arp({
    chords: scribble.progression.getChords('D4 harmonic minor', prog),
    count: 3,
    order: '102'
  });

  const clip = [];
  let arpNotesCount = 0;

  for (var i = 0; i < ptn.length; i++) {
    if (ptn[i] === 'x') {
      clip.push({ note: [ arpNotes[arpNotesCount] ], length: 32, level: 127 });
      arpNotesCount++;
    } else {
      clip.push({ note: [ scaleInKey[Math.round(Math.random() * 3)] ], length: 16, level: 127 });
      clip.push({ note: null, length: 16, level: 127 });
    }
  }

  return clip;
}
```

All we need to do now is to allow passing a "key" and "scale" dynamically (we hard coded D4 harmonic minor here). To do this we'll just wrap this function inside another function that allows us to set the key and scale. We'll also use the [midi](/documentation/core/midi) method to produce a MIDI file. [Click here](https://gist.github.com/walmik/f3d2a0557810c68fa2e40ecff9f32343) to see how the entire script looks.

If you download that script and run it from your terminal with `node riff.js`, you will get a MIDI file called `music.mid` which you can import in any DAW and play it with a virtual instrument of your choice. I used Ableton Live's Operator>Synth Lead>Epic Trance Lead along with Bazzism Kick plugin and Reaktor Blocks>Bling Deep Bass sound with some hats and snare to produce this riff:

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/535502394&color=%230c0809&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>



