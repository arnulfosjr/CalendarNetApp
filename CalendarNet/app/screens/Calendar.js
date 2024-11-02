import React from 'react';
import { View, Text } from 'react-native';
import calendarStyle from '../src/styles/calendarStyle';
import { format } from 'date-fns';


const LeapYear = () => {

}
const calendarUI = () => {
    return (
        <View style={calendarStyle.container}>
            <View style={calendarStyle.header}>
                <Text style={calendarStyle.headerText}>November 2024</Text>
            </View>
            <View style={calendarStyle.topBox}>
                <Text style={calendarStyle.topBoxText}>Sun</Text>
            </View>
            <View style={calendarStyle.box}>
                <Text style={calendarStyle.boxText}>1</Text>
            </View>
        </View>
    );
};

export default calendarUI;
