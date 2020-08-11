// kick
var kickClip = scribble.clip({
  pattern: 'x',
  sample: 'https://scribbletune.com/sounds/kick.wav',
});

// bass
var bassClip = scribble.clip({
  pattern: '[-x]',
  sample: 'https://scribbletune.com/sounds/bass.wav',
});

// closed hats
var chClip = scribble.clip({
  pattern: '[xx][xx][xxx][xx]', // add a triplet in there
  sample: 'https://scribbletune.com/sounds/ch.wav',
});

// open hats
var ohClip = scribble.clip({
  pattern: '[-x][-x][-x][xx]',
  sample: 'https://scribbletune.com/sounds/oh.wav',
});

// clap/snare
var snareClip = scribble.clip({
  pattern: '-x',
  sample: 'https://scribbletune.com/sounds/snare.wav',
});

var kickClip3 = scribble.clip({
  pattern: 'x',
  sample: 'https://scribbletune.com/sounds/kick.wav',
});

Tone.Transport.bpm.value = 135;
Tone.context.resume().then(() => Tone.Transport.start());

var clips = [kickClip, bassClip, chClip, ohClip, snareClip];
function stopAllClips() {
  clips.forEach(function (clip) {
    try {
      clip.stop();
    } catch (e) {
      console.log(e);
    }
  });
  try {
    kickClip3.stop();
  } catch (e) {
    console.log(e);
  }
}

function startAllClips() {
  clips.forEach(function (clip) {
    try {
      clip.start();
    } catch (e) {}
  });
}

document.querySelectorAll('.btnStartAll') &&
  document.querySelectorAll('.btnStartAll').forEach(function (btn) {
    btn.addEventListener('click', function () {
      stopAllClips();
      startAllClips();
    });
  });

document.querySelectorAll('.btnStopAll') &&
  document.querySelectorAll('.btnStopAll').forEach(function (btn) {
    btn.addEventListener('click', function () {
      stopAllClips();
    });
  });

document.querySelector('#btnStartX') &&
  document.querySelector('#btnStartX').addEventListener('click', function () {
    stopAllClips();
    kickClip.start();
  });

document.querySelector('#btnStartX3') &&
  document.querySelector('#btnStartX3').addEventListener('click', function () {
    stopAllClips();
    kickClip3.start();
  });

document.querySelector('#btnStartBass') &&
  document
    .querySelector('#btnStartBass')
    .addEventListener('click', function () {
      stopAllClips();
      bassClip.start();
    });
