const listen = require('good-listener');
const audioArray = ['red', 'blue', 'green', 'yellow'];
const buttons = document.querySelector('#buttons');
const controls = document.querySelector('#controls');

const playSingleSound = (id) => {
    let classId = 'div.' + id;
    document.getElementById(id).play();
    document.querySelector(classId).style.backgroundColor = '#ccc';
    setTimeout(function () {
        document.querySelector(classId).style.backgroundColor = '';
    }, 500);
}

document.querySelector('#run-button').addEventListener('click', () => playRandomSoundArray(), false);
document.querySelector('#reset-button').addEventListener('click', () => reset(), false);

document.querySelector('div.red').addEventListener('click', () => hhh('red'));
document.querySelector('div.blue').addEventListener('click', () => hhh('blue'));
document.querySelector('div.green').addEventListener('click', () => hhh('green'));
document.querySelector('div.yellow').addEventListener('click', () => hhh('yellow'));

let timeoutIDIgnore;
let randomSoundArray = [];
let playedSoundArray = [];
let randomSoundArrayCounter = 0;

let hhh = (sound) => {
    playedSoundArray.push(sound);
    if (playedSoundArray.length === 20) {
        playSingleSound(sound);
        victory();
        return
    }

    let uuu = playedSoundArray.length - 1;
    let ppp = randomSoundArray.length - 1;
    if (playedSoundArray.indexOf(sound, uuu) === randomSoundArray.indexOf(sound, uuu) && (uuu === ppp)) {
        playSingleSound(sound);
        setTimeout(() => playRandomSoundArray(), 1500);
    } else if (playedSoundArray.indexOf(sound, uuu) === randomSoundArray.indexOf(sound, uuu)) {
        playSingleSound(sound);
    } else {
        document.querySelector('#mOne').classList.remove('hide');
        document.querySelector('#mTwo').classList.remove('hide');
        document.querySelector('div.red').classList.add('hide');
        document.querySelector('div.blue').classList.add('hide');
        document.querySelector('div.yellow').classList.add('hide');
        document.querySelector('div.green').classList.add('hide');
        document.querySelector('#mOne').innerHTML = 'You should have pushed: ' + randomSoundArray[uuu];
        document.querySelector('#mTwo').innerHTML = 'You pushed: ' + playedSoundArray[uuu];

    }
};

let picRandomSound = function () {
    let r = Math.floor(Math.random() * 4);
    let s = audioArray[r];
    randomSoundArray.push(s);
    playSingleSound(s);
};

let counter = randomSoundArray.length;

function playRandomSoundArray(randomSoundArrayLength = (randomSoundArray.length)) {
    document.querySelector('#run-button').style.display = 'none';
    document.querySelector('#counter').style.display = 'flex';

    if (randomSoundArrayLength < 1) {
        picRandomSound();
        playedSoundArray = [];
        randomSoundArrayCounter = 0;
        counter = randomSoundArray.length;
        document.querySelector('#counter').innerHTML = counter;
        console.log(randomSoundArray);
        return;
    }

    playSingleSound(randomSoundArray[randomSoundArrayCounter]);
    randomSoundArrayCounter = randomSoundArrayCounter + 1;
    randomSoundArrayLength = randomSoundArrayLength - 1;
    timeoutIDIgnore = setTimeout(function () {
        playRandomSoundArray(randomSoundArrayLength);
    }, 400);
};

let victory = () => {
    document.querySelector('#mOne').classList.remove('hide');
    document.querySelector('#mTwo').classList.remove('hide');
    document.querySelector('div.red').classList.add('hide');
    document.querySelector('div.blue').classList.add('hide');
    document.querySelector('div.yellow').classList.add('hide');
    document.querySelector('div.green').classList.add('hide');
    document.querySelector('#mOne').innerHTML = 'Congradulations!';
    document.querySelector('#mTwo').innerHTML = 'You won this time.';
    // document.querySelector('#run-button').style.display = 'flex'
    // document.querySelector('#counter').style.display = 'none'
    // randomSoundArray = [];
    // randomSoundArrayCounter = 0;
    // playedSoundArray = [];
    // counter = randomSoundArray.length;
    setTimeout(() => reset(), 3000);
}

let reset = () => {
    document.querySelector('#mOne').classList.add('hide');
    document.querySelector('#mTwo').classList.add('hide');
    document.querySelector('div.red').classList.remove('hide');
    document.querySelector('div.blue').classList.remove('hide');
    document.querySelector('div.yellow').classList.remove('hide');
    document.querySelector('div.green').classList.remove('hide');
    document.querySelector('#run-button').style.display = 'flex'
    document.querySelector('#counter').style.display = 'none'
    randomSoundArray = [];
    randomSoundArrayCounter = 0;
    playedSoundArray = [];
    counter = randomSoundArray.length;
};
