import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ToggleDrawerButton from '../components/ToggleDrawerButton'
import ToggleBackButton from '../components/ToggleBackButton'
import styles from '../style'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomBtn from '../components/CustomBtn'


const Promos = () => {
  const navigation = useNavigation();


  return (
    <View style={[styles.bgLight, { flex: 1, }]}>
      <ToggleBackButton />
      <ToggleDrawerButton />
      <View style={{ flex: 1, paddingTop: 90, paddingHorizontal: 30 }}>
        <Text style={[styles.textBold, styles.fs1, styles.textBlack]}>Promos</Text>

        {/* ----------------------------- Card (edit name email------------------------------) */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.mt1]}>


          {/* ------------------------ Add Promo------------------------------ */}
          <View style={[styles.justifyContentBetween]}>
            <Text style={[styles.fs4, styles.textBlack]}>Add Promo</Text>
            <TextInput style={[styles.borderBottom1, styles.fs3,styles.mt1,styles.textBlack, { borderColor: styles._grey }]} placeholderTextColor={'black'} placeholder='Enter Promo Code' />
          </View>


        </View>
        <TouchableOpacity style={[styles.btn,styles.my2]}>
          <Text style={[styles.textBlack, styles.textBold, styles.fs4]}>Add</Text>
        </TouchableOpacity>
        <View style={[styles.mt2]}>
          <Text style={[{ fontSize: 13 }]}>This may look very different from the way navigation used to work with nested screens previously. The difference is that in the previous versions, all configuration was static, so React Navigation could statically find the list of all the navigators and their screens by recursing into nested configurations. </Text>
        </View>
      </View>
    </View>
  )
}

export default Promos