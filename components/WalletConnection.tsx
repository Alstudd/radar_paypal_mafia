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
import { useAuth, useUser } from "@clerk/clerk-expo";
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
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { fetchAPI } from "@/lib/fetch";

const webClientId =
  "328551301503-nq398rv0ff8nrubpu8l71avde3c0h78e.apps.googleusercontent.com";

const WalletConnection = () => {
  const { colorScheme } = useColorScheme();
  const { signOut } = useAuth();
  const clerkUser: any = useUser();
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
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]); // New state for filtered tokens
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const [networkName, setNetworkName] = useState("SOLANA_DEVNET");
  const [token, setToken] = useState<any>({
    network_name: "SOLANA_DEVNET",
    token_address: "",
    token_name: "SOL_DEVNET",
  });
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
      //   filterTokensByNetwork(networkName);
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

  const filterTokensByNetwork = (network: string) => {
    const filtered = tokens.filter((token) => token.network_name === network);
    setFilteredTokens(filtered);
    setToken(filtered[0]);
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

      const { data } = await fetchAPI("/(api)/user");
      const user = data.find(
        (user: any) => user.email === response.data.user.email
      );

      if (!user) {
        try {
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
          console.log("User created successfully");
        } catch (error) {
          console.error("Error creating user:", error);
        }
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

  React.useEffect(() => {
    filterTokensByNetwork(networkName);
  }, [networkName, tokens]);

  const handleSubmitTransferTokens = () => {
    transferTokens({
      network_name: networkName,
      token_address: token.token_address,
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
        IconLeft={() =>
          GoogleSignin.getCurrentUser() ? (
            <Image
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAe1BMVEVHcExaffVaV/JYWPFhR/ReTfNYfPVYePRYX/JaU/JLTvCZmfGzwPausPRwc/BXV/HIzvf////d4/pVXvDx8/x7ie9QY+5Qbe+SqPNSe/FSefE3bu54nvJShPJDgvJSkPRUofZTk/NUmfRUofZVqvdVsPhVrvhVsPhVtPgMivcQAAAAKXRSTlMAHYu/5P9FMGT+/v7+/v7////////+/v/+uv7+/v/+/5Su/v9zvf/x2M1XqKwAAAEVSURBVHgBbYyHFoMgDADjVooT9+7u/39hQ9B0ngO4ewEYy3Zcz3Md24dvfAyM/dkc75MAGIslE75aRA+DB67RjieE4L1PzdmOIjpIGSecAQlSg8hyokiEEbYeTFOFW1XmOwdhFEZFCG5IlZILITRNbr7Um1iQdMBWqla1yDeyWv8SdKquwak1Vf5BJtBxPHzGYo8NUrdfsW400NGC18rs7dot2r2maYemyJmxIQthTww4V4y9aeVArgOYiLksxqEt8UY92JMLAbqtziNqOQ9l3s5GAUCwENPUYlokXj4bswJypO3ptKAc5WleTiYCcfqLb6J1Pp9P9LyW8wWA6yfciOvtg3sA7/iPt8ZjjHW5PnDmsfqsnl/EMWq89M3aAAAAAElFTkSuQmCC",
              }}
              resizeMode="contain"
              className="w-6 h-6 mx-2 mt-1"
            />
          ) : (
            <View className="mx-2 mt-1">
              <Entypo name="wallet" size={20} color="#fff" />
            </View>
          )
        }
      />
      <View className="mt-6">
        <View>
          <Text
            className={`font-JakartaSemiBold text-[22px] ${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            }`}
          >
            Your Okto Portfolio
          </Text>
          <PortfolioCard portfolio={portfolio} wallets={wallets} />
        </View>
        {portfolio.tokens.length > 0 && (
          <>
            <Text
              className={`font-JakartaSemiBold text-[22px] my-2 ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Transfer Tokens
            </Text>

            <Text
              className={`font-JakartaSemiBold text-[16px] my-4 ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Network Name
            </Text>
            <View
              className={`rounded-full border border-neutral-100 focus:border-[#536dfe] py-[3px] ${
                colorScheme === "dark" ? "bg-[#02050A]" : "bg-neutral-100"
              }`}
            >
              <Picker
                dropdownIconColor={colorScheme === "dark" ? "#fff" : "#02050A"}
                style={{ color: colorScheme === "dark" ? "#fff" : "#02050A" }}
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
            </View>

            <Text
              className={`font-JakartaSemiBold text-[16px] my-4 ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Token Address
            </Text>
            <View
              className={`rounded-full border border-neutral-100 focus:border-[#536dfe] py-[3px] ${
                colorScheme === "dark" ? "bg-[#02050A]" : "bg-neutral-100"
              }`}
            >
              <Picker
                dropdownIconColor={colorScheme === "dark" ? "#fff" : "#02050A"}
                style={{ color: colorScheme === "dark" ? "#fff" : "#02050A" }}
                selectedValue={token}
                onValueChange={(itemValue: any) => {
                  setToken(itemValue);
                }}
              >
                {filteredTokens.map((token, index) => (
                  <Picker.Item
                    key={index}
                    label={token.token_name}
                    value={token}
                  />
                ))}
              </Picker>
            </View>

            <Text
              className={`font-JakartaSemiBold text-[16px] mt-4 mb-2 ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Quantity
            </Text>
            <InputField
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              placeholder="Enter quantity"
              keyboardType="numeric"
            />

            <Text
              className={`font-JakartaSemiBold text-[16px] mt-4 mb-2 ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              Recipient Address
            </Text>
            <InputField
              value={recipientAddress}
              onChangeText={(text) => setRecipientAddress(text)}
              placeholder="Enter recipient address"
            />

            <CustomButton
              title="Transfer Tokens"
              onPress={handleSubmitTransferTokens}
              className="mt-4"
              IconLeft={() => (
                <View className="mr-2 mt-1">
                  <FontAwesome6
                    name="money-bill-transfer"
                    size={20}
                    color="#fff"
                  />
                </View>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default WalletConnection;
