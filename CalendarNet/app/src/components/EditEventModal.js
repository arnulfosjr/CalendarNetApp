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
    const [editedEvent, setEditedEvent] = useState({});

    useEffect(() => {
        if (selectedEventInfo) {
            setEditedEvent({
                ...selectedEventInfo
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
        const startDateUTC = moment(eventStartDate).utc().toISOString();
        const endDateUTC = moment(eventEndDate).utc().toISOString();
        const eventData = {
            id: selectedEventInfo.id,
            title: eventTitle,
            startDate: startDateUTC,
            endDate: endDateUTC,
            color: eventColor,
            descr: eventDescr,
        };
        EditEvent(eventData);
        onClose();
        setIsEventInfoVisible(false);
        resetFields();
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
                    <View style={styles.container}>
                        {colorOptions.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.colorBox,
                                    { backgroundColor: color },
                                    editedEvent.color === color && styles.selectedBox,
                                ]}
                                onPress={() => setEventColor(color)}
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
});

export default EditEventModal;
