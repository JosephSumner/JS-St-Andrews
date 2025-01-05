// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    topContainer: {
        width: '100%',
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontFamily: 'Nexa-Bold',
        fontSize: 50,
    },
    points: {
        backgroundColor: "#d4d4d4",
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greyText: {
        color: '#7b7b7b',
        fontFamily: 'Nexa-Bold',
        textAlign: 'center',
    },
    mainText:{
        fontFamily: 'Nexa-Bold',
        color:'#ff0000',
        fontSize: 30,
        paddingHorizontal: 30,
    },
    workoutsContainer: {
        width: '100%',
        paddingHorizontal: 30,
        gap: 30,
        flexDirection: "column",
        justifyContent: 'space-between',
        marginTop: 10,
    },
    workoutsHeaderBox: {
        width: 240,
        height: 45,
        borderRadius: 20,
        backgroundColor: "#d4d4d4",
        justifyContent: 'center',
    },
    workout: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        justifyContent: 'flex-end',
        elevation: 5,
        shadowColor: '#ff0000',
        overflow: 'hidden', // This ensures the image respects borderRadius
    },
    workoutImage: {
        borderRadius: 20, // This ensures the image is also rounded
    },
    workoutOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker overlay across the entire image
        justifyContent: 'flex-end', // Keeps the text at the bottom
        padding: 15,
    },
    workoutContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',  // Add this to make it full width
    },
    workoutText: {
        fontFamily: 'Nexa-Bold',
        fontSize: 20,
        color: '#ff0000'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    taskBar: {
        width: "100%",
        height: 90,
        backgroundColor: "#d4d4d4",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    miniBar: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resourcesBooksText: {
        fontFamily: 'Nexa-Bold', 
        textAlign: 'right', 
        fontSize: 17

    },
    miniBarText: {
        color: '#7b7b7b',
        fontFamily: 'Nexa-Bold',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 7,
    },
    trackerBox:{
        flexDirection: 'row', // Arrange child elements in a row
        width: '100%',
        height: 250,
        borderRadius: 25,
        backgroundColor: "#d4d4d4",
        padding: 15,
        elevation: 5,
        shadowColor: '#171717',
    },
    editBox: {
        position: 'absolute',
        top: 10,
        right: 15,
        backgroundColor: '#ff0000',
        width: 50,
        borderRadius: 10,
    },
    editText: {
        color: 'white',
        fontFamily: 'Nexa-Bold',
        textAlign: 'center',
    },
    calorieContainer: {
        flex: 1, // Equally divide the two parts
    },
    macroText: {
        color: 'white',
        fontFamily: 'Nexa-Bold',
        fontSize: 15,
    },
    progressBarContainer: {
		width: '100%',
		height: 10,
		borderRadius: 10,
        overflow: 'hidden', // This ensures the red bar doesn't exceed the container
		position: 'relative', // This allows absolute positioning of the indicator
    },
    progressBarBackground: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    progressBarIndicator: {
        backgroundColor: '#ff0000',
        width: '0%', // This makes it fill 1/10 of the bar
        height: '100%',
        position: 'absolute',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    goalsText: {
        color: '#7b7b7b',
        fontFamily: 'Nexa-Bold',
        fontSize: 8,
        textAlign: 'right',
        marginRight: 5,
    },
    settingsText:{
        color: '#7b7b7b',
        fontFamily: 'Nexa-Bold',
        fontSize: 20,
    },
    settingsBar:{
        width: '100%',
        height: 4,
        backgroundColor: "#d4d4d4",
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000, // Ensure overlay is on top
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    modalBox: {
        width: 300, 
        height: 370, 
        backgroundColor: 'white', 
        borderRadius: 25,
        gap: 20,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        elevation: 20,
        shadowColor: '#171717',
    },
    modalText: {
        color: '#7b7b7b',
        fontFamily: 'Nexa-Bold',
        fontSize: 25,
        textAlign: 'center',
    },
    button: {
		backgroundColor: '#dfdfdf',
		width: 200,
		height: 40,
		borderRadius: 15,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
    submitBox: {
        width: 120,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 20,
        justifyContent: 'center', // Center vertically
    },
    submitText: {
        color: 'white',
        fontFamily: 'Nexa-Bold',
        fontSize: 15,
        textAlign: 'center',
    },
});



export default styles;
