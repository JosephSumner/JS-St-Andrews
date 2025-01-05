////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

export default function Layout() {
	// Use the useFonts hook to load custom fonts
	let [fontsLoaded] = useFonts({
		// Load the 'Nexa-Light' font from the specified file path
		'Nexa-Light': require('../assets/fonts/Nexa-Light.otf'),
		// Load the 'Nexa-Bold' font from the specified file path
		'Nexa-Bold': require('../assets/fonts/Nexa-Bold.otf'),
	});

	// If the fonts are not loaded, return null to prevent rendering
	if (!fontsLoaded) {
		return null;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="login" options={{ animation: 'fade' }} />
			<Stack.Screen name="signup" options={{ animation: 'fade' }} />
			<Stack.Screen name="questions" options={{ animation: 'fade' }} />
			<Stack.Screen name="workouts" options={{ animation: 'fade' }} />
			<Stack.Screen name="resources" options={{ animation: 'fade' }} />
			<Stack.Screen name="settings" options={{ animation: 'fade' }} />
			<Stack.Screen name="tracker" options={{ animation: 'fade' }} />
		</Stack>
	);
}