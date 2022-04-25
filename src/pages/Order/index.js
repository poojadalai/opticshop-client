import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderData } from "../../store/user/actions";
import { selectCart } from "../../store/product/selectors";
import { Container, Button } from "react-bootstrap";
export default function Order() {
  
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  function submitForm(event) {
    event.preventDefault();
    console.log(
      cart,
      name,
      company,
      address,
      city,
      zipcode,
      country,
      state,
      phone
    );

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
  }

  return (
    <Container>
      <form class="row m-5 mr-2" onSubmit={submitForm}>
        <div class="col-md-5 mb-4">
          <div class="">
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="header py-3">
            <h5 class="mt-2">Payment Method</h5>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <label class="form-check-label" for="exampleRadios1">
              Credit card
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="option2"
            />
            <label class="form-check-label" for="exampleRadios2">
              Debit card
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios3"
              value="option3"
            />
            <label class="form-check-label" for="exampleRadios3">
              Paypal
            </label>
          </div>

          <div class="row mb-4 mt-4">
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form7Example1">
                  Name on card
                </label>
                <input type="text" class="form-control" />
                <small id="emailHelp" class="form-text text-muted">
                  Full name as displayed on card
                </small>
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form7Example2">
                  Credit card number
                </label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row mb-4 mt-4">
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form7Example1">
                  Expiration
                </label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="col">
              <div class="form-outline">
                <label class="form-label" for="form7Example2">
                  CVV
                </label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <Button
            class="btn btn-primary btn-lg btn-block"
            type="submit"
            value="Submit"
          >
            Continue to checkout
          </Button>
        </div>
      </form>
    </Container>
  );
}
