import enRuWords from './data/EN-RU-words.js';
import englishWords from './data/englishWords.js';
import { opponentsNames, opponentsSurnames, opponentsSubSurnames } from './data/opponentsNames.js';
import { leftArms, rightArms, bodies, faces, legs } from './data/bodyParts.js';

const obj = {
    '+'() { return this.a + this.b },
    '-'() { return this.a - this.b },
    '*'() { return this.a * this.b },
}

export const getRandomEquation = () => {
    let result = 0;
    obj.a = Math.floor(Math.random() * 10);
    obj.b = Math.floor(Math.random() * 10);
    const operators = ['-', '+', '*',];
    const operator = operators[Math.floor(Math.random() * 3)];
    if (operator === '+') result = obj['+']();
    else if (operator === '-') result = obj['-']();
    else if (operator === '*') result = obj['*']();

    return {
        equation: `${obj.a} ${operator} ${obj.b}`.toUpperCase(),
        result
    };
}

export const getRandomEnglishWord = () => {
    const currentObject = enRuWords[Math.floor(Math.random() * enRuWords.length)];
    const [englishWord, russianWord] = [currentObject['EN'], currentObject['RU']];
    return {
        phrase: `Translate ${englishWord.toUpperCase()} to Russian`,
        russianWord
    }
}

const getRandomWord = () => englishWords[Math.floor(Math.random() * englishWords.length)];

export const randomizeLetters = () => {
    let word = getRandomWord();
    let arr = word.split('');
    let newArr = [];
    while (arr.length) {
        let randomLetter = Math.floor(Math.random() * arr.length);
        newArr.push(arr.splice(randomLetter, 1));
    }
    const randomizedWord = newArr.join("").toUpperCase();
    return {
        randomizedWord,
        word
    };
}

export const getRandomOpponentsName = () =>  {
    return [opponentsNames, opponentsSurnames, opponentsSubSurnames]
        .map(item => item[Math.floor(Math.random() * item.length)])
        .join(' ');
}

export const buildBody = () => {
    return [leftArms, rightArms, bodies, faces, legs]
        .map(item => item[Math.floor(Math.random() * item.length)])
}