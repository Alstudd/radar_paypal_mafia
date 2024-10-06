import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
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
import InputField from "./InputField";

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
    transferTokens,
  } = useOkto() as OktoContextType;

  const [portfolio, setPortfolio] = useState<PortfolioData>({
    total: 0,
    tokens: [] as Portfolio[],
  });
  const [networks, setNetworks] = useState<Network[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const [networkName, setNetworkName] = useState("SOLANA_DEVNET");
  const [tokenAddress, setTokenAddress] = useState("");
  const [quantity, setQuantity] = useState("0.1");
  const [recipientAddress, setRecipientAddress] = useState(
    "8TbEbss9hqzEceq52gceMr7cqGVKwRrXqKQegYb4CNkr"
  );

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
      setNetworks(result.network);
      console.log("Supported Networks fetched:", result);
    } catch (error) {
      console.error("Error fetching supported networks:", error);
    }
  };

  const fetchSupportedTokens = async () => {
    try {
      const result: any = await getSupportedTokens();
      setTokens(result.tokens);
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

  const handleGoogleSignInUsingOkto = async () => {
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
  };

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

  const handleSubmitTransferTokens = () => {
    transferTokens({
      network_name: networkName,
      token_address: tokenAddress,
      recipient_address: recipientAddress,
      quantity: quantity,
    })
      .then((result) => {
        console.log("Transfer success", result);
        router.push(`/(root)/orderDetails/${result.orderId}`);
      })
      .catch((error) => {
        console.log("Transfer error", error);
      });
  };

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
            className="w-5 h-5 mx-2 mt-1"
          />
        )}
      />
      {portfolio.tokens.length > 0 && (
        <View className="mt-6">
          {portfolio.total > 0 && (
            <View>
              <Text
                className={`font-JakartaSemiBold text-[22px] ${
                  colorScheme === "dark" ? "text-white" : "text-[#02050A]"
                }`}
              >
                Your Okto Portfolio
              </Text>
              <PortfolioCard portfolio={portfolio} />
            </View>
          )}
          <Text
            className={`font-JakartaSemiBold text-[22px] my-2 ${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            }`}
          >
            Transfer Tokens
          </Text>

          {/* Picker for Network Name */}
          <Text className="font-JakartaSemiBold text-[16px]">Network Name</Text>
          <Picker
            selectedValue={networkName}
            onValueChange={(itemValue: any) => setNetworkName(itemValue)}
          >
            {networks.map((network) => (
              <Picker.Item
                key={network.network_name}
                label={network.network_name}
                value={network.network_name}
              />
            ))}
          </Picker>

          {/* Picker for Token Address */}
          <Text className="font-JakartaSemiBold text-[16px]">
            Token Address
          </Text>
          <Picker
            selectedValue={tokenAddress}
            onValueChange={(itemValue: any) => {
              setTokenAddress(itemValue);
            }}
          >
            {tokens.map((token) => (
              <Picker.Item
                key={token.token_address}
                label={token.token_name}
                value={token.token_address}
              />
            ))}
          </Picker>

          <InputField
            label="Quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={setQuantity}
            useExpoVectorIcons={true}
            icon="person-outline"
          />
          <InputField
            label="Recipient Address"
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChangeText={setRecipientAddress}
            useExpoVectorIcons={true}
            icon="person-outline"
          />
          <CustomButton
            className="mx-auto mt-5"
            title="Transfer Tokens"
            onPress={handleSubmitTransferTokens}
            IconLeft={() => (
              <Image
                source={icons.chevronRight}
                resizeMode="contain"
                className="w-5 h-5"
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default WalletConnection;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
