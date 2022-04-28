import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { BsCartFill } from "react-icons/bs";
import { Container } from "react-bootstrap";
import "./styles.css";
import { selectCart } from "../../store/product/selectors";

export default function Navigation() {
  const token = useSelector(selectToken);
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;
  const cart = useSelector(selectCart);

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  var retrievedObject = localStorage.getItem("cart");
  const varrr = JSON.parse(retrievedObject);
  Object.size(varrr);

  return (
    <Navbar bg="dark" expand="lg" variant="dark" md={8}>
      <Container className="">
        <Navbar.Brand className="" href="/">
          TheOpticShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            fill
          >
            <NavbarItem path="/" linkText="HOME" />
            <NavbarItem path="/trends" linkText="TRENDS" />
            <NavbarItem path="/aboutus" linkText="ABOUT US" />
          </Nav>
          {loginLogoutControls}
          <Nav.Link
            href="/cart"
            className="nav-icons text-center"
            style={{ color: "white", padding: "0px" }}
          >
            <div>
              {/* <span className="cartNum"></span> */}
              <i class="fa badge fa-lg" value={cart.length}>
                <BsCartFill />
              </i>
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
