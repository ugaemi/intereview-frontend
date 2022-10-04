import * as React from "react";
import {AppNavBar, setItemActive} from "baseui/app-nav-bar";
import {Delete, Overflow, Upload} from "baseui/icon";
import {useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [mainItems, setMainItems] = React.useState([
    {
      active: true,
      label: "내 인터뷰",
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: "다가오는 일정", active: true },
        { icon: Upload, label: "인터뷰 관리" }
      ]
    },
  ]);

  const handlerUserItemSelect = async (item) => {
    if (item.label === "로그아웃") {
      localStorage.removeItem("user");
      navigate("/accounts/sign-in", {replace: true});
    }
  }

  return <AppNavBar
    title="InteReview"
    mainItems={mainItems}
    onMainItemSelect={item => {
      setMainItems(prev => setItemActive(prev, item));
    }}
    username="Ugaemi"
    userItems={[
      { icon: Overflow, label: "로그아웃" },
    ]}
    onUserItemSelect={item => handlerUserItemSelect(item)}
  />
}
