import axios from "axios";

const DEV_API = process.env.REACT_APP_DEV_API;

class AuthService {
  config = {
    headers: {
      Authorization: `Token ${
        this.getCurrentUser() ? this.getCurrentUser().accessToken : ""
      }`,
      user: this.getCurrentUser() ? this.getCurrentUser().username : "guest",
    },
  };

  login(username, password) {
    return axios
      .post(DEV_API + "/api/users/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(DEV_API + "/api/users/signup", {
      username,
      email,
      password,
    });
  }

  changeData(user, password) {
    return axios.post(
      DEV_API + "/api/users/changeData",
      {
        user,
        password,
      },
      this.config
    );
  }

  getCurrentUser() {
    console.log(
      JSON.parse(localStorage.getItem("user")) || { username: "guest" }
    );
    return JSON.parse(localStorage.getItem("user")) || { username: "guest" };
  }
}

export default new AuthService();
