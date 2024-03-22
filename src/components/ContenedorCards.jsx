import CardsColores from "./CardsColores";

const ContenedorCards = ({ colores }) => {
  return (
    <div className="mb-5 d-flex justify-content-around row">
      {colores.map((color, posicion) => (
        <CardsColores color={color} key={posicion}></CardsColores>
      ))}
    </div>
  );
};

export default ContenedorCards;
