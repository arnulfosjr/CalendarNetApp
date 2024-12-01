import React, { useEffect } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import popUpStyle from '../styles/popUpStyle';
import CalendarButton from './CalendarButton';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#34495E', '#2ECC71', '#3498DB'];

const CreateEventModal = ({
    isVisible,
    setIsVisible,
    selectedDay,
    events,
    dayOfEvent,
    isAddingEvent,
    setEventTitle,
    eventTitle,
    setEventStartDate,
    eventStartDate,
    setEventEndDate,
    eventEndDate,
    setEventColor,
    eventColor,
    setEventDescr,
    eventDescr,
    AddEvent,
    setStartDateTimePicker,
    setEndDateTimePicker,
    isStartDateTimePicker,
    isEndDateTimePicker,
}) => {
    useEffect(() => {
        if (isVisible && selectedDay) {
            handleStartDefaultDate();
            handleEndDefaultDate();
        }
    }, [isVisible, selectedDay]);
    
    const handleStartDefaultDate = () => {
        if(selectedDay) {
            const defaultStartDate = new Date(selectedDay);
            defaultStartDate.setHours(12,0,0,0);
            setEventStartDate(defaultStartDate);
        }
    };

    const handleEndDefaultDate = () => {
        if(selectedDay){
            const defaultEndDate = new Date(selectedDay);
            defaultEndDate.setHours(12,0,0,0);
            setEventEndDate(defaultEndDate); 
        }
    }

    const resetFields = () => {
        setIsVisible(false);
        setEventTitle('');
        setEventStartDate(new Date());
        setEventEndDate(new Date());
        setEventColor(null);
        setEventDescr('');
    };

    const handleSaveEvent = () => {
        const startDateUTC = moment(eventStartDate).utc().toISOString();
        const endDateUTC = moment(eventEndDate).utc().toISOString();

        const eventDate = {
            title: eventTitle,
            startDate: startDateUTC,
            endDate: endDateUTC,
            color: eventColor,
            descr: eventDescr,
        };
        AddEvent(eventDate);
        resetFields();
    };


    return (
        <Modal animationType='fade' transparent={true} visible={isVisible}>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                <CalendarButton title="Close" onPress={() => setIsVisible(false)}/>
                    <Text style={popUpStyle.Header}>
                        {selectedDay ? format(selectedDay, 'EEEE, MMMM dd') : ''}
                    </Text>
                    {isAddingEvent ? (
                        <>  
                            <Text style={popUpStyle.Header}>Create Event:</Text>
                            <Text style={popUpStyle.textTitle}>Title:</Text>
                            <TextInput
                                placeholder='Title'
                                value={eventTitle}
                                onChangeText={setEventTitle}
                                style={popUpStyle.text}
                            />
                            <Text style={popUpStyle.textTitle}>Start Date:</Text>
                            <TouchableOpacity onPress={() => setStartDateTimePicker(true)}>
                                <TextInput
                                    placeholder='Start Date'
                                    value={eventStartDate ? format(new Date(eventStartDate), 'yyyy-MM-dd hh:mm:ss a') : ''}
                                    onChangeText={setEventStartDate}
                                    editable={false}
                                    style={popUpStyle.text}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isStartDateTimePicker}
                                mode="datetime"
                                date={eventStartDate || new Date()}
                                onConfirm={(date) => {
                                    setEventStartDate(date);
                                    setStartDateTimePicker(false);
                                }}
                                onCancel={() => setStartDateTimePicker(false)}
                            />
                            <Text style={popUpStyle.textTitle}>End Date:</Text>
                            <TouchableOpacity onPress={() => setEndDateTimePicker(true)}>
                                <TextInput
                                    placeholder='End Date'
                                    value={eventEndDate ? format(new Date(eventEndDate), 'yyyy-MM-dd hh:mm:ss a') : ''}
                                    onChangeText={setEventEndDate}
                                    editable={false}
                                    style={popUpStyle.text}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isEndDateTimePicker}
                                mode="datetime"
                                date={eventEndDate || new Date()}
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
                                            eventColor === color && styles.selectedBox,
                                        ]}
                                        onPress={() => setEventColor(color)}
                                    />
                                ))}
                            </View>
                            <Text style={popUpStyle.textTitle}>Description:</Text>
                            <TextInput
                                placeholder='Description'
                                value={eventDescr}
                                onChangeText={setEventDescr}
                                style={popUpStyle.text}
                            />
                            <CalendarButton title="Save" onPress={()=> {
                                handleSaveEvent();
                                setIsVisible(false);
                            }} />
                        </>
                    ) : (
                        <FlatList
                            data={dayOfEvent}
                            renderItem={({item}) => (
                                <View style={popUpStyle.Content}>
                                    <TouchableOpacity>
                                        <Text style={[popUpStyle.text,{fontSize:12}]}>{item.title} {format(new Date(item.startDate), 'p')} - {format(new Date(item.endDate), 'p')}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item,index) => (item.id ? item.toString() : `event-${index}`)}
                            ListEmptyComponent={<Text> No Events on this day.</Text>}
                            />
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
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
export default CreateEventModal;
