import Card from "react-bootstrap/Card";
import { borrarColor, leerColores } from "../helpers/queries";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const CardsColores = ({ color, setColores }) => {
  //! ---------------------------------- FUNCIONES -----------------------------------------------------------------------------
  useEffect(() => {
    coloresActualizados();
  }, []);

  const coloresActualizados = async () => {
    setColores(await leerColores());
  };

  //logica de borrar y actulizar las cards luego
  const borrar = async () => {
    const respuesta = await borrarColor(color.id);
    if (respuesta.status === 200) {
      alert("color borrado correctamente");
      setColores(coloresActualizados());
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
          <Link className="btn btn-outline-danger me-1" onClick={borrar}>
            <i className="bi bi-trash3-fill"></i>
          </Link>
          <Link className="btn btn-outline-warning" to={`editar/${color.id}`}>
            <i className="bi bi-pencil-square"></i>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardsColores;
