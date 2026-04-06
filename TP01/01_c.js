// c) Buscar la información de un determinado personaje, utilizando un “id” como parámetro (GET).

const url = 'https://thronesapi.com/api/v2/Characters'

export async function buscar(id) {
    try{
        const resp = await fetch(`${url}/${id}`);
        const data = await resp.json();

        console.log(data);
    } catch(error) {
        console.log("Personaje no encontrado", error);
    }
}

buscar(0)