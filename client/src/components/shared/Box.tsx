import "./_box.scss";

interface BoxProps {
  logo: string;
  size: string;
  text: string;
  alt?: string;
}

const Box = ({ logo, size, text, alt = "" }: BoxProps) => (
  <div className="box">
    <div
      // `size` still picks the tile shape; the values now map to module classes.
      className={`box__icon ${size === "50%" ? "box__icon--round" : ""}`}
    >
      <img className="box__image" src={logo} alt={alt || text} />
    </div>
    <h2 className="box__label">{text}</h2>
  </div>
);

export default Box;
