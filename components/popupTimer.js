import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PopupTimer extends Component{
  constructor(props){
    super(props);
    this.timer=""; 
    this.state={
      times: this.props.duration
    }
  }
  componentDidMount() {
    this.timer=setInterval(  
      () => {  
        if(this.state.times<=1){
          clearInterval(this.timer)
          this.props.onclick()        
        }else{
          this.setState({times:this.state.times-1})
        }  
      },
    1000);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  
  render(){
    return(
      <Text style={{fontSize:12, marginTop:10}}>即将关闭此窗口（<Text style={{color:'#ff0000'}}>{this.state.times}秒</Text>）</Text>
    )
  }
}