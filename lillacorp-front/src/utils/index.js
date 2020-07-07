import axios from "axios";
// import { admin } from 'googleapis/build/src/apis/admin';
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const DEV_API = process.env.REACT_APP_DEV_API;

export const login = () => {
  const user = { user: { email: "admin@admin.com", password: "admin" } };
  axios
    .post(DEV_API + `/api/users/login`, user)
    .then((res) => {
      localStorage.setItem(TOKEN_KEY, res.data.user.token);
    })
    .catch((res) => {
      console.log("We couldnt retrieve your Article");
    });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }

  return false;
};
