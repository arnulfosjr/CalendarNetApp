import React, { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../src/styles/styles';
import AppButton from '../src/components/AppButton';
import { createUsers, logInUser } from '../src/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAccess = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const accessChoice = () => {
        setIsSignIn(!isSignIn);
    };

    const userSubmission = async () => {
        try {
            const userData = { email, password };
            if (isSignIn) {
                const response = await createUsers(userData);
                if (response) {
                    console.log('new user is in');
                    await AsyncStorage.setItem('authToken',response.data);
                    router.push('/screens/Calendar');
                }
                else {
                    console.log('New user cannot get in');
                }
            } else {
                const response = await logInUser(userData);
                if (response && response.token) {
                    console.log('Returning user is in', response.token);
                    await AsyncStorage.setItem('authToken', response.token);
                    router.push('/screens/Calendar');
                }
                else {
                    console.log('Returning user cannot get in: unathorized');
                }
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView 
            style={{flex:1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64:0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Image
                            source={require('../src/assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.headerText}>Welcome to CalendarNet</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.text, { fontSize: 30, height: 60 }]}>{isSignIn ? "Sign In" : "Log In"}</Text>
                        </View>
                        <Text style={styles.text}>Email:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder='Enter Email'
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text style={styles.text}>Password:</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder='Enter Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <AppButton
                            title={isSignIn ? "Sign Up" : "Log In"}
                            onPress={userSubmission}
                        />
                        <Text style={[styles.text, { marginTop: 20 }]}>{isSignIn ? "Returning User?" : "New User?"} </Text>
                        <TouchableOpacity onPress={accessChoice}>
                            <Text style={[styles.text, { color: '#F7BF1E', marginTop: 1 }]}> {isSignIn ? "Log In" : "Sign Up"}</Text>
                        </TouchableOpacity>
                        <Image
                            source={require('../src/assets/images/BottomDesign.png')}
                            style={styles.bottomImage}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
export default UserAccess;