import React from 'react';
import {View,Text,TextInput,Image} from 'react-native';
import styles from '../styles/styles';
import AppButton from '../components/AppButton';

const SignIn = () => {
    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.jpg')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to CalendarNet</Text>
            </View>
            <View>
                <Text style={styles.text}>Sign Up Here</Text>
            </View>
            <Text style={styles.text}>Email:</Text>
            <TextInput
                style={styles.textBox}
                placeholder='Enter an Email'
            />
            <Text style={styles.text}>Password:</Text>
            <TextInput
                style={styles.textBox}
                placeholder='Enter a Password'
            />
            <AppButton
                title='Sign In'
                onPress={() => router.push('Calendar')}
            />
            <Image
                source={require('../assets/images/BottomDesign.png')}
                style={styles.bottomImage}
                resizeMode="contain"
            />
        </View>
    );
};

export default SignIn;