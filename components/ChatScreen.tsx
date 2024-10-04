import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Icon from "@expo/vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import Profiles from "@/components/chat/Profiles";
import Messages from "@/components/chat/Messages";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const URL = `https://api.github.com/users`;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;

  useEffect(function () {
    const getData = async () => {
      const resp = await fetch(URL);
      const data = await resp.json();
      setData(data);
      setLoading(false);
    };
    getData();

    Animated.timing(pan, {
      toValue: { x: -400, y: 0 },
      delay: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(list, {
      toValue: { x: 0, y: -300 },
      delay: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <SafeAreaView className="bg-[#1e88e5]">
      <LinearGradient
        className="mt-20"
        colors={["#1e88e5", "#f20042", "#EEEEEE"]}
        style={styles.gradient}
      >
        <View>
          <View style={styles.headerContainer}>
            <Text className="font-JakartaExtraBold" style={styles.header}>
              Stories
            </Text>
            <Icon name="add" color="#fff" size={30} />
          </View>
          <ScrollView
            horizontal
            style={styles.proContainer}
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Animated.View style={[styles.card]}>
                {data.map((item: any, index: any) => (
                  <Profiles
                    key={item.id}
                    username={item.login}
                    uri={item.avatar_url}
                  />
                ))}
              </Animated.View>
            )}
          </ScrollView>
        </View>
        <View style={styles.ops}>
          <View className="h-[500px]">
            <View style={styles.col}>
              <Text className="font-JakartaExtraBold" style={styles.day}>
                Chats
              </Text>
              <Entypo name="dots-three-horizontal" color="#000119" size={30} />
            </View>
            <ScrollView>
              {loading ? (
                <ActivityIndicator size="large" color="#0286FF" />
              ) : (
                <Animated.View style={styles.list}>
                  {data.map((item: any, index: any) => (
                    <Messages
                      key={item.id}
                      username={item.login}
                      uri={item.avatar_url}
                      count={Math.floor(Math.random() * 3)}
                      onPress={() => {
                        router.push({
                          pathname: "/(root)/discussion", // Path to your Discussion screen
                          params: {
                            itemId: item.id,
                            itemName: item.login,
                            itemPic: item.avatar_url,
                          },
                        });
                      }}
                    />
                  ))}
                </Animated.View>
              )}
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  list: {
    marginTop: -10,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
  },
  gradient: {
    height: "100%",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    color: "#FFF",
    flex: 1,
    fontSize: 24,
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
  },
  ops: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "100%",
    backgroundColor: "white",
    marginHorizontal: -20,
    marginTop: 20,
  },
  col: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  day: {
    color: "#000119",
    flex: 1,
    fontSize: 20,
  },
});
