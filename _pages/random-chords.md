---
layout: examples
title: Random Chords
permalink: /examples/random-chords
---

### Random Chords

If you randomly pick 2 or 3 notes from a scale or mode, you ll end up creating random chords. They wont necessarily sound good, but since we will use JavaScript for this, we can generate a bunch of chord progressions and tweak something that we like from that bunch. We will use [lodash](https://lodash.com/) for the random picking.

Here's a sample of what we will end up creating

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/872748478&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"></iframe>

<br>
If you d like to watch a video of how it's done, you can do so from here

<iframe width="560" height="315" src="https://www.youtube.com/embed/cCOElYQ1RzY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br>
If you do not want to write code OR are not a JavaScript programmer, then simply use this UI to generate and download MIDI files right from your browser.

<em>Please note: The audio is generated using your browser's capability to produce sound, hence the quality cannot be compared to a synth running in a DAW! Download the MIDI file to try it in your DAW.</em>
<section class="flex pad">
  <div>
    <h6>Root</h6>
    <select id="root">
      <option value="C">C</option>
      <option value="Db">Db</option>
      <option value="D">D</option>
      <option value="Eb">Eb</option>
      <option value="E">E</option>
      <option value="F">F</option>
      <option value="Gb">Gb</option>
      <option value="G">G</option>
      <option value="Ab">Ab</option>
      <option value="A">A</option>
      <option value="Bb">Bb</option>
      <option value="B">B</option>
    </select>
  </div>
  <div>
    <h6>Scale</h6>
    <select id="scales">
      <option value="major">major</option>
      <option value="minor">minor</option>
      <option value="dorian">dorian</option>
      <option value="lydian" selected>lydian</option>
      <option value="mixolydian">mixolydian</option>
      <option value="phrygian">phrygian</option>
      <option value="harmonic minor">harmonic minor</option>
      <option value="melodic minor">melodic minor</option>
    </select>
  </div>
  <div>
    <h6>Octaves</h6>
    <input type="checkbox" id="o1" /> <label for="o1">2</label>
    <input type="checkbox" id="o2" checked /> <label for="o1">3</label>
    <input type="checkbox" id="o3" checked /> <label for="o1">4</label>
  </div>
  <div>
    <h6>Pattern <span class="dim half">x - _ [ ]</span></h6>
    <input type="text" lastKnownValue="x___x___x___x___" value="x___x___x___x___" id="pattern" />
  </div>
  <div>
    <h6>Repeat
    <span class="dim" style="display: inline-block; width: 19px; text-align:right" id="repeatPatternDisplay">4</span>
    <span class="dim half">times</span></h6>
    <input type="range" min="1" max="16" value="4" id="repeatPattern" />
  </div>
  <div>
    <h6>MIDI</h6>
    <a href="#" id="controls">Play</a> (lo-fi)<br>
    <a href="#" id="downloadAnchor" download="random-chords.mid">Download</a>
  </div>
</section>

<hr>

##### Write your own script

We will create a new file called random-chords.js and start by importing our dependencies.

```
const _ = require('lodash');
const scribble = require('scribbletune');
```

For the set of notes, we ll start with the C major scale and a simple pattern

```
const setOfNotes = scribble.scale('C3 major');
const pattern = 'x___'.repeat(4);
```

Now we need to get the count of `x` in this pattern so that we can generate that many random chords. The count here is 4, but some times a pattern can be a bit intricate and the count may not be very evident. Hence we ll compute the count.

```
const count = pattern.replace(/[^x]/g, '').length;
```

Now we will randomly pick 2 notes from our set of notes for each count and construct our notes array along the way.

```
const notes = [];
for (let i = 0; i < count; i++) {
  notes.push(_.sampleSize([...setOfNotes], 3));
}
```

And that should be good enough to produce our MIDI file for this simple chord progression

```
scribble.midi(
  scribble.clip({
    notes,
    pattern,
  })
);
```

Finally, execute this file in your terminal with Node.js

```
node random-chords.js
```

<hr>

##### Ready to roll

You can use any DAW to do the rest of the steps. I use Ableton Live and a bunch of fancy third party VST instruments, hence I created a new group instrument by combining Arturia's Jupiter 8 V3 and U-he's Hive 2. I use the presets Space Osborne and HS Chapel Flowers respectively. On rendering the MIDI clip it sounded like this (your results may vary a bit as we pick notes randomly from the set of notes)

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/872747692&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"></iframe>

To make this a bit more interesting, I used the C lydian scale from 2 octaves and made the patttern a bit more intricate

```
const setOfNotes = scribble
  .scale('C3 lydian')
  .concat(scribble.scale('C4 lydian'));
const pattern = 'x__[xx]x_x_'.repeat(8);
```

I left the rest as is and rendered again, this is how it turned out.

<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/872748478&color=%23080404&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"></iframe>

The final code is around a dozen lines. [Here is a gist](https://gist.github.com/walmik/2460f014daf10af5b6570296dcb2cf8f) for your reference.

##### What next?
Try out [different scales](https://scribbletune.com/documentation/core/scale#list-of-available-scalesmodes), or notes from chords or manually set up the notes to get interesting chord progressions. Alter the pattern a bit and use the `R` character. Optionally use the randomNotes property in the `clip` method to pass the notes to be used for `R`. If you dont do this, then Scribbletune will simply adjust the level of that note or simply mute it randomly.

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js"></script>
<script src="/js/random-chords.js"></script>