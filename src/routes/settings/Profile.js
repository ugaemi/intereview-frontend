import React, {useEffect, useState} from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {useProfileAction} from "../../_actions/Profile";


export default function Profile() {
  const [name, setName] = useState("");
  const profileAction = useProfileAction();

  useEffect(() => {
    profileAction.fetchBaseData().then(res => {
      setName(res.data["name"]);
    });
  })

  return <div>
    <h2>내 정보</h2>
    <form>
      <FormControl label="이름">
        <Input
          id="name"
          value={name}
          readOnly
        />
      </FormControl>
    </form>
  </div>
}
