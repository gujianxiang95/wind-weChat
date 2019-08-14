const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const random = function generateMixed(n){
  let res = ''
  for(var i = 0; i < n; i++){
    let id =Math.ceil(Math.random() *9)
    res += chars[id]
  }
  return res
}
export { random }