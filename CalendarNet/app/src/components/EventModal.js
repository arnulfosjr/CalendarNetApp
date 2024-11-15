// src/components/EventModal.js
import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import popUpStyle from '../styles/popUpStyle';
import AppButton from './AppButton';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EventModal = ({
    isVisible,
    setIsVisible,
    selectedDay,
    events,
    dayOfEvent,
    isAddingEvent,
    setEventTitle,
    eventTitle,
    setEventStartDate,
    eventStartDate,
    setEventEndDate,
    eventEndDate,
    setEventColor,
    eventColor,
    setEventDescr,
    eventDescr,
    AddEvent,
    setStartDateTimePicker,
    setEndDateTimePicker,
    isStartDateTimePicker,
    isEndDateTimePicker,
}) => {

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <Text style={popUpStyle.popUpHeader}>
                        {selectedDay ? format(selectedDay, 'yyyy-MM-dd') : ''}
                    </Text>
                    {isAddingEvent ? (
                        <>
                            <TextInput
                                placeholder='Title'
                                value={eventTitle}
                                onChangeText={setEventTitle}
                                style={popUpStyle.popUpText}
                            />
                            <TouchableOpacity onPress={() => setStartDateTimePicker(true)}>
                                <TextInput
                                    placeholder='Start Date'
                                    value={eventStartDate ? format(new Date(eventStartDate), 'yyyy-MM-dd HH:mm') : ''}
                                    onChangeText={setEventStartDate}
                                    editable={false}
                                    style={popUpStyle.popUpText}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isStartDateTimePicker}
                                mode="datetime"
                                date={eventStartDate ? new Date(eventStartDate) : new Date()}
                                onConfirm={(date) => {
                                    setEventStartDate(date);
                                    setStartDateTimePicker(false);
                                }}
                                onCancel={() => setStartDateTimePicker(false)}
                            />
                            <TouchableOpacity onPress={() => setEndDateTimePicker(true)}>
                                <TextInput
                                    placeholder='End Date'
                                    value={eventEndDate ? format(new Date(eventEndDate), 'yyyy-MM-dd HH:mm') : ''}
                                    onChangeText={setEventEndDate}
                                    editable={false}
                                    style={popUpStyle.popUpText}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isEndDateTimePicker}
                                mode="datetime"
                                date={eventEndDate ? new Date(eventEndDate) : new Date()}
                                onConfirm={(date) => {
                                    setEventEndDate(date);
                                    setEndDateTimePicker(false);
                                }}
                                onCancel={() => setEndDateTimePicker(false)}
                            />
                            <TextInput
                                placeholder='Color'
                                value={eventColor}
                                onChangeText={setEventColor}
                                style={popUpStyle.popUpText}
                            />
                            <TextInput
                                placeholder='Description'
                                value={eventDescr}
                                onChangeText={setEventDescr}
                                style={popUpStyle.popUpText}
                            />
                            <AppButton title="Add Event" onPress={AddEvent} />
                        </>
                    ) : (
                        <ScrollView>
                            {dayOfEvent.map((eventx, index) => (
                                <View key={index} style={popUpStyle.Content}>
                                    <Text>{eventx.title}</Text>
                                    <Text>{format(new Date(eventx.startDate), 'p')} - {format(new Date(eventx.endDate), 'p')}</Text>
                                    <Text>{eventx.descr}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                    <AppButton title="Close" onPress={() => setIsVisible(false)} />
                </View>
            </View>
        </Modal>
    );
};

export default EventModal;
