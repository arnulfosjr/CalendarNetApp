import React, {useState} from 'react';
import {View, Text, TextInput,TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Alert} from 'react-native';
import textPromptStyle from '../src/styles/textPromptStyle';
import TextChecker from '../src/services/textChecker';
import PromptConfirmation from '../src/components/PromptConfirmation';

const TextPrompt = () => {
    const [textInput,setTextInput] = useState('');

    const handleSubmit = (input) => {
        const analysis = TextChecker(input);

        // if all empty input
        if ( !analysis.detectedCreation && !analysis.detectedEdit && 
            !analysis.detectedDeletion && analysis.date.length === 0 &&
            analysis.time.length === 0 && analysis.detectedEventTitle.length === 0
        ){
            console.log('Is All False and Empty');
            Alert.alert(
                "Missing Info Needed",'Add action, name title, date, and time'
            );

        // if one action is true but no other info
        } else if ((!analysis.detectedCreation || !analysis.detectedEdit || !analysis.detectedDeletion)
            && analysis.date.length === 0 && analysis.time.length === 0 && analysis.detectedEventTitle.length === 0){
                console.log('One action is true but no other info');
                Alert.alert(
                    "Missing Info Needed",'Add name title, date, time.'
                ); 

        // if one action is true and title exists but no date or time.
        } else if ((!analysis.detectedCreation || !analysis.detectedEdit || !analysis.detectedDeletion)
            && (analysis.detectedEventTitle.length > 0 && analysis.date.length === 0 && analysis.time.length === 0)){
                console.log('One action is true and title exists but no date or time.');
                Alert.alert(
                    "Missing Info Needed",'Add date and time.'
                ); 

        // if one action is true, title exits, date exists but no time.
        }  else if ((!analysis.detectedCreation || !analysis.detectedEdit || !analysis.detectedDeletion)
            && (analysis.detectedEventTitle.length > 0 && analysis.date.length > 0 && analysis.time.length === 0)){
                console.log('One action is true, title exits, date exists but no time.');
                Alert.alert(
                    "Missing Info Needed",'Add time.'
                );  
        } else {
            console.log('Input Check passed');
            Alert.alert(
                "Result", 'Success!'
            )

        }
        
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{ flex: 1, backgroundColor:'#2960AC'}}>
                <KeyboardAvoidingView 
                style={{flex:1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64:0}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={textPromptStyle.container}>
                            <View style={[textPromptStyle.header, {top:130, zIndex:1}]}>
                                <Text style={[textPromptStyle.headerText,{color:'white',fontWeight:'bold'}]}>Calendar Text Prompt</Text>
                            </View>
                            <View style={[textPromptStyle.header,{top:110}]}>
                                <Text style={[textPromptStyle.text,{fontWeight:'500'}]}>Create, Edit, Delete Events and Tasks.</Text>
                            </View>
                                    <View style={[textPromptStyle.header,{height:410}]}>
                                        <Text style={[textPromptStyle.text,{fontWeight:'500'}]}>Enter Prompt:</Text>
                                            <TextInput 
                                                style={[textPromptStyle.textBox, {height:50, width:300, marginTop:10}]}
                                                placeholder='Enter your prompt here'
                                                value={textInput}
                                                onChangeText={setTextInput}
                                                autoCapitalize='none'
                                                multiline={true}
                                                numberOfLines={5}
                                                textAlignVertical='top'
                                            />
                                            <TouchableOpacity style={[textPromptStyle.button]} onPress={() => handleSubmit(textInput)}>
                                                <Text style={textPromptStyle.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                    </View>
                        </View> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TextPrompt;