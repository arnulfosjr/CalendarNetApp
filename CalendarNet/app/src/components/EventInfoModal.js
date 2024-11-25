import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const EventInfoModal = ({ isVisible, onClose, events }) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType='fade'>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <CalendarButton title='Close' onPress={onClose}/>
                    <View style={styles.topContainer}>
                        <Ionicons name='square' size={30} color={events?.color}/>
                        <Text style={popUpStyle.Header}> {events?.title}</Text>
                    </View>
                    <Text style={popUpStyle.text}>{events?.startDate} - {events?.endDate}</Text>
                    <Text style={popUpStyle.text}>{events?.descr || 'No description available'}</Text>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name='trash' size={30} color='red'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    
    container: {
        alignItems:'center',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    topContainer: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:20,
    },

    editButton: {
        backgroundColor: '#ffffff',
        padding:5,
        borderRadius:50,
        alignItems:'center',
        width:80,
    },

    editButtonText: {
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Arial',
    },

    trashButton: {
        marginTop:20
    }

});

export default EventInfoModal;