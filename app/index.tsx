import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Page = () => {
  const { isSignedIn } = useAuth();
  const isProfileCompleted = true;

  if (GoogleSignin.getCurrentUser() || isSignedIn) {
    if (isProfileCompleted) {
      return <Redirect href="/(root)/(tabs)/home" />;
    } else {
      return <Redirect href="/(root)/userFlashcardForm" />;
    }
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
