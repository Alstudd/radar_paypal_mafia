import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Ideator {
  name: string;
  ideaTitle: string;
  ideaDescription: string;
  profileImage: string;
  links: { name: string; url: string; icon: any; iconColor: string }[];
  fundingNeeded: string;
  potentialRevenue: string;
  prototypeLink?: string;
  videoPitchLink?: string;
}

interface IdeatorFlashcardProps {
  ideator: Ideator;
}

const IdeatorFlashcard = ({ ideator }: IdeatorFlashcardProps) => {
  const handleLinkPress = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.card} className="p-4 relative">
      {/* Profile Image with Gradient Background */}
      <LinearGradient
        colors={["#42a5f5", "#1e88e5", "#3f51b5"]}
        className="absolute top-0 left-0 right-0 h-24 rounded-t-lg"
      />

      <View className="flex-row justify-between mb-4">
        {/* Profile Image */}
        <View className="items-center">
          <Image
            source={{ uri: ideator.profileImage }}
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </View>
        <View>
          <Text className="text-lg font-JakartaBold text-black text-center">
            {ideator.name}
          </Text>
          <Text className="text-sm font-JakartaSemiBold text-white text-center">
            {ideator.ideaTitle}
          </Text>
        </View>

        {/* Social Links */}
        <View className="flex-row space-x-2 mt-2">
          {ideator.links.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLinkPress(link.url)}
            >
              <Ionicons name={link.icon} size={20} color={link.iconColor} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Idea Description */}
      <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
        {ideator.ideaDescription}
      </Text>

      {/* Funding and Revenue Details */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">
          Funding Needed
        </Text>
        <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
          {ideator.fundingNeeded}
        </Text>
        <Text className="text-lg font-JakartaBold text-black">
          Potential Revenue
        </Text>
        <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
          {ideator.potentialRevenue}
        </Text>
      </View>

      {/* Links to Prototypes, Pitches */}
      <View className="my-1">
        {ideator.prototypeLink && (
          <View className="flex-row justify-between">
            <Text className="text-base font-JakartaMedium text-gray-800">
              Prototype
            </Text>
            <TouchableOpacity
              onPress={() => handleLinkPress(ideator.prototypeLink)}
            >
              <Ionicons name="link" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        )}
        {ideator.videoPitchLink && (
          <View className="flex-row justify-between mt-2">
            <Text className="text-base font-JakartaMedium text-gray-800">
              Video Pitch
            </Text>
            <TouchableOpacity
              onPress={() => handleLinkPress(ideator.videoPitchLink)}
            >
              <Ionicons name="videocam" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Download Buttons */}
      <View className="flex-row justify-end space-x-2">
        <TouchableOpacity className="bg-gray-200 rounded-full p-3">
          <MaterialIcons name="description" size={20} color="#4A5568" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 rounded-full p-3">
          <MaterialIcons name="email" size={20} color="#4A5568" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fefefe",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});

export default IdeatorFlashcard;
