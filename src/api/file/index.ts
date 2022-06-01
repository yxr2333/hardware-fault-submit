import request from "../../utils/request";
export function uploadImg(data: FormData) {
  return request('/file/upload/img', {
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    data
  });
}