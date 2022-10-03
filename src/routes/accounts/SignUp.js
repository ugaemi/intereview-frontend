import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {Block} from "baseui/block";
import {useState} from "react";
import "./SignUp.css";
import {useAuthAction} from "../../_actions/Auth";
import Shortcut from "../../components/Shortcut";
import {COUNTRIES, PhoneInput} from "baseui/phone-input";


export default function SignUp() {
  const [css] = useStyletron();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(COUNTRIES.KR);
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // eslint-disable-next-line
  const authAction = useAuthAction();

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
            maxLength="12"
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
        <FormControl label="휴대폰 번호" error={phoneError}>
          <PhoneInput
            country={country}
            onCountryChange={({option}) => setCountry(option)}
            text={phone}
            onTextChange={e => setPhone(e.currentTarget.value)}
            error={phoneError}
          />
        </FormControl>
        <FormControl label="아이디" error={usernameError}>
          <Input
            id="username"
            value={username}
            onChange={event => setUsername(event.currentTarget.value)}
            placeholder="아이디를 입력해주세요."
            maxLength="20"
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
        <Button>회원가입</Button>
      </div>
    </div>
  );
}
