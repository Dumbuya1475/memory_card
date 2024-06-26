// This file controls the logic and faction for the game1.html [path memoriser]

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('gridContainer');
  const startGameButton = document.getElementById('startGameButton');
  const feedbackMessage = document.getElementById('feedbackMessage');
  const gridSize = 5; // Define the grid size (5x5)

  let highlightedIndexes = []; // Store highlighted cells
  let userPath = []; // Store user's clicked cells

  // Function to create the grid
  function createGrid() {
    gridContainer.innerHTML = ''; // Clear previous grid
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.index = i; // Store the index
      cell.addEventListener('click', handleCellClick); // Add click event listener
      gridContainer.appendChild(cell);
    }
  }

  // Function to highlight random cells
  function highlightCells() {
    const cells = document.querySelectorAll('.grid-cell');
    const numberOfCellsToHighlight = Math.floor(gridSize * gridSize * 0.2); // 20% of the grid
    highlightedIndexes = getRandomIndexes(numberOfCellsToHighlight);

    highlightedIndexes.forEach(index => {
      cells[index].classList.add('active');
    });

    // After 10 seconds, remove the highlight and start user interaction
    setTimeout(() => {
      cells.forEach(cell => cell.classList.remove('active'));
      enableUserInteraction();
    }, 3000);
  }

  // Function to get random indexes
  function getRandomIndexes(count) {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }

  // Enable user interaction by allowing clicks on grid cells
  function enableUserInteraction() {
    userPath = []; // Reset user path
    feedbackMessage.textContent = "Now, click on the cells in the order you remember!";
  }

  // Handle cell click
  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.dataset.index);

    // If cell is already clicked, ignore
    if (userPath.includes(cellIndex) || userPath.length >= highlightedIndexes.length) return;

    userPath.push(cellIndex);

    if (highlightedIndexes.includes(cellIndex)) {
      cell.classList.add('correct');
    } else {
      cell.classList.add('incorrect');
    }

    if (userPath.length === highlightedIndexes.length) {
      checkUserPath();
    }
  }

  // Check user's path against the highlighted cells
  function checkUserPath() {
    let correctCount = 0;
    userPath.forEach(index => {
      if (highlightedIndexes.includes(index)) {
        correctCount++;
      }
    });

    feedbackMessage.textContent = `You got ${correctCount} out of ${highlightedIndexes.length} correct!`;

    // Game reset after 3sec
    setTimeout(() => {
      resetGame();
    }, 3000);
  }

  // Reset the game to start over
  function resetGame() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      cell.classList.remove('correct', 'incorrect');
    });
    feedbackMessage.textContent = "";
  }

  // Start game button click handler
  startGameButton.addEventListener('click', () => {
    highlightCells();
  });

  // Initialize the grid
  createGrid();
});
