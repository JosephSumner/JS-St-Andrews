////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import React, { useState } from 'react';

import {
	SafeAreaView, 
	StatusBar, 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
} from 'react-native';

import styles from '../styles/questionStyles'; 

import { useRouter } from 'expo-router'; 

import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the main component for the questions
export default function Questions() {

	////////////////////////////////////////////////////////////
	// VARIABLES AND CONSTANTS
	////////////////////////////////////////////////////////////

	// Define an array of initial questions with their respective parts and buttons
	const initialQuestions = [
		{ id: 0, question: "Height", part: "unit?", 
			buttons: [
				{id: 0, text: "Metres", pressed: false},
				{id: 1, text: "Centimetres", pressed: false},
			] },
		{ id: 1, question: "Weight", part: "unit?", 
			buttons: [
				{id: 0, text: "Kilograms", pressed: false},
				{id: 1, text: "Pounds", pressed: false},
			] },
		{ id: 2, question: "What's Your", part: "Height?", 
			buttons: [
				{id: 0, text: "", pressed: false},
			] },
		{ id: 3, question: "What's Your", part: "Weight?", 
			buttons: [
				{id: 0, text: "", pressed: false},
			] },
		{ id: 4, question: "Have you ever worked out", part: "?", 
			buttons: [
				{id: 0, text: "Yes", pressed: false},
				{id: 1, text: "No", pressed: false},
			] },
		{ id: 5, question: "How many hours do you work out each", part: "week?", 
			buttons: [
				{id: 0, text: "0-2", pressed: false},
				{id: 1, text: "3-5", pressed: false},
				{id: 2, text: "6+", pressed: false},
			] },
		{ id: 6, question: "How many pushups can you", part: "do?", 
			buttons: [
				{id: 0, text: "1-10", pressed: false},
				{id: 1, text: "11-30", pressed: false},
				{id: 2, text: "31+", pressed: false},
			] },
		{ id: 7, question: "How many situps can you", part: "do?", 
			buttons: [
				{id: 0, text: "1-20", pressed: false},
				{id: 1, text: "21-50", pressed: false},
				{id: 2, text: "51+", pressed: false},
			] },
		{ id: 8, question: "How many pullups can you", part: "do?", 
			buttons: [
				{id: 0, text: "1-3", pressed: false},
				{id: 1, text: "4-10", pressed: false},
				{id: 2, text: "11+", pressed: false},
			] },
		{ id: 9, question: "How many squats can you", part: "do?", 
			buttons: [
				{id: 0, text: "1-20", pressed: false},
				{id: 1, text: "21-50", pressed: false},
				{id: 2, text: "51+", pressed: false},
			] },
		{ id: 10, question: "How often do you want to", part: "work out?", 
			buttons: [
				{id: 0, text: "1-20", pressed: false},
				{id: 1, text: "21-50", pressed: false},
				{id: 2, text: "51+", pressed: false},
			] },
		{ id: 11, question: "What are your ", part: "goals?", 
			buttons: [
				{id: 0, text: "Lose weight", pressed: false},
				{id: 1, text: "Build muscle", pressed: false},
				{id: 2, text: "Increase stamina", pressed: false},
			] },
	];


	// State to keep track of the current question index
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// State to manage the list of questions
	const [questions, setQuestions] = useState(initialQuestions);

	// Hook to handle navigation
	const router = useRouter();

	// Reference to the Firebase authentication instance
	const auth = FIREBASE_AUTH;

	// State to store the height input
    const [height, setHeight] = useState('');

	// State to store the weight input
    const [weight, setWeight] = useState('');

	////////////////////////////////////////////////////////////
	// FUNCTIONS
	////////////////////////////////////////////////////////////

	// Function to get selected options from the current question
	const getSelectedOptions = (questionData: any) => {
		const selectedOptions = []
		for (const button of questionData.buttons){
			if (button.pressed){
				selectedOptions.push(button.text)
			}
		}
		return selectedOptions;
	}

	// Function to save the answer to Firestore
	const saveAnswerToFirestore = async (questionData: any) => {
		try{
			// Check if the user is authenticated
			if (!auth.currentUser){
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'Error',
					button: 'OK',
				});
				return
			}

			// Reference to the user's answers collection in Firestore
			const userAnswersRef = collection(FIREBASE_DB, 'users', auth.currentUser.uid, 'answers');

			// Save the answer based on the question ID
            if ([0, 1, 4, 5, 6,7, 8, 9, 10, 11].includes(questionData.id)){
                await addDoc(userAnswersRef, {
                    question: questionData.question + " " + questionData.part,
                    selectedOptions: getSelectedOptions(questionData),
                });
            }
            if ([2].includes(questionData.id)){
                await addDoc(userAnswersRef, {
                    question: questionData.question + " " + questionData.part,
                    selectedOptions: [height],
                });
            }
            if ([3].includes(questionData.id)){
                await addDoc(userAnswersRef, {
                    question: questionData.question + " " + questionData.part,
                    selectedOptions: [weight],
                });
            }
		}
		catch (error: any){
			// Display an error message if saving fails
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Failed to submit response',
				textBody: error.message,
				button: 'OK',
			});
		}
	}

	// Function to handle the "Next" button press
	const handleNext = async () => {
		// Save the current answer to Firestore
		await saveAnswerToFirestore(questions[currentQuestionIndex]);

		// Move to the next question if there are more questions
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
		else{
			try{
				// Check if the user is authenticated
				if (!auth.currentUser){
					Dialog.show({
						type: ALERT_TYPE.DANGER,
						title: 'Error',
						button: 'OK',
					});
					return
				}

				// Reference to the user's macros collection in Firestore
				const macrosRef = collection(FIREBASE_DB, 'users', auth.currentUser.uid, 'macros');

				// Add default macros data to Firestore
				await addDoc(macrosRef, {
					calories: 0,
					protein: 0,
					carbohydrates: 0,
					fats: 0,
					waterIntake: 0,
				});
			}
			catch (error: any){
				// Display an error message if adding macros fails
				Dialog.show({
					type: ALERT_TYPE.DANGER,
					title: 'Failed to submit response',
					textBody: error.message,
					button: 'OK',
				});
			}

			// Navigate to the workouts screen
			router.push('/workouts');
		}
	};

	// Function to handle button press
	const handlePress = (buttonIndex: number) => {
		setQuestions(prevQuestions => {
			const newQuestions = [...prevQuestions];
			const currentQuestion = { ...newQuestions[currentQuestionIndex] };
			const newButtons = [...currentQuestion.buttons];
			
			// Toggle the pressed state of the button
			newButtons[buttonIndex].pressed = !newButtons[buttonIndex].pressed;
			currentQuestion.buttons = newButtons;
			newQuestions[currentQuestionIndex] = currentQuestion;
			
			return newQuestions;
		});
	};

	// Function to calculate the progress percentage
	const getProgressPercentage = (currentQuestion: number, totalQuestions: number) => {
		return `${(currentQuestion / totalQuestions) * 100}%`;
	};

	////////////////////////////////////////////////////////////
	// RENDER THE QUESTIONS UI
	////////////////////////////////////////////////////////////
	
	return (
		<SafeAreaView style={styles.safeArea}>
				<StatusBar barStyle="dark-content" />

			<View style={styles.questionContainer}>
				<View style={{ height: 140, width: '100%' }}>
					<Text style={styles.mainText}>
						{questions[currentQuestionIndex].question}
						{' '}
						<Text style={{ color: '#ff0000' }}>
							{questions[currentQuestionIndex].part}
						</Text>
					</Text>
				</View>
	
				{[2].includes(currentQuestionIndex) && (
					<View style={styles.buttonsContainer}>
						<TextInput
							style={[styles.button, { fontFamily: 'Nexa-Bold', textAlign: 'center' }]}
							placeholder=""
							onChangeText={(text) => setHeight(text)}
						/>
					</View>
				)}
	
				{[3].includes(currentQuestionIndex) && (
					<View style={styles.buttonsContainer}>
						<TextInput
							style={[styles.button, { fontFamily: 'Nexa-Bold', textAlign: 'center' }]}
							placeholder=""
							onChangeText={(text) => setWeight(text)}
						/>
					</View>
				)}
	
				{[0, 1, 4, 5, 6, 7, 8, 9, 10, 11].includes(currentQuestionIndex) && (
					<View style={styles.buttonsContainer}>
						{questions[currentQuestionIndex].buttons.map((button, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.button,
									button.pressed && { backgroundColor: '#ff0000' } 
								]}
								onPress={() => handlePress(index)} 
							>
								<Text
									style={[
										styles.buttonText,
										button.pressed && { color: 'white' } 
									]}
								>
									{button.text}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
			</View>
	
			<View style={styles.bottomContainer}>
				<TouchableOpacity style={styles.nextButton} onPress={handleNext}>
					<Text style={[styles.buttonText, { color: 'white' }]}>NEXT</Text>
				</TouchableOpacity>
	
				<View style={styles.progressBarContainer}>
					<View style={styles.progressBarBackground} />
					<View
						style={[
							styles.progressBarIndicator,
							{ width: getProgressPercentage(currentQuestionIndex, questions.length) }
						]}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}