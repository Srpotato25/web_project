
//Conexion Base de datos Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAowxVHvpmYoluiKnn_M5NMaku9EqcqPDk",
  authDomain: "web-project-f0c9c.firebaseapp.com",
  projectId: "web-project-f0c9c",
  storageBucket: "web-project-f0c9c.appspot.com",
  messagingSenderId: "1025383417170",
  appId: "1:1025383417170:web:51d30811a47a97ae6a268b",
  measurementId: "G-DG1EX6H6PQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Puedes agregar más código aquí
console.log("Firebase ha sido inicializado correctamente.");


//Entradas

const email = document.getElementById('email').value; 
const password = document.getElementById('password').value; 
//submit button 
const submit = document.getElementById('submit'); 
submit.addEventListener("click", function (event){
    event.preventDefault()
    alert
})


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


document.addEventListener('DOMContentLoaded', function() {
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
});



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

