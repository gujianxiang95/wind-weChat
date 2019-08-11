// components/classic/music/music.js
import { classicBeh } from "../../classic/classic-begh.js"

const musicMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    img:String,
    content:String,
    src:String,
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauSrc:"img/player@playing.png",
    playSrc:"img/player@waitting.png",
    playing:false,
  },
  //在组件实例进入页面节点树时执行
  attached(){
    this._recoverStatus()
    //总控按钮保持同步
    this._monitorSwitch()
  },

  //组件实例被从页面节点树移除时执行 hidden不会触发detached
  // detached(e){
  //   console.log('执行到了')
  //   musicMgr.stop()
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    //控制音乐播放
    onPlay(e){
      this.setData({
        playing: !this.data.playing
      })
      if (this.data.playing){
        musicMgr.title = this.properties.src
        musicMgr.src = this.properties.src
      }else{
        musicMgr.pause()
      }
    },
    //
    _recoverStatus:function(){
      console.log('执行到了')
      //当前无音乐播放
      if(musicMgr.paused){
        console.log('暂停')
        this.setData({
          playing:false
        })
        return
      }
      //当前播放音乐 与本页面音乐相等
      if (musicMgr.src === this.properties.src){
        console.log('相等')
        this.setData({
          playing: true
        })
        return
      }
    },

    _monitorSwitch:function(){
      musicMgr.onPlay(()=>{
        this._recoverStatus()
      })
      musicMgr.onPause(()=>{
        this._recoverStatus()
      })
      musicMgr.onStop(()=>{
        this._recoverStatus()
      })
      musicMgr.onEnded(()=>{
        this._recoverStatus()
      })

    }
  }
})
