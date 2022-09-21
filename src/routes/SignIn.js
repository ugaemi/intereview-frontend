import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {KIND} from "baseui/app-nav-bar/constants";
import {Block} from "baseui/block";
import {StyledLink} from "baseui/link";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import "./SignIn.css";
import {useRecoilState} from "recoil";
import {authAtom} from "../_state/Auth";
import {useAuthAction} from "../_actions/Auth";
import {useCookies} from "react-cookie";
import axios from "axios";


export default function SignIn() {
  const [css] = useStyletron();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const [auth, setAuth] = useRecoilState(authAtom);
  const authAction = useAuthAction();

  function handlerSignIn() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return authAction.signIn(formData).catch(e => {
      console.log(e);
      removeCookie("token");
      axios.defaults.headers.common["Authorization"] = null;
      setAuth(null);
      if (e.response.status === 401) {
        setUsernameError(e.response.data.detail);
        setPasswordError(e.response.data.detail);
      }
    });
  }

  if (auth) {
    return <Navigate replace to={"/"}/>
  } else {
    return (
      <div id="Login-form">
        <div>
          <h1>InteReview</h1>
        </div>
        <div>
          <form>
            <FormControl label="Username" error={usernameError}>
              <Input
                id="username"
                value={username}
                onChange={event => setUsername(event.currentTarget.value)}
                placeholder="아이디를 입력해주세요."
                maxLength="30"
              />
            </FormControl>
            <FormControl label="Password" error={passwordError}>
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
          <div className={css({
            textAlign: "right",
          })}>
            <StyledLink href="https://baseweb.design">
              비밀번호를 잊어버리셨나요?
            </StyledLink>
          </div>
          <Block marginBottom="scale500"/>
          <div>
            <Button className={css({
              width: "100%",
            })} onClick={event => handlerSignIn()}>로그인</Button>
            <Block marginBottom="scale500"/>
            <Button className={css({
              width: "100%",
            })} kind={KIND.secondary}>회원가입</Button>
            <Block marginBottom="scale500"/>
          </div>
        </div>
      </div>
    );
  }
}
