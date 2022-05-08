import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postAddresses } from "../../store/user/actions";
import { getUserWithStoredToken } from "../../store/user/actions";
export default function AddressForm() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [company, setCompany] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [zipcode, setZipcode] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [phone, setPhone] = useState();

  return (
    <div className="">
      {editMode && (
        <div className="col">
          <div className="row mb-4">
            <div className="col ">
              <div className="header py-3">
                <h5 className="mt-2">Shipping Details</h5>
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
              <Button
                onClick={() => {
                  dispatch(getUserWithStoredToken());
                  dispatch(
                    postAddresses(
                      company,
                      address,
                      city,
                      zipcode,
                      country,
                      state,
                      phone
                    )
                  );

                  setCompany("");
                  setAddress("");
                  setCity("");
                  setZipcode("");
                  setCountry("");
                  setState("");
                  setPhone("");
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
      <Button
        className="col-sm-6"
        style={{ marginTop: "20px" }}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? <div>Close</div> : <div>Add Address</div>}
      </Button>
    </div>
  );
}
