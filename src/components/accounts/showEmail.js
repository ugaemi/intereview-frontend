import Shortcut from "../Shortcut";
import {Banner, KIND} from "baseui/banner";
import {Block} from "baseui/block";
import "./Verification.css";
import {Link} from "react-router-dom";
import {useStyletron} from "baseui";

export default function ShowEmail(props) {
  const [css] = useStyletron();

  return <div className={"CenterForm"}>
    <Shortcut/>
    <div className={"CodeBannerArea"}>
      <Banner
        title={props.username}
        kind={KIND.positive}
      >
        🎉 아이디 찾기에 성공했습니다 🎉 <br/>
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
}
