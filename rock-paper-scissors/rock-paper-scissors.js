
// or we can do something like this
let score = JSON.parse(localStorage.getItem('score')) || 
{
  wins: 0,
  losses: 0,
  ties: 0
}
// this is using false operator, thus making it easier and shorter

// if(score === null) 
// {
//   score = 
//   {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   }
// };

updateScoreElement();
  
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {  
      //setInterval returns a id everytime it runs 
      //(always a different id)
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click',() => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click',() => {
    playGame('scissors');
  });

document.body.addEventListener('keydown',(event) => {
  const key = event.key;
  if(key === 'r') {
    playGame('rock');
  }
  else if(key === 'p') {
    playGame('paper');
  }
  else if(key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove)
{
  const computerMOve = pickComputerMove();

  let result = '';
  if (playerMove === 'scissors')
  {
    if(computerMOve === 'rock')
    {
      result = 'You lose.';
    }
    else if(computerMOve === 'paper')
    {
      result = 'You win.';
    }
    else
    {
      result = 'Tie.';
    }
  }
  
  else if(playerMove === 'paper')
  {
    if(computerMOve === 'rock')
    {
      result = 'You win.';
    }
    else if(computerMOve === 'paper')
    {
      result = 'Tie.';
    }
    else
    {
      result = 'You lose.';
    }
  }

  else if (playerMove === 'rock')
  {
    if(computerMOve === 'rock')
    {
      result = 'Tie.';
    }
    else if(computerMOve === 'paper')
    {
      result = 'You lose.';
    }
    else
    {
      result = 'You win.';
    }
  }
    if(result === 'You win.')
    {
      score.wins ++;
    }
    else if(result === 'You lose.')
    {
      score.losses ++;
    }
    else
    {
      score.ties ++;
    }

    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();
    
    document.querySelector('.js-result')
      .innerHTML = result;
      
    document.querySelector('.js-moves')
      .innerHTML = `
      You 
      <img class="move-icon" src="images/${playerMove}-emoji.png">
      <img class="move-icon" src="images/${computerMOve}-emoji.png">
      Computer`;
}

function updateScoreElement()
{
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove()
{
  const randomNumber = Math.random();
  let computerMOve = '';

  if(randomNumber >=0 && randomNumber <(1/3))
  {
    computerMOve = 'rock';
  }
  else if(randomNumber >=1/3 && randomNumber <(2/3))
  {
    computerMOve = 'paper';
  }
  else
  {
    computerMOve = 'scissors';
  }

  return computerMOve;
}

