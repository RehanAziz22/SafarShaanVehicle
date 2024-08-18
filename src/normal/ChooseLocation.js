import { View, Text } from 'react-native'
import React from 'react'
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey'
import AddressPickup from '../components/AddressPickup'

const ChooseLocation = () => {
  return (
    <View style={{flex:1}}>
        <AddressPickup/>
    </View>
  )
}

export default ChooseLocation