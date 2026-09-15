const Checkbox = ({ text }: { text: string }) => {
  return (
    <div className="mb-4 mt-4 form-check">
      <input type="checkbox" className="form-check-input" id="checkBox1" />
      <label className="form-check-label fw-bold" htmlFor="checkBox1">
        {text}
      </label>
    </div>
  );
};

export default Checkbox;
