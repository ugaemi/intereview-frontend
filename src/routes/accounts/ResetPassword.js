import {Button} from "baseui/button";
import "./SignIn.css";
import {useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import "./FindAccount.css";
import {useAccountAction} from "../../actions/Account";
import Shortcut from "../../components/Shortcut";
import {useSearchParams} from "react-router-dom";
import ResetPasswordDone from "../../components/accounts/ResetPasswordDone";


export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const accountAction = useAccountAction();
  const username = searchParams.get("username");
  const code = searchParams.get("code");

  function resetPassword() {
    if (!password) {
      setPasswordError("새로운 비밀번호를 입력해주세요.");
      return false;
    } else {
      setPasswordError("");
    }
    if (!password2) {
      setPassword2Error("새로운 비밀번호를 한번 더 입력해주세요.");
      return false;
    } else {
      setPassword2Error("");
    }
    return accountAction.resetPassword({
      "username": username,
      "code": code,
      "password": password,
      "password2": password2,
    }).then(res => {
      setIsReset(true);
    }).catch(e => {
      if (e.response.status === 400 || e.response.status === 422) {
        setPassword2Error(e.response.data.detail);
      }
    });
  }

  if (isReset) {
    return <ResetPasswordDone username={username}/>
  } else {
    return (
      <div className={"CenterForm"}>
        <Shortcut/>
        <form>
          <FormControl label="새로운 비밀번호" error={passwordError}>
            <Input
              id="password"
              value={password}
              onChange={event => setPassword(event.currentTarget.value)}
              placeholder="새로운 비밀번호를 입력해주세요."
              maxLength="30"
              type="password"
            />
          </FormControl>
          <FormControl label="새로운 비밀번호 확인" error={password2Error}>
            <Input
              id="password2"
              value={password2}
              onChange={event => setPassword2(event.currentTarget.value)}
              placeholder="새로운 비밀번호를 한번 더 입력해주세요."
              maxLength="30"
              type="password"
            />
          </FormControl>
        </form>
        <div className={"ButtonGroup"}>
          <Button onClick={event => resetPassword()}>비밀번호 업데이트</Button>
        </div>
      </div>
    )
  }
}
