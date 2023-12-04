import { useState, useEffect } from "react";
import { useFetch } from "./fetchdata";

const styles = {
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // Centrar las tarjetas horizontalmente
    alignContent: "flex-start", // Alinear las tarjetas al principio del contenedor verticalmente
    width: "100%", // El contenedor debe ocupar todo el ancho de la pantalla
    maxWidth: "1200px", // Opcional: Establecer un ancho máximo para las tarjetas en pantallas muy grandes
    margin: "auto", // Centra el contenedor si tiene maxWidth
  },
  card: {
    width: "calc(33.333% - 20px)", // Toma un tercio del contenedor menos el margen total horizontal
    margin: "10px", // Margen alrededor de las tarjetas para separarlas
    boxSizing: "border-box",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    display: "flex", // Flexbox para organizar imagen y texto verticalmente
    flexDirection: "column", // Organizar los elementos en columnas (verticalmente)
    alignItems: "center", // Centrar elementos horizontalmente dentro de la tarjeta
  },
  name: {
    fontSize: "1.5em",
    margin: "0 0 10px 0",
    color: "red",
  },
  avatar: {
    maxWidth: "80%", // Reducir un poco el tamaño de la imagen si es necesario
    height: "auto",
    borderRadius: "50%",
    margin: "0 0 10px 0", // Añadir margen debajo de la imagen,
  },
};

export const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await useFetch("https://reqres.in/api/users?page=1&per_page=2");
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Cargando...</div>;
  }

  data.sort((a, b) => a.first_name.localeCompare(b.first_name));

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "rotateY(180deg)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateY(0deg)";
  };
  return (
    <div style={styles.gridContainer}>
      {/* Renderizar los datos aquí */}
      {data.map(({ id, first_name, last_name, avatar }) => (
        <div
          style={styles.card}
          key={id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 style={styles.name}>
            {first_name} {last_name}{" "}
          </h1>
          <img src={avatar} alt={`Avatar de ${first_name} ${last_name}`} />
        </div>
      ))}
    </div>
  );
};
