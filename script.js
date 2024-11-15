// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAowxVHvpmYoluiKnn_M5NMaku9EqcqPDk",
    authDomain: "web-project-f0c9c.firebaseapp.com",
    projectId: "web-project-f0c9c",
    storageBucket: "web-project-f0c9c.appspot.com",
    messagingSenderId: "1025383417170",
    appId: "1:1025383417170:web:51d30811a47a97ae6a268b",
    measurementId: "G-DG1EX6H6PQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

console.log("Firebase ha sido inicializado correctamente.");

// Función para manejar el cambio de estado de autenticación
auth.onAuthStateChanged(user => {
    const formContainer = document.querySelector(".form_container");
    const home = document.querySelector(".home");

    if (user) {
        // Usuario autenticado
        console.log("Usuario logueado:", user.email);

        // Limpiar formularios si el usuario está logueado
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.reset(); // Limpiar formulario de login

        // Cerrar el formulario de login automáticamente
        if (formContainer) {
            formContainer.classList.remove("show"); // Ocultar el contenedor del formulario
        }

        // Opcional: cambiar el estado visual (por ejemplo, mostrar contenido de usuario)
        home.classList.add("logged-in");
    } else {
        // Usuario no autenticado
        console.log("No hay usuario logueado.");
        home.classList.remove("logged-in");
    }
});

// Escuchar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Seleccionar el formulario de registro
    const signupForm = document.getElementById('signup-form');
    const signupErrorMessageDiv = document.getElementById('signup-error-message'); // Div de error para el formulario de registro

    // Escuchar el evento de envío del formulario de registro
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const confirmPassword = document.getElementById('confirm-password').value.trim();
            signupErrorMessageDiv.textContent = '';

            if (password !== confirmPassword) {
                signupErrorMessageDiv.textContent = "Las contraseñas no coinciden.";
                return;
            }

            if (password.length < 6) {
                signupErrorMessageDiv.textContent = "La contraseña debe tener al menos 6 caracteres.";
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  alert("Cuenta creada correctamente.");
                  signupForm.reset();

                  // Cambiar a login automáticamente
                  const formContainer = document.querySelector(".form_container");
                  if (formContainer) {
                      formContainer.querySelector('.signup_form').classList.remove('active');  // Ocultar signup
                      formContainer.querySelector('.login-form').classList.add('active');  // Mostrar login
                  }
              })
              .catch((error) => {
                  let errorMessage;
                  switch (error.code) {
                      case 'auth/email-already-in-use':
                          errorMessage = 'El correo electrónico ya está en uso.';
                          break;
                      case 'auth/invalid-email':
                          errorMessage = 'El correo electrónico es inválido.';
                          break;
                      case 'auth/weak-password':
                          errorMessage = 'La contraseña es demasiado débil.';
                          break;
                      default:
                          errorMessage = 'Ocurrió un error al crear la cuenta.';
                  }
                  signupErrorMessageDiv.textContent = `Error: ${errorMessage}`;
              });
        });
    }

    // Selección de elementos para la navegación del formulario
    const formOpenBtn = document.querySelector("#form-open"),
          home = document.querySelector(".home"),
          formContainer = document.querySelector(".form_container"),
          formCloseBtn = document.querySelector(".form_close"),
          signupBtn = document.querySelector("#show-signup-form"),  // Este es el botón para mostrar el formulario de registro
          loginBtn = document.querySelector("#show-login-form"),    // Este es el botón para mostrar el formulario de login
          pwShowHide = document.querySelectorAll(".fa-eye-slash, .fa-eye");

    // Mostrar el formulario al hacer clic en el ícono de usuario
    if (formOpenBtn && home) {
        formOpenBtn.addEventListener("click", () => {
            home.classList.add("show");
        });
    }

    // Cerrar el formulario al hacer clic en el ícono de cerrar
    if (formCloseBtn && home) {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
        });
    }

    // Mostrar/ocultar la contraseña
    if (pwShowHide) {
        pwShowHide.forEach((icon) => {
            icon.addEventListener("click", () => {
                let getPwInput = icon.parentElement.querySelector("input");
                if (getPwInput.type == "password") {
                    getPwInput.type = "text";
                    icon.classList.replace("fa-eye-slash", "fa-eye");
                } else {
                    getPwInput.type = "password";
                    icon.classList.replace("fa-eye", "fa-eye-slash");
                }
            });
        });
    }

    // Cambiar a registro cuando se hace clic en "Sign Up"
    if (signupBtn && formContainer) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.querySelector('.login-form').classList.remove('active'); // Ocultar login
            formContainer.querySelector('.signup_form').classList.add('active');  // Mostrar signup
        });
    }

    // Cambiar a login cuando se hace clic en "Log In"
    if (loginBtn && formContainer) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.querySelector('.signup_form').classList.remove('active');  // Ocultar signup
            formContainer.querySelector('.login-form').classList.add('active'); // Mostrar login
        });
    }

    // Seleccionar el formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    const loginErrorMessageDiv = document.getElementById('login-error-message');

    // Iniciar sesión
    if (loginForm && loginErrorMessageDiv) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            loginErrorMessageDiv.textContent = '';

            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  alert("Inicio de sesión exitoso.");
                  loginForm.reset(); // Limpiar los campos después de un inicio de sesión exitoso

                  // Cerrar el formulario de login
                  const formContainer = document.querySelector(".form_container");
                  if (formContainer) {
                      formContainer.classList.remove("show"); // Ocultar el formulario
                  }
              })
              .catch((error) => {
                  let errorMessage;
                  switch (error.code) {
                      case 'auth/user-not-found':
                          errorMessage = 'No se reconoce este correo, registra una cuenta nueva.';
                          break;
                      case 'auth/wrong-password':
                          errorMessage = 'Contraseña incorrecta.';
                          break;
                      default:
                          errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';
                  }
                  loginErrorMessageDiv.textContent = `Error: ${errorMessage}`;
              });
        });
    }

    // Cerrar sesión
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                alert("Has cerrado sesión correctamente.");
                // Opcional: Redirigir al inicio u otra página
                window.location.href = '/'; // Redirigir a la página de inicio
            }).catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
        });
    }
});





