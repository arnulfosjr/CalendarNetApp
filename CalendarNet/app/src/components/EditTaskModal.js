import React, {useEffect,useState} from 'react';
import { View, Modal, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';

const colorOptions = ['#FD7E14', '#33FF57', '#007BFF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#6C757D', '#28A745', '#3498DB'];

const EditTaskModal = ({
    isVisible,
    onClose,
    selectedTaskInfo,
    setTaskTitle,
    setTaskDueDate,
    setTaskColor,
    setTaskDescr,
    EditTask,
    setIsTaskInfoVisible,
    setIsVisible,
    setDueDateTimePicker,
    isDueDateTimePicker,
}) => {
    const [editedTask, setEditedTask] = useState({
        id: null,
        title: '',
        dueDate: null,
        color: '#6C757D',
        descr: '',
    });

    useEffect(() => {
        if (selectedTaskInfo) {
            setEditedTask({
                ...selectedTaskInfo,
                id: selectedTaskInfo.id,
                title: selectedTaskInfo.title || '',
                dueDate: selectedTaskInfo.dueDate || new Date(),
                color: selectedTaskInfo.color || '#6C757D',
                descr: selectedTaskInfo.descr || '',
            });
        }
    }, [selectedTaskInfo]);

    const handleTitleChange = (value) => {
        setEditedTask ((prevTask) => ({
            ...prevTask,
            title: value,
        }));
    };

    const handleDueDateChange = (value) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            dueDate: value,
        }));
    };

    const handleColorChange = (value) => {
        setTaskColor(value);
        setEditedTask((prevEvent) => ({
            ...prevEvent,
            color: value,
        }));
    };

    const handleDescriptionChange = (value) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            descr: value,
        }));
    };

    const resetFields = () => {
        setTaskTitle('');
        setTaskDueDate(new Date());
        setTaskColor('#6C757D');
        setTaskDescr('');
    };

    const handleSaveTask = () => {
        const taskData = {
            ...editedTask,
            title: editedTask.title || 'Untitled Event', 
            descr: editedTask.descr || 'No description',  
            color: editedTask.color || '#6C757D',  
            dueDate: editedTask.dueDate ? moment(editedTask.dueDate).utc().toISOString() : null,
        };

        if (!taskData.title || !taskData.dueDate || !taskData.descr) {
            console.error('Validation Error: Missing required fields:', eventData);
            return;
        }

        EditTask(taskData)
            .then(() => {
                onClose();
                setIsTaskInfoVisible(false);
                setIsVisible(false);
                resetFields();
            })
            .catch((error) => {
                console.error('Error editing task:', error);
                console.error('Error response data:', error.response?.data);
            });
    };

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <CalendarButton title='Close' onPress={onClose}/>
                    <Text style={popUpStyle.Header}>
                        {editedTask.title}
                    </Text>
                    <Text style={popUpStyle.Header}>Edit Event:</Text>
                    <Text style={popUpStyle.textTitle}>Title:</Text>
                    <TextInput
                         placeholder='Title'
                         value={editedTask.title}
                         onChangeText={handleTitleChange}
                         style={popUpStyle.text}
                    />
                    <Text style={popUpStyle.textTitle}>Due Date:</Text>
                    <TouchableOpacity onPress={() => setDueDateTimePicker(true)}>
                        <TextInput
                            placeholder="Due Date"
                            value={editedTask.dueDate ? format(new Date(editedTask.dueDate), 'yyyy-MM-dd h:mm a') : ''}
                            onChangeText={handleDueDateChange}
                            editable={false}
                            style={popUpStyle.text}
                        />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDueDateTimePicker}
                        mode="datetime"
                        date={editedTask.dueDate ? new Date (editedTask.dueDate) : new Date()}
                        onConfirm={(date) => {
                            setTaskDueDate(new Date(date));
                            setDueDateTimePicker(false);
                        }}
                        onCancel={() => setDueDateTimePicker(false)}
                    />
                    <Text style={popUpStyle.textTitle}>Choose Task Color:</Text>
                    <View style={styles.colorContainer}>
                        {colorOptions.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.colorBox,
                                    { backgroundColor: color },
                                    editedTask.color === color && styles.selectedBox,
                                ]}
                                onPress={() => handleColorChange(color)}
                            />
                        ))}
                    </View>
                    <Text style={popUpStyle.textTitle}>Description:</Text>
                    <TextInput
                        placeholder="Description"
                        value={editedTask.descr}
                        onChangeText={handleDescriptionChange}
                        style={popUpStyle.text}
                    />
                     <CalendarButton title="Save" onPress={handleSaveTask} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-around',
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

    colorContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginVertical:10,
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
        marginBottom:5,
    },
    selectedBox: {
        borderWidth:3,
    }
});

export default EditTaskModal;