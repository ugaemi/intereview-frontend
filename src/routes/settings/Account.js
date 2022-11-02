import React, {useEffect, useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {useRecoilValue} from "recoil";
import {authAtom} from "../../_state/Auth";
import {useAccountAction} from "../../_actions/Account";
import {Block} from "baseui/block";
import {Button, KIND} from "baseui/button";
import {KIND as BUTTON_KIND} from "baseui/button/constants";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE, SIZE} from "baseui/modal";
import {Mobile, PC} from "../../utils/MediaQuery";


export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const accountAction = useAccountAction();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    accountAction.fetchBaseData().then(res => {
      setJoinedDate(res.data["joined_date"]);
    });
  })

  function handlerWithdraw(event) {
    return accountAction.withdraw();
  }

  return <div>
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>인터리뷰를 정말 떠날건가요?</ModalHeader>
      <ModalBody>
        탈퇴 처리된 계정은 복구할 수 없으니 신중히 선택해주세요.
        <Block marginBottom="scale200"/>
        <FormControl>
          <Input
            id="username"
            value={username}
            onChange={event => setUsername(event.currentTarget.value)}
            placeholder={auth.username}
            maxLength="30"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={event => setIsOpen(false)}>떠나지 않을래요</ModalButton>
        <ModalButton onClick={event => handlerWithdraw(event)}>다음에 다시 만나요</ModalButton>
      </ModalFooter>
    </Modal>
    <h2>내 계정</h2>
    <PC>
      <FlexGrid flexGridColumnCount={2}>
        <FlexGridItem>
          <form>
            <FormControl label="아이디">
              <Input
                id="username"
                value={auth.username}
                readOnly
              />
            </FormControl>
            <FormControl label="가입일시">
              <Input
                id="joinedDate"
                value={joinedDate}
                readOnly
              />
            </FormControl>
          </form>
          <Block marginBottom="scale1000"/>
          <Button kind={BUTTON_KIND.tertiary} onClick={event => setIsOpen(true)}>인터리뷰 떠나기</Button>
        </FlexGridItem>
      </FlexGrid>
    </PC>
    <Mobile>
      <FlexGrid flexGridColumnCount={1}>
        <FlexGridItem>
          <form>
            <FormControl label="아이디">
              <Input
                id="username"
                value={auth.username}
                readOnly
              />
            </FormControl>
            <FormControl label="가입일시">
              <Input
                id="joinedDate"
                value={joinedDate}
                readOnly
              />
            </FormControl>
          </form>
        </FlexGridItem>
      </FlexGrid>
    </Mobile>
  </div>
}
