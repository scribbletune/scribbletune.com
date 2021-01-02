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

Using the `midi` method as is in the browser (with a filename as the second parameter), will generate a download href that looks like this

```
http://yourDomainOrLocalhost/5f9aa791-3509-4584-81aa-656c74597e98
```

You can create an anchor element out of it and set it's download attribute to whatever name you'd like to give to your MIDI file.

```
<a href="blob:http://yourDomainOrLocalhost/5f9aa791-3509-4584-81aa-656c74597e98" download="music.mid">Download MIDI file</a>
```

You can append this to any HTML node in your page. To change the value of the `href`, simply use `setAttribute` or `href` directly on the anchor element.

If you dont want this functionality, then pass `null` as the second argument. It will return `bytes` and you can wire up the download funtionality the way you like. Here is a reference you can follow:

```
// Sample Clip that renders the C Major scale
const c = scribble.clip({
  notes: scribble.scale('C4 major'),
  pattern: 'x'.repeat(7)
});

// Get hold of the bytes from the scribble.midi method
// (passing null as the second argument returns bytes)
const b = scribble.midi(c, null);

// Convert bytes to array buffer
// Ref: Accepted answer on https://stackoverflow.com/questions/35038884/download-file-from-bytes-in-javascript
var bytes = new Uint8Array(b.length);
for (var i = 0; i < b.length; i++) {
  var ascii = b.charCodeAt(i);
  bytes[i] = ascii;
}

// Create a Blob so that we can set it up with the type of file we want (for eg MIDI)
var blob = new Blob([bytes], {type: "audio/midi"});

// Create a link element to be used (you can use an existing link on the page as well)
var link = document.createElement('a');
link.href = window.URL.createObjectURL(blob);

// Give your downloadable file a name
link.download = 'music.mid';
link.innerText = 'Download MIDI file';
document.body.appendChild(link);
```

Here is a [complete HTML file](https://github.com/scribbletune/scribbletune/blob/master/dist/download.html) that makes use of this reference.

For additional information, please refer to the [installation section](/documentation/installation) to learn how to use Scribbletune in the browser.