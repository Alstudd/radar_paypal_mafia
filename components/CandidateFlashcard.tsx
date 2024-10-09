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
import { MaterialIcons, Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

interface Candidate {
  name: string;
  email: string;
  designation: string;
  profilebio: string;
  walletaddress: string;
  skills: string[];
  interests: string[];
  domains: string[];
  projects: { title: string; description: string; link: string }[];
  sociallinks: { icon: string; link: string; username: string }[];
  achievements: string[];
  selectedgender: string;
  age: number;
  profilepicture: string;
  resume: string;
  date_of_birth: string;
  isinvestor: boolean;
  isrecruiter: boolean;
  companyId: string;
}

interface CandidateFlashcardProps {
  candidate: Candidate;
}

const CandidateFlashcard = ({ candidate }: CandidateFlashcardProps) => {
  const { colorScheme } = useColorScheme();
  const handleLinkPress = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View
      style={styles.card}
      className={`relative border-[2px] ${
        colorScheme === "dark" ? "bg-[#02050A] border-[#4646fc]" : "bg-white border-white"
      }`}
    >
      {/* Profile Image with Gradient Background */}
      <View className="px-4 pt-4 border-b-[1.5px] border-b-white">
        <LinearGradient
          colors={
            colorScheme === "dark"
              ? ["#4646fc", "#1e88e5", "#4646fc"]
              : ["#4646fc", "#1e88e5", "#EEEEEE"]
          }
          className="absolute top-0 left-0 right-0 h-24 rounded-t-xl"
        />
        <View className="flex-row justify-between mb-2">
          {/* Profile Image */}
          <View className="items-center">
            <Image
              source={{ uri: candidate.profilepicture }}
              className="w-16 h-16 rounded-full border-2 border-white"
            />
          </View>
          <View>
            <Text
              numberOfLines={1}
              className="text-lg font-JakartaBold text-black text-center"
            >
              {candidate.name}
            </Text>
            <Text
              numberOfLines={2}
              className="text-sm font-JakartaSemiBold text-white text-center w-[150px]"
            >
              {candidate.designation}
            </Text>
          </View>

          <View className="flex flex-col justify-between items-center">
            {/* Social Links */}
            <View className="flex-row space-x-2 mt-2">
              {candidate.sociallinks.slice(0, 3).map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLinkPress(link.link)}
                >
                  <FontAwesome6 name={link.icon} size={20} />
                </TouchableOpacity>
              ))}
            </View>
            {/* Resume and Mail Links */}
            <View className="flex-row justify-end space-x-2">
              <TouchableOpacity
                onPress={() => handleLinkPress(candidate.resume)}
                className="bg-gray-200 rounded-full p-1"
              >
                <MaterialIcons name="description" size={20} color="#02050A" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLinkPress(`mailto:${candidate.email}`)}
                className="bg-gray-200 rounded-full p-1"
              >
                <MaterialIcons name="email" size={20} color="#02050A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        className={`${
          colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
        } px-4 rounded-b-xl pb-4`}
      >
        {/* Achievements */}
        <View className="my-2 flex-wrap flex-row">
          {candidate.achievements.slice(0, 3).map((achievement, index) => (
            <Text
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs my-1 mr-2 font-JakartaMedium"
            >
              {achievement}
            </Text>
          ))}
        </View>

        {/* Bio */}
        <Text
          className={`${
            colorScheme === "dark" ? "text-gray-200" : "text-gray-800"
          } text-base font-JakartaMedium mb-2`}
        >
          {candidate.profilebio.substring(0, 100)}...
        </Text>

        {/* Interests Section with Horizontal Scrolling */}
        <View className="my-1">
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            } text-lg font-JakartaBold`}
          >
            Interests
          </Text>
          <View className="flex-wrap flex-row mt-2">
            {candidate.interests.slice(0, 3).map((interest, index) => (
              <Text
                key={index}
                className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs my-1 mr-2 font-JakartaMedium"
              >
                {interest}
              </Text>
            ))}
          </View>
        </View>

        {/* Skills Section */}
        <View className="my-1">
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            } text-lg font-JakartaBold`}
          >
            Skills
          </Text>
          <View className="flex-row flex-wrap mt-2">
            {candidate.skills.slice(0, 6).map((skill, index) => (
              <Text
                key={index}
                className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs my-1 mr-2 font-JakartaMedium"
              >
                {skill}
              </Text>
            ))}
          </View>
        </View>

        {/* Projects Section */}
        <View className="my-1">
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            } text-lg font-JakartaBold`}
          >
            Projects
          </Text>
          {candidate.projects.slice(0, 1).map((project, index) => (
            <View key={index} className="mt-2">
              <View className="flex-row justify-between">
                <Text
                  className={`${
                    colorScheme === "dark" ? "text-gray-200" : "text-gray-800"
                  } text-base font-JakartaMedium`}
                >
                  {project.title}
                </Text>
                {project.link && (
                  <TouchableOpacity
                    onPress={() => handleLinkPress(project.link)}
                  >
                    <Ionicons name="link" size={20} color="#3B82F6" />
                  </TouchableOpacity>
                )}
              </View>
              <Text
                className={`${
                  colorScheme === "dark" ? "text-gray-300" : "text-gray-600"
                } text-sm font-Jakarta mt-1`}
              >
                {project.description.substring(0, 100)}...
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 12,
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

export default CandidateFlashcard;
