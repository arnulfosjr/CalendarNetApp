import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Settings from '../screens/Settings';
import Calendar from '../screens/Calendar';
const Drawer = createDrawerNavigator();

function DrawerNavigator(){
    return(
        <GestureHandlerRootView style={{ flex:1 }}>
            <NavigationContainer>
                <Drawer.Navigator 
                    initialRouteName="Calendar"
                    screenOptions={{
                        gestureEnabled: true,
                        swipeEdgeWidth: 70,
                    }}
                >
                    <Drawer.Screen name="Calendar" component={Calendar}/>
                    <Drawer.Screen name="Settings" component={Settings}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};
export default DrawerNavigator;

