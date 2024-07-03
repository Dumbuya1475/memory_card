// Access form elements
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

// Event listener for form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});

function login() {
    const usernameValue = loginUsername.value.trim();
    const passwordValue = loginPassword.value.trim();

    // Retrieve stored user details from localStorage
    const storedUserDetails = JSON.parse(window.localStorage.getItem("userDetails"));

    // Check if the inputs match the stored user details
    if (storedUserDetails) {
        if (usernameValue === storedUserDetails.username && passwordValue === storedUserDetails.password) {
            setSuccess(loginUsername);
            setSuccess(loginPassword);
            alert("Login successful!");
            window.location.href = "user.html"; // Redirect to user page after successful login
        } else {
            setError(loginUsername, "Username or password is incorrect");
            setError(loginPassword, "Username or password is incorrect");
        }
    } else {
        setError(loginUsername, "No user found. Please sign up first.");
        setError(loginPassword, "No user found. Please sign up first.");
    }
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
