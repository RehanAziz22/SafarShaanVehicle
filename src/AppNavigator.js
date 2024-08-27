import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from './normal/Splash'
import Parent from './normal/Parent'
import Login from './normal/Login'
import Signup from './normal/RideEndScreen'
import OTPScreen from './normal/QRScreen'
import ChooseLocation from './normal/ChooseLocation'
import EditName from './nestedScreens/EditName'
import CreatePin from './normal/CreatePin'
import QRScreen from './normal/QRScreen'
import RideEndScreen from './normal/RideEndScreen'
import { useSelector } from 'react-redux';

const Stack = createStackNavigator()

const AppNavigator = () => {

    // Access the bike state from Redux store
    const bike = useSelector(state => state.bike);
    return (
        <NavigationContainer>
            <Stack.Navigator 
             initialRouteName={bike ? 'QRScreen' : 'Splash'}
             >
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='QRScreen'
                    component={QRScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Parent'
                    component={Parent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='RideEndScreen'
                    component={RideEndScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='chooseLocation'
                    component={ChooseLocation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='editName'
                    component={EditName}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='createPin'
                    component={CreatePin}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator