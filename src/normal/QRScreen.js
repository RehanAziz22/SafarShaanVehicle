import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import styles from '../style'
import QRCode from 'react-native-qrcode-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { useDispatch } from 'react-redux'
import { addBike } from '../store/slices/BikeSlice'

const QRScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [bike, setBike] = useState(route.params?.bike || []); // Accessing bikes from route.params
    const [isLoading, setLoader] = useState(false);
    const [error, setError] = useState()
    const [qrStatus, setQRStatus] = useState(false)
    console.log(bike)
    // const bike = useSelector((state) => {
    //     return state.bike;
    // })

    const startRide = () => {
        setLoader(true);
        setError(null);
        // navigation.navigate('Parent', { bike: bike });

        // setLoader(false)
        if (bike && bike.rentedBy) {



            // If bike is found and password matches
            const objToSend = {
                // location: {
                //     coordinates: [
                //       bike.location.coordinates[0],
                //       bike.loaction.coordinates[1]
                //     ]
                //   },
                status: "in_use",
                markerVisible: false // Additional fields can be added as required
            };

            axios
                .patch(`${BASE_URL}bike/status-location/${bike._id}`, objToSend)
                .then((response) => {
                    const { success, message, data } = response.data;
                    if (success) {
                        dispatch(addBike(data));
                        console.log("========================================", data, "=====> status updated data")
                        navigation.navigate('Parent', { bike: bike });
                        ToastAndroid.show(message, ToastAndroid.SHORT);
                    } else {
                        setError(message);
                    }
                    setLoader(false);
                })
                .catch((error) => {
                    console.error(error);
                    setError("An error occurred while updating the bike status and location.");
                    setLoader(false);
                });

        };
    }
    return (
        <View style={[styles._black, styles.bgWhite, styles.h100, styles.flexCenter,styles.w100]}>
            <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.mb5, styles.textBold, styles.textCenter]}>Scan QR Code From Your Mobile App</Text>
            <QRCode
                value={bike.plateNo}
                size={200} />
            <Text>{bike.plateNo}</Text>
            <TouchableOpacity onPress={startRide} style={[styles.AppBg1, styles.w100,styles.my2, styles.btn]}>
                <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isLoading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Start Ride"}</Text>
            </TouchableOpacity>
            {error &&
                <Text style={[styles.textDanger]}>{error}</Text>
            }
        </View>
    )
}

export default QRScreen