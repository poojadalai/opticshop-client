import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderData } from "../../store/user/actions";
import { selectCart } from "../../store/product/selectors";
import { Button, Container } from "react-bootstrap";
import "../Cart/cart.css";
import { useNavigate } from "react-router-dom";
import { sumOfProducts } from "../../utils/product";
import { selectAdress } from "../../store/user/selectors";

export default function Checkout() {
  const [editMode, setEditMode] = useState(false);
  const paypal = useRef();

  // const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const allAddresses = useSelector(selectAdress);

  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(sumOfProducts(cart));
  }, [cart]);

  function submitForm() {
    dispatch(orderData(cart, id));
    // setTimeout(() => {
    //   navigate("/");
    // }, 3000);
  }

  useEffect(() => {
    if (allAddresses) setId(allAddresses.addresses[0].id);
  }, [allAddresses]);

  useEffect(() => {
    window.paypal_sdk
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "EUR",
                  value: 2,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // const order = await actions.order.capture();
          // submitForm();
          // dispatch(orderData(cart, id));
          if (id) {
            console.log("dispatch: ", cart, id);
            dispatch(orderData(cart, id));
          }
          // alert(
          //   "You have successfully created subscription " + data.subscriptionID
          // );
        },
        onError: (err) => {
          console.log("Paypal error", err);
        },
      })
      .render(paypal.current);
  }, [id, cart, window.paypal_sdk, dispatch]);

  if (!allAddresses)
    return (
      <Container className="p-5">
        <h1>No orders found</h1>
      </Container>
    );

  // onSubmit={}
  return (
    <Container className="p-3">
      <div className="row">
        {allAddresses.addresses?.map((address) => {
          return (
            <div className="col-sm-6" key={address.id}>
              <div
                style={{
                  border:
                    address.id === id ? "1px solid green" : "1px solid black",
                  height: "150px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{address.address}</h5>
                  <p className="card-text">{address.zipcode}</p>
                </div>
                {address.id !== id ? (
                  <button
                    onClick={() => setId(address.id)}
                    style={{
                      background: "none",
                      color: "green",
                      borderColor: "green",
                    }}
                  >
                    select
                  </button>
                ) : (
                  <div style={{ color: "green" }}>Address selected</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        className="col-sm-6"
        style={{ marginTop: "20px" }}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Close" : "Add Address"}
      </Button>

      <div className="d-md-flex">
        {editMode && (
          <div className="col-md-6">
            <div className="row mb-4">
              <div className="col ">
                <div className="header py-3">
                  <h5 className="mt-2">Shipping Details</h5>
                </div>
                {/* <div className="form-outline mb-3">
                  <input
                    name="fullname"
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Full Name"
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div> */}
                <div className="form-outline mb-3">
                  <input
                    name="company"
                    type="text"
                    value={company}
                    className="form-control"
                    placeholder="Company"
                    onChange={(event) => setCompany(event.target.value)}
                    required
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    name="address"
                    value={address}
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        name="city"
                        value={city}
                        type="text"
                        className="form-control"
                        placeholder="City"
                        onChange={(event) => setCity(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        name="zipcode"
                        type="text"
                        value={zipcode}
                        className="form-control"
                        placeholder="Postcode"
                        onChange={(event) => setZipcode(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        name="country"
                        type="text"
                        value={country}
                        className="form-control"
                        placeholder="Country"
                        onChange={(event) => setCountry(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        value={state}
                        name="state"
                        type="text"
                        className="form-control"
                        placeholder="State"
                        onChange={(event) => setState(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        value={phone}
                        name="phone"
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        onChange={(event) => setPhone(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="col-md-5 mb-4">
          <div className="header py-3">
            <h5 className="mt-2 ">Select Payment Method</h5>
          </div>
          <div ref={paypal}></div>
        </div>
        {/* <div calssName="col-md-5 m-2 mt-4">
          <div calssName="card  ">
            <div calssName="p-3 bg-light bg-opacity-10">
              <h6 calssName="card-title mb-3">Order Summary</h6>
              <div calssName="d-flex justify-content-between mb-1 small">
                <span>Subtotal</span> <span>€{total}</span>
              </div>

              <div calssName="d-flex justify-content-between mb-4 small">
                <span>TOTAL</span> <strong calssName="text-dark">€{total}</strong>
              </div>
              <div calssName="form-check mb-1 small">
                <input
                  calssName="form-check-input"
                  type="checkbox"
                  value=""
                  id="tnc"
                />
                <label calssName="form-check-label" for="tnc">
                  I agree to the <a href="/">terms and conditions</a>
                </label>
              </div>
              <div calssName="form-check mb-3 small">
                <input
                  calssName="form-check-input"
                  type="checkbox"
                  value=""
                  id="subscribe"
                />
                <label calssName="form-check-label" for="subscribe">
                  Get emails about product updates and events. If you change
                  your mind, you can unsubscribe at any time.{" "}
                  <a href="/">Privacy Policy</a>
                </label>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Button
        onClick={() => {
          submitForm();
        }}
      >
        Submit
      </Button>
    </Container>
  );
}
