import {objSortBy, objGroupBy, refactor, deepEqual,withOutImgHTML,inHTMLTag,isMatchPrecision,getCookie,querySearch,searchPrecision} from "../index"

test("sort by factorArr",function () {
  let obj={
  o1:{a:1,b:2,c:3},
  o2:{a:2,b:2,c:5},
  o3:{a:4,b:5,c:1},
  o4:{a:2,b:3,c:6},
  o5:{a:3,b:5,c:4},
  o6:{a:4,b:5,c:2},
  o7:{a:undefined,b:null,c:null},
  o8:{a:undefined,b:1,c:null},
  o9:{a:undefined,b:null,c:3},
  o10:{a:0,b:0,c:1},
  o11:{a:0,b:1,c:3},
  o12:{a:1,b:0,c:5},
  }
  expect(objSortBy(obj,['a','b','c'],false)).toEqual(
    [
      {"a": 4, "b": 5, "c": 2},
      {"a": 4, "b": 5, "c": 1},
      {"a": 3, "b": 5, "c": 4},
      {"a": 2, "b": 3, "c": 6},
      {"a": 2, "b": 2, "c": 5},
      {"a": 1, "b": 2, "c": 3},
      {a:1,b:0,c:5},
      {a:0,b:1,c:3},
      {a:0,b:0,c:1},
      {a:undefined,b:1,c:null},
      {a:undefined,b:null,c:3},
      {a:undefined,b:null,c:null},
    ]
  )
})

test("sort by number(String type)",function () {
  let obj={
    o1:{a:'1',b:'2',c:'3'},
    o2:{a:'2',b:'2',c:'5'},
    o3:{a:'4',b:'5',c:'1'},
    o4:{a:'2',b:'3',c:'6'},
    o5:{a:'3',b:'5',c:'4'},
    o6:{a:'4',b:'5',c:'2'},
    o7:{a:undefined,b:null,c:null},
    o8:{a:undefined,b:'1',c:null},
    o9:{a:undefined,b:null,c:'3'},
    o10:{a:'0',b:'0',c:'1'},
    o11:{a:'0',b:'1',c:'3'},
    o12:{a:'1',b:'0',c:'5'},
  }
  expect(objSortBy(obj,['a','b','c'],false)).toEqual(
    [
      {"a": "4", "b": "5", "c": "2"},
      {"a": "4", "b": "5", "c": "1"},
      {"a": "3", "b": "5", "c": "4"},
      {"a": "2", "b": "3", "c": "6"},
      {"a": "2", "b": "2", "c": "5"},
      {"a": "1", "b": "2", "c": "3"},
      {"a": "1", "b": "0", "c": "5"},
      {"a": "0", "b": "1", "c": "3"}, {
      "a": "0", "b": "0", "c": "1"},
      {"a": undefined, "b": "1", "c": null},
      {"a": undefined, "b": null, "c": "3"},
      {"a": undefined, "b": null, "c": null}
      ]
  )
})


test("sort by factorArr(String)",function () {
  let obj={
    o1:{a:"abc",b:2,c:3},
    o2:{a:"abca",b:2,c:5},
    o3:{a:"baca",b:5,c:1},
    o4:{a:"aaaa",b:"bbbbb",c:6},
    o5:{a:"aaaa",b:"bbbba",c:4},
    o6:{a:"azaaaaaa",b:5,c:2}
  }
  expect(objSortBy(obj,['a','b','c'],false)).toEqual(
    [
      {"a": "baca", "b": 5, "c": 1},
      {"a": "azaaaaaa", "b": 5, "c": 2},
      {"a": "abca", "b": 2, "c": 5},
      {"a": "abc", "b": 2, "c": 3},
      {"a": "aaaa", "b": "bbbbb", "c": 6},
      {"a": "aaaa", "b": "bbbba", "c": 4}
      ]
  )
})

