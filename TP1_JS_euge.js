// ===============================
// Trabajo Práctico - TP 1 JavaScript
// Programación III - 2026 - 1er cuatrimestre
// Grupo: AB
// Integrantes:
// Eugenia Blanc
// Alondra Nazarena Ilari
// Jorge Larran
// Micaela Santana
// Alvaro Miguel Valdez
// Agus
// ===============================


// Importaciones + configuración inicial

const fs = require('fs').promises;

const url = "https://thronesapi.com/api/v2/Characters";

// 1a)  Recuperar la información de todos los personajes

async function obtenerTodos() {
    try {
        const resp = await fetch(url);
        const personajes = await resp.json();
        console.log(personajes);
        await persistir(personajes);

    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 1b)  Agregar un nuevo personaje

async function agregarPersonaje(personaje) {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaje)
        });
        const resultado = await resp.json();
        console.log('1b) Personaje agregado:', resultado);
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

const nuevoPersonaje = {
    id: 53,
    firstName: 'Gilda',
    lastName: '',
    fullName: 'Gilda',
    title: 'The Saint of Cumbia',
    family: 'House Tropical',
    image: '',
    imageUrl: ''
};

// 1c)  Buscar un personaje por su ID

async function buscarPorId(id) {
    try {
        const resp = await fetch(`${url}/${id}`);
        const personaje = await resp.json();
        console.log(personaje);
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 1d) Persistir los datos en un JSON

async function persistir(personajes) {
    try {
        const contenido = JSON.stringify(personajes, null, 2);
        await fs.writeFile('personajes.json', contenido, 'utf-8');
        console.log('Archivo guardado!');
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// Funciones auxiliares (leer y guardar archivo)

async function leerArchivo() {
    try {
        const contenido = await fs.readFile('personajes.json', 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

async function guardarArchivo(datos) {
    try {
        await fs.writeFile('personajes.json', JSON.stringify(datos, null, 2), 'utf-8');
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 2a) Agregar un nuevo personaje al final

async function agregarAlFinal() {
    try {
        const personajes = await leerArchivo();
        personajes.push(nuevoPersonaje);
        await guardarArchivo(personajes);
        console.log('2a) Personaje agregado al final:', personajes[personajes.length - 1]);
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 2b) Agregar dos nuevos personajes al inicio

async function agregarAlInicio() {
    try {
        const personajes = await leerArchivo();

        const p1 = {
            id: 54,
            firstName: 'Rodrigo',
            lastName: 'Bueno',
            fullName: 'Rodrigo Bueno',
            title: 'El Potro',
            family: 'House Cuarteto',
            image: '',
            imageUrl: ''
        };

        const p2 = {
            id: 55,
            firstName: 'Lia',
            lastName: 'Crucet',
            fullName: 'Lia Crucet',
            title: 'La Tetamanti',
            family: 'House Tropical',
            image: '',
            imageUrl: ''
        };

        personajes.unshift(p1, p2);
        await guardarArchivo(personajes);
        console.log('2b) Dos personajes agregados al inicio:', personajes.slice(0, 2));
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 2c) Eliminar el primer personaje del archivo

async function eliminarPrimero() {
    try {
        const personajes = await leerArchivo();
        const eliminado = personajes.shift();
        await guardarArchivo(personajes);
        console.log('2c) Personaje eliminado:', eliminado);
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 2d) Crear un nuevo archivo con solo el ID y el nombre de cada personaje

async function crearArchivoIDNombres() {
    try {
        const personajes = await leerArchivo();
        const soloNombres = personajes.map(p => ({
            id: p.id,
            nombre: p.fullName
        }));
        await fs.writeFile('personajes_nombres.json', JSON.stringify(soloNombres, null, 2), 'utf-8');
        console.log('2d) Archivo creado:', soloNombres);
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// 2e) Ordenar los personajes por nombre de forma decreciente

async function ordenarPorNombre() {
    try {
        const contenido = await fs.readFile('personajes_nombres.json', 'utf-8');
        const personajes = JSON.parse(contenido);

        const ordenados = [...personajes].sort((a, b) =>
            b.nombre.localeCompare(a.nombre)
        );

        console.log('2e) Personajes ordenados por nombre decreciente (Z → A):');
        ordenados.forEach((p, i) => {
            console.log(`  ${i + 1}. [ID: ${p.id}] ${p.nombre}`);
        });
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

async function main() {
    await obtenerTodos();
    await agregarPersonaje(nuevoPersonaje);
    await buscarPorId(5);
    await agregarAlFinal();
    await agregarAlInicio();
    await eliminarPrimero();
    await crearArchivoIDNombres();
    await ordenarPorNombre();
}

main().catch(console.error);