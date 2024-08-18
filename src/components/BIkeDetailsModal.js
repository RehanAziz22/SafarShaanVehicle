import { View, Text, Modal, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import imagePath from '../constants/imagePath';
import styles from '../style';
import { useNavigation } from '@react-navigation/native';

const BIkeDetailsModal = (props) => {
  let { selectedBike, close, open } = props;
  let reqestClose = () => {
    close(false)
  }
  const navigation = useNavigation()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={reqestClose} visible={open}
    >
      <View style={customStyles.modalContainer}>
        <View style={customStyles.modalInner}>
          <View style={[styles.px3, styles.my2]}>

            <TouchableOpacity onPress={reqestClose} style={[customStyles.modalbtn]}>
              <Icon name='close' size={25} color={'black'} />
            </TouchableOpacity>
            <Image source={imagePath.icBike} style={[styles.positionAbsolute, { width: 130, height: 130, right: 20, top: 60 }]} />
            <Text style={[styles.fs3, styles.textBold,styles.textBlack]}>Bike Information</Text>
            <View style={[styles.flexRow, styles.mt1]}>
              <Icon name='pin' size={25} color={'black'} />
              <Text style={[[styles.fs5, styles.mx1,styles.textBlack]]}>ID: {selectedBike.id}</Text>
            </View>
            <View style={[styles.flexRow, styles.mt1]}>
              <Icon name='two-wheeler' size={25} color={'black'} />
              <Text style={[styles.fs5, styles.mx1,styles.textBlack]}>Model: {selectedBike.model}</Text>
            </View>
            <View style={[styles.flexRow, styles.mt1]}>
              <Icon name='local-gas-station' size={25} color={'black'} />
              <Text style={[styles.fs5, styles.mx1,styles.textBlack]}>Fuel: {selectedBike.fuel}</Text>
            </View>
            <View style={[styles.flexRow, styles.mt1]}>
              <Icon name='close' size={25} color={'black'} />
              <Text style={[styles.fs5, styles.mx1,styles.textBlack]}>Color: {selectedBike.color}</Text>
            </View>
          </View>
          <View style={[styles.bgLight, styles.px3, styles.py2]}>

            <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.m1]}>
              {/* -------------------- Issue with a recent ride------------------------------------- */}
              <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentAround, styles.alignItemsCenter,]}>
                <Icon name='credit-card' size={50} color={"black"} />
                <Text style={[styles.fs4, styles.textBlack]}>Make Payment</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.bgWhite, styles.rounded, styles.shadow2, styles.p2, styles.m1]}>
              {/* -------------------- Issue with a recent ride------------------------------------- */}
              <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.flexRow, styles.justifyContentAround, styles.alignItemsCenter,]}>
                <Icon name='credit-card' size={50} color={"black"} />
                <Text style={[styles.fs4, styles.textBlack]}>Make Payment</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={[styles.p3,styles.positionAbsolute,styles.w100,{bottom:15}]}>

            <TouchableOpacity onPress={() => navigation.navigate('editName')} style={[styles.btn]}>
              <Text style={[styles.fs4, styles.textWhite]}>Reserve for 10 min</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </Modal>
  )
}
const customStyles = StyleSheet.create({

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
    // padding: 20,
    position: 'absolute',
    bottom: 0,
    borderRadius: 10,
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
export default BIkeDetailsModal