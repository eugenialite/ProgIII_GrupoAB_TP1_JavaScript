// d) Crear un nuevo archivo que solo contenga los: id y nombres de los personajes.

import fs from "fs/promises";

export async function crearNuevoArchivo() {
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

crearNuevoArchivo()