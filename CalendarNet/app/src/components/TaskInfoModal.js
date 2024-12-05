import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import EditTaskModal from './EditTaskModal';
import DeleteTaskModal from './DeleteTaskModal';

const TaskInfoModal = ({
    isVisible,
    onClose,
    selectedTaskInfo,
    selectedTask,
    setEditTaskID,
    editTaskID,
    setTaskTitle,
    setTaskDueDate,
    setTaskColor,
    setTaskDescr,
    EditTask,
    DeleteTask,
    setIsTaskInfoVisible,
    setIsVisible,
    setDueDateTimePicker,
    isDueDateTimePicker,
}) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const handleEditPress = () => {
        setEditTaskID(selectedTaskInfo.id);
        setTaskTitle(selectedTaskInfo.title || '');
        setTaskDueDate(new Date(selectedTaskInfo.dueDate));
        setTaskColor(selectedTaskInfo.color || '#000000');
        setTaskDescr(selectedTaskInfo.descr || '');
        setIsEditModalVisible(true);
    };

    const handleDeletePress = () => {
        setIsDeleteModalVisible(true);
    };

    const formatDueDate = selectedTaskInfo?.dueDate ? format(new Date(selectedTaskInfo.dueDate),'EEEE, MMMM d h:mm a') : 'No Start Date';

    return (
        <Modal visible={isVisible} transparent={true} animationType='slide'>
             <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <CalendarButton title='Close' onPress={onClose}/>
                    <View style={styles.topContainer}>
                        <Ionicons name='square' size={30} color={selectedTaskInfo?.color}/>
                        <Text style={popUpStyle.Header}> {selectedTaskInfo?.title}</Text>
                    </View>
                    <Text style={popUpStyle.textTitle}>Due Date:</Text>
                    <Text style={popUpStyle.text}> {formatDueDate}</Text>
                    <Text style={popUpStyle.textTitle}>Description:</Text>
                    <Text style={popUpStyle.text}>{selectedTaskInfo?.descr || 'No description available'}</Text>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeletePress}>
                            <Ionicons name='trash' size={30} color='red'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <EditTaskModal
                isVisible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                selectedTaskInfo={selectedTaskInfo}
                setTaskTitle={setTaskTitle}
                setTaskDueDate={setTaskDueDate}
                setTaskColor={setTaskColor}
                setTaskDescr={setTaskDescr}
                EditTask={EditTask}
                setIsTaskInfoVisible={setIsTaskInfoVisible}
                setIsVisible={setIsVisible}
                setDueDateTimePicker={setDueDateTimePicker}
                isDueDateTimePicker={isDueDateTimePicker}
            />
            <DeleteTaskModal
                isVisible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                setIsTaskInfoVisible={setIsTaskInfoVisible}
                DeleteTask={DeleteTask}
                taskId={selectedTaskInfo?.id}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    
    container: {
        alignItems:'center',
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
    },

    topContainer: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:20,
    },

    editButton: {
        backgroundColor: '#ffffff',
        padding:5,
        borderRadius:50,
        alignItems:'center',
        width:80,
    },

    editButtonText: {
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        fontFamily:'Arial',
    },

    trashButton: {
        marginTop:20
    }

});

export default TaskInfoModal;