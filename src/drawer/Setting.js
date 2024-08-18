import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import ToggleDrawerButton from '../components/ToggleDrawerButton'
import ToggleBackButton from '../components/ToggleBackButton'
import styles from '../style'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { addUser } from '../store/slices/UserSlice'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'


const Setting = () => {
  const navigation = useNavigation();
  let dispatch = useDispatch()
  let [firstName, setFirstName] = useState('')
  let [error, setError] = useState()
  const [userInfo, setUserInfo] = useState()
  const [id, setUserid] = useState()
  let [isloading, setLoader] = useState(false)
  const [mobileNumber, setMobileNumber] = useState()
  let [email, setEmail] = useState('')
  const [editDetails, setEditDetails] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  })
  console.log(user, "user from redux")
  useEffect(() => {
    getLocalUser()
  }, [])
  let getLocalUser = () => {
    setUserInfo(user)
    setFirstName(user.firstName)
    setEmail(user.email)
    setUserid(user._id)
    setMobileNumber(user.mobileNumber)
  }


  const handleEdit = () => {
    if (!editDetails) {
      setEditDetails((e) => !e)
    }
    if (editDetails) {
      console.log(firstName, email, "user Updated")
      const objToSend = {
        id: userInfo._id,
        firstName,
        email
      }
      axios.put(`${BASE_URL}user`, objToSend)
        .then((res) => {
          console.log(res.data, "response");
          const { status, message, data } = res.data
          if (status) {
            //true
            console.log(res.data)
            ToastAndroid.show(message, ToastAndroid.SHORT)
            dispatch(addUser(data))
            setFirstName(data.firstName)
            setEmail(data.email)
            setEditDetails((e) => !e)
            setUserInfo(data)
            setLoader(false)
          } else {
            //false
            console.log(res.data.message)
            // alert(res.data.message)
            setError(res.data.message)
            setLoader(false)

          }
        }
        ).catch(
          (error) => { console.log(error, "error") }
        )

    }
  }
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const userIdToDelete = useSelector((state) => state.user._id)
  const confirmDelete = () => {
    // Implement your logic to delete the user with userIdToDelete
    setLoader(true)
    const objToSend = {
      id: userIdToDelete
    }
    console.log(id ,"--------------------------------")

    // axios.delete(`${BASE_URL}user`, objToSend)
    //   .then((res) => {
    //     console.log(res.data)
    //     const { message, status } = res.data;
    //     if (status) {
    //       dispatch(removeUser())
    //       setLoader(false)
    //       navigation.navigate("Login")
    //       ToastAndroid.show(message, ToastAndroid.SHORT)
    //       setIsDeleteModalVisible(false);
    //     } else {
    //       //false
    //       console.log(res.data.message)
    //       ToastAndroid.show(message, ToastAndroid.SHORT)
    //       // alert(res.data.message)
    //       setError(res.data.message)
    //       setLoader(false)
    //       setIsDeleteModalVisible(false);
          
    //     }
    //   }
    //   ).catch(
    //     (error) => { 
    //       setIsDeleteModalVisible(false);
    //       console.log(error, "error") }
    //   )
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };
  return (
    <View style={[styles.bgLight, { flex: 1, }]}>
      <ToggleBackButton />
      <ToggleDrawerButton />
      <View style={{ flex: 1, paddingTop: 90, paddingHorizontal: 30 }}>
        <Text style={[styles.textBold, styles.fs1, styles.textBlack]}>Settings</Text>

        {/* ----------------------------- Card (edit name email------------------------------) */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.mt1]}>
          {/* -------------------- edit Name Field------------------------------------- */}
          <TouchableOpacity onPress={handleEdit}>
            <Text style={[styles.textBlack, styles.textRight, { fontSize: 15 }]}>{editDetails ? 'Update' : 'Edit'}</Text>
          </TouchableOpacity>
          <View style={[styles.borderBottom1, styles.pb2, { borderBottomColor: styles._grey }]}>
            <Text style={[styles.textBlack, styles.mb1, { fontSize: 15 }]}>Name</Text>
            {!editDetails && <Text style={[styles.fs5, styles.textBlack]}>{user.firstName ? user.firstName : "Enter name"}</Text>}
            {editDetails && <TextInput onChangeText={(e) => setFirstName(e)} style={[styles.fs5, styles.textBlack, { padding: 0 }]} value={firstName} placeholder='Enter name' />}
          </View>
          {/* -------------------- edit email Field------------------------------------- */}
          <View style={[styles.borderBottom1, styles.py2, { borderBottomColor: styles._grey }]}>
            <Text style={[styles.textBlack, styles.mb1, { fontSize: 15 }]}>Email</Text>
            {!editDetails && <Text style={[styles.fs5, styles.textBlack]}>{user.email ? user.email : "Enter email"}</Text>}
            {editDetails && <TextInput onChangeText={(e) => setEmail(e)} style={[styles.fs5, styles.textBlack, { padding: 0 }]} value={email} placeholder="Enter email" />}

          </View>
          {/* -------------------- edit phone Field------------------------------------- */}
          <View style={[styles.pt2, {}]}>
            <Text style={[styles.textBlack, { fontSize: 15 }]}>Phone</Text>
            <View
              // onPress={() => navigation.navigate('editName')}
              style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
              <Text style={[styles.fs5, styles.textBlack]}>{user.mobileNumber}</Text>
              {/* <Icon name='chevron-right' size={30} color={"black"} /> */}
            </View>

          </View>
        </View>

        {/* ------------------------ Display theme------------------------------ */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.my2]}>
          <Text style={[styles.textBlack, { fontSize: 15 }]}>Display Theme</Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate('editName')}
            style={[styles.flexRow, styles.justifyContentBetween, styles.mt1]}>
            <Text style={[styles.fs5, styles.textBlack]}>Light</Text>
            <Icon name='chevron-right' size={30} color={"black"} />
          </TouchableOpacity>
        </View>

        {/* ------------------------ Delete Account------------------------------ */}
        <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2,]}>
          <TouchableOpacity
            onPress={() => setIsDeleteModalVisible(true)}
            style={[styles.flexRow, styles.justifyContentBetween]}>
            <Text style={[styles.fs5, styles.textBlack]}>Delete Your Account</Text>
          </TouchableOpacity>
          <DeleteConfirmationModal
            isVisible={isDeleteModalVisible}
            onDelete={confirmDelete}
            isloading={isloading}
            onCancel={handleCancelDelete}
          />
        </View>

      </View>
    </View>
  )
}

export default Setting