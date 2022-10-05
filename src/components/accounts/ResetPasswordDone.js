import Shortcut from "../../components/Shortcut";
import {Banner, KIND} from "baseui/banner";
import {Block} from "baseui/block";
import "../../components/accounts/Verification.css";
import {Link} from "react-router-dom";
import {useStyletron} from "baseui";

export default function ResetPasswordDone(props) {
  const [css] = useStyletron();

  return <div className={"CenterForm"}>
    <Shortcut/>
    <div className={"CodeBannerArea"}>
      <Banner
        title={props.username}
        kind={KIND.positive}
      >
        🎉 비밀번호 재설정에 성공했어요 🎉 <br/>
      </Banner>
    </div>
    <Block marginBottom="scale500"/>
    <div className={css({
      textAlign: "right",
    })}>
      <Link to={"/accounts/sign-in"}>
        들어가기
      </Link>
    </div>
  </div>
}
