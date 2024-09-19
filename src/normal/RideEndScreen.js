import { View, Text, ToastAndroid, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../style'
import { Image } from 'react-native'
import imagePath from '../constants/imagePath'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { bikesDetails } from '../constants/dummybikedata'
import { BASE_URL } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { addBike } from '../store/slices/BikeSlice'


const RideEndScreen = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState()
  // const [rideDetails, setRideDetails] = useState(route.params?.rideDetails || [])

  const { rideDetails } = route.params;
  const getbike = useSelector((state) => {
    return state.bike;
  })

  useEffect(() => {
    // Set up an interval to call the function every 10 seconds
    console.log(rideDetails)
    const navigationIntervalId = setInterval(() => {
      completeRide();
    }, 10000);
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Handle the back button press, do nothing
      return true; // This disables the back button
    });
    return () => {
      clearInterval(navigationIntervalId);
      backHandler.remove();
    };


  }, [])


  // const completeRide = async () => {
  //   setLoader(true)

  //   axios.get(`${BASE_URL}bike/${getbike._id}`)
  //     .then((response) => {
  //       const { success, data } = response.data;
  //       // console.log(response)
  //       if (success) {
  //         dispatch(addBike(data));
  //         navigation.replace("QRScreen")
  //         setLoader(false)
  //       }
  //     })
  //     .catch((error) => {
  //         setLoader(false)
  //       console.error("Error fetching bike status RideEndScreen:", error);
  //     });

  // };

  const completeRide = async () => {
    setLoader(true);
    setError(null); // Reset error state before making the call

    try {
      const response = await axios.get(`${BASE_URL}bike/${getbike._id}`);
      const { success, data } = response.data;

      if (success) {
        dispatch(addBike(data));
        navigation.replace("Splash"); // Navigate only on success
      } else {
        setError("Failed to complete the ride. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching bike status RideEndScreen:", error);
      setError("An error occurred while updating the bike status and location.");
    } finally {
      setLoader(false); // Ensure loader stops in both success and error cases
    }
  };

  return (
    // dropAddress && 
    <View style={[styles.AppBg1, styles.h100, styles.alignItemsCenter, styles.justifyContentCenter]}>
      <View style={[styles.positionRelative, styles.w100, styles.alignItemsCenter]}>

        {/* <Image source={imagePath.logo} style={[styles.positionAbsolute, { zIndex: 10, width: 70, height: 70, top: -30, borderRadius: 10, }]} /> */}
        <View style={[styles.shadow6, styles.w90, styles.bgWhite, styles.p1, styles.rounded, styles.alignItemsCenter]}>
          <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentCenter]}>

            <Image source={imagePath.logo} style={[{ width: 70, height: 70, borderRadius: 10, }]} />
            <Text style={[styles.fs1, styles.textBlack, styles.textBold, styles.my3]}>Ride Complete!</Text>
          </View>



          {/* ---------------Border  */}
          <View style={[styles.w25, styles.px2, styles.borderTop5, styles.borderGrey]}>
          </View>
          {/* -------------=--DISTANCE AND TIME */}
          <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter, styles.w100, styles.px2, styles.py3]}>
            <View style={[styles.alignItemsStart]}>
              <Text style={[styles.fs3, styles.textBlack, styles.textBold]}>{rideDetails.distanceKm + " Km"}</Text>
              <Text style={[ styles.textGrey,{fontSize:14}]}>Total travel distance</Text>
            </View>
            <View style={[styles.alignItemsEnd]}>
              <Text style={[styles.fs3, styles.textBlack, styles.textBold]}>{rideDetails.rideTime + " min"}</Text>
              <Text style={[styles.fs5, styles.textGrey,{fontSize:14}]}>Total travel time</Text>
            </View>
          </View>
          {/* -------------- FARE--------- */}

          {/* =========note */}
          <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.w100, styles.pb3, styles.p1]}>
            <Text style={[styles.textGrey, styles.textCenter]}>Note: Fare Charegs is calculated on total time and distance traveled by the rider</Text>
          </View>
          <View style={[styles.bgGreen, styles.p2, styles.w100, styles.alignItemsCenter]}>
            <TouchableOpacity onPress={completeRide} style={[styles.w100]}>
              <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isLoading ? <ActivityIndicator color={styles._white} size={"small"} /> : "Done"}</Text>
            </TouchableOpacity>
          </View>
          {error &&
            <Text style={[styles.textDanger, styles.textCenter]}>{error}</Text>
          }
        </View>
      </View>
    </View>
  )
}

export default RideEndScreen;