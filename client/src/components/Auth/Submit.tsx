const Submit = ({ text }: { text: string }) => {
  return (
    <button type="submit" className="btn w-100 submit fw-bold text-capitalize">
      {text}
    </button>
  );
};

export default Submit;
