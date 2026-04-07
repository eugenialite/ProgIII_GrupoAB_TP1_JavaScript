
//API Fecth – File System

// a) Recuperar la información de todos los personajes (GET) y d) Persistir los datos de la primer consulta en un archivo local JSON

const fs = require("fs");

const url = "https://thronesapi.com/api/v2/Characters";

async function obtenerPersonajes() {

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      console.log("Error al obtener personajes");
    }

    return resp.json();

  } catch (error) {
    console.log(`Error -> ${error}`);
  }
}

obtenerPersonajes().then((personajes) => {
  console.log(personajes);

  const data = JSON.stringify(personajes, null, 2); 

  fs.writeFileSync("personajes.json", data); 

  console.log("Archivo personajes.json guardado");
});

// b) Agregar un nuevo personaje (POST).

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

crearPersonajes(p);

// Buscar la información de un determinado personaje, utilizando un “id” como parámetro (GET).


async function obtenerPersonajePorId(id) {
  try {
    const resp = await fetch(`${url}/${id}`);

    if (!resp.ok) {
      console.log("Error al buscar personaje");
    }

    const personaje = await resp.json();
    console.log("Personaje:", personaje);

  } catch (error) {
    console.log(`Error -> ${error}`);
  }
}

obtenerPersonajePorId(6);


