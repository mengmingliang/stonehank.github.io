function getApartOfData(arr,numOfApart){
  let n=numOfApart,result=[],i=arr.loadedIndex||0
  for(;i<arr.length;i++){
    if(n===0){arr.loadedIndex=i;return result}
    if(arr[i] && n--)result.push(arr[i])
  }
  arr.loadedIndex=i
  return result
}

test('save next loadIndex in arr',function () {
  let arr=[
   null, {page:1}, {page:2},undefined, {page:3}, {page:4}, {page:5},undefined, {page:6}
  ]
  expect(getApartOfData(arr,2)).toEqual([{page:1}, {page:2}])
  expect(arr.loadedIndex).toEqual(3)
  expect(getApartOfData(arr,2)).toEqual([{page:3}, {page:4}])
  expect(arr.loadedIndex).toEqual(6)
  expect(getApartOfData(arr,2)).toEqual([{page:5}, {page:6}])
})