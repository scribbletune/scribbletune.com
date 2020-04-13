---
layout: documentation
title: max
permalink: /documentation/max
---

### Max for Live

Scribbletune clips can be exported to be consumed by Max for Live devices in Ableton Live.
{: .lead}

Using a few methods from the [LiveAPI](https://docs.cycling74.com/max8/vignettes/jsliveapi), Scribbletune exposes a simple method called `max` which can draw MIDI notes in a [Ableton Live clip](https://www.ableton.com/en/manual/live-concepts/#4-7-midi-clips-and-midi-files). You can create a Scribbletune clip using the regular method `clip` and pass it on to the `max` method as it's first argument.

Scribbletune uses the currently selected clip in Ableton Live as the default clip to render MIDI information in. The `max` method also accepts a second `String` param that lets you define the Ableton Live clip you'd rather use than the currently selected one.

#### How to create a Max4Live device with Scribbletune

The JS object from Max4Live uses ES5 (somewhere between JS 1.7 and 1.8.5). Which means, if you'd like to use ES6 syntax, then you will need transpilation. Additionally, methods such as `String.repeat` will not work out of the box. Transpilation does not provision for these ES5 methods and you will need to add polyfills yourself. You will also need to export the transpiled JS to a global object so that Max4Live can reach it.

##### Get busy

Create a directory and `npm install` [scribbletune, webpack, babel etc](https://github.com/scribbletune/scribble4max/blob/master/package.json#L9-L25). Set up the `input` and `output` objects among other things for a [webpack config](https://github.com/scribbletune/scribble4max/blob/master/webpack.config.js) such that it exports a global object called `scribble`.

```javascript
entry: {
  main: './index.js'
},

output: {
  filename: 'scribble.js',
  path: __dirname,
  library: 'scribble' // this exports a global object
},
```

Once we have this, we can start building our Max4Live device.

Open up Ableton Live and drag a _Max Midi Effect_ on to a channel and click the edit button on it's top right. Once Max4Live opens up, save the device (amxd file) in the same location as our Webpack's output destination.

Let's write a simple program in our index.js (webpack entry point) that prints out the C Major scale in Max4Live's console (Max > Window > Max Console).

```javascript
/*global post:true*/
const scribble = require('scribbletune');

module.exports = function(scale) {
  post(scale);
};
```

If you run `npx webpack`, then we should have the scribble.js file available at the same location as our `amxd` file.

Click within the Max4Live editing environment and type `n`. In the box that appears, type `js scribble.js`. This tells Max4Live to use our transpiled JS file to be used by Max4Live's `js` object. This is how our Max4Live device looks so far:

![Quarter notes](/images/scribble4max1.png)

Now type `m` in the editing area of the device and then type `scribble "C4 major"`. Connect the only outlet from this message box to the only inlet on our JS node.

![Quarter notes](/images/scribble4max2.png)

Now, if you lock the device (lower left corner of the Max4Live window), you can click the message box and you should see the C major scale printed out in the Max Console:

`js: C4 D4 E4 F4 G4 A4 B4`

If you were able to get this far, then you ve more or less made it :) Beyond this is wonderful world waiting for you to explore! I went ahead and added a bunch of more nodes and a very simply script to generate a riff that allows you to select a root note and a scale.

![Quarter notes](/images/scribble4max3.png)

Here's a 21 seconds of this simple device in action:

<iframe width="560" height="315" src="https://www.youtube.com/embed/m2CGoT1fpxU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can [download an advanced version of this device](https://maxforlive.com/library/device/6146/scribble4max-riff) and try it out for yourself. Make sure to drop it on a channel and add a clip on it (keep it selected as you generate riffs on a click of a button). Clicking on any of the note names or the numbers (octaves) or any of the scales will generate a riff that has the pattern `x-xR-xRR`.

![Quarter notes](/images/scribble4max4.png)

This is just a very simple script but it does produce interesting patterns in any scale you like.

I have a separate repo for this. Feel free to can fork it and make it better: [https://github.com/scribbletune/scribble4max](https://github.com/scribbletune/scribble4max)

And here's a (slightly old but pretty solid) great set of articles by [Adam Murray](https://twitter.com/compusition) that can help you with JavaScript and Max4Live in general: [http://compusition.com/writings/js-live-api](http://compusition.com/writings/js-live-api)
