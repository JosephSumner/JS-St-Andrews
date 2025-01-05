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
	TextInput, 
	TouchableOpacity, 
} from 'react-native';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import styles from '../styles/signupAndLoginStyles';

import { FIREBASE_AUTH } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { useRouter } from 'expo-router'; // Expo Router's navigation API

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

	// Function to handle user sign-up
	const signUp = async () => {
		try {
			// Attempt to create a new user with the provided email and password
			const response = await createUserWithEmailAndPassword(auth, email, password);

			// Show a success toast notification
			Toast.show({
				type: ALERT_TYPE.SUCCESS,
				title: 'Success',
				textBody: 'Logged in successfully!',
			});

			// Navigate to the questions page
			router.push('/questions');
		} catch (error: any) {
			// Show an error dialog if sign-up fails
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Login failed',
				textBody: error.message,
				button: 'OK',
			});
		}
	};

	// Function to validate the email format
	const emailCheck = (email: string) => {
		// Define invalid symbols and parts of the email
		const symbols = ['""', '!', ',', '*', '\\'];
		const emailParts = email.split('@');
		const domain = emailParts[1];

		// Check email length and format
		if (email.length > 320) {
			console.log("invalid email");
			return false;
		}
		if (email[0] == '.' || (email[email.length - 1] == '.')) {
			return false;
		}
		if (!email.includes('@')) {
			return false;
		}
		if (emailParts.length > 2) {
			return false;
		}
		if (!domain.includes('.')) {
			return false;
		}
		for (const symbol of symbols) {
			if (email.includes(symbol)) {
				return false;
			}
		}
		for (let i = 0; i < email.length; i++) {
			if (email[i] == '.' && email[i + 1] == '.') {
				return false;
			}
		}
		return true;
	};

	// Function to validate the password format
	const passwordCheck = (password: string) => {
		// Define required symbols and numbers
		const symbols = [
			'!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
			'-', '_', '+', '=', '{', '}', '[', ']', '|', '\\',
			':', ';', '"', "'", '<', '>', ',', '.', '?', '/'];
		let symbolCount = 0;

		const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		let numberCount = 0;

		// Check password length
		if (password.length < 8) {
			return false;
		}

		// Check for at least one symbol
		for (const symbol of symbols) {
			if (password.includes(symbol)) {
				symbolCount += 1;
			}
		}
		if (symbolCount === 0) {
			return false;
		}

		// Check for at least one number
		for (const number of numbers) {
			if (password.includes(number)) {
				numberCount += 1;
			}
		}
		if (numberCount === 0) {
			return false;
		}

		// Check for at least one uppercase and one lowercase letter
		let upperCase = false;
		let lowerCase = false;

		for (let char of password) {
			if (char >= 'A' && char <= 'Z') {
				upperCase = true;
			}
			if (char >= 'a' && char <= 'z') {
				lowerCase = true;
			}
		}
		if (!(upperCase && lowerCase)) {
			return false;
		}
		return true;
	};

	// Function to handle the login process
	const handleLogin = () => {
		// Check if email and password are provided
		if (!email && !password) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Warning',
				textBody: 'Please enter your email and password.',
				button: 'OK',
			});
			return;
		}
		// Check if email is provided
		else if (!email) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Warning',
				textBody: 'Please enter your email.',
				button: 'OK',
			});
		}
		// Check if password is provided
		else if (!password) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Warning',
				textBody: 'Please enter your password.',
				button: 'OK',
			});
		}

		// Check if both email and password are invalid
		else if (!emailCheck(email) && !passwordCheck(password)) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Warning',
				textBody: 'Your email and password is invalid.',
				button: 'OK',
			});
		}

		// Check if email is invalid
		else if (!emailCheck(email)) {
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Warning',
				textBody: 'Your email is invalid.',
				button: 'OK',
			});
		}

		// Check if password is invalid
		else if (!passwordCheck(password)) {
			console.log(password);
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Warning',
				textBody: 'Your password is invalid.',
				button: 'OK',
			});
		}

		// If both email and password are valid, proceed with sign-up
		else if (emailCheck(email) && passwordCheck(password)) {
			signUp();
		}
	};

	////////////////////////////////////////////////////////////
	// RENDER THE SIGN UP UI
	////////////////////////////////////////////////////////////

	return (
		<AlertNotificationRoot>
			<SafeAreaView style={styles.safeArea}>
				<StatusBar hidden={false} translucent={false} barStyle={'dark-content'} />

				<View style={styles.loginContainer}>
					<Text style={styles.mainText}>SIGN UP</Text>

					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Email"
							placeholderTextColor="#6a6a6a"
							style={{ fontFamily: 'Nexa-Bold' }}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Password"
							placeholderTextColor="#6a6a6a"
							style={{ fontFamily: 'Nexa-Bold' }}
							secureTextEntry={true}
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
					</View>

					<TouchableOpacity style={styles.button} onPress={handleLogin}>
						<Text style={styles.buttonText}>SIGN UP</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>
						Don't have an account?
						<Link href="/login" asChild>
							<Text style={{ color: '#ff0000' }}> Sign in</Text>
						</Link>
					</Text>
				</View>
			</SafeAreaView>
		</AlertNotificationRoot>
	);
}