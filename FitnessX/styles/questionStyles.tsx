// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	questionContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
        paddingTop: 30,
	},
    bottomContainer: {
		position: 'absolute',
		bottom: 20,
		width: '100%',
		alignItems: 'center',
        gap: 20,
	},
	mainText: {
		fontSize: 45,
		fontFamily: 'Nexa-Bold',
		width: '100%',
		textAlign: 'center',
	},
    buttonsContainer: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center',
		gap: 30,
		marginTop: -170, 
    },
	button: {
		backgroundColor: '#dfdfdf',
		width: 350,
		height: 60,
		borderRadius: 15,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	pressedButton: {
		backgroundColor: '#ff0000',
		width: 350,
		height: 60,
		borderRadius: 15,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	nextButton: {
		backgroundColor: '#ff0000',
		width: 350,
		height: 60,
		borderRadius: 15,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	buttonText: {
		fontFamily: 'Nexa-Bold',
		color: '#6a6a6a',
		fontSize: 25,
		textAlign: 'center',
		width: '100%', 
	},
    progressBarContainer: {
		width: 350,
		height: 10,
		borderRadius: 10,
        overflow: 'hidden',
		position: 'relative', 
    },
    progressBarBackground: {
        backgroundColor: '#dfdfdf',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    progressBarIndicator: {
        backgroundColor: '#ff0000',
        width: '0%', 
        height: '100%',
        position: 'absolute',
    },
});


export default styles;
