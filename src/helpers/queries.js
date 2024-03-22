const URI_COLORES = import.meta.env.VITE_API_COLORES;

//! GET de todos los colores del DB
export const leerColores = async () => {
  try {
    const respuesta = await fetch(URI_COLORES);
    const listaColores = await respuesta.json();
    return listaColores
  } catch (error) {
    console.error(error);
  }
};

