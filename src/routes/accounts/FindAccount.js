import {Button} from "baseui/button";
import {Block} from "baseui/block";
import {useNavigate} from "react-router-dom";
import "./SignIn.css";
import Shortcut from "../../components/Shortcut";


export default function FindAccount() {
  const navigate = useNavigate();

  function handlerFindUsername() {
    navigate("/accounts/find/username", {"replace": true});
  }

  return (
    <div className={"CenterForm"}>
      <Shortcut/>
      <div>
        <div className={"ButtonGroup"}>
          <Button onClick={event => handlerFindUsername()}>아이디 찾기</Button>
          <Block marginBottom="scale500"/>
          <Button>비밀번호 찾기</Button>
          <Block marginBottom="scale500"/>
        </div>
      </div>
    </div>
  );
}
