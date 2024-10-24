import React from 'react';
import { StyleSheet,Text,TouchableOpacity } from "react-native";

const AppButton = ({title,onPress}) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#ffffff',
        padding:5,
        borderRadius:50,
        alignItems:'center',
        width:100,
    },
    buttonText:{
        color:'black',
        fontSize:16,
        fontWeight:'bold',
    },
});

export default AppButton;