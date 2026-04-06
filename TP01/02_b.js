// b) Agregar dos personajes al inicio del archivo.

import fs from "fs/promises";

export async function agregarInicio() {
  try {
    const data = JSON.parse(await fs.readFile("personajes.json"));

    data.unshift(
      { id: 54, firstName: "Inicio1" }, { id: 55, firstName: "Inicio2" }
    );

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Personajes añadidos");

  } catch (error) {
    console.error("Error", error);
  }
}

agregarInicio()