import "./styles.css";

const HeroBanner = (props) => {
  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${props.url})` }}
    >
      {props.name}
    </div>
  );
};

export default HeroBanner;
