import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import ContenedorCards from "./ContenedorCards";
import {  crearColor, leerColores } from "../helpers/queries";
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

  /* Validaciones del formulario /// CREAR y EDITAR */
  const colorValidado = async (colorNuevo) => {
    try {
      const respuesta = await crearColor(colorNuevo);
      if (respuesta.status === 201) {
        alert("producto creado");
        reset();
        setColores([...colores, colorNuevo]);
      } else {
        alert("ocurrio un error al crear la tarea");
      }
    } catch (error) {
      console.error(error);
    }
  };


  //! ------------------------------------------------------------- Maquetado - log ext------------------------------------ */

  return (
    <>
      <Form className="pt-5" onSubmit={handleSubmit(colorValidado)}>
        <Form.Group className="mb-3" controlId="nombreColor">
          <div className="d-flex flex-column justify-content-around align-items-center flex-md-row py-5 bg-body-tertiary">
            <div
              className="colorInput rounded-2 shadow border border-dark mb-5"
              style={{ background: inputColor }}
            ></div>
            <div className="w-50">
              <Form.Control
                type="text"
                placeholder="Ej:  Red o #FF0000  "
                className="w-70 h-75 color-titulo"
                {...register("nombreColor", {
                  required: "El campo para ingresar el color es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Debe ingresar como mínimo 2 caracteres",
                  },
                  maxLength: {
                    value: 15,
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
      <ContenedorCards colores={colores} setColores={setColores}></ContenedorCards>
    </>
  );
};

export default FormularioColores;
