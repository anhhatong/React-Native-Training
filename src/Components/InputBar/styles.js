import { StyleSheet } from 'react-native';
import { font } from '../../assets';

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: '5%',
        marginBottom: '5%'
    },
    input: {
        backgroundColor: "#fff",
        fontSize: 15,
        color: '#444444',
        borderColor: "#5C0601",
        borderBottomWidth: 2,
        fontFamily: font,
        flex: 1,
        height: '100%',
        paddingLeft: '5%',
        borderRadius: 0,
        fontWeight: '100'
    },
    addButton: {
        backgroundColor: "#5C0601",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 100
    },
    addButtonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff"
    },
    doneButton: {
        backgroundColor: "#5C0601",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: '100%'
    },
    doneText: {
        fontSize: 20,
        fontFamily: font,
        color: '#fff',
        fontWeight: 'bold'
    }
})

export default styles;