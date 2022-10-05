import {Button} from "baseui/button";
import Shortcut from "../../components/Shortcut";
import {Banner, KIND} from "baseui/banner";
import {useEffect, useState} from "react";
import {Block} from "baseui/block";
import "../../components/accounts/Verification.css";
import {KIND as BUTTON_KIND} from "baseui/button";
import {useAccountAction} from "../../_actions/Account";

export default function SendResetPassword(props) {
  const [minutes, setMinutes] = useState(10);
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
    return accountAction.sendResetPasswordLink({
      "username": props.username,
      "email": props.email,
    }).then(res => {
      setMinutes(5);
      setSeconds(0);
    }).finally(e => {
      setIsLoading(false);
    });
  }

  return <div className={"CenterForm"}>
    <Shortcut/>
    <div className={"CodeBannerArea"}>
      <Banner
        title={props.email}
        kind={KIND.positive}
      >
        비밀번호 재설정 링크가 발송되었어요. <br/><br/> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Banner>
    </div>
    <Block marginBottom="scale500"/>
    <div className={"ButtonGroup"}>
      <Button kind={BUTTON_KIND.secondary} onClick={event => sendEmailVerificationCode(props)} isLoading={isLoading}>링크 다시 보내기</Button>
    </div>
  </div>
}
