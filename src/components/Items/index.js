import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Items(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img style={{ padding: "8px" }} variant="top" src={props.url} />
      <Card.Body className="center">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>€{props.price},00</Card.Text>
        <h1 style={{ backgroundColor: props.frameColor }}>{props.color}</h1>
        <h2>{props.gender}</h2>
        <Link to={`/products/${props.id}`}>
          <Button className="center" variant="success">
            See Product
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
