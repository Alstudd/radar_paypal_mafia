import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { fetchAPI } from "@/lib/fetch";
import { ActivityIndicator, View } from "react-native";

const Page = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isProfileComplete, setIsProfileComplete] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Get Profile API request
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
        console.log("Profile data:", profile);
        if (profile) {
          setIsProfileComplete(true);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (GoogleSignin.getCurrentUser() || isSignedIn) {
    if (isProfileComplete) {
      return <Redirect href="/(root)/(tabs)/home" />;
    } else {
      return <Redirect href="/(root)/userFlashcardForm" />;
    }
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