test("sort by factorArr(String)2",function () {
  let obj={
    o1:{a:"abc",b:2,c:3},
    o2:{a:"abca",b:2,c:5},
    o3:{a:"baca",b:5,c:1},
    o4:{a:"aaaa",b:"bbbbb",c:6},
    o5:{a:"aaaa",b:"bbbba",c:4},
    o6:{a:"azaaaaaa",b:5,c:2}
  }
  expect(objSortBy(obj,['b','c'],false)).toEqual(
    [
      {"a": "aaaa", "b": "bbbbb", "c": 6},
      {"a": "aaaa", "b": "bbbba", "c": 4},
      {"a": "azaaaaaa", "b": 5, "c": 2},
      {"a": "baca", "b": 5, "c": 1},
      {"a": "abca", "b": 2, "c": 5},
      {"a": "abc", "b": 2, "c": 3}
      ]
  )
})

test("sort by factorArr(Array)",function () {
  let obj={
    o1:{a:[3,2,'c'],b:2,c:3},
    o2:{a:2,b:2,c:5},
    o3:{a:[3,2,'a'],b:5,c:1},
    o4:{a:[2,1,6],b:3,c:6},
    o5:{a:[12,2,9],b:5,c:4},
    o6:{a:[3,6,'z'],b:5,c:2},
    o7:{a:[3,6,'w'],b:4,c:2},
  }
  expect(objSortBy(obj,['a','b','c'],false)).toEqual(
    [
      {"a": [12, 2, 9], "b": 5, "c": 4},
      {"a": [3, 6, 'z'], "b": 5, "c": 2},
      {"a": [3, 6, 'w'], "b": 4, "c": 2},
      {"a": [3, 2, 'c'], "b": 2, "c": 3},
      {"a": [3, 2, 'a'], "b": 5, "c": 1},
      {"a": [2, 1, 6], "b": 3, "c": 6},
      {"a": 2, "b": 2, "c": 5}
      ]
  )
})


test("sort by factorArr(nestArray)",function () {
  let obj={
    o1:{a:[3,2,[12,6]],b:2,c:3},
    o2:{a:2,b:2,c:5},
    o3:{a:[3,2,[3,5]],b:5,c:1},
    o4:{a:[2,1,[6,5]],b:3,c:6},
    o5:{a:[3,6,[1,115]],b:5,c:4},
    o6:{a:[3,6,[5,99]],b:5,c:2},
    o7:{a:[3,6,[5,99]],b:4,c:2},
  }
  expect(objSortBy(obj,['a','b','c'],false)).toEqual(
    [
      {"a": [3, 6, [5, 99]], "b": 5, "c": 2},
      {"a": [3, 6, [5, 99]], "b": 4, "c": 2},
      {"a": [3, 6, [1, 115]], "b": 5, "c": 4},
      {"a": [3, 2, [12, 6]], "b": 2, "c": 3},
      {"a": [3, 2, [3, 5]], "b": 5, "c": 1},
      {"a": [2, 1, [6, 5]], "b": 3, "c": 6},
      {"a": 2, "b": 2, "c": 5}
      ]
  )
})


test("sort by factorArr(nestArray) DEC",function () {
  let obj={
    o1:{a:[3,2,[12,6]],b:2,c:3},
    o2:{a:2,b:2,c:5},
    o3:{a:[3,2,[3,5]],b:5,c:1},
    o4:{a:[2,1,[6,5]],b:3,c:6},
    o5:{a:[3,6,[1,115]],b:5,c:4},
    o6:{a:[3,6,[5,99]],b:5,c:2},
    o7:{a:[3,6,[5,99]],b:4,c:2},
  }
  expect(objSortBy(obj,['a','b','c'],true)).toEqual(
    [
      {"a": 2, "b": 2, "c": 5},
      {"a": [2, 1, [6, 5]], "b": 3, "c": 6},
      {"a": [3, 2, [3, 5]], "b": 5, "c": 1},
      {"a": [3, 2, [12, 6]], "b": 2, "c": 3},
      {"a": [3, 6, [1, 115]], "b": 5, "c": 4},
      {"a": [3, 6, [5, 99]], "b": 4, "c": 2},
      {"a": [3, 6, [5, 99]], "b": 5, "c": 2}
      ]
  )
})

/*-----objGroupBy--------*/

