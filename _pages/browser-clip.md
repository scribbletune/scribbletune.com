---
layout: documentation
title: clip
permalink: /documentation/browser/clip
---

### Clip (browser)

A clip is a container for a musical idea. It's like a measure of music. It can be a single bar or two bars or how many ever bars you need. This section outlines the `clip` method in the context of the browser. In essence it extends the base [clip method](/documentation/core/clip) and adds capabilities to play the clip in the browser.
{: .lead}

Please note: You must have [Tone.js](https://tonejs.github.io/) loaded in the browser for this to work.

The simplest way to use `clip` in the browser — without setting up a [Session](/documentation/browser/session) or Channel — is to pass a `sample` URL and a `pattern`. The method returns a Tone.js Sequence object that you can start and stop independently.

```js
import { clip } from "scribbletune";

const kickClip = clip({
  pattern: "x",
  sample: "https://scribbletune.com/sounds/kick.wav",
});

// Start the audio context followed by transport
// as browsers will not start the audio context
// unless the user has clicked a button
await Tone.start();
Tone.Transport.start();
kickClip.start(0);
```

To stop the clip:

```js
kickClip.stop(0);
```

You can create multiple independent clips and start or stop them at will:

```js
const kickClip = clip({
  pattern: "x",
  sample: "https://scribbletune.com/sounds/kick.wav",
});

const bassClip = clip({
  pattern: "[-x]",
  sample: "https://scribbletune.com/sounds/bass.wav",
});

// Do the following on the click of a button
await Tone.start();
Tone.Transport.start();

kickClip.start(0);
bassClip.start(0);
```

##### Input parameters

{:#sample}

###### sample `{String}` _(required for standalone use)_

The URL of an audio file to use as the sound source. Supports WAV format.

```js
const kick = clip({
  pattern: "x-x-",
  sample: "https://scribbletune.com/sounds/kick.wav",
});
```

{:#offlineRendering}

###### offlineRendering `{Boolean}`

When set to `true`, the clip is pre-rendered offline into a buffer. The method returns a `Tone.Player` instead of a `Tone.Sequence`. This can improve performance for complex clips.

```js
const rendered = clip({
  pattern: "x-x-",
  sample: "https://scribbletune.com/sounds/kick.wav",
  offlineRendering: true,
  offlineRenderingCallback: () => {
    console.log("Rendering complete — ready to play!");
  },
});
```

{:#offlineRenderingCallback}

###### offlineRenderingCallback `{Function}`

A callback fired when offline rendering is complete. Only relevant when `offlineRendering` is `true`.

##### Return value

`clip` returns a Tone.js Sequence (or a `Tone.Player` when `offlineRendering` is `true`). Both support `.start(time)` and `.stop(time)`:

| Method         | Description                                            |
| -------------- | ------------------------------------------------------ |
| `.start(time)` | Begin looping the clip. Pass `0` to start immediately. |
| `.stop(time)`  | Stop the clip. Pass `0` to stop immediately.           |

> **Important:** `Tone.Transport` must be running for clips to play. Call `await Tone.start()` (to resume the browser audio context) and `Tone.Transport.start()` before calling `.start()` on a clip.

#### Base clip

Do visit the base [clip method](/documentation/core/clip) to learn more about the pattern, subdiv and the other properties of the clip which are available in the browser clip as well. However please note, `sizzle` and `accent` will not work in the context of a browser clip.
