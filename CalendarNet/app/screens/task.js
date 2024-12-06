import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
import { createTask, editTask, getTask, deleteTask } from '../src/services/api';
import CalendarButton from '../src/components/CalendarButton';
import { Ionicons } from '@expo/vector-icons';
import styles from '../src/styles/styles';
import CreateTaskModal from '../src/components/CreateTaskModal';
import TaskInfoModal from '../src/components/TaskInfoModal';

const TaskUI = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isTaskInfoVisible, setIsTaskInfoVisible] = useState(false);
    const [selectedTaskInfo, setSelectedTaskInfo] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDueDateTimePicker, setDueDateTimePicker] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDueDate,setTaskDueDate] = useState(new Date());
    const [taskColor, setTaskColor] = useState('#6C757D');
    const [taskDescr, setTaskDescr] = useState('');
    const [taskIsCompleted, setTaskIsCompleted] = useState(false);
    const [taskUpdateTimeCreated, setTaskUpdateTimeCreated] = useState(new Date());
    const [isTaskEvent, setTaskEvent] = useState(false)
    const [isAddingTask, setAddingTask] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editTaskID, setEditTaskID] = useState(null);
    const [delete_Task, setDeleteTask] = useState(false);
    const [deleteTaskID, setDeleteTaskID] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const getTasksFetched = await getTask();
            setTasks(getTasksFetched || []);
        };
        fetchTasks();
    }, []);
    
    const taskInfoPress = (task) => {
        setSelectedTaskInfo(task);
        setEditTaskID(task.id);
        setIsEditing(true);
        setIsTaskInfoVisible(true);

        // Populate form with task data
        setTaskTitle(task.title);  
        setTaskDueDate(new Date(task.endDate));  
        setTaskColor(task.color);  
        setTaskDescr(task.descr);  
    };

    const AddTask = async () => {
        const newTask = {
            title: taskTitle,
            dueDate: taskDueDate,
            color: taskColor,
            descr: taskDescr,
            isCompleted: taskIsCompleted,
        };
        const taskCreation = await createTask(newTask);
        setTasks([...tasks, taskCreation]);
        setIsVisible(false);
    };

    const EditTask = async (taskData) => {
        if (!editTaskID) {
            console.error("Task ID is missing.");
            return;
        }
        
        try {
            const updatedTask = await editTask(editTaskID, taskData)
            if(updatedTask){
                setTasks(tasks.map(task => task.id === editTaskID ? { ...task, ...updatedTask } : task));
            }

            setIsTaskInfoVisible(false);
            setIsEditing(false);
            setIsVisible(false);
            clearForm();
            console.log("Task edited successfully:", updatedTask);
        } catch (error){
            console.log("Error editng task in EditTask.");
        }
    };

    const DeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.log('Error deleting task:', error);
        }
    }

    const clearForm = () => {
        setTaskTitle('');
        setTaskDueDate(new Date());
        setTaskColor('#6C757D');
        setTaskDescr('');
        setTaskIsCompleted(false);
    };

    const handleAddPress = () => {
        clearForm();
        setAddingTask(true);
        setIsVisible(true);
    };

    const taskCompletion = async (taskId) => {
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        if(!taskToUpdate) return;

        const isNowCompleted = !taskToUpdate.isCompleted;
        const taskUpdate = {...taskToUpdate, isCompleted: !taskToUpdate.isCompleted, isCompleted: isNowCompleted,
            ...(isNowCompleted && { taskUpdateTimeCreated: new Date() }), };
        await editTask(taskId, taskUpdate);

        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? taskUpdate : task
            )
        );
    }

    const renderTaskItem = ({ item }) => (
        <View>
            <Ionicons
                name={item.isCompleted ? 'checkbox' : 'square-outline'}
                size={30}
                color={item.isCompleted ? '#28A745' : 'black'}
                onPress={() => taskCompletion(item.id)}
            />
            <TouchableOpacity onPress={() => taskInfoPress(item)}>
                <View style={[styles.taskItem,{width:260,height:60, marginHorizontal:50}]}>
                    <View style={[styles.container, {flexDirection:'row',marginBottom:15,
                        borderColor:'black',borderWidth:1, width:135, backgroundColor:item.color}]}>
                        <Text style={[styles.taskTitle,{fontWeight:'bold'}]}> {item.title}</Text>
                    </View>
                    <View>
                    {item.isCompleted && item.taskUpdateTimeCreated && (
                        <View>
                            <Text style={{ fontSize: 12, color: 'black', fontWeight:'bold', marginBottom:5}}>
                                Completed: {new Date(item.taskUpdateTimeCreated).toLocaleString()}
                            </Text>
                        </View>
                    )}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return(
        <SafeAreaView style={{ flex:1 }}>
            <View style={styles.container}>
                <View style={[styles.header,{position:'absolute', top:30, left:10}]}>
                    <Text style={[styles.headerText,{color:'white',fontWeight:'bold'}]}>Tasks</Text>
                </View> 
                <View style={[styles.header,{position:'relative',top:8,left:150}]}>
                    <TouchableOpacity>
                        <CalendarButton title='+' onPress={handleAddPress}/>
                    </TouchableOpacity>
                </View> 
                <View style={[styles.container,{position:'relative',bottom:80}]}>
                    <Text style={[styles.headerText,{fontWeight:'bold'}]}>Task List</Text>
                </View>
                <View style={[styles.container,{position:'relative', bottom:230, flex:1,borderRadius:5, borderWidth:5}]}>
                    <FlatList
                        data={tasks}
                        renderItem={renderTaskItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={{backgroundColor: 'white'}} 
                        
                    />
                </View>
                <CreateTaskModal
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    selectedTask={selectedTask}
                    tasks={tasks}
                    isAddingTask={isAddingTask}
                    setTaskTitle={setTaskTitle}
                    taskTitle={taskTitle}
                    setTaskDueDate={setTaskDueDate}
                    taskDueDate={taskDueDate}
                    setTaskColor={setTaskColor}
                    taskColor={taskColor}
                    setTaskDescr={setTaskDescr}
                    taskDescr={taskDescr}
                    setTaskIsCompleted={setTaskIsCompleted}
                    taskIsCompleted={taskIsCompleted}
                    AddTask={AddTask}
                    setDueDateTimePicker={setDueDateTimePicker}
                    isDueDateTimePicker={isDueDateTimePicker}
                    selectedTaskInfo={selectedTaskInfo}
                />
                <TaskInfoModal
                    isVisible={isTaskInfoVisible}
                    onClose={() => setIsTaskInfoVisible(false)}
                    selectedTaskInfo={selectedTaskInfo}
                    selectedTask={selectedTask}
                    setEditTaskID={() => { }}
                    editTaskID={editTaskID}
                    setTaskTitle={() => { }}
                    setTaskDueDate={() => { }}
                    setTaskColor={() => { }}
                    setTaskDescr={() => { }} 
                    EditTask={EditTask}
                    DeleteTask={DeleteTask}
                    setIsTaskInfoVisible={setIsTaskInfoVisible}
                    setIsVisible={() => { }}
                    setDueDateTimePicker={setDueDateTimePicker}
                    isDueDateTimePicker={isDueDateTimePicker}
                />
            </View>
        </SafeAreaView>
    );
};

export default TaskUI;
