import React from 'react';
import {View,Text} from 'react-native';
import styles from './src/styles/styles';

const element = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hello World!</Text>
            <Text style={styles.text}>CalendarNet</Text>
        </View>
    );
};

export default element;
