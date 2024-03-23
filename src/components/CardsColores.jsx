import Card from "react-bootstrap/Card";
import { borrarColor, leerColores } from "../helpers/queries";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
    Swal.fire({
      html: `¿Estas seguro que desea borrar:<span class="text-danger fw-bold"> ${color.nombreColor.toUpperCase()}</span>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarColor(color.id);
        if (respuesta.status === 200) {
          setColores(coloresActualizados());
          Swal.fire({
            html: `Color: <span class="text-danger fw-bold">${color.nombreColor}</span> borrado!`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ocurrio un error, intente mas tarde!",
            icon: "error",
          });
        }
      }
    });
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
