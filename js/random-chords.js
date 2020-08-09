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

  var hydrateDownloadLink = function () {
    var setOfNotes = [];

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

    var p = (pattern.value || '').repeat(repeatPattern.value);
    var count = p.replace(/[^x]/g, '').length;
    var notes = [];

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

    console.log(notes);

    downloadAnchor.href = scribble.midi(
      scribble.clip({
        notes: notes,
        pattern: p,
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

  hydrateDownloadLink();
})();