test("group by key",function () {
  let obj={
    o1:{a:[3,2,[12,6]],b:2,c:3},
    o2:{a:2,b:2,c:5},
    o3:{a:[3,2,[3,5]],b:5,c:1},
    o4:{a:[2,1,[6,5]],b:3,c:6},
    o5:{a:[3,6,[1,115]],b:5,c:4},
    o6:{a:[3,6,[5,99]],b:5,c:2},
    o7:{a:[3,6,[5,99]],b:4,c:2},
  }
  expect(objGroupBy(obj,"b")).toEqual(
    {
      "2": [{"a": [3, 2, [12, 6]], "b": 2, "c": 3}, {"a": 2, "b": 2, "c": 5}],
      "3": [{"a": [2, 1, [6, 5]], "b": 3, "c": 6}],
      "4": [{"a": [3, 6, [5, 99]], "b": 4, "c": 2}],
      "5": [{"a": [3, 2, [3, 5]], "b": 5, "c": 1}, {"a": [3, 6, [1, 115]], "b": 5, "c": 4}, {"a": [3, 6, [5, 99]], "b": 5, "c": 2}]
    }
  )
})


test("group by key 2",function () {
  let obj={
    o1:{a:[3,2,[12,6]],b:2,c:3},
    o2:{a:2,b:2,c:5},
    o3:{a:[3,2,[3,5]],b:5,c:1},
    o4:{a:[2,1,[6,5]],b:3,c:6},
    o5:{a:[3,6,[1,115]],b:5,c:4},
    o6:{a:[3,6,[5,99]],b:5,c:2},
    o7:{a:[3,6,[5,99]],b:4,c:2},
  }
  expect(objGroupBy(obj,"a")).toEqual(
    {
      "1": [{"a": [2, 1, [6, 5]], "b": 3, "c": 6}, {"a": [3, 6, [1, 115]], "b": 5, "c": 4}],
      "115": [{"a": [3, 6, [1, 115]], "b": 5, "c": 4}],
      "12": [{"a": [3, 2, [12, 6]], "b": 2, "c": 3}],
      "2": [{"a": [3, 2, [12, 6]], "b": 2, "c": 3}, {"a": 2, "b": 2, "c": 5}, {"a": [3, 2, [3, 5]], "b": 5, "c": 1}, {"a": [2, 1, [6, 5]], "b": 3, "c": 6}],
      "3": [{"a": [3, 2, [12, 6]], "b": 2, "c": 3}, {"a": [3, 2, [3, 5]], "b": 5, "c": 1}, {"a": [3, 2, [3, 5]], "b": 5, "c": 1}, {"a": [3, 6, [1, 115]], "b": 5, "c": 4}, {"a": [3, 6, [5, 99]], "b": 5, "c": 2}, {"a": [3, 6, [5, 99]], "b": 4, "c": 2}],
      "5": [{"a": [3, 2, [3, 5]], "b": 5, "c": 1}, {"a": [2, 1, [6, 5]], "b": 3, "c": 6}, {"a": [3, 6, [5, 99]], "b": 5, "c": 2}, {"a": [3, 6, [5, 99]], "b": 4, "c": 2}],
      "6": [{"a": [3, 2, [12, 6]], "b": 2, "c": 3}, {"a": [2, 1, [6, 5]], "b": 3, "c": 6}, {"a": [3, 6, [1, 115]], "b": 5, "c": 4}, {"a": [3, 6, [5, 99]], "b": 5, "c": 2}, {"a": [3, 6, [5, 99]], "b": 4, "c": 2}],
      "99": [{"a": [3, 6, [5, 99]], "b": 5, "c": 2}, {"a": [3, 6, [5, 99]], "b": 4, "c": 2}]
    }
      )
})

