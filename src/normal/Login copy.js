import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TextInput, ToastAndroid, TouchableOpacity, Image, View, PermissionsAndroid } from 'react-native'
import styles from '../style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/UserSlice';
import axios from 'axios';
import { BASE_URL } from '../../config';
import {  requestLocationPermission } from '../components/HelperFunctions';

export default function Login({ navigation }) {
  const dispatch = useDispatch()
  let [phoneNo, setPhoneNo] = useState('92')
  let [error, setError] = useState()
  let [checkNumber, setCheckNumber] = useState(false)
  //   let [password, setPassword] = useState('')
  let [isloading, setLoader] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const et1 = useRef()
  const et2 = useRef()
  const et3 = useRef()
  const et4 = useRef()
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  useEffect(() => {
    getCurrentLocation()
    // requestLocationPermission()
    GoogleSignin.configure()
  }, [])

  const getCurrentLocation = async () => {
    const locPermissionDenied = await requestLocationPermission()
    console.log("location Permission",locPermissionDenied)
  }

  const addLoginUser = (payload) => {
    dispatch(addUser(payload))
    // navigation.navigate("Parent")
  }
  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     addLoginUser(userInfo.user)
  //     // console.log("user info =>", userInfo.user)
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log(error)
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log(error)
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log(error)
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //       console.log(error)
  //     }
  //   }
  // };
  //   let login = () => {
  //     setLoader(true)
  //     auth().signInWithEmailAndPassword(email, password)
  //       .then((userCredential) => {
  //         // Signed in
  //         var userId = userCredential.user.uid;
  //         // console.log(userId)
  //         navigation.navigate("BottomNav", userId)
  //         ToastAndroid.show("Login Successfully", ToastAndroid.SHORT)
  //         setLoader(false)

  //         // ...
  //       })
  //       .catch((error) => {
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         setLoader(false)
  //       });

  //   }
  let login = () => {

    setLoader(true)
    console.log(phoneNo)
    const objToSend = {
      mobileNumber: phoneNo,
    }

    axios.post(`${BASE_URL}login`, objToSend)
      .then((res) => {
        console.log(res.data, "response");
        const { status, message, user } = res.data
        if (status) {
          //true
          console.log(res.data)
          ToastAndroid.show(message, ToastAndroid.SHORT)
          setLoader(false)
          addLoginUser(user)
          setUserInfo(user)
          setCheckNumber(true)
          // navigation.navigate('OTPScreen',user)
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
    // axios.get(`${BASE_URL}/api/signup`,objToSend).then((res) => {
    //   console.log(res.data)
    // }).catch(
    //   (error) => { console.log(error, "error") }
    // )
    // navigation.navigate('Parent')
  }
  let pinValidate = () => {
    setLoader(true)
    let enteredPin = f1 + f2 + f3 + f4;
    // console.log(userInfo)
    const objToSend = {
      id: userInfo._id,
      pin: enteredPin
    }

    axios.post(`${BASE_URL}verify-pin`, objToSend)
      .then((res) => {
        console.log(res.data, "response");
        const { status, message, user } = res.data
        if (status) {
          //true
          console.log(res.data)
          setLoader(false)
          navigation.navigate('Parent', user)
          ToastAndroid.show(message, ToastAndroid.SHORT)
          setCheckNumber(false)
          setF1('')
          setF2('')
          setF3('')
          setF4('')
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
  let signup = () => {
    navigation.navigate("Signup")
  }
  return (<>
    <View style={[styles._black, styles.bgWhite, styles.h100,]}>
      {/* <Image source={{ uri: "https://img.icons8.com/doodle/480/null/pizza--v1.png" }} style={{ width: 200, height: 200 }} /> */}
      <View style={[styles.AppBg1, styles.w100, styles.flexCenter, { height: 250 }]} >
        <Text style={[styles.textBlack, styles.fs1, styles.mb4, styles.w100, styles.textCenter, styles.mb2, styles.textBold]}>SAFAR SHAAN</Text>
      </View>
      {!checkNumber ? <View >
        <View style={[styles.px3]}>
          <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.textBold]}>Enter your phone</Text>
          <TextInput placeholderTextColor={styles._black} defaultValue='+92' placeholder='+92 0311111111' onChangeText={(e) => { setPhoneNo(e) }} keyboardType='phone-pad' style={[styles.my2, styles.fs3, styles.textBlack, styles.w100, styles.borderBottom2, styles.px2]} />
          <Text style={[styles.textDanger, styles.fs5, styles.textCenter, styles.mb2]}>{error ? error : ""}</Text>
          {/* <TextInput placeholder='**********' onChangeText={(e) => { setPassword(e) }} placeholderTextColor={"black"} style={[styles.mb2, styles.textBlack, styles.input, styles.px2]} secureTextEntry={true} /> */}
          <TouchableOpacity onPress={login} style={[styles.AppBg1, styles.w100, styles.btn]}>
            <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Continue"}</Text>
            {/* <Icon color="black" size="30" name="facebook" /> */}

          </TouchableOpacity>
          {/* <TouchableOpacity onPress={googleLogin} style={[styles.AppBg1, styles.w100, styles.btn]}>
          <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Google Login"}</Text>
          <Icon color="black" size="30" name="facebook" />

        </TouchableOpacity> */}
          {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleLogin}
        // disabled={this.state.isSigninInProgress}
        /> */}
          {/* <View style={[styles.flexRow]}>
        <Text style={[styles.textLight, styles.fs6, styles.flexCenter, styles.fs6]}>Are you new here?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}><Text style={[styles.mx1, styles.textBlack, styles.textBold, styles.fs6]}>Signup</Text></TouchableOpacity>
      </View> */}
        </View>
        <View style={[styles.px3, styles.flexRow, styles.m1, styles.justifyContentCenter]}>
          <Text style={[styles.fs5, styles.textBlack]}>Create an account?</Text><TouchableOpacity onPress={signup}><Text style={[styles.fs5, styles.textBold, { color: "#4CB1DC" }]}> Signup</Text></TouchableOpacity>
        </View>
      </View> : <View style={[styles.alignItemsCenter, styles.bgWhite, { flex: 1 }]}>

        <Text style={[styles.textBlack, styles.fs3, styles.mt3]}>Enter Your 4 Digit Pin</Text>
        {/* <Text style={[styles.textBlack, styles.fs5]}>Enter 4 digits code received on your phone</Text> */}
        <View style={[styles.w100, styles.px2, styles.otpView]}>
          <TextInput ref={et1} style={[styles.otpInput]} value={f1} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF1(txt); if (txt.length >= 1) { et2.current.focus() } else if (txt.length < 1) { et1.current.focus() } }} />
          <TextInput ref={et2} style={[styles.otpInput]} value={f2} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF2(txt); if (txt.length >= 1) { et3.current.focus() } else if (txt.length < 1) { et1.current.focus() } }} />
          <TextInput ref={et3} style={[styles.otpInput]} value={f3} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF3(txt); if (txt.length >= 1) { et4.current.focus() } else if (txt.length < 1) { et2.current.focus() } }} />
          <TextInput ref={et4} style={[styles.otpInput]} value={f4} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF4(txt); if (txt.length >= 1) { et4.current.focus() } else if (txt.length < 1) { et3.current.focus() } }} />
        </View>

        <View style={[styles.w100, styles.px2, styles.mt4]}>

          <TouchableOpacity onPress={() => { pinValidate() }} style={[styles.AppBg1, styles.w100, styles.btn, { backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? "#4CB1DC" : "grey" }]} disabled={f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true}>
            <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Verify PIN"}</Text>
          </TouchableOpacity>
          <Text style={[styles.textDanger, styles.fs5, styles.textCenter, styles.mt2]}>{error ? error : ""}</Text>
        </View>

      </View>}

    </View>
  </>
  )
}
