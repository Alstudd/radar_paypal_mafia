// TopNav.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelectedMode } from "@/contexts/SelectedModeContext";

const TopNav = () => {
  const { selectedMode, setSelectedMode } = useSelectedMode();

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
    backgroundColor: "#333333",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    overflow: "hidden",
    height: 55,
    position: "absolute",
    top: 40,
    zIndex: 99,
    elevation: 1,
    marginHorizontal: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#1e88e5",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default TopNav;
