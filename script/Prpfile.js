	function route() {
	let Object = window.localStorage.getItem("token");
	console.log(Object);
	if (Object != null) {
		window.location.href = "profile.html";
	}
	else {
		window.location.href = "index.html";
	}
}

// accesing the value and showing to profile page
let object = JSON.parse(window.localStorage.getItem("userDetails"));
document.getElementById("fullname").innerText = `${object.name}`;
document.getElementById("username").innerText = `${object.username}`;
document.getElementById("email").innerHTML = `Email:  ${object.email}`;
document.getElementById("password").innerHTML = `Password:  ${object.password}`;

// after logout it will redirect to signup page
function logout() {
	localStorage.clear();
	window.location.href = "index.html";
}