import moment from "moment";
import { Card, Container, NavbarBrand } from "react-bootstrap";
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
          className="row mt-5 "
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <small className="text-muted mb-2">
            Order Number 00{e.id}2583 | {moment(e.createdAt).format("LL")}
          </small>
          {e.products.map((item) => (
            <Card className="card d-flex mb-3">
              <div className="row no-gutters" style={{ display: "flex" }}>
                <div className="col-md-4">
                  <img
                    src={item.images[0].image_url}
                    className="card-img"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Eyewear {item.name}</h5>

                    <div className="text-muted mb-2">
                      Quantity: {item.orderProduct.quantity}
                    </div>
                    <p className="card-text">
                      <small className="text-success">{e.status}</small>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </Container>
  );
}
