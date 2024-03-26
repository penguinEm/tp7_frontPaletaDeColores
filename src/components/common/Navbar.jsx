import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar bg-body-tertiary">
        <Container>
          <Link className="navbar-brand gradiente" to={"/"}>
            <FontAwesomeIcon icon={faCubes} className="text-secondary me-1" />
            INICIO
          </Link>
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
