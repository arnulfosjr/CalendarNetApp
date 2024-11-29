import { StyleSheet} from "react-native";

const calendarStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor:'#2960AC'
    },
    scrollView:{
        flex:1,
        backgroundColor:'#2960AC',
    },
    header:{
        width:'100%',
        height: 100,
        alignItems:'center',
        padding:20,
    },
    headerText:{
        color:'white',
        fontSize:30,
        fontFamily:'Arial',
        height:35,
        fontWeight:'bold',
    },
    dayNamesDisplay:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        height:20,
        width:'100%',
        paddingHorizontal:10,
        marginBottom:5,
        fontWeight:'bold',
    },
    text:{
        fontSize: 20,
        color: 'white',
        fontFamily:'Arial',
    },
    weekRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    },
    dayBox:{
        width:'14%',
        height:100,
        borderColor:'black',
        backgroundColor:'#ffffff',
        justifyContent:'flex-start',
        marginTop:1,
    },
    dayBoxText:{
        fontSize:15,
        color:'black',
        fontFamily:'Arial',  
    },
});

export default calendarStyle;