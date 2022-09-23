import {useStyletron} from "baseui";
import {Button} from "baseui/button";
import {Block} from "baseui/block";
import "./SignIn.css";
import Banner from "../../components/Banner";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import "./FindAccount.css";
import {COUNTRIES, PhoneInput} from "baseui/phone-input";


export default function FindUsername() {
  const [css] = useStyletron();
  const [activeKey, setActiveKey] = useState("0");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(COUNTRIES.KR);
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
  }

  function sendPhoneVerificationCode() {

  }

  return (
    <div className={"CenterForm"}>
      <Banner/>
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
            <FormControl label="휴대폰 번호" error={emailError}>
              <PhoneInput
                country={country}
                onCountryChange={({ option }) => setCountry(option)}
                text={phone}
                onTextChange={e => setPhone(e.currentTarget.value)}
              />
            </FormControl>
          </form>
        </Tab>
      </Tabs>
      <Button className={css({
        width: "100%",
      })} onClick={event => activeKey === "0" ? sendEmailVerificationCode() : sendPhoneVerificationCode()}>
        인증코드 발송</Button>
      <Block marginBottom="scale500"/>
    </div>
  );
}
