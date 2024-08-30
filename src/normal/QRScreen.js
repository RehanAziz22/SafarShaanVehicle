import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../style'
import QRCode from 'react-native-qrcode-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { addBike } from '../store/slices/BikeSlice'
import Geolocation from 'react-native-geolocation-service';

const QRScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [bike, setBike] = useState(route.params?.bike || []); // Accessing bikes from route.params
    const [isLoading, setLoader] = useState(false);
    const [error, setError] = useState()
    const [currentLocation, setCurrentLocation] = useState({})
    const [qrStatus, setQRStatus] = useState(false)
    const [isRideStart, setRideStart] = useState(true)
    const getbike = useSelector((state) => {
        return state.bike;
    })
    console.log(getbike, "=======QRScreen")
    
    useEffect(() => {
        
        setError(null); // Reset error state before making the call
        // Function to check bike status every 10 seconds
        const intervalId = setInterval(() => {
            setError(null); // Reset error state before making the call

            getLiveLocation();
            if (isRideStart) {
                checkRideStatus();
            }
        }, 5000); // 10 seconds
        setBike(getbike)
        
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    
    const getLiveLocation = async () => {
        let res = await getCurrentLocation()
    }
    getLiveLocation();

    const getCurrentLocation = () => {

        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, speed } = position.coords;

                // Update currentLocation state
                setCurrentLocation({
                    latitude,
                    longitude,
                });

                const objToSend = {
                    location: {
                        coordinates: [
                            latitude,
                            longitude,
                        ]
                    },
                };

                axios
                    .patch(`${BASE_URL}bike/status-location/${bike._id}`, objToSend)
                    .then((response) => {
                        const { success, message, data } = response.data;
                        if (success) {
                            console.log("=============================================> status updated qrsCREEN")
                        } else {
                            setError(message);
                        }
                        // setLoader(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("An error occurred while updating the bike status and location.");
                        // setLoader(false);
                    });

            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const checkRideStatus = () => {
        axios.get(`${BASE_URL}bike/${getbike._id}`)
            .then((response) => {
                const { success, data } = response.data;
                // console.log(response)
                if (success) {
                    if (data.rideStartEnd) {
                        setRideStart(false)
                        setLoader(true)
                        const objToSend = {
                            // location: {
                            //     coordinates: [
                            //         currentLocation.latitude,
                            //         currentLocation.longitude,
                            //     ]
                            // },
                            status: "in_use",
                            markerVisible: false // Additional fields can be added as required
                        };

                        axios
                            .put(`${BASE_URL}bike/${bike._id}`, objToSend)
                            .then((response) => {
                                const { success, message, data } = response.data;
                                if (success) {
                                    dispatch(addBike(data));
                                    console.log("======================navigating to App Map========================================", data, "=====> status updated data")

                                    navigation.replace('Parent', { bike: bike });
                                    setRideStart(true)
                                    ToastAndroid.show(`qr message ${message}`, ToastAndroid.SHORT);
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

                        // startRide(); // Start ride if rideStartEnd is true
                        // setBike(data); // Update bike state with the latest data
                        // ToastAndroid.show(`rideStart`, ToastAndroid.SHORT);
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching bike status QRScreen:", error);
            });
    };


    const startRide = () => {
        setLoader(true);
        setError(null);
        // navigation.navigate('Parent', { bike: bike });

        // setLoader(false)
        if (bike && bike.rentedBy) {



            // If bike is found and password matches


        };
    }
    return (
        <View style={[styles._black, styles.bgWhite, styles.h100, styles.flexCenter, styles.w100]}>
            <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.mb5, styles.textBold, styles.textCenter]}>Scan QR Code From Your Mobile App</Text>
            <QRCode
                value={bike.plateNo}
                size={200} />
            <Text>{bike.plateNo}</Text>
            {isLoading && <ActivityIndicator color={styles.AppColorDark} size={40} />}
            {error &&
                <Text style={[styles.textDanger]}>{error}</Text>
            }
        </View>
    )
}

export default QRScreen