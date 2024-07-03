document.getElementById("signupForm").addEventListener("submit", function (e) {
	e.preventDefault();
	checkInputs();
});

function signup() {
	var fullname = document.getElementById("name").value;
	var username = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirmpass = document.getElementById("confirmpass").value;
	var profilePicInput = document.getElementById("profilePic");

	if (password != confirmpass) {
		setError(confirmpass, "Password and confirm password do not match.");
	} else {
		if (fullname == "" || username == "" || email == "" || password == "" || confirmpass == "") {
			document.getElementById("errMsg").innerText = "Error: All the fields are mandatory";
			checkInputs();
		} else {
			document.getElementById("sucesMsg").innerText = "Successfully Signed up!";
			checkInputs();

			// Convert profile picture to Base64 string
			if (profilePicInput.files && profilePicInput.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var profilePicBase64 = e.target.result;

					// Store user details with profile picture
					// const userDetails = {
					// 		name: fullname,
					// 		username: username,
					// 		email: email,
					// 		password: password,
					// 		profilePic: profilePicBase64 // Add profile picture
					// };

					// Retrieve existing user details array from localStorage or create a new one
					let userDetailsArray = JSON.parse(window.localStorage.getItem("userDetailsArray")) || [];

					// Create a new user object
					const newUser = {
						name: fullnameValue,
						username: usernameValue,
						email: emailValue,
						password: passwordValue,
						profilePic: profilePicFile ? URL.createObjectURL(profilePicFile) : null // Store as blob URL
					};

					// Add the new user to the array
					userDetailsArray.push(newUser);

					// Save the updated array back to localStorage
					window.localStorage.setItem("userDetailsArray", JSON.stringify(userDetailsArray));


					// window.localStorage.setItem("userDetails", JSON.stringify(userDetails));

					// Generating token
					const generatedToken = generateString(16);
					window.localStorage.setItem("token", generatedToken);

					setTimeout(() => {
						window.location.href = "user.html"; // Redirect to user page after signup
					}, 1000);
				};
				reader.readAsDataURL(profilePicInput.files[0]);
			} else {
				// Handle case where no profile picture is uploaded
				const userDetails = {
					name: fullname,
					username: username,
					email: email,
					password: password,
					profilePic: null // No profile picture
				};

				window.localStorage.setItem("userDetails", JSON.stringify(userDetails));

				// Generating token
				const generatedToken = generateString(16);
				window.localStorage.setItem("token", generatedToken);

				setTimeout(() => {
					window.location.href = "user.html"; // Redirect to user page after signup
				}, 1000);
			}
		}
	}
}

function generateString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function setError(input, msg) {
	const formControl = input.parentElement;
	const small = formControl.querySelector("small");
	small.innerText = msg;
	formControl.className = "form-control error";
}

function setSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

function checkInputs() {
	const fullname = document.getElementById("name");
	const username = document.getElementById("username");
	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const confirmpass = document.getElementById("confirmpass");

	const nameValue = fullname.value.trim();
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const confirmValue = confirmpass.value.trim();

	if (nameValue === '') {
		setError(fullname, "This field cannot be blank!");
	} else {
		setSuccess(fullname);
	}

	if (usernameValue === '') {
		setError(username, "This field cannot be blank!");
	} else {
		setSuccess(username);
	}

	if (emailValue === '') {
		setError(email, "This field cannot be blank!");
	} else if (!isEmail(emailValue)) {
		setError(email, "Enter a valid email!");
	} else {
		setSuccess(email);
	}

	if (passwordValue === '') {
		setError(password, "This field cannot be blank!");
	} else if (passwordValue.length <= 4) {
		setError(password, "Password is too short!");
	} else {
		setSuccess(password);
	}

	if (confirmValue === '') {
		setError(confirmpass, "This field cannot be blank!");
	} else if (passwordValue !== confirmValue) {
		setError(confirmpass, "Passwords do not match!");
	} else {
		setSuccess(confirmpass);
	}
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
