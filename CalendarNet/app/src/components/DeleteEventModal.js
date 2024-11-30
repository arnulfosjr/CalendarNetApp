import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import popUpStyle from '../styles/popUpStyle';

const EventDeleteModal = ({
    isVisible,
    onClose,
    DeleteEvent,
    eventId,
    setIsEventInfoVisible,
}) => {
    const handleDeletePress = () => {
        DeleteEvent(eventId);
        onClose();
        setIsEventInfoVisible(true);
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType='fade'>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <Text style={popUpStyle.Header}>Are you sure you want to delete this event?</Text>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EventDeleteModal;