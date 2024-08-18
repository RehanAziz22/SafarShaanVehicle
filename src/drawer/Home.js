import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomNavigator from '../bottom/BottomNavigator'
import AppMap from '../normal/AppMap'
import styles from '../style'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Home = () => {
  return (
    <View style={{flex:1}}>
      {/* <BottomNavigator/> */}
    <AppMap/>
    {/* <TouchableOpacity style={[styles.positionAbsolute, styles.AppBg1,styles.p1,styles.justifyContentCenter,styles.alignItemsCenter,{borderRadius:50,bottom:20,width:50,height:50,right:20}]}>
      <Icon name='my-location' size={30}/>
    </TouchableOpacity> */}
    
    </View>
  )
}

export default Home