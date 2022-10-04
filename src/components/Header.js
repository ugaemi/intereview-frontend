import * as React from "react";
import {AppNavBar, setItemActive} from "baseui/app-nav-bar";
import {useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [mainItems, setMainItems] = React.useState([
    {
      active: true,
      label: "둘러보기",
      children: [
        { label: "인터뷰 후기", active: true },
      ]
    },
    {
      label: "내 인터뷰",
      children: [
        { label: "다가오는 일정" },
        { label: "인터뷰 관리" },
        { label: "이력 관리" },
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
      { label: "로그아웃" },
    ]}
    onUserItemSelect={item => handlerUserItemSelect(item)}
  />
}
