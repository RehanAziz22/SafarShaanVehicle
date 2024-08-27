// import { View, Text, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './src/AppNavigator'
import { Provider } from 'react-redux'
import store from './src/store'


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App