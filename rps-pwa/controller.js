const controller = (function() {
  let view;
  let gui;

  function init(_view) {
    view = _view;
    _cacheDom();
    _loadListeners();
    _loadServiceWorker();
  }

  const CHOICES = {
    paper: 'rock',
    rock: 'scissors',
    scissors: 'paper'
  };

  const MESSAGES = {
    playerWon: 'You won!',
    cpuWon: 'You lost :(',
    draw: 'Draw'
  };

  const PATH = './assets/img/';

  function _cacheDom() {
    gui = {
      rockBtn: view.getElementById('rockBtn'),
      scissorsBtn: view.getElementById('scissorsBtn'),
      paperBtn: view.getElementById('paperBtn'),
      playerScore: view.getElementById('playerScore'),
      cpuScore: view.getElementById('cpuScore'),
      playerChoice: view.getElementById('playerChoiceImg'),
      cpuChoice: view.getElementById('cpuChoiceImg'),
      resultMessage: view.getElementById('resultPhrase'),
      restartBtn: view.getElementById('restart')
    };
  }

  function _loadListeners() {
    gui.rockBtn.addEventListener('click', getPlayerChoice);
    gui.paperBtn.addEventListener('click', getPlayerChoice);
    gui.scissorsBtn.addEventListener('click', getPlayerChoice);
    gui.restartBtn.addEventListener('click', restartGame);
  }

  function getPlayerChoice(event) {
    const choice = event.target.name;
    setPlayerChoice(choice);
    checkWinner(choice);
  }

  function setPlayerChoice(choice) {
    gui.playerChoice.src = PATH + choice + '.png';
  }

  function setCpuChoice(choice) {
    gui.cpuChoice.src = PATH + choice + '.png';
  }

  function checkWinner(choice) {
    const cpuChoice = generateCpuChoice();
    setCpuChoice(cpuChoice);

    if (choice === cpuChoice) {
      printGameMessage('draw');
    }

    if (CHOICES[choice] === cpuChoice) {
      addPlayerScore('playerScore');
      printGameMessage('playerWon');
    }

    if (CHOICES[cpuChoice] === choice) {
      addPlayerScore('cpuScore');
      printGameMessage('cpuWon');
    }
  }

  function generateCpuChoice() {
    const keys = Object.keys(CHOICES);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function addPlayerScore(option) {
    const score = +gui[option].innerText;
    gui[option].innerHTML = score + 1;
  }

  function printGameMessage(option) {
    gui.resultMessage.innerHTML = MESSAGES[option];
  }

  function restartGame() {
    gui.playerScore.innerHTML = '0';
    gui.cpuScore.innerHTML = '0';
    gui.resultMessage = '';
  }

  function _loadServiceWorker() {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js').then(
        function(registration) {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          );
        },
        function(err) {
          console.log('ServiceWorker registration failed: ', err);
        }
      );
    });
  }

  return { init };
})();
