import { StyleSheet } from 'react-native';
import { font } from '../../assets';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#DEE2EC',
        color: "#444444",
        fontSize: 20,
        fontFamily: font,
        padding: '3%',
        borderBottomWidth: 3,
        borderColor: '#FFCD58',
        marginBottom: '3%',
        width: '80%',
        borderRadius: 20
    },
    font: {
        fontSize: 20,
        fontFamily: font,
        color: '#fff'
    },
    button: {
        backgroundColor: '#5C0601',
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '7%',
        paddingRight: '7%',
        borderRadius: 20,
        marginBottom: '10%'
    },
    fontTitle: {
        color: "#fff",
        fontSize: 50,
        fontFamily: font,
        paddingBottom: "30%",
        fontWeight: '800',
        letterSpacing: 3,
        textTransform: 'uppercase',
    },
    signUp: {
        color: '#286bd7',
        fontSize: 20,
        fontFamily: font
    }
});

export default styles;