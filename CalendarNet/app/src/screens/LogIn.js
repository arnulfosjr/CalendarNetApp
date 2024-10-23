import React from 'react';
import {View,Text} from 'react-native';
import styles from '../styles/styles';

const LogIn = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to CalendarNet</Text>
            </View>
                <Text style={styles.text}>Log In</Text>
        </View>

    );
};

export default LogIn;