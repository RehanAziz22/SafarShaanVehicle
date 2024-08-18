import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import styles from '../style'
import QRCode from 'react-native-qrcode-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

const QRScreen = ({ navigation, route }) => {
    const [bike, setBike] = useState(route.params?.bike || []); // Accessing bikes from route.params
  const [isLoading, setLoader] = useState(false);
  const [qrStatus,setQRStatus] = useState(false)
    console.log(bike)


    const startRide = ()=>{
        navigation.navigate('Parent', { bike: bike });
        
    }
    return (
        <View style={[styles._black, styles.bgWhite, styles.h100, styles.flexCenter]}>
            <Text style={[styles.textBlack, styles.fs2, styles.mt3,styles.mb5, styles.textBold,styles.textCenter]}>Scan QR Code From Your Mobile App</Text>
            <QRCode
                value={bike.plateNo}
                size={200} />
            <Text>{bike.plateNo}</Text>
            <TouchableOpacity onPress={startRide} style={[styles.AppBg1, styles.w100, styles.btn]}>
            <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isLoading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Start Ride"}</Text>
          </TouchableOpacity>

        </View>
    )
}

export default QRScreen