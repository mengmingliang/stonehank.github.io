const href2Absolute=require('../../fetch-server/utils/href2Absolute')
const getAppropriateSummary=require('../../fetch-server/utils/getSummary')

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




describe('get correct summary',function () {

  test("get blockquote",function () {
    let content="# this is test\n" +
      "\n" +
      "> this is blockquote\n" +
      "> this is blockquote\n" +
      "\n" +
      "> this is blockquote2"

    let content1=`\n<blockquote>\n<p><code>shadow root</code></p>\n</blockquote>\n`

    expect(getAppropriateSummary(content,[0,100])).toEqual("<p>this is blockquote\n" +
      "this is blockquote</p>")
  })

  test("blockquote is too short,choose the second one",function () {

    let content="# this is h1\n" +
      "\n" +
      "> this is shrot blockquote\n" +
      "\n" +
      "> this is longggggggggggggggggggggggggggggggggggger blockquote2\n" +
      "\n" +
      "## this is h2\n" +
      "\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "\n" +
      "this paragraph this paragraph this paragraph"
    let content2=`<h3>custom elements</h3>\n<p>this is a longer test statement<code>custom elements</code></p>\n<blockquote>\n<p><code>shadow root</code></p>\n</blockquote>\n`

    expect(getAppropriateSummary(content,[50,100])).toEqual("<p>this is longggggggggggggggggggggggggggggggggggger blockquote2</p>")
  })

  test("blockquote's index is too behind to fail",function () {

    let content="# this is h1\n" +
      "\n" +
      "> this is shrot blockquote\n" +
      "\n" +
      "## this is h2\n" +
      "\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "this paragraph this paragraph this paragraph this paragraph this paragraph this paragraph\n" +
      "\n" +
      "`this is code`\n" +
      "\n" +
      "> this is longggggggggggggggggggggggggggggggggggger blockquote2"

    expect(getAppropriateSummary(content,[50,100])).toEqual("<h4>this is h1</h4>\n" +
      "<blockquote>\n" +
      "<p>this is shrot blockquote</p>\n" +
      "</blockquote>\n" +
      "<h4>this is h2</h4>\n" +
      "<ul>\n" +
      "<li>this is ol</li>\n" +
      "<li>this is ol</li>\n" +
      "<li>this is ol</li>\n" +
      "<li>th...</li>\n" +
      "</ul>")
  })

  test("no blockquote, change h1-h3 , remove hr",function () {

    let content="# this is h1\n" +
      "\n" +
      "## this is h2\n" +
      "\n" +
      "----------\n" +
      "\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "\n" +
      "---------\n" +
      "\n" +
      "this paragraph this paragraph\n" +
      "\n" +
      "`this is code`"

    expect(getAppropriateSummary(content,[0,100])).toEqual("<h4>this is h1</h4>\n" +
      "<h4>this is h2</h4>")
  })

  test("blockquote has h1 and hr",function () {

    let content="# this is h1\n" +
      "\n" +
      "----------\n" +
      "\n" +
      "> this is \n" +
      "> # blockquote\n" +
      "> ---\n" +
      "> blockquote has h1 and hr\n" +
      "\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "\n" +
      "---------\n" +
      "\n" +
      "this paragraph this paragraph\n" +
      "\n" +
      "`this is code`"

    expect(getAppropriateSummary(content,[0,100])).toEqual("<p>this is</p>\n" +
      "<h4>blockquote</h4>\n" +
      "<hr>\n" +
      "<p>blockquote has h1 and hr</p>")
  })

  test("blockquote has img should remain",function () {

    let content="# this is h1\n" +
      "\n" +
      "----------\n" +
      "\n" +
      "> here has img in blockquote\n" +
      "> ![](https://stonehank.github.io/avatar-logo.png)\n" +
      "\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "* this is ol\n" +
      "\n" +
      "---------\n" +
      "\n" +
      "this paragraph this paragraph\n" +
      "\n" +
      "`this is code`"

    expect(getAppropriateSummary(content,[0,100])).toEqual(`<p>here has img in blockquote
<img src=\"https://stonehank.github.io/avatar-logo.png\" alt=\"\"></p>`)
  })

})