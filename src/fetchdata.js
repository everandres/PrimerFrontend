export const useFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data; // Devuelve solo la parte 'data' del objeto de respuesta
  } catch (error) {
    console.error("Hubo un error en la petición fetch:", error);
    return null; // Puedes manejar el error como prefieras
  }
};
