import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container, Row, Col, CardGroup, Form } from "react-bootstrap";
import HeroBanner from "../../components/HeroBanner";
import Items from "../../components/Items";
import "./style.css";
import { getProducts } from "../../store/product/actions";
import { selectProducts } from "../../store/product/selectors";
import About from "../../components/About";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(products);
  if (!products) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <HeroBanner>
        <h1>Home</h1>
      </HeroBanner>
      <About />
      <div className="content">
        {" "}
        <Container>
          <Row>
            <Col className="filter" sm={3}>
              <h5>Filter by Brand</h5>
            </Col>
            <Col sm={9}>
              <Row xs={2} md={3} className="space g-4">
                {products.map((item) => {
                  return (
                    <Items
                      key={item.id}
                      url={item.images[0].image_url}
                      name={item.name}
                      price={item.price}
                    />
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
