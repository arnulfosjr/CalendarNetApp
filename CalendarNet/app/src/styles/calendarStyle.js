import { StyleSheet} from "react-native";

const calendarStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: '#2960AC',
    },
    header:{
        width:'100%',
        height: 100,
        alignItems:'center',
        padding:20,
    },
    headerText:{
        color:'black',
        fontSize:30,
        fontFamily:'Arial',
        height:90,
    },
    dayNamesDisplay:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        height:20,
        width:'100%',
        paddingHorizontal:10,
        marginBottom:10,
    },
    text:{
        fontSize: 20,
        color: 'black',
        fontFamily:'Arial',
    },
    weekRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    },
    dayBox:{
        width:50,
        height:100,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#ffffff',
        justifyContent:'flex-start',
        marginTop:1,
    },
    dayBoxText:{
        fontSize:20,
        color:'black',
        fontFamily:'Arial',
        fontWeight:'bold',
    },
});

export default calendarStyle;