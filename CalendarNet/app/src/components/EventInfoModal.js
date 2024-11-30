import React, {useState,useEffect} from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import EditEventModal from './EditEventModal';
import DeleteEventModal from './DeleteEventModal';

const EventInfoModal = ({
    isVisible, 
    onClose, 
    selectedEventInfo,
    setEditEventID,
    setEventTitle,
    setEventStartDate,
    setEventEndDate,
    setEventColor,
    setEventDescr,
    EditEvent,
    DeleteEvent,
    setIsEventInfoVisible,
    setIsVisible,
    setStartDateTimePicker,
    setEndDateTimePicker,
    isStartDateTimePicker,
    isEndDateTimePicker,
}) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleEditPress = () => {
        setEditEventID(selectedEventInfo.id);
        setEventTitle(selectedEventInfo.title || '');
        setEventStartDate(new Date(selectedEventInfo.startDate));
        setEventEndDate(new Date(selectedEventInfo.endDate));
        setEventColor(selectedEventInfo.color || '#000000');
        setEventDescr(selectedEventInfo.descr || '');
        setIsEditModalVisible(true);
    };

    const handleDeletePress = () => {
        setIsDeleteModalVisible(true);
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType='fade'>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <CalendarButton title='Close' onPress={onClose}/>
                    <View style={styles.topContainer}>
                        <Ionicons name='square' size={30} color={selectedEventInfo?.color}/>
                        <Text style={popUpStyle.Header}> {selectedEventInfo?.title}</Text>
                    </View>
                    <Text style={popUpStyle.text}>{selectedEventInfo?.startDate} - {selectedEventInfo?.endDate}</Text>
                    <Text style={popUpStyle.text}>{selectedEventInfo?.descr || 'No description available'}</Text>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeletePress}>
                            <Ionicons name='trash' size={30} color='red'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <EditEventModal
                isVisible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                selectedEventInfo={selectedEventInfo}
                setEventTitle={setEventTitle}
                setEventStartDate={setEventStartDate}
                setEventEndDate={setEventEndDate}
                setEventColor={setEventColor}
                setEventDescr={setEventDescr}
                EditEvent={EditEvent}
                setIsEventInfoVisible={setIsEventInfoVisible}
                setIsVisible={setIsVisible}
                setStartDateTimePicker={setStartDateTimePicker}
                setEndDateTimePicker={setEndDateTimePicker}
                isStartDateTimePicker={isStartDateTimePicker}
                isEndDateTimePicker={isEndDateTimePicker}
            />
            <DeleteEventModal
                isVisible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                setIsEventInfoVisible={setIsEventInfoVisible}
                DeleteEvent={DeleteEvent}
                eventId={selectedEventInfo?.id}
            />
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