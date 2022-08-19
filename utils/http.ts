import axios from "axios";
import { getToken } from "./get-token";

const contentType = "application/json";

export const post = (url: string, values?: unknown) => {
  return axios.post(url, values, {
    headers: {
      "content-type": contentType,
      Authorization: `${getToken()}`,
    },
  });
};

export const get = (url: string) => {
  return axios.get(url, {
    headers: {
      "content-type": contentType,
      Authorization: `${getToken()}`,
    },
  });
};

export const patch = (url: string, values?: unknown) => {
  return axios.patch(url, values, {
    headers: {
      "content-type": contentType,
      Authorization: `${getToken()}`,
    },
  });
};

export const deleteHttp = (url: string) => {
  return axios.delete(url, {
    headers: {
      "content-type": contentType,
      Authorization: `${getToken()}`,
    },
  });
};
