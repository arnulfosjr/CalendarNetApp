import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Settings from '../screens/Settings';
import Calendar from '../screens/Calendar';
const Drawer = createDrawerNavigator();

function DrawerNavigator(){
    return(
        <GestureHandlerRootView style={{ flex:1 }}>
                <Drawer.Navigator 
                    initialRouteName="Calendar"
                    screenOptions={{
                        gestureEnabled: true,
                        swipeEdgeWidth: 100,
                        headerShown:true,
                    }}
                >
                    <Drawer.Screen name="Calendar" component={Calendar} options={{headerStyle:{backgroundColor:'blue'}}}/>
                    <Drawer.Screen name="Settings" component={Settings}/>
                </Drawer.Navigator>
        </GestureHandlerRootView>
    );
};
export default DrawerNavigator;

