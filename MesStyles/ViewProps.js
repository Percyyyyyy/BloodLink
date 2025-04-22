import { StyleSheet } from "react-native";


const viewProps = StyleSheet.create({
    tout:{
        flex : 1,
        backgroundColor: "black",
    },
    header: {
        flex : 0.1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection : "row",
    },
    body: {
        flex : 0.9,
        backgroundColor: "black",
    },
})

export default viewProps;