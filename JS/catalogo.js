document.addEventListener('DOMContentLoaded', () => {
    // 1. Apuntamos al contenedor donde irán las tarjetas
    const contenedor = document.querySelector('.galeriaCelulares'); 

    // Si no encuentra el contenedor, detenemos todo para no causar errores
    if (!contenedor) return;

    // 2. Buscamos la información en el "refrigerador" (el archivo JSON)
    fetch('/datos/computadoras.json')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;

            // Limpiamos el contenedor (borraremos el HTML estático después)
            contenedor.innerHTML = '';

            // 3. Fabricamos las tarjetas usando TU estructura exacta
            productos.forEach((item, index) => {
                const tarjeta = document.createElement('div');
                
                // Si marcaste "Agotado" en el panel, le añade la clase extra
                tarjeta.className = item.agotado ? 'tarjeta agotado' : 'tarjeta';

                // Generamos identificadores únicos para el truco de la imagen (ej: img_0, img_0_2)
                const idImg1 = `img_${index}`;
                const idImg2 = `img_${index}_2`;

                // Aquí inyectamos los datos del JSON dentro de tu código HTML
                tarjeta.innerHTML = `
                    <div class="contenedor-imagen-standard">
                        <img id="${idImg1}" src="${item.imagen}" onclick="cambiarImagen('${idImg1}', '${idImg2}')">
                        <img id="${idImg2}" src="${item.imagen}" onclick="cambiarImagen('${idImg2}', '${idImg1}')" style="display:none;"> 
                    </div>
                    <h3 class="titulocompu1">${item.title}</h3>
                    <form action="">
                        <details>
                            <summary>Mas informacion</summary>
                            <ul>
                                <li>${item.body}</li>
                            </ul>
                            <h1>PRECIO: $${item.precio}</h1>
                        </details>
                    </form>
                `;
                
                contenedor.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error cargando el catálogo:', error);
            contenedor.innerHTML = '<p>Error al cargar el catálogo de computadoras.</p>';
        });
});