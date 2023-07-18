notesGeneration()


const keysLetters = document.querySelectorAll('.piano_keys-list p');
const button = document.getElementById('button');
const volumeRange = document.getElementById('volumeRange');

button.addEventListener('click', function () {
    keysLetters.forEach(letter => {
        letter.classList.toggle('hidden');
    });
});

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const masterVolume = audioContext.createGain();
masterVolume.gain.value = 1.0;

volumeRange.addEventListener('input', function () {
    const volumeValue = parseFloat(this.value);
    const volume = volumeValue; 
    masterVolume.gain.value = volume;
});

function playSound(frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    oscillator.connect(masterVolume); 
    masterVolume.connect(audioContext.destination);

    oscillator.start();

    setTimeout(function () {
        oscillator.stop();
    }, 500);
}

function notesGeneration() {
    const keys = document.querySelectorAll('.piano_keys-list li');
    keys.forEach(key => {
        key.addEventListener('click', function () {

            switch (key.dataset.key) {
                case 'c':
                    playSound(261)
                    break;
                case 'cSharp':
                    playSound(277)
                    break;
                case 'd':
                    playSound(293)
                    break;
                case 'dSharp':
                    playSound(311)
                    break;
                case 'e':
                    playSound(329)
                    break;
                case 'f':
                    playSound(350)
                    break;
                case 'fSharp':
                    playSound(370)
                    break;
                case 'g':
                    playSound(392)
                    break;
                case 'gSharp':
                    playSound(415)
                    break;
                case 'a':
                    playSound(440)
                    break;
                case 'aSharp':
                    playSound(466)
                    break;
                case 'b':
                    playSound(493)
                    break;
                case 'cHigherOctave':
                    playSound(523)
                    break;
                case 'cHigherOctaveSharp':
                    playSound(554)
                    break;
                case 'dHigherOctave':
                    playSound(587)
                    break;
                case 'dHigherOctaveSharp':
                    playSound(622)
                    break;
                case 'eHigherOctave':
                    playSound(659)
                    break;
                case 'fHigherOctave':
                    playSound(698)
                    break;
                default:
                    break;
            }
        })
    })
 
}

notesGeneration();
