import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import AppButton from '../src/components/AppButton';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, endOfWeek } from 'date-fns';
import { logOutUser, createEvents, editEvents, getEvents, deleteEvents } from '../src/services/api';
import { createTasks, editTasks, getTask, deleteTask } from '../src/services/api';
import { createReminder, editReminder } from '../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Settings from './Settings';
import EventModal from '../src/components/EventModal';

const Tab = createBottomTabNavigator();

const CalendarUI = () => {
    const router = useRouter();
    const date = new Date();
    const monthYear = format(date, 'MMMM yyyy'); // Display month and year
    const start = startOfMonth(date);  // start of the month number
    const end = endOfMonth(date);      // end of the month number.
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [events, setEvent] = useState([]);
    const [dayOfEvent, setDayOfEvent] = useState([]);
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
        const endOfCurrentWeek = endOfWeek(startOfWeek, { weekStartsOn: 0 });
        const daysInWeek = eachDayOfInterval({ start: startOfWeek, end: endOfCurrentWeek });
        return daysInWeek;
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const getEventsFetched = await getEvents();
            console.log('fetched events:', getEventsFetched);
            setEvent(getEventsFetched || []);
        };
        fetchEvents();
    }, []);

    const handleLogout = async () => {
        try {
            await logOutUser(); // Calls backend to log out.
            await AsyncStorage.removeItem('authToken');
            router.push('/screens/UserAccess');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const userOnePress = (day) => {
        setSelectedDay(day);
        setAddingEvent(false);
        const filteredEvents = events.filter(event =>
            format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
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
        await editEvents(editEventID, updateEvent)
        setEvent(events.map(events.id === editEventID ? updateEvent : events));
        setIsEditing(false);
        setIsVisible(false)
    };

    const DeleteEvent = async (eventId) => {
        await deleteEvents(eventId);
        setEvent(events.filter(events => events.id !== eventId));
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={calendarStyle.scrollView}>
                <View style={calendarStyle.container}>
                    <View style={calendarStyle.header}>
                        <AppButton title="Logout" onPress={handleLogout}></AppButton>
                        <Text style={calendarStyle.headerText}>{monthYear}</Text>
                    </View>
                    <View style={calendarStyle.dayNamesDisplay}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu ', 'Fri ', 'Sat '].map(day => (
                            <Text key={day} style={calendarStyle.text}>{day}</Text>
                        ))}
                    </View>
                    {weeksInMonth.map((week, weekIndex) => (
                        <View key={weekIndex} style={calendarStyle.weekRow}>
                            {week.map((day, dayIndex) => (
                                <TouchableOpacity activeOpacity={1} key={dayIndex} style={calendarStyle.dayBox} onPress={() =>
                                    userOnePress(day)} onLongPress={() => userLongPress(day)}>
                                    <View >
                                        <Text style={calendarStyle.dayBoxText}>
                                            {day.getMonth() === date.getMonth() ? format(day, 'd') : ''}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                    <EventModal
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        selectedDay={selectedDay}
                        events={events}
                        dayOfEvent={dayOfEvent}
                        isAddingEvent={isAddingEvent}
                        setEventTitle={setEventTitle}
                        eventTitle={eventTitle}
                        setEventStartDate={setEventStartDate}
                        eventStartDate={eventStartDate}
                        setEventEndDate={setEventEndDate}
                        eventEndDate={eventEndDate}
                        setEventColor={setEventColor}
                        eventColor={eventColor}
                        setEventDescr={setEventDescr}
                        eventDescr={eventDescr}
                        AddEvent={AddEvent}
                        setStartDateTimePicker={setStartDateTimePicker}
                        setEndDateTimePicker={setEndDateTimePicker}
                        isStartDateTimePicker={isStartDateTimePicker}
                        isEndDateTimePicker={isEndDateTimePicker}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ animation: 'fade' }}>
            <Tab.Screen name="Calendar" component={CalendarUI} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="calendar" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Settings" component={Settings} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings" size={size} color={color} />
                )
            }} />
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