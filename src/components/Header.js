import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import {Button, KIND} from "baseui/button";
import {useCookies} from "react-cookie";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const handlerSignOut = async () => {
    removeCookie("token");
  }

  return <HeaderNavigation>
    <StyledNavigationList $align={ALIGN.left}>
      <StyledNavigationItem>InteReview</StyledNavigationItem>
    </StyledNavigationList>
    <StyledNavigationList $align={ALIGN.center} />
    <StyledNavigationList $align={ALIGN.right}>
      <StyledNavigationItem>
        <a href="/sign-in" onClick={event => handlerSignOut()}><Button kind={KIND.tertiary}>로그아웃</Button></a>
      </StyledNavigationItem>
    </StyledNavigationList>
  </HeaderNavigation>;
}
