import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TextInput, ToastAndroid, TouchableOpacity, Image, View, PermissionsAndroid } from 'react-native'
import styles from '../style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/UserSlice';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function AddSignupDetails({ navigation }) {
    const dispatch = useDispatch()
    let [phoneNo, setPhoneNo] = useState('92')
    let [error, setError] = useState()
    //   let [password, setPassword] = useState('')
    let [isloading, setLoader] = useState(false)
    useEffect(() => {
        requestLocationPermission()
        GoogleSignin.configure()
    }, [])


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

    let login = () => {

        setLoader(true)
        console.log(phoneNo)
        const objToSend = {
            mobileNumber: phoneNo,
        }

        axios.post(`${BASE_URL}login`, objToSend)
            .then((res) => {
                console.log(res.data, "response");
                const { success, msg, user } = res.data
                if (success) {
                    //true
                    console.log(res.data)
                    ToastAndroid.show(msg, ToastAndroid.SHORT)
                    setLoader(false)
                    addLoginUser(user)
                    navigation.navigate('OTPScreen', user)
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

    let signup = () => {
        navigation.navigate("Signup")
    }
    return (<>
        <View style={[styles._black, styles.bgWhite, styles.h100,]}>
            {/* <Image source={{ uri: "https://img.icons8.com/doodle/480/null/pizza--v1.png" }} style={{ width: 200, height: 200 }} /> */}
            <View style={[styles.AppBg1, styles.w100, styles.flexCenter, { height: 250 }]} >
                <Text style={[styles.textBlack, styles.fs1, styles.mb4, styles.w100, styles.textCenter, styles.mb2, styles.textBold]}>SAFAR SHAAN</Text>
            </View>
            <View style={[styles.px3]}>

                <TextInput placeholderTextColor={"black"} placeholder='email@gmail.com' onChangeText={(e) => { setEmail(e) }} style={[styles.mb2, styles.textBlack, styles.input, styles.px2]} />
                <TextInput placeholder='**********' onChangeText={(e) => { setPassword(e) }} placeholderTextColor={"black"} style={[styles.mb2, styles.textBlack, styles.input, styles.px2]} secureTextEntry={true} />

                <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.textBold]}>Enter your phone</Text>
                <Text style={[styles.textBlack, styles.fs5]}>You will receive a 4 digits code to verify your account</Text>
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
            <View>
                <Text>Create an account?</Text><TouchableOpacity onPress={signup}><Text>Signup</Text></TouchableOpacity>
            </View>

        </View>
    </>
    )
}
