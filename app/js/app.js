const buzzerList = ['red', 'green', 'yellow', 'blue'];
const app = document.querySelector('#app');
// let randomMusic = Math.floor(Math.random() * 4);
let timeoutID = '';
const createBuzzer = buzzerList.map(function (item) {
    let buzzer = document.createElement('DIV');
    buzzer.setAttribute('id', item);
    buzzer.style.backgroundColor = item;
    buzzer.style.borderColor = item;
    buzzer.classList.add(item, 'buzzer');
    app.appendChild(buzzer);
}
);
const startButton = document.createElement('DIV');
startButton.setAttribute('id', 'start-button');
startButton.innerHTML = 'start';
startButton.classList.add('start-button');
startButton.addEventListener('click', function () { return playSound(); }, false);

app.appendChild(startButton);

const runRandomSoundArray = document.createElement('DIV');
runRandomSoundArray.setAttribute('id', 'runRandomSoundArray');
runRandomSoundArray.innerHTML = 'run';
runRandomSoundArray.classList.add('run-button');
app.appendChild(runRandomSoundArray);

let randomSoundArray = [];

document.querySelector('#red').addEventListener('click', function () { return play_single_sound('redaudio'); });

document.querySelector('#blue').addEventListener('click', function () { return play_single_sound('blueaudio'); });

document.querySelector('#green').addEventListener('click', function () { return play_single_sound('greenaudio'); });

document.querySelector('#yellow').addEventListener('click', function () { return play_single_sound('yellowaudio'); });

function play_single_sound(id) {
    document.getElementById(id).play();
}

let audioArray = ['redaudio', 'blueaudio', 'greenaudio', 'yellowaudio'];

let randomSoundArrayLength = () => {
  var x = randomSoundArray.length;
  playRandomSoundArray(x)
};

let counterRandomSound = 0;
let counter = 0;
let playSound = function () {
    if (counterRandomSound === 0) {
        let r = Math.floor(Math.random() * 4);
        let s = audioArray[r];
        console.log('RANDOMMUSIC', r);
        randomSoundArray.push(s);
        console.log(randomSoundArray);
        document.getElementById(s).play();
    }
};

let playRandomSoundArray = (x) => {
if (x < 0 ) { return; }
let y = randomSoundArray[0];
  console.log('Y', y);
  play_single_sound(y);
  x = x - 1;
  timeoutID = setTimeout(function () { playRandomSoundArray(x); }, 1000);
};

runRandomSoundArray.addEventListener('click', function () { randomSoundArrayLength(); }, false);
