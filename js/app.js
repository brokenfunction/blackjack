const $btnRoll = document.querySelector('.btn-roll');
const $btnHold = document.querySelector('.btn-hold');
const $btnNew = document.querySelector('.btn-new');
const $dice = document.querySelector('.dice');


let gameBoard = {
    scores: [0,0],
    roundScore: 0,
    activePlayer: 0,
    gamePlaying: true
};

$btnRoll.addEventListener('click', rollBtnClick, false);
$btnHold.addEventListener('click', holdBtnClick, false);
$btnNew.addEventListener('click', init, false);

init();

function rollBtnClick() {
    if(gameBoard.gamePlaying) {
        const dice = Math.floor(Math.random() * 6 ) + 1;
        $dice.style.display = 'block';
        $dice.src = 'img/dice-' + dice + '.png';
        if(dice !== 1 ) {
            gameBoard.roundScore += dice;
            document.querySelector('#current-' + gameBoard.activePlayer).textContent = gameBoard.roundScore;
        } else {
            document.querySelector('.player-' + gameBoard.activePlayer + '-panel').classList.add('flashRed');
            setTimeout(function (activePlayer) {
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('flashRed');
            }, 1000, gameBoard.activePlayer);
            nextPlayer();
        }
    }
}

function holdBtnClick() {
    if(gameBoard.gamePlaying) {
        gameBoard.scores[gameBoard.activePlayer] += gameBoard.roundScore;
        document.querySelector('#score-' + gameBoard.activePlayer).textContent = gameBoard.scores[gameBoard.activePlayer];
        if(gameBoard.scores[gameBoard.activePlayer] >= 69 ) {
            document.getElementById('name-' + gameBoard.activePlayer).textContent = 'Winner';
            $dice.style.display = 'none';
            document.querySelector('.player-' + gameBoard.activePlayer + '-panel').classList.add('winner');
            gameBoard.gamePlaying = false;
        } else {
            document.querySelector('.player-' + gameBoard.activePlayer + '-panel').classList.add('greenFlash');
            setTimeout(function (activePlayer) {
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('greenFlash');
            }, 1000, gameBoard.activePlayer);
            nextPlayer();
        }
    }
}

function nextPlayer() {
    const currentScore = document.querySelectorAll('.player-current-score');
    const playerPanels = document.querySelectorAll('.player-panel');
    [].forEach.call(currentScore, el => {
        el.textContent = '0';
    });
    [].forEach.call(playerPanels, el => {
        el.classList.toggle('active');
    });
    gameBoard.activePlayer = (gameBoard.activePlayer === 0) ? 1 : 0;
    gameBoard.roundScore = 0;
    $dice.style.display = 'none';
}

function init() {
    gameBoard = {
        scores: [0,0],
        roundScore: 0,
        activePlayer: 0,
        gamePlaying: true
    };
    [].forEach.call(document.querySelectorAll('.player-current-score'), el => {
        el.textContent = '0';
    });
    [].forEach.call(document.querySelectorAll('.player-score'), el => {
        el.textContent = '0';
    });
    [].forEach.call(document.querySelectorAll('.player-panel'), el => {
        el.classList.remove('winner');
    });
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    $dice.style.display = 'none';
}