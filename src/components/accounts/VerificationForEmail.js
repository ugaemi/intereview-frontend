import {Button} from "baseui/button";
import Shortcut from "../Shortcut";
import {Banner, KIND} from "baseui/banner";
import {PinCode} from "baseui/pin-code";
import {useState} from "react";
import {Block} from "baseui/block";
import "./Verification.css";

export default function VerificationEmail(props) {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  return <div className={"CenterForm"}>
    <Shortcut/>
    <div className={"CodeBannerArea"}>
      <Banner
        title={props.email}
        kind={KIND.positive}
      >
        인증코드가 발송되었습니다. <br/><br/> 05:00
      </Banner>
    </div>
    <PinCode
      values={values}
      onChange={({values}) => setValues(values)}
      clearOnEscape
      className={"Code"}
    />
    <Block marginBottom="scale500"/>
    <div className={"ButtonGroup"}>
      <Button>인증코드 재발송</Button>
    </div>
  </div>
}
