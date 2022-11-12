import React, {useState} from "react";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Mobile, PC} from "../../utils/MediaQuery";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Search} from "baseui/icon";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader, ROLE, SIZE} from "baseui/modal";
import {Block} from "baseui/block";
import {KIND} from "baseui/button";


export default function CareerManagement() {
  const [companyKeyword, setCompanyKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function searchCompany(event) {

  }

  function changeCompanyName(event) {
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
      <ModalHeader>회사명을 검색해주세요.</ModalHeader>
      <ModalBody>
        <Block marginBottom="scale200"/>
        <FormControl>
          <Input
            id="companyKeyword"
            endEnhancer={<Search size="18px" />}
            placeholder="회사명을 검색해주세요."
            value={companyKeyword}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={KIND.tertiary} onClick={event => setIsOpen(false)}>취소</ModalButton>
        <ModalButton onClick={event => changeCompanyName(event)}>확인</ModalButton>
      </ModalFooter>
    </Modal>
    <h2>커리어 수정</h2>
    <PC>
      <FlexGrid flexGridColumnCount={2}>
        <FlexGridItem>
          <form>
            <FormControl label="회사명">
              <Input
                className="name"
                endEnhancer={<Search size="18px" />}
                placeholder="회사명을 입력해주세요."
                readOnly
                onFocus={event => setIsOpen(true)}
              />
            </FormControl>
          </form>
        </FlexGridItem>
      </FlexGrid>
    </PC>
    <Mobile>
      <FlexGrid flexGridColumnCount={1}>
        <FlexGridItem>
        </FlexGridItem>
      </FlexGrid>
    </Mobile>
  </div>
}
