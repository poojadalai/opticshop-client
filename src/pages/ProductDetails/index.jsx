import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { showMessageWithTimeout } from "../../store/appState/actions";
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

  if (!details)
    return (
      <p>
        <Loading />
      </p>
    );
  return (
    <div>
      <Container
        className="details-container"
        style={{ marginBottom: "222px" }}
      >
        <nav aria-label="breadcrumb" className="main-breadcrumb p-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">{details.brand.name}</li>
            <li className="breadcrumb-item active" aria-current="page">
              {details.name}
            </li>
          </ol>
        </nav>
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
                <div className="container-fluid text-center mb-4">
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

              <div className="col mt-5 pt-3 pb-5">
                <h5>Product Specification </h5>
                <hr></hr>
                <Tabs
                  defaultActiveKey="details"
                  id="uncontrolled-tab-example"
                  className="mt-3 mb-3"
                >
                  <Tab eventKey="details" title="Details">
                    <div className="mt-4">
                      <h5 className="text-muted">{details.brand.desc}</h5>
                    </div>
                  </Tab>
                  <Tab eventKey="specification" title="Specification">
                    <ul className="list-inline">
                      <li className="list-inline-item p-2 text-capitalize">
                        <h4>Gender</h4>
                        <div className="h5 text-muted">{details.gender}</div>
                      </li>

                      <li className="list-inline-item p-2">
                        <h4>Form</h4>
                        <div className="h5 text-muted">{details.form}</div>
                      </li>
                      <li className="list-inline-item p-2">
                        <h4>Frame Material</h4>
                        <div className="h5 text-muted">
                          {details.materialFrame}
                        </div>
                      </li>

                      <li className="list-inline-item p-2">
                        <h4>Lens Material</h4>
                        <div className="h5 text-muted">
                          {details.materialLens}
                        </div>
                      </li>
                    </ul>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Col>
          <Col lg={5}>
            <div className="text-muted text-uppercase">
              <p>{details.brand.name} EYEWEAR</p>
            </div>

            <div className="col-lg-6">
              <h5 className="font-weight-bold">
                {details.name} <br></br>
                <br></br>€{details.price}.00 (including VAT)
              </h5>
            </div>
            <br></br>
            <div>
              {details.lensColor !== null ? (
                <div>
                  {" "}
                  <h5 className="font-weight-bold">Lens Color</h5>
                  <ul className="list-inline d-flex">
                    <span
                      className="dot list-inline-item"
                      style={{ backgroundColor: `${details.lensColor}` }}
                    ></span>
                    <span className="mb-0 text-capitalize">
                      {details.lensColor}
                    </span>
                  </ul>
                </div>
              ) : (
                " "
              )}

              <h5 className="font-weight-bold">Frame Color</h5>
              <ul className="list-inline d-flex">
                <span
                  className="dot list-inline-item"
                  style={{ backgroundColor: `${details.frameColor}` }}
                ></span>
                <span className="mb-0 text-capitalize">
                  {details.frameColor}
                </span>
              </ul>
            </div>

            <br></br>
            <Button
              onClick={() => {
                dispatch(addToCart(details));
                dispatch(
                  showMessageWithTimeout(
                    "success",
                    false,
                    "Item added to cart",
                    1500
                  )
                );
              }}
              variant="secondry"
              className="p-2 text-light bg-secondary"
            >
              Add to cart
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
