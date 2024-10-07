import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Investor {
  name: string;
  ideaTitle: string;
  investmentFocus: string; // What type of investments the investor is interested in
  profileImage: string;
  links: { name: string; url: string; icon: any; iconColor: string }[];
  fundingNeeded: string;
  expectedROI: string; // Expected Return on Investment
  investmentStage: string; // Stage of investment preferred (seed, series A, etc.)
  notableInvestments: string[]; // List of notable investments
}

interface InvestorFlashcardProps {
  investor: Investor;
}

const InvestorFlashcard = ({ investor }: InvestorFlashcardProps) => {
  const handleLinkPress = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.card} className="p-4 relative">
      {/* Profile Image with Gradient Background */}
      <LinearGradient
        colors={["#FF5733", "#FFC300", "#FF5733"]}
        className="absolute top-0 left-0 right-0 h-24 rounded-t-lg"
      />

      <View className="flex-row justify-between mb-4">
        {/* Profile Image */}
        <View className="items-center">
          <Image
            source={{ uri: investor.profileImage }}
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </View>
        <View>
          <Text className="text-lg font-JakartaBold text-black text-center">
            {investor.name}
          </Text>
          <Text className="text-sm font-JakartaSemiBold text-white text-center">
            {investor.ideaTitle}
          </Text>
        </View>

        {/* Social Links */}
        <View className="flex-row space-x-2 mt-2">
          {investor.links.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLinkPress(link.url)}
            >
              <Ionicons name={link.icon} size={20} color={link.iconColor} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Investment Focus */}
      <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
        Investment Focus: {investor.investmentFocus}
      </Text>

      {/* Funding and Investment Details */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">
          Funding Needed
        </Text>
        <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
          {investor.fundingNeeded}
        </Text>
        <Text className="text-lg font-JakartaBold text-black">
          Expected ROI
        </Text>
        <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
          {investor.expectedROI}
        </Text>
        <Text className="text-lg font-JakartaBold text-black">
          Investment Stage
        </Text>
        <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
          {investor.investmentStage}
        </Text>
      </View>

      {/* Notable Investments */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">
          Notable Investments
        </Text>
        <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
          {investor.notableInvestments.join(", ")}
        </Text>
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

export default InvestorFlashcard;
