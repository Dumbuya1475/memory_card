// JavaScript for controlling the background music
document.addEventListener('DOMContentLoaded', () => {
	const gameMusic = document.getElementById('gameMusic');

	// Wait for user interaction to unmute
	document.body.addEventListener('click', () => {
		gameMusic.muted = false;

		// Play the music explicitly after unmuting
		if (gameMusic.paused) {
			gameMusic.play().catch(error => {
				console.log('Auto-play was prevented:', error);
				// Inform the user to enable audio manually
				alert("Please enable audio by interacting with the page.");
			});
		}
	}, { once: true });

	// Buttons to control mute/unmute
	const muteButton = document.getElementById('muteButton');
	const unmuteButton = document.getElementById('unmuteButton');

	// Initial button visibility
	unmuteButton.style.visibility = 'hidden';
	unmuteButton.style.pointerEvents = 'none';
	muteButton.style.visibility = 'visible';
	muteButton.style.pointerEvents = 'auto';

	// Toggle mute/unmute
	function toggleMute() {
		if (gameMusic.muted) {
			gameMusic.muted = false;
			unmuteButton.style.visibility = 'visible';
			unmuteButton.style.pointerEvents = 'auto';
			muteButton.style.visibility = 'hidden';
			muteButton.style.pointerEvents = 'none';

			// Try to play the music after unmuting
			if (gameMusic.paused) {
				gameMusic.play().catch(error => {
					console.log('Auto-play was prevented:', error);
					alert("Please enable audio by interacting with the page.");
				});
			}
		} else {
			gameMusic.muted = true;
			muteButton.style.visibility = 'visible';
			muteButton.style.pointerEvents = 'auto';
			unmuteButton.style.visibility = 'hidden';
			unmuteButton.style.pointerEvents = 'none';
		}
	}

	// Event listeners for buttons
	muteButton.addEventListener('click', toggleMute);
	unmuteButton.addEventListener('click', toggleMute);

	// Ensure music auto-play works across browsers
	if (gameMusic.paused) {
		gameMusic.play().catch(error => {
			console.log('Auto-play was prevented:', error);
			// Optionally, you could inform the user to enable audio.
		});
	}
});
