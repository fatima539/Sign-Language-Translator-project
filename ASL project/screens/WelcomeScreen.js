import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome</Text>
            </View>

            {/* Buttons Container */}
            <View style={styles.buttonsContainer}>
                {/* Sign Up Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.footer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Ensures the footer stays at the bottom
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: width * 0.05, // Padding for left and right
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#234273", // Header color
        width: "110%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingVertical: height * 0.09,
        paddingHorizontal: width * 0.05,
        justifyContent: "center", // Ensures that the content is centered
    },
    headerText: {
        color: 'white',
        fontSize: width * 0.08, // Adjust font size based on screen width
        fontWeight: 'bold',
        textAlign: 'center', // Center the header text
    },
    buttonsContainer: {
        flex: 1, // This allows the buttons container to take up the remaining space
        justifyContent: 'center', // Centers the buttons vertically
        alignItems: 'center',
        width: '100%',
    },
    button: {
        width: '80%', // 80% of screen width
        height: height * 0.07, // Height adjusted based on screen height
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.015, // Reduced margin for closer spacing between buttons
        borderRadius: 5,
    },
    button1: {
        width: '80%', // 80% of screen width
        height: height * 0.07, // Height adjusted based on screen height
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // No marginTop here to keep buttons closely positioned
    },
    buttonText: {
        fontSize: width * 0.05, // Adjust font size based on screen width
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        width: '110%',
        height: height * 0.1, // Height of footer adjusted based on screen height
        backgroundColor: "#234273", // Footer color to match header
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
});
