//d) Persistir los datos de la primer consulta en un archivo local JSON.

import fs from "fs/promises";

const url = 'https://thronesapi.com/api/v2/Characters'


export async function crearArchivo() {
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    await fs.writeFile("personajes.json", JSON.stringify(data, null, 2));

    console.log("Archivo creado");

  } catch (error) {
    console.error("Error", error);
  }
}

crearArchivo()