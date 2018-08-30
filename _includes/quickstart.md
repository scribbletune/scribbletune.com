```
npm install scribbletune
```

Let's put something together. Create a file called chords.js and paste the following in it,
	
```
const scribble = require('../src/');

// Create a clip that contains a musical idea
let clip = scribble.clip({
	notes: 'F#m C#m DM Bm EM AM DM C#m AM',
	pattern: '[xx][x-]'.repeat(8)
});

scribble.midi(clip, 'chords.mid');
```

Now execute that file in the terminal at the same location as you saved it,

```
node chords.js
```

This will generate a MIDI file called chords.mid in the same location as you executed this script. Here's how it sounded when I imported it into Garage Band and used the Synthesizer > EDM Chord > Sunrise Chords virtual instrument with a little reverb:
	<audio controls="">
		<source src="./chords.mp3" type="audio/mpeg">
	</audio>