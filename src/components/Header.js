import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import {Button, KIND} from "baseui/button";

export default function Header() {
  const handlerSignOut = async () => {
    localStorage.removeItem("user");
  }

  return <HeaderNavigation>
    <StyledNavigationList $align={ALIGN.left}>
      <StyledNavigationItem>InteReview</StyledNavigationItem>
    </StyledNavigationList>
    <StyledNavigationList $align={ALIGN.center} />
    <StyledNavigationList $align={ALIGN.right}>
      <StyledNavigationItem>
        <a href="/mypage"><Button kind={KIND.tertiary}>마이페이지</Button></a>
      </StyledNavigationItem>
      <StyledNavigationItem>
        <a href="/accounts/sign-in" onClick={event => handlerSignOut()}><Button kind={KIND.tertiary}>로그아웃</Button></a>
      </StyledNavigationItem>
    </StyledNavigationList>
  </HeaderNavigation>;
}
