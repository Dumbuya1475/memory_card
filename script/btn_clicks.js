// This file contain all button click function
function dashboardbtn() {
	var tooltip1 = document.getElementById('tooltip1')
	var tooltip2 = document.getElementById('tooltip2')
	var tooltip3 = document.getElementById('tooltip3')
	var tooltip4 = document.getElementById('tooltip4')
	var tooltip5 = document.getElementById('tooltip5')
	var muteButton = document.getElementById('muteButton')
	// tooltip1.style.background = 'orange';
	// tooltip1.style.display = 'none';
	// alert('Hello')
	// var one = document.querySelector('#unmuteButton, #muteButton')

	if (tooltip1.style.visibility == 'hidden') {
		document.getElementById('tooltip1').style.visibility = 'visible';
	} else if (tooltip1.style.visibility == 'hidden') {
		document.getElementById('tooltip1').style.visibility = 'hidden'
	};
	muteButton.style.background = 'red'
	if (tooltip2.style.visibility == 'hidden') {
		document.getElementById('tooltip2').style.visibility = 'visible';
	} else if (tooltip2.style.visibility == 'hidden') {
		document.getElementById('tooltip2').style.visibility = 'hidden'
	};

	if (tooltip2.style.visibility === 'hidden') {
		document.getElementById('tooltip2').style.visibility = 'visible';
	} else if (tooltip2.style.visibility === 'visible') {
		document.getElementById('tooltip2').style.visibility = 'hidden'
	};
	// if (tooltip3.style.visibility == 'hidden') {
	// document.getElementById('tooltip3').style.visibility = 'visible';
	// } else if (tooltip3.style.visibility !== 'hidden') {
	// document.getElementById('tooltip3').style.visibility = 'hidden'
	// };
	// if (tooltip4.style.visibility == 'hidden') {
	// document.getElementById('tooltip4').style.visibility = 'visible';
	// } else if (tooltip4.style.visibility !== 'hidden') {
	// document.getElementById('tooltip4').style.visibility = 'hidden'
	// };
	// if (tooltip5.style.visibility == 'hidden') {
	// document.getElementById('tooltip5').style.visibility = 'visible';
	// } else if (tooltip5.style.visibility !== 'hidden') {
	// document.getElementById('tooltip5').style.visibility = 'hidden'
	// };
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


// Function for side bar for the game page
function openPanel() {
	document.getElementById("sidePanel").style.width = "100%";
	document.getElementById("sidePanel").style.height = "40%";
	document.getElementById("main-content").style.marginLeft = "0";
}

function closePanel() {
	document.getElementById("sidePanel").style.width = "0";
	document.getElementById("sidePanel").style.height = "0";
	// document.getElementById("main-content").style.marginLeft = "0";
}
