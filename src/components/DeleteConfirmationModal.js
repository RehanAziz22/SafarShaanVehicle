import React from 'react';
import { View, Text, Button, Modal, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from '../style';

const DeleteConfirmationModal = ({ isVisible, onDelete, onCancel,isloading }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={customStyles.modalContainer}>

                <View style={[customStyles.modalInner]}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Are you sure you want to delete this user?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      
                        <TouchableOpacity onPress={onCancel} style={[styles.p1,styles.alignItemsCenter,styles.justifyContentCenter,styles.bgInfo]}>
                        <Text style={[styles.textWhite,styles.fs5]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} style={[styles.p1,styles.alignItemsCenter,styles.justifyContentCenter,{backgroundColor:"red"}]}>
                        <Text style={[styles.textWhite,styles.fs5]}>{isloading ? <ActivityIndicator color={styles._white} size={"small"} /> :"Delete"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const customStyles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        margin: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },

});

export default DeleteConfirmationModal;
