import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

// 抓取用户列表
export function fetch({ page }) {
  console.log('userServices fetch');
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

// 删除用户信息
export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  });
}

// 编辑用户信息
export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values)
  });
}

// 新增用户
export function create(values) {
  return request(`/api/users/`, {
    method: 'POST',
    body: JSON.stringify(values)
  });
}

