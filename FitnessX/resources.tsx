////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import React, { useState } from 'react';

import { Link } from 'expo-router';

import {
	SafeAreaView, 
	StatusBar, 
	StyleSheet, 
	View, 
	Text, 
	TouchableOpacity, 
	ScrollView, 
	Image, 
	ImageBackground, 
} from 'react-native';

import styles from '../styles/menuStyles'; // Adjust the path as necessary

import { LinearGradient } from 'expo-linear-gradient';

import Swiper from 'react-native-swiper';

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the Resources component
export default function Resources() {

	////////////////////////////////////////////////////////////
	// RENDER THE RESOURCES UI
	////////////////////////////////////////////////////////////
	
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" />
			<View style={styles.topContainer}>
				<Text style={styles.logo}>Fitness<Text style={{color:'#ff0000'}}>X</Text></Text>
				<View style={styles.points}>
					<Text style={styles.greyText}>POINTS</Text>
				</View>
			</View>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={[styles.workoutsContainer, {gap: 20}]}>
					<View style={{gap: 20}}>
						<View style={[styles.workoutsHeaderBox, {width: '100%', paddingHorizontal: 15}]}>
							<Text style={[styles.greyText, {fontSize: 17, textAlign: 'left'}]}>Search</Text>
						</View>
						<Text style={styles.resourcesBooksText}>BOOKS <Text style={[styles.resourcesBooksText, {color: '#ff0000'}]}>V</Text></Text>
					</View>
					<Swiper>
						<View style={{ paddingHorizontal: 20 }}>
							<ImageBackground 
								source={{ uri: 'https://imgv2-1-f.scribdassets.com/img/document/509373932/original/1714ee3a2b/1?v=1' }} 
								style={[styles.workout, {height: 550}]}
								imageStyle={styles.workoutImage}
							>
								<LinearGradient
									colors={['rgba(255, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.3)']}
									start={{ x: 0, y: 1 }} 
									end={{ x: 0, y: 0 }} 
									style={StyleSheet.absoluteFillObject} 
								/>
							</ImageBackground>
						</View>
						<View style={{ paddingHorizontal: 10 }}> 
							<ImageBackground 
								source={{ uri: 'https://imgv2-1-f.scribdassets.com/img/document/509373932/original/1714ee3a2b/1?v=1' }} 
								style={[styles.workout, {height: 550}]}
								imageStyle={styles.workoutImage}
							>
								<LinearGradient
									colors={['rgba(255, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.3)']}
									start={{ x: 0, y: 1 }} 
									end={{ x: 0, y: 0 }} 
									style={StyleSheet.absoluteFillObject} 
								/>
							</ImageBackground>
						</View>
					</Swiper>
				</View>
			</ScrollView>
			<View style={styles.bottomContainer}>
				<View style={styles.taskBar}>
					<Link href="/workouts" asChild>
						<TouchableOpacity style={styles.miniBar} >
							<Text style={styles.miniBarText}>WORKOUTS</Text>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity style={[styles.miniBar, {backgroundColor: '#ff0000'}]} >
						<Text style={[styles.miniBarText, {color: 'white'}]}>RESOURCES</Text>
					</TouchableOpacity>
					<Link href="/tracker" asChild>
						<TouchableOpacity style={styles.miniBar} >
							<Text style={styles.miniBarText}>TRACKER</Text>
						</TouchableOpacity>
					</Link>
					<Link href="/settings" asChild>
						<TouchableOpacity style={styles.miniBar} >
							<Text style={styles.miniBarText}>SETTINGS</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}