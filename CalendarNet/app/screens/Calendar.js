import React, { useState, useEffect } from 'react';
import { StyleSheet,View, Text, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import CalendarButton from '../src/components/CalendarButton';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, endOfWeek, startOfWeek, subMonths, addMonths } from 'date-fns';
import { logOutUser, createEvents, editEvents, getEvents, deleteEvents } from '../src/services/api';
import { createTasks, editTasks, getTask, deleteTask } from '../src/services/api';
import { createReminder, editReminder } from '../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Settings from './Settings';
import Task from './Task';
import TextPrompt from './TextPrompt';
import CreateEventModal from '../src/components/CreateEventModal';
import EventInfoModal from '../src/components/EventInfoModal';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CalendarUI = () => {
    const [currentDate,setCurrentDate] = useState(new Date());
    const [weeksInMonth,setWeeksInMonth] = useState([]);
    
    const [isVisible, setIsVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [events, setEvent] = useState([]);
    const [dayOfEvent, setDayOfEvent] = useState([]);
    const [isAddingEvent, setAddingEvent] = useState(false)
    const [isStartDateTimePicker, setStartDateTimePicker] = useState(false);
    const [isEndDateTimePicker, setEndDateTimePicker] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventStartDate, setEventStartDate] = useState(null);
    const [eventEndDate, setEventEndDate] = useState(null);
    const [eventColor, setEventColor] = useState(null);
    const [eventDescr, setEventDescr] = useState('');
    const [isEventInfoVisible,setIsEventInfoVisible] = useState(false);
    const [selectedEventInfo,setSelectedEventInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false)
    const [editEventID, setEditEventID] = useState(null);
    const [deleteEvent,setDeleteEvent] = useState(false);
    const [deleteEventID, setDeleteEventID] = useState(null);

    useEffect(() => {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        const weeks = eachWeekOfInterval({start,end},{weekStartsOn: 0}).map(startOfWeek => {
            const endOfCurrentWeek = endOfWeek(startOfWeek, { weekStartsOn: 0});
            return eachDayOfInterval({ start: startOfWeek, end: endOfCurrentWeek});
        });
        setWeeksInMonth(weeks);
    },[currentDate]);

    useEffect(() => {
        const fetchEvents = async () => {
            const getEventsFetched = await getEvents();
            setEvent(getEventsFetched || []);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        if (deleteEvent) {
            console.log('Hook Deleting Event ID:',deleteEvent);
            DeleteEvent(deleteEvent);
            setDeleteEvent(false); // reset
            setIsEventInfoVisible(false); // modal closes
            setSelectedEventInfo(null); // clear selected event
        }
    },[deleteEvent]);


    const handleCalendarScroll = (event) => {
        const scroll = event.nativeEvent.contentOffset.y;

        if(scroll < 0){
            setCurrentDate(backward => subMonths(backward,1));
            
        }
        else if(scroll > 0){
            setCurrentDate(forward => addMonths(forward,1));
        }

    };

    const userOnePress = (day) => {
        setSelectedDay(day);
        setAddingEvent(false);
        const selectedDateFormatted = format(day,'yyyy-MM-dd');

        const filteredEvents = events.filter(event => {
            if(event && event.startDate) {
                return format(new Date (event.startDate),'yyyy-MM-dd') === selectedDateFormatted;
            }
            return false;
        });
        setDayOfEvent(filteredEvents);
        setIsVisible(true);
    };

    const userLongPress = (day) => {
        setSelectedDay(day);
        setAddingEvent(true);
        setIsVisible(true);
    };

    const eventInfoPress = (event,key) => {
        setSelectedEventInfo(event);
        setEditEventID(event.id);
        setIsEditing(true);
        setIsEventInfoVisible(true);
    };

    const AddEvent = async () => {
        const newEvent = {
            title: eventTitle,
            startDate: eventStartDate,
            endDate: eventEndDate,
            color: eventColor,
            descr: eventDescr,
        };
        const eventCreation = await createEvents(newEvent);
        setEvent([...events, eventCreation]);
        setIsVisible(false);
    };

    const EditEvent = async () => {
        if (!editEventID) {
            console.error("Event ID is missing.");
            return;
        }
        const updateEvent = {
            title: eventTitle,
            startDate: eventStartDate,
            endDate: eventEndDate,
            color: eventColor,
            descr: eventDescr,
        };
            await editEvents(editEventID, updateEvent)
            setEvent(events.map(event => event.id === editEventID ? { ...event, ...updateEvent } : event));
            setIsEventInfoVisible(false);
            setIsEditing(false);
        setIsVisible(false)
    };

    const DeleteEvent = async (eventId) => {
        try {
            await deleteEvents(eventId);
            setEvent(events.filter(event => event.id !== eventId));
            console.log('Event deleted:',eventId);
        } catch (error) {
            console.log('Error deleting event:',error);
        }

    }
    const closeEventModal = () => {
        setIsVisible(false);
        setEventTitle('');
        setEventStartDate(null);
        setEventEndDate(null);
        setEventColor(null);
        setEventDescr('');
    };

    const TabNavigator = () => {
        return (
            <Tab.Navigator 
            screenOptions={{ 
                animation: 'fade', 
                headerShown:false,
                }}
            >
                <Tab.Screen name="Tasks" component={Task} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    )
                }} />
                <Tab.Screen name="Text Prompt" component={Settings} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    )
                }} />
            </Tab.Navigator>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={calendarStyle.scrollView}
                onScrollEndDrag={handleCalendarScroll}
                scrollEventThrottle={16}
            >
                <View style={calendarStyle.container}>
                    <View style={calendarStyle.header}>
                        <Text style={calendarStyle.headerText}>{format(currentDate,'MMMM yyyy')}</Text>
                    </View>
                    <View style={calendarStyle.dayNamesDisplay}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu ', 'Fri ', 'Sat '].map(day => (
                            <Text key={day} style={calendarStyle.text}>{day}</Text>
                        ))}
                    </View>
                    {weeksInMonth.map((week, weekIndex) => (
                        <View key={weekIndex} style={calendarStyle.weekRow}>
                            {week.map((day, dayIndex) => {
                                const dayOfEvent = events.filter(event => {
                                    const eventDate = format(new Date(event.startDate), 'yyyy-MM-dd');
                                    const currentDay = format(day, 'yyyy-MM-dd');
                                    return eventDate === currentDay;
                                });
                                return (
                                    <TouchableOpacity activeOpacity={0.5} key={dayIndex} style={calendarStyle.dayBox} onPress={() =>
                                        userOnePress(day)} onLongPress={() => userLongPress(day)}>
                                        <View>
                                            <Text style={calendarStyle.dayBoxText}>
                                                {format(day, 'd')}
                                            </Text>
                                            {dayOfEvent.map((event) => (
                                                <TouchableOpacity 
                                                    key={`event-${event.id || uuidv4()}`}
                                                    onPress={() => eventInfoPress(event)}
                                                >   
                                                    <Text
                                                        style={{
                                                            fontSize: 10,
                                                            color: 'black',
                                                            backgroundColor:event.color,
                                                            borderColor:'grey',
                                                            borderWidth:1
                                                        }}
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                    >
                                                        {event.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                    <CreateEventModal
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
                        selectedEvent={selectedEventInfo}
                    />
                    <EventInfoModal
                        isVisible={isEventInfoVisible}
                        onClose={() => setIsEventInfoVisible(false)}
                        selectedEventInfo={selectedEventInfo} //
                        setSelectedDay={setSelectedDay}
                        setEditEventID={() => {}}
                        editEventID={editEventID}
                        setEventTitle={() => {}}
                        setEventStartDate={() => {}}
                        setEventEndDate={() => {}}
                        setEventColor={() => {}}
                        setEventDescr={() => {}}
                        EditEvent={EditEvent}
                        DeleteEvent={DeleteEvent}
                        setIsEventInfoVisible={setIsEventInfoVisible}
                        setIsVisible={() => {}}
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

const LogOutSideBar = (props) => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logOutUser(); // Calls backend to log out.
            await AsyncStorage.removeItem('authToken');
            router.push('/screens/UserAccess');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View styles={styles.logoutContainer}>
                <TouchableOpacity styles={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name='log-out-outline' size={30} color='red' />
                    <Text styles={styles.logoutButton}>Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const AppNavigator = () => {
    return (
        <NavigationContainer initialRouteName="Calendar">
            <Drawer.Navigator 
                drawerContent={(props) => <LogOutSideBar {...props} />}
                screenOptions={{
                    drawerActiveTintColor:'white',
                    drawerActiveBackgroundColor: 'blue',
                    drawerType:'slide',
                }}>
                <Drawer.Screen
                    name="Calendar"
                    component={CalendarUI}
                    options={{
                        drawerIcon: ({ color, size}) => (
                            <Ionicons name="calendar" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Tasks"
                    component={Task}
                    options={{
                        drawerIcon: ({ color, size}) => (
                            <Ionicons name="checkbox" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Text Prompt"
                    component={TextPrompt}
                    options={{
                        drawerIcon: ({ color, size}) => (
                            <Ionicons name="create-outline" size={size} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        drawerIcon: ({ color, size}) => (
                            <Ionicons name="settings-sharp" size={size} color={color} />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    logoutContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'red',
    },
});

export default AppNavigator;