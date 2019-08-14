const paginationBev = Behavior({
  data:{
    dataArray:[],
    total:0,
    loading: false,

  },
  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
    },
    hasMore(){
      if(this.data.dataArray.length >= this.data.total){
        return false
      }else{
        return true
      }
    },
    initialize(){
      this.setData({
        dataArray:[]
      })
    },
    //锁
    isLocked() {
      return this.data.loading ? true : false
    },
    //加锁
    locked() {
      this.setData({
        loading: true
      })
    },
    //解锁
    unlocked() {
      this.setData({
        loading: false
      })
    },
  },

})

export { paginationBev }