import React,{useState, useEffect} from 'react';
import { View, Text,ScrollView,TouchableOpacity,Modal, SafeAreaView} from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import popUpStyle from '../src/components/popUpStyle';
import AppButton from '../src/components/AppButton';
import { format, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, endOfWeek} from 'date-fns';
import { logOutUser,createEvents,getEvents } from '../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const calendarUI = () => {
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
            await AsyncStorage.removeItem('userToken');
            console.log('User logged out successfully.')
            router.push('/screens/UserAccess');
        } catch (error) {
            console.error('Error logging out:',error);
        }
    };

    const userOnePress = (day) => {
        setSelectedDay(day);
        
        const filteredEvents = events.filter(event => 
            format(new Date(event.date),'yyyy-MM-dd') === format(day,'yyyy-MM-dd')
        );
        setDayOfEvent(filteredEvents);
        setIsVisible(true);
        
    };

    const userLongPress = (day) => {
        
    };


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
                            <Text style={popUpStyle.popUpText}>
                                {selectedDay ? format(selectedDay,'yyyy-MM-dd'): ''}
                            </Text>
                                {dayOfEvent.length > 0 ? (
                                    dayOfEvent.map((eventx,index) => (
                                        <Text key={index} style={popUpStyle.popUpText}>
                                            {format(new Date(eventx.date),'p')}: {eventx.title}
                                        </Text>
                                    ))
                                ) : (<Text style={popUpStyle.popUpText}>No events for this day.</Text>    
                                )}
                            <AppButton title="Close" onPress={()=> setIsVisible(false)}/>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default calendarUI;
