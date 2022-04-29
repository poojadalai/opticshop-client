import moment from "moment";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectOrder } from "../../store/user/selectors";
import "./styles.css";
export default function OrderDetails() {
  const data = useSelector(selectOrder);

  // const sortedOrders = data.sort((a, b) => b.createdAt - a.createdAt);

  if (!data)
    return (
      <Container className="p-5">
        <h1>No orders found</h1>
      </Container>
    );

  return (
    <Container>
      <h3 className="text-center text-muted mt-4 p-2">My orders</h3>

      {data?.orders?.map((e) => (
        <div
          className="row mt-5"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <small className="text-muted mb-2">
            Order Number 00{e.id}2583 | {moment(e.createdAt).format("LL")}
          </small>
          {e.products.map((item) => (
            <div calssName="card mb-3">
              <div calssName="row no-gutters">
                <div calssName="col-md-4">
                  <img
                    src={item.images[0].image_url}
                    calssName="card-img"
                    alt="..."
                  />
                </div>
                <div calssName="col-md-8">
                  <div calssName="card-body">
                    <h5 calssName="card-title">Eyewear {item.name}</h5>
                    <p calssName="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="text-muted mb-2">
                      Quantity: {item.orderProduct.quantity}
                    </div>
                    <p calssName="card-text">
                      <small calssName="text-success">{e.status}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
}
