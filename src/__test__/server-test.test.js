const href2Absolute=require('../../fetch-blog-server/utils/href2Absolute')

test("将相对路径（任意）转换为绝对路径",function () {

  let s1=`![](./abc.png)`
  let s2=`![](../abc.png)`
  let s3=`![](./../abc.png)`
  let s4=`![](../../abc.png)`
  let s5=`![](././abc.png)`
  let s6=`![]( ././../abc.png)`
  let s7=`![](   ././abc.png)`
  let s8=`[]( .././abc.png)`


  let absHref='https://stonehank.github.io/articles/img/'
  let result=`![](https://stonehank.github.io/articles/img/abc.png)`
  let result2=`[](https://stonehank.github.io/articles/img/abc.png)`
  expect(href2Absolute(s1,absHref)).toBe(result)
  expect(href2Absolute(s2,absHref)).toBe(result)
  expect(href2Absolute(s3,absHref)).toBe(result)
  expect(href2Absolute(s4,absHref)).toBe(result)
  expect(href2Absolute(s5,absHref)).toBe(result)
  expect(href2Absolute(s6,absHref)).toBe(result)
  expect(href2Absolute(s7,absHref)).toBe(result)
  expect(href2Absolute(s8,absHref)).toBe(result2)
})


test("将相对路径（IMG）转换为绝对路径",function () {

  let s1=`![](./img/abc.png)`
  let s2=`![](../asset/img/abc.png)`
  let s3=`![](./../content/img/abc.png)`
  let s4=`![](../../img/abc.png)`
  let s5=`![](././anyWhere/img/abc.png)`
  let s6=`![]( ././../img/abc.png)`
  let s7=`![](   ././img/abc.png)`
  let s8=`![](../../img/abc.png)`

  let absHref='https://stonehank.github.io/articles/img/'
  let result=`![](https://stonehank.github.io/articles/img/abc.png)`
  expect(href2Absolute(s1,absHref,true)).toBe(result)
  expect(href2Absolute(s2,absHref,true)).toBe(result)
  expect(href2Absolute(s3,absHref,true)).toBe(result)
  expect(href2Absolute(s4,absHref,true)).toBe(result)
  expect(href2Absolute(s5,absHref,true)).toBe(result)
  expect(href2Absolute(s6,absHref,true)).toBe(result)
  expect(href2Absolute(s7,absHref,true)).toBe(result)
  expect(href2Absolute(s8,absHref,true)).toBe(result)
})
