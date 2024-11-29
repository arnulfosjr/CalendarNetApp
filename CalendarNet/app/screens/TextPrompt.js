import React, {useState} from 'react';
import {View, Text, TextInput,TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView} from 'react-native';
import styles from '../src/styles/styles';

const TextPrompt = () => {
    const [textInput,setTextInput] = useState('');

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{ flex: 1, backgroundColor:'#2960AC'}}>
                <KeyboardAvoidingView 
                style={{flex:1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64:0}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.container}>
                            <View style={[styles.header, {position:'absolute', top:100, zIndex:1}]}>
                                <Text style={[styles.headerText,{color:'white',fontWeight:'bold'}]}>Calendar Text Prompt</Text>
                            </View>
                            <View style={[styles.header,{position:'absolute', top:130}]}>
                                <Text style={[styles.text,{fontWeight:'500'}]}>Create, Edit, Delete Events and Tasks.</Text>
                            </View>
                            <View style={[styles.header,{position:'absolute', top:200,marginTop:30}]}>
                                    <Text style={[styles.text,{fontWeight:'500'}]}>Enter Prompt:</Text>
                                    <View>
                                        <TextInput 
                                            style={[styles.textBox, {height:50, width:300, marginTop:10}]}
                                            placeholder='Type here...'
                                            value={textInput}
                                            onChangeText={setTextInput}
                                            autoCapitalize='none'
                                            multiline={true}
                                            numberOfLines={5}
                                            textAlignVertical='top'
                                        />
                                    </View>
                            </View>
                        </View> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TextPrompt;