import React, {useState} from 'react';
import {View, Text, TextInput,TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView} from 'react-native';
import textPromptStyle from '../src/styles/textPromptStyle';
import TextChecker from '../src/services/textChecker';

const TextPrompt = () => {
    const [textInput,setTextInput] = useState('');

    const handleSubmit = () => {
        TextChecker(textInput);
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
                                            <TouchableOpacity style={[textPromptStyle.button]} onPress={handleSubmit}>
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