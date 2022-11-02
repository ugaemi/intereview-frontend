import * as React from "react";
import {AppNavBar, setItemActive} from "baseui/app-nav-bar";
import {useAuthAction} from "../_actions/Auth";
import {useNavigate} from "react-router-dom";

export default function Header(props) {
  const authAction = useAuthAction();
  const navigate = useNavigate();
  const [mainItems, setMainItems] = React.useState([
    {
      active: true,
      label: "둘러보기",
      children: [
        { label: "인터뷰 후기", active: true, to: "/" },
      ]
    },
    {
      label: "인터뷰",
      children: [
        { label: "다가오는 일정" },
        { label: "인터뷰 관리" },
        { label: "커리어 관리" },
      ]
    },
    {
      label: "설정",
      children: [
        { label: "프로필", to: "/settings/profile" },
        { label: "계정", to: "/settings/account" },
      ]
    },
  ]);

  const handlerUserItemSelect = async (item) => {
    if (item.label === "나가기") {
      return authAction.signOut();
    }
  }

  const handlerMainItemSelect = async (item) => {
    item = item.children ? item.children[0] : item;
    setMainItems(prev => setItemActive(prev, item));
    navigate(item.to, {replace: true});
  }

  return <AppNavBar
    title="InteReview"
    mainItems={mainItems}
    onMainItemSelect={item => handlerMainItemSelect(item)}
    username={props.auth.username}
    userItems={[
      { label: "나가기" },
    ]}
    onUserItemSelect={item => handlerUserItemSelect(item)}
  />
}
