import axios from "axios";

// todo - error handling for network APIs

export const getSessionToken = async () => {
  const url = "https://api.themoviedb.org/3/authentication/token/new?api_key=d7e8086aebd8c4229f62b61de17ad1c8";
  const res = await axios.get(url);
  const req_token = await res.data.request_token;
  // console.log("res", res);
  return req_token;
};

export const validateLogin = async (token: string) => {
  const loginResponse = await axios({
    method: "post",
    url: "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=d7e8086aebd8c4229f62b61de17ad1c8",
    data: {
      username: "mt01",
      password: "@z5AdxRYMvuyuW.",
      request_token: token,
    },
  });

  // console.log("loginResponse", loginResponse.data);
  const loginSuccess = loginResponse.data;

  if (loginSuccess.success == true) {
    return loginSuccess.request_token;
  } else {
    return {
      error: {
        errorMessage: "Validation unsuccessful !",
      },
    };
  }
};

export const createSessionId = async (request_token: string) => {
  const sessionId = await axios({
    method: "post",
    url: "https://api.themoviedb.org/3/authentication/session/new?api_key=d7e8086aebd8c4229f62b61de17ad1c8",
    data: {
      request_token: request_token,
    },
  });
  // console.log("sessionId", sessionId.data);

  if (sessionId.data.success === false) {
    return {
      error: {
        errorMessage: "Failed in creating session token",
      },
    };
  } else {
    return sessionId.data.session_id;
  }
};

export const getAccountId = async (sessionId?: string | any) => {
  const url = `https://api.themoviedb.org/3/account?api_key=d7e8086aebd8c4229f62b61de17ad1c8&session_id=${sessionId}`;
  const accountResponse = await axios.get(url);
  const account_id = await accountResponse.data.id;

  // console.log("getAccountId", accountResponse.data);
  // const accountId = accountResponse.data.id;

  return account_id;
};
