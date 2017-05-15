import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

export default class SubPopup extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <View style={[styles.conMid]}>
        <Image
          style={styles.logo}
          source={{uri: 'http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png'}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conMid:{
    flexDirection:'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  logo: {
    width: 134,
    height: 44
  }
});