import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarButton from './CalendarButton';
import popUpStyle from '../styles/popUpStyle';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
    const [colorChoice, setColorChoice] = useState('#6C757D');
    const [repeatChoice, setRepeatChoice] = useState('Never');

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
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={popUpStyle.Overlay}>
                <View style={popUpStyle.Content}>
                    <View style={styles.topContainer}>
                        <Text style={popUpStyle.Header}>
                             {isCreate ? 'Event Creation' : isEdit ? 'Event Edit' : isDelete ? 'Event Deletion' : ''}
                        </Text>
                    </View>

                    {isCreate && (
                        <View style={popUpStyle.container}>
                            <Text style={popUpStyle.textTitle}>Title: {title}</Text>
                            <Text style={popUpStyle.textTitle}>Date: {date}</Text>
                            {time && <Text style={popUpStyle.textTitle}>Time: {time}</Text>}
                            <Text style={popUpStyle.textTitle}>Choose Event Color:</Text>
                        <View style={[styles.optionContainer,{marginTop:10}]}>
                            {colorOptions.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorBox, 
                                        { backgroundColor: color }, 
                                        colorChoice === color && styles.selectedBox,
                                    ]}
                                    onPress={() => setColorChoice(color)}
                                />
                            ))}
                        </View>
                        </View>
                    )}

                    {isEdit && (
                        <View style={popUpStyle.container}>
                            <Text style={[popUpStyle.textTitle, { marginBottom: 10 }]}>Editing the following event:</Text>
                            <Text style={popUpStyle.textTitle}>Title: {title}</Text>
                            <Text style={popUpStyle.textTitle}>Date: {date}</Text>
                            {time && <Text style={popUpStyle.textTitle}>Time: {time}</Text>}
                        </View>
                    )}

                    {isDelete && (
                        <View style={popUpStyle.container}>
                            <Text style={[popUpStyle.textTitle, { marginBottom: 10 }]}>Are you sure you want to delete this event?</Text>
                            <Text style={popUpStyle.textTitle}>Title: {title}</Text>
                            <Text style={popUpStyle.textTitle}>Date: {date}</Text>
                            {time && <Text style={popUpStyle.textTitle}>Time: {time}</Text>}
                        </View>
                    )}

                    <View style={[styles.container, { marginTop: 20 }]}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.confirmButton, { backgroundColor: isCreate ? 'blue' : isEdit ? 'green' : 'red' }]}
                            onPress={handleAction}
                        >
                            <Text style={styles.confirmButtonText}>
                                {isCreate ? 'Confirm Creation' : isEdit ? 'Confirm Edit' : 'Confirm Deletion'}
                            </Text>
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
    optionContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent:'space-around'
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
    colorBox: {
        width: 45,
        height: 30,
        borderColor: '#000',
        borderRadius: 10,
        borderWidth: 1,
        margin:1,
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

export default PromptConfirmationModal;