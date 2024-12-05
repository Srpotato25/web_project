// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAowxVHvpmYoluiKnn_M5NMaku9EqcqPDk",
    authDomain: "web-project-f0c9c.firebaseapp.com",
    projectId: "web-project-f0c9c",
    storageBucket: "web-project-f0c9c.appspot.com",
    messagingSenderId: "1025383417170",
    appId: "1:1025383417170:web:51d30811a47a97ae6a268b",
    measurementId: "G-DG1EX6H6PQ"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const confirmPassword = document.getElementById("confirm-password");
const signupName = document.getElementById("signup-name"); // Nuevo campo para nombre
const userIcon = document.getElementById("form-open");
const userDropdown = document.getElementById("userDropdown");
const logoutButton = document.getElementById("logoutButton");
const signupErrorMessage = document.getElementById("signup-error-message");
const modalContainer = document.querySelector(".form_container");
const closeLoginBtn = document.getElementById("closeLoginBtn");
const showSignupFormBtn = document.getElementById("show-signup-form");
const showLoginFormBtn = document.getElementById("show-login-form");


function toggleModal(show) {
    const homeSection = document.querySelector(".home");
    if (show) {
        homeSection.classList.add("show");
    } else {
        homeSection.classList.remove("show");
    }
}


function updateUserInterface(user) {
    if (user) {
        userIcon.classList.add("authenticated");
        userDropdown.classList.remove("hidden");
        toggleModal(false);
        document.querySelector(".login-form").classList.add("hidden");
        document.querySelector(".signup_form").classList.add("hidden");
    } else {
        userIcon.classList.remove("authenticated");
        userDropdown.classList.add("hidden");
        toggleModal(true);
        document.querySelector(".login-form").classList.remove("hidden");
        document.querySelector(".signup_form").classList.remove("hidden");
    }
}

userIcon.addEventListener("mouseover", () => {
    if (auth.currentUser) {
        userDropdown.classList.add("visible");
    }
});


userDropdown.addEventListener("mouseover", () => {
    userDropdown.classList.add("visible");
});

userDropdown.addEventListener("mouseout", () => {
    userDropdown.classList.remove("visible");
});


closeLoginBtn.addEventListener("click", () => {
    toggleModal(false);
});

showSignupFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".login-form").classList.remove("active");
    document.querySelector(".signup_form").classList.add("active");
});

// Switch to Login Form
showLoginFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".signup_form").classList.remove("active");
    document.querySelector(".login-form").classList.add("active");
});

// Login form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            updateUserInterface(user);
            alert("Login successful!");
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            alert("Invalid email or password. Please try again.");
        });
});


signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPass = confirmPassword.value;
    const name = signupName.value;
    if (password !== confirmPass) {
        signupErrorMessage.textContent = "Passwords do not match.";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User registered:", user);
            updateUserInterface(user);
            alert(`Signup successful! Welcome, ${name}!`); // Mostrar el nombre en el mensaje
        })
        .catch((error) => {
            console.error("Signup error:", error.message);
            signupErrorMessage.textContent = error.message;
        });
});


logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out.");
            updateUserInterface(null);
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
        });
});


onAuthStateChanged(auth, (user) => {
    updateUserInterface(user);
    if (user) {
        toggleModal(false); 
    } else {
        toggleModal(true);
    }
});



