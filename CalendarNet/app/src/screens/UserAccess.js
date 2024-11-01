import React,{useState} from 'react' 
import {View,Text,TextInput,Image,TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import AppButton from '../components/AppButton';
import { createUsers, logInUser } from '../services/api';
import { useRouter } from 'expo-router';

const UserAccess = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [email, setEmail] = useState(''); 
    const [password,setPassword] = useState('');
    const router = useRouter();


    const accessChoice = () => {
        setIsSignIn(!isSignIn);
    };

    const userSubmission = async () => {
        try{
            if(isSignIn){
                const userData = {email, password};
                const response = await createUsers(userData);
                if(response){
                    console.log('new user is in');
                    router.push('Calendar');
                }
                else{
                    console.log('new user cannot get in');
                }
            }else {
                const userData = {email, password};
                const response = await logInUser(userData);
                if(response){
                    console.log('returning user is in ');
                    router.push('Calendar');
                }
                else{
                    console.log('returning user cannot get in');
                }
            }
        } catch (error){
            console.error('Error:',error);
        }
    };

    return(
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.jpg')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>Welcome to CalendarNet</Text>
                </View>
            </View>
            <View>
                <Text style={[styles.text,{fontSize:30,height:60}]}>{isSignIn ? "Sign In": "Log In"}</Text>
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
                secureTextEntry
            />
            <AppButton
                title={isSignIn ? "Sign Up" : "Log In"}
                onPress={userSubmission}
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
export default UserAccess;