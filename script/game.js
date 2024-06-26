// This file contains game logic and functions for the memory game [game.html]
// Note game will start empty until user selects a game mode or uploads images
document.addEventListener('DOMContentLoaded', () => {
	const gameBoard = document.getElementById('gameBoard');
	const imageUpload = document.getElementById('imageUpload');
	let movesCount = 0;
	let hasFlippedCard = false;
	let lockBoard = false;
	let firstCard, secondCard;
	let cardArray = [];

	// Add event listeners for each game mode button
	document.getElementById('startGameWithAlphabet').addEventListener('click', startGameWithAlphabet);
	document.getElementById('startGameWithNumbers').addEventListener('click', startGameWithNumbers);
	document.getElementById('startGameWithImages').addEventListener('click', startGameWithImages);
	document.getElementById('startGameWithEmbeddedImages').addEventListener('click', startGameWithEmbeddedImages);

	// Add event listener for the restart button
	document.getElementById('restartButton').addEventListener('click', restartGame);

	// Function to create the game board with cards
	function createBoard() {
		gameBoard.innerHTML = '';
		cardArray.forEach(item => {
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
			if (item.img) {
				const img = document.createElement('img');
				img.src = item.img;
				cardBack.appendChild(img);
			} else {
				cardBack.textContent = item.name;
			}

			cardInner.appendChild(cardFront);
			cardInner.appendChild(cardBack);
			card.appendChild(cardInner);

			card.addEventListener('click', flipCard);
			gameBoard.appendChild(card);
		});
	}

	// Function to flip a card
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

	// Check if two cards match
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
		}, 500);
	}

	// Reset board variables
	function resetBoard() {
		[hasFlippedCard, lockBoard] = [false, false];
		[firstCard, secondCard] = [null, null];
	}

	// Restart the game
	function restartGame() {
		movesCount = 0;
		document.getElementById('movesCount').textContent = movesCount;
		cardArray.sort(() => 0.5 - Math.random());
		createBoard();
	}

	// Game modes functions
	function startGameWithAlphabet() {
		cardArray = generateCardArray('alphabet');
		restartGame();
	}

	// Game modes functions [Number mode]
	function startGameWithNumbers() {
		cardArray = generateCardArray('emoji');
		restartGame();
	}

	// Game modes functions [Image upload mode]
	function startGameWithImages() {
		// Trigger file input for user to upload images
		imageUpload.click();
	}

	// Game modes functions [Embedded images mode]
	function startGameWithEmbeddedImages() {
		cardArray = generateCardArray('embeddedImages');
		restartGame();
	}

	// Tis function is not working so I commented it out
	// Game modes functions [Random images mode]
	// function startGameWithRandomImages() {
	// cardArray = generateCardArray('randomImages');
	// restartGame();
	// }

	// Generate card array based on mode
	function generateCardArray(mode) {
		let array = [];
		switch (mode) {
			case 'alphabet':
				// loop through the alphabet and add pairs
				for (let i = 65; i < 65 + 8; i++) {
					let char = String.fromCharCode(i);
					array.push({ name: char, img: '' }, { name: char, img: '' });
				}
				break;
			case 'numbers':
				// loop through numbers and add pairs
				for (let i = 1; i <= 8; i++) {
					array.push({ name: i.toString(), img: '' }, { name: i.toString(), img: '' });
				}
				break;
			case 'embeddedImages':
				// embedded images are images that are already in the assets folder
				array = [
					{ name: '1', img: 'on' }, { name: '1', img: 'on' },
					{ name: '2', img: './assets/card_images/img2.jpg' }, { name: '2', img: './assets/card_images/img2.jpg' },
					{ name: '3', img: './assets/card_images/img3.jpg' }, { name: '3', img: './assets/card_images/img3.jpg' },
					{ name: '4', img: './assets/card_images/img4.jpg' }, { name: '4', img: './assets/card_images/img4.jpg' },
					{ name: '5', img: './assets/card_images/img5.jpg' }, { name: '5', img: './assets/card_images/img5.jpg' },
					{ name: '6', img: './assets/card_images/img6.jpg' }, { name: '6', img: './assets/card_images/img6.jpg' },
					{ name: '7', img: './assets/card_images/img7.jpg' }, { name: '7', img: './assets/card_images/img7.jpg' },
					{ name: '8', img: './assets/card_images/img8.jpg' }, { name: '8', img: './assets/card_images/img8.jpg' }
				];
				break;
			case 'emoji':
				// Array of cards with emojis instead of images
				array = [
					{ name: '1', emoji: '🐶' }, { name: '1', emoji: '🐶' },
					{ name: '2', emoji: '🐱' }, { name: '2', emoji: '🐱' },
					{ name: '3', emoji: '🐭' }, { name: '3', emoji: '🐭' },
					{ name: '4', emoji: '🐹' }, { name: '4', emoji: '🐹' },
					{ name: '5', emoji: '🐰' }, { name: '5', emoji: '🐰' },
					{ name: '6', emoji: '🦊' }, { name: '6', emoji: '🦊' },
					{ name: '7', emoji: '🐻' }, { name: '7', emoji: '🐻' },
					{ name: '8', emoji: '🐼' }, { name: '8', emoji: '🐼' }
				];
				break

			// i disable this function because it is not working
			// case 'randomImages':
			// for (let i = 1; i <= 8; i++) {
			// let imgURL = `https://placeimg.com/100/100/any?${Math.random()}`;
			// array.push({ name: i.toString(), img: imgURL }, { name: i.toString(), img: imgURL });
			// }
			// break;
			default:
				break;
		}
		return array.sort(() => 0.5 - Math.random());
	}

	// Handle user image uploads
	imageUpload.addEventListener('change', handleImageUpload);

	function handleImageUpload(event) {
		let files = Array.from(event.target.files);
		if (files.length % 2 !== 0) {
			alert("Please select an even number of images.");
			return;
		}
		cardArray = [];
		files.forEach(file => {
			let reader = new FileReader();
			reader.onload = function (e) {
				let imgURL = e.target.result;
				cardArray.push({ name: imgURL, img: imgURL });
				cardArray.push({ name: imgURL, img: imgURL }); // Add pairs
			};
			reader.readAsDataURL(file);
		});
		setTimeout(() => {
			cardArray.sort(() => 0.5 - Math.random());
			createBoard();
		}, 1000);
	}

	// Initialize the game with alphabet mode as default
	startGameWithAlphabet();
});
