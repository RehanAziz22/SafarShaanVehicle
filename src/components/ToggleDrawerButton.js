import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'


const ToggleDrawerButton = ({
    btnStyle = {},
}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)} style={{ ...styles.btnStyle, ...btnStyle }}>
            <Icon name='menu' size={30} color={"black"} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 50,
        height: 50,
        top:20,
        right:20,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    
        elevation: 8,
    }
});

export default ToggleDrawerButton