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
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

interface User {
  name: string;
  title: string;
  achievements: string[];
  jobSummary: string;
  interests: string[];
  skills: string[];
  projects: { title: string; description: string; link?: string }[];
  profileImage: string;
  socialLinks: { name: string; url: string; icon: any; iconColor: string }[];
}

interface UserFlashcardProps {
  user: User;
}

const UserFlashcard = ({ user }: UserFlashcardProps) => {
  const handleLinkPress = (url: string | undefined) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.card} className="p-4 relative">
      {/* Profile Image with Gradient Background */}
      <LinearGradient
        colors={["#6EE7B7", "#3B82F6"]}
        className="absolute top-0 left-0 right-0 h-24 rounded-t-lg"
      />

      <View className="flex-row justify-between mb-4">
        {/* Profile Image */}
        <View className="items-center">
          <Image
            source={{ uri: user.profileImage }}
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </View>
        <View>
          <Text className="text-lg font-JakartaBold text-black text-center">
            {user.name}
          </Text>
          <Text className="text-sm font-JakartaSemiBold text-white text-center">
            {user.title}
          </Text>
        </View>

        {/* Social Links */}
        <View className="flex-row space-x-2 mt-2">
          {user.socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleLinkPress(link.url)}
            >
              <Ionicons name={link.icon} size={20} color={link.iconColor} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View className="my-2 flex-wrap flex-row">
        {user.achievements.map((achievement, index) => (
          <Text
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs my-1 mr-2"
          >
            {achievement}
          </Text>
        ))}
      </View>

      {/* Job Summary */}
      <Text className="text-base font-JakartaMedium text-gray-800 mb-2">
        {user.jobSummary}
      </Text>

      {/* Interests Section with Horizontal Scrolling */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">Interests</Text>
        <View className="flex-wrap flex-row mt-2">
          {user.interests.map((interest, index) => (
            <Text
              key={index}
              className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs my-1 mr-2"
            >
              {interest}
            </Text>
          ))}
        </View>
      </View>

      {/* Skills Section */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">Skills</Text>
        <View className="flex-row flex-wrap mt-2">
          {user.skills.map((skill, index) => (
            <Text
              key={index}
              className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs my-1 mr-2"
            >
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Projects Section */}
      <View className="my-1">
        <Text className="text-lg font-JakartaBold text-black">Projects</Text>
        {user.projects.slice(0, 1).map((project, index) => (
          <View key={index} className="mt-2">
            <View className="flex-row justify-between">
              <Text className="text-base font-JakartaMedium text-gray-800">
                {project.title}
              </Text>
              {project.link && (
                <TouchableOpacity onPress={() => handleLinkPress(project.link)}>
                  <Ionicons name="link" size={20} color="#3B82F6" />
                </TouchableOpacity>
              )}
            </View>
            <Text className="text-sm text-gray-600 font-Jakarta">
              {project.description}
            </Text>
          </View>
        ))}
      </View>

      {/* Download Buttons with Icons */}
      {/* <View className="flex-row justify-end space-x-2">
        <TouchableOpacity className="bg-gray-200 rounded-full p-3">
          <MaterialIcons name="description" size={20} color="#4A5568" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 rounded-full p-3">
          <MaterialIcons name="email" size={20} color="#4A5568" />
        </TouchableOpacity>
      </View> */}
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

export default UserFlashcard;
