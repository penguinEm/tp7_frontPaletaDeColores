import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import ContenedorCards from "./ContenedorCards";
import { leerColores } from "../helpers/queries";
import { useForm } from "react-hook-form";

const FormularioColores = () => {
  //!--------------------------------------------------------- Variables------------------------------------------------- */
  const [inputColor, setInputColor] = useState("");
  const [colores, setColores] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //! -------------------------------------------------------- Funciones ------------------------------------------------ */
  /* Validaciones del formulario */
  const colorValidado = (color) => {
    console.log("Se valido correctamente el color en el formulario: " + color);
  };

  /* GET de todos los colores */
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
      <Form className="pt-5" onSubmit={handleSubmit(colorValidado)}>
        <Form.Group className="mb-3" controlId="nombreColor">
          <Form.Label className="px-5 pb-4 mb-0 pt-3 w-100 bg-body-tertiary text-primary">
            Ingrese un color por su nombre o en formato Hexadecimal
          </Form.Label>
          <div className="d-flex flex-column justify-content-around align-items-center flex-md-row py-5 bg-body-tertiary">
            <div
              className="colorInput rounded-2 shadow border border-dark mb-5"
              style={{ background: inputColor }}
            ></div>
            <div className="w-50">
              <Form.Control
                type="text"
                placeholder="Ingrese un color, por su nombre en ingles o hexadecimal "
                className="w-70 h-75 color-titulo"
                {...register("nombreColor", {
                  required: "El campo para ingresar el color es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Debe ingresar como mínimo 2 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Debe ingresar como máximo 15 caracteres",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreColor?.message}
              </Form.Text>
            </div>
          </div>
          <div className="mt-5 text-end mx-5 border-primary border-bottom py-3">
            <Button type="submit" variant="primary" className="rounded-1 ">
              Guardar
            </Button>
          </div>
        </Form.Group>
      </Form>
      <ContenedorCards colores={colores}></ContenedorCards>
    </>
  );
};

export default FormularioColores;
