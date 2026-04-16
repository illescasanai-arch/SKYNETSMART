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
// Función para cargar los productos
async function cargarProductos() {
    // CAMBIO CRÍTICO: Ahora buscamos tu clase exacta
    const contenedor = document.querySelector('.galeriaCelulares'); 
    
    if (!contenedor) {
        console.error("No se encontró la caja .galeriaCelulares en el HTML");
        return;
    }

    // Opcional: Limpiar las tarjetas estáticas viejas antes de cargar las nuevas de Firebase
    // contenedor.innerHTML = ""; 

    try {
        const querySnapshot = await getDocs(collection(db, "computadoras"));
        
        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            
            // Recreamos TU diseño exacto de tarjeta inyectando los datos
            const tarjeta = `
                <div class="tarjeta celulares">
                    <h3 class="titulocompu1">${producto.titulo}</h3>
                    <form action="">
                        <details> 
                          <summary>Mas informacion</summary>
                          <ul>
                            <li>Producto cargado dinámicamente desde Firebase.</li>
                          </ul>
                          <h1>PRECIO: $${producto.precio}</h1>
                        </details>
                    </form>
                </div>
            `;
            // Añadimos la tarjeta al contenedor
            contenedor.innerHTML += tarjeta;
        });
    } catch (error) {
        console.error("Error al leer de Firebase: ", error);
    }
}

// Arrancar la carga
cargarProductos();