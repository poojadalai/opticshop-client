import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderData } from "../../store/user/actions";
import { selectCart } from "../../store/product/selectors";
import { Button, Container } from "react-bootstrap";
import "../Cart/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { sumOfProducts } from "../../utils/product";
import { selectAdress } from "../../store/user/selectors"; //
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

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
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  useEffect(() => {
    if (allAddresses) setId(allAddresses?.addresses[0]?.id);
  }, [allAddresses]);

  useEffect(() => {
    if (success) {
      console.log("Payment successful!!");
    }
  }, [success]);

  if (!allAddresses)
    return (
      <Container className="p-5">
        <h1>No orders found</h1>
      </Container>
    );

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "EUR",
              value: 1,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      submitForm();
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  //

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AYMB0ZeHI-m-XaosmZbeXRBBwxB2iSoZn5bL7L4dBOnC67tVMs8Mwlb2KWpMrgeRGaRemTgmhjCgGIU2&currency=EUR",
      }}
    >
      <Container
        className="container page p-3"
        style={{ backgroundColor: "#f6f6f6", marginBottom: "222px" }}
      >
        <div className="row">
          <h3 className="m-1">Delivery Address</h3>
          {allAddresses.addresses?.map((address) => {
            return (
              <div
                // style={{
                //   border:
                //     address.id === id ? "1px solid green" : "1px solid black",
                // }}
                className="col-sm-4"
                key={address.id}
              >
                <div
                  className="w-100"
                  style={{
                    border:
                      address.id === id ? "1px solid green" : "1px solid black",
                    height: "200px",
                    padding: "10px",
                    display: "flex",
                    borderRadius: "10px",
                    margin: "5px",
                    flexDirection: "column",
                  }}
                >
                  <div className="card-body p-0">
                    <h5 className="card-title">{address.address}</h5>
                    <p className="card-text">{address.zipcode}</p>
                  </div>
                  {address.id !== id ? (
                    <Button
                      className=""
                      onClick={() => setId(address.id)}
                      style={{
                        background: "none",
                        color: "green",
                        borderColor: "green",
                      }}
                    >
                      Select
                    </Button>
                  ) : (
                    <div style={{ color: "green" }}>Address selected</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/profile" className="m-1">
          Add address
        </Link>
        <div className="col-md-5 mb-4">
          <div className="header py-3 p-2">
            <div onClick={() => setShow(true)} className="mt-2 ">
              Select Payment Method
            </div>
          </div>

          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          />
        </div>
      </Container>
    </PayPalScriptProvider>
  );
}
