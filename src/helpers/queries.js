const URI_COLORES = import.meta.env.VITE_API_COLORES;

//! 1. GET de todos los colores del DB
export const leerColores = async () => {
  try {
    const respuesta = await fetch(URI_COLORES);
    const listaColores = await respuesta.json();
    return listaColores;
  } catch (error) {
    console.error(error);
  }
};

//! 2. POST crear color
export const crearColor = async (colorNuevo) => {
  try {
    const respuesta = await fetch(URI_COLORES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colorNuevo),
    });
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

//! 3. DELETE de una tarea por id

export const borrarColor = async (id) => {
  try {
    const respuesta = await fetch(`${URI_COLORES}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};


//! 4. GET de 1 color buscado por id
export const leerUnColor = async (id) => {
  try {
    const respuesta = await fetch(`${URI_COLORES}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};


