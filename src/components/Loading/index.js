import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { FaHourglass } from "react-icons/fa";
import "./spinner.css";

export default function Loading() {
  return (
    <div className="loading_spinner">
      <Spinner animation="border" role="status">
        <span className="sr-only"><FaHourglass></FaHourglass></span>
      </Spinner>
    </div>
  );
}
