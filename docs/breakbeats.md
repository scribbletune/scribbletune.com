### Classic breakbeats

Scribbletune can be used to generate classic breakbeats with slight variations each time they are generated.
{: .lead}

Before we go on, here's a sample of what we are gonna end up creating using Scribbletune.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/653692301&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

I am always on the lookout for patterns that I can use in Scribbletune and I came across this really nice [spreadsheet](https://docs.google.com/spreadsheets/d/19_3BxUMy3uy1Gb0V8Wc-TcG7q16Amfn6e8QVw4-HuD0/edit#gid=0) made public by the illustrious [Ethan Hein](http://www.ethanhein.com/wp/). Other than being a doctoral fellow, published author and [founder](https://musedlab.org/), he also has the top answer on Quora for [why good composers steal](https://www.quora.com/Why-do-good-composers-steal-and-what-did-Stravinsky-mean-by-this)!

Here's an example from the [spreadsheet](https://docs.google.com/spreadsheets/d/19_3BxUMy3uy1Gb0V8Wc-TcG7q16Amfn6e8QVw4-HuD0/edit#gid=0) for "The Funky Drummer". I never intend to reproduce exactly what an existing track does (and honestly no script in the world can possibly come anywhere close to James Brown's work) but if I can get a close enough beat that I can use in my personal productions, then I m happy with it.

![The Funky Drummer](/images/funky-drummer.png)

Here we can clearly see the down beats we need for a kick, snare, closed hats and an open hats part. This is how it would look if we transposed them to Scribbletune's minimalistic pattern language:

```
{
  kick: 'x-x---x---x--x-x',
  snare: '----x--x-x-xx--x',
  ch: 'xxxxxxx-xxxxx-xx',
  oh: '-------x-----x-x',
};
```

Let's use this in a new script called `drum-patterns.js` and make these a bit more interesting by adding some occasional variation.

```
const scribble = require('scribbletune');

const funkyDrummer = {
  kick: 'x-x---x---x--x-R',
  snare: '----x--x-[xR]-xx--[xR]',
  ch: 'xxxxxx[xR]-xxxxx-x[x[RR]]',
  oh: '-------[xR]-----x-R',
}
```

I added the `R` feature of Scribbletune patterns to randomly decide a MIDI note on OR MIDI off event. This will create a slight variation each time this script is run. The square braces will subdivide the note further to create an interesting pattern.

Next, we will use the [clip](/documentation/core/clip) method of Scribbletune on each of these and render a MIDI file with Scribbletune's [midi](/documentation/core/midi) method. Since the spreadsheet seems to use sixteenth notes, lets set the `subdiv` to use sixteenth notes as well (the default is a quarter note). Additionally, let's repeat each pattern 4 times to create 4 bars of music. This will also allow the `R` to render slight variations across the full length of 4 bars.

```
for (const p in funkyDrummer) {
  scribble.midi(
    scribble.clip({
      pattern: funkyDrummer[p].repeat(4), // Repeat the pattern to get 4 bars
      notes: 'c4',
      subdiv: '16n',
    }),
    'funkyDrummer_' + p + '.mid' // Give a name to your MIDI file
  );
}
```

That's it. This script will produce the following 4 MIDI files (I ve linked them to their MIDI versions just in case you want to download them and check them out):

- [funkyDrummer_kick.mid](/sounds/midi/funkyDrummer_kick.mid)
- [funkyDrummer_snare.mid](/sounds/midi/funkyDrummer_snare.mid)
- [funkyDrummer_ch.mid](/sounds/midi/funkyDrummer_ch.mid)
- [funkyDrummer_oh.mid](/sounds/midi/funkyDrummer_oh.mid)

I imported these MIDI files in Ableton Live and rendered them with a few drum hits samples I found online:

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/653692301&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>

<br>

##### More breakbeats?

Ethan's spreadsheet had a bunch of classic breakbeats like this one. I put them in a [JSON file called breakbeats.json](/js/breakbeats.json) and wrote a script that generates them all! [Download](/js/breakbeats.json) the JSON file and feel free to use the following script if you like. It will generate all the breakbeats prefixed with their names and a slightly varied pattern output each time and hence act as a good starting point for any breakbeats you'd like to add to your production!

```
const scribble = require('scribbletune');
const breakbeats = require('./breakbeats.json'); // Make sure you have this file next to this script

const generateMidiFiles = (obj, prefix) => {
  for (const p in obj) {
    scribble.midi(
      scribble.clip({
        pattern: obj[p].repeat(4), // Repeat the pattern to get 4 bars
        notes: 'c4',
        subdiv: '16n',
      }),
      prefix + '_' + p + '.mid' // Give a name to your MIDI file
    );
  }
};

for (const breakbeat in breakbeats) {
  generateMidiFiles(breakbeats[breakbeat], breakbeat);
}
```
