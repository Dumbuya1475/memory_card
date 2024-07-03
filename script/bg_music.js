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
	const tooltip2 = document.getElementById('tooltip2');
	const tooltip3 = document.getElementById('tooltip3');

	// Initial button visibility
	tooltip3.style.visibility = 'hidden';
	tooltip3.style.pointerEvents = 'none';
	tooltip2.style.visibility = 'visible';
	tooltip2.style.pointerEvents = 'auto';

	// Toggle mute/unmute
	function toggleMute() {
		if (gameMusic.muted) {
			gameMusic.muted = false;
			tooltip3.style.visibility = 'visible';
			tooltip3.style.pointerEvents = 'auto';
			tooltip2.style.visibility = 'hidden';
			tooltip2.style.pointerEvents = 'none';

			// Try to play the music after unmuting
			if (gameMusic.paused) {
				gameMusic.play().catch(error => {
					console.log('Auto-play was prevented:', error);
					alert("Please enable audio by interacting with the page.");
				});
			}
		} else {
			gameMusic.muted = true;
			tooltip2.style.visibility = 'visible';
			tooltip2.style.pointerEvents = 'auto';
			tooltip3.style.visibility = 'hidden';
			tooltip3.style.pointerEvents = 'none';
		}
	}

	// Event listeners for buttons
	tooltip2.addEventListener('click', toggleMute);
	tooltip3.addEventListener('click', toggleMute);

	// Ensure music auto-play works across browsers
	if (gameMusic.paused) {
		gameMusic.play().catch(error => {
			console.log('Auto-play was prevented:', error);
			// Optionally, you could inform the user to enable audio.
		});
	}
});
