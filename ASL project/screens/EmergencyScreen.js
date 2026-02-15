import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EmergencyModeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {/* TOP BOX */}
            <View style={styles.topBox}>
                <Text style={styles.topText}>Emergency{"\n"}Mode</Text>
            </View>

            {/* BUTTONS */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("GeneralEmergency")}
            >
                <Text style={styles.buttonText}>General Emergency</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("MedicalEmergency")}
            >
                <Text style={styles.buttonText}>Medical Emergency</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("RoadEmergency")}
            >
                <Text style={styles.buttonText}>Road Emergency</Text>
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    // 👇 THIS MAKES BLUE BOX START FROM TOP
    safeArea: {
        flex: 1,
        backgroundColor: "#1F3A93",
        paddingTop: 10,   // 👈 adjust: 10–20 (neeche lana ho to)
    },

    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    topBox: {
        backgroundColor: "#1F3A93",
        width: "115%",
        paddingVertical: 60,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        alignItems: "center",
        marginBottom: 60, 
    },

    topText: {
        color: "white",
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
    },

    button: {
        backgroundColor: "#1F3A93",
        width: "100%",
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 40,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "500",
    },
});
