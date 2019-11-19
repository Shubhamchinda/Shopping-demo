import axios from "axios";

import { apiUrl } from "./settings";

export const API_URL = apiUrl;

let authAxios = axios.create({
  baseURL: apiUrl
});

// let getToken = () => {
//   return {
//     headers: { Authorization: "Bearer " + localStorage.getItem("token") }
//   };
// };

class Request {
  error = err => {
    try {
      if (err.response.status === 401) {
        localStorage.clear();
      }
    } catch (e) {}
  };

  login(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/login", data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          this.error(err);
        });
    });
  }

  signUp(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/", data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          this.error(err);
        });
    });
  }

  getUser(data) {
    return new Promise((next, error) => {
      authAxios
        .get(`/user/${data}`, data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          this.error(err);
        });
    });
  }
  addOrder(_id, data) {
    return new Promise((next, error) => {
      authAxios
        .post(`/user/${_id}`, data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          this.error(err);
        });
    });
  }
  updateOrder(data) {
    return new Promise((next, error) => {
      authAxios
        .put(`/user/edit`, data)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          this.error(err);
        });
    });
  }
  deleteOrder(data) {
    return new Promise((next, error) => {
      authAxios
        .delete(`/user/${data}`)
        .then(d => {
          next(d.data);
        })
        .catch(err => {
          next({ error: true, err });
          this.error(err);
        });
    });
  }
}
export default new Request();