test("group by key 3",function () {
  let obj={
    o1:{a:{x:1,y:6,z:8},b:2,c:3},
    o2:{a:{x:null,y:1,z:null},b:2,c:3},
    o3:{a:{x:1,y:6,z:3},b:2,c:3},
    o4:{a:{x:1,y:6,z:8},b:2,c:3},
    o5:{a:{x:1,y:6,z:3},b:2,c:3},
    o6:{a:{x:2,y:6,z:null},b:2,c:3},
    o7:{a:{x:1,y:6,z:7},b:2,c:3},
    o8:{a:{x:2,y:1,z:null},b:2,c:3},
    o9:{a:{x:1,y:1,z:null},b:2,c:3},
    o10:{a:{x:null,y:null,z:null},b:20000000000,c:30000000},
  }
  expect(objGroupBy(obj,"a",'z')).toEqual(
    {
      "1": [{"a": {"x": null, "y": 1, "z": null}, "b": 2, "c": 3}, {"a": {"x": 2, "y": 1, "z": null}, "b": 2, "c": 3}, {"a": {"x": 1, "y": 1, "z": null}, "b": 2, "c": 3}, {"a": {"x": 1, "y": 1, "z": null}, "b": 2, "c": 3}],
      "2": [{"a": {"x": 2, "y": 6, "z": null}, "b": 2, "c": 3}, {"a": {"x": 2, "y": 1, "z": null}, "b": 2, "c": 3}],
      "3": [{"a": {"x": 1, "y": 6, "z": 3}, "b": 2, "c": 3}, {"a": {"x": 1, "y": 6, "z": 3}, "b": 2, "c": 3}],
      "6": [{"a": {"x": 2, "y": 6, "z": null}, "b": 2, "c": 3}],
      "7": [{"a": {"x": 1, "y": 6, "z": 7}, "b": 2, "c": 3}],
      "8": [{"a": {"x": 1, "y": 6, "z": 8}, "b": 2, "c": 3}, {"a": {"x": 1, "y": 6, "z": 8}, "b": 2, "c": 3}]}
  )
})

/*--------refactor----------------*/
// mock moment.js data
describe("get right timeArr",function () {
  test("refactor timeArr by sorted",function () {
    let obj={
      o1:{timeArr:[2018,0,1],cur:"2018/1/1"},
      o2:{timeArr:[2018,6,1],cur:"2018/7/1"},
      o3:{timeArr:[2018,4,31],cur:"2018/5/31"},
      o4:{timeArr:[2018,5,30],cur:"2018/6/30"},
      o5:{timeArr:[2018,7,15],cur:"2018/8/15"},
      o6:{timeArr:[2018,7,2],cur:"2018/8/2"},
      o7:{timeArr:[2018,9,13],cur:"2018/10/13"},
      o8:{timeArr:[2018,4,6],cur:"should be exist"},
      o9:{timeArr:[2018,4,6],cur:"should be exist"},
      o10:{timeArr:[2018,4,8],cur:"2018/5/8"},
      o11:{timeArr:[2018,4,25],cur:"2018/5/25"},
      o12:{timeArr:[2018,4,3],cur:"2018/5/3"},
      o13:{timeArr:[2018,4,31],cur:"2018/5/31"},
      o14:{timeArr:[2018,4,16],cur:"2018/5/16"},
      o15:{timeArr:[2018,4,9],cur:"2018/5/9"},
    }
    expect(refactor(obj,"time")).toEqual(
      {"2018":
          [[{"cur": "2018/1/1", "timeArr": [2018, 0, 1]}],
            undefined,
            undefined,
            undefined,
            [{"cur": "2018/5/3", "timeArr": [2018, 4, 3]}, {"cur": "should be exist", "timeArr": [2018, 4, 6]}, {"cur": "should be exist", "timeArr": [2018, 4, 6]}, {"cur": "2018/5/8", "timeArr": [2018, 4, 8]}, {"cur": "2018/5/9", "timeArr": [2018, 4, 9]}, {"cur": "2018/5/16", "timeArr": [2018, 4, 16]}, {"cur": "2018/5/25", "timeArr": [2018, 4, 25]}, {"cur": "2018/5/31", "timeArr": [2018, 4, 31]}, {"cur": "2018/5/31", "timeArr": [2018, 4, 31]}],
            [{"cur": "2018/6/30", "timeArr": [2018, 5, 30]}],
            [{"cur": "2018/7/1", "timeArr": [2018, 6, 1]}],
            [{"cur": "2018/8/2", "timeArr": [2018, 7, 2]}, {"cur": "2018/8/15", "timeArr": [2018, 7, 15]}],
            undefined,
            [{"cur": "2018/10/13", "timeArr": [2018, 9, 13]}]
          ]}
    )
  })

  test("refactor timeArr with some noDate",function () {
    let obj={
      o1:{timeArr:[],cur:"2018/1/1"},
      o2:{timeArr:[2018,6,1],cur:"2018/7/1"},
      o3:{timeArr:[2018,4,31],cur:"2018/5/31"},
      o4:{timeArr:[],cur:"2018/6/30"},
      o5:{timeArr:[2018,7,15],cur:"2018/8/15"},
      o6:{timeArr:[2018,7,2],cur:"2018/8/2"},
      o7:{timeArr:[],cur:"2018/10/13"},
      o8:{timeArr:[2018,4,6],cur:"should be exist"},
      o9:{timeArr:[2018,4,6],cur:"should be exist"},
      o10:{timeArr:[],cur:"2018/5/8"},
      o11:{timeArr:[2018,4,25],cur:"2018/5/25"},
      o12:{timeArr:[],cur:"2018/5/3"},
      o13:{timeArr:[2018,4,31],cur:"2018/5/31"},
      o14:{timeArr:[2018,4,16],cur:"2018/5/16"},
      o15:{timeArr:[2018,4,9],cur:"2018/5/9"},
    }
    expect(refactor(obj,"time")).toEqual(
      {
        "2018":
          [
            undefined,
            undefined,
            undefined,
            undefined,
            [{"cur": "should be exist", "timeArr": [2018, 4, 6]}, {"cur": "should be exist", "timeArr": [2018, 4, 6]}, {"cur": "2018/5/9", "timeArr": [2018, 4, 9]}, {"cur": "2018/5/16", "timeArr": [2018, 4, 16]}, {"cur": "2018/5/25", "timeArr": [2018, 4, 25]}, {"cur": "2018/5/31", "timeArr": [2018, 4, 31]}, {"cur": "2018/5/31", "timeArr": [2018, 4, 31]}],
            undefined,
            [{"cur": "2018/7/1", "timeArr": [2018, 6, 1]}],
            [{"cur": "2018/8/2", "timeArr": [2018, 7, 2]}, {"cur": "2018/8/15", "timeArr": [2018, 7, 15]}]
          ],
        "noDate":
          [
            {"cur": "2018/1/1", "timeArr": []},
            {"cur": "2018/6/30", "timeArr": []},
            {"cur": "2018/10/13", "timeArr": []},
            {"cur": "2018/5/8", "timeArr": []},
            {"cur": "2018/5/3", "timeArr": []}
          ]
      }
    )
  })
})


