import {Button} from "baseui/button";
import Shortcut from "../Shortcut";
import {Banner, KIND} from "baseui/banner";
import {PinCode} from "baseui/pin-code";
import {useEffect, useState} from "react";
import {Block} from "baseui/block";
import "./Verification.css";
import {KIND as BUTTON_KIND} from "baseui/button";
import {useAccountAction} from "../../_actions/Account";
import ShowEmail from "./ShowEmail";

export default function VerificationEmail(props) {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [valueError, setValueError] = useState(false);
  const [username, setUsername] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const accountAction = useAccountAction();

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  function sendEmailVerificationCode() {
    setIsLoading(true);
    return accountAction.findUsername({
      "platform": "email",
      "name": props.name,
      "platform_data": props.email,
    }).then(res => {
      setMinutes(5);
      setSeconds(0);
      setValues(["", "", "", "", "", ""]);
      setValueError(false);
    }).finally(e => {
      setIsLoading(false);
    });
  }

  function verificationCode() {
    return accountAction.verificationCodeForUsername({
      "platform": "email",
      "platform_data": props.email,
      "code": values.join(""),
    }).then(res => {
      setUsername(res.data["username"]);
    }).catch(e => {
      if (e.response.status === 400) {
        setValueError(true);
      }
    })
  }

  if (username) {
    return <ShowEmail username={username}/>
  } else {
    return <div className={"CenterForm"}>
      <Shortcut/>
      <div className={"CodeBannerArea"}>
        <Banner
          title={props.email}
          kind={KIND.positive}
        >
          인증코드가 발송되었습니다. <br/><br/> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Banner>
      </div>
      <PinCode
        values={values}
        onChange={({ values }) => setValues(values)}
        clearOnEscape
        className={"Code"}
        error={valueError}
      />
      <Block marginBottom="scale500"/>
      <div className={"ButtonGroup"}>
        <Button onClick={event => verificationCode(props)}>인증코드 입력</Button>
        <Block marginBottom="scale500"/>
        <Button kind={BUTTON_KIND.secondary} onClick={event => sendEmailVerificationCode(props)} isLoading={isLoading}>인증코드 재발송</Button>
      </div>
    </div>
  }
}
