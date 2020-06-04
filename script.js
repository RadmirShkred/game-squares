let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $result = document.querySelector('#result');
let $gameTime = document.querySelector('#game-time');
let box = document.createElement('div');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime)

function handleBoxClick(event) {

    if (!isGameStarted) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function show($el) {
    $el.classList.remove('hide');
}

function hide($el) {
    $el.classList.add('hide');
}

function startGame() {
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');

    isGameStarted = true;
    $game.style.backgroundColor = 'white';
    hide($start);

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100)

    renderBox();
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime() {
    let time = parseInt($gameTime.value);
    $time.textContent = time.toFixed(1);
    show($timeHeader);
    hide($resultHeader);
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    $gameTime.removeAttribute('disabled');
    show($start);
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    hide($timeHeader);
    show($resultHeader);
}


function renderBox() {
    $game.innerHTML = '';

    let boxSize = getRandom(30, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    renderBoxColor();
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}

function renderBoxColor() {
    let red = getRandom(0, 255);
    let green = getRandom(0, 255);
    let blue = getRandom(0, 255);
    return box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
