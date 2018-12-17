
// 路径对应的侧边栏的enum
/*
 例如
 路径：'/articles/xxx'
 对应的侧边栏：'home'

 路径：'/category/xxx'
 对应的侧边栏：'category'
*/
const pathEnum=["/home","/archive","/category","/about","/sourcecode","/myleetcode"]

const linkTo={
  category:`/category`,
  articles:`/articles`,
  home: "/home",
  archive:"/archive",
  sourcecode:'/sourcecode',
  myleetcode:'/myleetcode',
  about:"/about"
}

export  {linkTo,pathEnum}