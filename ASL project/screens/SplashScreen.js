import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

const SplashScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const auth = getAuth();

    useEffect(() => {
        // Fade animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        // Navigate after 7 seconds based on Firebase Auth user
        const timer = setTimeout(() => {
            const user = auth.currentUser; // Check if user is logged in
            if (user) {
                navigation.replace('Home'); // User is logged in
            } else {
                navigation.replace('Welcome'); // User not logged in
            }
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigation, fadeAnim, auth]);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/logo.jpeg')}
                style={[styles.logo, { opacity: fadeAnim }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});

export default SplashScreen;