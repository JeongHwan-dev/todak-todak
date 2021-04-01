import axios from "axios";

export function loginUser(dataTosubmit) {
  const request = axios.post("/api/user/login", loginInfo).then((response) => {
    response.data;
  });

  return {
    type: "LOGIN_USER",
    payload: request,
  };
}
