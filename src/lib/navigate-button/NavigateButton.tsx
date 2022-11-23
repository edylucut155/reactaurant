import { useNavigate } from "react-router-dom";

const NavigateButton = (props: { children: string; path: string }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(props.path);
  };

  return (
    <button className="btn btn-grad" onClick={onClickHandler}>
      {props.children}
    </button>
  );
};
export default NavigateButton;
