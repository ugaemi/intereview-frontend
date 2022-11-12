import {Button} from "baseui/button";
import "./SignIn.css";
import {useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import "./FindAccount.css";
import {COUNTRIES, PhoneInput} from "baseui/phone-input";
import {useAccountAction} from "../../_actions/Account";
import Shortcut from "../../components/Shortcut";
import VerificationPhone from "../../components/accounts/VerificationForPhone";


export default function FindUsername() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(COUNTRIES.KR);
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [sendPhoneCode, setSendPhoneCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const accountAction = useAccountAction();

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
      "name": name,
      "phone": country.dialCode + phone,
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

  if (sendPhoneCode) {
    return <VerificationPhone phone={country.dialCode + phone} name={name}/>
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
        <div className={"ButtonGroup"}>
          <Button onClick={event => sendPhoneVerificationCode()} isLoading={isLoading}>인증코드 발송하기</Button>
        </div>
      </div>
    )
  }
}
