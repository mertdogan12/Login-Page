import { useHistory } from "react-router-dom";

type MyProps = {
  className: string;
};
function Back(props: MyProps) {
  let history = useHistory();

  return (
    <button className={props.className} onClick={() => history.goBack()}>
      Back
    </button>
  );
}

export default Back;
