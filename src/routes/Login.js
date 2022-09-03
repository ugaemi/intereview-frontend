import React from "react";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";


export default function Login() {
  const [value, setValue] = React.useState('');
  return (
    <FormControl label="Username">
      <Input
        id="username"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </FormControl>
  );
}
