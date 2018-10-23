import {objSortBy, objGroupBy, refactor, deepEqual} from "../index"

test("sort by factorArr",function () {
  let obj={
  o1:{a:1,b:2,c:3},
  o2:{a:2,b:2,c:5},
  o3:{a:4,b:5,c:1},
  o4:{a:2,b:3,c:6},
  o5:{a:3,b:5,c:4},
  o6:{a:4,b:5,c:2}
  }
  expect(objSortBy(obj,['a','b','c'],false)).toEqual(
    [
      {"a": 4, "b": 5, "c": 2},
    {"a": 4, "b": 5, "c": 1},
    {"a": 3, "b": 5, "c": 4},
    {"a": 2, "b": 3, "c": 6},
    {"a": 2, "b": 2, "c": 5},
    {"a": 1, "b": 2, "c": 3}
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


/*--------refactor----------------*/
// mock moment.js data
test("refactor timeArr",function () {
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