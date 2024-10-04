import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const home = () => {
  const { colorScheme } = useColorScheme();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { logOut, showWidgetSheet, closeBottomSheet } = useOkto() as OktoContextType;

  GoogleSignin.configure({});

  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log("Google sign-out successful");

      await logOut();
      console.log("Okto sign-out successful");

      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

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

  const connect = () => {
    showWidgetSheet();
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
