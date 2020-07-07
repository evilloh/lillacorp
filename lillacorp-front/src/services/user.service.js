import axios from "axios";
import authHeader from "./auth-header";

const DEV_API = process.env.REACT_APP_DEV_API;

class UserService {
  getPublicContent() {
    return axios.get(DEV_API + "/api/test/all");
  }

  getUserBoard() {
    return axios.get(DEV_API + "/api/test/user", { headers: authHeader() });
  }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

export default new UserService();
