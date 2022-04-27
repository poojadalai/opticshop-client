import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/product/actions";
import { useAlert } from "react-alert";
import { BsCartFill } from "react-icons/bs";

export default function Items(props) {
  const dispatch = useDispatch();
  const alert = useAlert();

  return (
    <Card className="product-card" style={{ width: "18rem" }}>
      <Card.Img style={{ margin: "1px" }} variant="top" src={props.url} />
      <Card.Body style={{ textAlign: "center", padding: "10px" }}>
        <Card.Title className="text-capitalize">
          <span> {props.b}- </span> {props.name}
        </Card.Title>
        <Card.Text>€{props.price}.00</Card.Text>
        <h1 style={{ backgroundColor: props.frameColor }}>{props.color}</h1>
        <h2>{props.gender}</h2>
        <Link to={`/products/${props.id}`}>
          <Button
            style={{ textAlign: "center", fontSize: "14px" }}
            variant="secondry"
            className="text-light bg-secondary"
          >
            See Product
          </Button>
        </Link>{" "}
        <Button
          onClick={() => {
            dispatch(addToCart(props.item));
            // dispatch(appLoading());
            alert.success("Item added!");
          }}
          style={{ fontSize: "14px" }}
          variant="secondry"
          className="text-light bg-secondary"
        >
          <BsCartFill />
        </Button>
      </Card.Body>
    </Card>
  );
}
