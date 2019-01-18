import axios from 'axios';
import NProgress from 'nprogress';

const http = axios.create();

http.interceptors.request.use(config => {
  NProgress.start();

  // Add bearer token if found
  let token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export default http;
