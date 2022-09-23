import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {Block} from "baseui/block";
import {useNavigate} from "react-router-dom";
import "./SignIn.css";
import Banner from "../../components/Banner";


export default function FindAccount() {
  const [css] = useStyletron();
  const navigate = useNavigate();

  function handlerFindUsername() {
    navigate("/accounts/find/username", {"replace": true});
  }

  return (
    <div className={"CenterForm"}>
      <Banner/>
      <div>
        <div>
          <Button className={css({
            width: "100%",
          })} onClick={event => handlerFindUsername()}>아이디 찾기</Button>
          <Block marginBottom="scale500"/>
          <Button className={css({
            width: "100%",
          })}>비밀번호 찾기</Button>
          <Block marginBottom="scale500"/>
        </div>
      </div>
    </div>
  );
}
