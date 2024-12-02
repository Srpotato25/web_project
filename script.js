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
const db = getFirestore(app);

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


// Función para obtener elementos aleatorios
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function loadTours() {
    const carouselList = document.querySelector('.swiper-wrapper');
    if (!carouselList) return;

    const viajesCollection = collection(db, "viajes");
    const querySnapshot = await getDocs(viajesCollection);
    const viajesArray = querySnapshot.docs.map((doc) => doc.data());

    console.log(viajesArray);  // Agrega este log para verificar que los datos están llegando correctamente.

    const selectedTours = getRandomItems(viajesArray, 7);
    console.log(selectedTours);  // Verifica que los tours seleccionados están bien formados.

    carouselList.innerHTML = '';  // Limpiar el contenido anterior.

    selectedTours.forEach((viaje) => {
        const viajeItem = document.createElement('li');
        viajeItem.classList.add('image-item', 'swiper-slide');

        // Verificar si viaje.actividades es un array o no
        const activities = Array.isArray(viaje.actividades) ? viaje.actividades.join(', ') : viaje.actividades || '';

        // Asegurarse de que 'fechasDisponibles' esté presente
        const fechasDisponibles = viaje.fechasDisponibles ? viaje.fechasDisponibles : '';  // Puede ser un array o cadena vacía

        viajeItem.innerHTML = `
            <img src="${viaje.imagenUrl}" alt="${viaje.titulo}" class="carousel-image">
            <div class="overlay">
                <div class="box-galery">
                    <p>From</p>
                    <h4>$${viaje.precio}</h4>
                </div>
                <h2 class="location">
                    <a href="/Views/eventDetail.html?title=${encodeURIComponent(viaje.titulo)}&price=${viaje.precio}&image=${encodeURIComponent(viaje.imagenUrl)}&description=${encodeURIComponent(viaje.descripcion)}&category=${encodeURIComponent(viaje.categoria)}&location=${encodeURIComponent(viaje.ubicacion)}&activities=${encodeURIComponent(activities)}&fechasDisponibles=${encodeURIComponent(fechasDisponibles)}" style="text-decoration: none; color: inherit;">
                        ${viaje.titulo}
                    </a>
                </h2>
            </div>
        `;

        carouselList.appendChild(viajeItem);
    });

    // Configurar Swiper
    new Swiper(".swiper", {
        loop: true,
        spaceBetween: 30,
        pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        autoplay: { delay: 3000, disableOnInteraction: false },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
    });
}


async function loadGallery() {
    const gallerySection = document.querySelector('.Gallery');
    if (!gallerySection) return;

    try {
        const viajesCollection = collection(db, "viajes");
        const querySnapshot = await getDocs(viajesCollection);
        const viajesArray = querySnapshot.docs.map((doc) => doc.data());

        // Verifica los datos obtenidos
        console.log(viajesArray);

        const selectedTours = getRandomItems(viajesArray, 7);

        if (selectedTours.length === 0) {
            console.log('No tours selected');
            return; // Si no hay tours seleccionados, salir de la función
        }

        gallerySection.innerHTML = ''; // Limpiar el contenido anterior

        selectedTours.forEach((viaje) => {
            // Asegurarse de que "actividades" sea un array antes de usar join()
            const activities = Array.isArray(viaje.actividades) ? viaje.actividades.join(',') : viaje.actividades ? String(viaje.actividades) : '';
            
            // Asegurarse de que 'fechasDisponibles' esté presente y sea un array
            const fechasDisponibles = viaje.fechasDisponibles ? viaje.fechasDisponibles : '';  // Puede ser un array o cadena vacía

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
                        <a href="/Views/eventDetail.html?title=${encodeURIComponent(viaje.titulo)}&price=${viaje.precio}&image=${encodeURIComponent(viaje.imagenUrl)}&description=${encodeURIComponent(viaje.descripcion)}&category=${encodeURIComponent(viaje.categoria)}&location=${encodeURIComponent(viaje.ubicacion)}&activities=${encodeURIComponent(activities)}&fechasDisponibles=${encodeURIComponent(fechasDisponibles)}" style="text-decoration: none; color: inherit;">
                            ${viaje.titulo}
                        </a>
                    </h2>
                </div>
            `;

            gallerySection.appendChild(eventItem);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Función para cargar todos los tours con filtro de categoría
// Función para cargar todos los tours con filtro de categoría
async function loadAllTours(category = "all") {
    const cardsSection = document.querySelector('.cards-section .container');
    if (!cardsSection) return;

    const viajesCollection = collection(db, "viajes");
    const querySnapshot = await getDocs(viajesCollection);
    const viajesArray = querySnapshot.docs.map((doc) => doc.data());

    const filteredTours = category === "all" 
        ? viajesArray 
        : viajesArray.filter((viaje) => viaje.categoria === category);

    cardsSection.innerHTML = '';

    filteredTours.forEach((viaje) => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card-item');

        // Asegurarnos de que 'actividades' es un array antes de llamar a .join()
        let activities = '';
        if (Array.isArray(viaje.actividades)) {
            activities = encodeURIComponent(viaje.actividades.join(','));
        } else if (viaje.actividades) {
            // Si 'actividades' es un string o algún otro valor, convertirlo a array
            activities = encodeURIComponent([viaje.actividades].join(','));
        }

        // Asegurarse de que 'fechasDisponibles' esté presente
        const fechasDisponibles = viaje.fechasDisponibles ? viaje.fechasDisponibles : '';  // Puede ser un array o cadena vacía

        cardItem.innerHTML = `
            <img src="${viaje.imagenUrl}" alt="${viaje.titulo}" class="card-image">
            <div class="overlay">
                <div class="price-box">
                    <p>From</p>
                    <h4>$${viaje.precio}</h4>
                </div>
                <h2 class="location">
                    <a href="/Views/eventDetail.html?title=${encodeURIComponent(viaje.titulo)}&price=${viaje.precio}&image=${encodeURIComponent(viaje.imagenUrl)}&description=${encodeURIComponent(viaje.descripcion)}&category=${encodeURIComponent(viaje.categoria)}&location=${encodeURIComponent(viaje.ubicacion)}&activities=${activities}&fechasDisponibles=${encodeURIComponent(fechasDisponibles)}" style="text-decoration: none; color: inherit;">
                        ${viaje.titulo}
                    </a>
                </h2>
            </div>
        `;

        cardsSection.appendChild(cardItem);
    });
}

// Detectar la vista actual y ejecutar las funciones correspondientes
document.addEventListener('DOMContentLoaded', () => {
    const galleryExists = document.querySelector('.Gallery');
    const carouselExists = document.querySelector('.swiper-wrapper');
    const cardsSectionExists = document.querySelector('.cards-section .container');

    if (galleryExists || carouselExists) {
        loadTours();
        loadGallery();
    }
    if (cardsSectionExists) {
        loadAllTours();

        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (event) => {
                const selectedCategory = event.target.value;
                loadAllTours(selectedCategory);
            });
        }
    }
});
