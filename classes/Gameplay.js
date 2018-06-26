import Hero from './Hero.js';
import { getRandomEquation, getRandomEnglishWord } from '../helpers.js';

const hero = new Hero();
const opponent = new Hero();

export default class Gameplay {
    constructor() {
        this.turn = 'hero';
        this.hero = new Hero();
        this.opponent = new Hero();

    }
    getMathCalcData() {
        return getRandomEquation();
    }

    getTranslateData() {
        return getRandomEnglishWord();
    }

    reduceOpponentsHp(hp) {
        if(this.turn === 'hero') this.opponent.hp -= hp;
        else if (this.turn === 'opponent') this.hero.hp -= hp;
    }

    opponentAttack() {
        if(this.turn === 'hero') return;
        this.hero.hp -= 30;
        this.changeTurn();
    }

    isItHeroTurn() {
        if (this.turn !== 'hero') return false;
        return true;
    }

    changeTurn() {
        if (this.turn === 'hero') {
            this.turn = 'opponent';
        }
        else if (this.turn === 'opponent') {
            this.turn = 'hero';
        }
    }
}