import moment from "moment";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectOrder } from "../../store/user/selectors";
import "./styles.css";
export default function OrderDetails() {
  const data = useSelector(selectOrder);
  console.log(data);

  if (!data) return <p>No orders found</p>;
  return (
    <Container>
      <h3 className="text-center text-muted mt-4 p-2">My orders</h3>
      {/* <input
        type="text"
        className="form-control p-4 icon"
        placeholder="Search"
      /> */}

      {/* {data?.orders?.map((e) => ( */}
      {data?.orders?.map((e) => (
        <div
          className="row mt-5"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <small className="text-muted mb-2">
            Order Number 00{e.id}2583 | {moment(e.createdAt).format("LL")}
          </small>
          {e.products.map((item) => (
            <div class="card mb-3">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img
                    src={item.images[0].image_url}
                    class="card-img"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Eyewear {item.name}</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="text-muted mb-2">
                      Quantity: {item.orderProduct.quantity}
                    </div>
                    <p class="card-text">
                      <small class="text-success">{e.status}</small>
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
