// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

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
const db = getFirestore(app);  // Esta es la instancia de Firestore

// Escuchar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Selección de elementos para la navegación del formulario
    const formOpenBtn = document.querySelector("#form-open"),
          home = document.querySelector(".home"),
          formContainer = document.querySelector(".form_container"),
          formCloseBtn = document.querySelector(".form_close"),
          signupBtn = document.querySelector("#show-signup-form"),  // Botón para mostrar el formulario de registro
          loginBtn = document.querySelector("#show-login-form");    // Botón para mostrar el formulario de login

    // Mostrar el formulario al hacer clic en el ícono de usuario
    if (formOpenBtn) {
        formOpenBtn.addEventListener("click", () => {
            home.classList.add("show");
        });
    }

    // Cerrar el formulario al hacer clic en el ícono de cerrar
    if (formCloseBtn) {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
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
});


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
async function loadTours() {
    // Obtener la referencia a la colección 'viajes' en Firestore
    const viajesCollection = collection(db, "viajes");
    
    // Obtener los documentos de la colección 'viajes'
    const querySnapshot = await getDocs(viajesCollection);

    // Crear un array para almacenar los documentos
    const viajesArray = [];
    
    // Llenar el array con los datos de los documentos
    querySnapshot.forEach((doc) => {
        viajesArray.push(doc.data());
    });

    // Seleccionar 7 elementos aleatorios del array
    const selectedTours = getRandomItems(viajesArray, 7);

    // Obtener el contenedor para los elementos del carrusel
    const carouselList = document.querySelector('.swiper-wrapper');
    
    // Limpiar el contenedor antes de agregar los elementos
    carouselList.innerHTML = '';

    // Agregar los elementos aleatorios al carrusel
    selectedTours.forEach((viaje) => {
        const viajeItem = document.createElement('li');
        viajeItem.classList.add('image-item', 'swiper-slide');

        viajeItem.innerHTML = `
            <img src="${viaje.imagenUrl}" alt="${viaje.titulo}" class="carousel-image" >
            <div class="overlay">
                <div class="box-galery">
                    <p>From</p>
                    <h4>$${viaje.precio}</h4>
                </div>
                <h2 class="location">
                    <a href="/Views/tours.html?title=${encodeURIComponent(viaje.titulo)}&price=${viaje.precio}&image=${encodeURIComponent(viaje.imagenUrl)}&description=${encodeURIComponent(viaje.descripcion)}" style="text-decoration: none; color: inherit;">
                        ${viaje.titulo}
                    </a>
                </h2>
            </div>
        `;

        carouselList.appendChild(viajeItem);
    });

    // Iniciar Swiper después de que los elementos hayan sido añadidos
    new Swiper(".swiper", {
        loop: true, 
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
}

async function loadGallery() {
    // Obtener la referencia a la colección 'viajes' en Firestore
    const viajesCollection = collection(db, "viajes");
    
    // Obtener los documentos de la colección 'viajes'
    const querySnapshot = await getDocs(viajesCollection);

    // Crear un array para almacenar los documentos
    const viajesArray = [];
    
    // Llenar el array con los datos de los documentos
    querySnapshot.forEach((doc) => {
        viajesArray.push(doc.data());
    });

    // Seleccionar 7 elementos aleatorios del array
    const selectedTours = getRandomItems(viajesArray, 7);

    // Obtener el contenedor para los elementos de la galería
    const gallerySection = document.querySelector('.Gallery');

    // Limpiar el contenedor antes de agregar los elementos
    gallerySection.innerHTML = '';

    // Agregar los elementos aleatorios a la galería
    selectedTours.forEach((viaje) => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('Event', 'searchable');

        eventItem.innerHTML = `
            <img src="${viaje.imagenUrl}" alt="${viaje.titulo}">
            <div class="overlay">
                <div class="box-galery">
                    <p>From</p>
                    <h4>$${viaje.precio}</h4>
                </div>
                <h2 class="location">
                    <a href="/Views/eventDetail.html?title=${encodeURIComponent(viaje.titulo)}&price=${viaje.precio}&image=${encodeURIComponent(viaje.imagenUrl)}&description=${encodeURIComponent(viaje.descripcion)}" style="text-decoration: none; color: inherit;">
                        ${viaje.titulo}
                    </a>
                </h2>
            </div>
        `;

        gallerySection.appendChild(eventItem);
    });
}

// Función para obtener elementos aleatorios de un array
function getRandomItems(arr, numItems) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Barajar el array
    return shuffled.slice(0, numItems); // Seleccionar los primeros 'numItems' elementos
}
async function loadAllTours() {
    // Obtener la referencia a la colección 'viajes' en Firestore
    const viajesCollection = collection(db, "viajes");

    // Obtener los documentos de la colección 'viajes'
    const querySnapshot = await getDocs(viajesCollection);

    // Crear un array para almacenar los documentos
    const viajesArray = [];

    // Llenar el array con los datos de los documentos
    querySnapshot.forEach((doc) => {
        viajesArray.push(doc.data());
    });

    // Obtener el contenedor para los elementos de las tarjetas
    const cardsSection = document.querySelector('.cards-section .container');

    // Limpiar el contenedor antes de agregar los elementos
    cardsSection.innerHTML = '';

    // Agregar los elementos de los viajes como tarjetas
    viajesArray.forEach((viaje) => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card-item');

        cardItem.innerHTML = `
            <img src="${viaje.imagenUrl}" alt="${viaje.titulo}" class="card-image">
            <div class="overlay">
                <div class="price-box">
                    <p>From</p>
                    <h4>$${viaje.precio}</h4>
                </div>
                <h2 class="location">
                    <a href="/Views/tours.html?title=${encodeURIComponent(viaje.titulo)}&price=${viaje.precio}&image=${encodeURIComponent(viaje.imagenUrl)}&description=${encodeURIComponent(viaje.descripcion)}" style="text-decoration: none; color: inherit;">
                        ${viaje.titulo}
                    </a>
                </h2>
            </div>
        `;

        cardsSection.appendChild(cardItem);
    });
}

// Llamar a la función para cargar todos los viajes
loadAllTours();
loadTours();
loadGallery();