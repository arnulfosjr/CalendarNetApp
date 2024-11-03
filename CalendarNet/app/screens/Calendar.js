import React from 'react';
import { View, Text } from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import { format, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, eachWeekOfInterval, endOfWeek} from 'date-fns';

const calendarUI = () => {
    const date = new Date(2024,9,1);
    const monthYear = format(date,'MMMM yyyy'); // Display month and year
    const start = startOfMonth(date);  // start of the month number
    const end = endOfMonth(date);      // end of the month number.
    const weeks = eachWeekOfInterval({start,end},{weekStartsOn:0}); 

    const weeksInMonth = weeks.map(startOfWeek => {
        const endOfCurrentWeek = endOfWeek(startOfWeek,{weekStartsOn:0});
        const daysInWeek = eachDayOfInterval({ start: startOfWeek, end: endOfCurrentWeek });
        return daysInWeek;
    });

    return (
        <View style={calendarStyle.container}>
            <View style={calendarStyle.header}>
                <Text style={calendarStyle.headerText}>{monthYear}</Text>
            </View>
            <View style={calendarStyle.dayNamesDisplay}>
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day =>(
                    <Text key={day} style={calendarStyle.dayBoxText}>{day}</Text>
                ))}
            </View>
            {weeksInMonth.map((week,weekIndex) => (
                <View key={weekIndex} style={calendarStyle.weekRow}>
                    {week.map((day, dayIndex) => (
                        <View key={dayIndex} style={calendarStyle.dayBox}>
                            <Text style={calendarStyle.text}>
                                {day.getMonth() === date.getMonth() ? format(day,'d'):''}
                            </Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

export default calendarUI;
