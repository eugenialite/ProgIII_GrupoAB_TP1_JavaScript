// a) Agregar un personaje al final del archivo.

import fs from "fs/promises";

export async function agregarFinal() {
  try {
    const data = JSON.parse(await fs.readFile("personajes.json"));

    data.push({
      id: 53,
      firstName: "Nuevo Personaje",
      lastName: "Al Final"
    });

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Personaje agregado");

  } catch (error) {
    console.error("Error", error);
  }
}

agregarFinal()