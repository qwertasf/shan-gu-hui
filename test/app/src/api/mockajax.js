//对于axios二次封装
import axios from "axios"

//利用axios对象的方法create去创建一个axios实例
const requests = axios.create({
    baseURL:"/mock",
    timeout:5000
});

//请求拦截器，在发送请求之气那，请求拦截器可以检测到，做一些事情
requests.interceptors.request.use((config)=>{
  return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
  return res.data;
},(error)=>{
  return Promise.reject(new Error('faile'));
});

export default requests;