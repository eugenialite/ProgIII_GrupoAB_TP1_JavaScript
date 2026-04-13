import fs from "fs/promises";

const url= "https://thronesapi.com/api/v2/Characters";

//ejercicio1-A
async function traerPersonajes() {
    try {
        const res = await fetch(url);
        const data = await res.json(); 
        console.log(data); 
    } catch (e) {
        console.log("error", e); 
    }
}

// ejercicio1-B 

async function agregarPersonaje() {
  const nuevo = {
    id: 100,
    firstName: "Ignacio",
    lastName: "Novello",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });

    console.log("status:", res.status);
  } catch (e) {
    console.log("error", e);
  }
}

// ejercicio1-C
async function buscarPersonaje(id) {
  try {
    const res = await fetch("${url}/${id}"); 
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log("no se encontro", e);
  }
}

// ejercicio1-D
async function guardarArchivo() {
  try {
    const res = await fetch(url);
    const data = await res.json();

    await fs.writeFile("data.json", JSON.stringify(data));

    console.log("archivo guardado");
  } catch (e) {
    console.log("error", e);
  }
}

// ejercicio2-A
async function agregarAlFinal() {
  try {
    const archivo = await fs.readFile("data.json");
    const data = JSON.parse(archivo);

    data.push({ id: 200, firstName: "Final" });

    await fs.writeFile("data.json", JSON.stringify(data));

    console.log("agregado al final");
  } catch (e) {
    console.log("error", e);
  }
}

// ejercicio2-B
async function agregarAlInicio() {
  try {
    const archivo = await fs.readFile("data.json");
    const data = JSON.parse(archivo);

    data.unshift({ id: 201, firstName: "Inicio1" });
    data.unshift({ id: 202, firstName: "Inicio2" });

    await fs.writeFile("data.json", JSON.stringify(data));

    console.log("agregado al inicio");
  } catch (e) {
    console.log("error", e);
  }
}

// ejercicio2-C
async function eliminarPrimero() {
  try {
    const archivo = await fs.readFile("data.json");
    const data = JSON.parse(archivo);

    const elim = data.shift();

    await fs.writeFile("data.json", JSON.stringify(data));

    console.log("eliminado:", elim);
  } catch (e) {
    console.log("error", e);
  }
}

// ejercicio2-D
async function nuevoArchivo() {
  try {
    const archivo = await fs.readFile("data.json");
    const data = JSON.parse(archivo);

    const nuevo = data.map(p => ({
      id: p.id,
      nombre: p.fullName,
    }));

    await fs.writeFile("nombres.json", JSON.stringify(nuevo));

    console.log("nuevo archivo listo");
  } catch (e) {
    console.log("error", e);
  }
}

// ejercicio2-E
async function ordenar() {
  try {
    const archivo = await fs.readFile("data.json");
    const data = JSON.parse(archivo);

    data.sort((a, b) => b.firstName.localeCompare(a.firstName));

    data.forEach(p => console.log(p.firstName));
  } catch (e) {
    console.log("error", e);
  }
}

async function main() {
  await traerPersonajes();
  await agregarPersonaje();
  await buscarPersonaje(1);
  await guardarArchivo();
  await agregarAlFinal();
  await agregarAlInicio();
  await eliminarPrimero();
  await nuevoArchivo();
  await ordenar();
}

main();