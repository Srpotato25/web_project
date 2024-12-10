import { marcarPagoRealizado } from './cart.js';
import { db, auth } from './firebaseConfig.js';
import { collection, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

const stripe = Stripe('pk_test_51QUZgnCMWsISX1jCAl94RCyZN5ye5TJKiPsZ6jQkOgrgiXu4QyEZHoke9y08MgIMIcsOQTbdoLqfg6bwx0WDZ44800usSQVNsW');  // Usar tu propia clave pública de Stripe
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const paymentForm = document.getElementById('payment-form');
const checkoutButton = document.getElementById('checkout-button');
const checkoutAmount = document.getElementById('checkout-amount');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');

// Maneja el evento de envío del formulario
paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const postalCode = document.getElementById('postal-code').value;

    // Crear el token con la dirección completa (nombre, código postal, etc.)
    const { token, error } = await stripe.createToken(cardElement, {
        address_zip: postalCode  // Incluir el código postal
    });

    if (error) {
        // Si hay un error, muestra el mensaje de error
        console.error('Error al crear el token:', error);
        alert('Error: ' + error.message);
    } else {
        // Simulando que el pago fue exitoso
        console.log('Token creado:', token);
        alert('¡Pago realizado con éxito!');

        // Vaciar el carrito en Firestore
        try {
            const cartRef = collection(db, 'carrito', auth.currentUser.uid, 'tours');
            const querySnapshot = await getDocs(cartRef);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);  // Eliminar cada producto del carrito
            });
            console.log('Carrito vacío después del pago');
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }

        // Limpiar la UI del carrito
        document.getElementById('product-list').innerHTML = '';
        document.getElementById('cart-count').innerText = 'You have 0 items in your cart';

        // Marcar como pago realizado
        marcarPagoRealizado();
    }
});







