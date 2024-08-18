import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
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



export default function AppMap() {

  enableLatestRenderer();
  const mapRef = useRef(null);
  const navigation = useNavigation()
  // let dispatch = useDispatch()

  // const [bikes, setBikes] = useState(bikesDetails); // Use the dummy array
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const bike = useSelector((state) => {
    return state.bike;
  })
  // const [, setMLat] = useState(bike.location.coordinates[0])
  // const [mlong, setMLong] = useState(bike.location.coordinates[1])
  const [currentLocation, setCurrentLocation] = useState({})
  // console.log(bike, "bike from redux")
  const [state, setState] = useState({
    pickuplocationCords: {
      latitude: bike.location.coordinates[0],
      longitude: bike.location.coordinates[1],
      latitudeDelta: 0.03,
      longitudeDelta: 0.0121,
    },
    currentlocationCords: {
      latitude: 37.42699605351626,
      longitude: -122.08078277023857,
      latitudeDelta: 0.03,
      longitudeDelta: 0.0121,
    },
    droplocationCords: {
      latitude: 37.42699605351626,
      longitude: -122.08078277023857,
      latitudeDelta: 0.03,
      longitudeDelta: 0.0121,
    }
  })
  const { pickuplocationCords, droplocationCords,currentlocationCords } = state;
  useEffect(() => {
    // requestLocationPermission()
    // console.log(bikes)

    // Set up an interval to call the function every 10 seconds
    const intervalId = setInterval(() => {
      getLiveLocation();
      // getCurrentLocation()
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // const coords = useSelector((state) => {
  //   return state.coords;
  // })
  // console.log(coords)
  // setMLat(coords.latitude)
  // setMLong(coords.longitude)
  const onPressLocation = () => {
    navigation.navigate('chooseLocation')
  }

  const recenterMap = () => {
    // Access the map instance and animate to the user's current location or any desired coordinates
    mapRef.current.animateToRegion(currentlocationCords);
  };

  const getLiveLocation = async () => {
    let res = await getCurrentLocation()
  }

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Update currentLocation state
        setCurrentLocation({
          latitude,
          longitude,
        });

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

        console.log(position.coords); // For debugging purposes
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  // const CustomMarker = ({ bike }) => (

  //   <Marker
  //     key={bike.id} // Important for React
  //     coordinate={{
  //       latitude: bike.latitude,
  //       longitude: bike.longitude,
  //     }}
  //     title={bike.model}
  //     description={bike.type}
  //     onPress={() => {
  //       setSelectedBike(bike);
  //       // setModalVisible(true);
  //       openModal();
  //     }}
  //   >
  //     <Image source={imagePath.icBike} style={{ width: 70, height: 70, }} />
  //   </Marker>
  // );

  // Function to open the modal
  const openModal = () => setModalVisible(true);

  // Function to close the modal
  const closeModal = () => setModalVisible(false);

  return <View style={styles.container}>
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      // region={{
      //   latitude: mlat,
      //   longitude: mlong,
      //   latitudeDelta: 0.09,
      //   longitudeDelta: 0.0121,
      // }}
      initialRegion={pickuplocationCords}
    >
      {/* <MapViewDirections
        origin={pickuplocationCords}
        destination={droplocationCords}
        apikey={GOOGLE_MAP_KEY}
        strokeWidth={3}
        strokeColor='hotpink' /> */}
      {/*
      <Marker coordinate={droplocationCords} image={imagePath.icGreenMarker} title={"DropLocations"}></Marker> */}
      <Marker coordinate={pickuplocationCords} image={imagePath.icCurLoc} title={"pickup location"}></Marker>
      <Marker coordinate={droplocationCords} image={imagePath.icGreenMarker} title={"Current location"}></Marker>
      {/* {bikes.map(bike => (
        <CustomMarker key={bike.id} bike={bike} />
      ))} */}

    </MapView>


    {modalVisible && <BIkeDetailsModal
      open={modalVisible}
      close={closeModal} modalstate={modalVisible} selectedBike={selectedBike} />}



    <ToggleDrawerButton />
    <TouchableOpacity onPress={() => recenterMap()} style={[styles.btn, { bottom: 150, right: 20, }]}>
      <Icon name='my-location' size={30} color={"white"} />
    </TouchableOpacity>
    {/* <View style={styles.bottomCard}>
      <Text>Where are you going?</Text>
      <TouchableOpacity
        onPress={onPressLocation}
        style={styles.inputStyle}>
        <Text>Choose Your Location</Text>
      </TouchableOpacity>
    </View> */}
  </View>
};

const styles = StyleSheet.create({
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
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
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