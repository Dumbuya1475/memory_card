// script.js

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const movesCountElement = document.getElementById('movesCount');
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const restartButton = document.getElementById('restartButton');

    let cardArray = [];
    let movesCount = 0;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    // Create the board with cards
    function createBoard() {
        gameBoard.innerHTML = ''; // Clear existing cards
        cardArray.sort(() => 0.5 - Math.random()); // Shuffle cards

        cardArray.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = item.name;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = "?";

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            const img = document.createElement('img');
            img.src = item.img;
            cardBack.appendChild(img);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Flip card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        movesCount++;
        movesCountElement.textContent = movesCount;

        checkForMatch();
    }

    // Check for match
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }

    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    // Unflip unmatched cards
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1500);
    }

    // Reset board
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Handle image uploads
    uploadButton.addEventListener('click', () => {
        const files = fileInput.files;
        if (files.length < 2 || files.length % 2 !== 0) {
            alert('Please upload an even number of images (at least 2 pairs).');
            return;
        }

        cardArray = [];
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const imgSrc = reader.result;
                const cardName = file.name.split('.')[0];
                cardArray.push({ name: cardName, img: imgSrc });
                cardArray.push({ name: cardName, img: imgSrc }); // Add a pair
            };
            reader.readAsDataURL(file);
        });

        // Wait for the file reading to finish
        setTimeout(() => {
            createBoard();
            movesCount = 0;
            movesCountElement.textContent = movesCount;
        }, 500);
    });

    // Restart game
    restartButton.addEventListener('click', () => {
        movesCount = 0;
        movesCountElement.textContent = movesCount;
        createBoard();
    });
});
