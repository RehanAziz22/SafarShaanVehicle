import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../style'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removeUser } from '../store/slices/UserSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'

const CustomDrawer = (props) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const data = useSelector((state) => {
    return state.user;
  })

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(removeUser())
      navigation.navigate("Login")
    } catch (error) {
      console.error(error);
    }
  };
  const share = () => {
    console.log("working")
  }

  console.log(data)
  return (
    <View style={[{ flex: 1 }]}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: styles.AppBg1 }} >
        <View style={[styles.p2, styles.py4, styles.AppBg1, styles.alignItemsCenter, { marginTop: -5, }]}>
          {data.photo ? <Image source={{ uri: data.photo }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} /> :
          <Icon name='account-circle' size={100} color={styles._white} />
        }
          <Text style={[styles.fs4, styles.textWhite]}>{data.firstName}</Text>
        </View>
        <View style={[styles.bgWhite, styles.pt2,]}>
          <DrawerItemList {...props} />
        </View>

        <View style={[{ marginTop: 100, padding: 20, borderTopWidth: 1, borderColor: "#ccc" }]}>
          <TouchableOpacity onPress={share} style={[, { paddingVertical: 15 }]}>
            <View style={[styles.flexRow, styles.alignItemsCenter]}>
              <Icon name='share' size={22} color={styles._black} />
              <Text style={[styles.textBlack, { fontSize: 15, marginLeft: 5 }]}>Tell a Friend</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut} style={[, { paddingVertical: 15 }]}>
            <View style={[styles.flexRow, styles.alignItemsCenter]}>
              <Icon name='logout' color={styles._black} size={22} />
              <Text style={[styles.textBlack, { fontSize: 15, marginLeft: 5 }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer