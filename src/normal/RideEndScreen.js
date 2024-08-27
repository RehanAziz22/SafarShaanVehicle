import { View, Text, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../style'
import { Image } from 'react-native'
import imagePath from '../constants/imagePath'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'
import { bikesDetails } from '../constants/dummybikedata'
import { BASE_URL } from '../../config'
import { useDispatch } from 'react-redux'
import { addBike } from '../store/slices/BikeSlice'


const RideEndScreen = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const [rideDetails, setRideDetails] = useState(route.params?.rideDetails || [])
  const [dropAddress, setDropAddress] = useState(null); // State to store address
  console.log(rideDetails)
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState()


  useEffect(() => {
    const getLocationAddress = async () => {
      try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${rideDetails.currentLocation.latitude}&lon=${rideDetails.currentLocation.longitude}&apiKey=c62a11476cdf4d0b8da38ef393c421bc`);
        const properties = response.data.features[0].properties;
        setDropAddress(properties.formatted); // Set the formatted address
        console.log(properties, "Drop Location properties");
      } catch (error) {
        console.error("Error fetching location address:", error);
      }
    };

    getLocationAddress()

    // Set up an interval to call the function every 10 seconds
    const navigationIntervalId = setInterval(() => {
      completeRide();
    }, 120000);
    return () => {
      clearInterval(navigationIntervalId);
    };


  }, [])


  // const completeRide = () => {
  //   axios
  //     .get(`${BASE_URL}bike/${rideDetails._id}`)
  //     .then((response) => {
  //       const { data } = response.data;
  //       const currentRideHistory = data.rideHistory || [];
  //       const currentFuelLevel = data.fuelLevel;
  //       const currentFuelConsumption = data.fuelConsumption || [];

  //       const newFuelConsumptionEntry = {
  //         timestamp: new Date().toISOString(),
  //         fuelLevel: rideDetails.fuelLevel,
  //       };
  //       const updatedFuelConsumption = [...currentFuelConsumption, newFuelConsumptionEntry];

  //       // Create the new ride object
  //       const newRide = {
  //         startTime: rideDetails.startTime,
  //         endTime: rideDetails.endTime,
  //         distance: rideDetails.distance,
  //         duration: rideDetails.rideTime,
  //         price: rideDetails.fare,
  //       };

  //       // Append the new ride to the existing ride history
  //       const updatedRideHistory = [...currentRideHistory, newRide];

  //       // Prepare the data object to send in the PUT request
  //       const objToSend = {
  //         rideHistory: updatedRideHistory,
  //         status: "available",
  //         markerVisible: true,
  //         fuelLevel: newFuelLevel,
  //         fuelConsumption: updatedFuelConsumption,
  //       };

  //       // Send the PUT request to update the bike data
  //       return axios.put(`${BASE_URL}bike/${rideDetails._id}`, objToSend);
  //     })
  //     .then((response) => {
  //       const { success, message, data } = response.data;
  //       if (success) {
  //         dispatch(addBike(data));
  //         ToastAndroid.show(message, ToastAndroid.SHORT);
  //         navigation.navigate("QRScreen");
  //       } else {
  //         setError(message);
  //       }
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError("An error occurred while updating the bike status and location.");
  //       setLoader(false);
  //     });
  // };

  const completeRide = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${BASE_URL}bike/${rideDetails._id}`);
      const { data } = response.data;
  
      const currentRideHistory = data.rideHistory || [];
      const currentFuelConsumption = data.fuelConsumption || [];
  
      const newFuelConsumptionEntry = {
        timestamp: new Date().toISOString(),
        fuelLevel: rideDetails.fuelLevel,
      };
  
      const updatedFuelConsumption = [...currentFuelConsumption, newFuelConsumptionEntry];
  
      const newRide = {
        startTime: rideDetails.startTime,
        endTime: rideDetails.endTime,
        pickUpAddress:rideDetails.pickupAddress,
        destinationAddress:dropAddress,
        distance: rideDetails.distance,
        duration: rideDetails.rideTime,
        price: rideDetails.fare,
        pickUpCoordinates:[rideDetails.pickuplocationCords.latitude,rideDetails.pickuplocationCords.longitude],
        pickUpCoordinates:[rideDetails.currentLocation.latitude,rideDetails.currentLocation.longitude],
        rentedBy:rideDetails.rentedBy
      };
  
      const updatedRideHistory = [...currentRideHistory, newRide];
  
      const objToSend = {
        rideHistory: updatedRideHistory,
        status: "available",
        markerVisible: true,
        fuelLevel: rideDetails.fuelLevel,
        fuelConsumption: updatedFuelConsumption,
      };
  
      const updateResponse = await axios.put(`${BASE_URL}bike/${rideDetails._id}`, objToSend);
  
      const { success, message, data: updatedBike } = updateResponse.data;
      if (success) {
        dispatch(addBike(updatedBike));
        ToastAndroid.show(message, ToastAndroid.SHORT);
        navigation.navigate("QRScreen");
      } else {
        setError(message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the bike status and location.");
    } finally {
      setLoader(false);
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


          {/* ========= */}
          <View style={[styles.w100, styles.p2, styles.borderTop1, styles.borderGrey,]}>
            <View style={[styles.flexRow, styles.justifyContentStart, styles.alignItemsCenter, styles.mb1]}>
              <Icon color="green" size={30} name={"share-location"} />
              <Text style={[styles.fs4, styles.textBlack, styles.ms1]}>{dropAddress ?? "Drop Address"}</Text>
            </View>
            <View style={[styles.flexRow, styles.justifyContentStart, styles.alignItemsCenter]}>
              <Icon color="red" size={30} name={"my-location"} />
              <Text style={[styles.fs4, styles.textBlack, styles.ms1]}>{rideDetails.pickupAddress ?? "Pickup Address"}</Text>
            </View>
          </View>
          {/* ---------------Border  */}
          <View style={[styles.w25, styles.px2, styles.borderTop5, styles.borderGrey]}>
          </View>
          {/* -------------=--DISTANCE AND TIME */}
          <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter, styles.w100, styles.px2, styles.py3]}>
            <View style={[styles.alignItemsStart]}>
              <Text style={[styles.fs3, styles.textBlack, styles.textBold]}>{rideDetails.distanceKm + " Km"}</Text>
              <Text style={[styles.fs5, styles.textGrey]}>Total travel distance</Text>
            </View>
            <View style={[styles.alignItemsEnd]}>
              <Text style={[styles.fs3, styles.textBlack, styles.textBold]}>{rideDetails.rideTime + " min"}</Text>
              <Text style={[styles.fs5, styles.textGrey]}>Total travel time</Text>
            </View>
          </View>
          {/* -------------- FARE--------- */}
          <View style={[styles.justifyContentCenter, styles.alignItemsCenter, styles.w100, styles.py2, styles.p1]}>
            <Text style={[styles.fs1, styles.textDanger, styles.textBold]}>{"Rs " + rideDetails.fare} </Text>
            <Text style={[styles.fs5, styles.textGrey]}>Total Fare</Text>
          </View>
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