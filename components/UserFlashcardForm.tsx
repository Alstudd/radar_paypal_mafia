import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  Platform,
  Alert,
  Switch,
} from "react-native";
import InputField from "./InputField";
import InputArea from "./InputArea";
import CustomButton from "./CustomButton";
import { Easing } from "react-native-reanimated";
import Icon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { icons, onboarding } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import Calendar from "./Calendar";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import {
  GoogleSignin,
  type ConfigureParams,
} from "@react-native-google-signin/google-signin";
import {
  OktoContextType,
  Portfolio,
  useOkto,
  Wallet,
} from "okto-sdk-react-native";
import ThemeSwitcher from "./ThemeSwitcher";
import WalletConnection from "./WalletConnection";
import OktoApiButton from "./OktoApiButton";
import SolanaWallet from "./SolanaWallet";
import { fetchAPI } from "@/lib/fetch";
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
    region: "us-east-2",
});

const steps = [
  { id: 1, title: "Wallet Connection" },
  { id: 2, title: "Basic Details" },
  { id: 3, title: "Personal Details" },
  { id: 4, title: "Projects & Skills" },
  { id: 5, title: "Interests & Domains" },
  { id: 6, title: "Social Links" },
  { id: 7, title: "Achievements" },
  { id: 8, title: "Documents" },
];

const avatarImages = [
  {
    gender: "Male",
    url: "https://cdn-icons-png.flaticon.com/128/4140/4140039.png",
  },
  {
    gender: "Female",
    url: "https://cdn-icons-png.flaticon.com/128/4140/4140060.png",
  },
  {
    gender: "Other",
    url: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
  },
];

interface SocialLink {
  icon: string;
  link: string;
  username: string;
}

interface Project {
  title: string;
  link: string;
  description: string;
}

const UserFlashcardForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    designation: "",
    profileBio: "",
  });

  const [skill, setSkill] = useState("");
  const [interest, setInterest] = useState("");
  const [domain, setDomain] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [achievement, setAchievement] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    { title: "", link: "", description: "" },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);

  const [selectedGender, setSelectedGender] = useState(null);
  const [age, setAge] = useState(0);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  const { colorScheme } = useColorScheme();

  const s3 = new AWS.S3();

  const progressAnimation = useState(new Animated.Value(0))[0];

  const { signOut } = useAuth();
  const { logOut } = useOkto() as OktoContextType;

  const clerkUser: any = useUser();

  GoogleSignin.configure({});

  const handleSignOut = async () => {
    try {
      if (GoogleSignin.getCurrentUser()) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        console.log("Google sign-out successful");

        await logOut();
        console.log("Okto sign-out successful");
      } else {
        signOut();
        console.log("Clerk sign-out successful");
      }
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const handleGenderSelect = (gender: any) => {
    setSelectedGender(gender);
  };

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
      if (currentStep === 0 && walletAddress === "") {
        Alert.alert("Error", "Please connect phantom wallet to proceed");
      } else if (currentStep === 1 && (formValues.name === "" || formValues.email === "" || formValues.designation === "" || formValues.profileBio === "")) {
        Alert.alert("Error", "Please enter all the fields to proceed");
      } else if (currentStep === 2 && (selectedGender === null || age === 0 || profilePicture === null)) {
        Alert.alert("Error", "Please select all the fields to proceed");
      } else if (currentStep === 3 && (skills.length === 0 || (projects.length === 1 && (projects[0].title === "" || projects[0].link === "" || projects[0].description === "")))) {
        Alert.alert("Error", "Please enter all the fields to proceed");
      } else if (currentStep === 4 && (interests.length === 0 || domains.length === 0)) {
        Alert.alert("Error", "Please enter all the fields to proceed");
      } else if (currentStep === 5 && socialLinks.length === 0) {
        Alert.alert("Error", "Please enter all the fields to proceed");
      } else if (currentStep === 6 && achievements.length === 0) {
        Alert.alert("Error", "Please enter all the fields to proceed");
      } else if (currentStep === 7 && resume === null) {
        Alert.alert("Error", "Please upload your resume to proceed");
      } else {
        setCurrentStep(currentStep + 1);
      }
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
    let currentIndex = projects.length - 1;
    if (
      projects[currentIndex].title.trim() !== "" &&
      projects[currentIndex].link.trim() !== "" &&
      projects[currentIndex].description.trim() !== ""
    ) {
      setProjects([...projects, { title: "", link: "", description: "" }]);
    }
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setProjects(updatedProjects);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addSocialLink = () => {
    if (socialLink.trim() !== "") {
      let icon = "globe";
      let link = socialLink;
      let username = "";
      if (!socialLink.includes("http://") && !socialLink.includes("https://")) {
        link = `https://${socialLink.trim()}`;
      }
      if (socialLink.includes("linkedin")) {
        icon = "linkedin";
        username = socialLink.split("/").pop() || "";
      } else if (
        socialLink.includes("twitter") ||
        socialLink.includes("x.com")
      ) {
        icon = "x-twitter";
        username = socialLink.split("/").pop() || "";
      } else if (socialLink.includes("github")) {
        icon = "github";
        username = socialLink.split("/").pop() || "";
      } else if (socialLink.includes("facebook")) {
        icon = "facebook";
        username = socialLink.split("/").pop() || "";
      } else if (socialLink.includes("instagram")) {
        icon = "instagram";
        username = socialLink.split("/").pop() || "";
      }
      setSocialLinks([...socialLinks, { icon, link, username }]);
      setSocialLink("");
    }
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const addAchievement = () => {
    if (achievement.trim() !== "") {
      setAchievements([...achievements, achievement.trim()]);
      setAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const uploadFileToS3 = (bucketName: string, fileName: any, filePath: any) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: filePath,
    }
    return s3.upload(params).promise();
  }

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      console.log(result.assets[0]);
      // setProfilePicture(result.assets[0]);
      const bucketName = "antimatrix";
      const fileName: any = result.assets[0].fileName;
      const filePath = result.assets[0].uri.replace("file://", "");
      try {
        const fileData = await fetch(filePath).then((res) => res.blob());
        const data = await uploadFileToS3(bucketName, fileName, fileData);
        console.log(data);
        console.log("Image uploaded to S3 successfully");
        setProfilePicture(data.Location);
      } catch (error) {
        console.error("Error uploading image to S3:", error);
      }
    }
  };

  const selectDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets) {
      console.log(result.assets[0]);
      // setResume(result.assets[0]);
      const bucketName = "antimatrix";
      const fileName: any = result.assets[0].name;
      const filePath = result.assets[0].uri.replace("file://", "");
      try {
        const fileData = await fetch(filePath).then((res) => res.blob());
        const data = await uploadFileToS3(bucketName, fileName, fileData);
        console.log(data);
        console.log("Document uploaded to S3 successfully");
        setResume(data.Location);
      } catch (error) {
        console.error("Error uploading document to S3:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const { data } = await fetchAPI("/(api)/user");
    const user = data.find(
      (user: any) =>
        user.email === GoogleSignin.getCurrentUser()?.user.email ||
        user.email === clerkUser.user?.primaryEmailAddress?.emailAddress
    );
    // post profile api call
    try {
      await fetchAPI("/(api)/profile", {
        method: "POST",
        body: JSON.stringify({
          clerk_id: user.clerk_id,
          google_signin_id: user.google_signin_id,
          ...formValues,
          walletAddress,
          skills,
          interests,
          domains,
          projects,
          socialLinks,
          achievements,
          selectedGender,
          age,
          profilePicture: profilePicture,
          resume: resume,
          date_of_birth: date,
          isInvestor: balance ? balance >= 1 : false,
          isRecruiter: false,
          companyId: null,
        }),
      });
      console.log("User profile created successfully");
      router.replace("/(root)/(tabs)/home");
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colorScheme == "dark" ? "black" : "white"}
        style={colorScheme == "dark" ? "light" : "dark"}
      />
      <View
        className={`${colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"}`}
        style={styles.header}
      >
        <View className="flex flex-row justify-between items-center">
          {currentStep > 0 ? (
            <TouchableOpacity
              onPress={prevStep}
              className={`p-[10px] rounded-full w-[45px] flex items-center justify-center text-center ${
                colorScheme === "dark" ? "bg-white" : "bg-gray-200"
              }`}
            >
              <Icon name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
          ) : (
            <ThemeSwitcher />
          )}
          <View className="flex flex-row gap-3 items-center">
            {currentStep > 0 && (
              <View>
                <ThemeSwitcher />
              </View>
            )}
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.logoutButton}
            >
              <Icon name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          className={`${colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"}`}
        >
          <View className="flex flex-col items-center gap-6">
            <View
              className={`h-3 ${
                colorScheme === "dark" ? "bg-white" : "bg-[#02050A]"
              } rounded-full overflow-hidden w-[250px]`}
            >
              <Animated.View
                style={{
                  width: progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 250],
                  }),
                  height: "100%",
                  backgroundColor: "#536dfe",
                }}
              />
            </View>
            <Text
              className={`text-2xl font-JakartaBold self-center text-center ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
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
              <SolanaWallet
                connected={connected}
                walletAddress={walletAddress}
                setConnected={setConnected}
                setWalletAddress={setWalletAddress}
                balance={balance}
                setBalance={setBalance}
              />
              {/* <InputField
                label="Blockchain Wallet"
                placeholder="Enter wallet address"
                value={formValues.walletAddress}
                onChangeText={(value) => handleChange("walletAddress", value)}
              /> */}
              <WalletConnection />
              {/* <OktoApiButton
                title="Get Portfolio"
                apiFn={() => getPortfolio()}
                setterFn={setPortfolio}
                className="mt-5"
                IconLeft={() => (
                  <Image
                    source={icons.list}
                    resizeMode="contain"
                    className="w-5 h-5 mx-2"
                  />
                )}
              /> */}
            </View>
          )}

          {currentStep === 1 && (
            <View>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={formValues.name}
                textContentType="name"
                onChangeText={(value) => handleChange("name", value)}
                useExpoVectorIcons={true}
                icon="person-outline"
              />
              <InputField
                label="Work Email"
                placeholder="Enter your work email"
                textContentType="emailAddress"
                value={formValues.email}
                onChangeText={(value) => handleChange("email", value)}
                useExpoVectorIcons={true}
                icon="mail-outline"
              />
              <InputField
                label="Designation"
                placeholder="Enter your designation"
                value={formValues.designation}
                onChangeText={(value) => handleChange("designation", value)}
                useExpoVectorIcons={true}
                icon="laptop-chromebook"
              />
              <InputArea
                label="Profile Bio"
                placeholder="Enter your profile bio"
                value={formValues.profileBio}
                onChangeText={(value) => handleChange("profileBio", value)}
                useExpoVectorIcons={true}
                icon="info-outline"
              />
            </View>
          )}

          {currentStep === 2 && (
            <View>
              <Text
                className={`font-JakartaSemiBold text-lg mt-2 mb-1 ${
                  colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                }`}
              >
                Select Your Gender
              </Text>
              <View style={styles.avatarContainer}>
                {avatarImages.map((avatar, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleGenderSelect(avatar.gender)}
                    style={styles.avatarWrapper}
                  >
                    <Image
                      className="rounded-full"
                      source={{ uri: avatar.url }}
                      style={styles.avatar}
                    />
                    {selectedGender === avatar.gender && (
                      <View style={styles.tickContainer}>
                        <FontAwesome
                          name="check-circle"
                          size={24}
                          color="green"
                        />
                      </View>
                    )}
                    <Text
                      className={`font-JakartaMedium ${
                        colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                      }`}
                      style={styles.genderLabel}
                    >
                      {avatar.gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                className={`text-lg font-JakartaSemiBold mb-3 ${
                  colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                }`}
              >
                Select Your Date of Birth
              </Text>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                className={`flex flex-row justify-start items-center relative rounded-full border border-neutral-100 focus:border-[#536dfe] ${
                  colorScheme === "dark" ? "bg-[#02050A]" : "bg-neutral-100"
                }`}
              >
                <View className="ml-4">
                  <MaterialIcons
                    name="edit-calendar"
                    size={24}
                    className=""
                    color={"#536dfe"}
                  />
                </View>
                <View className="rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1">
                  <Text
                    className={`text-lg font-JakartaSemiBold mb-[4px] ${
                      colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                    }`}
                  >
                    {date.toString().split(" ").slice(1, 4).join(" ")}
                  </Text>
                </View>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={() => setOpen(false)}
              >
                <Calendar setOpen={setOpen} setDate={setDate} setAge={setAge} />
              </Modal>

              <Text
                className={`text-lg font-JakartaSemiBold my-3 ${
                  colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                }`}
              >
                Profile Picture
              </Text>
              <View style={styles.imageContainer}>
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Icon
                    name="person-circle-outline"
                    size={100}
                    color="#536dfe"
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={selectImage}
              >
                <Text
                  className="font-JakartaBold text-center"
                  style={styles.uploadButtonText}
                >
                  Select Profile Picture
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {currentStep === 3 && (
            <View>
              <InputField
                label="Skills"
                placeholder="Enter your skills"
                value={skill}
                onChangeText={setSkill}
                useExpoVectorIcons={true}
                icon="navigation"
                iconRight={true}
                rightIcon="add-circle-outline"
                righButtonOnPress={addSkill}
              />
              <View
                className="flex flex-row items-center flex-wrap gap-2"
                style={styles.listContainer}
              >
                {skills.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text
                      className="font-JakartaSemiBold"
                      style={styles.listItemText}
                    >
                      {item}
                    </Text>
                    <TouchableOpacity onPress={() => removeSkill(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              {projects.map((project, index) => (
                <View className="mt-2" key={index}>
                  <View className="flex flex-row justify-between items-center">
                    <Text
                      className={`font-JakartaSemiBold text-lg mb-2 ${
                        colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                      }`}
                    >
                      Project {index + 1}
                    </Text>
                    {index > 0 && (
                      <View className="flex flex-row gap-1 items-center">
                        <TouchableOpacity onPress={addProject}>
                          <MaterialIcons
                            name="add-circle"
                            size={28}
                            color="#536dfe"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="pt-0.5"
                          onPress={() => removeProject(index)}
                        >
                          <AntDesign
                            name="minuscircle"
                            size={24}
                            color="#FF5E5E"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <InputField
                    placeholder="Enter project title"
                    value={project.title}
                    onChangeText={(value) =>
                      updateProject(index, "title", value)
                    }
                    useExpoVectorIcons={true}
                    icon="title"
                  />
                  <InputField
                    placeholder="Enter project link"
                    value={project.link}
                    onChangeText={(value) =>
                      updateProject(index, "link", value)
                    }
                    useExpoVectorIcons={true}
                    icon="add-link"
                  />
                  <InputArea
                    placeholder="Enter project description"
                    value={project.description}
                    onChangeText={(value) =>
                      updateProject(index, "description", value)
                    }
                    useExpoVectorIcons={true}
                    icon="import-contacts"
                  />
                </View>
              ))}
              <View className="">
                <CustomButton
                  className="mt-2 rounded-[10px]"
                  title="Add Project"
                  onPress={addProject}
                  IconLeft={() => (
                    <Image
                      source={icons.list}
                      resizeMode="contain"
                      className="w-5 h-5 mx-2"
                    />
                  )}
                />
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View>
              <InputField
                label="Interests"
                placeholder="Enter your interests"
                value={interest}
                onChangeText={setInterest}
                useExpoVectorIcons={true}
                icon="interests"
                iconRight={true}
                rightIcon="add-circle-outline"
                righButtonOnPress={addInterest}
              />
              <View
                className="flex flex-row items-center flex-wrap gap-2"
                style={styles.listContainer}
              >
                {interests.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text
                      className="font-JakartaSemiBold"
                      style={styles.listItemText}
                    >
                      {item}
                    </Text>
                    <TouchableOpacity onPress={() => removeInterest(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <InputField
                label="Domain Expertise"
                placeholder="Enter your domains"
                value={domain}
                onChangeText={setDomain}
                useExpoVectorIcons={true}
                icon="work"
                iconRight={true}
                rightIcon="add-circle-outline"
                righButtonOnPress={addDomain}
              />
              <View
                className="flex flex-row items-center flex-wrap gap-2"
                style={styles.listContainer}
              >
                {domains.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text
                      className="font-JakartaSemiBold"
                      style={styles.listItemText}
                    >
                      {item}
                    </Text>
                    <TouchableOpacity onPress={() => removeDomain(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {currentStep === 5 && (
            <View>
              <InputField
                label="Socials"
                placeholder="Enter your socials"
                value={socialLink}
                onChangeText={setSocialLink}
                useExpoVectorIcons={true}
                icon="web"
                iconRight={true}
                rightIcon="add-circle-outline"
                righButtonOnPress={addSocialLink}
              />
              <View
                className="flex flex-col gap-1"
                style={styles.listContainer}
              >
                {socialLinks.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View className="flex flex-row items-center gap-2">
                      <FontAwesome6 name={item.icon} size={16} color="#333" />
                      <Text
                        className="font-JakartaSemiBold mb-1"
                        style={styles.listItemText}
                      >
                        {item.username !== "" ? item.username : item.link}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => removeSocialLink(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {currentStep === 6 && (
            <View>
              <InputField
                label="Achievements"
                placeholder="Enter your achievements"
                value={achievement}
                onChangeText={setAchievement}
                useExpoVectorIcons={true}
                icon="star-outline"
                iconRight={true}
                rightIcon="add-circle-outline"
                righButtonOnPress={addAchievement}
              />
              <View
                className="flex flex-col gap-1"
                style={styles.listContainer}
              >
                {achievements.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text
                      className="font-JakartaSemiBold"
                      style={styles.listItemText}
                    >
                      {item}
                    </Text>
                    <TouchableOpacity onPress={() => removeAchievement(index)}>
                      <Icon name="close-circle" size={24} color="#FF5E5E" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {currentStep === 7 && (
            <View>
              <Text className="text-lg font-JakartaSemiBold my-3">Resume</Text>
              <View style={styles.previewContainer}>
                {resume ? (
                  // <WebView
                  //   source={{ uri: resume.uri }}
                  //   style={styles.pdfViewer}
                  // />
                  <View style={styles.pdfContainer}>
                    <AntDesign name="pdffile1" size={100} color="#536dfe" />
                    <Text
                      className="text-center font-JakartaBold"
                      style={styles.pdfName}
                    >
                      {resume.name ? resume.name : "PDF"}
                    </Text>
                  </View>
                ) : (
                  <Icon name="document-outline" size={100} color="#536dfe" />
                )}
              </View>

              <TouchableOpacity
                style={styles.uploadButton}
                onPress={selectDocument}
              >
                <Text
                  className="font-JakartaBold text-center"
                  style={styles.uploadButtonText}
                >
                  Select Document
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <View
        className={`${colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"}`}
        style={styles.footer}
      >
        {currentStep < steps.length - 1 ? (
          <CustomButton className="mx-auto" title="Next" onPress={nextStep} />
        ) : (
          <CustomButton title="Submit" onPress={handleSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "#FF5E5E",
    borderRadius: 30,
  },
  formContent: {
    paddingTop: 140,
    paddingBottom: 120,
  },
  listContainer: {
    marginTop: 2,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  avatarContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
  },
  avatar: {
    width: 75,
    height: 75,
  },
  tickContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 2,
  },
  genderLabel: {
    marginTop: 5,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
  },
  dateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderColor: "#536dfe",
    borderWidth: 2,
  },
  uploadButton: {
    backgroundColor: "#536dfe",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pdfViewer: {
    width: "100%",
    height: 400,
  },
  pdfContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pdfName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#536dfe",
  },
});

export default UserFlashcardForm;
