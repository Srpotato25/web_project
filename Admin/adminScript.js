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

const viajeForm = document.getElementById("viajeForm");
const viajesContainer = document.getElementById("viajesContainer");
let editingId = null; // Controla el viaje que se está editando

// Función para guardar un nuevo viaje en Firestore
async function addViaje(viaje) {
  try {
    await db.collection("viajes").add(viaje);
    alert("Viaje guardado con éxito.");
  } catch (error) {
    console.error("Error al guardar el viaje:", error);
    alert("Hubo un error al guardar el viaje.");
  }
}

// Función para actualizar un viaje existente
async function updateViaje(id, viaje) {
  try {
    await db.collection("viajes").doc(id).update(viaje);
    alert("Viaje actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar el viaje:", error);
    alert("Hubo un error al actualizar el viaje.");
  }
}

// Manejar el envío del formulario
viajeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = viajeForm.titulo.value.trim();
  const descripcion = viajeForm.descripcion.value.trim();
  const precio = parseFloat(viajeForm.precio.value);
  const actividades = viajeForm.actividades.value.trim();
  const imagenUrl = viajeForm.imagenUrl.value.trim();

  if (!imagenUrl || !isValidUrl(imagenUrl)) {
    alert("Por favor, ingresa una URL válida para la imagen.");
    return;
  }

  const viaje = { titulo, descripcion, precio, actividades, imagenUrl };

  if (editingId) {
    // Si estamos editando, actualiza el viaje existente
    await updateViaje(editingId, viaje);
    editingId = null; // Restablecer el ID de edición
  } else {
    // Si no, agrega un nuevo viaje
    await addViaje(viaje);
  }

  viajeForm.reset();
});

// Mostrar todos los viajes almacenados en Firestore
db.collection("viajes").onSnapshot((querySnapshot) => {
  viajesContainer.innerHTML = ""; // Limpiar el contenedor

  querySnapshot.forEach((doc) => {
    const { titulo, descripcion, precio, actividades, imagenUrl } = doc.data();
    const id = doc.id;

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
          <button class="btn btn-warning btn-sm mt-2" onclick="startEdit('${id}')">Editar</button>
          <button class="btn btn-danger btn-sm mt-2" onclick="confirmDelete('${id}')">Eliminar</button>
        </div>
      </div>
    `;

    viajesContainer.appendChild(viajeDiv);
  });
});

// Función para empezar a editar un viaje
function startEdit(id) {
  db.collection("viajes")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        alert("El viaje no existe.");
        return;
      }

      const { titulo, descripcion, precio, actividades, imagenUrl } = doc.data();

      // Llenar el formulario con los datos actuales
      viajeForm.titulo.value = titulo;
      viajeForm.descripcion.value = descripcion;
      viajeForm.precio.value = precio;
      viajeForm.actividades.value = actividades;
      viajeForm.imagenUrl.value = imagenUrl;

      editingId = id; // Almacenar el ID del viaje que se está editando
    })
    .catch((error) => {
      console.error("Error al obtener el viaje:", error);
      alert("Hubo un error al obtener los datos del viaje.");
    });
}

// Función para confirmar y eliminar un viaje
async function confirmDelete(id) {
  const confirmation = confirm("¿Estás seguro de que deseas eliminar este viaje?");
  if (confirmation) {
    try {
      await db.collection("viajes").doc(id).delete();
      alert("Viaje eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el viaje:", error);
      alert("Hubo un error al eliminar el viaje.");
    }
  }
}

// Valida si una URL tiene un formato correcto
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Registrar funciones globales
window.startEdit = startEdit;
window.confirmDelete = confirmDelete;




