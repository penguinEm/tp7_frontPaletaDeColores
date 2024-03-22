
import Card from "react-bootstrap/Card";

const CardsColores = ({ color}) => {
  return (
    <Card className="my-3 pt-1 shadow" style={{ width: "18rem" }}>
      <div
        className="colorCard"
        style={{ background: color.nombreColor }}
      ></div>
      <Card.Body className="d-flex align-items-center">
        <Card.Title className="me-auto">{color.nombreColor.toUpperCase()}</Card.Title>
        <div className="d-flex align-items-center ">
          <a className="btn btn-outline-danger me-1">
            <i className="bi bi-trash3-fill"></i>
          </a>
          <a className="btn btn-outline-warning">
            <i className="bi bi-pencil-square"></i>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardsColores;
