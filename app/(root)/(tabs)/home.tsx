import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const posts = [
  {
    id: 1,
    userName: "Alston Soares",
    profileImage: "https://res.cloudinary.com/daoaucxkl/image/upload/v1728412539/d6nrtqbcai3gsyvzezqb.webp",
    timeAgo: "2 hours ago",
    postImage:
      "https://static.narrative-violation.com/radar-hackathon-social.png",
    caption:
      "Just completed a major milestone on the Radar hackathon project 🚀",
  },
  {
    id: 2,
    userName: "Rohan Sharma",
    profileImage: "https://res.cloudinary.com/daoaucxkl/image/upload/v1728510163/oiyy6io5thvol2fio0lj.jpg",
    timeAgo: "5 hours ago",
    postImage:
      "https://cdn.sanity.io/images/btz0doeh/production/c8256f2ee497f03e05f3512c449c5da953688cff-1280x720.jpg?rect=1,0,1278,720&w=600&h=338&auto=format",
    caption:
      "Excited to announce that I’ve joined the PayPal Mafia team! Time for some groundbreaking work! 💼",
  },
  {
    id: 3,
    userName: "Jane Smith",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    timeAgo: "1 day ago",
    postImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGJsb2NrY2hhaW58ZW58MHx8fHwxNjgyODg2NTcz&ixlib=rb-1.2.1&q=80&w=1080",
    caption:
      "Had an amazing session today on building scalable blockchain apps using Solana! #Web3",
  },
];

const Post = ({ post }: any) => {
  const { colorScheme } = useColorScheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View
      className={`${
        colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
      } p-4 rounded-lg mb-4 shadow-lg`}
    >
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: post.profileImage }}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-3">
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            } text-lg font-JakartaBold`}
          >
            {post.userName}
          </Text>
          <Text
            className={`${
              colorScheme === "dark" ? "text-gray-400" : "text-gray-500"
            } text-sm font-JakartaMedium`}
          >
            {post.timeAgo}
          </Text>
        </View>
      </View>

      <View className="my-3">
        <Image
          source={{ uri: post.postImage }}
          className="w-full h-48 rounded-lg"
        />
      </View>

      <Text
        className={`${
          colorScheme === "dark" ? "text-white" : "text-[#02050A]"
        } font-JakartaSemiBold text-base mb-2`}
      >
        {post.caption}
      </Text>

      {/* Action Buttons */}
      <View className="flex flex-row justify-between items-center mt-3">
        <TouchableOpacity
          onPress={handleLike}
          className="flex flex-row items-center"
        >
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={24}
            color={isLiked ? "red" : colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row items-center">
          <FontAwesome
            name="comment-o"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row items-center">
          <Ionicons
            name="share-outline"
            size={24}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBookmark}
          className="flex flex-row items-center"
        >
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={24}
            color={
              isBookmarked
                ? "#4646fc"
                : colorScheme === "dark"
                ? "white"
                : "black"
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const home = () => {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView
      className={`${
        colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
      } h-full`}
    >
      <StatusBar
        backgroundColor={colorScheme == "dark" ? "black" : "white"}
        style={colorScheme == "dark" ? "light" : "dark"}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="mx-5 my-20">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
