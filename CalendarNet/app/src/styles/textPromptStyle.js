import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#2960AC',
    },
    text:{
        fontSize: 20,
        color: 'black',
        fontFamily:'Arial',
    },
    header:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerText:{
        color: 'black',
        fontSize: 30,
        fontFamily: 'Arial',
        height: 80,
    },
    textBox:{
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 20, 
    }, 
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        justifyContent:'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial'
    },
});

export default styles;