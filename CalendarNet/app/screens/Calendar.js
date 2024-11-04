import React,{useState} from 'react';
import { View, Text,ScrollView,TouchableOpacity,Modal} from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import popUpStyle from '../src/components/popUpStyle';
import AppButton from '../src/components/AppButton';
import { format, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, endOfWeek} from 'date-fns';
import { createEvents,getEvents } from '../src/services/api';

const calendarUI = () => {
    const date = new Date();
    const monthYear = format(date,'MMMM yyyy'); // Display month and year
    const start = startOfMonth(date);  // start of the month number
    const end = endOfMonth(date);      // end of the month number.
    const weeks = eachWeekOfInterval({start,end},{weekStartsOn:0}); 
    const [isVisible,setIsVisible] = useState(false);
    const [selectedDay,setSelectedDay] = useState(null);

    const weeksInMonth = weeks.map(startOfWeek => {
        const endOfCurrentWeek = endOfWeek(startOfWeek,{weekStartsOn:0});
        const daysInWeek = eachDayOfInterval({ start: startOfWeek, end: endOfCurrentWeek });
        return daysInWeek;
    });

    const userOnePress = (day) => {
        setSelectedDay(day);
        setIsVisible(true);
    };

    const userLongPress = (day) => {
        
    };

    return (
        <ScrollView style={calendarStyle.scrollView}>
            <View style={calendarStyle.container}>
                <View style={calendarStyle.header}>
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
                            {selectedDay ? format(selectedDay,'MMMM d, yyyy'): ''}
                        </Text>
                        <View style={popUpStyle.Content}>
                            <Text style={popUpStyle.popUpText}>
                                {}
                            </Text>
                        </View>
                        <AppButton title="Close" onPress={()=> setIsVisible(false)}/>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default calendarUI;
