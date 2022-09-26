import axios from "axios";

export const deleteService = (data) => {
  return axios.delete(`${process.env.REACT_APP_API_PATH}/employee/delete/${data.id}`);
};
