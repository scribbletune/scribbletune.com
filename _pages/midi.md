---
layout: documentation
title: midi
permalink: /documentation/core/midi
---

### Midi
Scribbletune exports clips as MIDI files using the [jsmidgen](https://github.com/dingram/jsmidgen) module
{: .lead}

As the name suggests, the midi method generates a MIDI file from it's input. It takes 1 mandatory and 1 optional parameter:

- clip `{Array}` The clip that you create using the clip method
- filename `{String}` This is optional. If you don't provide a filename, Scribbletune will create a file called _music.mid_.

```
import { clip, progression, midi } from 'scribbletune';

const c = clip({
	notes: 'c4',
	pattern: 'x_______'
});

midi(c); // Will create a file called music.mid
// OR
midi(c, 'c.mid'); // Will create a file called c.mid
```
<br>

##### Create downloadable MIDI files from the browser

An additional feature as of v1.9.0 available in the `midi` method is the ability to export a byte string instead of MIDI file. This is useful when you want to provide an ability to allow users to create MIDI data and download it as a MIDI file from the browser. Just pass the `null` keyword as the second parameter of the `midi` method.

```
import {clip, midi} from 'scribbletune';

const c = clip({
  notes: 'c4',
  pattern: 'x'
});

const bytes = midi(c, null); // Pass `null` as the second param to get bytes
const b64 = btoa(bytes); // Encode byte string from Scribbletune as base64
const uri = 'data:audio/midi;base64,' + b64;
const link=document.createElement('a');

link.href=uri;
link.download = 'music.mid';
link.click(); // this will start a download of the MIDI byte string as a file called "music.mid"
```

Here is a [barebones JS Bin](https://jsbin.com/nabirinovo/edit?html,js,console,output) to play with this code. Please note, it might instantly download the music.mid file if your default JS Bin settings have Auto Run JS selected.

For additional information, please refer to the [installation section](/documentation/installation) to learn how to use Scribbletune in the browser.