// This file contain all button click function
function dashboardbtn() {
	var tooltip1 = document.getElementById('tooltip1')
	var tooltip2 = document.getElementById('tooltip2')
	var tooltip3 = document.getElementById('tooltip3')
	var tooltip4 = document.getElementById('tooltip4')
	var tooltip5 = document.getElementById('tooltip5')

	if (tooltip1.style.visibility == 'hidden') {
		document.getElementById('tooltip1').style.visibility = 'visible';
	} else if (tooltip1.style.visibility !== 'hidden') {
		document.getElementById('tooltip1').style.visibility = 'hidden'
	};
	if (tooltip2.style.visibility == 'hidden') {
		document.getElementById('tooltip2').style.visibility = 'visible';
	} else if (tooltip2.style.visibility !== 'hidden') {
		document.getElementById('tooltip2').style.visibility = 'hidden'
	};
	if (tooltip3.style.visibility == 'hidden') {
		document.getElementById('tooltip3').style.visibility = 'visible';
	} else if (tooltip3.style.visibility !== 'hidden') {
		document.getElementById('tooltip3').style.visibility = 'hidden'
	};
	if (tooltip4.style.visibility == 'hidden') {
		document.getElementById('tooltip4').style.visibility = 'visible';
	} else if (tooltip4.style.visibility !== 'hidden') {
		document.getElementById('tooltip4').style.visibility = 'hidden'
	};
	if (tooltip5.style.visibility == 'hidden') {
		document.getElementById('tooltip5').style.visibility = 'visible';
	} else if (tooltip5.style.visibility !== 'hidden') {
		document.getElementById('tooltip5').style.visibility = 'hidden'
	};
}

// Function to control popup
function closePopUp() {
	var popUp = document.getElementById('popUp')

	if (popUp.style.visibility == 'hidden') {
		document.getElementById('popUp').style.visibility = 'visible'
	} else if (popUp.style.visibility != 'hidden')
		document.getElementById('popUp').style.visibility = 'hidden'
	// alert('hello')
}

function togglePopUp() {
	document.getElementById('popUp').style.visibility = 'visible'
}

// JavaScript for controlling the background music
const gameMusic = document.getElementById('gameMusic');

// Optional: You can control the music with JavaScript
// For example, mute/unmute or change volume
function toggleMute() {
	gameMusic.muted = !gameMusic.muted;
}

// Optional: Example of adjusting volume
function setVolume(volume) {
	gameMusic.volume = volume; // volume should be between 0 and 1
}


const muteButton = document.getElementById('muteButton');
const fullButton = document.getElementById('fullButton');

muteButton.addEventListener('click', toggleMute);
fullButton.addEventListener('click', toggleMute);  // Use toggleMute for both, as it will handle the visibility

function toggleMute() {
	if (gameMusic.muted) {
		gameMusic.muted = false;
		fullButton.style.opacity = '0';
		fullButton.style.pointerEvents = 'none';
		muteButton.style.opacity = '1';
		muteButton.style.pointerEvents = 'auto';
	} else {
		gameMusic.muted = true;
		muteButton.style.opacity = '0';
		muteButton.style.pointerEvents = 'none';
		fullButton.style.opacity = '1';
		fullButton.style.pointerEvents = 'auto';
	}
}
