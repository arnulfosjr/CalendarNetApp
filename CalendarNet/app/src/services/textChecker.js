import React, {useState}from 'react';
import nlp from "compromise";

const TextChecker = (textInput) => {
    const tasks = ['Groceries'];

    const createWords = ['Create','Make','Build','Set Up', 'Today'];
    const editWords = ['Edit','Adjust','Modify','Revise','Correct','Update','Alter','change']
    const deleteWords = ['Delete','Remove','Cancel','Dismiss','Discard','Erase']

    const eventTitle = ['Zoom meeting', 'Google Meet', 'Conference call', 'Webinar', 'Team meeting', 'Appointment', 
        'Birthday', 'Doctor appointment', 'Lunch meeting','Workshop','Presentation','Event','Dinner','Call','Class','Party'];

    let doc = nlp(textInput);

    let date = doc.match('#Date').out('array');
    let time = doc.match('#Time').out('array');
    let verbs = doc.match('#Verb').out('array');


    let detectedEventTitle = [];
    eventTitle.forEach(event => {
        if (doc.has(event)) {
            detectedEventTitle.push(event);
        }
    });

    console.log('Dates' ,date);
    console.log('Times:', time);
    console.log('Verbs:', verbs);
    console.log('Detected Event Title:', detectedEventTitle);
    
    return {
        date,
        time,
        verbs,
        detectedEventTitle,
    };
};
export default TextChecker;