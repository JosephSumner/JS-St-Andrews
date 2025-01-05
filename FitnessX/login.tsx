////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import { Link } from 'expo-router';

import { useState } from 'react';

import {
	SafeAreaView, 
	StatusBar, 
	View, 
	Text, 
	// A button-like component that responds to touches
	TouchableOpacity, 
} from 'react-native';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import styles from '../styles/signupAndLoginStyles';

import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { useRouter } from 'expo-router'; 

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the Login component
export default function Login() {

	////////////////////////////////////////////////////////////
	// VARIABLES AND CONSTANTS
	////////////////////////////////////////////////////////////

	// State to manage the email input
	const [email, setEmail] = useState('');

	// State to manage the password input
	const [password, setPassword] = useState('');

	// Reference to the Firebase authentication instance
	const auth = FIREBASE_AUTH;

	// Router instance for navigation
	const router = useRouter();

	////////////////////////////////////////////////////////////
	// FUNCTIONS
	////////////////////////////////////////////////////////////

	// Function to get an error message based on the error string
	const getErrorMessage = (error: string) => {
		// Check for specific error codes and return corresponding messages
		if (error.includes('invalid-email')){
			const errorMessage = "Incorrect email.";
			return errorMessage;
		}
		else if (error.includes('invalid-credential')){
			const errorMessage = "Incorrect password.";
			return errorMessage;
		}
		else if (error.includes('missing-email')){
			const errorMessage = "Please enter your email.";
			return errorMessage;
		}
		else if (error.includes('missing-password')){
			const errorMessage = "Please enter your password.";
			return errorMessage;
		}
		// Return the original error message if no specific match is found
		return error;
	}

	// Function to handle the sign-in process
	const signIn = async () => {
		try{
			// Attempt to sign in with the provided email and password
			const response = await signInWithEmailAndPassword(auth, email, password);

			Toast.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Success',
				textBody: 'Logged in successfully!',
			});

			// Navigate to the workouts page
			router.push('/workouts');
		}
		catch (error: any){
			// Show an error dialog if sign-in fails
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Login failed',
				textBody: getErrorMessage(error.message),
				button: 'OK',
			});
		}
	}

	// Function to handle password reset
	const resetPassword = async () => {
		try{
			// Send a password reset email to the provided email address
			await sendPasswordResetEmail(auth, email);

			// Show a success dialog
			Dialog.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Success',
				textBody: "An email has been sent for you to reset your password.",
				button: 'OK',
			});
		}
		catch (error: any){
			// Show an error dialog if the password reset fails
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Password reset failed',
				textBody: getErrorMessage(error.message),
				button: 'OK',
			});
		}
	}

	////////////////////////////////////////////////////////////
	// RENDER THE LOGIN UI
	////////////////////////////////////////////////////////////

	return (
		<AlertNotificationRoot theme='light'>
			<SafeAreaView style={styles.safeArea}>
				<StatusBar hidden={false} translucent={false} barStyle={'dark-content'} />

				<View style={styles.loginContainer}>
					<Text style={styles.mainText}>LOGIN</Text>

					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Email"
							placeholderTextColor="#6a6a6a"
							style={{ fontFamily: 'Nexa-Bold' }}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>

					<View style={styles.passwordContainer}>
						<TextInput
							placeholder="Password"
							placeholderTextColor="#6a6a6a"
							style={{ fontFamily: 'Nexa-Bold', width: '70%' }}
							secureTextEntry={true}
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<TouchableOpacity onPress={resetPassword}>
							<Text style={styles.forgotText}>FORGOT</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity style={styles.button} onPress={signIn}>
						<Text style={styles.buttonText}>LOGIN</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>
						Don't have an account?
						<Link href="/signup" asChild>
							<Text style={{ color: '#ff0000' }}> Sign up</Text>
						</Link>
					</Text>
				</View>
			</SafeAreaView>
		</AlertNotificationRoot>
	);
}