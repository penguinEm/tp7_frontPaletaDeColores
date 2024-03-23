import { Button, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import ContenedorCards from "./ContenedorCards";
import {
  crearColor,
  editarColorApi,
  leerColores,
  leerUnColor,
} from "../helpers/queries";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const FormularioColores = ({ editar, btnTexto }) => {
  //!--------------------------------------------------------- Variables------------------------------------------------- */
  const [colores, setColores] = useState([]);
  const [mostrarCards, setMostrarCards] = useState(true);
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const inputColor = watch("nombreColor");

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

  useEffect(() => {
    if (editar === true) {
      cargarFormulario();
      setMostrarCards(false);
    } else {
      setMostrarCards(true);
    }
  }, [editar]);

  const cargarFormulario = async () => {
    const respuesta = await leerUnColor(id);
    if (respuesta.status === 200) {
      const colorBuscado = await respuesta.json();
      setValue("nombreColor", colorBuscado.nombreColor);
    } else {
      alert("ocurrio un error al buscar el color por id");
    }
  };

  /* Validaciones del formulario /// CREAR y EDITAR */
  const colorValidado = async (colorNuevo) => {
    //EDITAR
    if (editar === true) {
      const respuesta = await editarColorApi(id, colorNuevo);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Buen trabajo!",
          html: `Se editó correctamente <span class="fw-bold text-warning">${colorNuevo.nombreColor}</span>`,
          icon: "success",
        });
        navegacion("/");
        reset();
      } else {
        Swal.fire({
          title: "Oops",
          text: "Ocurrió un error al editar, inténtelo nuevamente más tarde!",
          icon: "error",
        });
      }
    }
    //CREAR
    else
      try {
        const respuesta = await crearColor(colorNuevo);
        if (respuesta.status === 201) {
          Swal.fire({
            title: "Buen trabajo!",
            html: `Se agregó la card: <span class="text-primary fw-bold">${colorNuevo.nombreColor}</span>`,
            icon: "success",
          });
          reset();
          setColores([...colores, colorNuevo]);
        } else {
          Swal.fire({
            title: "Oops",
            text: "Ocurrió un error, inténtelo nuevamente más tarde!",
            icon: "error",
          });
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
                className={`${
                  editar === true ? "color-editar" : "color-titulo"
                } w-70 h-75`}
                onChange={(e) => setInputColor(e.target.value)}
                value={inputColor}
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
          <div className="px-5 pb-3 bg-body-tertiary text-center">
            <Button
              type="submit"
              variant={editar === true ? "warning" : "primary"}
              className="rounded-1 "
            >
              {btnTexto}
            </Button>
          </div>
        </Form.Group>
      </Form>
      {mostrarCards && colores.length > 0 && (
        <ContenedorCards
          colores={colores}
          setColores={setColores}
        ></ContenedorCards>
      )}
      {mostrarCards && colores.length === 0 && (
        <Alert variant="info" className="mt-3">
          Aún no se ha cargado ningun color
        </Alert>
      )}
      {!mostrarCards && colores.length > 0 && (
        <Alert variant="info" className="mt-3">
          Editando Color...
        </Alert>
      )}
    </>
  );
};

export default FormularioColores;
