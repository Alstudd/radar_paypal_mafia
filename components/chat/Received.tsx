import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface ReceivedProps {
  image: string;
  message: string;
}

const Received = ({ image, message }: ReceivedProps) => {
  return (
    <View className="bg-white" style={styles.container}>
      <Image source={{ uri: image }} style={styles.img} />
      <View>
        <Text className="font-JakartaBold" style={styles.message}>
          {message}
        </Text>
        <Text className="font-JakartaSemiBold" style={styles.duration}>
          12:13 AM
        </Text>
      </View>
    </View>
  );
};
export default Received;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
  },
  container: {
    flexDirection: "row",
    marginVertical: 15,
    maxWidth: 250,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  message: {
    fontSize: 13,
    marginHorizontal: 15,
  },
});
