// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	loginContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 40,
	},
	signUpContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 40,
	},
	bottomContainer: {
		position: 'absolute',
		bottom: 20,
		width: '100%',
		alignItems: 'center',
	},
	inputContainer: {
		backgroundColor: '#dfdfdf',
		width: 350,
		height: 50,
		borderRadius: 25,
		paddingHorizontal: 15,
		justifyContent: 'center',
	},
	passwordContainer: {
		backgroundColor: '#dfdfdf',
		width: 350,
		height: 50,
		borderRadius: 25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between', 
		paddingLeft: 15,
		paddingRight: 15,
	},
	forgotText: {
		fontSize: 12,
		color: '#FF0000',
		fontFamily: 'Nexa-Bold',
	},
	mainText: {
		fontSize: 45,
		color: '#FF0000',
		fontFamily: 'Nexa-Bold',
		width: '100%',
		textAlign: 'center',
	},
	bottomText: {
		fontSize: 15,
		fontFamily: 'Nexa-Bold',
		color: '#4c4c4c',
		width: '100%',
		textAlign: 'center',
	},
	button: {
		width: 150,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#ff0000',
		alignSelf: 'flex-start',
		marginLeft: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		fontFamily: 'Nexa-Bold',
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		width: '100%',
	},
});



export default styles;
