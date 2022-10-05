import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {Block} from "baseui/block";
import {useState} from "react";
import {Link} from "react-router-dom";
import "./SignIn.css";
import {useRecoilState} from "recoil";
import {authAtom} from "../../_state/Auth";
import {useAuthAction} from "../../_actions/Auth";
import Shortcut from "../../components/Shortcut";
import {clearErrors, showErrors} from "../../utils/Errors";


export default function SignIn() {
  const [css] = useStyletron();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // eslint-disable-next-line
  const [auth, setAuth] = useRecoilState(authAtom);
  const authAction = useAuthAction();
  console.log(auth);

  const fieldErrors = {
    "username": setUsernameError,
    "password": setPasswordError,
  }

  function handlerSignIn() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    clearErrors(fieldErrors);
    return authAction.signIn(formData).catch(e => {
      showErrors(e.response.data.detail, fieldErrors);
    });
  }

  return (
    <div className={"CenterForm"}>
      <Shortcut/>
      <form>
        <FormControl label="아이디" error={usernameError}>
          <Input
            id="username"
            value={username}
            onChange={event => setUsername(event.currentTarget.value)}
            placeholder="아이디를 입력해주세요."
            maxLength="30"
          />
        </FormControl>
        <FormControl label="비밀번호" error={passwordError}>
          <Input
            id="password"
            value={password}
            onChange={event => setPassword(event.currentTarget.value)}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            maxLength="30"
          />
        </FormControl>
      </form>
      <Block marginBottom="scale800"/>
      <div className={"ButtonGroup"}>
        <Button onClick={event => handlerSignIn()}>들어가기</Button>
      </div>
      <Block marginBottom="scale1000"/>
      <div className={css({
        textAlign: "right",
      })}>
        <Link to={"/accounts/find"}>
          아이디/비밀번호가 생각이 안나요
        </Link>
      </div>
      <Block marginBottom="scale500"/>
      <div className={css({
        textAlign: "right",
      })}>
        <Link to={"/accounts/sign-up"}>
          인터리뷰가 처음이에요
        </Link>
      </div>
    </div>
  );
}
