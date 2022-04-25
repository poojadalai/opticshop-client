import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Item
        className="row"
        style={{ padding: ".5rem 1rem", color: "white" }}
      >
        <NavDropdown
          className="col p-0 m-0"
          title={user.email}
          style={{ color: "#ffff" }}
        >
          <NavDropdown.Item
            className=""
            href="/"
            onClick={() => dispatch(logOut())}
          >
            LogOut
          </NavDropdown.Item>
          <NavDropdown.Item href="/products">Your Profile</NavDropdown.Item>
          <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
        </NavDropdown>
      </Nav.Item>

      {/* <Button className="btn my-2 my-sm-0" onClick={() => dispatch(logOut())}>
        Logout
      </Button> */}
    </>
  );
}
