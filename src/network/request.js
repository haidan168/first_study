import axios from 'axios'

export function request(config) {
  // 1.创建 axios 的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    // baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios 拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use( config => {
    // config中的一些信息不符合服务器的要求
    // 发送网络请求时，显示请求图标
    // 某些网络请求必须携带特殊信息（登录-token）
    return config;
  }, err => {
    console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use( res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}