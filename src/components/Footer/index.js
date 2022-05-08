import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4">
    <Container className="fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">Know Us</h5>
          <p>
            For us, the customer is central. We are happy to take the time for
            your wishes and questions. You will certainly encounter
            craftsmanship, quality and passion for glasses at The Optics Shop.
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Social Media</h5>
          <ul className="list-unstyled">
            <li>
              <a href="https://www.facebook.com/">
                <FiFacebook />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com/">
                {" "}
                <FiInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com/">
                <FiTwitter /> Twitter
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/">
                <FiYoutube /> Youtube
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Popular Brands</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">Gucci</a>
            </li>
            <li>
              <a href="#!">Dita</a>
            </li>
            <li>
              <a href="#!">Tom Ford</a>
            </li>
            <li>
              <a href="#!">Ray Ban</a>
            </li>
          </ul>
        </div>
      </div>
    </Container>

    <div className="footer-copyright text-center py-3">
      © 2022 Copyright:
      <a href="http://localhost:3000/"> theopticshop.com</a>
    </div>
  </footer>
);

export default Footer;
