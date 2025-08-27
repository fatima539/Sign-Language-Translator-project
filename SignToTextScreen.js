import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../ThemeContext'; // Adjust the path if necessary

const SignToTextScreen = () => {
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);

    // Open Camera
    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Camera access is required!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const clearImage = () => {
        setImageUri(null);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Image
                source={require('../assets/deaf.jpeg')}
                style={styles.headerImage}
            />

            <TouchableOpacity style={[styles.option, { backgroundColor: theme.backgroundColor, borderColor: theme.textColor }]} onPress={openCamera}>
                <Text style={[styles.optionText, { color: theme.textColor }]}>Open Camera</Text>
            </TouchableOpacity>

            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.capturedImage} />
            )}

            {imageUri && (
                <TouchableOpacity style={styles.clearButton} onPress={clearImage}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerImage: {
        width: 300,
        height: 150,
        marginBottom: 20,
        borderRadius: 12,
    },
    option: {
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 20,
        width: '80%',
        borderWidth: 3,
    },
    optionText: {
        fontSize: 18,
    },
    capturedImage: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    clearButton: {
        backgroundColor: '#002d72',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#002d72',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SignToTextScreen;

