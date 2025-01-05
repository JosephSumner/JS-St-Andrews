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
} from 'react-native';

import styles from '../styles/menuStyles'; // Adjust the path as necessary


////////////////////////////////////////////////////////////
// MAIN PROGRAM
////////////////////////////////////////////////////////////

// Define the main functional component for the Settings screen
export default function Settings() {

    ////////////////////////////////////////////////////////////
    // RENDER THE SETTINGS UI
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
            <Text style={styles.mainText}>SETTINGS</Text>
            <View style={[styles.workoutsContainer, {gap: 20, marginTop: 40}]}>
                <View>
                    <Text style={styles.settingsText}>Theme                                                                 ></Text>
                    <View style={styles.settingsBar}></View>
                </View>
                <View>
                    <Text style={styles.settingsText}>Rest Time                                                          ></Text>
                    <View style={styles.settingsBar}></View>
                </View>
                <View>
                    <Text style={styles.settingsText}>Change Previous Responses                 ></Text>
                    <View style={styles.settingsBar}></View>
                </View>
                <View>
                    <Text style={styles.settingsText}>Language                                                          ></Text>
                    <View style={styles.settingsBar}></View>
                </View>
                <View>
                    <Text style={styles.settingsText}>Measurement System                               ></Text>
                    <View style={styles.settingsBar}></View>
                </View>
                <View>
                    <Text style={styles.settingsText}>Account Details                                              ></Text>
                    <View style={styles.settingsBar}></View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.taskBar}>
                    <Link href="/workouts" asChild>
                        <TouchableOpacity style={styles.miniBar} >
                            <Text style={styles.miniBarText}>WORKOUTS</Text>
                        </TouchableOpacity>
                    </Link>
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
                    <TouchableOpacity style={[styles.miniBar, {backgroundColor: '#ff0000'}]} >
                        <Text style={[styles.miniBarText, {color: 'white'}]}>SETTINGS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}