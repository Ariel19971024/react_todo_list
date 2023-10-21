import axios from 'axios'
const service = axios.create({
    baseURL: process.env.REACT_APP_URL,  
})
const addConfigBeforeRequest = (config) => config
service.interceptors.request.use(
    addConfigBeforeRequest,
    err=>{
        alert("Error");
        return err;
    }
)
service.interceptors.response.use(
    res=>{
        return res;
    },
    err=>{
        return err ;
    }
)
export default service