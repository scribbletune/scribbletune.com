---
layout: documentation
title: scale
permalink: /documentation/core/scale
---

### Scale
A scale is a set of musical notes ordered by pitch. Scribbletune uses [tonal](https://github.com/danigb/tonal) to expose scales (or modes).
{: .lead}

The scale method takes a string input that denotes the key and the scale you want. 

```
import { scale } from 'scribbletune';

// Create a clip that plays the middle C
let cMinor = scale('c4 minor'); // [ 'c4', 'd4', 'd#4' ... ]

// The scale method can also be refered to as `mode`
cMinor = scale('c4 minor'); // [ 'c4', 'd4', 'd#4' ... ]

// That's the same as
cMinor = scale('c4 aeolian'); // [ 'c4', 'd4', 'd#4', 'f4' ...]
```

You can list all the available scales by invoking `scales` method.

```
import { scales } from 'scribbletune';

// Create a clip that plays the middle C
const allScales = scales(); // returns an array of all the available scales
```
