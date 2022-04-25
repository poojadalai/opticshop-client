import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  deleteItem,
  increaseAmount,
} from "../../store/product/actions";
import { selectCart } from "../../store/product/selectors";
import "./cart.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { sumOfProducts } from "../../utils/product";
import { Link } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

export default function Cart() {
  const carts = useSelector(selectCart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(sumOfProducts(carts));
  }, [carts]);
  const token = useSelector(selectToken);
  useEffect(() => {}, [carts]);
  return carts.length === 0 ? (
    <Container className="p-5">
      <h1>Your cart is empty</h1>
    </Container>
  ) : (
    <main className="container page">
      <section className="shopping-cart dark">
        <div className="container">
          <div className="block-heading">
            <h2>Shopping Cart</h2>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  <div className="product">
                    {carts.map((cart) => {
                      return (
                        <div key={cart.id}>
                          {" "}
                          <div className="row m-sm-2">
                            <div className="col-md-3">
                              <Link to={`/products/${cart.id}`}>
                                <img
                                  alt="item"
                                  className="img-fluid mx-auto d-block p-2 image sml-img"
                                  src={cart.images[2].image_url}
                                />
                              </Link>
                            </div>
                            <div className="col-md-8">
                              <div className="info">
                                <div className="row">
                                  <div className="col-md-5 product-name">
                                    <div className="product-name">
                                      <a href={`/products/${cart.id}`}>
                                        {cart.brand.name} -{" "}
                                      </a>
                                      <a href={`/products/${cart.id}`}>
                                        {cart.name}
                                      </a>
                                      <div className="product-info">
                                        <div>
                                          Frame:{" "}
                                          <span className="value">
                                            {cart.materialFrame}
                                          </span>
                                        </div>
                                        <div>
                                          Lens:{" "}
                                          <span className="value">
                                            {cart.materialLens}
                                          </span>
                                        </div>
                                        <div>
                                          Gender:{" "}
                                          <span className="value">
                                            {cart.gender}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4 quantity">
                                    <label htmlFor="quantity">Quantity:</label>
                                    <div className="d-flex">
                                      <button
                                        className="form-control quantity-input col-lg"
                                        onClick={() => {
                                          dispatch(decreaseAmount(cart.id));
                                        }}
                                        disabled={cart.amount ? false : true}
                                      >
                                        -
                                      </button>
                                      {/* <input
                                        name="quantity"
                                        type="text"
                                        value={cart.amount}
                                        className="form-control m-0 w-70 text-center quantity-input"
                                      /> */}
                                      <div
                                        className="form-control quantity-input col-lg"
                                        // style={{
                                        //   width: "50px",
                                        //   height: "34px",
                                        //   display: "flex",
                                        //   alignItems: "center",
                                        //   justifyContent: "center",
                                        // }}
                                      >
                                        <span>{cart.amount}</span>
                                      </div>

                                      <button
                                        className="form-control quantity-input col-lg"
                                        onClick={() => {
                                          dispatch(increaseAmount(cart.id));
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-md-2 p-2 price d-flex">
                                    <span className="span">
                                      €{cart.price * cart.amount},00
                                    </span>
                                  </div>
                                  <Button
                                    style={{
                                      fontSize: "14px",
                                      width: "fit-content",
                                    }}
                                    variant="danger"
                                    // variant="outlined"
                                    className="h-100 m-3 text-center align-item-center"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      dispatch(deleteItem(cart.id));
                                    }}
                                  >
                                    Delete
                                    {/* <MdDelete /> */}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Subtotal</span>
                    <span className="price">€{total}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Discount</span>
                    <span className="price">€0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Shipping</span>
                    <span className="price">€0</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total</span>
                    <span className="price">€{total}</span>
                  </div>

                  <Link
                    to={token ? "/shipping" : "/login"}
                    type="button"
                    className="mt-5 btn btn-primary btn-lg btn-block"
                  >
                    Continue to order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
