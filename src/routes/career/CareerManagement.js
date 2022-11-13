import React, {useState} from "react";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Mobile, PC} from "../../utils/MediaQuery";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Search} from "baseui/icon";
import {Modal, ModalBody, ModalHeader, ROLE, SIZE} from "baseui/modal";
import {Block} from "baseui/block";
import {Button} from "baseui/button";
import {useCareerAction} from "../../_actions/Career";
import {useStyletron} from "baseui";
import {ListItem, ListItemLabel} from "baseui/list";
import {Spinner} from "baseui/spinner";


export default function CareerManagement() {
  const [companyKeyword, setCompanyKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [companyList, setCompanyList] = useState();
  const [companyId, setCompanyId] = useState();
  const [companyName, setCompanyName] = useState("");
  const [css] = useStyletron();
  const careerAction = useCareerAction();

  function searchCompany() {
    setCompanyList(<Spinner className={css({marginLeft: "45%"})}/>);
    careerAction.searchCompany(companyKeyword, 1).then(res => {
      if (res.data) {
        setCompanyList(<ul
          id="companyList"
          className={css({
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >{res.data.map((company) =>
          <ListItem
            key={company["company_registration_number"]}
            endEnhancer={() => (
              <Button size="compact" kind="secondary" shape="pill"
                      onClick={event => setCompanyData(company["company_registration_number"], company["name"])}>선택</Button>
            )}
          >
            <ListItemLabel description={company["address"]}>{company["name"]}</ListItemLabel>
          </ListItem>
        )}</ul>);
      } else {
        setCompanyList(<h3 align={"center"}>검색 결과가 없어요 🥲</h3>);
      }
    });
  }

  function onKeyPressCompanyKeyword(event) {
    if (event.key === 'Enter') {
      return searchCompany();
    }
  }

  function setCompanyData(companyRegistrationNumber, companyName) {
    setCompanyName(companyName);
    setIsOpen(false);
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
            placeholder="회사명을 검색해주세요."
            value={companyKeyword}
            onChange={event => setCompanyKeyword(event.currentTarget.value)}
            onKeyPress={event => onKeyPressCompanyKeyword(event)}
          />
        </FormControl>
        {companyList}
      </ModalBody>
    </Modal>
    <h2>커리어 수정</h2>
    <PC>
      <FlexGrid flexGridColumnCount={2}>
        <FlexGridItem>
          <form onClick={event => setIsOpen(true)}>
            <FormControl label="회사명">
              <Input
                id="companyName"
                className="name"
                endEnhancer={<Search size="18px"/>}
                placeholder="회사명을 입력해주세요."
                readOnly
                value={companyName}
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
