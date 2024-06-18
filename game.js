// script.js

document.addEventListener('DOMContentLoaded', () => {
	const cardArray = [
		{ name: 'A', img: 'images/A.png' },
		{ name: 'A', img: 'images/A.png' },
		{ name: 'B', img: 'images/B.png' },
		{ name: 'B', img: 'images/B.png' },
		{ name: 'C', img: 'images/C.png' },
		{ name: 'C', img: 'images/C.png' },
		{ name: 'D', img: 'images/D.png' },
		{ name: 'D', img: 'images/D.png' },
		{ name: 'E', img: 'images/E.png' },
		{ name: 'E', img: 'images/E.png' },
		{ name: 'F', img: 'images/F.png' },
		{ name: 'F', img: 'images/F.png' },
		{ name: 'G', img: 'images/G.png' },
		{ name: 'G', img: 'images/G.png' },
		{ name: 'H', img: 'images/H.png' },
		{ name: 'H', img: 'images/H.png' }
	];

	cardArray.sort(() => 0.5 - Math.random());

	const gameBoard = document.getElementById('gameBoard');
	let movesCount = 0;
	let hasFlippedCard = false;
	let lockBoard = false;
	let firstCard, secondCard;

	// Create the board with cards
	function createBoard() {
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
			cardBack.textContent = item.name;

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
		document.getElementById('movesCount').textContent = movesCount;

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

	// Restart game
	document.getElementById('restartButton').addEventListener('click', () => {
		movesCount = 0;
		document.getElementById('movesCount').textContent = movesCount;
		gameBoard.innerHTML = '';
		cardArray.sort(() => 0.5 - Math.random());
		createBoard();
	});

	// Initialize game
	createBoard();
});
