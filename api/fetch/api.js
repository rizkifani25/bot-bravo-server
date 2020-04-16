const axios = require("axios");
const handleError = require("./handleError/handleError");

// const URI = "http://192.168.1.7:5000";

const getHeaders = () => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
};

// HTTP GET Request - Returns Resolved or Rejected Promise
const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        url,
        {
          params: params
        },
        getHeaders()
      )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
};

// HTTP PATCH Request - Returns Resolved or Rejected Promise
const patch = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, params, getHeaders())
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
};
// HTTP POST Request - Returns Resolved or Rejected Promise
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, getHeaders())
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
};
// HTTP DELETE Request - Returns Resolved or Rejected Promise
const del = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, getHeaders())
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error));
      });
  });
};

module.exports = {
  getRequest: get,
  patchRequest: patch,
  postRequest: post,
  delRequest: del
};
