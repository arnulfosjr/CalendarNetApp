import React, { useState, useEffect} from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import popUpStyle from '../styles/popUpStyle';
import CalendarButton from './CalendarButton';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const colorOptions = ['#FD7E14', '#33FF57', '#007BFF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#6C757D', '#28A745', '#3498DB'];

const CreateTaskModal = ({
    isVisible,
    setIsVisible,
    selectedTask,
    tasks,
    isAddingTasks,
    setTaskTitle,
    taskTitle,
    setTaskDueDate,
    taskDueDate,
    setTaskColor,
    taskColor,
    setTaskDescr,
    taskDescr,
    setTaskIsCompleted,
    taskIsCompleted,
    AddTask,
    setDueDateTimePicker,
    isDueDateTimePicker,
    selectedTaskInfo,
}) => {

    useEffect(() => {
        if (isVisible && selectedTask) {
            handleDueDateDefaultDate();
        }
    }, [isVisible,selectedTask]);


    const handleDueDateDefaultDate = () => {
        const defaultDueDate = format(new Date(),'yyyy-MM-dd h:mm a');
        setTaskDueDate(defaultDueDate);
    };

    const resetFields = () => {
        setIsVisible(false);
        setTaskTitle('');
        setTaskDueDate(moment().utc().toDate());
        setTaskColor('#6C757D');
        setTaskDescr('');
        setTaskIsCompleted(false);
    };

    const handleSaveTask = () => {
        console.log("taskDueDate:", taskDueDate, typeof taskDueDate);
 
        const dueDateUTC = moment(taskDueDate).utc().toISOString();

        const taskData = {
            title: taskTitle,
            dueDate: dueDateUTC,
            color: taskColor,
            descr: taskDescr,
            isCompleted: taskIsCompleted,
        };
        console.log("Task data to be saved:", taskData); // Debugging log
        AddTask(taskData);
        resetFields();
    };

    return (
        <Modal animationType='fade' transparent={true} visible={isVisible}>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <CalendarButton title="Close" onPress={resetFields}/>
                        <Text style={popUpStyle.Header}>
                            {selectedTask}
                        </Text>
                        <Text style={popUpStyle.Header}>Create Task:</Text>
                        <Text style={popUpStyle.textTitle}>Title:</Text>
                        <TextInput
                            placeholder='Title'
                            value={taskTitle}
                            onChangeText={setTaskTitle}
                            style={popUpStyle.text}
                        />
                        <Text style={popUpStyle.textTitle}>Due Date:</Text>
                        <TouchableOpacity onPress={() => setDueDateTimePicker(true)}>
                            <TextInput
                                placeholder='Due Date'
                                value={
                                    taskDueDate && !isNaN(new Date(taskDueDate).getTime()) 
                                    ? format(new Date(taskDueDate), 'yyyy-MM-dd h:mm a')
                                    : ''
                                }
                                onChangeText={setTaskDueDate}
                                editable={false}
                                style={popUpStyle.text}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDueDateTimePicker}
                            mode="datetime"
                            date={taskDueDate instanceof Date ? taskDueDate: new Date()}
                            onConfirm={(date) => {
                                console.log('Selected due date:',date);
                                setTaskDueDate(new Date(date));
                                setDueDateTimePicker(false);
                            }}
                            onCancel={() => setDueDateTimePicker(false)}
                        />
                         <Text style={popUpStyle.textTitle}>Choose Task Color:</Text>
                        <View style={styles.container}>
                            {colorOptions.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorBox, 
                                        { backgroundColor: color }, 
                                        taskColor === color && styles.selectedBox,
                                    ]}
                                    onPress={() => setTaskColor(color)}
                                />
                            ))}
                        </View>
                        <Text style={popUpStyle.textTitle}>Description:</Text>
                        <TextInput
                            placeholder='Description'
                            value={taskDescr}
                            onChangeText={setTaskDescr}
                            style={popUpStyle.text}
                        />
                        <CalendarButton title="Save" onPress={()=> {
                            handleSaveTask();
                            setIsVisible(false);
                        }}/>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent:'space-around'
    },
    colorBox: {
        width: 45,
        height: 30,
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        margin:1
    },
    repeatBox: {
        width: 60,
        height: 25,
        borderColor: '#000',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        margin:1,
        marginBottom:5
    },
    selectedBox: {
        borderWidth:3,
    }

});

export default CreateTaskModal;