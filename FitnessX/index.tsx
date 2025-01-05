////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import React, { useEffect } from 'react';

import {
	StatusBar, 
	StyleSheet, 
	View, 
	Image, 
	Dimensions, 
} from 'react-native';

import { useRouter } from 'expo-router'; 

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the Splash Screen component
export default function SplashScreen() {

	////////////////////////////////////////////////////////////
	// VARIABLES AND CONSTANTS
	////////////////////////////////////////////////////////////

	const router = useRouter();

	useEffect(() => {
		// Set a timer to navigate to the '/login' route after 2 seconds
		const timer = setTimeout(() => {
			router.push('/login');
		}, 2000);
	
		return () => clearTimeout(timer);
	}, []); 

	////////////////////////////////////////////////////////////
	// RENDER THE INDEX UI
	////////////////////////////////////////////////////////////
	
	return (
		<View style={styles.container}>
			<StatusBar hidden={true} translucent={true} />
			<Image
				source={require('../assets/images/loadup-screen.png')} 
				style={styles.image} 
				resizeMode="cover" 
			/>
		</View>
	);
}

////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
	container: {
		flex: 1, 
	},
	image: {
		width: Dimensions.get('window').width, 
		height: Dimensions.get('screen').height, 
	},
});