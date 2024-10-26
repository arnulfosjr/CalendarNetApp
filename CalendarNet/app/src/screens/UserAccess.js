import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View,Text,TextInput,Image,TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import AppButton from '../components/AppButton';

const userAccess = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [email, setEmail] = useState(''); 
    const [password,setPassword] = useState('');
    const navigation = useNavigation();

    const accessChoice = () => {
        setIsSignIn(!isSignIn);
    };

    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.jpg')}
                style={[styles.logo,{width:400,height:200}]}
                resizeMode="contain"
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome to CalendarNet</Text>
            </View>
            <View>
                <Text style={styles.text}>{isSignIn ? "Sign In": "Log In"}</Text>
            </View>
            <Text style={styles.text}>Email:</Text>
            <TextInput
                style={styles.textBox}
                placeholder='Enter Email'
                value = {email}
                onChangeText={setEmail}
            />
            <Text style={styles.text}>Password:</Text>
            <TextInput
                style={styles.textBox}
                placeholder='Enter Password'
                value = {password}
                onChangeText={setPassword}
            />
            <AppButton
                title={isSignIn ? "Sign Up" : "Log In"}
                onPress={() => navigation.navigate('Calendar')}
            />
            <Text style={[styles.text,{marginTop:20}]}>{isSignIn ? "Returning User?" : "New User?"} </Text>
            <TouchableOpacity onPress={accessChoice}>
                <Text style={[styles.text,{color:'#F7BF1E',marginTop:1}]}> {isSignIn ? "Log In" : "Sign Up"}</Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/images/BottomDesign.png')}
                style={styles.bottomImage}
                resizeMode="contain"
            />
        </View>
    );
};
export default userAccess;