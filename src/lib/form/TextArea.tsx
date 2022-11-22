const TextArea = (props: { label: string; name: string; value: string }) => {
  return (
    <div className="mt-10 d-flex">
      <div className="d-flex w-100">
        <label htmlFor={props.name} className="mr-10 label-style">
          {props.name}
        </label>
      </div>
      <textarea
        className="w-300 style-input"
        name={props.name}
        defaultValue={props.value}
      ></textarea>
    </div>
  );
};
export default TextArea;
