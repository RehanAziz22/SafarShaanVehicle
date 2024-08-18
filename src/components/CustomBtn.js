
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const CustomBtn = ({
    onPress = () => { },
    btnStyle = {},
    btnText,
    iconName,
    iconColor,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.btnStyle, ...btnStyle }}
        >
            <Text>{btnText}</Text>
            <Icon name={iconName} size={30} color={iconColor?iconColor:'white'} />

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        
    }
});


export default CustomBtn;
