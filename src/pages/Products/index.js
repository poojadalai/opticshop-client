import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HeroBanner from "../../components/HeroBanner";
import Items from "../../components/Items";
import "./style.css";
import { getProducts } from "../../store/product/actions";
import { selectProducts } from "../../store/product/selectors";
import About from "../../components/About";
import FrameFilterColor from "../../components/FrameFilter/FrameFilterColor";
import FrameFilterGender from "../../components/FrameFilter/FrameFilterGender";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  // console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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

  //pagination
  const [offset, setoffset] = useState(0);

  const getNextProducts = () => {
    setoffset(offset + 9);
  };

  const getPreviousProducts = () => {
    setoffset(offset - 9);
  };

  const [search, setSearch] = useState();

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

  const filteredProduct = [...products].filter((product) => {
    return (
      product.name.toLowerCase().includes(search?.toLowerCase()) ||
      product.brand.name.toLowerCase().includes(search?.toLowerCase())
    );
  });

  // if product list is empty
  if (products.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <HeroBanner url="//cdn.shopify.com/s/files/1/0266/9379/6048/files/4612da0adc113d6cc7a5bb9fc42b9643_1_1920x.progressive.jpg?v=1615289490" />

      <About />
      <div className="content">
        <Container>
          <Row>
            <Col className="filter" sm={3}>
              <FrameFilterGender
                title="FilterBy Gender"
                isCheckedBlack={gender.man}
                isCheckedWoman={gender.woman}
                isCheckedUniSex={gender.unisex}
                fun={onGenderChange}
              />

              <br></br>
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
            </Col>
            <Col sm={9}>
              <input
                type="text"
                className="form-control align-items-center p-4 mt-3 icon"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Row xs={2} md={3} className="space g-4">
                {!search
                  ? products
                      .filter((product) => checkFilters(product))
                      .map((item, index) => {
                        return (
                          offset <= index &&
                          index <= offset + 8 && (
                            <Items
                              key={item.id}
                              id={item.id}
                              url={item.images[0].image_url}
                              name={item.name}
                              b={item.brand.name}
                              price={item.price}
                              item={item}
                            />
                          )
                        );
                      })
                  : filteredProduct
                      .filter((product) => checkFilters(product))
                      .map((item, index) => {
                        return (
                          offset <= index &&
                          index <= offset + 8 && (
                            <Items
                              key={item.id}
                              id={item.id}
                              url={item.images[0]?.image_url}
                              name={item.name}
                              price={item.price}
                              b={item.brand.name}
                              item={item}
                            />
                          )
                        );
                      })}
              </Row>

              <div className="d-flex justify-content-center">
                <Button
                  className="btn btn-primary m-3"
                  onClick={getPreviousProducts}
                  disabled={offset === 0}
                >
                  <FaLessThan />
                </Button>
                <Button
                  className="btn btn-primary m-3"
                  onClick={getNextProducts}
                  disabled={offset >= products.length - 8}
                >
                  <FaGreaterThan />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
