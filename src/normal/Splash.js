import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../style'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../config'

const Splash = ({ navigation }) => {
  const bike = useSelector(state => state.bike);
  const [bikes, setBikes] = useState([]);
  let [isloading, setLoader] = useState(false)
  let [error, setError] = useState()

  const fetchBikes = async () => {
    setError(null)
    setLoader(true);
    axios.get(`${BASE_URL}bikes`, { timeout: 10000 })
      .then((response) => {
        setBikes(response.data);
        // console.log(response.data);
        navigation.navigate(bike ? 'QRScreen' : 'Login', bike ? { bike: bike } : { bikes: response.data });
        // navigation.navigate('RideEndScreen', { bikes: response.data });
        console.log("navigated")
        setLoader(false);
        setError('')

      }).catch((error) => {
        setError(error || "Error fetching bikes:");
        setLoader(false);
      });
  }
  useEffect(() => {
    fetchBikes()
    // setTimeout(() => {
    //   if (!data == {}) {
    //     navigation.navigate('Parent')
    //   } else {
    //     navigation.navigate('Login', bikes)
    //     // navigation.navigate('Parent')
    //   }
    // }, 2000)
  }, [])

  return (
    <View style={[styles.flexCenter, styles.bgWhite, styles._black, styles.textBlack, styles.w100, styles.h100]}>
      <Image source={{ uri: "https://thumbs.dreamstime.com/b/classic-blue-speed-motorcycle-travel-adventure-vector-illustration-vehicle-motorbike-design-label-emblem-flat-225428982.jpg" }} style={{ width: 300, height: 300 }} />
      <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween]}>
        <Text style={[styles.textAppColor, styles.fs1, styles.textBold, styles.textCenter]}>Saffar Shaan</Text>
        {/* <Icon color={styles._danger} size={40} style={[styles.mx1]} name="airport-shuttle"/> */}
      </View>
      <Text style={[styles.textBlack, styles.textBold, styles.fs5, styles.mt2, styles.w50, styles.textCenter]}>book your bike and
        you are ready to go!</Text>

      {/* {error && } */}
      <Text style={[styles.textDanger, styles.textBold, styles.fs5, styles.mt2, styles.w50, styles.textCenter]}>
        {isloading ? <ActivityIndicator color={styles._info} size={"small"} /> : <TouchableOpacity onPress={fetchBikes} style={[styles.AppBg1, styles.w90, styles.btn, styles.my2]}>
          <Text style={[styles.textBold, styles.textWhite, styles.fs4]}>Fetch Again</Text>
        </TouchableOpacity>}
      </Text>

    </View>
  )
}

export default Splash