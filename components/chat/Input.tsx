import React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

interface InputProps {
  inputMessage: string;
  onSendPress: () => void;
  setMessage: (text: string) => void;
}

const Input = ({ inputMessage, onSendPress, setMessage }: InputProps) => {
  return (
    <View style={styles.container}>
      <Entypo name="emoji-happy" color="#fff" size={20} />
      <TextInput
        className="font-JakartaSemiBold"
        placeholder="Some text"
        placeholderTextColor="#fff"
        cursorColor={"#1e88e5"}
        value={inputMessage}
        onChangeText={setMessage}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSendPress}>
        <Ionicons name="send" color="#FFF" size={20} />
      </TouchableOpacity>
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "85%",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  input: {
    fontSize: 11,
    paddingHorizontal: 10,
    color: "#fff",
    flex: 1,
  },
});
