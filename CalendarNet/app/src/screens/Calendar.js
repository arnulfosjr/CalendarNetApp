import React from 'react';
import {View,Text} from 'react-native';
import styles from '../styles/styles';
import {format} from 'date-fns';


const Months = [
    {month:'January',monthAcro:'Jan', days:31},
    {month:'February',monthAcro:'Feb', days:28},
    {month:'March',monthAcro:'Mar', days:31},
    {month:'April',monthAcro:'Apr', days:30},
    {month:'May',monthAcro:'May', days:30},
    {month:'June',monthAcro:'Jun', days:31},
    {month:'July',monthAcro:'Jul', days:31},
    {month:'August',monthAcro:'Aug', days:31},
    {month:'September',monthAcro:'Sep', days:30}, 
    {month:'October',monthAcro:'Oct', days:31},
    {month:'November',monthAcro:'Nov', days:30},
    {month:'December',monthAcro:'Dec', days:31}
];

const LeapYear = () => {

}
const calendarUI = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
            <Text style={styles.text}>CalendarNet</Text>
        </View>
    );
};

export default calendarUI;
