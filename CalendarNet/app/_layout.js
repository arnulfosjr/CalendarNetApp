import { Stack } from 'expo-router';

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name='UserAccess' />
            <Stack.Screen name='Calendar' />
        </Stack>
    );
}