// - Resolucion TP1 - Alvaro

const fs = require('fs/promises');

// Consigna 1: API Fetch - File System 

// 1.a) Recuperar la información de todos los personajes (GET)
async function getTodosLosPersonajes() {
    try {
        const respuesta = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await respuesta.json();
        console.log("1.a - Personajes obtenidos (cantidad):", data.length);
        return data;
    } catch (error) {
        console.error("Error al obtener los personajes:", error);
    }
}

// 1.b) Agregar un nuevo personaje (POST)
async function agregarPersonajePost() {
    try {
        const nuevoPersonaje = {
            firstName: "Aegon",
            lastName: "Targaryen",
            fullName: "Aegon Targaryen",
            title: "King",
            family: "House Targaryen"
        };
        
        const respuesta = await fetch('https://thronesapi.com/api/v2/Characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPersonaje)
        });
        
        console.log("1.b - POST realizado. Status de respuesta:", respuesta.status);
    } catch (error) {
        console.error("Error en el POST:", error);
    }
}

// 1.c) Buscar la información de un determinado personaje por id (GET)
async function getPersonajePorId(id) {
    try {
        const respuesta = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`);
        const data = await respuesta.json();
        console.log("1.c - Personaje buscado por ID:", data.fullName);
        return data;
    } catch (error) {
        console.error(`Error al buscar personaje con id ${id}:`, error);
    }
}

// 1.d) Persistir los datos en un archivo local JSON
async function guardarDatosEnArchivo() {
    try {
        const personajes = await getTodosLosPersonajes();
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("1.d - Archivo personajes.json creado con exito.");
    } catch (error) {
        console.error("Error al guardar el archivo:", error);
    }
}


// Consigna 2: Métodos comunes y avanzados – File System

// 2.a) Agregar un personaje al final del archivo
async function agregarAlFinal() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);
        
        const pjNuevo = { id: 999, fullName: "Juan Nieve", family: "Stark" };
        personajes.push(pjNuevo); // metodo de array
        
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("2.a - Personaje agregado al final del archivo.");
    } catch (error) {
        console.error("Error al agregar al final:", error);
    }
}

// 2.b) Agregar dos personajes al inicio del archivo
async function agregarAlInicio() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);
        
        const pj1 = { id: 1000, fullName: "Robb Stark", family: "Stark" };
        const pj2 = { id: 1001, fullName: "Ned Stark", family: "Stark" };
        
        personajes.unshift(pj1, pj2); // metodo unshift para el inicio
        
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("2.b - 2 personajes agregados al inicio del archivo.");
    } catch (error) {
        console.error("Error al agregar al inicio:", error);
    }
}

// 2.c) Eliminar el primer personaje y mostrar por consola
async function eliminarElPrimero() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);
        
        const eliminado = personajes.shift(); // saco el primero
        
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("2.c - Personaje eliminado:", eliminado);
    } catch (error) {
        console.error("Error al eliminar el primero:", error);
    }
}

// 2.d) Crear un nuevo archivo que solo contenga id y nombres
async function crearArchivoReducido() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);
        
        // map para crear un nuevo array modificado
        const personajesReducidos = personajes.map(pj => {
            return {
                id: pj.id,
                nombre: pj.fullName
            };
        });
        
        await fs.writeFile('personajes_reducidos.json', JSON.stringify(personajesReducidos, null, 2));
        console.log("2.d - Archivo de personajes reducidos creado.");
    } catch (error) {
        console.error("Error al crear archivo reducido:", error);
    }
}

// 2.e) Ordenar por nombre de forma decreciente y mostrar por consola
async function ordenarYMostrar() {
    try {
        const data = await fs.readFile('personajes_reducidos.json', 'utf-8');
        const personajes = JSON.parse(data);
        
        // sort para ordenar de Z a A usando localeCompare
        personajes.sort((a, b) => b.nombre.localeCompare(a.nombre));
        
        console.log("2.e - Personajes ordenados de forma decreciente (Z-A):");
        console.log(personajes);
    } catch (error) {
        console.error("Error al ordenar y mostrar:", error);
    }
}


// --- Funcion principal para ejecutar todo en orden ---
async function main() {
    console.log("--- INICIANDO TP1 ---");
    
    // Punto 1
    await guardarDatosEnArchivo(); // esto ya llama internamente a getTodosLosPersonajes()
    await agregarPersonajePost();
    await getPersonajePorId(5);
    
    // Punto 2 (dejo un tiempo de espera minimo para que fs no colapse leyendo/escribiendo rapido)
    await agregarAlFinal();
    await agregarAlInicio();
    await eliminarElPrimero();
    await crearArchivoReducido();
    await ordenarYMostrar();
    
    console.log("--- TP1 FINALIZADO ---");
}

// Ejecutar
main();