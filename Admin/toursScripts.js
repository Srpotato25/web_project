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
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Referencia al contenedor donde se mostrarán los viajes
  const viajesContainer = document.getElementById("viajesContainer");
  
  // Cargar viajes desde Firestore
  db.collection("viajes").onSnapshot((querySnapshot) => {
    viajesContainer.innerHTML = ""; // Limpiar el contenedor
  
    querySnapshot.forEach((doc) => {
      const { titulo, descripcion, precio, actividades, imagenUrl } = doc.data();
  
      const actividadesLista = actividades
        .split(/\r?\n|,/) // Separar por saltos de línea o comas
        .map((actividad) => `<li>${actividad.trim()}</li>`)
        .join("");
  
      const viajeDiv = document.createElement("div");
      viajeDiv.classList.add("viaje", "col-md-4");
  
      viajeDiv.innerHTML = `
        <div class="card h-100">
          <img src="${imagenUrl}" alt="${titulo}" class="card-img-top" style="max-height: 200px; object-fit: cover;">
          <div class="card-body">
            <h3 class="card-title">${titulo}</h3>
            <p class="card-text">${descripcion}</p>
            <p><strong>Precio:</strong> $${precio}</p>
            <p><strong>Actividades:</strong></p>
            <ul>${actividadesLista}</ul>
          </div>
        </div>
      `;
  
      viajesContainer.appendChild(viajeDiv);
    });
  });
  