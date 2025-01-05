////////////////////////////////////////////////////////////
// IMPORTS
////////////////////////////////////////////////////////////

import React, { useState } from 'react';

import { Link } from 'expo-router';

import {
    SafeAreaView, 
    StatusBar, 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    ImageBackground,
} from 'react-native';

import styles from '../styles/menuStyles'; 

////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the main functional component for the Workouts screen
export default function Workouts() {

    ////////////////////////////////////////////////////////////
    // RENDER THE WORKOUTS UI
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
                <View style={styles.workoutsContainer}>
                    <View style={styles.workoutsHeaderBox}>
                        <Text style={[styles.greyText, {fontSize: 17}]}>RECOMMENDED FOR YOU</Text>
                    </View>
                    
                    <ImageBackground 
                        source={{ uri: 'https://www.borntough.com/cdn/shop/articles/Best_Dumbbell_Chest_Workout_to_Get_Ripped.jpg?v=1631123641' }} 
                        style={styles.workout}
                        imageStyle={styles.workoutImage}
                    >
                        <View style={styles.workoutOverlay}>
                            <Text style={styles.workoutText}>CHEST                                               ★★★</Text>
                        </View>
                    </ImageBackground>
                    
                    <ImageBackground 
                        source={{ uri: 'https://ironbullstrength.com/cdn/shop/articles/DSC01908_1.jpg?v=1690389593' }} 
                        style={styles.workout}
                        imageStyle={styles.workoutImage}
                    >
                        <View style={styles.workoutOverlay}>
                            <Text style={styles.workoutText}>PUSH                                                  ★★★</Text>
                        </View>
                    </ImageBackground>
                    
                    <ImageBackground 
                        source={{ uri: 'https://media.gq.com/photos/59712c8b75d2965381f8bf69/16:9/w_2560%2Cc_limit/2017-06_GQ_FITNESS-Push-Ups_3x2.jpg' }} 
                        style={styles.workout}
                        imageStyle={styles.workoutImage}
                    >
                        <View style={styles.workoutOverlay}>
                            <Text style={styles.workoutText}>CHEST AND TRICEPS                   ★★</Text>
                        </View>
                    </ImageBackground>
                </View>
                
                <View style={{ height: 120 }} />
            </ScrollView>
            
            <View style={styles.bottomContainer}>
                <View style={styles.taskBar}>
                    <TouchableOpacity style={[styles.miniBar, {backgroundColor: '#ff0000'}]}>
                        <Text style={[styles.miniBarText, {color: 'white'}]}>WORKOUTS</Text>
                    </TouchableOpacity>
                    
                    <Link href="/resources" asChild>
                        <TouchableOpacity style={styles.miniBar} >
                            <Text style={styles.miniBarText}>RESOURCES</Text>
                        </TouchableOpacity>
                    </Link>
                    
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