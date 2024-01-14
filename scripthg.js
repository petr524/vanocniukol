const difficultyLevels = {
    easy: 3,
    medium: 6,
    hard: 9,
  };
  
  let currentDifficulty = difficultyLevels.easy;
  let correctColor;


  
  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function generateOptions() {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
  
    for (let i = 0; i < currentDifficulty; i++) {
      const option = document.createElement('div');
      option.classList.add('option');
      option.style.backgroundColor = generateRandomColor();
      option.onclick = () => checkAnswer(option.style.backgroundColor);
      optionsContainer.appendChild(option);
    }
  
    correctColor = optionsContainer.children[Math.floor(Math.random() * currentDifficulty)].style.backgroundColor;
    document.getElementById('color-display').style.backgroundColor = correctColor;
  }
  
  function checkAnswer(color) {
    const message = document.getElementById('message');
    if (color === correctColor) {
      message.textContent = 'Správně!';
      message.style.color = 'green';
    } else {
      message.textContent = 'Chyba, zkuste to znovu.';
      message.style.color = 'red';
    }
  }
  
  function setDifficulty(difficulty) {
    currentDifficulty = difficultyLevels[difficulty];
    newGame();
  }
  
  function newGame() {
    const message = document.getElementById('message');
    message.textContent = '';
    message.style.color = '';
  
    generateOptions();
  }
  
  newGame();