export function getMenuListApi() {
  return request({
    method: 'get',
    url:'/menus'
  })
}