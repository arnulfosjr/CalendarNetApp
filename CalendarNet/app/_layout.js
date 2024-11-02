import { Stack } from 'expo-router';

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name='screens/UserAccess' options={{ headerShown:false}} />
            <Stack.Screen name='screens/Calendar' options={{title: 'Calendar'}}/>
        </Stack>
    );
}