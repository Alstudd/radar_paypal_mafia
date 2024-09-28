import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LastWatchProps {
  checkedOn: string;
}

const LastWatch = ({ checkedOn }: LastWatchProps) => {
  return (
    <View style={styles.container}>
      <Text className="font-JakartaSemiBold" style={styles.text}>
        {checkedOn}
      </Text>
    </View>
  );
};
export default LastWatch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    elevation: 3,
    paddingVertical: 2,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: 100,
    alignSelf: "center",
    marginTop: 25,
  },
  text: {
    color: "#1565c0",
    fontSize: 12,
  },
});
