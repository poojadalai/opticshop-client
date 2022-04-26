import React, { useRef, useEffect } from "react";

export default function PaypalButton(props) {
  const paypal = useRef();

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
                  value: 0.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          alert(
            "You have successfully created subscription " + data.subscriptionID
          );
          // props.submit();
          // const order = await actions.order.capture();
          // console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
