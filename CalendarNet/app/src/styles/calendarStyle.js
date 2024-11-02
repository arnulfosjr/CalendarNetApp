import { StyleSheet} from "react-native";

const calendarStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#2960AC',
    },
    header:{
        position:'absolute',
        height: 700,

    },
    headerText:{
        color:'black',
        fontSize:30,
        fontFamily:'Georgia',
        height:90,
    },
    text:{
        fontSize: 20,
        color: 'white',
        fontFamily:'Georgia',
    },
    box:{
        position:'absolute',
        top:150,
        left:10,
        width:80,
        height:120,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#ffffff',
        marginTop:10,
    },
    boxText:{
        fontSize:20,
        color:'black',
        fontFamily:'Georgia',
        fontWeight:'bold',
    },

    topBox:{
        position:'absolute',
        top:110,
        left:10,
        width:200,
        height:50,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'red',
    },

    topBoxText:{
        fontSize:20,
        color:'white',
        fontFamily:'Georgia',
        fontWeight:'bold',
    },
});

export default calendarStyle;