import {Button} from "baseui/button";
import "./SignIn.css";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import "./FindAccount.css";
import {COUNTRIES, PhoneInput} from "baseui/phone-input";
import {useAccountAction} from "../../_actions/Account";
import VerificationEmail from "../../components/accounts/VerificationForEmail";
import Shortcut from "../../components/Shortcut";
import VerificationPhone from "../../components/accounts/VerificationForPhone";


export default function FindUsername() {
  const [activeKey, setActiveKey] = useState("0");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(COUNTRIES.KR);
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sendEmailCode, setSendEmailCode] = useState(false);
  const [sendPhoneCode, setSendPhoneCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accountAction = useAccountAction();

  function sendEmailVerificationCode() {
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return false;
    } else {
      setNameError("");
    }
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return false;
    } else {
      setEmailError("");
    }
    setIsLoading(true);
    return accountAction.findUsername({
      "platform": "email",
      "name": name,
      "platform_data": email,
    }).then(res => {
      setSendEmailCode(true);
    }).catch(e => {
      if (e.response.status === 404) {
        setEmailError(e.response.data.detail);
      }
    }).finally(e => {
      setIsLoading(false);
    });
  }

  function sendPhoneVerificationCode() {
    if (!name) {
      setNameError("이름을 입력해주세요.");
      return false;
    } else {
      setNameError("");
    }
    if (!phone) {
      setPhoneError("휴대폰 번호를 입력해주세요.");
      return false;
    } else {
      setPhoneError("");
    }
    setIsLoading(true);
    return accountAction.findUsername({
      "platform": "phone",
      "name": name,
      "platform_data": country.dialCode + phone,
    }).then(res => {
      setSendPhoneCode(true);
    }).catch(e => {
      if (e.response.status === 400) {
        setPhoneError(e.response.data.detail);
      }
      if (e.response.status === 404) {
        setPhoneError(e.response.data.detail);
      }
    }).finally(e => {
      setIsLoading(false);
    });
  }

  if (sendEmailCode) {
    return <VerificationEmail email={email} name={name}/>
  } else if (sendPhoneCode) {
    return <VerificationPhone phone={country.dialCode + phone} name={name}/>
  } else {
    return (
      <div className={"CenterForm"}>
        <Shortcut/>
        <Tabs
          activeKey={activeKey}
          onChange={({activeKey}) => {
            setActiveKey(activeKey);
          }}
          fill={FILL.fixed}
          activateOnFocus
        >
          <Tab title="이메일 인증으로 찾기">
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
          </Tab>
          <Tab title="휴대폰 인증으로 찾기">
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
              <FormControl label="휴대폰 번호" error={phoneError}>
                <PhoneInput
                  country={country}
                  onCountryChange={({option}) => setCountry(option)}
                  text={phone}
                  onTextChange={e => setPhone(e.currentTarget.value)}
                  error={phoneError}
                />
              </FormControl>
            </form>
          </Tab>
        </Tabs>
        <div className={"ButtonGroup"}>
          <Button onClick={event => activeKey === "0" ? sendEmailVerificationCode() : sendPhoneVerificationCode()}
                  isLoading={isLoading}>
            인증코드 발송하기</Button>
        </div>
      </div>
    )
  }
}
