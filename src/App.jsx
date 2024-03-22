import { Container } from "react-bootstrap"
import FormularioColores from "./components/FormularioColores"
import Navbar from "../src/components/common/Navbar";
import Footer from "../src/components/common/Footer";




function App() {
  

  return (
    <>
    <Navbar></Navbar>
      <Container className="border border-primary rounded-5 mt-5 mb-5 main" >
        <h1 className="text-primary ms-5 mt-3">Administrar Colores</h1>
        <FormularioColores></FormularioColores>
      </Container>
      <Footer></Footer>
    </>
  )
}

export default App
