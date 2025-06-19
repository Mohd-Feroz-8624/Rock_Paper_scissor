
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  lose: 0,
  Tie: 0
};

updateScoreElement();
let isAutoPlaying = false;
let intervalId = '';

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove()
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

}


document.querySelector('.rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.scissor-button').addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
  // console.log(event.key);
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let Result = '';

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      Result = 'Tie'
    } else if (computerMove === 'Paper') {
      Result = 'You Lose'
    } else if (computerMove === 'Scissors') {
      Result = 'You Win'
    }
  }
  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      Result = 'You Win';
    } else if (computerMove === 'Paper') {
      Result = 'Tie';
    } else if (computerMove === 'Scissors') {
      Result = 'You Lose';
    }

  } else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      Result = 'You Lose';
    } else if (computerMove === 'Paper') {
      Result = 'You Win';
    } else if (computerMove === 'Scissors') {
      Result = 'Tie';
    }

  }

  if (Result === 'You Win') {
    score.wins += 1;
  }
  else if (Result === 'You Lose') {
    score.lose += 1;
  }
  else if (Result === 'Tie') {
    score.Tie += 1;
  }

  localStorage.setItem('score', JSON.stringify(score))

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = Result;
  document.querySelector('.js-move')
    .innerHTML = `You 
        <img src="images/${playerMove}-emoji.png" class="img-1" >
        <img src="images/${computerMove}-emoji.png" class="img-1"> - Computer `;


  // alert(`You picked ${playerMove} . Computer picked ${computerMove}, ${Result} 
  // Score--> Wins:${score.wins} Lose:${score.lose} Ties:${score.Tie}`);

}
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins} lose: ${score.lose} Ties: ${score.Tie}`;
}

function pickComputerMove() {

  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  }
  else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';

  }
  return computerMove;
}

