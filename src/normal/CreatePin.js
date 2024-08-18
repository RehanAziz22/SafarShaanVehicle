import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../style'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { useDispatch, useSelector } from 'react-redux'

const CreatePin = ({navigation,props}) => {
    const dispatch = useDispatch()
    let [phoneNo, setPhoneNo] = useState('92')
    let [error, setError] = useState()
    //   let [password, setPassword] = useState('')
    let [isloading, setLoader] = useState(false)
    let [user, setUser] = useState()
    const it1 = useRef()
    const it2 = useRef()
    const it3 = useRef()
    const it4 = useRef()
    const [i1, setI1] = useState('');
    const [i2, setI2] = useState('');
    const [i3, setI3] = useState('');
    const [i4, setI4] = useState('');
  
    const et1 = useRef()
    const et2 = useRef()
    const et3 = useRef()
    const et4 = useRef()
    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');

    const userInfo = useSelector((state) => {
      return state.user;
  })
    let pinValidate = () => {
        let enteredPin = i1 + i2 + i3 + i4;
        let confirmPin = f1 + f2 + f3 + f4;
        console.log(userInfo)
        const objToSend = {
          id:userInfo._id,
          pin:confirmPin
        }
        if (enteredPin == confirmPin) {
          console.log("PIN Matched")
          axios.post(`${BASE_URL}gen-pin`, objToSend)
            .then((res) => {
              console.log(res.data, "response");
              const { status, message, user } = res.data
              if (status) {
                //true
                console.log(res.data)
                ToastAndroid.show(message, ToastAndroid.SHORT)
                setLoader(false)
                navigation.navigate('Parent', user)
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
      return (<>
        <View style={[styles._black, styles.bgWhite, styles.h100,]}>
          <View style={[styles.AppBg1, styles.w100, styles.flexCenter, { height: 250 }]} >
            <Text style={[styles.textBlack, styles.fs1, styles.mb4, styles.w100, styles.textCenter, styles.mb2, styles.textBold]}>SAFAR SHAAN</Text>
          </View>
          
            <View style={[styles.alignItemsCenter, styles.bgWhite, { flex: 1 }]}>
    
              <Text style={[styles.textBlack, styles.fs3, styles.mt3]}>Create 4 Digit Security Pin</Text>
              {/* <Text style={[styles.textBlack, styles.fs5]}>Enter 4 digits code received on your phone</Text> */}
              <View style={[styles.w100, styles.px2, styles.otpView, { marginTop: 20 }]}>
                <TextInput ref={it1} style={[styles.otpInput]} value={i1} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setI1(txt); if (txt.length >= 1) { it2.current.focus() } else if (txt.length < 1) { it1.current.focus() } }} />
                <TextInput ref={it2} style={[styles.otpInput]} value={i2} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setI2(txt); if (txt.length >= 1) { it3.current.focus() } else if (txt.length < 1) { it1.current.focus() } }} />
                <TextInput ref={it3} style={[styles.otpInput]} value={i3} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setI3(txt); if (txt.length >= 1) { it4.current.focus() } else if (txt.length < 1) { it2.current.focus() } }} />
                <TextInput ref={it4} style={[styles.otpInput]} value={i4} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setI4(txt); if (txt.length >= 1) { it4.current.focus() } else if (txt.length < 1) { it3.current.focus() } }} />
              </View>
              <Text style={[styles.textBlack, styles.fs3, styles.mt3]}>Confirm Security Pin</Text>
    
    
              <View style={[styles.w100, styles.px2, styles.otpView, { marginTop: 20 }]}>
                <TextInput ref={et1} style={[styles.otpInput]} value={f1} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF1(txt); if (txt.length >= 1) { et2.current.focus() } else if (txt.length < 1) { et1.current.focus() } }} />
                <TextInput ref={et2} style={[styles.otpInput]} value={f2} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF2(txt); if (txt.length >= 1) { et3.current.focus() } else if (txt.length < 1) { et1.current.focus() } }} />
                <TextInput ref={et3} style={[styles.otpInput]} value={f3} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF3(txt); if (txt.length >= 1) { et4.current.focus() } else if (txt.length < 1) { et2.current.focus() } }} />
                <TextInput ref={et4} style={[styles.otpInput]} value={f4} keyboardType='number-pad' maxLength={1} onChangeText={txt => { setF4(txt); if (txt.length >= 1) { et4.current.focus() } else if (txt.length < 1) { et3.current.focus() } }} />
              </View>
              <View style={[styles.w100, styles.px3, styles.mt4]}>
    
                <TouchableOpacity onPress={() => { pinValidate() }} style={[styles.AppBg1, styles.w100, styles.btn, { backgroundColor: i1 !== '' && i2 !== '' && i3 !== '' && i4 !== '' && f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? "#4CB1DC" : "grey" }]} disabled={i1 !== '' && i2 !== '' && i3 !== '' && i4 !== '' && f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true}>
                  <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Generate Pin"}</Text>
                </TouchableOpacity>
                <Text style={[styles.textDanger, styles.fs5, styles.textCenter, styles.mt2]}>{error ? error : ""}</Text>
              </View>
            </View>
        </View>
      </>
      )
}

export default CreatePin