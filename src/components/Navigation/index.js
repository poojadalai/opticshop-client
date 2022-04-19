import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { BsCartFill } from "react-icons/bs";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import "./styles.css";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    // <Navbar bg="light" expand="lg">
    //   <Navbar.Brand as={NavLink} to="/">
    //     YOUR PROJECT NAME
    //   </Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav style={{ width: "100%" }} fill>
    //       <NavbarItem path="/" linkText="Home" />
    //       <NavbarItem path="/other" linkText="Other" />
    //       {loginLogoutControls}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
    <Navbar bg="dark" expand="lg" variant="dark" md={8}>
      <Container fluid className="nav-text">
        <Navbar.Brand className="logo" href="/">
          The Optic Shop
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
            <NavbarItem path="/brands" linkText="BRANDS" />
            <NavbarItem path="/aboutus" linkText="ABOUTUS" />
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">SEARCH</Button>
          </Form>
          {loginLogoutControls}
          <Nav.Link
            href="/cart"
            className="nav-icons"
            style={{ color: "white", padding: "0px" }}
          >
            <BsCartFill />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
