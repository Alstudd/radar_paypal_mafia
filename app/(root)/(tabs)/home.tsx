import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { icons } from "@/constants";

import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { OktoContextType, useOkto } from "okto-sdk-react-native";
import { useColorScheme } from "nativewind";

export const APP_IDENTITY = {
  name: "Radar - Paypal Mafia",
  uri: "http://localhost:3000",
  icon: "favicon.ico",
};

const webClientId =
  "328551301503-nq398rv0ff8nrubpu8l71avde3c0h78e.apps.googleusercontent.com";

const home = () => {
  const { colorScheme } = useColorScheme();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { logOut, showWidgetSheet, setTheme } = useOkto() as OktoContextType;
  setTheme({
    textPrimaryColor: colorScheme === "dark" ? '0xFFFFFFFF': '0xFF616161',
    textSecondaryColor: colorScheme === "dark" ? '0xFFFFFFFF': '0xFF616161',
    textTertiaryColor: colorScheme === "dark" ? '0xFFFFFFFF': '0xFF616161',
    accent1Color: '0x80433454',
    accent2Color: '0x80905BF5',
    strokeBorderColor: '0xFFACACAB',
    strokeDividerColor: '0x4DA8A8A8',
    surfaceColor: '0xFF1F0A2F',
    backgroundColor: colorScheme === "dark" ? '0xFF000000' : '0xFFFFFFFF',
  });

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

  const { authenticate } = useOkto() as OktoContextType;
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

      const { idToken } = response.data;
      authenticate(idToken, (result, error) => {
        if (result) {
          console.log("authentication successful");
          signOut();
          console.log("Clerk sign-out successful");
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

  // const connect = async () => {
  //   const authorizationResult = await transact(
  //     async (wallet: Web3MobileWallet) => {
  //       const authorizationResult = await wallet.authorize({
  //         chain: "solana:devnet",
  //         identity: APP_IDENTITY,
  //       });
  //       return authorizationResult;
  //     }
  //   );

  //   console.log("Connected to: " + authorizationResult.accounts[0].address);
  // };

  const connect = async () => {
    try {
      if (!GoogleSignin.getCurrentUser()) {
        await handleGoogleSignInUsingOkto();
      }
      if (GoogleSignin.getCurrentUser()) {
        setTimeout(() => {
          showWidgetSheet();
        }, 3000);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <SafeAreaView className={`${colorScheme === 'dark' ? 'bg-[#02050A]' : 'bg-white'} h-full`}>
      <View className="mx-5 mt-20">
        {/* <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-2xl font-JakartaBold">
            Welcome {user?.firstName}👋
          </Text>
          <TouchableOpacity
            onPress={handleSignOut}
            className="justify-center items-center w-10 h-10 rounded-full bg-white"
          >
            <Image source={icons.out} className="w-4 h-4" />
          </TouchableOpacity>
        </View> */}
        <CustomButton
          title="Connect Wallet"
          onPress={connect}
          className="mt-5"
          IconLeft={() => (
            <Image
              source={icons.list}
              resizeMode="contain"
              className="w-5 h-5 mx-2"
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
