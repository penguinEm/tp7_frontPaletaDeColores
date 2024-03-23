import Card from "react-bootstrap/Card";
import { borrarColor, leerColores } from "../helpers/queries";
import { useEffect } from "react";

const CardsColores = ({ color, setColores }) => {
  //! ---------------------------------- FUNCIONES -----------------------------------------------------------------------------
  //logica de borrar y actulizar las cards luego
  const borrar = async () => {
    const respuesta = await borrarColor(color.id);
    if (respuesta.status === 200) {
      alert("color borrado correctamente");
      const coloresActualizados = await leerColores();
      setColores(coloresActualizados);
    } else {
      alert("ocurrio un error al borrar el color");
    }
  };
  
  //! ---------------------------------- MAQUETADO -----------------------------------------------------------------------------
  return (
    <Card className="my-3 pt-1 shadow" style={{ width: "18rem" }}>
      <div
        className="colorCard"
        style={{ background: color.nombreColor }}
      ></div>
      <Card.Body className="d-flex align-items-center">
        <Card.Title className="me-auto">
          {color.nombreColor.toUpperCase()}
        </Card.Title>
        <div className="d-flex align-items-center ">
          <button className="btn btn-outline-danger me-1" onClick={borrar}>
            <i className="bi bi-trash3-fill"></i>
          </button>
          <a className="btn btn-outline-warning">
            <i className="bi bi-pencil-square"></i>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardsColores;
