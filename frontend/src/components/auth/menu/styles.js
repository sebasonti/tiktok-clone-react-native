import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerBody: {
        flex: 1,
        padding: 30
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 25,
        color: 'darkslategrey',
        textAlign: 'center'
    },
    descriptionText: {
        fontSize: 18,
        textAlign: "center",
        color: 'lightgray',
        marginBottom: 32
    },
    providerButton: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    providerButtonIcon: {
        left: 10,
        position: "absolute"
    },
    providerButtonText: {
        flexGrow: 1,
        textAlign: "center"
    },
    containerFooter: {
        backgroundColor: 'ghostwhite',
        padding: 20,
        alignItems: "center",
        borderStyle: 'solid',
        borderTopWidth: 1,
        borderColor: 'lightray'
    },
    bottomButtonText: {
        fontWeight: 'bold',
        color: 'red'
    }
});

export default styles;