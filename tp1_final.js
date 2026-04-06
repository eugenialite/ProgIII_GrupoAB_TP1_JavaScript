import fs from "fs/promises";

const url = 'https://thronesapi.com/api/v2/Characters'

// Ejercicio 1 A:

async function obtenerPersonajes() {
    try{
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(data);
        return;

    } catch(error) {
        console.error("Error", error);
    }
}

// Ejercicio 1 B:

async function agregar() {
    const nuevoPersonaje = {
        id: 53,
        firstName: "string",
        lastName: "string",
        fullName: "string",
        title: "string",
        family: "string",
        image: "string",
        imageUrl: "string"
    };

    try{
        const resp = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nuevoPersonaje)
        });

        console.log("Status", resp.status)

        console.log("Personaje añadido");
        console.log(nuevoPersonaje)
    } catch(error) {
        console.error("Error", error);
    }
}

// Ejercicio 1 C:

async function buscar(id) {
    try{
        const resp = await fetch(`${url}/${id}`);
        const data = await resp.json();

        console.log("Personaje buscado:", data);
    } catch(error) {
        console.log("Personaje no encontrado", error);
    }
}

// Ejercicio 1 D:

async function crearArchivo() {
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Archivo creado");

  } catch (error) {
    console.error("Error", error);
  }
}

// Ejercicio 2 A:

async function agregarFinal() {

    const  nuevo = {
        id: 53,
        firstName: "Nuevo Personaje",
        lastName: "Al Final"
    };

    try {
        const data = JSON.parse(await fs.readFile("personajes.json"));

        data.push(nuevo);

        await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

        console.log("Personaje agregado al final:", nuevo);

    } catch (error) {
        console.error("Error", error);
    }
}

// Ejercicio 2 B:

async function agregarInicio() {

    const personaje1 = { id: 54, firstName: "Inicio1" };
    const personaje2 = { id: 55, firstName: "Inicio2" };

    try {
        const data = JSON.parse(await fs.readFile("personajes.json"));

        data.unshift(personaje1, personaje2);

        await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

        console.log("Personajes añadidos al inicio:", personaje1, personaje2);

    } catch (error) {
    console.error("Error", error);
  }
}

// Ejercicio 2 C:

async function eliminarPrimerPj() {
  try {
    const data = JSON.parse(await fs.readFile("personajes.json"));

    const eliminado = data.shift();

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Eliminado:", eliminado);

  } catch (error) {
    console.error("Error", error);
  }
}

// Ejercicio 2 D:

async function crearNuevoArchivo() {
  try {
    const data = JSON.parse(await fs.readFile("personajes.json"));

    const reducido = data.map(p => ({
      id: p.id,
      nombre: p.fullName
    }));

    await fs.writeFile("personajesNombres.json", JSON.stringify(reducido, null, 2));

    console.log("Archivo personajesNombres.json creado");

  } catch (error) {
    console.error("Error", error);
  }
}

// Ejercicio 2 E:

async function reordenar() {
  try {
    const data = JSON.parse(await fs.readFile("personajes.json"));

    const ordenado = data.sort((a, b) =>
      b.firstName.localeCompare(a.firstName)
    );

    console.log("Archivo Reordenado");
    ordenado.forEach(p => console.log(p.firstName));

  } catch (error) {
    console.error("Error", error);
  }
}

async function main() {
    await obtenerPersonajes();
    await agregar();
    await buscar(0);

    await crearArchivo();

    await agregarFinal();
    await agregarInicio();
    await eliminarPrimerPj();

    await crearNuevoArchivo();
    await reordenar();
}

main()