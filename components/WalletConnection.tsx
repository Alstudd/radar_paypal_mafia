import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { icons } from "@/constants";

import {
  transact,
  Web3MobileWallet,
} from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GoogleSignin,
  type ConfigureParams,
} from "@react-native-google-signin/google-signin";
import {
  Network,
  OktoContextType,
  Portfolio,
  Token,
  useOkto,
} from "okto-sdk-react-native";
import { useColorScheme } from "nativewind";

const webClientId =
  "328551301503-nq398rv0ff8nrubpu8l71avde3c0h78e.apps.googleusercontent.com";

const WalletConnection = () => {
  const { colorScheme } = useColorScheme();
  const { signOut } = useAuth();
  const { showWidgetSheet, setTheme, authenticate, getPortfolio } =
    useOkto() as OktoContextType;
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  setTheme({
    textPrimaryColor: colorScheme === "dark" ? "0xFFFFFFFF" : "0xFF616161",
    textSecondaryColor: colorScheme === "dark" ? "0xFFFFFFFF" : "0xFF616161",
    textTertiaryColor: colorScheme === "dark" ? "0xFFFFFFFF" : "0xFF616161",
    accent1Color: "0x80433454",
    accent2Color: "0x80905BF5",
    strokeBorderColor: "0xFFACACAB",
    strokeDividerColor: "0x4DA8A8A8",
    surfaceColor: "0xFF1F0A2F",
    backgroundColor: colorScheme === "dark" ? "0xFF000000" : "0xFFFFFFFF",
  });

  const fetchPortfolio = async () => {
    try {
      const result: any = await getPortfolio();
      setPortfolio(result);
      console.log("Portfolio fetched:", result);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
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
          fetchPortfolio();
        }, 3000);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  React.useEffect(() => {
    const user = GoogleSignin.getCurrentUser();
    if (user) {
      fetchPortfolio();
    }
  }, []);

  return (
    <View>
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

export default WalletConnection;

const styles = StyleSheet.create({});
