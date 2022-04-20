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
import FrameFilterColor from "../../components/FrameFilter/FrameFilterColor";

import FrameFilterGender from "../../components/FrameFilter/FrameFilterGender";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [frameColor, setFrameColor] = useState({
    black: false,
    havana: false,
    gold: false,
    pink: false,
    rose: false,
    gray: false,
    red: false,
    silver: false,
    brown: false,
  });

  const [gender, setGender] = useState({
    woman: false,
    man: false,
    unisex: false,
  });

  const onFrameChange = (e) => {
    return setFrameColor({ ...frameColor, [e.target.value]: e.target.checked });
  };
  const onGenderChange = (e) => {
    setGender({ ...gender, [e.target.value]: e.target.checked });
  };

  const checkFilters = (product) => {
    const isColor =
      frameColor[product.frameColor.toLowerCase()] ||
      Object.values(frameColor).every((value) => value === false);

    const isGender =
      gender[product.gender] ||
      Object.values(gender).every((value) => value === false);

    return isColor && isGender;
  };

  // if product list is empty
  if (products.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <HeroBanner>
        <h1>Home</h1>
      </HeroBanner>
      <About />
      <div className="content">
        <Container>
          <Row>
            <Col className="filter" sm={3}>
              <FrameFilterColor
                title="FilterBy FrameColor"
                isCheckedBlack={frameColor.black}
                isCheckedHavana={frameColor.havana}
                isCheckedGold={frameColor.gold}
                isCheckedPink={frameColor.pink}
                isCheckedSilver={frameColor.silver}
                isCheckedBrown={frameColor.brown}
                isCheckedGray={frameColor.gray}
                isCheckedRed={frameColor.red}
                isCheckedRose={frameColor.rose}
                fun={onFrameChange}
              />
              <br></br>
              <FrameFilterGender
                title="FilterBy Gender"
                isCheckedBlack={gender.man}
                isCheckedWoman={gender.woman}
                isCheckedUniSex={gender.unisex}
                fun={onGenderChange}
              />
            </Col>
            <Col sm={9}>
              <Row xs={2} md={3} className="space g-4">
                {products
                  .filter((product) => checkFilters(product))
                  .map((item) => {
                    return (
                      <Items
                        key={item.id}
                        id={item.id}
                        url={item.images[0].image_url}
                        name={item.name}
                        price={item.price}
                        color={item.frameColor}
                        frameColor={item.frameColor}
                        gender={item.gender}
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
