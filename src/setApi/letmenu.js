import axios from './allAxios'
// 左侧菜单动态生成
export const getmenus=()=>{
  return  axios({
       url:'menus'
    })
}