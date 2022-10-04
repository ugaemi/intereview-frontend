import * as React from "react";
import {AppNavBar, setItemActive} from "baseui/app-nav-bar";
import {useAuthAction} from "../_actions/Auth";
import {useRecoilValue} from "recoil";
import {authAtom} from "../_state/Auth";

export default function Header(props) {
  const authAction = useAuthAction();
  const auth = useRecoilValue(authAtom);
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
      return authAction.signOut();
    }
  }

  return <AppNavBar
    title="InteReview"
    mainItems={mainItems}
    onMainItemSelect={item => {
      setMainItems(prev => setItemActive(prev, item));
    }}
    username={auth.username}
    userItems={[
      { label: "로그아웃" },
    ]}
    onUserItemSelect={item => handlerUserItemSelect(item)}
  />
}
