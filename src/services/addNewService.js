import axios from "axios";

export const addNewService = (data)=>{
    return axios.post(`${process.env.REACT_APP_API_PATH}/employees`, { ...data })
}