// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:String,
      observer:function(newVal,oldVlue,changedPath){
        let val = newVal>10?newVal:'0'+newVal
        this.setData({ _index:val})
      }
    },//期刊刊号
  },
  /**
   * 组件的初始数据
   */
  data: {
    year:Number,//默认初始值是函数
    month:String,
    _index:'',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月','十二月']
  },
  /**
   * 组件的方法列表
   */
  attached(){
    let date = new Date()
    let year  = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },
  methods: {
  }
})
