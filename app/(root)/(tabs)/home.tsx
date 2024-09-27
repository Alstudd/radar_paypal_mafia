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

export const APP_IDENTITY = {
  name: "Radar - Paypal Mafia",
  uri: "http://localhost:3000",
  icon: "favicon.ico",
};

const home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const connect = async () => {
    const authorizationResult = await transact(
      async (wallet: Web3MobileWallet) => {
        const authorizationResult = await wallet.authorize({
          chain: "solana:devnet",
          identity: APP_IDENTITY,
        });
        return authorizationResult;
      }
    );

    console.log("Connected to: " + authorizationResult.accounts[0].address);
  };

  return (
    <View className="mx-5">
      <View className="flex flex-row items-center justify-between my-5">
        <Text className="text-2xl font-JakartaBold">
          Welcome {user?.firstName}👋
        </Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className="justify-center items-center w-10 h-10 rounded-full bg-white"
        >
          <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity>
      </View>
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
  );
};

export default home;

const styles = StyleSheet.create({});
