import { StyleSheet } from "react-native";

const popUpStyle = StyleSheet.create({
    Overlay:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center',
    },
    Content:{
        width:'80%',
        padding:20,
        backgroundColor:'lightgrey',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    popUpHeader:{
        fontSize:22,
        marginBottom:10,
        fontWeight:'bold',
    },
    popUpText:{
        fontSize:18,
        marginBottom:10,
        backgroundColor:'white',
        padding:10,
        borderRadius:5,
    },
});

export default popUpStyle;