/*----------deepEqual---------------------*/


test("deepEqual",function () {
  let obj1={
    createdTime: "6/7/2018",
    label:["getDerivedStateFromProps", "props", "state", "myFetch", "list", "return", "null"],
    sha: "5773c257a100e1f2106db59fb0bc4ad273375da0",
    summary: {x:1,y:2,z:[5,67,7,2,{a:823974,b:function(x){return x+5},c:[1299,324,65,false,true,{lastArr:[]}]}]},
    timeArr: [2018, 5, 7, 0, 0, 0, 0],
    title: ()=>"title"
  }
  let obj2={
    createdTime: "6/7/2018",
    label:["getDerivedStateFromProps", "props", "state", "myFetch", "list", "return", "null"],
    sha: "5773c257a100e1f2106db59fb0bc4ad273375da0",
    summary: {x:1,y:2,z:[5,67,7,2,{a:823974,b:function(x){return x+5},c:[1299,324,65,false,true,{lastArr:[]}]}]},
    timeArr: [2018, 5, 7, 0, 0, 0, 0],
    title: ()=>"title"
  }
  // b:function...x+6
  let obj3={
    createdTime: "6/7/2018",
    label:["getDerivedStateFromProps", "props", "state", "myFetch", "list", "return", "null"],
    sha: "5773c257a100e1f2106db59fb0bc4ad273375da0",
    summary: {x:1,y:2,z:[5,67,7,2,{a:823974,b:function(x){return x+6},c:[1299,324,65,false,true,{lastArr:[]}]}]},
    timeArr: [2018, 5, 7, 0, 0, 0, 0],
    title: ()=>"title"
  }
  expect(obj1===obj2).toBe(false)
  expect(deepEqual(obj1,obj2)).toBe(true)
  expect(deepEqual(obj1,obj3)).toBe(false)
  expect(deepEqual(obj2,obj3)).toBe(false)
})



