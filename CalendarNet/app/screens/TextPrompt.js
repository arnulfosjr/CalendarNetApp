import React from 'react';
import {View, Text} from 'react-native';
import styles from '../src/styles/styles';

const HelloWorld = () => {
    return(
        <View style={styles.header}>
            <Text>Text Prompt here</Text>
        </View>
    );
};

export default HelloWorld;