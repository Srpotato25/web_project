import { db, auth } from './firebaseConfig.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";


document.addEventListener('DOMContentLoaded', function() {
    const formOpenBtn = document.querySelector("#form-open"),
          home = document.querySelector(".home"),
          formContainer = document.querySelector(".form_container"),
          formCloseBtn = document.querySelector(".form_close"),
          signupBtn = document.querySelector("#show-signup-form"),
          loginBtn = document.querySelector("#show-login-form"),
          searchBtn = document.querySelector("#searchBtn"),
          searchBox = document.querySelector("#searchBox"),
          closeSearchBtn = document.querySelector("#closeSearch"),
          searchInput = document.querySelector("#searchInput");

    // Mostrar formulario de login o signup
    if (formOpenBtn) {
        formOpenBtn.addEventListener("click", () => {
            home.classList.add("show");
        });
    }

    if (formCloseBtn) {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
        });
    }

    if (signupBtn && formContainer) {
        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.querySelector('.login-form').classList.remove('active'); // Ocultar login
            formContainer.querySelector('.signup_form').classList.add('active');  // Mostrar signup
        });
    }

    if (loginBtn && formContainer) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.querySelector('.signup_form').classList.remove('active');  // Ocultar signup
            formContainer.querySelector('.login-form').classList.add('active'); // Mostrar login
        });
    }

    // Mostrar/ocultar el cuadro de búsqueda
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            searchBox.classList.toggle("active");  // Alternar visibilidad del cuadro de búsqueda
        });
    }

    // Cerrar el cuadro de búsqueda al hacer clic en el ícono de cerrar
    if (closeSearchBtn) {
        closeSearchBtn.addEventListener("click", () => {
            searchBox.classList.remove("active");  // Ocultar el cuadro de búsqueda
        });
    }

    // Función de búsqueda
    if (searchInput) {
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                const searchQuery = event.target.value.trim();
                if (searchQuery) {
                    window.location.href = `/Views/searchResult.html?searchQuery=${encodeURIComponent(searchQuery)}`;
                } else {
                    alert("Por favor, ingresa un término de búsqueda.");
                }
            }
        });
    }
});


// Función para obtener elementos aleatorios
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Función para cargar los tours con categoría "descuento" en el carousel
async function loadTours() {
    const carouselList = document.querySelector('.swiper-wrapper');
    if (!carouselList) return;

    // Obtener los viajes desde la colección "viajes"
    const viajesCollection = collection(db, "viajes");

    // Filtrar los viajes por categoría "descuento"
    const querySnapshot = await getDocs(viajesCollection);
    const viajesArray = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((viaje) => viaje.categoria === "Descuento"); 

    console.log(viajesArray);

    // Seleccionar 7 tours aleatorios
    const selectedTours = getRandomItems(viajesArray, 7);
    console.log(selectedTours); 

    // Limpiar el contenido anterior
    carouselList.innerHTML = '';

    selectedTours.forEach((viaje) => {
        const viajeItem = document.createElement('li');
        viajeItem.classList.add('image-item', 'swiper-slide');

        const activities = Array.isArray(viaje.actividades) ? viaje.actividades.join(', ') : viaje.actividades || '';

        const fechasDisponibles = viaje.fechasDisponibles ? viaje.fechasDisponibles : ''; 

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


// Función para cargar la galería de tours
async function loadGallery() {
    const gallerySection = document.querySelector('.Gallery');
    if (!gallerySection) return;

    try {
        const viajesCollection = collection(db, "viajes");
        const querySnapshot = await getDocs(viajesCollection);
        const viajesArray = querySnapshot.docs.map((doc) => doc.data());

        console.log(viajesArray);


        const filteredTours = viajesArray.filter(viaje => viaje.categoria !== "Descuento" && viaje.categoria !== "Destino");

        const selectedTours = getRandomItems(filteredTours, 7);

        if (selectedTours.length === 0) {
            console.log('No tours selected');
            return;
        }

        gallerySection.innerHTML = ''; 

        selectedTours.forEach((viaje) => {
            const activities = Array.isArray(viaje.actividades) ? viaje.actividades.join(', ') : viaje.actividades ? String(viaje.actividades) : '';
            const fechasDisponibles = viaje.fechasDisponibles ? viaje.fechasDisponibles : '';  

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
async function loadAllTours(category = "all") {
    const cardsSection = document.querySelector('.cards-section .container');
    if (!cardsSection) return;

    const viajesCollection = collection(db, "viajes");
    const querySnapshot = await getDocs(viajesCollection);
    const viajesArray = querySnapshot.docs.map((doc) => doc.data());

    const filteredTours = viajesArray.filter(viaje => viaje.categoria !== "Destino");

    const finalTours = category === "all" 
        ? filteredTours 
        : filteredTours.filter((viaje) => viaje.categoria === category);

    cardsSection.innerHTML = '';

    finalTours.forEach((viaje) => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card-item');

        let activities = '';
        if (Array.isArray(viaje.actividades)) {
            activities = encodeURIComponent(viaje.actividades.join(','));
        } else if (viaje.actividades) {
            activities = encodeURIComponent([viaje.actividades].join(','));
        }

        const fechasDisponibles = viaje.fechasDisponibles ? viaje.fechasDisponibles : '';  
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

async function loadDestinations(category = "Destino") {
    const destinationsSection = document.querySelector('.Destinations');
    if (!destinationsSection) return;

    const viajesCollection = collection(db, "viajes");
    const querySnapshot = await getDocs(viajesCollection);
    const viajesArray = querySnapshot.docs.map((doc) => doc.data());
    const filteredDestinations = viajesArray.filter(viaje => viaje.categoria === category);

    destinationsSection.innerHTML = '';  

    filteredDestinations.forEach((viaje) => {
        // Crear un nuevo div para cada destino
        const destinationItem = document.createElement('div');
        destinationItem.classList.add('Destination');

        destinationItem.innerHTML = `
            <img src="${viaje.imagenUrl}" alt="${viaje.titulo}"> 
            <div class="location-static">${viaje.titulo}</div>
            <div class="overlay">
                <h2 class="location-overlay">${viaje.titulo}</h2>
                <button id="view-tours">View Tours</button>
            </div>
        `;

        destinationsSection.appendChild(destinationItem);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const galleryExists = document.querySelector('.Gallery');
    const carouselExists = document.querySelector('.swiper-wrapper');
    const cardsSectionExists = document.querySelector('.cards-section .container');
    const destinationsSectionExists = document.querySelector('.Destinations');  // Agregado para verificar Destinations

    // Si existe la galería o el carrusel, cargar tours y galería
    if (galleryExists || carouselExists) {
        loadTours();
        loadGallery();
    }

    // Si existe la sección de tarjetas, cargar todos los tours
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

    // Si existe la sección Destinations, cargar los destinos
    if (destinationsSectionExists) {
        loadDestinations(); 
    }
});

