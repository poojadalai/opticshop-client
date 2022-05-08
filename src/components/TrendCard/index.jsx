import React from "react";
import { Container } from "react-bootstrap";
import "./style.css";

export default function TrendCard() {
  return (
    <Container className="p-5" style={{ marginBottom: "222px" }}>
      <h1 className="text-muted"> New Trends</h1>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-2 mb-lg-0">
          <img
            src="https://cdn.shopify.com/s/files/1/0266/9379/6048/articles/264f82611587888f4edf2034e252931e_1_1200x.progressive.jpg?v=1615279565"
            className="w-100 shadow-1-strong rounded mb-2 card"
            alt="Boat on Calm Water"
          />

          <img
            src="//cdn.shopify.com/s/files/1/0266/9379/6048/articles/c3caaa80346c80a0d34d58ae5370d954_2_1200x.progressive.jpg?v=1615286581"
            className="w-100 shadow-1-strong rounded mb-2 card"
            alt="Wintry Mountain Landscape"
          />
        </div>

        <div className="col-lg-4 mb-2 mb-lg-0">
          <img
            src="//cdn.shopify.com/s/files/1/0266/9379/6048/articles/11f14c832ee61699fb54f7728d6dfbc9_6_1200x.progressive.jpg?v=1615276985"
            className="w-100 shadow-1-strong rounded mb-2 card"
            alt="Mountains in the Clouds"
          />

          <img
            src="//cdn.shopify.com/s/files/1/0266/9379/6048/articles/65425746331cc9d748b021744aec22ae_2_1200x.progressive.jpg?v=1615286491"
            className="w-100 shadow-1-strong rounded mb-2 card"
            alt="Boat on Calm Water"
          />
        </div>

        <div className="col-lg-4 mb-2 mb-lg-0">
          <img
            src="https://cdn.shopify.com/s/files/1/0266/9379/6048/articles/8a1eaa96d360ccc0b9bd8646f94b5c99_5_1_1200x.progressive.jpg?v=1615281500"
            className="w-100 shadow-1-strong rounded mb-2 card"
            alt="Waves at Sea"
          />

          <img
            src="https://cdn.shopify.com/s/files/1/0266/9379/6048/articles/ed8817aba808654b282fa98b6f89bcad_1_1200x.progressive.jpg?v=1615287468"
            className="w-100 shadow-1-strong rounded mb-2 card"
            alt="Yosemite National Park"
          />
        </div>
      </div>
    </Container>
  );
}
