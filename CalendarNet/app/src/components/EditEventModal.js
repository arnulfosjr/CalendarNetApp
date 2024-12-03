import React, {useEffect,useState} from 'react';
import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const colorOptions = ['#FD7E14', '#33FF57', '#007BFF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#6C757D', '#28A745', '#3498DB'];
const repeatOptions = ['Never','Daily','Weekly','Monthly','Yearly'];

const EditEventModal = ({
    isVisible,
    onClose,
    selectedDay,
    selectedEventInfo,
    setEventTitle,
    setEventStartDate,
    setEventEndDate,
    setEventColor,
    setEventDescr,
    setEventRepeat,
    setEventEndRepeat,
    EditEvent,
    setIsEventInfoVisible,
    setIsVisible,
    isStartDateTimePicker,
    isEndDateTimePicker,
    isEndRepeatTimePicker,
    setStartDateTimePicker,
    setEndDateTimePicker,
    setEndRepeatTimePicker,
}) => { 
    const [editedEvent, setEditedEvent] = useState({
        id: null,
        title: '',
        startDate: null,
        endDate: null,
        color: '#6C757D',
        descr: '',
        repeat: 'Never',
        endOfRepeat: null,
    });
    
    useEffect(() => {
        if (selectedEventInfo) {
            setEditedEvent({
                ...selectedEventInfo,
                id: selectedEventInfo.id,
                title: selectedEventInfo.title || '',
                startDate: selectedEventInfo.startDate || new Date(),
                endDate: selectedEventInfo.endDate || new Date(),
                color: selectedEventInfo.color || '#6C757D',
                descr: selectedEventInfo.descr || '',
                repeat: selectedEventInfo.repeat || 'Never',
                endOfRepeat: selectedEventInfo.endOfRepeat || null,
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

    const handleRepeat = (value) => {
        setEventRepeat(value);
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            repeat: value,
        }));
    };

    const handleEndOfRepeat = (value) => {
        setEditedEvent((prevEvent) => ({
            ...prevEvent,
            endOfRepeat: value,
        }));
    };

    const resetFields = () => {
        setIsVisible(false);
        setEventTitle('');
        setEventStartDate(new Date());
        setEventEndDate(new Date());
        setEventColor('#6C757D');
        setEventDescr('');
        setEventRepeat('Never');
        setEventEndRepeat(null);
    };

    const handleSaveEvent = () => {
        const eventData = {
            ...editedEvent,
            title: editedEvent.title || 'Untitled Event', 
            descr: editedEvent.descr || 'No description',  
            color: editedEvent.color || '#6C757D',  
            startDate: editedEvent.startDate ? moment(editedEvent.startDate).utc().toISOString() : null,
            endDate: editedEvent.endDate ? moment(editedEvent.endDate).utc().toISOString() : null,
            repeat: editedEvent.repeat || 'Never',
            endOfRepeat: editedEvent.repeat !== 'Never' && editedEvent.endOfRepeat ? moment(editedEvent.endOfRepeat).utc().toISOString() : null,
        };

        if (!eventData.title || !eventData.startDate || !eventData.endDate) {
            console.error('Validation Error: Missing required fields:', eventData);
            return;
        }
        
        if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
            console.error('Validation Error: Start date cannot be after end date.');
            return;
        }

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
        <Modal animationType='slide' transparent={true} visible={isVisible}>
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
                            value={editedEvent.startDate ? format(new Date(editedEvent.startDate), 'yyyy-MM-dd h:mm a') : ''}
                            onChangeText={handleStartDateChange}
                            editable={false}
                            style={popUpStyle.text}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartDateTimePicker}
                        mode="datetime"
                        date={editedEvent.startDate ? new Date (editedEvent.startDate) : new Date()}
                        onConfirm={(date) => {
                            setEventStartDate(new Date(date));
                            setStartDateTimePicker(false);
                        }}
                        onCancel={() => setStartDateTimePicker(false)}
                    />
                    <Text style={popUpStyle.textTitle}>End Date:</Text>
                    <TouchableOpacity onPress={() => setEndDateTimePicker(true)}>
                        <TextInput
                            placeholder="End Date"
                            value={editedEvent.endDate ? format(new Date(editedEvent.endDate), 'yyyy-MM-dd h:mm a') : ''}
                            onChangeText={handleEndDateChange}
                            editable={false}
                            style={popUpStyle.text}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndDateTimePicker}
                        mode="datetime"
                        date={editedEvent.endDate ? new Date (editedEvent.endDate) : new Date()}
                        onConfirm={(date) => {
                            setEventEndDate(new Date(date));
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
                    <Text style={popUpStyle.textTitle}>Choose Repeat Option:</Text>
                            <View style={styles.container}>
                                {repeatOptions.map((repeat) => (
                                    <TouchableOpacity
                                        key={repeat}
                                        style={[
                                            styles.repeatBox,
                                            editedEvent.repeat === repeat && styles.selectedBox,
                                        ]}
                                        onPress={() => handleRepeat(repeat)}
                                    >
                                        <Text style={{ textAlign: 'center', fontWeight:'bold'}}>{repeat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={popUpStyle.textTitle}>Choose Repeat End Date:</Text>
                            <TouchableOpacity onPress={() => setEndRepeatTimePicker(true)}>
                                <TextInput
                                    placeholder='Repeat End Date'
                                    value={editedEvent.endOfRepeat ? format(new Date(editedEvent.endOfRepeat), 'yyyy-MM-dd') : ''}
                                    onChangeText={handleEndOfRepeat}
                                    editable={false}
                                    style={popUpStyle.text}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isEndRepeatTimePicker}
                                mode="date"
                                date={editedEvent.endOfRepeat ? new Date (editedEvent.endOfRepeat) : new Date()}
                                onConfirm={(date) => {
                                    setEventEndRepeat(new Date(date));
                                    setEndRepeatTimePicker(false);
                                }}
                                onCancel={() => setEndRepeatTimePicker(false)}
                            />
                     <CalendarButton title="Save" onPress={handleSaveEvent} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-around',
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
        width: 45,
        height: 30,
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        margin:1
    },
    repeatBox: {
        width: 60,
        height: 25,
        borderColor: '#000',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        margin:1,
        marginBottom:5,
    },
    selectedBox: {
        borderWidth:3,
    }
});

export default EditEventModal;
