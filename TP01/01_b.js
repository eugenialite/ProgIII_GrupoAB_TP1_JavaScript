// b) Agregar un nuevo personaje (POST).

const url = 'https://thronesapi.com/api/v2/Characters'

export async function agregar() {
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

agregar()