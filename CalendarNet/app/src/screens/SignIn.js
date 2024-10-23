import React from 'react';
import {View,Text,Button} from 'react-native';
import styles from '../styles/styles';

const SignIn = () => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to CalendarNet</Text>
            </View>
            <Text style={styles.text}>Sign In</Text>
            <Button title='Go to Log In' onPress={() => router.push('LogIn')} />
        </View>
    );
};

export default SignIn;