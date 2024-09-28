import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/AntDesign";
import LastWatch from "@/components/chat/LastWatch";
import Received from "@/components/chat/Received";
import Sent from "@/components/chat/Sent";
import Data from "@/assets/data/Data.json";
import Input from "@/components/chat/Input";
import { router, useLocalSearchParams } from "expo-router";

const Discussion = () => {
  const { itemName, itemPic }: { itemName: string; itemPic: string } =
    useLocalSearchParams();
  const [inputMessage, setInputMessage] = useState("");

  const send = () => {
    if (inputMessage.trim().length > 0) {
        const newId = Data.length > 0 ? Data[Data.length - 1].id + 1 : 1;
        Data.push({ id: newId, message: inputMessage });
        setInputMessage("");
    }
  };

  var txt = [];
  for (var i = 5; i < Data.length; i++) {
    txt.push(<Sent key={Data[i].id} message={Data[i].message} />);
  }
  console.log(Data);

  return (
    <GestureHandlerRootView>
      <LinearGradient
        colors={["#42a5f5", "#42a5f5", "#1565c0"]}
        style={styles.container}
      >
        <View style={styles.main}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="left" color="#000119" size={24} />
            </TouchableOpacity>
            <Text className="font-JakartaBold" style={styles.username}>
              {itemName}
            </Text>
            <Image source={{ uri: itemPic }} style={styles.avatar} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LastWatch checkedOn="Yesterday" />
            <Received image={itemPic} message={Data[0].message} />
            <Sent message={Data[1].message} />
            <Received image={itemPic} message={Data[2].message} />
            <Sent message={Data[3].message} />
            <LastWatch checkedOn="Today" />
            <Received image={itemPic} message={Data[4].message} />
            <View>{txt}</View>
          </ScrollView>
        </View>
        <Input
          inputMessage={inputMessage}
          setMessage={(inputMessage) => setInputMessage(inputMessage)}
          onSendPress={send}
        />
      </LinearGradient>
    </GestureHandlerRootView>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  main: {
    backgroundColor: "#FFF",
    height: "88%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#000119",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
