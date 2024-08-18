import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
import Icon from 'react-native-vector-icons/MaterialIcons'
const Bottom = createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <Bottom.Navigator>

            <Bottom.Screen
                name='Screen1'
                component={Screen1}
                options={{ tabBarIcon: () => <Icon name="home" size={30} color="#900" /> }}
            />

            <Bottom.Screen
                name='Screen2'
                component={Screen2}
                options={{ tabBarIcon: () => <Icon name="search" size={30} color="#900" /> }}
            />
            <Bottom.Screen
                name='Screen3'
                component={Screen3}
                options={{ tabBarIcon: () => <Icon name="account-circle" size={30} color="#900" /> }}
            />
        </Bottom.Navigator>
    )
}

export default BottomNavigator