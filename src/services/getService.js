import axios from "axios";

export const getService = () => {
  return axios.get(`${process.env.REACT_APP_API_PATH}/employee/list`);
};
