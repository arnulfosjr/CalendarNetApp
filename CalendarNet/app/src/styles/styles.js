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
        fontFamily:'Georgia',
    },
    header:{
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerText:{
        color:'black',
        fontSize:30,
        fontFamily:'Georgia',
        height:80,
    },
    textBox:{
        width:'50%',
        padding:5,
        borderColor:'#cccccc',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginBottom:15,
    }, 
    logo:{
        width:200,
        height:150,
        marginBottom:20,
    }, 
    bottomImage:{
        width:450,
        height:250,
    },

});

export default styles; 