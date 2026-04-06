// a) Recuperar la información de todos los personajes (GET).

const url = 'https://thronesapi.com/api/v2/Characters'

export async function obtenerPersonajes() {
    try{
        const resp = await fetch(url);
        const data = await resp.json();

        console.log(data);
        return;

    } catch(error) {
        console.error("Error", error);
    }
}

obtenerPersonajes()