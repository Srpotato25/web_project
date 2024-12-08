// Firebase configuration (asegúrate de que este código esté presente)
const firebaseConfig = {
    apiKey: "AIzaSyAowxVHvpmYoluiKnn_M5NMaku9EqcqPDk",
    authDomain: "web-project-f0c9c.firebaseapp.com",
    projectId: "web-project-f0c9c",
    storageBucket: "web-project-f0c9c.appspot.com",
    messagingSenderId: "1025383417170",
    appId: "1:1025383417170:web:51d30811a47a97ae6a268b",
    measurementId: "G-DG1EX6H6PQ"
};

// Inicializa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elemento del botón donde se mostrará el nombre del usuario
const userDropdownButton = document.getElementById("dropdownUser");

// Escuchar el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si el usuario está autenticado, mostrar solo su nombre
        const userName = user.displayName || user.email.split('@')[0]; // Si no tiene displayName, mostrar la parte local del correo
        userDropdownButton.innerHTML = `<i class="bi bi-person-circle"></i> ${userName}`;
    } else {
        // Si no hay usuario autenticado, mostrar "User"
        userDropdownButton.innerHTML = `<i class="bi bi-person-circle"></i> User`;
    }
});

// Agregar funcionalidad para el logout
const signOutButton = document.querySelector('.dropdown-item[href="#"]');
signOutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("User logged out.");
        // Redirigir a la página de inicio
        window.location.href = '/index.html';
    }).catch((error) => {
        console.error("Error logging out:", error.message);
    });
});


