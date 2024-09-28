import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const randomTime = () => {
  const hrs = Math.round(Math.random() * 12);
  const mins = Math.round(Math.random() * 60);
  const hFormat = hrs < 10 ? "0" : "";
  const mFormat = mins < 10 ? "0" : "";
  const amPm = hrs < 12 ? "AM" : "PM";
  return String(hFormat + hrs + ":" + mFormat + mins + " " + amPm);
};

interface MessagesProps {
  username: string;
  uri: string;
  count: number;
  onPress: () => void;
}

const Messages = ({ username, uri, count, onPress }: MessagesProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {count > 0 ? (
        <LinearGradient
          colors={["#90caf9", "#2196f3", "#1e88e5"]}
          style={styles.gradientStyle}
        >
          <Text className="font-JakartaBold" style={styles.count}>
            {count}
          </Text>
        </LinearGradient>
      ) : null}

      <Image source={{ uri: uri }} style={styles.image} />
      <View style={{ marginLeft: 10 }}>
        <Text className="font-JakartaBold" style={styles.username}>
          {username}
        </Text>
        <Text className="font-JakartaSemiBold" style={styles.text}>
          Hello, How are you
        </Text>
      </View>
      <Text className="font-JakartaSemiBold" style={styles.duration}>
        {randomTime()}
      </Text>
    </TouchableOpacity>
  );
};
export default Messages;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
  },
  gradientStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    color: "#fff",
    marginTop: -4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    color: "#b6b6b6",
    fontSize: 11,
  },
  duration: {
    color: "#000119",
    fontSize: 12,
    flex: 1,
    marginLeft: 280,
    position: "absolute", // doubt
  },
  username: {
    color: "#000119",
  },
});
