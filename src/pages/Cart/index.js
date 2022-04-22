import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  deleteItem,
  increaseAmount,
} from "../../store/product/actions";
import { selectCart } from "../../store/product/selectors";
import "./cart.css";
import { MdDelete } from "react-icons/md";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Cart() {
  const carts = useSelector(selectCart);
  const dispatch = useDispatch();

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
              <div className="col-md-12 col-lg-9">
                <div className="items">
                  <div className="product">
                    {carts.length === 0
                      ? "No Cart Item"
                      : carts.map((cart) => {
                          return (
                            <div>
                              {" "}
                              <div className="row p-1">
                                <div className="col-md-3">
                                  <img
                                    alt="item"
                                    className="img-fluid mx-auto d-block p-2 image"
                                    src={cart.images[0].image_url}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="info">
                                    <div className="row">
                                      <div className="col-md-5 product-name">
                                        <div className="product-name">
                                          <a href="/">{cart.brand.name} - </a>
                                          <a href="/">{cart.name}</a>
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
                                        <label for="quantity">Quantity:</label>
                                        <div className="d-flex">
                                          <button
                                            className="form-control quantity-input col-lg"
                                            onClick={() => {
                                              dispatch(decreaseAmount(cart.id));
                                            }}
                                            disabled={
                                              cart.amount ? false : true
                                            }
                                          >
                                            -
                                          </button>
                                          <input
                                            id="quantity"
                                            type="number"
                                            value={cart.amount}
                                            className="form-control m-0 w-70 text-center quantity-input"
                                          />

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
                                        <span>
                                          €{cart.price * cart.amount},00
                                        </span>
                                        <Button
                                          variant="outlined"
                                          className="h-100 align-item-center"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(deleteItem(cart.id));
                                          }}
                                        >
                                          {/* Delete */}
                                          <MdDelete />
                                        </Button>
                                      </div>
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
              {/* <div className="col-md-12 col-lg-3">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Subtotal</span>
                    <span className="price">€360</span>
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
                    <span className="price">€360</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Checkout
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
