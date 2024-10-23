import { Stack } from 'expo-router';

export default function App(){
    return(
        <Stack>
            <Stack.Screen name="SignIn" />
            <Stack.Screen name="LogIn" />
            <Stack.Screen name="Calendar" />
        </Stack>
    );
}