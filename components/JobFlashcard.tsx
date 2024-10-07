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

interface Job {
  jobTitle: string;
  companyName: string;
  location: string;
  jobSummary: string;
  responsibilities: string[];
  qualifications: string[];
  salaryRange: string;
  benefits: string[];
  companyLogo?: string;
  applicationLink: string;
}

interface JobFlashcardProps {
  job: Job;
}

const JobFlashcard = ({ job }: JobFlashcardProps) => {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.card} className="p-4 relative">
      {/* Company Logo with Gradient Background */}
      <LinearGradient
        colors={["#4CAF50", "#388E3C", "#2E7D32"]}
        className="absolute top-0 left-0 right-0 h-24 rounded-t-lg"
      />

      <View className="flex-row justify-between mb-4">
        {/* Company Logo */}
        <View className="items-center">
          {job.companyLogo && (
            <Image
              source={{ uri: job.companyLogo }}
              className="w-16 h-16 rounded-full border-4 border-white"
            />
          )}
        </View>
        <View>
          <Text className="text-lg font-JakartaBold text-white text-center">
            {job.jobTitle}
          </Text>
          <Text className="text-sm font-JakartaSemiBold text-white text-center">
            {job.companyName}
          </Text>
          <Text className="text-sm font-JakartaSemiBold text-white text-center">
            {job.location}
          </Text>
        </View>
      </View>

      {/* Job Summary */}
      <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
        {job.jobSummary}
      </Text>

      {/* Responsibilities Section */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">
          Responsibilities
        </Text>
        {job.responsibilities.map((responsibility, index) => (
          <Text key={index} className="text-base text-gray-800">
            • {responsibility}
          </Text>
        ))}
      </View>

      {/* Qualifications Section */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">
          Qualifications
        </Text>
        {job.qualifications.map((qualification, index) => (
          <Text key={index} className="text-base text-gray-800">
            • {qualification}
          </Text>
        ))}
      </View>

      {/* Salary Range */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">
          Salary Range
        </Text>
        <Text className="text-base text-gray-800 mb-2">{job.salaryRange}</Text>
      </View>

      {/* Benefits Section */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">Benefits</Text>
        {job.benefits.map((benefit, index) => (
          <Text key={index} className="text-base text-gray-800">
            • {benefit}
          </Text>
        ))}
      </View>

      {/* Application Button */}
      {/* <TouchableOpacity
        onPress={() => handleLinkPress(job.applicationLink)}
        className="bg-blue-500 rounded-full p-3 mt-4"
      >
        <Text className="text-white text-center font-JakartaBold">
          Apply Now
        </Text>
      </TouchableOpacity> */}
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

export default JobFlashcard;
