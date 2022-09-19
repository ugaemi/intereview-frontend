import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {KIND} from "baseui/app-nav-bar/constants";
import {Block} from "baseui/block";
import {StyledLink} from "baseui/link";
import axios from "axios";
import {useState} from "react";
import {getCookie, setCookie} from "../utils/Cookies";
import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";


export default function SignIn() {
  const [css] = useStyletron();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handlerSignIn = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      axios.post(
        "/api/v1/users/token",
        formData,
      )
        .then(res => {
          setCookie("token", res.data["token"], {sameSite: "none", secure: true});
          axios.defaults.headers.common["Authorization"] = `Bearer ` + cookies.token;
          setIsLogin(true);
        })
        .catch(e => {
          console.log(e);
          removeCookie("token");
        });
    } catch (e) {
      console.log(e);
      removeCookie("token");
    }
  }

  if (isLogin) {
    return <Navigate replace to={"/"}/>
  } else {
    return (
      <div className={css({
        width: "500px",
        margin: "0 auto",
        height: "100%",
      })}>
        <div className={css({
          textAlign: "center",
        })}>
          <h1>InteReview</h1>
        </div>
        <div>
          <FormControl label="Username">
            <Input
              id="username"
              value={username}
              onChange={event => setUsername(event.currentTarget.value)}
              placeholder="아이디를 입력해주세요."
              maxLength="30"
            />
          </FormControl>
          <FormControl label="Password">
            <Input
              id="password"
              value={password}
              onChange={event => setPassword(event.currentTarget.value)}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              maxLength="30"
            />
          </FormControl>
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
