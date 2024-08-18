import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TextInput, ToastAndroid, TouchableOpacity, Image, View, PermissionsAndroid } from 'react-native'
import styles from '../style'
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/UserSlice';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function Signup({ navigation }) {
  const dispatch = useDispatch()
  let [phoneNo, setPhoneNo] = useState('92')
  let [error, setError] = useState()
  //   let [password, setPassword] = useState('')
  let [isloading, setLoader] = useState(false)
  let [isSignup, setIsSignup] = useState(false)
  let [user, setUser] = useState()
  
  const et1 = useRef()
  const et2 = useRef()
  const et3 = useRef()
  const et4 = useRef()
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');

  const [count, setCount] = useState(60)
  useEffect(() => {
    requestLocationPermission()
  }, [])


  const addSignupUser = (payload) => {
    dispatch(addUser(payload))
    // navigation.navigate("Parent")
  }
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'Please allow location permission to continue...',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          // getCurrentLocation()
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  let signup = () => {
    setError("")
    setLoader(true)
    console.log(phoneNo)
    const objToSend = {
      mobileNumber: phoneNo,
    }

    axios.post(`${BASE_URL}signup`, objToSend)
      .then((res) => {
        console.log(res.data, "response");
        const { success, msg, user } = res.data
        if (success) {
          //true
          console.log(res.data)
          ToastAndroid.show(msg, ToastAndroid.SHORT)
          setLoader(false)
          addSignupUser(user)
          setUser(user)
          setIsSignup(true)
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

  let login = () => {
    navigation.navigate("Login")
  }

  useEffect(() => {
      const interval = setInterval(() => {
          if (count == 0) {
              clearInterval(interval)
          }
          else {
              setCount(count - 1)
          }
      }, 1000);
      return () => {
          clearInterval(interval)
      }
  }, [count])

  // console.log(userInfo.mobileNumber)
  const otpValidate = () => {
      setLoader(true)
      setError("")

      let enteredOtp = f1 + f2 + f3 + f4;
      const objToSend = {
          mobileNumber: user.mobileNumber,
          otp: enteredOtp

      }
      axios.post(`${BASE_URL}verify-otp`, objToSend)
          .then((res) => {
              console.log(res.data, "response");
              const { status, message, user } = res.data
              if (status) {
                  //true
                  console.log(res.data)
                  ToastAndroid.show(message, ToastAndroid.SHORT)
                  setLoader(false)
                  // addLoginUser(user)
                  navigation.navigate('createPin', user)
                  setIsSignup(false)
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
      // let otp = '1234'
      // if (enteredOtp == otp) {
      //     Alert.alert('OTP Matched')
      //     navigation.navigate('Parent')
      // }
      // else {
      //     Alert.alert('Wrong OTP')
      // }
  }
  const resendOTP = () => {
      // setLoader(true)
      setError("")
      setCount(60)
      const objToSend = {
          mobileNumber: userInfo.mobileNumber,
      }
      axios.post(`${BASE_URL}resend-otp`, objToSend)
          .then((res) => {
              console.log(res.data, "response");
              const { status, msg, data } = res.data
              if (status) {
                  //true
                  console.log(res.data)
                  ToastAndroid.show(msg, ToastAndroid.SHORT)
                  setLoader(false)
                  // addLoginUser(user)
              } else {
                  //false
                  console.log(res.data.msg)
                  // alert(res.data.message)
                  setError(res.data.msg)
                  setLoader(false)

              }
          }
          ).catch(
              (error) => { console.log(error, "error") }
          )
      // let otp = '1234'
      // if (enteredOtp == otp) {
      //     Alert.alert('OTP Matched')
      //     navigation.navigate('Parent')
      // }
      // else {
      //     Alert.alert('Wrong OTP')
      // }
  }
  return (<>
    <View style={[styles._black, styles.bgWhite, styles.h100,]}>
      <View style={[styles.AppBg1, styles.w100, styles.flexCenter, { height: 250 }]} >
        <Text style={[styles.textBlack, styles.fs1, styles.mb4, styles.w100, styles.textCenter, styles.mb2, styles.textBold]}>SAFAR SHAAN</Text>
      </View>
      {!isSignup ?
        <View>
          <View style={[styles.px3]}>
            <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.textBold]}>Enter your phone</Text>
            <Text style={[styles.textBlack, styles.fs5]}>You will receive a 4 digits code to verify your account</Text>
            <TextInput placeholderTextColor={styles._black} defaultValue='+92' placeholder='+92 0311111111' onChangeText={(e) => { setPhoneNo(e) }} keyboardType='phone-pad' style={[styles.my2, styles.fs3, styles.textBlack, styles.w100, styles.borderBottom2, styles.px2]} />
            <Text style={[styles.textDanger, styles.fs5, styles.textCenter, styles.mb2]}>{error ? error : ""}</Text>
            <TouchableOpacity onPress={signup} style={[styles.AppBg1, styles.w100, styles.btn]}>
              <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Continue"}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.px3, styles.flexRow, styles.m1, styles.justifyContentCenter]}>
            <Text style={[styles.fs5, styles.textBlack]}>Already have an account?</Text><TouchableOpacity onPress={login}><Text style={[styles.fs5, styles.textBold, { color: "#4CB1DC" }]}> Login</Text></TouchableOpacity>
          </View>
        </View>
        :
        <View style={[styles.alignItemsCenter, styles.bgWhite, { flex: 1 }]}>
       
          <Text style={[styles.textBlack, styles.fs3, styles.mt3]}>Verify Phone Number</Text>
          <Text style={[styles.textBlack, styles.fs5]}>Enter 4 digits code received on your phone</Text>
          <View style={[styles.w100, styles.px2, styles.otpView]}>
            <TextInput ref={et1} style={[styles.otpInput]} value={f1} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF1(txt); if (txt.length >= 1) { et2.current.focus() } else if (txt.length < 1) { et1.current.focus() } }} />
            <TextInput ref={et2} style={[styles.otpInput]} value={f2} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF2(txt); if (txt.length >= 1) { et3.current.focus() } else if (txt.length < 1) { et1.current.focus() } }} />
            <TextInput ref={et3} style={[styles.otpInput]} value={f3} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF3(txt); if (txt.length >= 1) { et4.current.focus() } else if (txt.length < 1) { et2.current.focus() } }} />
            <TextInput ref={et4} style={[styles.otpInput]} value={f4} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF4(txt); if (txt.length >= 1) { et4.current.focus() } else if (txt.length < 1) { et3.current.focus() } }} />
          </View>
          <View style={[styles.w100, styles.p2, styles.alignItemsCenter,]}>
            {count == 0 &&

              (<Text style={[styles.fs3, { color: count == 0 ? "#4CB1DC" : "black" }]} onPress={resendOTP}>Resend OTP</Text>)
            }
            {count !== 0 &&
              (<Text style={[styles.fs3]}>{count + ' seconds'}</Text>)
            }

          </View>
          <View style={[styles.w100, styles.px2]}>

            <TouchableOpacity onPress={() => { otpValidate() }} style={[styles.AppBg1, styles.w100, styles.btn, { backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? "#4CB1DC" : "grey" }]} disabled={f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true}>
              <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Verify OTP"}</Text>
            </TouchableOpacity>
            <Text style={[styles.textDanger, styles.fs5, styles.textCenter, styles.mt2]}>{error ? error : ""}</Text>
          </View>

        </View>

      }
    </View>
  </>
  )
}
