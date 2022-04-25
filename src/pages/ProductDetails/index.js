import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { addToCart, getProductById } from "../../store/product/actions";
import { selectCart, selectDetails } from "../../store/product/selectors";
import "./style.css";
export default function ProductDetails() {
  const { id } = useParams();
  const details = useSelector(selectDetails);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [replaceSrc, setReplaceSrc] = useState("");

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!details) return <p><Loading /></p>;
  return (
    <div>
      <Container className="details-container">
        <Row className="col-lg-8 m-md-4 w-100">
          <Col sm={6}>
            <Col>
              <img
                className="image img-fluid"
                alt="productImage"
                src={!replaceSrc ? details.images[0].image_url : replaceSrc}
              ></img>
            </Col>
            <Col>
              <Row>
                <div className="container-fluid text-center">
                  <div className="row">
                    <div className="col-sm-4 d-flex">
                      <img
                        onMouseEnter={(e) => {
                          setReplaceSrc(details.images[0].image_url);
                        }}
                        className="sml-img img-thumbnail"
                        src={details.images[0].image_url}
                        alt="small post"
                      ></img>
                      <img
                        onMouseEnter={(e) => {
                          setReplaceSrc(details.images[1].image_url);
                        }}
                        className="sml-img img-thumbnail"
                        src={details.images[1].image_url}
                        alt="small post"
                      ></img>
                      <img
                        onMouseEnter={(e) => {
                          setReplaceSrc(details.images[2].image_url);
                        }}
                        className="sml-img img-thumbnail"
                        src={details.images[2].image_url}
                        alt="small post"
                      ></img>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          </Col>
          <Col lg={5}>
            <h4 className="text-uppercase">{details.brand.name} EYEWEAR</h4>
            <div className="col-lg-8">
              <h1>{details.name}</h1>
            </div>
            <div>
              <h3>
                {" "}
                <Badge bg="danger">€{details.price}.00 (including VAT)</Badge>
              </h3>
            </div>
            <p>{details.brand.desc}</p>
            <h2>
              <Badge bg="success">Form - {details.form}</Badge>
            </h2>

            <div>
              <h5>Gender - {details.gender}</h5>
              <h5>Frame Color - {details.frameColor}</h5>
              <h5>Frame Material - {details.materialFrame}</h5>
              <h5>Lens Color - {details.lensColor}</h5>
              <h5>Lens Material- {details.materialLens}</h5>
            </div>
            <Button
              onClick={() => {
                dispatch(addToCart(details));
              }}
              variant="primary"
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
