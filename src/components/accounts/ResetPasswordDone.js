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
        π λΉλ°λ²νΈ μ¬μ€μ μ μ±κ³΅νμ΄μ π <br/>
      </Banner>
    </div>
    <Block marginBottom="scale500"/>
    <div className={css({
      textAlign: "right",
    })}>
      <Link to={"/accounts/sign-in"}>
        λ€μ΄κ°κΈ°
      </Link>
    </div>
  </div>
}
