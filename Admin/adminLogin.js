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
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const adminLoginForm = document.getElementById("sellerlogin");
const adminEmailInput = document.getElementById("Email");
const adminPasswordInput = document.getElementById("Password");

adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = adminEmailInput.value;
    const password = adminPasswordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (email === "admin@chepeadmin.com") {
                console.log("Admin logged in:", user);
                alert("Welcome, Admin!");
                // Redirigir a la vista del admin
                window.location.href = "/Admin/homeAdmin.html";
            } else {
                alert("Access denied. This portal is for administrators only.");
            }
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            alert("Invalid email or password. Please try again.");
        });
});


