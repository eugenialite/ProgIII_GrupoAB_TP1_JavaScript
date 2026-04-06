// c) Eliminar el primer personaje, mostrar en consola el elemento eliminado.

import fs from "fs/promises";

export async function eliminarPrimerPj() {
  try {
    const data = JSON.parse(await fs.readFile("personajes.json"));

    const eliminado = data.shift();

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Eliminado:", eliminado);

  } catch (error) {
    console.error("Error", error);
  }
}

eliminarPrimerPj()