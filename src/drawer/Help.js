import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ToggleDrawerButton from '../components/ToggleDrawerButton'
import ToggleBackButton from '../components/ToggleBackButton'
import styles from '../style'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'


const Help = () => {
  const navigation = useNavigation();


  return (
    <View style={[styles.bgLight, { flex: 1, }]}>
      <ToggleBackButton />
      <ToggleDrawerButton  />
      <View style={{ flex: 1, paddingTop: 90, paddingHorizontal: 30 }}>
        <Text style={[styles.textBold, styles.fs1, styles.textBlack]}>Help</Text>

        {/* ----------------------------- Card ------------------------------) */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.mt1]}>
          {/* -------------------- Issue with a recent ride------------------------------------- */}
          <View style={[styles.borderBottom1, styles.pb2, { borderBottomColor: styles._grey }]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
              <Text style={[styles.fs5, styles.textBlack]}>Issue with a recent ride</Text>
              <Icon name='chevron-right' size={30} color={"black"} />
            </TouchableOpacity>
          </View>
          {/* -------------------- Ride won't start------------------------------------- */}
          <View style={[styles.borderBottom1, styles.py2, { borderBottomColor: styles._grey }]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
              <Text style={[styles.fs5, styles.textBlack]}>Ride won't start</Text>
              <Icon name='chevron-right' size={30} color={"black"} />
            </TouchableOpacity>
          </View>
          {/* -------------------- Damaged vehicle------------------------------------- */}
          <View style={[styles.borderBottom1, styles.py2, { borderBottomColor: styles._grey }]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
              <Text style={[styles.fs5, styles.textBlack]}>Damaged vehicle</Text>
              <Icon name='chevron-right' size={30} color={"black"} />
            </TouchableOpacity>
          </View>
          {/* -------------------- Improper or illegal parking------------------------------------- */}
          <View style={[styles.borderBottom1, styles.py2, { borderBottomColor: styles._grey }]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
              <Text style={[styles.fs5, styles.textBlack]}>Improper or illegal parking</Text>
              <Icon name='chevron-right' size={30} color={"black"} />
            </TouchableOpacity>

          </View>
          {/* -------------------- FAQs------------------------------------- */}
          <View style={[styles.pt2]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
              <Text style={[styles.fs5, styles.textBlack]}>FAQs</Text>
              <Icon name='chevron-right' size={30} color={"black"} />
            </TouchableOpacity>

          </View>
        </View>




      </View>
    </View>
  )
}

export default Help