import React from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {KIND} from "baseui/app-nav-bar/constants";
import {Block} from "baseui/block";
import {StyledLink} from "baseui/link";


export default function Login() {
  const [css] = useStyletron();
  const [usernameValue, setUsernameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
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
            value={usernameValue}
            onChange={event => setUsernameValue(event.currentTarget.value)}
            placeholder="아이디를 입력해주세요."
          />
        </FormControl>
        <FormControl label="Password">
          <Input
            id="password"
            value={passwordValue}
            onChange={event => setPasswordValue(event.currentTarget.value)}
            type="password"
            placeholder="비밀번호를 입력해주세요."
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
          })}>로그인</Button>
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
