import React from 'react';
import {View, Text} from 'react-native';
import styles from '../src/styles/styles';

const HelloWorld = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
        </View>
    );
};

export default HelloWorld;