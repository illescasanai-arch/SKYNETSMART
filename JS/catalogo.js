import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Tu configuración de Firebase (LA MISMA QUE USAMOS EN ADMIN.HTML)
const firebaseConfig = {
  apiKey: "AIzaSyDawRJ_UEd60LCwxD3Lk-eZsmMffpjWXlg",
  authDomain: "skynetsmart-a9521.firebaseapp.com",
  projectId: "skynetsmart-a9521",
  storageBucket: "skynetsmart-a9521.firebasestorage.app",
  messagingSenderId: "601143108776",
  appId: "1:601143108776:web:de56547394c4293e8e0e9d",
  measurementId: "G-WRF55Q2CB5"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar los productos
async function cargarProductos() {
    const contenedor = document.getElementById('contenedor-productos'); // Asegúrate que tu HTML tenga este ID
    contenedor.innerHTML = ""; // Limpiar antes de cargar

    try {
        const querySnapshot = await getDocs(collection(db, "computadoras"));
        
        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            
            // Aquí usamos tu diseño de tarjeta anterior
            const tarjeta = `
                <div class="producto-card">
                    <h3>${producto.titulo}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <button>Comprar</button>
                </div>
            `;
            contenedor.innerHTML += tarjeta;
        });
    } catch (error) {
        console.error("Error al leer de Firebase: ", error);
    }
}

// Arrancar la carga
cargarProductos();