import React from 'react';
import {View, Text, Modal, FlatList, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import popUpStyle from '../src/styles/popUpStyle';
import CalendarButton from '../src/components/CalendarButton';
import { Ionicons } from '@expo/vector-icons';
import styles from '../src/styles/styles';

const TaskUI = () => {

    const handleAddPress = () => {
        console.log('Add button pressed');
    };

    return(
        <SafeAreaView style={{ flex:1 }}>
            <ScrollView style={{ flex: 1, backgroundColor:'#2960AC'}}>
                <View style={styles.container}>
                    <View style={[styles.header,{position:'absolute', top:30, left:10}]}>
                        <Text style={[styles.headerText,{color:'white',fontWeight:'bold'}]}>Tasks</Text>
                    </View> 
                    <View style={[styles.header,{position:'relative',top:8,left:150}]}>
                        <TouchableOpacity onPress={handleAddPress}>
                            <CalendarButton title='+'/>
                        </TouchableOpacity>
                    </View> 
                    <View style={[styles.container,{top:50}]}>
                        <ScrollView style={{backgroundColor:'#FFFFFF'}}>
                            <Text style={styles.text}>Tasks List</Text>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TaskUI;