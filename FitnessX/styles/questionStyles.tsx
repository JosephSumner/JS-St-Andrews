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
        paddingTop: 30, // Push content down slightly for centering effect
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
		width: '100%', // Make sure the text spans the full container width
		textAlign: 'center',
	},
    buttonsContainer: {
		flex: 1, // Add this to make it take remaining space
		justifyContent: 'center', // Add this to center buttons vertically
		alignItems: 'center', // Add this to center buttons horizontally
		gap: 30,
		marginTop: -170, // This helps offset the paddingTop from questionContainer
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
		width: '100%', // Make sure the text spans the full container width
	},
    progressBarContainer: {
		width: 350,
		height: 10,
		borderRadius: 10,
        overflow: 'hidden', // This ensures the red bar doesn't exceed the container
		position: 'relative', // This allows absolute positioning of the indicator
    },
    progressBarBackground: {
        backgroundColor: '#dfdfdf',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    progressBarIndicator: {
        backgroundColor: '#ff0000',
        width: '0%', // This makes it fill 1/10 of the bar
        height: '100%',
        position: 'absolute',
    },
});


export default styles;
