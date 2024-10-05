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
  PortfolioData,
  Token,
  useOkto,
  Wallet,
} from "okto-sdk-react-native";
import { useColorScheme } from "nativewind";
import PortfolioCard from "./PortfolioCard";

const webClientId =
  "328551301503-nq398rv0ff8nrubpu8l71avde3c0h78e.apps.googleusercontent.com";

const WalletConnection = () => {
  const { colorScheme } = useColorScheme();
  const { signOut } = useAuth();
  const {
    showWidgetSheet,
    setTheme,
    authenticate,
    getPortfolio,
    getSupportedNetworks,
    getSupportedTokens,
    createWallet,
    getWallets,
  } = useOkto() as OktoContextType;
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);

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

  const fetchSupportedNetworks = async () => {
    try {
      const result: any = await getSupportedNetworks();
      setNetworks(result);
      console.log("Supported Networks fetched:", result);
    } catch (error) {
      console.error("Error fetching supported networks:", error);
    }
  };

  const fetchSupportedTokens = async () => {
    try {
      const result: any = await getSupportedTokens();
      setTokens(result);
      console.log("Supported Tokens fetched:", result);
    } catch (error) {
      console.error("Error fetching supported tokens:", error);
    }
  };

  const fetchWallets = async () => {
    try {
      const result: any = await getWallets();
      setWallets(result.wallets);
      console.log("Wallets fetched:", result);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const makeWallet = async () => {
    try {
      const result: any = await createWallet();
      console.log("Wallets created:", result);
    } catch (error) {
      console.error("Error making wallets:", error);
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
          makeWallet();
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
          fetchSupportedNetworks();
          fetchSupportedTokens();
          fetchWallets();
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
      fetchSupportedNetworks();
      fetchSupportedTokens();
      fetchWallets();
    }
  }, []);

  //   const dummyPortfolioData: PortfolioData = {
  //     total: 2532075,
  //     tokens: [
  //       {
  //         token_name: "Bitcoin",
  //         token_image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
  //         token_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  //         network_name: "Bitcoin",
  //         quantity: "0.5",
  //         amount_in_inr: "1500000",
  //       },
  //       {
  //         token_name: "Ethereum",
  //         token_image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
  //         token_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  //         network_name: "Ethereum",
  //         quantity: "2.0",
  //         amount_in_inr: "340075",
  //       },
  //       {
  //         token_name: "Solana",
  //         token_image: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
  //         token_address: "3n21wGM7y3bLL5nrh23DLuBwF9j6g12XeFBw28c91",
  //         network_name: "Solana",
  //         quantity: "50",
  //         amount_in_inr: "100000",
  //       },
  //       {
  //         token_name: "USD Coin",
  //         token_image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025",
  //         token_address: "0xA0b86991c6218b36c1d19d4a2e9Eb0cE3606eb48",
  //         network_name: "Ethereum",
  //         quantity: "5000",
  //         amount_in_inr: "500000",
  //       },
  //       {
  //         token_name: "Polygon",
  //         token_image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
  //         token_address: "0x0000000000000000000000000000000000000000",
  //         network_name: "Polygon",
  //         quantity: "3000",
  //         amount_in_inr: "92000",
  //       },
  //     ],
  //   };

  return (
    <View>
      <CustomButton
        title={
          GoogleSignin.getCurrentUser()
            ? "View Okto Wallet"
            : "Connect Okto Wallet"
        }
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
      {/* <PortfolioCard portfolio={dummyPortfolioData} /> */}
    </View>
  );
};

export default WalletConnection;

const styles = StyleSheet.create({});
