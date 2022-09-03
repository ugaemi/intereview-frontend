import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import {Button} from "baseui/button";

class Header extends React.Component {
  render() {
    return <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>InteReview</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <a href="/sign-in"><Button>로그인</Button></a>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>;
  }
}

export default Header;
