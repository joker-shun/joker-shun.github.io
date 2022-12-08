import axios from "axios";

// 创建axios实例。统一配置
const service = axios.create({
  baseURL: "https://cnodejs.org/api/v1", // api的base_url
  // timeout: 5000 // 请求超时时间
  // .... 其他信息
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    //  ... 获取token，存储token 等操作
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    // ....
    return response.data;
  },
  (error) => {
    // ....
    return Promise.reject(error);
  }
);

export default service;
