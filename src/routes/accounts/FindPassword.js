import {Button} from "baseui/button";
import "./SignIn.css";
import {useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import "./FindAccount.css";
import {useAccountAction} from "../../actions/Account";
import Shortcut from "../../components/Shortcut";
import SendResetPassword from "../../components/accounts/SendResetPassword";


export default function FindPassword() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accountAction = useAccountAction();

  function sendResetPasswordEmail() {
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return false;
    } else {
      setNameError("");
    }
    if (!username) {
      setUsernameError("아이디(이메일)를 입력해주세요.");
      return false;
    } else {
      setUsernameError("");
    }
    setIsLoading(true);
    return accountAction.sendResetPasswordLink({
      "name": name,
      "username": username,
    }).then(res => {
      setSendEmail(true);
    }).catch(e => {
      if (e.response.status === 422) {
        setUsernameError("유효하지 않은 아이디(이메일)입니다.");
      }
    }).finally(e => {
      setIsLoading(false);
    });
  }

  if (sendEmail) {
    return <SendResetPassword name={name} username={username}/>
  } else {
    return (
      <div className={"CenterForm"}>
        <Shortcut/>
        <form>
          <FormControl label="이름" error={nameError}>
            <Input
              id="name"
              value={name}
              onChange={event => setName(event.currentTarget.value)}
              placeholder="이름을 입력해주세요."
              maxLength="20"
            />
          </FormControl>
          <FormControl label="아이디(이메일)" error={usernameError}>
            <Input
              id="username"
              value={username}
              onChange={event => setUsername(event.currentTarget.value)}
              placeholder="아이디(이메일)를 입력해주세요."
              maxLength="20"
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
