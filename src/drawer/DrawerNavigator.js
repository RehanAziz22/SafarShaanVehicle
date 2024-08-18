import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './Home'
import CustomDrawer from './CustomDrawer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import Wallet from './Wallet'
import Setting from './Setting'
import Help from './Help'
import Promos from './Promos'
import styles from '../style'


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const navigation = useNavigation()
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerLabelStyle:{marginLeft:-25,fontFamily:'Roboto-Medium',fontSize:15} }} drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name='Home' component={Home} options={{
        drawerIcon: () => {
          return (
            <Icon name='home' size={30} color='#2D2E31' />
          )
        }
      }} />
      <Drawer.Screen name='Wallet' component={Wallet} options={{
        drawerIcon: () => {
          return (
            <Icon name='wallet' size={30} color='#2D2E31' />
          )
        }
      }} />
      <Drawer.Screen name='Promos' component={Promos} options={{
        drawerIcon: () => {
          return (
            <Icon name='loyalty' size={30} color='#2D2E31' />
          )
        }
      }} />
      <Drawer.Screen name='Setting' component={Setting} options={{
        drawerIcon: () => {
          return (
            <Icon name='settings' size={30} color='#2D2E31' />
          )
        }
      }} />
      <Drawer.Screen name='Help' component={Help} options={{
        drawerIcon: () => {
          return (
            <Icon name='help-outline' size={30} color='#2D2E31' />
          )
        }
      }} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator