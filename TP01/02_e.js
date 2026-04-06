// e) Para los datos anteriores ordenar por nombre y de forma decreciente, luego mostrar por consola (investigar método sort()).

import fs from "fs/promises";

export async function reordenar() {
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

reordenar()