import React, { useEffect } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import popUpStyle from '../styles/popUpStyle';
import CalendarButton from './CalendarButton';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const colorOptions = ['#FD7E14', '#33FF57', '#007BFF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#6C757D', '#28A745', '#3498DB'];
const repeatOptions = ['Never','Daily','Weekly','Monthly','Yearly'];

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
    setEventRepeat,
    eventRepeat,
    setEventEndRepeat,
    eventEndRepeat,
    AddEvent,
    setStartDateTimePicker,
    setEndDateTimePicker,
    setEndRepeatTimePicker,
    isStartDateTimePicker,
    isEndDateTimePicker,
    isEndRepeatTimePicker,
}) => {
    useEffect(() => {
        if (isVisible && selectedDay) {
            handleStartDefaultDate();
            handleEndDefaultDate();
            handleEndRepeatDefaultDate();
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

    const handleEndRepeatDefaultDate = () => {
        if(selectedDay){
            const defaultEndDate = new Date(selectedDay);
            defaultEndDate.setHours(0,0,0,0);
            setEventEndRepeat(defaultEndDate);
        }
    }

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
        console.log("eventStartDate:", eventStartDate, typeof eventStartDate);
        console.log("eventEndDate:", eventEndDate, typeof eventEndDate);
        console.log("eventEndRepeat before saving:", typeof eventEndRepeat);
 
        const startDateUTC = moment(eventStartDate).utc().toISOString();
        const endDateUTC = moment(eventEndDate).utc().toISOString();
        const endRepeatUTC = eventRepeat !== 'Never' && eventEndRepeat ? moment(eventEndRepeat).utc().toISOString(): null;

        const eventData = {
            title: eventTitle,
            startDate: startDateUTC,
            endDate: endDateUTC,
            color: eventColor,
            descr: eventDescr,
            repeat: eventRepeat,
            endOfRepeat: endRepeatUTC,
        };
        console.log("Event data to be saved:", eventData); // Debugging log
        AddEvent(eventData);
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
                                    value={eventStartDate ? format(new Date(eventStartDate), 'yyyy-MM-dd h:mm a') : ''}
                                    onChangeText={setEventStartDate}
                                    editable={false}
                                    style={popUpStyle.text}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isStartDateTimePicker}
                                mode="datetime"
                                date={eventStartDate instanceof Date ? eventStartDate: new Date()}
                                onConfirm={(date) => {
                                    setEventStartDate(new Date(date));
                                    setStartDateTimePicker(false);
                                }}
                                onCancel={() => setStartDateTimePicker(false)}
                            />
                            <Text style={popUpStyle.textTitle}>End Date:</Text>
                            <TouchableOpacity onPress={() => setEndDateTimePicker(true)}>
                                <TextInput
                                    placeholder='End Date'
                                    value={eventEndDate ? format(new Date(eventEndDate), 'yyyy-MM-dd h:mm a') : ''}
                                    onChangeText={setEventEndDate}
                                    editable={false}
                                    style={popUpStyle.text}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isEndDateTimePicker}
                                mode="datetime"
                                date={eventEndDate instanceof Date ? eventEndDate: new Date()}
                                onConfirm={(date) => {
                                    console.log('Selected end date:',date);
                                    setEventEndDate(new Date(date));
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
                            <Text style={popUpStyle.textTitle}>Choose Repeat Option:</Text>
                            <View style={styles.container}>
                                {repeatOptions.map((repeat) => (
                                    <TouchableOpacity
                                        key={repeat}
                                        style={[
                                            styles.repeatBox,
                                            eventRepeat === repeat && styles.selectedBox,
                                        ]}
                                        onPress={() => setEventRepeat(repeat)}
                                    >
                                        <Text style={{ textAlign: 'center', fontWeight:'bold'}}>{repeat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={popUpStyle.textTitle}>Choose Repeat End Date:</Text>
                            <TouchableOpacity onPress={() => setEndRepeatTimePicker(true)}>
                                <TextInput
                                    placeholder='Repeat End Date'
                                    value={eventEndRepeat ? format(new Date(eventEndRepeat), 'yyyy-MM-dd') : ''}
                                    onChangeText={setEventEndRepeat}
                                    editable={false}
                                    style={popUpStyle.text}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isEndRepeatTimePicker}
                                mode="date"
                                date={eventEndRepeat instanceof Date ? eventEndRepeat: new Date()}
                                onConfirm={(date) => {
                                    console.log('Selected repeat end date:',date);
                                    setEventEndRepeat(new Date(date));
                                    setEndRepeatTimePicker(false);
                                }}
                                onCancel={() => setEndRepeatTimePicker(false)}
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
        marginBottom:5
    },
    selectedBox: {
        borderWidth:3,
    }

});
export default CreateEventModal;
