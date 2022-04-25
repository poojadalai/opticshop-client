import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { Nav } from "react-bootstrap";

export default function LoggedOut() {
  return (
    <>
      <Nav.Link href="/login" className="nav-icons" style={{ color: "white" }}>
        <BsPersonFill />
      </Nav.Link>
    
    </>
  );
}
