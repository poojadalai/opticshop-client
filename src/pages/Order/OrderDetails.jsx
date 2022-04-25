import moment from "moment";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectOrder } from "../../store/user/selectors";

export default function OrderDetails() {
  const data = useSelector(selectOrder);

  console.log(data);
  //    if (!order) return "Loading";
  // if (!data) return <p>sahkafeg</p>;
  return (
    // <div>
    //   OrderDetails
    //   {data.address}
    //   {data?.orders?.map((e) => (
    //     <div>
    //       {e.address}
    //       {e.status}
    //       {e.products?.map((e) => e.name)}
    //     </div>
    //   ))}
    // </div>

    <Container className="p-sm-5">
      <h3 className="text-muted m-2">Your Order History</h3>
      {data?.orders?.map((e) => (
        <div>
          <small className="text-muted mb-2">
            Order Number 00{e.id}2583 |{" "}
            {moment(e.createdAt).format("LL")}
          </small>
          {e.products.map((item) => (
            <Card className="mb-sm-4 col-8">
              <Card.Body className="container row">
                <div className="col-md-3">
                  <Card.Img
                    // style={{ width: "100px" }}
                    className=""
                    src={item.images[0].image_url}
                  ></Card.Img>
                </div>
                <div className="col-md-8">
                  <small className="text-muted mb-2"></small>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                    <div className="text-muted mb-2">
                      Quantity: {item.orderProduct.quantity}
                    </div>
                  </Card.Text>

                  <p className="text-success"> {e.status}</p>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ))}
    </Container>
  );
}
