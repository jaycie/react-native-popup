# react-native-popup
This is a combination of the popup box confirmation react-native components for Android and Ios,you can customize the style and parameters for the component  
# Brief
- A react-native picker/selector component for both Android & iOS.
# Features
- Pure JS.
- Pop up box and confirm the box together .
- Custom pop-up box
- Compatible with both iOS and Android.
- Highly customizable.(You can change the style you want)
- Controllable with API by code. (show/hide/valueChange)
- Flexible change of content

# Usage

## code
```javascript
npm install react-native-popup-master --save
```
## code
```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import SubPopup from './subPopup';  //yourself components,it's not necessary
import Popup from 'react-native-popup-master';

export default class PopupDemo extends Component { 
  constructor(props){
    super(props); 
  }
  funAlert(){
    let options={
      tHide:true, /*不显示头部标题*/
      msg: '我是自定义内容我是自定义内容我是自定义内容我是自定义内容我是自定义内容', 
      buttons:[
        {
          txt:'确定'
        }
      ]       
    }
   this.refs.dAlert.show(options) 
  }
  funConfirm(){
    let options={
      msg:'投资前需开通第三方存管账户',
      buttons:[
        {
          txt:'取消'
        },
        {
          txt:'确定'
        }
      ]         
    } 
    this.refs.dConfirm.show(options) 
  }
  funAutoFadeOut(){
    let options={
      msg: '我是自动消失的弹框',
      clickScreen: false,
      duration: 5,
      buttons:[
        {
          txt:'知道了'
        }
      ]       
    }
   this.refs.autoFadeOut.show(options) 
  }
  funcustomConfirm(){
    let options={
      title:'购买',
      msg:'这里是说明文字',
      width:320,
      height:200,
      buttons:[
        {
          txt:'暂不投资',
          onpress:this.cancels.bind(this)
        },
        {
          txt:'立即投资',
          txtStyle:{color:'#ff0000'}
        },
        {
          txt:'其他按钮'
        }
      ]     
    } 
    this.refs.dcustomConfirm.show(options)     
  }
  cancels(){
    this.refs.dokAlert.show({
      msg:'确定取消吗？',
      buttons:[{txt:'确定'}],
    }) 
  }

  funAutofade(){
    let options={
      animationType:'none',
      title:'组件标题',
      msg: '自定义组件内容,你也可以添加按钮等',
      height: 240   
    }
    this.refs.subPopup.show(options) 
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.btnView} underlayColor='transparent' onPress={this.funAlert.bind(this)}>  
          <Text style={[styles.btnText]}>alert</Text>  
        </TouchableHighlight>
        <TouchableHighlight style={styles.btnView} underlayColor='transparent' onPress={this.funConfirm.bind(this)}>  
          <Text style={[styles.btnText]}>confirm</Text>  
        </TouchableHighlight>
        <TouchableHighlight style={styles.btnView} underlayColor='transparent' onPress={this.funAutoFadeOut.bind(this)}>  
          <Text style={[styles.btnText]}>autoFadeOut</Text>  
        </TouchableHighlight>
        <TouchableHighlight style={styles.btnView} underlayColor='transparent' onPress={this.funcustomConfirm.bind(this)}>  
          <Text style={[styles.btnText]}>customconfirm</Text>  
        </TouchableHighlight>
        <TouchableHighlight style={styles.btnView} underlayColor='transparent' onPress={this.funAutofade.bind(this)}>  
          <Text style={[styles.btnText]}>sub Component</Text>  
        </TouchableHighlight>

        <Popup ref="dAlert" type={'alert'} />
        <Popup ref="dConfirm" type={'confirm'} />
        <Popup ref="autoFadeOut" type={'autoFadeOut'} />
        <Popup ref="dokAlert" />
        <Popup ref="dcustomConfirm" />
        <Popup ref="subPopup" components={<SubPopup onclick={this.hide.bind(this)}/>} />
     </View>
    );
  }

  hide(){
    this.refs.subPopup.hide();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btnView:{
    borderWidth:1,
    borderColor:'#DFDFDF',
    borderRadius:3,
    backgroundColor:'#ffffff',
    height:28,
    marginBottom:15,
    width: 120,
  },
  btnText:{
    color:'#007aff',
    textAlign:'center',
    textAlignVertical:'center',
  }
});
```
    
## Demo
<img src="http://images2015.cnblogs.com/blog/381372/201705/381372-20170515191718978-718999478.jpg" width = "400" height = "auto" alt="Demo 1"/>
<img src="http://images2015.cnblogs.com/blog/381372/201705/381372-20170515191725744-1690866015.jpg" width = "400" height = "auto" alt="Demo 2"/>

### Customization options



- 'animateType': Change pop up block display animation ('fade','normal','slide')
       - The animationType prop controls how the modal animates.
            - slide: slides in from the bottom
            -fade: fades into view
            -none: appears without an animation
- 'tHide'：(true|false) show or hide header			
- 'title':	Custom header text    
- 'msg'：show message             ---string
- 'duration': the time of auto disappear    ---number
- 'headStyle': Change the style of the dialogs header
- 'width': Change the width of the dialogs
- 'height':Change the height of the dialogs
- 'clickScreen': (true|false) Transparent area can click
- 'buttons':Button group object
```javascript
      buttons:[
			 {
				txt:'button text',     ---string
				btnStyle:{backgroundColor:'transparent'},  button style---object
				txtStyle:{color:'#ff6600'},    button text style           ---object
				onpress:this.cancels.bind(this) button click event          ---function
			 }
			 ...
            ]
```
### Props 
- 'components': Custom middle context component

### Methods
Method            |  Description
----------------- |  -----------
`show(options)`   |  Show  dialogs   （ use the react-native Modal component  to always be at the top）
`hide()`          |  Hide dialogs



