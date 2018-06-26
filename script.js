import Gameplay from './classes/Gameplay.js';
import Hero from './classes/Hero.js';
import { getRandomEquation, getRandomEnglishWord, randomizeLetters, getRandomOpponentsName, buildBody } from './helpers.js';

let hero = new Hero();
let opponent = new Hero();
let gameplay = new Gameplay();
let mathCalcData = {};
let translateData = {};
let randomizedWord = {};
document.querySelector('.opponent-name').textContent = getRandomOpponentsName();
render();
appendBody();

function onMathModalOpen() {
    mathCalcData = gameplay.getMathCalcData();
    console.log(mathCalcData);
    document.querySelector('.equation').textContent = mathCalcData.equation;
}

function appendBody() {
    const bodyParts = buildBody();
    bodyParts.forEach(part => {
        const image = new Image();
        image.src = part;
        document.querySelector('.opponent').appendChild(image);
        image.classList.add('person-image');
        image.classList.add('person-image-left');
        if (part.includes('bodies')) {
            image.classList.add('person-image-left__body');
        } else if (part.includes('left-arms')) {
            image.classList.add('person-image-left__left-arm');
        } else if (part.includes('right-arms')) {
            image.classList.add('person-image-left__right-arm');
        } else if (part.includes('faces')) {
            image.classList.add('person-image-left__face');
        } else if (part.includes('legs')) {
            image.classList.add('person-image-left__legs');
        }
    })
}

function onMathModalClose() {
    if (mathCalcData.result == document.querySelector('input').value) {
        document.querySelector('.input-math').value = '';
        gameplay.reduceOpponentsHp(10);
        heroScored()
    } else if (mathCalcData.result != document.querySelector('input').value) {
        document.querySelector('.input-math').value = '';
        heroFailed()
    }
    render()
}

function onTranslateModalOpen() {
    translateData = gameplay.getTranslateData();
    console.log(translateData);
    document.querySelector('.translate').textContent = translateData.phrase;
}

function onTranslateModalClose() {
    if (translateData.russianWord.toLowerCase() == document.querySelector('.input-translate').value.toLowerCase()) {
        document.querySelector('.input-translate').value = '';
        gameplay.reduceOpponentsHp(20);
        heroScored();
    } else if (translateData.russianWord.toLowerCase() != document.querySelector('.input-translate').value.toLowerCase()) {
        document.querySelector('.input-translate').value = '';
        heroFailed();
    }
    console.log(document.querySelector('.input-translate').value);
    render();
}

function onOrganizeModalOpen() {
    randomizedWord = randomizeLetters();
    const html = randomizedWord.randomizedWord.split('').map((letter) => `<span>${letter}</span>`).join('');
    document.querySelector("#sortable").innerHTML = html;
}

function onOrganizeModalClose() {
    const arr = Array.from(document.querySelector('#sortable').children);
    const result = arr.map((item) => item.textContent).join('');
    if (randomizedWord.word.toLowerCase() == result.toLowerCase()) {
        randomizedWord.word = "";
        gameplay.reduceOpponentsHp(30);
        heroScored();
    }
    else {
        randomizedWord.word = "";
        heroFailed();
    }

    render();
}

function heroScored() {
    document.querySelector('.goal-modal').hidden = false;
    document.querySelector('.ball-right').classList.toggle('hero-goal');
    setTimeout(() => {
        document.querySelector('.ball-right').classList.toggle('hero-goal');
        document.querySelector('.goal-modal').hidden = true;
    }, 3000)
}

function heroFailed() {
    document.querySelector('.ball-right').classList.toggle('hero-fail');
    document.querySelector('.fail-modal').hidden = false;
    toggleControllers();
    new Promise(res => {
        setTimeout(() => {
            document.querySelector('.ball-right').classList.toggle('hero-fail');
            res(document.querySelector('.fail-modal').hidden = true);
        }, 3000)

    })
    .then(res => mostersTurnRender())
    .then(res => opponentAttack())
}

function mostersTurnRender() {
    gameplay.changeTurn();
    document.querySelector('.ball').classList.toggle('ball-right');
    document.querySelector('.ball').classList.toggle('ball-left');
}

function opponentAttack() {
    gameplay.opponentAttack();
    return new Promise(res => {
        setTimeout(() => {
            document.querySelector('.ball-left').classList.toggle('opponent-goal');
            render();
            res(document.querySelector('.goal-modal').hidden = false);
        }, 3000)

    })
    .then(res => {
        setTimeout(() => {
            document.querySelector('.ball-left').classList.toggle('opponent-goal');
            document.querySelector('.ball').classList.toggle('ball-left');
            document.querySelector('.ball').classList.toggle('ball-right');
            document.querySelector('.goal-modal').hidden = true;
            toggleControllers();
        }, 3000)
    })
}


function render() {
    document.querySelector('.opponent-hp').textContent = gameplay.opponent.hp;
    document.querySelector('.hero-hp').textContent = gameplay.hero.hp;
    getWinner();
}

function toggleControllers() {
    const heroButtons = Array.from(document.querySelectorAll('.hero-controllers button'));
    heroButtons.forEach((button) => button.classList.toggle('disabled'))
}

function getWinner() {
    if (gameplay.opponent.hp <= 0) {
        document.querySelector('.final-modal').textContent = 'HERO WON!';
        document.querySelector('.final-modal').hidden = false;
        finishedGame();

    } else if (gameplay.hero.hp <= 0) {
        document.querySelector('.final-modal').textContent = 'OPPONENT WON!';
        document.querySelector('.final-modal').hidden = false;
        finishedGame();
    }
}

function finishedGame() {
    toggleControllers();
    document.querySelector('.btn-new-game').disabled = false;
}


function startNewGame() {
    document.querySelector('.ball').classList.remove('ball-left');
    document.querySelector('.final-modal').hidden = true;
    if (!document.querySelector('.ball').classList.contains('ball-right')) {
        document.querySelector('.ball').classList.add('ball-right');
    }
    hero = new Hero();
    opponent = new Hero();
    gameplay = new Gameplay();
    mathCalcData = {};
    translateData = {};
    randomizedWord = {};
    appendBody();
    document.querySelector('.btn-new-game').disabled = true;
    toggleControllers();
    document.querySelector('.opponent-name').textContent = getRandomOpponentsName();
    render();
}

document.querySelector('.btn-math').addEventListener('click', onMathModalOpen);
document.querySelector('.modal-close-math').addEventListener('click', onMathModalClose);
document.querySelector('.btn-translate').addEventListener('click', onTranslateModalOpen);
document.querySelector('.modal-close-translate').addEventListener('click', onTranslateModalClose);
document.querySelector('.btn-organize').addEventListener('click', onOrganizeModalOpen);
document.querySelector('.modal-close-organize').addEventListener('click', onOrganizeModalClose);
document.querySelector('.btn-new-game').addEventListener('click', startNewGame);

$(document).ready(function () {
    $('.modal').modal();
    $("#sortable").sortable();
    $("#sortable").disableSelection();
});






