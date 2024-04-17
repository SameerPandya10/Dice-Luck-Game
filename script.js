'use strict';

let gameWon = false;

let currScore = 0;
const score = document.querySelectorAll('.current-score');
const score_label = document.querySelectorAll('.current-label');

let currPlayer = 0;
const players = document.querySelectorAll('.player');

let playerScore = [0, 0];
let winner;
const finalscore = document.querySelectorAll('.score');

const btnDiceRoll = document.querySelector('.btn--roll');
const btnNewGm = document.querySelector('.btn--new');
const btnHld = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');
diceImg.style.display = 'None';
let currNum = '';

const switchPlayer = function () {
  if (!gameWon) {
    playerScore[currPlayer] += currScore;
    finalscore[currPlayer].textContent = playerScore[currPlayer];
    if (playerScore[currPlayer] >= 100) {
      players[currPlayer].classList.remove('player--active');
      players[currPlayer].classList.add('player--winner');
      score[currPlayer].classList.add('hidden');
      score_label[currPlayer].textContent = 'Winner 🥇';
      diceImg.style.display = 'None';
      gameWon = true;
      winner = currPlayer;
    } else {
      currScore = 0;
      score[currPlayer].textContent = 0;
      players[currPlayer].classList.remove('player--active');
      currPlayer = currPlayer === 0 ? 1 : 0;
      players[currPlayer].classList.add('player--active');
    }
  }
};

btnDiceRoll.addEventListener('click', () => {
  if (!gameWon) {
    diceImg.style.display = 'Block';
    const outcm = Math.trunc(Math.random() * 6) + 1;
    if (outcm === 1) {
      diceImg.src = 'public/images/dice-1.png';
      currScore = 0;
      switchPlayer();
    } else {
      currNum = `public/images/dice-${outcm}.png`;
      diceImg.src = currNum;
      currScore += outcm;
      score[currPlayer].textContent = currScore;
    }
  }
});

btnHld.addEventListener('click', switchPlayer);

btnNewGm.addEventListener('click', () => {
  playerScore = [0, 0];
  finalscore[0].textContent = 0;
  finalscore[1].textContent = 0;
  currScore = 0;
  score[0].textContent = 0;
  score[1].textContent = 0;
  diceImg.style.display = 'None';
  score[currPlayer].classList.remove('hidden');
  score_label[currPlayer].textContent = 'Current';
  if (currPlayer && !gameWon) {
    currPlayer = 0;
    players[1].classList.remove('player--active');
    players[0].classList.add('player--active');
  } else if (gameWon) {
    currPlayer = 0;
    players[winner].classList.remove('player--winner');
    players[0].classList.add('player--active');
    gameWon = false;
  }
});
