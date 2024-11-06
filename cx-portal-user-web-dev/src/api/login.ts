
export function loginApi(params: {info1: string}) {
  return request({
    method: 'post',
    url:'/login',
    params
  })
}
export function getSessionApi() {
  return request({
    method: 'get',
    url:'/session'
  })
}