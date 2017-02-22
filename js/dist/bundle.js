(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    }, 700);
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

},{"good-listener":5}],2:[function(require,module,exports){
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],3:[function(require,module,exports){
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":2}],4:[function(require,module,exports){
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};

},{}],5:[function(require,module,exports){
var is = require('./is');
var delegate = require('delegate');

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;

},{"./is":4,"delegate":3}]},{},[1]);
