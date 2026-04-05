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
        // await persistir(personajes);

    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// Función principal para ejecutar las tareas
async function main() {
    await obtenerTodos();
}

main().catch(console.error);