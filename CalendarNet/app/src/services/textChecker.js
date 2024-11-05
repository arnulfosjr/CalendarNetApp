import nlp from "compromise";

const sentence = "Create dentist appointment on November 9, 2024 at 10:00 AM.";

const doc = nlp(sentence);

const date = doc.dates().out('array');
console.log(date);