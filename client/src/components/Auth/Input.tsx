type InputProps = {
  label: string;
  type: string;
  ph: string;
};

const Input = ({ label, type, ph }: InputProps) => {
  return (
    <div className="input mt-4">
      <label
        htmlFor="inputEmail1"
        className="form-label fw-bold text-capitalize"
      >
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id="inputEmail1"
        aria-describedby="emailHelp"
        placeholder={ph}
      />
    </div>
  );
};

export default Input;
