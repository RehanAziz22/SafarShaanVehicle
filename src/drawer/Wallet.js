import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ToggleDrawerButton from '../components/ToggleDrawerButton'
import ToggleBackButton from '../components/ToggleBackButton'
import styles from '../style'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomBtn from '../components/CustomBtn'


const Wallet = () => {
  const navigation = useNavigation();


  return (
    <View style={[styles.bgLight, { flex: 1, }]}>
      <ToggleBackButton />
      <ToggleDrawerButton />
      <View style={{ flex: 1, paddingTop: 90, paddingHorizontal: 30 }}>
        <Text style={[styles.textBold, styles.fs1, styles.textBlack]}>Wallet</Text>

        {/* ----------------------------- Card (edit name email------------------------------) */}
        <View style={[styles.bgWhite, styles.rounded, styles.AppBg1, styles.shadow2, styles.p2, styles.mt1]}>
          {/* ------------------------ Avaliable balance------------------------------ */}
          <View style={[styles.justifyContentBetween, styles.flexRow]}>
            <View>
              <Text style={[styles.fs1, styles.textWhite, styles.textBold]}>PKR 10.00</Text>
              <Text style={[styles.fs5, styles.textWhite, styles.textBold]}>Avaliable Balance</Text>
            </View>
            <Icon name='account-balance-wallet' size={60} color='white' />
          </View>
          <Text style={[styles.textBold, { fontSize: 13, marginTop: 10 }]}>This may look very different from the way navigation used to work with nested screens previously.  </Text>
        </View>

        <Text style={[styles.fs3, styles.textBlack, styles.my2]}>Add Money to Your Account</Text>
        {/* ----------------------------- Card (edit name email------------------------------) */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.mt1]}>
          {/* ------------------------ Avaliable balance------------------------------ */}
          <View style={[]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
              <Text style={[styles.fs3, styles.textBlack]}>Top Up Credit</Text>
              <Icon name='add-card' size={40} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
        {/* ----------------------------- RADEEM POINT------------------------------) */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.mt1]}>
          <View style={[]}>
            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
              <Text style={[styles.fs3, styles.textBlack]}>Radeem Points</Text>
              <Icon name='monetization-on' size={40} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Wallet