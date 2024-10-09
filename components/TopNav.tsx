// TopNav.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelectedMode } from "@/contexts/SelectedModeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import Icon from "@expo/vector-icons/Ionicons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { OktoContextType, useOkto } from "okto-sdk-react-native";
import { router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

const TopNav = () => {
  const { selectedMode, setSelectedMode } = useSelectedMode();
  const { logOut } = useOkto() as OktoContextType;
  const { signOut } = useAuth();
  const { user } = useUser();
  const [isInvestor, setIsInvestor] = React.useState(false);
  const [isRecruiter, setIsRecruiter] = React.useState(false);

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/(api)/profile", {
          method: "GET",
        });
        const { data } = await response.json();
        const profile = data.find(
          (profile: any) =>
            profile.email === user?.primaryEmailAddress?.emailAddress ||
            profile.email === GoogleSignin.getCurrentUser()?.user.email
        );
        setIsInvestor(profile?.isinvestor);
        setIsRecruiter(profile?.isrecruiter);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View
      style={styles.mainContainer}
      className="flex flex-row justify-between items-center w-full px-2"
    >
      <View className="flex items-center justify-center">
        <ThemeSwitcher />
      </View>
      <View style={styles.container}>
        {["User", isRecruiter ? "Recruiter" : "Candidate", isInvestor ? "Investor" : "Ideator"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.button,
              selectedMode === mode && styles.activeButton,
            ]}
            onPress={() => setSelectedMode(mode)}
          >
            <Text className="font-JakartaMedium" style={styles.buttonText}>
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
        <Icon name="log-out-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333333",
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 50,
    overflow: "hidden",
    height: 50,
  },
  mainContainer: {
    position: "absolute",
    top: 40,
    zIndex: 99,
    elevation: 1,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#4646fc",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "#FF5E5E",
    borderRadius: 30,
  },
});

export default TopNav;
