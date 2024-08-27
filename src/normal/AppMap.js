import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Alert, Button, Image, Modal, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';
import imagePath from '../constants/imagePath';
import { enableLatestRenderer } from 'react-native-maps';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import CustomBtn from '../components/CustomBtn';
import { bikesDetails } from '../constants/dummybikedata';
import BIkeDetailsModal from '../components/BIkeDetailsModal';
// import { getCurrentLocation } from '../components/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import styles from '../style';
import axios from 'axios';


export default function AppMap() {

  enableLatestRenderer();
  const mapRef = useRef(null);
  const [pickupAddress, setPickupAddress] = useState(null); // State to store address
  const [dropAddress, setDropAddress] = useState(null); // State to store address
  const navigation = useNavigation()
  // let dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [isLoading, setLoader] = useState(false);
  const [rideEndObj, setRideEndObj] = useState();

  // Add start and end time states
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const bike = useSelector((state) => {
    return state.bike;
  })
  const [currentLocation, setCurrentLocation] = useState({})
  const [distanceKm, setDistanceKm] = useState(0);
  const [bikeSpeed, setBikeSpeed] = useState(0);
  const [rideTime, setRideTime] = useState(0); // State to track ride time
  const [fare, setFare] = useState(0); // State to track fare charges
  let farePerMin=0;
  let farePerKm=0;
  // console.log(bike, "bike from redux")
  const [state, setState] = useState({
    pickuplocationCords: {
      latitude: bike.location.coordinates[0],
      longitude: bike.location.coordinates[1],
      latitudeDelta: 0.03,
      longitudeDelta: 0.0121,
    },
    droplocationCords: {
      latitude: bike.location.coordinates[0],
      longitude: bike.location.coordinates[1],
      latitudeDelta: 0.03,
      longitudeDelta: 0.0121,
    },
    currentlocationCords: {
      latitude: bike.location.coordinates[0],
      longitude: bike.location.coordinates[1],
      // latitude: 24.860725675006115, longitude: 67.02430132223773,
      latitudeDelta: 0.03,
      longitudeDelta: 0.0121,
    }
  })
  const { pickuplocationCords, droplocationCords, currentlocationCords } = state;
  useEffect(() => {

    const start = Date.now();
    setStartTime(start);

    const timeIntervalId = setInterval(() => {
      const elapsedTime = Date.now() - start;
      const elapsedMinutes = Math.floor(elapsedTime / 60000);
      setRideTime(elapsedMinutes);
      let fareChargesMin = calFarePerMin(elapsedMinutes);
      farePerMin = fareChargesMin
      
    }, 60000);

    // Set up an interval to call the function every 10 seconds
    const locationIntervalId = setInterval(() => {
      getLiveLocation();
      console.log(farePerKm + farePerMin, "=======================")
      let totalFare = farePerKm + farePerMin 
      setFare(totalFare.toFixed(0));
      // getCurrentLocation()
    }, 10000);

    const getLocationAddress = async () => {
      try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${pickuplocationCords.latitude}&lon=${pickuplocationCords.longitude}&apiKey=c62a11476cdf4d0b8da38ef393c421bc`);
        const properties = response.data.features[0].properties;
        setPickupAddress(properties.formatted); // Set the formatted address
        console.log(properties, "Pickup Location properties");
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        Alert.alert("Error", "Unable to fetch location address. Please check your internet connection or try again later.");
      }
    };
    getLocationAddress();
    // let pickupAddress = getLocationAddress(pickuplocationCords.latitude, pickuplocationCords.longitude);
    // setPickupAddress(pickupAddress)
    // Clean up intervals when the component unmounts
    return () => {
      clearInterval(timeIntervalId);
      clearInterval(locationIntervalId);
    };
  }, []);


  const onPressLocation = () => {
    navigation.navigate('chooseLocation')
  }

  const recenterMap = () => {
    // Access the map instance and animate to the user's current location or any desired coordinates
    // mapRef.current.animateToRegion(currentlocationCords);
    mapRef.current.fitToCoordinates(
      [
        state.pickuplocationCords,
        state.droplocationCords

      ],
      {
        edgePadding: { top: -50, right: 50, bottom: 50, left: 50 },
        animated: true
      });
  };

  const getLiveLocation = async () => {
    let res = await getCurrentLocation()
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;

        // Update currentLocation state
        setCurrentLocation({
          latitude,
          longitude,
        });
        setBikeSpeed(speed)
        // Update the state with new coordinates
        setState((prevState) => ({
          ...prevState,
          currentlocationCords: {
            latitude,
            longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0121,
          },
          // Optionally update droplocationCords if necessary
          droplocationCords: {
            ...prevState.droplocationCords, // Keep other properties intact
            latitude, // or use a different value if needed
            longitude, // or use a different value if needed
          },
        }));
        let distance = getDistance(
          state.pickuplocationCords,
          { latitude, longitude }
          // { latitude: 24.860725675006115, longitude: 67.02430132223773 }
        );
        let distanceInKm = (distance / 1000)
        setDistanceKm(distanceInKm)

        let fareChargesKm = calFarePerKm(distanceInKm);
        farePerKm = fareChargesKm;

      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  // Function to calculate fare based on distance
  const calFarePerKm = (distance) => {
    const ratePerKm = distance * bike.ratePerKm;
    return ratePerKm;
  };

  const calFarePerMin = (time) => {
    const ratePerMin = time * bike.ratePerMin;
    return ratePerMin;
  };


  const endRide = () => {

    const end = Date.now();
    setEndTime(end);

    let fuelConsumed = distanceKm / bike.fuelEfficiency; // Fuel consumed in liters
    let remainingFuel = (bike.fuelLevel / 100) * bike.fuelTankCapacity - fuelConsumed; // Remaining fuel in liters
    let updatedFuelLevel = (remainingFuel / bike.fuelTankCapacity) * 100; // Convert to percentage

    // Update fuel consumption record
    let fuelConsumptionEntry = {
      fuelLevel: updatedFuelLevel.toFixed(2) // Round to 2 decimal places
    };

    let rideDetails = {
      fare,
      rideTime,
      distanceKm,
      pickupAddress,
      currentLocation,
      _id: bike._id,
      startTime,
      endTime: end,
      fuelLevel: updatedFuelLevel,
      fuelConsumption: fuelConsumptionEntry,
      pickuplocationCords,
      rentedBy:bike.rentedBy
    }


    console.log(rideDetails, "======================ride details before push clear")
    if (rideDetails) {
      navigation.navigate("RideEndScreen", { rideDetails: rideDetails })
    }
  }

  // Function to open & close the modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return <View style={[mapStyles.container, styles.positionRelative]}>
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={mapStyles.map}
      initialRegion={pickuplocationCords}
    >
      <Polyline
        coordinates={[
          state.pickuplocationCords,
          state.currentlocationCords
        ]}
        // strokeColor="#4CB1DC"// fallback for when `strokeColors` is not supported by the map-provider
        strokeColor="green"// fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={8}

        geodesic={true}
      />

      {/*
      <Marker coordinate={droplocationCords} image={imagePath.icGreenMarker} title={"DropLocations"}></Marker> */}
      <Marker coordinate={pickuplocationCords} title={"pickup location"}></Marker>
      <Marker coordinate={currentlocationCords} title={"Current location"}>
        <Image source={imagePath.icBike} style={{ width: 50, height: 50 }} />
      </Marker>
    </MapView>

    {/* Modal */}
    {modalVisible && <BIkeDetailsModal
      open={modalVisible}
      close={closeModal} modalstate={modalVisible} selectedBike={selectedBike} />}



    {/* <ToggleDrawerButton /> */}

    {/* Recenter Button */}
    <TouchableOpacity onPress={() => recenterMap()} style={[mapStyles.btn, { zIndex: 1, bottom: 350, right: 20, }]}>
      <Icon name='my-location' size={30} color={"white"} />
    </TouchableOpacity>
    {/* Speed */}
    <TouchableOpacity style={[styles.positionAbsolute, styles.bgWhite, styles.p1, styles.shadow5, styles.rounded, styles.alignItemsCenter, styles.w20, styles.h10, styles.justifyContentCenter, { zIndex: 1, top: 50, right: 20 }]}>
      <Text style={[styles.textAppColor, styles.textBold, styles.fs1,]}>{bikeSpeed.toFixed(0)}</Text>
      <Text style={[styles.textBlack, styles.textBold]}>KM/H</Text>
    </TouchableOpacity>
    {/* Time */}
    <TouchableOpacity style={[styles.positionAbsolute, styles.bgWhite, styles.p1, styles.shadow5, styles.rounded, styles.alignItemsCenter, styles.w20, styles.h10, styles.justifyContentCenter, { zIndex: 1, top: 150, right: 20 }]}>
      <Text style={[styles.textAppColor, styles.textBold, styles.fs1,]}>{rideTime}</Text>
      <Text style={[styles.textBlack, styles.textBold]}>min</Text>
    </TouchableOpacity>
    {/* Speed */}
    <TouchableOpacity style={[styles.positionAbsolute, styles.bgWhite, styles.p1, styles.shadow5, styles.rounded, styles.alignItemsCenter, styles.w20, styles.h10, styles.justifyContentCenter, { zIndex: 1, top: 250, right: 20 }]}>
      <Text style={[styles.textAppColor, styles.textBold, styles.fs1,]}>{distanceKm.toFixed(1)}</Text>
      <Text style={[styles.textBlack, styles.textBold]}>KM</Text>
    </TouchableOpacity>



    {/* Bottom Card */}

    <View style={[mapStyles.bottomCard, styles.py2, styles.alignItemsCenter, styles.shadow6, styles.w95]}>

      <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentStart, styles.w90, styles.borderBottom1, { borderColor: styles._grey }]}>
        <View style={[styles.shadow5]}>
          <Image source={imagePath.icBike} style={[{ width: 100, height: 100 }]} />
        </View>
        <View>
          <Text style={[styles.textBold, styles.textBlack, styles.fs2]}>{bike.plateNo}</Text>
          <Text style={[styles.textGrey, styles.fs4]}>{bike.model}</Text>
        </View>
      </View>

      <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentAround, styles.rounded, styles.w90, styles.border1, styles.py1, styles.my2, { borderColor: styles._grey, backgroundColor: "#F5F5F5" }]}>
        <View style={[styles.alignItemsCenter, { width: "33%" }]}>
          <Text style={[styles.textBlack, styles.textCenter, styles.fs5]}>Distance</Text>
          <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
            <Text style={[styles.textBold, styles.textBlack, styles.fs2]}>{distanceKm.toFixed(1)}</Text>
            <Text style={[styles.textGrey, styles.fs5]}> Km</Text>
          </View>
        </View>
        <View style={[styles.alignItemsCenter, { width: "33%" }]}>
          <Text style={[styles.textBlack, styles.textCenter, styles.fs5]}>Price</Text>
          <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
            <Text style={[styles.textBold, styles.textBlack, styles.fs2]}>{fare}</Text>
            <Text style={[styles.textGrey, styles.fs5]}> Rs</Text>
          </View>
        </View>
        <View style={[styles.alignItemsCenter, { width: "33%" }]}>
          <Text style={[styles.textBlack, styles.textCenter, styles.fs5]}>Time</Text>
          <View style={[styles.flexRow, styles.justifyContentBetween, styles.alignItemsCenter]}>
            <Text style={[styles.textBold, styles.textBlack, styles.fs2]}>{rideTime}</Text>
            <Text style={[styles.textGrey, styles.fs5]}> mins</Text>
          </View>
        </View>
      </View>


      <TouchableOpacity onPress={endRide} style={[styles.w95, styles.btn, styles.bgDanger,]}>
        <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>{isLoading ? <ActivityIndicator color={styles._white} size={"small"} /> : "End Ride"}</Text>
      </TouchableOpacity>


    </View>
  </View>
};

const mapStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "auto",
    width: "auto",
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btn: {
    position: 'absolute',
    backgroundColor: '#4CB1DC',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  bottomCard: {
    width: "100%",
    padding: 10,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    backgroundColor: "white"

  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalInner: {
    backgroundColor: '#fff',
    width: '97%',
    height: '90%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  modalbtn: {
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
    width: 40,
    height: 40,
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,

  },

});