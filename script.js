// Importaciones de Firebase


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Escuchar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
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

    // Seleccionar el formulario de registro
    const signupForm = document.getElementById('signup-form');

    // Seleccionar el contenedor de mensajes de error
    const errorMessageDiv = document.getElementById('signup-error-message');

    // Escuchar el evento de envío del formulario
    signupForm.addEventListener("submit", function(event){
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos
        const email = document.getElementById('signup-email').value.trim(); 
        const password = document.getElementById('signup-password').value.trim(); 
        const confirmPassword = document.getElementById('confirm-password').value.trim(); 

        // Limpiar mensajes de error previos
        errorMessageDiv.textContent = '';

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            errorMessageDiv.textContent = "Las contraseñas no coinciden.";
            return;
        }

        // Opcional: Validar la fortaleza de la contraseña
        if (password.length < 6) {
            errorMessageDiv.textContent = "La contraseña debe tener al menos 6 caracteres.";
            return;
        }

        // Crear el usuario con Firebase
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Usuario creado exitosamente
            const user = userCredential.user;
            alert("Cuenta creada correctamente.");
            // Opcional: Limpiar el formulario
            signupForm.reset();
            // Opcional: Redirigir al usuario a otra página
            // window.location.href = "pagina-de-destino.html";
          })
          .catch((error) => {
            const errorCode = error.code;
            let errorMessage;

            // Manejo de errores más detallado
            switch (errorCode) {
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

            errorMessageDiv.textContent = `Error: ${errorMessage}`;
          });
    });


    
    //Login

    const formOpenBtn = document.querySelector("#form-open"),
        home = document.querySelector(".home"),
        formContainer = document.querySelector(".form_container"),
        formCloseBtn = document.querySelector(".form_close"),
        signupBtn = document.querySelector("#signup"),
        loginBtn = document.querySelector("#login"),
        pwShowHide = document.querySelectorAll(".fa-eye-slash, .fa-eye");

    // Mostrar el contenedor del formulario
    formOpenBtn.addEventListener("click", () => {
        home.classList.add("show");
    });

    // Cerrar el contenedor del formulario
    formCloseBtn.addEventListener("click", () => {
        home.classList.remove("show");
    });

    // Mostrar/ocultar la contraseña
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

    // Cambiar a registro
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.querySelector('.login-form').classList.remove('active');
        formContainer.querySelector('.signup_form').classList.add('active');
    });

    // Cambiar a inicio de sesión
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.querySelector('.signup_form').classList.remove('active');
        formContainer.querySelector('.login-form').classList.add('active');
    });

    // Manejo de la navegación activa según el scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.navbar a[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });

    // Inicializar Swiper
    new Swiper(".card-wrapper", {
        loop: true,
        spaceBetween: 30,
      
        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true
        },
      
        // Navigation arrows
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
});
