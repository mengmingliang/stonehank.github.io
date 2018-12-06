
// 路径对应的侧边栏的enum
/*
 例如
 路径：'/articles/xxx'
 对应的侧边栏：'home'

 路径：'/category/xxx'
 对应的侧边栏：'category'
*/
const pathEnum=["/home","/archive","/category","/about","/sourceCode"]

const linkTo={
  category:`/category`,
  articles:`/articles`,
  home: "/home",
  archive:"/archive",
  sourceCode:'/sourceCode',
  about:"/about"
}

export  {linkTo,pathEnum}