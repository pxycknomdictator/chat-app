export const Submit = ({ text }: { text: string }) => {
  return (
    <button
      className="btn btn-block bg-blue-500 hover:bg-blue-600"
      type={"submit"}
    >
      {text}
    </button>
  );
};
