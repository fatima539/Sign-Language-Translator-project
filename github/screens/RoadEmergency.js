import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Audio } from "expo-av";

export default function RoadEmergencyScreen() {
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

  // Emergency sentences
  const sentences = [
    {
      id: 1,
      text: "Please help me.",
      audio: require("../assets/EMG/road_emg/please_help_me.mp3"),
    },

    {
      id: 2,
      text: "I had a road accident.",
      audio: require("../assets/EMG/road_emg/i_had_road.mp3"),
    },

    {
      id: 3,
      text: "My vehicle is damaged.",
      audio: require("../assets/EMG/road_emg/my_vehicle.mp3"),
    },

    {
      id: 4,
      text: "My tire is flat.",
      audio: require("../assets/EMG/road_emg/my_tire.mp3"),
    },

    {
      id: 5,
      text: "I need a mechanic.",
      audio: require("../assets/EMG/road_emg/i_need.mp3"),
    },

    {
      id: 6,
      text: "Please call the traffic police.",
      audio: require("../assets/EMG/road_emg/please_call.mp3"),
    },

    {
      id: 7,
      text: "My car will not start.",
      audio: require("../assets/EMG/road_emg/my_car.mp3"),
    },

    {
      id: 8,
      text: "My motorcycle has broken down.",
      audio: require("../assets/EMG/road_emg/motorcycle.mp3"),
    },

    {
      id: 9,
      text: "Someone is injured here.",
      audio: require("../assets/EMG/road_emg/someone_injured.mp3"),
    },

    {
      id: 10,
      text: "Please stop, I need help.",
      audio: require("../assets/EMG/road_emg/stop.mp3"),
    },
  ];

  // Play Audio
  async function playAudio(item) {
    try {
      setActiveId(item.id);

      // Enable audio
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      // Stop old sound
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
        <Text style={styles.topText}>Road Emergency</Text>
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