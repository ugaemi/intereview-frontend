import {Button} from "baseui/button";
import "./SignIn.css";
import {useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import "./FindAccount.css";
import {useAccountAction} from "../../_actions/Account";
import Shortcut from "../../components/Shortcut";
import SendResetPassword from "../../components/accounts/SendResetPassword";


export default function FindPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accountAction = useAccountAction();

  function sendResetPasswordEmail() {
    if (!username) {
      setUsernameError("이름을 입력해주세요.");
      return false;
    } else {
      setUsernameError("");
    }
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return false;
    } else {
      setEmailError("");
    }
    setIsLoading(true);
    return accountAction.sendResetPasswordLink({
      "username": username,
      "email": email,
    }).then(res => {
      setSendEmail(true);
    }).catch(e => {
      if (e.response.status === 422) {
        setEmailError("유효하지 않은 이메일입니다.");
      }
    }).finally(e => {
      setIsLoading(false);
    });
  }

  if (sendEmail) {
    return <SendResetPassword username={username} email={email}/>
  } else {
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
              maxLength="20"
            />
          </FormControl>
          <FormControl label="이메일" error={emailError}>
            <Input
              id="email"
              value={email}
              onChange={event => setEmail(event.currentTarget.value)}
              placeholder="이메일을 입력해주세요."
              maxLength="30"
            />
          </FormControl>
        </form>
        <div className={"ButtonGroup"}>
          <Button onClick={event => sendResetPasswordEmail()} isLoading={isLoading}>비밀번호 재설정 링크 발송</Button>
        </div>
      </div>
    )
  }
}