// Inicialización de Swiper
new Swiper(".swiper", {
    loop: true,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchBox = document.getElementById('searchBox');

    if (searchBtn && closeSearch && searchBox) {
        searchBtn.onclick = function() {
            searchBox.classList.add('active');
            searchBtn.style.display = 'none';
        };

        closeSearch.onclick = function() {
            searchBox.classList.remove('active');
            searchBtn.style.display = 'block';
        };
    }
});

// Cargar detalles del evento
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        title: params.get('title'),
        price: params.get('price'),
        image: params.get('image'),
        description: params.get('description')
    };
}

function loadEventDetails() {
    const { title, price, image, description } = getQueryParams();

    const eventTitle = document.getElementById('event-title');
    const eventPrice = document.getElementById('event-price');
    const eventImage = document.getElementById('event-image');
    const eventDetail = document.querySelector('.event-detail');

    if (eventTitle) eventTitle.textContent = title || "Evento sin título";
    if (eventPrice) eventPrice.textContent = `Precio: $${price || 'No disponible'}`;
    if (eventImage) {
        eventImage.src = image || "ruta/imagen-predeterminada.jpg";
        eventImage.onerror = function() {
            console.error("Error: No se pudo cargar la imagen desde " + image);
            eventImage.alt = "Imagen no disponible";
        };
    }

    if (eventDetail) {
        const eventDescription = document.createElement('p');
        eventDescription.textContent = description || "Descripción no disponible";
        eventDescription.classList.add('event-description');
        eventDetail.appendChild(eventDescription);
    }
}

// Ejecutar la carga de detalles del evento al cargar la página
window.onload = loadEventDetails;

// Realizar la reserva
function makeBooking() {
    const date = document.getElementById('booking-date').value;
    if (date) {
        alert(`Reserva realizada para el ${date}.`);
    } else {
        alert("Por favor, selecciona una fecha.");
    }
}

