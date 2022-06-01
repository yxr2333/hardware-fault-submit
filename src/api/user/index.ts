import request from '../../utils/request';
import {UserLoginParam} from "./data";
export function doLogin(data: UserLoginParam) {
  return request('/user/login', {
    method: 'POST',
    data,
  });
}
export function checkLogin() {
  return request('/user/check/login', {
    method: 'GET',
  });
}