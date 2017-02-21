const buzzerList = ['red', 'green', 'yellow', 'blue'];
const buttons = document.querySelector('#buttons');
const controls = document.querySelector('#controls');
const playSingleSound = (id) => document.getElementById(id).play();
const audioArray = ['redaudio', 'blueaudio', 'greenaudio', 'yellowaudio'];

const createBuzzerIgnore = buzzerList.map(function (item) {
  let buzzer = document.createElement('DIV');
  buzzer.setAttribute('id', item);
  buzzer.style.backgroundColor = item;
  buzzer.style.borderColor = item;
  buzzer.classList.add(item, 'buzzer');
  buttons.appendChild(buzzer);
});

const startButton = document.createElement('DIV');
startButton.setAttribute('id', 'start-button');
startButton.innerHTML = 'start';
startButton.classList.add('start-button');
startButton.addEventListener('click', () =>  picRandomSound(), false);

const resetButton = document.createElement('DIV');
resetButton.setAttribute('id', 'reset-button');
resetButton.innerHTML = 'reset';
resetButton.classList.add('reset-button');
resetButton.addEventListener('click', () => reset(), false);

const runRandomSoundArray = document.createElement('DIV');
runRandomSoundArray.setAttribute('id', 'run-button');
runRandomSoundArray.innerHTML = 'run';
runRandomSoundArray.classList.add('run-button');
runRandomSoundArray.addEventListener('click', function () { playRandomSoundArray(); }, false);

controls.appendChild(resetButton);
controls.appendChild(runRandomSoundArray);

document.querySelector('#red').addEventListener('click', () => hhh('redaudio'));
document.querySelector('#blue').addEventListener('click', () => hhh('blueaudio'));
document.querySelector('#green').addEventListener('click', () => hhh('greenaudio'));
document.querySelector('#yellow').addEventListener('click', () => hhh('yellowaudio'));

let timeoutIDIgnore;
let randomSoundArray = [];
let playedSoundArray = [];
let randomSoundArrayCounter = 0;

let hhh = (sound) => {
  playedSoundArray.push(sound);
  let uuu = playedSoundArray.length - 1;
  let ppp = randomSoundArray.length - 1;
  if (playedSoundArray.indexOf(sound, uuu) === randomSoundArray.indexOf(sound, uuu) && (uuu === ppp)) {
    playSingleSound(sound);

    setTimeout( () => playRandomSoundArray(), 1000);
  } else if (playedSoundArray.indexOf(sound, uuu) === randomSoundArray.indexOf(sound, uuu)) {
    playSingleSound(sound);
  } else {
    console.log('wrong should have been: ',  randomSoundArray[uuu]);
    console.log('playedSoundArray: ', playedSoundArray[uuu]);
  }
};

let picRandomSound = function () {
  let r = Math.floor(Math.random() * 4);
  let s = audioArray[r];
  randomSoundArray.push(s);
  playSingleSound(s);
};

let playRandomSoundArray = (randomSoundArrayLength = (randomSoundArray.length)) => {
  if (randomSoundArrayLength < 1 ) {
    document.querySelector('#run-button').classList.add('disable');
    picRandomSound();
    playedSoundArray = [];
    randomSoundArrayCounter = 0;
    console.log(randomSoundArray);
    return;
  }
  playSingleSound(randomSoundArray[randomSoundArrayCounter]);
  randomSoundArrayCounter = randomSoundArrayCounter + 1;
  randomSoundArrayLength = randomSoundArrayLength - 1;
  timeoutIDIgnore = setTimeout(function () { playRandomSoundArray(randomSoundArrayLength); }, 1000);
};

let reset = () => {
  document.querySelector('#run-button').classList.remove('disable');
  randomSoundArray = [];
  randomSoundArrayCounter = 0;
  playedSoundArray = [];
};
