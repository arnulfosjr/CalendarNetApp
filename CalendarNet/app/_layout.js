import { Stack } from 'expo-router';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function Layout(){
    return (
        <Stack>
            <Stack.Screen name= 'screens/UserAccess' options={{headerShown: false}}/>
            <Stack.Screen name='drawer' options={{headerShown: false}}/>
            <Stack.Screen name='screens/Calendar' options={{headerShown: false}}/>
        </Stack>
    );
}