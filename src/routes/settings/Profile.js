import React, {useEffect, useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useProfileAction} from "../../actions/Profile";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";


export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const profileAction = useProfileAction();

  useEffect(() => {
    profileAction.fetchBaseData().then(res => {
      setName(res.data["name"]);
      setEmail(res.data["email"]);
      setPhone(res.data["phone"]);
    });
  })

  return <div>
    <h2>내 정보</h2>
    <FlexGrid flexGridColumnCount={2}>
      <FlexGridItem>
        <form>
          <FormControl label="이름">
            <Input
              id="name"
              value={name}
              readOnly
            />
          </FormControl>
          <FormControl label="이메일">
            <Input
              id="email"
              value={email}
              readOnly
            />
          </FormControl>
          <FormControl label="휴대폰 번호">
            <Input
              id="phone"
              value={phone}
              readOnly
            />
          </FormControl>
        </form>
      </FlexGridItem>
    </FlexGrid>
  </div>
}
