import React, {useState} from 'react';
import {View, Text, TextInput,TouchableOpacity,KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Alert} from 'react-native';
import textPromptStyle from '../src/styles/textPromptStyle';
import TextChecker from '../src/services/textChecker';
import PromptConfirmationModal from '../src/components/PromptConfirmationModal';
import { format, parse } from 'date-fns';

const TextPrompt = () => {
    const [textInput,setTextInput] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [eventTitle,setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [isPromptConfirmationVisible, setIsPromptConfirmationVisible] = useState(false);

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
            setIsCreate(analysis.detectedCreation);
            setIsEdit(analysis.detectedEdit);
            setIsDelete(analysis.detectedDeletion);
            setEventTitle(analysis.detectedEventTitle.join(', '));
            setEventDate(analysis.date);
            setEventTime(analysis.time);
            setIsPromptConfirmationVisible(true);

        }
        
    };
    // Preprocess the eventDate to ensure proper format (add space before AM/PM if necessary)
    const processedEventDate = eventDate.replace(/(\d{1,2})([APap][Mm])/, '$1 $2');

    // Parse the date with the updated format
    const parsedDate = processedEventDate ? parse(processedEventDate, 'MM/dd/yy h:mm a', new Date()) : null;

    // Format the parsed date or display "Invalid date"
    const formattedEventDate = parsedDate && !isNaN(parsedDate.getTime()) 
    ? format(parsedDate, 'MMMM dd, yyyy h:mm a') 
    : 'Invalid date or time';

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
                                <PromptConfirmationModal
                                    isVisible={isPromptConfirmationVisible}
                                    onClose={() => setIsPromptConfirmationVisible(false)}
                                    title={eventTitle}
                                    date={formattedEventDate}
                                    time={eventTime}
                                    isCreate = {isCreate}
                                    isEdit = {isEdit}
                                    isDelete = {isDelete}
                                />
                        </View> 
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TextPrompt;