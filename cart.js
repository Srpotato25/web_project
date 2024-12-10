// cart.js

import { auth, db } from './firebaseConfig.js';
import { collection, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

// Escuchar el cambio de estado de autenticación
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuario autenticado:", user);
        cargarCarrito(user.uid);
    } else {
        console.log("No hay usuario autenticado.");
        alert("Por favor, inicia sesión para ver tu carrito.");
    }
});

// Cargar el carrito
async function cargarCarrito(userId) {
    try {
        const cartRef = collection(db, 'carrito', userId, 'tours')
        const querySnapshot = await getDocs(cartRef);

        const productList = document.getElementById('product-list');
        const cartCount = document.getElementById('cart-count');
        const sortSelect = document.getElementById('sort-price');
        let total = 0;

        if (querySnapshot.empty) {
            productList.innerHTML = "<p>No hay productos en tu carrito.</p>";
            cartCount.innerText = "You have 0 items in your cart";
        } else {
            let products = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                products.push({ ...data, id: doc.id }); 
                total += parseFloat(data.price.replace('$', '').replace(',', ''));
            });

            // Función para ordenar los productos por precio
            const ordenarProductos = (orden) => {
                if (orden === 'asc') {
                    products.sort((a, b) => parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', '')));
                } else {
                    products.sort((a, b) => parseFloat(b.price.replace('$', '').replace(',', '')) - parseFloat(a.price.replace('$', '').replace(',', '')));
                }
            };

            ordenarProductos(sortSelect.value);

            productList.innerHTML = '';
            products.forEach((product) => {
                const itemHtml = `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p><strong>Precio:</strong> ${product.price}</p>
                                <p><strong>Fecha:</strong> ${product.date}</p>
                                <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${product.id}')">
                                    <i class="fas fa-trash-alt"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productList.innerHTML += itemHtml;
            });

            // Actualizar el texto del carrito
            cartCount.innerText = `You have ${products.length} items in your cart`;

            // Actualizar el total
            document.getElementById('subtotal').innerText = `$${total.toFixed(2)}`;
            document.getElementById('total').innerText = `$${(total + 10).toFixed(2)}`;  // Incluyendo el costo de envío de $20

            // Actualizar el botón de checkout
            document.getElementById('checkout-amount').innerText = `$${(total + 10).toFixed(2)}`;
        }
    } catch (error) {
        console.error("Error al obtener los datos del carrito:", error);
    }
}

// Función para eliminar un producto del carrito
// Función para eliminar un producto del carrito
async function eliminarProducto(productId) {
    try {
        const productRef = doc(db, 'carrito', auth.currentUser.uid, 'tours', productId);
        
        // Eliminar el producto de Firestore
        await deleteDoc(productRef);

        // Recargar el carrito para reflejar el cambio
        cargarCarrito(auth.currentUser.uid);

        console.log(`Producto ${productId} eliminado del carrito.`);
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
    }
}

// Hacer que la función sea global
window.eliminarProducto = eliminarProducto;

// Escuchar cambios en el select de ordenación
document.getElementById('sort-price').addEventListener('change', (event) => {
    const sortOrder = event.target.value;
    cargarCarrito(auth.currentUser.uid);  // Recargar el carrito con el nuevo orden
});


