import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export function login(req, res) {
  axios
    .post(`${API_URL}`, req)
    .then((response) => {
      res(response, false);
    })
    .catch((error) => {
      res(error, true);
    });
}

export function signup(signupObj, callback) {
  axios
    .post(`${API_URL}/cadastro`, signupObj)
    .then((response) => {
      callback(response, false);
    })
    .catch((error) => {
      callback(error, true);
    });
}

export function getTransactions(token, callback) {
  axios
    .get(`${API_URL}/home`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      callback(response.data, false);
    })
    .catch((error) => {
      callback(error, true);
    });
}

export function newTransaction(token, callback, type, transactionObj) {
  axios
    .post(
      `${API_URL}/nova-transacao/${type}`,
      transactionObj,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      callback(response.data, false);
    })
    .catch((error) => {
      callback(error, true);
    });
}
