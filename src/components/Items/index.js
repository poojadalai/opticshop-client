import React from "react";
import { Card, Button } from "react-bootstrap";

export default function Items(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img style={{ padding: "8px" }} variant="top" src={props.url} />
      <Card.Body className="center">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>€{props.price},00</Card.Text>
        <Button className="center" variant="success">
          See Product
        </Button>
      </Card.Body>
    </Card>
  );
}
