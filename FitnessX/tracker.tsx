////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import React, { useEffect, useState } from 'react';

import { Link } from 'expo-router';

import {
	SafeAreaView,
	StatusBar,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	TextInput,
} from 'react-native';

import styles from '../styles/menuStyles'; // Adjust the path as necessary

import CircularProgress from 'react-native-circular-progress-indicator';

import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';

import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the main component for the Tracker screen
export default function Tracker() {

	////////////////////////////////////////////////////////////
	// VARIABLES AND CONSTANTS
	////////////////////////////////////////////////////////////

	// State to manage the visibility of the modal
	const [modalVisible, setModalVisible] = useState(false);

	// State to manage the current macros (calories, protein, carbs, fats, water intake)
	const [macros, setMacros] = useState({
		calories: 0,
		protein: 0,
		carbohydrates: 0,
		fats: 0,
		waterIntake: 0,
	});

	// State to manage the goals for macros
	const [macrosGoals, setMacrosGoals] = useState({
		calories: 3000,
		protein: 80,
		carbohydrates: 50,
		fats: 40,
		waterIntake: 2500,
	});

	////////////////////////////////////////////////////////////
	// FUNCTIONS
	////////////////////////////////////////////////////////////

	// Function to toggle the visibility of the modal
	const handleEditPress = () => {
		setModalVisible(!modalVisible);
	};

	// UseEffect to fetch macros data from Firestore when the component mounts
	useEffect(() => {
		const fetchMacros = async () => {
			const auth = FIREBASE_AUTH;
			if (auth.currentUser) {
				// Reference to the macros collection in Firestore
				const macrosCollectionRef = collection(FIREBASE_DB, 'users', auth.currentUser.uid, 'macros');
				// Fetch the macros data
				const macrosSnapshot = await getDocs(macrosCollectionRef);
				// Update the state with the fetched macros data
				setMacros(macrosSnapshot.docs[0].data());
			}
		};

		fetchMacros();
	}, []);

	// Function to update a specific macro value
	const changeMacros = (macro: string, value: number) => {
		setMacros((prevMacros) => ({
			...prevMacros,
			[macro]: prevMacros[macro] + value, 
		}));
	}

	// Function to submit the updated macros to Firestore
	const submitMacros = async () => {
		try{
			const auth = FIREBASE_AUTH;
			if (auth.currentUser) {
				// Reference to the macros collection in Firestore
				const macrosCollectionRef = collection(FIREBASE_DB, 'users', auth.currentUser.uid, 'macros');
				// Fetch the macros data
				const macrosSnapshot = await getDocs(macrosCollectionRef);

				// Update the document with the new macros
				await updateDoc(macrosSnapshot.docs[0].ref, {
					calories: macros.calories,
					protein: macros.protein,
					carbohydrates: macros.carbohydrates,
					fats: macros.fats,
				}, { merge: true }); 
			}
		}
		catch (error: any){
			// Display an error dialog if the update fails
			Dialog.show({
				type: ALERT_TYPE.DANGER,
				title: 'Failed to update macros',
				textBody: error.message,
				button: 'OK',
			});
		}
		// Close the modal after submission
		setModalVisible(!modalVisible);
	}

	////////////////////////////////////////////////////////////
	// RENDER THE TRACKER UI
	////////////////////////////////////////////////////////////
	
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" />

			{modalVisible && (
				<View style={styles.modalContainer}>
					<View style={styles.modalBox}>
						<StatusBar barStyle="dark-content" translucent={false} backgroundColor={'rgba(0, 0, 0, 0.5)'} />
						<Text style={styles.modalText}>Add to your <Text style={{color: 'red'}}>macros!</Text></Text>
						<TextInput
							style={[styles.button, {fontFamily: 'Nexa-Bold', textAlign: 'left'}]}
							placeholder="Calories"
							placeholderTextColor="#6a6a6a"
							onChangeText={(text) => changeMacros("calories", parseInt(text) || 0)}
						/>
						<TextInput
							style={[styles.button, {fontFamily: 'Nexa-Bold', textAlign: 'left'}]}
							placeholder="Protein"
							placeholderTextColor="#6a6a6a"
							onChangeText={(text) => changeMacros("protein", parseInt(text) || 0)}
						/>
						<TextInput
							style={[styles.button, {fontFamily: 'Nexa-Bold', textAlign: 'left'}]}
							placeholder="Carbohydrates"
							placeholderTextColor="#6a6a6a"
							onChangeText={(text) => changeMacros("carbohydrates", parseInt(text) || 0)}
						/>
						<TextInput
							style={[styles.button, {fontFamily: 'Nexa-Bold', textAlign: 'left'}]}
							placeholder="Fats"
							placeholderTextColor="#6a6a6a"
							onChangeText={(text) => changeMacros("fats", parseInt(text) || 0)}
						/>
						<TouchableOpacity style={styles.submitBox} onPress={() => submitMacros()}>
							<Text style={styles.submitText}>SUBMIT</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}

			<View style={styles.topContainer}>
				<Text style={styles.logo}>Fitness<Text style={{ color: '#ff0000' }}>X</Text></Text>
				<View style={styles.points}>
					<Text style={styles.greyText}>POINTS</Text>
				</View>
			</View>

			<Text style={styles.mainText}>TRACKER</Text>

			<View style={[styles.workoutsContainer, { gap: 20, marginTop: 30 }]}>
				<View style={styles.trackerBox}>
					<TouchableOpacity style={styles.editBox} onPress={() => handleEditPress()}>
						<Text style={styles.editText}>EDIT</Text>
					</TouchableOpacity>
					<View style={[styles.calorieContainer, { gap: 20 }]}>
						<Text style={styles.settingsText}>Calories</Text>
						<CircularProgress
							progressValueColor={'white'}
							titleColor="white"
							title={'Remaining'}
							progressValueStyle={{ fontFamily: 'Nexa-Bold' }}
							titleStyle={{ fontFamily: 'Nexa-Bold', fontSize: 15 }}
							inActiveStrokeColor={'white'}
							activeStrokeColor={'#ff0000'}
							activeStrokeWidth={7}
							inActiveStrokeWidth={7}
							radius={75}
							maxValue={macrosGoals.calories}
							value={macros.calories}
						/>
					</View>
					<View style={[styles.calorieContainer, { gap: 35 }]}>
						<Text style={styles.settingsText}>Macros</Text>
						<View style={{ gap: 10 }}>
							<View>
								<Text style={styles.macroText}>Protein</Text>
								<View style={styles.progressBarContainer}>
									<View style={styles.progressBarBackground} />
									<View
										style={[
											styles.progressBarIndicator,
											{ width: `${(macros.protein / macrosGoals.protein) * 100}%` },
										]}
									/>
									<Text style={styles.goalsText}>{macros.protein}/{macrosGoals.protein}</Text>
								</View>
							</View>
							<View>
								<Text style={styles.macroText}>Carbohydrates</Text>
								<View style={styles.progressBarContainer}>
									<View style={styles.progressBarBackground} />
									<View
										style={[
											styles.progressBarIndicator,
											{ width: `${(macros.carbohydrates / macrosGoals.carbohydrates) * 100}%` },
										]}
									/>
									<Text style={styles.goalsText}>
										{macros.carbohydrates}/{macrosGoals.carbohydrates}
									</Text>
								</View>
							</View>
							<View>
								<Text style={styles.macroText}>Fats</Text>
								<View style={styles.progressBarContainer}>
									<View style={styles.progressBarBackground} />
									<View
										style={[
											styles.progressBarIndicator,
											{ width: `${(macros.fats / macrosGoals.fats) * 100}%` },
										]}
									/>
									<Text style={styles.goalsText}>{macros.fats}/{macrosGoals.fats}</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<ImageBackground
					source={{
						uri: 'https://tutorblog.fluentify.com/wp-content/uploads/2019/08/product-launches.jpg',
					}}
					style={[styles.trackerBox, { height: 160 }]}
					imageStyle={{ borderRadius: 25, width: '110%' }}
				></ImageBackground>

				<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={[styles.trackerBox, { width: '48%', height: 125, flexDirection: 'column', gap: 0 }]}>
						<Text style={styles.settingsText}>STEPS</Text>
						<Text style={[styles.settingsText, { color: '#ff0000' }]}>2,500</Text>
						<View style={[styles.progressBarContainer, { marginTop: 25 }]}>
							<View style={styles.progressBarBackground} />
							<View style={[styles.progressBarIndicator, { width: '25%' }]} />
							<Text style={styles.goalsText}>Goal: 10000</Text>
						</View>
					</View>
					<View style={[styles.trackerBox, { width: '48%', height: 125, flexDirection: 'column', gap: 0 }]}>
						<TouchableOpacity style={styles.editBox} onPress={() => handleEditPress()}>
							<Text style={styles.editText}>EDIT</Text>
						</TouchableOpacity>
						<Text style={styles.settingsText}>WATER INTAKE</Text>
						<Text style={[styles.settingsText, { color: '#ff0000' }]}>{macros.waterIntake} ml</Text>
						<View style={[styles.progressBarContainer, { marginTop: 10 }]}>
							<View style={styles.progressBarBackground} />
							<View
								style={[
									styles.progressBarIndicator,
									{ width: `${(macros.waterIntake / macrosGoals.waterIntake) * 100}%` },
								]}
							/>
							<Text style={styles.goalsText}>Goal: {macrosGoals.waterIntake} ml</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<View style={styles.taskBar}>
					<Link href="/workouts" asChild>
						<TouchableOpacity style={styles.miniBar}>
							<Text style={styles.miniBarText}>WORKOUTS</Text>
						</TouchableOpacity>
					</Link>
					<Link href="/resources" asChild>
						<TouchableOpacity style={styles.miniBar}>
							<Text style={styles.miniBarText}>RESOURCES</Text>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity style={[styles.miniBar, { backgroundColor: '#ff0000' }]}>
						<Text style={[styles.miniBarText, { color: 'white' }]}>TRACKER</Text>
					</TouchableOpacity>
					<Link href="/settings" asChild>
						<TouchableOpacity style={styles.miniBar}>
							<Text style={styles.miniBarText}>SETTINGS</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}