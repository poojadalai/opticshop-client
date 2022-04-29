import React from "react";
import { Container } from "react-bootstrap";
import HeroBanner from "../../components/HeroBanner";

export default function Aboutus() {
  return (
    <div>
      <HeroBanner url="https://cdn.shopify.com/s/files/1/0266/9379/6048/files/d261945023c11200421ce5c3a5082aff_1_1920x.progressive.jpg?v=1615298262" />

      <Container className="p-5">
        <div
          className="w-80 p-4 m-auto"
          // style={{ position: "absolute", backgroundColor: "blue", top: "35%" }}
        >
          <h1 className="p-3">
            <strong>ABOUT US</strong>
          </h1>
          <p className="p-3">
            For us, the customer is central. We are happy to take the time for
            your wishes and questions. You will certainly encounter
            craftsmanship, quality and passion for glasses at Koopman Optics. In
            addition, we never stand still, we keep looking for that one
            beautiful personal pair of glasses, made for you with passion and
            love. This way we ensure that we always have the glasses that suit
            you best. Our varied sunglasses with different brands come from all
            over the world. Have you taken a look at our webshop? Can't quite
            find what you're looking for? Click here to contact us. You are also
            always very welcome in our store. Koopman optics is located at
            Kaasmarkt 1 in Purmerend!
          </p>
        </div>
      </Container>
    </div>
  );
}
