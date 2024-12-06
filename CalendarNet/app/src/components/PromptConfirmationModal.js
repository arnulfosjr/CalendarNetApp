import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const colorOptions = ['#FD7E14', '#33FF57', '#007BFF', '#F1C40F', '#9B59B6', '#1ABC9C', '#E74C3C', '#6C757D', '#28A745', '#3498DB'];
const repeatOptions = ['Never','Daily','Weekly','Monthly','Yearly'];

const PromptConfirmationModal = ({
    isVisible,
    onClose,
    title,
    date,
    time,
    isCreate,
    isEdit,
    isDelete,
}) => {
    const [color, setColor] = useState('#6C757D');
    const [repeat, setRepeat] = useState('Never');
    const [endRepeat, setEndRepeat] = useState(new Date());

    const handleAction = (isCreate,isEdit,isDelete) => {
        if(isCreate) {
            handleCreate();
        } else if(isEdit) {
            handleEdit();
        } else if(isDelete) {
            handleDelete();
        }
    };

    const handleCreate = () => {
        
    }

    const handleEdit = () => {
        console.log("edit:",title);
    }

    const handleDelete = () => {
        console.log("delete",title);
    }

    return (
        <Modal visible={isVisible} transparent={true} animationType='slide'>
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <View style={styles.topContainer}>
                        <Text style={popUpStyle.Header}>Confirm {isCreate ? 'Event Creation' : isEdit ? 'Event Edit': isDelete ? 'Event Deletion' : ''}</Text>
                    </View>
                        <View style={popUpStyle.container}>
                            <Text style={[popUpStyle.textTitle,{marginBottom:10}]}> {title}</Text>
                        </View>
                        <View style={popUpStyle.container}>
                            <Text style={popUpStyle.textTitle}> {date}</Text>
                        </View>
                        <View style={[styles.container,{marginTop:20}]}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                         <TouchableOpacity style={styles.confirmButton} 
                            onPress={() => handleAction(isCreate,isEdit,isDelete)}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                         </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    
    container: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    topContainer: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:5,
    },
    confirmButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PromptConfirmationModal;