type OutilsProps = {
  text: string;
  icon: string;
  alt: string;
};

const Outils = ({ text, icon, alt }: OutilsProps) => {
  return (
    <div className="outil me-4">
      <span className="btn w-100  fw-bold d-flex align-items-center ">
        <div className="icon me-3">
          <img src={icon} alt={alt} className="img-fluid" />
        </div>
        {text}
      </span>
    </div>
  );
};

export default Outils;
