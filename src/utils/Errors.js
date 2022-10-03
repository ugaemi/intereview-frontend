export const clearErrors = (fieldErrors) => {
  for (const [key, value] of Object.entries(fieldErrors)) {
    value("");
  }
}

export const showErrors = (data, fieldErrors) => {
  data.forEach((detail) => {
    let msg = detail.msg;
    if (detail.type === "value_error.any_str.min_length") {
      msg = "최소 " + detail.ctx.limit_value + "자 이상으로 구성해주세요.";
    }
    else if (detail.type === "value_error.email") {
      msg = "잘못된 이메일 형식입니다.";
    }
    fieldErrors[detail.loc[1]](msg);
  });
}
