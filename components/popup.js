'use strict';
import React,{Component} from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
  Modal,
} from 'react-native';
import PopupTimer from './popupTimer';
const {width, height} = Dimensions.get('window'); 
const [aWidth, aHeight] = [300, 150];  
const [left, top] = [0, 0]; 
const borderRadius = 8;

export default class popup extends Component{ 
  constructor(props){
    super(props);
    this.timer = "";
    this.state={
      hide:true,
      type: null, //alert confirm autoFadeOut
      duration: null,
      clickScreen: true,
      animationType:'fade',
      modalVisible: false,
      transparent: true,
      title: '提示', 
      headStyle: '',
      msg: '',
      innersWidth: null,
      innersHeight: null,
      buttons:[]
    }
  }  

  /** 
  * animationType:动画类型 使用Modal组件 'none,fade,slide'   ---string
  * title:头部标题文字                 ---string
  * tHide：true|false 是否隐藏头部     ---boolean
  * headStyle：头部样式                ---object
  * msg：中间提示文字             ---string
  * duration: 自动消失间隔时间    ---number
  * clickScreen:点击屏幕是否隐藏弹出框 ---boolean
  * width：弹出框的宽度     ---number
  * height：弹出框的高度    ---number
  * buttons: 按钮数组  ---array
  *  [    
  *    {
  *     txt:'按钮文字',     ---string
  *     btnStyle:{backgroundColor:'transparent'}, 按钮的样式对象---object
  *     txtStyle:{color:'#ff6600'},    按钮的文字样式           ---object
  *     onpress:this.cancels.bind(this) 按钮的点击事件          ---function
  *    }
  *  ]
  */  
  show(options) { 
    if(options){
      if(!this.state.modalVisible){  
        this.setState({
          title:options.title || '提示',
          msg: options.msg || '',
          tHide: options.tHide || false,
          headStyle: options.headStyle || '',
          modalVisible: true,
          innersHeight: options.height || null,
          innersWidth: options.width || null,
          buttons: options.buttons || null,
          animationType:options.animationType || 'fade',
          duration: options.duration || 3,
          clickScreen:options.clickScreen || true
        });  
      } 
    }else{
      this.setState({modalVisible: true}) 
    }   
  }

  render(){
    this.innersWidth=this.state.innersWidth || aWidth;
    this.innersHeight=this.state.innersHeight || aHeight;
    this.btnW=(this.innersWidth-60)/2;

    let subComponent = this.props.components ? (
        <View style={{flex:1,width:this.innersWidth, flexDirection:'row'}}>
          {this.props.components}
        </View>
      ):(
        <View></View>
      );
    
    let timer = this.props.type==='autoFadeOut' ? (
        <PopupTimer onclick={this.hide.bind(this)} duration={this.state.duration} />
      ):(
        <Text></Text>
      );

    return(
      <Modal
        animationType={this.state.animationType}
        transparent={this.state.transparent}
        visible={this.state.modalVisible}
        onRequestClose={this.hide.bind(this)}
        >
        <View style={[styles.container,styles.flex1]}>
          {
            this.state.clickScreen &&
              <TouchableHighlight onPress={this.hide.bind(this)} style={[styles.mask]} underlayColor='transparent'>
                <Text></Text>
              </TouchableHighlight>
          }
          {
            !this.state.clickScreen &&
              <TouchableHighlight style={[styles.mask]} underlayColor='transparent'>
                <Text></Text>
              </TouchableHighlight>
          }

          <View style={[styles.tip,
          {width:this.innersWidth,height:this.innersHeight}]}>
        

            {
            !this.state.tHide &&
              <View style={styles.headView}>
                <Text style={[
                 styles.headText,
                 this.state.headStyle]}>{this.state.title}</Text>
              </View> 
            }

            {subComponent}

            {
            this.state.msg!=='' &&
              <View style={styles.msgContent}>
                <Text>{this.state.msg}</Text>
                {timer}
              </View>  
            }
            
            {this.state.buttons &&
              <View style={[styles.btnView, {width:this.innersWidth+StyleSheet.hairlineWidth}]}>  
                {this.state.buttons.map((item,i)=>this.CreateBtns(item,i))}
              </View>  
            }  

          </View>
        </View>
      </Modal>
     )  
  }

  CreateBtns(item,i){     
    return <CreateButton key={i} btnW={this.btnW} onClick={this.hide.bind(this)} item={item} indexs={i} />
  } 

  hide(){
    this.setState({modalVisible:false });
  } 
} 


class CreateButton extends Component{
  constructor(props){
    super(props);
  }
  click(){
    this.props.onClick();
    if(this.props.item.onpress){
      this.props.item.onpress()
    } 
  }
  render(){
    return(
      <TouchableHighlight  style={[styles.comBtnBtnView,{width:this.props.btnW},this.props.item.btnStyle]} underlayColor='transparent' onPress={this.click.bind(this)}>  
        <Text style={[styles.comBtnText,this.props.item.txtStyle]}>{this.props.item.txt}</Text>
      </TouchableHighlight>
    )
  }
}



const styles = StyleSheet.create({
  container: {  
    width:width,  
    height:height,  
    alignItems:"center",  
    justifyContent:"center",  
    backgroundColor:'transparent'
  }, 
  mask: {  
    justifyContent:"center",  
    backgroundColor:"#222222",  
    opacity:0.7,  
    position:"absolute",  
    width:width,  
    height:height,  
    left:0,  
    top:0,  
  },  
  //正式内容
  tip: {    
    alignItems:"center",  
    justifyContent:"space-between",
    backgroundColor:'#ffffff',
    borderRadius: borderRadius,
    overflow: 'hidden',
    flexDirection:'column',
  },
  msgContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headView: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    backgroundColor:'#E61D4C',
  },
  headText:{
    color:'#ffffff',
    textAlign:'center',
    fontSize: 18,
    flex: 1,
  },
  btnView:{  
    height: 46,
    alignItems:"center",  
    justifyContent:"center",
    flexDirection:'row', 
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E6E6E6',
    overflow: 'hidden' 
  },  
  comBtnBtnView:{  
    height:46,  
    alignItems: 'center',  
    justifyContent: 'center', 
    flex: 1,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#E6E6E6'
  },  
  comBtnText: {  
    fontSize: 16,
    color:"#E61D4C",  
    textAlign:"center",
  }, 
  defaultStyle:{
    backgroundColor:'#ffffff',
    fontSize:14,
    borderWidth:1,
    borderColor:'#DFDFDF',
    color:'#141414',
    padding:0,
    paddingLeft:5,
    paddingRight:5,
    borderRadius: borderRadius,
    textAlignVertical:'center',
  },
  flex1:{
    flex: 1, 
  },
  conMid:{
    flexDirection:'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  }
})