test("deepEqual",function () {
  let obj1={x:1}
  let obj2=null
  let obj3=undefined
  let obj4=null

  expect(deepEqual(obj1,obj2)).toBe(false)
  expect(deepEqual(obj1,obj3)).toBe(false)
  expect(deepEqual(obj2,obj3)).toBe(false)
  expect(deepEqual(obj2,obj1)).toBe(false)
  expect(deepEqual(obj3,obj1)).toBe(false)
  expect(deepEqual(obj3,obj2)).toBe(false)

  expect(deepEqual(obj2,obj4)).toBe(true)
})

test("确保通过withOutImgHTML后不会渲染IMG标签",function () {
  let match1=`<img src="./abc.png" />`
  let match2=`<div>img</div><img src="./abc.png" />`
  let match3=`<div>img</div><img src="./abc.png" >`
  let match3_2=`<div>img</div><      img src="./abc.png" >`
  let match4=`<div>img</div><img src="./abc.png"`
  let match4_2=`<div>img</div><   img src="./abc.png"`
  let match5=`<div><img src="#"/></div><img src="./abc.png"`
  let match6=`<div><img src="#"/><img src="./abc.png" ><img src="./abc.png" ></div><img src="./abc.png" ><img src="./abc.png" ><img src="./abc.png" ><img src="./abc.png" ><img src="./abc.png" >`
  let match6_2=`<div><  img  id="a" class="bb"  src="#"/><img src="./abc.png" ><       img src="./abc.png" ></div><img src="./abc.png" ><       img src="./abc.png" ><img src="./abc.png" ><img src="./abc.png" ><img src="./abc.png" >`

  let reg=/<\s*?img/
  expect(reg.test(withOutImgHTML(match1))).toBe(false)
  expect(reg.test(withOutImgHTML(match2))).toBe(false)
  expect(reg.test(withOutImgHTML(match3))).toBe(false)
  expect(reg.test(withOutImgHTML(match3_2))).toBe(false)
  expect(reg.test(withOutImgHTML(match4))).toBe(false)
  expect(reg.test(withOutImgHTML(match4_2))).toBe(false)
  expect(reg.test(withOutImgHTML(match5))).toBe(false)
  expect(reg.test(withOutImgHTML(match6))).toBe(false)

})


// test("match without src in markdown",function () {
//   let match1='sf ![](./img/target.png)'
//   let match2='we this is (target)'
//   let match3='cad[target]("./abc.png")'
//   let match4='abcde ![target]("./abc.png")'
//   let match5='zxcwr ![./img/target.png](./img/target.png)'
//   let match6='zxcwr ![](./img/target.png)'
//   expect(withOutSrcInMD("target",match1)).toBe(true)
//   expect(withOutSrcInMD("target",match2)).toBe(false)
//   expect(withOutSrcInMD("target",match3)).toBe(false)
//   expect(withOutSrcInMD("target",match4)).toBe(true)
//   expect(withOutSrcInMD("target",match5)).toBe(true)
//   expect(withOutSrcInMD("./img",match6)).toBe(true)
// })

test("判断是否在HTML标签内",function () {

  let match1=`<div abc/>`
  let match2=`<div id="abc" />`
  let match3=`<abc class="abb"/>`
  let match4=`<div class="abcde"/>abc`
  let match5=`<div class="abde"/>abc`
  let match6=`class="abc"/>`
  let match7=`class="ab"/>abc<img class="abc"/>`
  let match8=`class="abde"/>abc`
  let match9=`class="abc"/>abc<div class="abc"><img class="abc"/>`
  let match10=`class="abc"/>abc<div class="abc"><img class="abc"/>`
  let match11=`class="abc"/>abc<div class="abc"><img class="abc"/>`
  let match12=`<abc s="abcoioabcmoabc">`
  let match13=`<abc s="abcabcabcabcabcabc">`
  let match14=`abcoioabcmoabc`

  let t='abc'
  expect(inHTMLTag(t,match1)).toBe(true)
  expect(inHTMLTag(t,match2)).toBe(true)
  expect(inHTMLTag(t,match3)).toBe(true)
  expect(inHTMLTag(t,match4)).toBe(true)
  expect(inHTMLTag(t,match5)).toBe(false)
  expect(inHTMLTag(t,match6)).toBe(true)
  expect(inHTMLTag(t,match7)).toBe(true)
  expect(inHTMLTag(t,match7,12)).toBe(false)
  expect(inHTMLTag(t,match8)).toBe(false)
  expect(inHTMLTag(t,match9)).toBe(true)
  expect(inHTMLTag(t,match9,13)).toBe(false)
  expect(inHTMLTag(t,match10,7)).toBe(true)
  expect(inHTMLTag(t,match11,28)).toBe(true)
  expect(inHTMLTag(t,match12,14)).toBe(true)
  expect(inHTMLTag(t,match13,17)).toBe(true)
  expect(inHTMLTag(t,match14)).toBe(false)

})


