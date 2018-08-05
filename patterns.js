(function() {
	var pianoRoll = document.getElementById('piano-roll');
	var ptnInput = document.getElementById('ptn-input');
	var btn = document.getElementById('btn');

	function getPtn() {
		var textContent = ptnInput.textContent;
		var ptn = textContent.replace(/\s/g, '');

		if (!ptn) {
		return fill16Beat('o');
		}
		if (isValidPtn(ptn)) {
		return fill16Beat(ptn);
		}

		try {
		ptn = eval(ptnInput.textContent);
		} catch (e) {
		ptn = '-';
		}

		return fill16Beat(ptn);
	}

	function fill16Beat(ptn) {
		if (ptn.length % 16 === 0) {
			return ptn;
		}

		var bars = Math.ceil(ptn.length / 16);
		var totalTicks = bars * 16;

		if (ptn.length === totalTicks) {
			return ptn;
		}

		// Since we took ceil, the number of ticks will not be more than totalTicks
		return ptn + 'o'.repeat(totalTicks - ptn.length);
	}

	function drawPattern(ptn) {
		// Empty current piano roll
		pianoRoll.innerHTML = '';
		ptn.split('').forEach(function(char) {
			// Create a node
			var note = document.createElement('div');
			note.classList.add('note');
			// Add class based on char
			if (char === 'x') {
			  note.classList.add('noteOn');
			}
		  
			if (char === '-') {
			  note.classList.add('noteOff');
			}
			// Append node to piano roll
			pianoRoll.appendChild(note);
		});
	}

	function isValidPtn(ptn) {
		return ptn.match(/[^x\-_]+/) === null;
	}

	function getTimeSignature() {
		var ptn = getPtn().replace(/o/g, '-');
		return ptn.length + 'n';
	}

	ptnInput.onkeyup = function(e) {
		drawPattern(getPtn());
	}

	drawPattern(fill16Beat('o'));
	console.log(ptnInput);
	ptnInput.focus();
}());
