import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Button} from "baseui/button";
import {Block} from "baseui/block";
import {useState} from "react";
import "./SignUp.css";
import Shortcut from "../../components/Shortcut";
import {COUNTRIES, PhoneInput} from "baseui/phone-input";
import {useAccountAction} from "../../_actions/Account";
import {clearErrors, showErrors} from "../../utils/Errors";
import {Banner, KIND} from "baseui/banner";
import {Link} from "react-router-dom";
import {useStyletron} from "baseui";


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
  const [isSignUp, setIsSignUp] = useState(false);
  const accountAction = useAccountAction();

  const fieldErrors = {
    "name": setNameError,
    "email": setEmailError,
    "phone": setPhoneError,
    "username": setUsernameError,
    "password": setPasswordError,
  }

  function handlerSignUp() {
    clearErrors(fieldErrors);
    return accountAction.signUp({
      "name": name,
      "email": email,
      "phone": country.dialCode + phone,
      "username": username,
      "password": password,
    }).then(res => {
      setIsSignUp(true);
    }).catch(e => {
      showErrors(e.response.data.detail, fieldErrors);
    })
  }

  if (isSignUp) {
    return <div className={"CenterForm"}>
      <Shortcut/>
      <div className={"CodeBannerArea"}>
        <Banner
          title={name + "님"}
          kind={KIND.positive}
        >
          🎉 인터리뷰에 오신 것을 환영합니다 🎉 <br/>
        </Banner>
      </div>
      <Block marginBottom="scale500"/>
      <div className={css({
        textAlign: "right",
      })}>
        <Link to={"/accounts/sign-in"}>
          로그인하러가기
        </Link>
      </div>
    </div>
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
              id="phone"
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
          <Button onClick={event => handlerSignUp(event)}>회원가입</Button>
        </div>
      </div>
    );
  }
}
