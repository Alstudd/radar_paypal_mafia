import { Image, ScrollView, Text, View } from "react-native";
import { images } from "@/constants";
import ChatScreen from "@/components/ChatScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

const Chat = () => {
  const { colorScheme } = useColorScheme();
  return (
    // <View className="flex-1 bg-white p-5">
    //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    //     <Text className="text-2xl font-JakartaBold">Chat</Text>
    //     <View className="flex-1 h-fit flex justify-center items-center">
    //       <Image
    //         source={images.message}
    //         alt="message"
    //         className="w-full h-40"
    //         resizeMode="contain"
    //       />
    //       <Text className="text-3xl font-JakartaBold mt-3">
    //         No Messages Yet
    //       </Text>
    //       <Text className="text-base mt-2 text-center px-7">
    //         Start a conversation with your friends and family
    //       </Text>
    //     </View>
    //   </ScrollView>
    // </View>
    <GestureHandlerRootView>
      <StatusBar
        backgroundColor={colorScheme == "dark" ? "black" : "white"}
        style={colorScheme == "dark" ? "light" : "dark"}
      />
      <ChatScreen />
    </GestureHandlerRootView>
  );
};

export default Chat;
