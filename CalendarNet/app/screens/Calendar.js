import React,{useState, useEffect} from 'react';
import { View, Text,ScrollView,TouchableOpacity,Modal, SafeAreaView, TextInput} from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import popUpStyle from '../src/components/popUpStyle';
import AppButton from '../src/components/AppButton';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, endOfWeek} from 'date-fns';
import { logOutUser,createEvents,editEvents,getEvents,deleteEvents } from '../src/services/api';
import { createTasks, editTasks, getTask, deleteTask } from '../src/services/api';
import { createReminder, editReminder} from '../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const CalendarUI = () => {
    const router = useRouter();
    const date = new Date();
    const monthYear = format(date,'MMMM yyyy'); // Display month and year
    const start = startOfMonth(date);  // start of the month number
    const end = endOfMonth(date);      // end of the month number.
    const weeks = eachWeekOfInterval({start,end},{weekStartsOn:0}); 
    const [isVisible,setIsVisible] = useState(false);
    const [selectedDay,setSelectedDay] = useState(null);
    const [events,setEvent] = useState([]);
    const [dayOfEvent,setDayOfEvent] = useState([]);
    const [isEditing, setIsEditing] = useState(false)
    const [isAddingEvent, setAddingEvent] = useState(false)
    const [isStartDateTimePicker, setStartDateTimePicker] = useState(false);
    const [isEndDateTimePicker, setEndDateTimePicker] = useState(false);

    const [eventTitle, setEventTitle] = useState('');
    const [eventStartDate, setEventStartDate] = useState(null);
    const [eventEndDate, setEventEndDate] = useState(null);
    const [eventColor, setEventColor] = useState(null);
    const [eventDescr, setEventDescr] = useState('');
    const [editEventID, setEditEventID] = useState(null);

    const weeksInMonth = weeks.map(startOfWeek => {
        const endOfCurrentWeek = endOfWeek(startOfWeek,{weekStartsOn:0});
        const daysInWeek = eachDayOfInterval({ start: startOfWeek, end: endOfCurrentWeek });
        return daysInWeek;
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const getEventsFetched = await getEvents();
            console.log('fetched events:',getEventsFetched);
            setEvent(getEventsFetched || []);
        };
        fetchEvents();
    },[]);

    const handleLogout = async () => {
        try {
            await logOutUser(); // Calls backend to log out.
            await AsyncStorage.removeItem('authToken');
            router.push('/screens/UserAccess');
        } catch (error) {
            console.error('Error logging out:',error);
        }
    };

    const userOnePress = (day) => {
        setSelectedDay(day);
        setAddingEvent(false);
        const filteredEvents = events.filter(event => 
            format(new Date(event.date),'yyyy-MM-dd') === format(day,'yyyy-MM-dd')
        );
        setDayOfEvent(filteredEvents);
        setIsVisible(true);
    };

    const userLongPress = (day) => {
        setSelectedDay(day);
        setAddingEvent(true);
        setIsVisible(true);
    };

    const AddEvent = async () => {
        const newEvent = {
            title: eventTitle,
            startDate: new Date(eventStartDate),
            endDate: new Date(eventEndDate),
            color: eventColor,
            descr: eventDescr,
        };
        const eventCreation = await createEvents(newEvent);
        setEvent([...events, eventCreation]);
        setIsVisible(false);
    };

    const EditEvent = async () => {
        const updateEvent = {
            title: eventTitle,
            startDate: eventStartDate,
            endDate: eventEndDate,
            color: eventColor,
            descr: eventDescr,
        };
        await editEvents(editEventID,updateEvent)
        setEvent(events.map(events.id === editEventID ? updateEvent : events));
        setIsEditing(false);
        setIsVisible(false)
    };

    const DeleteEvent = async (eventId) => {
        await deleteEvents(eventId);
        setEvent(events.filter(events => events.id !== eventId));
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={calendarStyle.scrollView}>
                <View style={calendarStyle.container}>
                    <View style={calendarStyle.header}>
                        <AppButton title="Logout" onPress={handleLogout}></AppButton>
                        <Text style={calendarStyle.headerText}>{monthYear}</Text>
                    </View>
                    <View style={calendarStyle.dayNamesDisplay}>
                        {['Sun','Mon','Tue','Wed','Thu ','Fri ','Sat '].map(day =>(
                            <Text key={day} style={calendarStyle.text}>{day}</Text>
                        ))}
                    </View>
                    {weeksInMonth.map((week,weekIndex) => (
                        <View key={weekIndex} style={calendarStyle.weekRow}>
                            {week.map((day, dayIndex) => (
                                <TouchableOpacity activeOpacity={1} key={dayIndex} style={calendarStyle.dayBox} onPress={() => 
                                userOnePress(day) } onLongPress={() => userLongPress(day) }>
                                <View >
                                    <Text style={calendarStyle.dayBoxText}>
                                        {day.getMonth() === date.getMonth() ? format(day,'d'):''}
                                    </Text>
                                </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
                <Modal animationType="fade" transparent={true} visible={isVisible}>
                    <View style={popUpStyle.Overlay}>
                        <View style={popUpStyle.Content}>
                            <Text style={popUpStyle.popUpHeader}>
                                {selectedDay ? format(selectedDay,'yyyy-MM-dd'): ''}
                            </Text>
                            {isAddingEvent ? (
                                <>
                                    <TextInput
                                        placeholder='Title'
                                        value={eventTitle}
                                        onChangeText={setEventTitle}
                                        style={popUpStyle.popUpText}
                                    />
                                    <TouchableOpacity onPress={() => setStartDateTimePicker(true)}>
                                        <TextInput
                                            placeholder='Start Date'
                                            value={eventStartDate ? format(new Date(eventStartDate), 'yyyy-MM-dd HH:mm'):''}
                                            onChangeText={setEventStartDate}
                                            editable={false}
                                            style={popUpStyle.popUpText}
                                        />
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isStartDateTimePicker}
                                        mode="datetime"
                                        date={eventStartDate ? new Date(eventStartDate) : new Date()}
                                        onConfirm={(date) => {
                                            setEventStartDate(date);
                                            setStartDateTimePicker(false);
                                        }}
                                        onCancel={() => setStartDateTimePicker(false)}
                                    />
                                    <TouchableOpacity onPress={() => setEndDateTimePicker(true)}>
                                        <TextInput
                                            placeholder='End Date'
                                            value={eventEndDate ? format(new Date(eventEndDate), 'yyyy-MM-dd HH:mm'):''}
                                            onChangeText={setEventEndDate}
                                            editable={false}
                                            style={popUpStyle.popUpText}
                                        />
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isEndDateTimePicker}
                                        mode="datetime"
                                        date={eventEndDate ? new Date(eventEndDate) : new Date()}
                                        onConfirm={(date) => {
                                            setEventEndDate(date);
                                            setEndDateTimePicker(false);
                                        }}
                                        onCancel={() => setEndDateTimePicker(false)}
                                    />
                                    <TextInput
                                        placeholder='Color'
                                        value={eventColor}
                                        onChangeText={setEventColor}
                                        style={popUpStyle.popUpText}
                                    />
                                    <TextInput
                                        placeholder='Description'
                                        value={eventDescr}
                                        onChangeText={setEventDescr}
                                        style={popUpStyle.popUpText}
                                    />
                                    <AppButton title="Add Event" onPress={AddEvent}/>
                                </>
                            ) : (
                                <ScrollView>
                                    {dayOfEvent.map((eventx,index) => (
                                        <View key={index} style={popUpStyle.Content}>
                                            <Text>{eventx.title}</Text>
                                            <Text>{format(new Date(eventx.startDate), 'p')} - {format(new Date(eventx.endDate), 'p')}</Text>
                                            <Text>{eventx.descr}</Text>
                                        </View>
                                    ))}
                                </ScrollView> 
                            )}
                            <AppButton title="Close" onPress={ () => setIsVisible(false)}/>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ animation: 'fade' }}>
            <Tab.Screen name="Calendar" component={CalendarUI} options={{
                tabBarIcon:({ color, size }) => (
                    <Ionicons name="calendar" size={size} color={color}/>
                )
            }}/>
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon:({ color, size }) => (
                    <Ionicons name="settings" size={size} color={color}/>
                )
            }}/>
        </Tab.Navigator>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;