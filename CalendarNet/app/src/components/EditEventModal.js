import React, {useEffect,useState} from 'react';
import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#34495E', '#2ECC71', '#3498DB'];

const EditEventModal = ({
    isVisible,
    onClose,
    selectedDay,
    selectedEventInfo,
    eventTitle,
    setEventTitle,
    setEventStartDate,
    eventStartDate,
    setEventEndDate,
    eventEndDate,
    setEventColor,
    eventColor,
    setEventDescr,
    eventDescr,
    EditEvent,
    setIsEventInfoVisible,
    setIsVisible,
    isStartDateTimePicker,
    isEndDateTimePicker,
    setStartDateTimePicker,
    setEndDateTimePicker,
}) => { 
    const [editedEvent, setEditedEvent] = useState({
        id: null,
        title: '',
        startDate: null,
        endDate: null,
        color: '',
        descr: '',
    });
    
    useEffect(() => {
        if (selectedEventInfo) {
            setEditedEvent({
                ...selectedEventInfo,
                id: selectedEventInfo.id,
                title: selectedEventInfo.title || '',
                startDate: selectedEventInfo.startDate || null,
                endDate: selectedEventInfo.endDate || null,
                color: selectedEventInfo.color || colorOptions[0],
                descr: selectedEventInfo.descr || '',
            });
        }
    }, [selectedEventInfo]);

    const handleTitleChange = (value) => {
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            title: value,
        }));
    };

    const handleStartDateChange = (value) => {
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            startDate: value,
        }));
    };

    const handleEndDateChange = (value) => {
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            endDate: value,
        }));
    };

    const handleColorChange = (value) => {
        setEventColor(value);
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            color: value,
        }));
    };

    const handleDescriptionChange = (value) => {
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            descr: value,
        }));
    };

    const resetFields = () => {
        setIsVisible(false);
        setEventTitle('');
        setEventStartDate(null);
        setEventEndDate(null);
        setEventColor(null);
        setEventDescr('');
    };

    const handleSaveEvent = () => {
        console.log("Edited Event before API call:", editedEvent)
        const eventData = {
            ...editedEvent,
            title: editedEvent.title || 'Untitled Event', 
            descr: editedEvent.descr || 'No description',  
            color: editedEvent.color || colorOptions[0],  
            startDate: editedEvent.startDate ? moment(editedEvent.startDate).utc().toISOString() : null,
            endDate: editedEvent.endDate ? moment(editedEvent.endDate).utc().toISOString() : null,
        };

        // Validation: Ensure all fields are populated
        if (!eventData.title || !eventData.color || !eventData.descr || !eventData.startDate || !eventData.endDate) {
            console.error('Validation Error: Missing fields:', eventData);
            return;
        }
        console.log("Event Data to Save IN EditEventModal:", eventData);
        EditEvent(eventData)
            .then(() => {
                onClose();
                setIsEventInfoVisible(false);
                setIsVisible(false);
                resetFields();
            })
            .catch((error) => {
                console.error('Error editing event:', error);
                console.error('Error response data:', error.response?.data);
            });
    };

    return (
        <Modal animationType='fade' transparent={true} visible={isVisible}>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <CalendarButton title='Close' onPress={onClose}/>
                    <Text style={popUpStyle.Header}>
                        {selectedDay ? format(selectedDay, 'EEEE, MMMM dd') : ''}
                    </Text>
                    <Text style={popUpStyle.Header}>Edit Event:</Text>
                    <Text style={popUpStyle.textTitle}>Title:</Text>
                    <TextInput
                         placeholder='Title'
                         value={editedEvent.title}
                         onChangeText={handleTitleChange}
                         style={popUpStyle.text}
                    />
                    <Text style={popUpStyle.textTitle}>Start Date:</Text>
                    <TouchableOpacity onPress={() => setStartDateTimePicker(true)}>
                        <TextInput
                            placeholder="Start Date"
                            value={editedEvent.startDate ? format(new Date(editedEvent.startDate), 'yyyy-MM-dd hh:mm:ss a') : ''}
                            onChangeText={handleStartDateChange}
                            editable={false}
                            style={popUpStyle.text}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartDateTimePicker}
                        mode="datetime"
                        date={editedEvent.startDate instanceof Date ? editedEvent.startDate : new Date()}
                        onConfirm={(date) => {
                            setEventStartDate(date);
                            setStartDateTimePicker(false);
                        }}
                        onCancel={() => setStartDateTimePicker(false)}
                    />
                    <Text style={popUpStyle.textTitle}>End Date:</Text>
                    <TouchableOpacity onPress={() => setEndDateTimePicker(true)}>
                        <TextInput
                            placeholder="End Date"
                            value={editedEvent.endDate ? format(new Date(editedEvent.endDate), 'yyyy-MM-dd hh:mm:ss a') : ''}
                            onChangeText={handleEndDateChange}
                            editable={false}
                            style={popUpStyle.text}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndDateTimePicker}
                        mode="datetime"
                        date={eventEndDate instanceof Date ? editedEvent.endDate : new Date()}
                        onConfirm={(date) => {
                            setEventEndDate(date);
                            setEndDateTimePicker(false);
                        }}
                        onCancel={() => setEndDateTimePicker(false)}
                    />
                    <Text style={popUpStyle.textTitle}>Choose Event Color:</Text>
                    <View style={styles.colorContainer}>
                        {colorOptions.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.colorBox,
                                    { backgroundColor: color },
                                    editedEvent.color === color && styles.selectedBox,
                                ]}
                                onPress={() => handleColorChange(color)}
                            />
                        ))}
                    </View>
                    <Text style={popUpStyle.textTitle}>Description:</Text>
                    <TextInput
                        placeholder="Description"
                        value={editedEvent.descr}
                        onChangeText={handleDescriptionChange}
                        style={popUpStyle.text}
                    />
                     <CalendarButton title="Save" onPress={handleSaveEvent} />
                </View>
            </View>
        </Modal>
    );
}

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

    colorContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginVertical:10,
        justifyContent:'space-around'
    },
    colorBox: {
        width: 50,
        height: 40,
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        margin:1
    },
    selectedBox: {
        borderWidth:3,
    }
});

export default EditEventModal;
