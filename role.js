// UID del usuario al que deseas asignar el rol
const uid = "YxNEPab1fDMoUSgTEcVjLDv9DNg1";

// Tu Firebase API Key
const apiKey = "AIzaSyAowxVHvpmYoluiKnn_M5NMaku9EqcqPDk";

// Configuración de los custom claims (por ejemplo, asignar el rol de admin)
const customClaims = {
    admin: true // Puedes agregar más roles o configuraciones si es necesario
};

// Función para asignar custom claims
async function setCustomClaims(uid, customClaims) {
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    localId: uid, // UID del usuario
                    customAttributes: JSON.stringify(customClaims), // Claims personalizados
                }),
            }
        );

        if (response.ok) {
            console.log(`Custom claims assigned to user ${uid}`);
        } else {
            const errorData = await response.json();
            console.error("Error assigning claims:", errorData.error.message);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
}

// Llama a la función para asignar los claims
setCustomClaims(uid, customClaims);

