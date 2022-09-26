import axios from "axios";

export const updateService = (data) => {
  return axios.put(`${process.env.REACT_APP_API_PATH}/employee/${data.id}`, {
    ...data,
  });
};
