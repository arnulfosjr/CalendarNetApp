import React, { useState, useEffect } from 'react';
import {View, Text, Modal, FlatList, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import popUpStyle from '../src/styles/popUpStyle';
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

    const renderTaskItem = ({ item }) => (
        <TouchableOpacity style={[styles.taskItem,{width:'200',height:50}]} onPress={() => taskInfoPress(item)}>
            <View style={[styles.container, { backgroundColor: item.color, }]}>
                <Text style={styles.text}>C</Text>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDueDate}>{new Date(item.dueDate).toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
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
                <View style={[styles.container]}>
                    <Text style={styles.text}>Tasks List</Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={tasks}
                        renderItem={renderTaskItem}
                        keyExtractor={item => item.id.toString()}
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
