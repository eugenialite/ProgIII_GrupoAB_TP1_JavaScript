import fs from "fs/promises";

const url = 'https://thronesapi.com/api/v2/Characters'

// Ejercicio 1 A: (Alondra Ilari)

async function infoPersonajes() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error!`);
      }
      const personajes = await response.json();
      console.log(personajes);
      return personajes;
    
    }catch (error) {
        console.error('Error', error);
    }
}   

// Ejercicio 1 B: (Micaela Santana)

async function crearPersonajes(personaje) {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personaje),
    });

    if (!resp.ok) {
      console.log("Error en POST");
      return;
    }

    console.log("POST realizado correctamente");
  } catch (error) {
    console.log(`Error! ${error}`);
  }
}

const p = {
  id: 22,
  firstName: "Micaela",
  lastName: "Santana",
  fullName: "Micaela Santana",
  title: "Reina",
  family: "Santana",
  image: "Image",
  imageUrl: "ImageURL"
};

// Ejercicio 1 C: (Jorge Larran)

async function buscar(id) {
    try{
        const resp = await fetch(`${url}/${id}`);
        const data = await resp.json();

        console.log("Personaje buscado:", data);
    } catch(error) {
        console.log("Personaje no encontrado", error);
    }
}

// Ejercicio 1 D: (Jorge Larran)

async function guardarDatos() {
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Archivo creado");

  } catch (error) {
    console.error("Error", error);
  }
}

// Ejercicio 2 A: (Alvaro Valdez)

async function agregarAlFinal() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);
        
        const pjNuevo = { id: 999, fullName: "Juan Nieve", family: "Stark" };
        personajes.push(pjNuevo);
        
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("Personaje agregado al final del archivo:", pjNuevo);
    } catch (error) {
        console.error("Error al agregar al final:", error);
    }
}

// Ejercicio 2 B: (Jorge Larran)

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

// Ejercicio 2 C: (Damiana Sanchez)

async function eliminarPrimero() {
  try {
    const archivo = await fs.readFile("personajes.json");
    const data = JSON.parse(archivo);

    const elim = data.shift();

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("eliminado:", elim);
  } catch (e) {
    console.log("error", e);
  }
}

// Ejercicio 2 D: (Eugenia Blanc)

async function crearArchivoIDNombres() {
    try {
        const personajes = JSON.parse(await fs.readFile("personajes.json"));
        const soloNombres = personajes.map(p => ({
            id: p.id,
            nombre: p.fullName
        }));
        await fs.writeFile('personajes_nombres.json', JSON.stringify(soloNombres, null, 2), 'utf-8');
        console.log('Archivo creado');
    } catch (error) {
        console.log(`Error! ${error}`);
    }
}

// Ejercicio 2 E: (Jorge Larran)

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
    await infoPersonajes();
    await crearPersonajes(p);
    await buscar(0);

    await guardarDatos();

    await agregarAlFinal();
    await agregarInicio();
    await eliminarPrimero();

    await crearArchivoIDNombres();
    await reordenar();
}

main()