test("判断是否精确匹配",function () {
  let match1="_a_abc_b"
  let match2="_aabc_b"
  let match3="_a abcb"
  let match4="_a abc b"
  let match5="_a 6abc b"
  let match6="_a 'abc' b"
  let match7=`_a" abc" b`
  let match8=`这是abc字母`

  let cnMatch1="学算法"
  let cnMatch2="算法竞赛"
  let cnMatch3="a算法b"
  let cnMatch4="DP算法"
  let cnMatch5="介绍：算法"
  let cnMatch6="介绍“算法”"
  let cnMatch7="算法666"
  let cnMatch8="算数方法"
  let cnMatch9="算“法"

  let cnMatch100="学Tree结构"
  let cnMatch101="Tree结构"
  let cnMatch102="RBTree结构"

  let extra=`关于回溯算法(backtrack)的模板解析`
  let extra2=`测试匹配特殊符号`

  let t='abc'
  let t2="算法"
  let t3="Tree结构"
  let t4=`特()殊`
  let t5=`()特殊`

  expect(isMatchPrecision(t,match1)).toBe(false)
  expect(isMatchPrecision(t,match2)).toBe(false)
  expect(isMatchPrecision(t,match3)).toBe(false)
  expect(isMatchPrecision(t,match4)).toBe(true)
  expect(isMatchPrecision(t,match5)).toBe(false)
  expect(isMatchPrecision(t,match6)).toBe(true)
  expect(isMatchPrecision(t,match7)).toBe(true)
  expect(isMatchPrecision(t,match8)).toBe(true)

  expect(isMatchPrecision(t2,cnMatch1)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch2)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch3)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch4)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch5)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch6)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch7)).toBe(true)
  expect(isMatchPrecision(t2,cnMatch8)).toBe(false)
  expect(isMatchPrecision(t2,cnMatch9)).toBe(false)

  expect(isMatchPrecision(t3,cnMatch100)).toBe(true)
  expect(isMatchPrecision(t3,cnMatch101)).toBe(true)
  expect(isMatchPrecision(t3,cnMatch102)).toBe(false)


  expect(isMatchPrecision('a',extra)).toBe(false)
  expect(isMatchPrecision(t4,extra2)).toBe(false)
  expect(isMatchPrecision(t5,extra2)).toBe(false)


})

test("获取cookie",function () {

  let cookie1=`uid_bg=5675TB67V123fFHdHghDFdye;yu67=1!&%456&sfGJKGV%^<>=-_+[];abc=<>?/*-+~YYYYY=TTTTT!@#$%^~&%^`

  expect(getCookie("uid_bg",cookie1)).toBe("5675TB67V123fFHdHghDFdye")
  expect(getCookie("yu67",cookie1)).toBe("1!&%456&sfGJKGV%^<>=-_+[]")
  expect(getCookie("abc",cookie1)).toBe("<>?/*-+~YYYYY=TTTTT!@#$%^~&%^")
  expect(getCookie("YYYYY",cookie1)).toBe("")

})


test("简易获取URL中search参数",function () {

  let href=`?bookmark=1327&a=56&b=12&c=64`

  expect(querySearch(href)).toEqual({bookmark:'1327',a:'56',b:'12',c:'64'})

})


test('尝试精确查找',function () {
  let content=`<p>使用4种方式：props传递，父组件公用，hoc，render-prop</p>`

  let pattern="render()"


  expect(searchPrecision(pattern,content)).toBe(-1)
})