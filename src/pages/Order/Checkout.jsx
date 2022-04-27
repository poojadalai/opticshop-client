import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderData } from "../../store/user/actions";
import { selectCart } from "../../store/product/selectors";
import { Container } from "react-bootstrap";
import "../Cart/cart.css";
import { useNavigate } from "react-router-dom";
import { sumOfProducts } from "../../utils/product";
export default function Checkout() {
  const paypal = useRef();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [phone, setPhone] = useState();
  // const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(sumOfProducts(cart));
  }, [cart]);

  // const initialOptions = {
  //   "client-id":
  //     "https://www.paypal.com/sdk/js?client-id=AYMB0ZeHI-m-XaosmZbeXRBBwxB2iSoZn5bL7L4dBOnC67tVMs8Mwlb2KWpMrgeRGaRemTgmhjCgGIU2",
  //   currency: "EUR",
  //   intent: "capture",
  //   "data-client-token": "abc123xyz==",
  //   "data-namespace": "paypal_sdk",
  // };
  function submitForm(event) {
    dispatch(
      orderData(
        cart,
        name,
        company,
        address,
        city,
        zipcode,
        country,
        state,
        phone
      )
    );
    setName("");
    setCompany("");
    setAddress("");
    setCity("");
    setZipcode("");
    setCountry("");
    setState("");
    setPhone("");

    setTimeout(() => {
      navigate("/");
    }, 3000);
  }
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
                  value: 2
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          submitForm();
          // alert(
          //   "You have successfully created subscription " + data.subscriptionID
          // );
          // const order = await actions.order.capture();
          // console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  // onSubmit={}
  return (
    <Container>
      <form class="m-5 mr-2">
        <div class="row mb-4">
          <div class="col ">
            <div class="header py-3">
              <h5 class="mt-2">Shipping Details</h5>
            </div>
            <div class="form-outline mb-3">
              <input
                name="fullname"
                type="text"
                value={name}
                class="form-control"
                placeholder="Full Name"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div class="form-outline mb-3">
              <input
                name="company"
                type="text"
                value={company}
                class="form-control"
                placeholder="Company"
                onChange={(event) => setCompany(event.target.value)}
                required
              />
            </div>
            <div class="form-outline mb-3">
              <input
                name="address"
                value={address}
                type="text"
                class="form-control"
                placeholder="Address"
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <input
                    name="city"
                    value={city}
                    type="text"
                    class="form-control"
                    placeholder="City"
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    name="zipcode"
                    type="text"
                    value={zipcode}
                    class="form-control"
                    placeholder="Postcode"
                    onChange={(event) => setZipcode(event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <input
                    name="country"
                    type="text"
                    value={country}
                    class="form-control"
                    placeholder="Country"
                    onChange={(event) => setCountry(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input
                    value={state}
                    name="state"
                    type="text"
                    class="form-control"
                    placeholder="State"
                    onChange={(event) => setState(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <input
                    value={phone}
                    name="phone"
                    type="text"
                    class="form-control"
                    placeholder="Phone"
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col m-md-5">
            <div class="card  ">
              <div class="p-3 bg-light bg-opacity-10">
                <h6 class="card-title mb-3">Order Summary</h6>
                <div class="d-flex justify-content-between mb-1 small">
                  <span>Subtotal</span> <span>€{total}</span>
                </div>

                <div class="d-flex justify-content-between mb-4 small">
                  <span>TOTAL</span> <strong class="text-dark">€{total}</strong>
                </div>
                <div class="form-check mb-1 small">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="tnc"
                  />
                  <label class="form-check-label" for="tnc">
                    I agree to the <a href="/">terms and conditions</a>
                  </label>
                </div>
                <div class="form-check mb-3 small">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="subscribe"
                  />
                  <label class="form-check-label" for="subscribe">
                    Get emails about product updates and events. If you change
                    your mind, you can unsubscribe at any time.{" "}
                    <a href="/">Privacy Policy</a>
                  </label>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
        {/* <Link to="/payment" >
          checkout
        </Link> */}
        <div class="col-md-5 mb-4">
          <div class="header py-3">
            <h5 class="mt-2 ">Select Payment Method</h5>
          </div>
          {/* <Button
            onClick={() => {
              setCheck();
            }}
          >
            Checkout
          </Button> */}

          {/* <PayPalScriptProvider >
            <PayPalButtons ref={paypal} />
          </PayPalScriptProvider> */}

          <div ref={paypal}></div>
        </div>
      </form>
    </Container>
  );
}
