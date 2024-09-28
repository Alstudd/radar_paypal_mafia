import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SentProps {
  message: string;
}

const Sent = ({ message }: SentProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#1e88e5", "#3f51b5"]} style={styles.gradient}>
        <Text className="font-JakartaBold" style={styles.text}>{message}</Text>
      </LinearGradient>
      <Text className="font-JakartaSemiBold" style={styles.duration}>12:34 AM</Text>
    </View>
  );
};
export default Sent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    alignSelf: "flex-end",
  },
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  gradient: {
    maxWidth: 220,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  text: {
    color: "#fff",
  },
});
