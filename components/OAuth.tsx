import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import {
  GoogleSignin,
  type ConfigureParams,
} from "@react-native-google-signin/google-signin";
import { useOkto, Wallet, type OktoContextType } from "okto-sdk-react-native";
import { fetchAPI } from "@/lib/fetch";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { webClientId } from "@/constants";

const OAuth = ({ title }: { title: string }) => {
  const { colorScheme } = useColorScheme();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  const { authenticate, createWallet } = useOkto() as OktoContextType;
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const makeWallet = async () => {
    // try {
    //   const result: any = await createWallet();
    //   console.log("Wallets created:", result);
    // } catch (error) {
    //   console.error("Error making wallets:", error);
    // }
    createWallet()
      .then((result) => {
        console.log("Wallets created:", result);
      })
      .catch((error) => {
        console.error("Error making wallets:", error);
      });
  };

  async function handleGoogleSignInUsingOkto() {
    try {
      GoogleSignin.configure({
        scopes: ["email", "profile"],
        webClientId,
      });
      await GoogleSignin.hasPlayServices();
      const response: any = await GoogleSignin.signIn();
      if (!response.data) {
        console.log("Google sign-in failed");
        return;
      }

      const { data } = await fetchAPI("/(api)/user");
      const user = data.find(
        (user: any) => user.email === response.data.user.email
      );

      if (!user) {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            fullname: response.data.user.name,
            firstname:
              response.data.user.givenName ||
              response.data.user.name.split(" ")[0],
            lastname:
              response.data.user.familyName ||
              response.data.user.name.split(" ")[1] ||
              null,
            email: response.data.user.email,
            photo: response.data.user.photo,
            clerk_id: `NULL_${response.data.user.email}`,
            google_signin_id: response.data.user.id,
          }),
        });
      } else if (user && user.google_signin_id === `NULL_${user.email}`) {
        try {
          const res = await fetchAPI("/(api)/user", {
            method: "PUT",
            body: JSON.stringify({
              fullname: response.data.user.name,
              firstname:
                response.data.user.givenName ||
                response.data.user.name.split(" ")[0],
              lastname:
                response.data.user.familyName ||
                response.data.user.name.split(" ")[1] ||
                null,
              email: response.data.user.email,
              photo: response.data.user.photo,
              clerk_id: user.clerk_id,
              google_signin_id: response.data.user.id,
            }),
          });
          console.log(res);
          console.log("User updated successfully");
        } catch (error) {
          console.error("Error creating user:", error);
          return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
        }
      }

      const { idToken } = response.data;
      authenticate(idToken, (result, error) => {
        if (result) {
          makeWallet();
          makeWallet();
          console.log("authentication successful");
          Alert.alert(
            "Success",
            "You have successfully signed in with Google and authenticated with Okto"
          );
          router.replace("/");
        }
        if (error) {
          console.error("authentication error:", error);
        }
      });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong. Please try again");
    }
  }

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text
          className={`text-lg font-JakartaSemiBold ${
            colorScheme === "dark" ? "text-white" : "text-[#02050A]"
          }`}
        >
          Or
        </Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title={`${title} with Google`}
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2 mt-1"
          />
        )}
        bgVariant="outline"
        textVariant={colorScheme === "dark" ? "default" : "primary"}
        onPress={handleGoogleSignInUsingOkto}
      />
    </View>
  );
};

export default OAuth;
