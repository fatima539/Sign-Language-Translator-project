import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Audio } from "expo-av";

export default function EmergencyScreen() {
  const [sound, setSound] = useState(null);
  const [activeId, setActiveId] = useState(null);

  // Stop audio when screen unmounts
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Emergency sentences
  const sentences = [
    {
      id: 1,
      text: "I am deaf or mute. Can you communicate with me?",
      audio: require("../assets/EMG/gen_emg/i_am_deaf.mp3"),
    },

    {
      id: 2,
      text: "Can I borrow your phone?",
      audio: require("../assets/EMG/gen_emg/can_i.mp3"),
    },

    {
      id: 3,
      text: "Please stop, I need help",
      audio: require("../assets/EMG/road_emg/stop.mp3"),
    },

    {
      id: 4,
      text: "I use sign language to communicate",
      audio: require("../assets/EMG/gen_emg/i_use_sign.mp3"),
    },

    {
      id: 5,
      text: "I don't understand what you said",
      audio: require("../assets/EMG/gen_emg/i_dont_under.mp3"),
    },

    {
      id: 6,
      text: "Please write it down",
      audio: require("../assets/EMG/gen_emg/please_write_it.mp3"),
    },

    {
      id: 7,
      text: "Please cooperate with me",
      audio: require("../assets/EMG/gen_emg/please_cooperate.mp3"),
    },

    {
      id: 8,
      text: "I am in danger",
      audio: require("../assets/EMG/gen_emg/i_am_danger.mp3"),
    },

    {
      id: 9,
      text: "I feel unsafe",
      audio: require("../assets/EMG/gen_emg/i_feel_unsafe.mp3"),
    },

    {
      id: 10,
      text: "Please stay with me",
      audio: require("../assets/EMG/gen_emg/please_stay.mp3"),
    },

    {
      id: 11,
      text: "I cannot handle this situation alone",
      audio: require("../assets/EMG/gen_emg/i_cannot_handle.mp3"),
    },
  ];

  // Play audio
  async function playAudio(item) {
    try {
      setActiveId(item.id);

      // Enable audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
      });

      // Stop previous sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Load new sound
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
        <Text style={styles.topText}>General Emergency</Text>
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