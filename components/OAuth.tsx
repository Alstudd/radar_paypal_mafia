import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useOkto, type OktoContextType } from "okto-sdk-react-native";

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!;


const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/userFlashcardForm");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  
  const { authenticate } = useOkto() as OktoContextType;
  async function handleGoogleSignInUsingOkto() {
    try {
      const configured = GoogleSignin.configure({
        // Update scopes as needed in your app
        scopes: ["email", "profile"],
        webClientId
    });
    console.log(configured);
      await GoogleSignin.hasPlayServices();
      const response: any = await GoogleSignin.signIn();
      const { idToken } = response;
      authenticate(idToken, (result, error) => {
          if (result) {
              console.log('authentication successful');
          }
          if (error) {
              console.error('authentication error:', error);
          }
      });
  } catch (error) {
      console.log("Something went wrong. Please try again");
  }
  }
  

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignInUsingOkto}
      />
    </View>
  );
};

export default OAuth;
