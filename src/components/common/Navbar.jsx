import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <Container>
          <a className="navbar-brand gradiente" href="../../index.html">
            <FontAwesomeIcon icon={faCubes} className="text-secondary me-1" />
            INICIO
          </a>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
