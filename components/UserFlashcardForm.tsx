import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import InputField from "./InputField";
import InputArea from "./InputArea";
import CustomButton from "./CustomButton";
import { Easing } from "react-native-reanimated";
import Icon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { onboarding } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";

const steps = [
  { id: 1, title: "Basic Details" },
  { id: 2, title: "Projects & Skills" },
  { id: 3, title: "Interests & Domains" },
  { id: 4, title: "Investment Preferences" },
  { id: 5, title: "Blockchain Wallet" },
];

const UserFlashcardForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    profileData: "",
    investmentInterests: "",
    walletAddress: "",
  });

  const [skill, setSkill] = useState("");
  const [interest, setInterest] = useState("");
  const [domain, setDomain] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [projects, setProjects] = useState([{ name: "", link: "" }]);

  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const progressAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const progress = (currentStep + 1) / steps.length;

    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const addSkill = () => {
    if (skill.trim() !== "") {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addInterest = () => {
    if (interest.trim() !== "") {
      setInterests([...interests, interest.trim()]);
      setInterest("");
    }
  };

  const removeInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const addDomain = () => {
    if (domain.trim() !== "") {
      setDomains([...domains, domain.trim()]);
      setDomain("");
    }
  };

  const removeDomain = (index: number) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: "", link: "" }]);
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setProjects(updatedProjects);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View className="flex flex-row justify-between items-center">
          {currentStep > 0 ? (
            <TouchableOpacity
              onPress={prevStep}
              className="p-[10px] rounded-full bg-gray-200 w-[45px] flex items-center justify-center text-center"
            >
              <Icon name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
            <Icon name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="flex flex-col items-center gap-6">
            <View className="h-3 bg-gray-200 rounded-full overflow-hidden w-[250px]">
              <Animated.View
                style={{
                  width: progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 250],
                  }),
                  height: "100%",
                  backgroundColor: "#0286FF",
                }}
              />
            </View>
            <Text className="text-2xl font-bold self-center">
              {steps[currentStep].title}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4">
          {currentStep === 0 && (
            <View>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={formValues.name}
                onChangeText={(value) => handleChange("name", value)}
                useExpoVectorIcons={true}
                icon="person"
              />
              <InputField
                label="Work Email"
                placeholder="Enter your work email"
                value={formValues.email}
                onChangeText={(value) => handleChange("email", value)}
                useExpoVectorIcons={true}
                icon="mail"
              />
              <InputArea
                label="Profile Bio"
                placeholder="Enter your profile bio"
                value={formValues.profileData}
                onChangeText={(value) => handleChange("profileData", value)}
                useExpoVectorIcons={true}
                icon="info"
              />
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <InputField
                label="Skills"
                placeholder="List your skills"
                value={skill}
                onChangeText={setSkill}
                useExpoVectorIcons={true}
                icon="info"
                iconRight={true}
                rightIcon="add-circle"
                righButtonOnPress={addSkill}
              />
              <View style={styles.listContainer}>
                {skills.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.listItemText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeSkill(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              {projects.map((project, index) => (
                <View key={index}>
                  <InputField
                    label={`Project Name ${index + 1}`}
                    placeholder="Enter project name"
                    value={project.name}
                    onChangeText={(value) =>
                      updateProject(index, "name", value)
                    }
                  />
                  <InputField
                    label={`Project Link ${index + 1}`}
                    placeholder="Enter project link"
                    value={project.link}
                    onChangeText={(value) =>
                      updateProject(index, "link", value)
                    }
                  />
                </View>
              ))}
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <InputField
                label="Interests"
                placeholder="Your interests"
                value={interest}
                onChangeText={setInterest}
                useExpoVectorIcons={true}
                icon="interests"
                iconRight={true}
                rightIcon="add-circle"
                righButtonOnPress={addInterest}
              />
              <View style={styles.listContainer}>
                {interests.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.listItemText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeInterest(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <InputField
                label="Domains"
                placeholder="Your domain expertise"
                value={domain}
                onChangeText={setDomain}
                useExpoVectorIcons={true}
                icon="work"
                iconRight={true}
                rightIcon="add-circle"
                righButtonOnPress={addDomain}
              />
              <View style={styles.listContainer}>
                {domains.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.listItemText}>{item}</Text>
                    <TouchableOpacity onPress={() => removeDomain(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <InputField
                label="Investment Interests"
                placeholder="Your investment preferences"
                value={formValues.investmentInterests}
                onChangeText={(value) =>
                  handleChange("investmentInterests", value)
                }
              />
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <InputField
                label="Blockchain Wallet"
                placeholder="Enter wallet address"
                value={formValues.walletAddress}
                onChangeText={(value) => handleChange("walletAddress", value)}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={styles.footer}
        className="flex flex-col gap-3 mt-6 justify-center items-center"
      >
        {currentStep < steps.length - 1 ? (
          <CustomButton title="Next" onPress={nextStep} />
        ) : (
          <CustomButton
            title="Submit"
            onPress={() => router.replace("/(root)/(tabs)/home")}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 20,
    justifyContent: "space-between",
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "#FF5E5E",
    borderRadius: 30,
  },
  formContent: {
    paddingTop: 130,
    paddingBottom: 100,
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default UserFlashcardForm;
