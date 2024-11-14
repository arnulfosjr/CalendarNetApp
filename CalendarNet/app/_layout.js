import React, { useState, useEffect,useLayoutEffect} from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler';
import { Text } from 'react-native';
import UserAccess from './screens/UserAccess';
import Calendar from './screens/Calendar';
import Settings from './screens/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter} from 'expo-router';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token); // Sets true if token exists, false it doesn't.
        };
        checkAuth();
    }, []);


    useEffect(() => {
        if (isAuthenticated !== null){
            if (isAuthenticated){
                router.push('/screens/Calendar');
            } else {
                router.push('/screens/UserAccess');
            }
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated === null){
        return( 
            <GestureHandlerRootView style={{ flex:1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading...</Text>
            </GestureHandlerRootView>
        );
    } 
    return <Slot/>;
}

