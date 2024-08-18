import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from "react-redux";


export const getCurrentLocation = () => {
    const dispatch = useDispatch()

    const addCoords = (payload) => {
        dispatch(addCoords(payload))
        // navigation.navigate("Parent")
      }
    new Promise((resolve, reject) => {

        Geolocation.getCurrentPosition(
            (position) => {
                // setMLat(position.coords.latitude)
                // setMLong(position.coords.longitude)
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
                console.log(cords);
                addCoords(cords)
                resolve(cords)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                reject(error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    })
}
export const requestLocationPermission = async () => {
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
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};