(function () {
  var root = document.querySelector('#root');
  var scales = document.querySelector('#scales');
  var pattern = document.querySelector('#pattern');
  var repeatPattern = document.querySelector('#repeatPattern');
  var repeatPatternDisplay = document.querySelector('#repeatPatternDisplay');
  var o1 = document.querySelector('#o1');
  var o2 = document.querySelector('#o2');
  var o3 = document.querySelector('#o3');
  var downloadAnchor = document.querySelector('#downloadAnchor');
  var controls = document.querySelector('#controls');
  var isPlaying = false;
  var clip;

  var getNotes = function () {
    var setOfNotes = [];
    var p = (pattern.value || '').repeat(repeatPattern.value);
    var count = p.replace(/[^x]/g, '').length;
    var notes = [];

    if (o1.checked) {
      setOfNotes = setOfNotes.concat(
        scribble.scale(root.value + '2 ' + scales.value)
      );
    }

    if (o2.checked) {
      setOfNotes = setOfNotes.concat(
        scribble.scale(root.value + '3 ' + scales.value)
      );
    }

    if (o3.checked) {
      setOfNotes = setOfNotes.concat(
        scribble.scale(root.value + '4 ' + scales.value)
      );
    }

    for (let i = 0; i < count; i++) {
      notes.push(
        _.sampleSize(
          setOfNotes.map(function (el) {
            return el;
          }),
          3
        )
      );
    }

    return notes;
  };

  var hydrateDownloadLink = function () {
    if (isPlaying) {
      controls.click();
    }

    clip = scribble.clip({
      notes: getNotes(),
      pattern: (pattern.value || '').repeat(repeatPattern.value),
      effects: ['Reverb'],
      volume: -18,
      instrument: new Tone.PolySynth(Tone.Synth, {
        volume: 0,
        detune: 0,
        portamento: 2,
        envelope: {
          attack: 2.005,
          attackCurve: 'linear',
          decay: 0.1,
          decayCurve: 'exponential',
          release: 3,
          releaseCurve: 'exponential',
          sustain: 0.3,
        },
        oscillator: {
          partialCount: 8,
          partials: [1, 1, 1, 1, 1, 1, 1, 1],
          phase: 0,
          type: 'sine8',
        },
      }),
    });

    downloadAnchor.href = scribble.midi(
      scribble.clip({
        notes: getNotes(),
        pattern: (pattern.value || '').repeat(repeatPattern.value),
      }),
      'random-chords.mid'
    );
  };

  root.addEventListener('change', hydrateDownloadLink);
  scales.addEventListener('change', hydrateDownloadLink);
  o1.addEventListener('change', hydrateDownloadLink);
  o2.addEventListener('change', hydrateDownloadLink);
  o3.addEventListener('change', hydrateDownloadLink);
  pattern.addEventListener('input', function (e) {
    if (e.target.value.match(/[^x\-_\[\]R]/)) {
      alert('Invalid pattern. Use only x - _ [ ]');
      pattern.value = pattern.getAttribute('lastKnownValue');
      return;
    }
    hydrateDownloadLink();
  });

  repeatPattern.addEventListener('input', function (e) {
    repeatPatternDisplay.innerHTML = e.target.value;
    hydrateDownloadLink();
  });

  controls.addEventListener('click', function (e) {
    if (isPlaying) {
      isPlaying = false;
      controls.innerHTML = 'Play';
      clip.stop();
      Tone.Transport.stop();
      // re hydrate as clip is not available anymore after stopping
      hydrateDownloadLink();
    } else {
      isPlaying = true;
      controls.innerHTML = 'Stop';
      clip.start();
      Tone.context.resume().then(() => Tone.Transport.start());
    }

    e.preventDefault();
  });
  hydrateDownloadLink();
})();
