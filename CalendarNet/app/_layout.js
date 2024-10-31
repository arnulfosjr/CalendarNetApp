import { Stack } from 'expo-router';

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name='UserAccess' options={{ headerShown:false}} />
            <Stack.Screen name='Calendar' options={{title: 'Calendar'}}/>
        </Stack>
    );
}