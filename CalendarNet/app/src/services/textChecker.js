import React, {useState}from 'react';
import nlp from "compromise";

const TextChecker = (textInput) => {
    const tasks = ['Groceries'];

    const createWords = ['Create','Make','Build','Set Up', 'Today'];
    const editWords = ['Edit','Adjust','Modify','Revise','Correct','Update','Alter','change']
    const deleteWords = ['Delete','Remove','Cancel','Dismiss','Discard','Erase']

    const eventTitle = ['Zoom meeting', 'Zoom','Google Meet', 'Conference call', 'Webinar', 'Team meeting', 
        'Birthday', 'Doctor appointment', 'Lunch meeting','Workshop','Presentation','Event','Dinner','Call','Class','Party','Dentist Appointment'
        ,'Assignment','Homework','ASG','Hrmk'
    ];

    let doc = nlp(textInput);

    let date = doc.match('#Date').out('text');
    let time = doc.match('#Time').out('array');

    let detectedCreation = false;
    createWords.forEach(event => {
        if (doc.has(event)) {
            detectedCreation = true;
        }
    });

    let detectedEdit = false;
    editWords.forEach(event => {
        if (doc.has(event)) {
            detectedEdit = true;
        }
    });

    let detectedDeletion = false;
    deleteWords.forEach(event => {
        if (doc.has(event)) {
            detectedDeletion = true;
        }
    });

    let detectedEventTitle = [];
    eventTitle.forEach(event => {
        if (doc.has(event)) {
            detectedEventTitle.push(event);
        }
    });


    console.log('Dates:' ,date);
    console.log('Times:', time);
    console.log('Dectected Creation:', detectedCreation);
    console.log('Dectected Edit:', detectedEdit);
    console.log('Dectected Deletion:', detectedDeletion);
    console.log('Detected Event Title:', detectedEventTitle);
    
    return {
        date,
        time,
        detectedCreation,
        detectedEdit,
        detectedDeletion,
        detectedEventTitle,
    };
};
export default TextChecker;