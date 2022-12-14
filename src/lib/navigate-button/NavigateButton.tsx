import { useNavigate } from "react-router-dom";

const NavigateButton = (props: {
  children: string;
  path: string;
  isSmall?: boolean;
}) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(props.path);
  };

  const classNames = ["mx-auto"];
  if (props.isSmall) {
    classNames.push("btn-controls", "mt-10");
  } else {
    classNames.push("btn", "btn-grad");
  }

  return (
    <button className={classNames.join(" ")} onClick={onClickHandler}>
      {props.children}
    </button>
  );
};
export default NavigateButton;
