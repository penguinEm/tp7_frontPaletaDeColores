import { Container } from "react-bootstrap";
import FormularioColores from "./components/FormularioColores";
import Navbar from "../src/components/common/Navbar";
import Footer from "../src/components/common/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Container className="border border-primary rounded-5 mt-5 mb-5 main">
        <h1 className="text-primary ms-5 mt-3">Administrar Colores</h1>

        <Routes>
          <Route>
            <Route
              exact
              path="/"
              element={
                <FormularioColores
                  editar={false}
                  btnTexto={"Agregar"}
                ></FormularioColores>
              }
            ></Route>
            <Route
              exact
              path="/editar/:id"
              element={
                <FormularioColores
                  editar={true}
                  btnTexto={"Editar"}
                ></FormularioColores>
              }
            ></Route>
          </Route>
        </Routes>
      </Container>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
