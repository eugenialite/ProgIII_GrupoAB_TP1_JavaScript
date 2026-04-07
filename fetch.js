const fs = require('fs'); // 1. Importamos el módulo para manejar archivos
const url = 'https://thronesapi.com/api/v2/Characters'

async function infoPersonajes() {
    try {
      const response = await fetch(url); // 2. Hacemos la solicitud a la API
      if (!response.ok) { // 3. Verificamos si la respuesta es exitosa
        throw new Error(`HTTP error!`); // 4. Si no es exitosa, lanzamos un error
      }
      const personajes = await response.json(); // 5. Convertimos la respuesta a JSON
      console.log(personajes); // 6. Imprimimos los personajes en la consola
      return personajes; // 7. Devolvemos los personajes para su uso posterior
    
    }catch (error) {
      console.error('Error', error); // 8. Manejamos cualquier error que ocurra durante la solicitud
    }
}   


// b) Agregar un nuevo personaje (POST)
async function agregarPersonaje(nuevoPersonaje) {
    try {
      const response = await fetch(url, {
        method: 'POST', // 9. Especificamos el método POST para agregar un nuevo personaje
        headers: {'content-type': 'application/json'}, // 10. Indicamos que el contenido es JSON
        body: JSON.stringify(nuevoPersonaje) // 11. Convertimos el nuevo personaje a JSON para enviarlo
      });
      
      if (response.ok) { // 12. Verificamos si la respuesta es exitosa
          console.log(`Punto B: Personaje enviado con éxito (Estatus: ${response.status})`); // 13. Si es exitosa, confirmamos que el personaje fue enviado
      } else {
          console.log("Punto B: El servidor rechazó la solicitud.");
      }
    } catch (error) {
      console.error('Error al agregar personaje:', error); // 14. Manejamos cualquier error que ocurra durante la solicitud POST
    }
  }

// c) Buscar información por "id" (GET)
async function buscarPersonajePorId(id) {
  try {
    const response = await fetch(`${url}/${id}`); // 15. Hacemos una solicitud GET para buscar un personaje por su ID
    const personaje = await response.json(); // 16. Convertimos la respuesta a JSON
    console.log(`Personaje encontrado (${id}):`, personaje); // 17. Imprimimos el personaje encontrado
  } catch (error) {
    console.log(`Error al buscar personaje con ID ${id}:`, error); // 18. Manejamos cualquier error que ocurra durante la solicitud GET
  }
}


// d) Persistir los datos en un archivo local JSON
function guardarPersonajesEnArchivo(personajes) {
  const data = JSON.stringify(personajes, null, 2); // 19. Convertimos los personajes a una cadena JSON con formato
  fs.writeFileSync('personajes.json', data); // 20. Escribimos la cadena JSON en un archivo llamado "personajes.json"
  console.log('Personajes guardados en personajes.json'); // 21. Confirmamos que los personajes han sido guardados
}

// --- FUNCIÓN PARA EJECUTAR TODO ---
async function ejecutarTP() {
    // 1. Obtenemos y Guardamos (A y D)
    const lista = await infoPersonajes();
    guardarPersonajesEnArchivo(lista);

    // 2. Buscamos uno (C)
    await buscarPersonajePorId(10);

    // 3. Creamos uno (B)
    await agregarPersonaje({ firstName: "Alondra", lastName: "I" });
}

ejecutarTP();

// Función auxiliar para leer el archivo y convertirlo en Array de JS
function leerArchivo() {
    const data = fs.readFileSync('personajes.json', 'utf-8');
    return JSON.parse(data);
}

// Función auxiliar para guardar los cambios en el archivo
function guardarArchivo(datos) {
    fs.writeFileSync('personajes.json', JSON.stringify(datos, null, 2));
}

async function ejecutarPunto2() {
    try {
        let personajes = leerArchivo();

        // a) Agregar un personaje al final del archivo (push)
        const nuevoAlFinal = { id: 100, fullName: "Final Personaje", family: "Cba" };
        personajes.push(nuevoAlFinal);
        console.log("Punto A: Personaje agregado al final.");

        // b) Agregar dos personajes al inicio del archivo (unshift)
        const p1 = { id: 200, fullName: "Primero A", family: "Software" };
        const p2 = { id: 201, fullName: "Primero B", family: "Software" };
        personajes.unshift(p1, p2); 
        console.log("Punto B: Dos personajes agregados al inicio.");

        // c) Eliminar el primer personaje y mostrarlo (shift)
        const eliminado = personajes.shift();
        console.log("Punto C: Elemento eliminado:", eliminado.fullName);

        // Guardamos los cambios de A, B y C en el archivo original
        guardarArchivo(personajes);

        // d) Crear un nuevo archivo que solo contenga: id y nombres (map)
        const nombresIds = personajes.map(p => {
            return { id: p.id, nombre: p.fullName };
        });
        fs.writeFileSync('solo_nombres.json', JSON.stringify(nombresIds, null, 2));
        console.log("Punto D: Archivo 'solo_nombres.json' creado.");

        // e) Ordenar por nombre de forma DECRECIENTE (Z a A) y mostrar (sort)
        // Usamos una copia para no romper el original
        const ordenados = [...nombresIds].sort((a, b) => {
            if (a.nombre < b.nombre) return 1;  // Si a es menor, va después (decreciente)
            if (a.nombre > b.nombre) return -1; // Si a es mayor, va antes
            return 0;
        });

        console.log("Punto E: Lista ordenada decreciente:");
        console.table(ordenados); // console.table lo muestra lindo en la consola

    } catch (error) {
        console.error("Error en el Punto 2:", error);
    }
}

ejecutarPunto2();
