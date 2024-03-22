import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import ContenedorCards from "./ContenedorCards";
import { leerColores } from "../helpers/queries";

const FormularioColores = () => {
  //!--------------------------------------------------------- Variables------------------------------------------------- */
  const [inputColor, setInputColor] = useState("");
  const [colores, setColores] = useState([]);

  //! -------------------------------------------------------- Funciones ------------------------------------------------ */

  useEffect(() => {
    traerColoresDb();
  }, []);

  const traerColoresDb = async () => {
    try {
      const listaColores = await leerColores();
      setColores(listaColores);
    } catch (error) {
      console.error(error);
    }
  };
  //! ------------------------------------------------------------- Maquetado - log ext------------------------------------ */

  return (
    <>
      <Form className="pt-5">
        <Form.Group className="mb-3" controlId="nombreColor">
          <Form.Label className="px-5 pb-4 w-100 text-primary">
            Administrar Colores
          </Form.Label>
          <div className="d-flex justify-content-around py-5 bg-body-tertiary m7-5 align-items-center">
            <div
              className="colorInput rounded-2 shadow border border-dark"
               style={{ background: inputColor }}
            ></div>
            <Form.Control
              type="text"
              placeholder="Ingrese un color, por su nombre en ingles o hexadecimal "
              className="w-50 h-75 color-titulo"
              minLength={3}
              maxLength={10}
            />
          </div>
          <div className="mt-5 text-end mx-5 border-primary border-bottom py-3">
            <Button type="submit" variant="primary" className="rounded-1 ">
              Guardar
            </Button>
          </div>
        </Form.Group>
      </Form>
      <ContenedorCards colores={colores} ></ContenedorCards>
    </>
  );
};

export default FormularioColores;
