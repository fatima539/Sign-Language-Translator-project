import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Audio } from "expo-av";

export default function MedicalEmergencyScreen() {
  const [sound, setSound] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Stop sound when screen closes
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Medical emergency sentences
  const sentences = [
    {
      id: 1,
      text: "I need medical help!",
      audio: require("../assets/EMG/med_emg/i_need_medical.mp3"),
    },

    {
      id: 2,
      text: "I feel very weak",
      audio: require("../assets/EMG/med_emg/feel_weak.mp3"),
    },

    {
      id: 3,
      text: "I feel better now",
      audio: require("../assets/EMG/med_emg/feel_better.mp3"),
    },

    {
      id: 4,
      text: "Please call the ambulance",
      audio: require("../assets/EMG/med_emg/call_ambulance.mp3"),
    },

    {
      id: 5,
      text: "I need a doctor urgently",
      audio: require("../assets/EMG/med_emg/need_doctor.mp3"),
    },

    {
      id: 6,
      text: "I cannot breathe properly",
      audio: require("../assets/EMG/med_emg/cannot_breathe.mp3"),
    },

    {
      id: 7,
      text: "I need first aid urgently",
      audio: require("../assets/EMG/med_emg/first_aid.mp3"),
    },

    {
      id: 8,
      text: "I am having chest pain",
      audio: require("../assets/EMG/med_emg/chest_pain.mp3"),
    },

    {
      id: 9,
      text: "I am in severe pain",
      audio: require("../assets/EMG/med_emg/severe_pain.mp3"),
    },

    {
      id: 10,
      text: "I have a serious injury",
      audio: require("../assets/EMG/med_emg/serious_injury.mp3"),
    },

    {
      id: 11,
      text: "Please take me to the hospital",
      audio: require("../assets/EMG/med_emg/please_take_hospital.mp3"),
    },

    {
      id: 12,
      text: "Can someone help me, please?",
      audio: require("../assets/EMG/med_emg/can_help_me.mp3"),
    },
  ];

  // Play audio
  async function playAudio(item) {
    try {
      setActiveId(item.id);

      // Enable audio
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      // Stop previous sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Play new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        item.audio,
        { shouldPlay: true }
      );

      setSound(newSound);
    } catch (error) {
      console.log("Audio Error:", error);
      alert("Audio file not found or not supported!");
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBox}>
        <Text style={styles.topText}>Medical Emergency</Text>
      </View>

      {/* Buttons */}
      <ScrollView
        style={{ width: "100%", marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {sentences.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.button,
              activeId === item.id && styles.activeButton,
            ]}
            onPress={() => playAudio(item)}
          >
            <Text style={styles.buttonText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  topBox: {
    backgroundColor: "#1F3A93",
    width: "120%",
    paddingVertical: 70,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },

  topText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#1F3A93",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 25,
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#142B6F",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});