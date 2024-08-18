import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TextInput, ToastAndroid, TouchableOpacity, Image, View, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import styles from '../style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/UserSlice';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { requestLocationPermission } from '../components/HelperFunctions';
import { addBike } from '../store/slices/BikeSlice';
import imagePath from '../constants/imagePath';

export default function Login({ navigation, route }) {
  const dispatch = useDispatch();
  const [bikes, setBikes] = useState(route.params?.bikes || []); // Accessing bikes from route.params
  const [plateNo, setPlateNo] = useState('TRQ-010');
  const [password, setPassword] = useState('TRQ-010');
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    setError("")
    if (bikes.length === 0) {
      fetchBikes(); // Fetch bikes if not passed from Splash
    }

    // getLocPermission()
    getCurrentLocation()
    // requestLocationPermission()
    // GoogleSignin.configure()
    // fetchBikes();

  }, [])
  const fetchBikes = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`https://safar-shaan-backend-l4fo.vercel.app/api/bikes`);
      setBikes(res.data);
      setLoader(false);
    } catch (error) {
      setError(error.message || 'Error fetching bikes');
      setLoader(false);
    }
  };

  const getLocPermission = async () => {
    const locPermissionDenied = await requestLocationPermission()
    console.log("location Permission", locPermissionDenied)
  }

  const getCurrentLocation = () => {
    getLocPermission()
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
        setError("Unable to fetch location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const addLoginBike = (payload) => {
    dispatch(addBike(payload))
    // navigation.navigate("Parent")
  }
  // const loginBike = () => {

  //   setLoader(true);
  //   setError(null);

  //   // Find the bike with the matching plate number
  //   const bike = bikes.find(bike => bike.plateNo === plateNo);

  //   if (!bike) {
  //     setError("Bike not found");
  //     setLoader(false);
  //     return;
  //   }

  //   if (plateNo !== password) {
  //     setError("Plate number and password do not match");
  //     setLoader(false);
  //     return;
  //   }

  //   // If bike is found and password matches, dispatch the bike and navigate to Home screen
  //   // dispatch(addBike(bike));
  //   // setLoader(false);
  //   // console.log(bike)
  //   // navigation.navigate('Parent', { bike });
  //   // const objToSend = {
  //   //   plateNo: plateNo,
  //   // }

  //   if (currentLocation) {
  //     try {
  //       const objToSend = {
  //         location: {
  //           latitude: currentLocation.latitude,
  //           longitude: currentLocation.longitude,
  //         },
  //         status: "active", // You can add additional fields as required
  //       };

  //       console.log(objToSend.location)

  //       axios.patch(`http://localhost:8000/api/bike/status-location/${bike._id}`, objToSend)
  //         .then((response) => {
  //           // setBikes(response.data);
  //           console.log(response.data);
  //           // navigation.navigate('Login', { bikes: response.data });
  //           // console.log("navigated")
  //           const { success, message, data } = res.data;
  //           if (success) {
  //             ToastAndroid.show(message, ToastAndroid.SHORT);
  //             dispatch(addBike(data));
  //             navigation.navigate('Parent', { bike: data });
  //           } else {
  //             setError(res.data.message);
  //           }
  //           setLoader(false);
  //         }).catch((error) => {
  //           console.log(error, "error");
  //           setError("An error occurred while updating the bike location.");
  //           setLoader(false);
  //         });

  //     } 
  //   } else {
  //     setError("Current location not available.");
  //     dispatch(addBike(data));
  //     navigation.navigate('Parent', { bike: data });
  //   }

  //   setLoader(false);
  // };

  const loginBike = () => {
    setLoader(true);
    setError(null);

    // Find the bike with the matching plate number
    const bike = bikes.find((bike) => bike.plateNo === plateNo);

    if (!bike) {
      setError("Bike not found");
      setLoader(false);
      return;
    }

    if (plateNo !== password) {
      setError("Plate number and password do not match");
      setLoader(false);
      return;
    }

    // If bike is found and password matches
    if (currentLocation) {
      const objToSend = {
        location: {
          coordinates: [
            currentLocation.latitude,
            currentLocation.longitude
          ]
        },
        status: "active", // Additional fields can be added as required
      };

      axios
        .patch(`${BASE_URL}bike/status-location/${bike._id}`, objToSend)
        .then((response) => {
          const { success, message, data } = response.data;
          if (success) {
            dispatch(addBike(data));
            navigation.navigate('QRScreen', { bike: data });
            console.log("========================================", data, "=====> loc updated data")
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            setError(message);
          }
          setLoader(false);
        })
        .catch((error) => {
          console.error(error);
          setError("An error occurred while updating the bike location.");
          setLoader(false);
        });
    } else {
      setError("Current location not available.");
      setLoader(false);
    }
  };

  return (<>
    <View style={[styles._black, styles.bgWhite, styles.h100,]}>
      {/* <Image source={{ uri: "https://img.icons8.com/doodle/480/null/pizza--v1.png" }} style={{ width: 200, height: 200 }} /> */}
      <View style={[styles.bgWhite, styles.w100, styles.flexCenter, styles.mt4, { height: 250 }]} >
        {/* <Text style={[styles.textBlack, styles.fs1, styles.mb4, styles.w100, styles.textCenter, styles.mb2, styles.textBold]}>SAFAR SHAAN BIKE</Text> */}
        <Image source={imagePath.logo} style={{ width: 300, height: 300 }} />
      </View>
      <View >
        <View style={[styles.px3]}>
          <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.textBold]}>Enter Bike Plate No</Text>
          <TextInput placeholderTextColor={styles._black} placeholder='MAH-1112' onChangeText={(e) => { setPlateNo(e) }} style={[styles.my1, styles.fs3, styles.textBlack, styles.w100, styles.border1, styles.rounded, styles.px2]} />
          <Text style={[styles.textBlack, styles.fs2, styles.mt3, styles.textBold]}>Enter Password</Text>
          <TextInput placeholderTextColor={styles._black} placeholder='********' onChangeText={(e) => { setPassword(e) }} style={[styles.my1, styles.fs3, styles.textBlack, styles.w100, styles.border1, styles.rounded, styles.px2]} />
          <Text style={[styles.textDanger, styles.fs5, styles.textCenter, styles.mb2]}>{error ? error : ""}</Text>
          <TouchableOpacity onPress={loginBike} style={[styles.AppBg1, styles.w100, styles.btn]}>
            <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isLoading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Continue"}</Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  </>
  )
}
