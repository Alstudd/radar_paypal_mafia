import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopNav = ({ selectedMode, setSelectedMode }: { selectedMode: string, setSelectedMode: (selectedMode: string) => void }) => {

  return (
    <View style={styles.container}>
      {["User", "Recruiter", "Investor"].map((mode) => (
        <TouchableOpacity
          key={mode}
          style={[styles.button, selectedMode === mode && styles.activeButton]}
          onPress={() => setSelectedMode(mode)}
        >
          <Text style={styles.buttonText}>{mode}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  activeButton: {
    // backgroundColor: "#4A90E2",
    borderBottomWidth: 2,
    borderBottomColor: "#4A90E2",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TopNav;
