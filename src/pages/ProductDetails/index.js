import React, { useEffect } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, getProductById } from "../../store/product/actions";
import { selectCart, selectDetails } from "../../store/product/selectors";
import "./style.css";
export default function ProductDetails() {
  const { id } = useParams();
  const details = useSelector(selectDetails);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  if (!details) return <p>loading</p>;
  return (
    <div>
      <Container className="details-container">
        <Row className="col-lg-8 m-md-4 w-100">
          <Col sm={6}>
            <Col>
              <img
                className="image img-fluid"
                alt="productImage"
                src={details.images[0].image_url}
              ></img>
            </Col>
            <Col>
              <Row>
                <div className="container-fluid text-center">
                  <div className="row">
                    <div className="col-sm-4 d-flex">
                      <img
                        className="sml-img img-thumbnail"
                        src={details.images[0].image_url}
                        alt="small post"
                      ></img>
                      <img
                        className="sml-img img-thumbnail"
                        src={details.images[1].image_url}
                        alt="small post"
                      ></img>
                      <img
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
            <h4 className="text-uppercase">
              <Badge bg="secondary">{details.brand.name} EYEWEAR</Badge>
            </h4>
            <div className="col-lg-8">
              <h1>
                <Badge bg="secondary">{details.name}</Badge>
              </h1>
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
              <h5>
                <Badge bg="warning">Gender - {details.gender}</Badge>
              </h5>
              <h5>
                <Badge bg="warning">Frame Color - {details.frameColor}</Badge>
              </h5>
              <h5>
                <Badge bg="warning">
                  Frame Material - {details.materialFrame}
                </Badge>
              </h5>
              <h5>
                <Badge bg="warning">Lens Color - {details.lensColor}</Badge>
              </h5>
              <h5>
                <Badge bg="warning">
                  Lens Material- {details.materialLens}
                </Badge>
              </h5>
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
