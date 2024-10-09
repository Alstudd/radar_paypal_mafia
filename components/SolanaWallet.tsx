import "react-native-get-random-values";
import {
  View,
  Image,
  TouchableOpacity,
  Linking,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import base58 from "bs58";
import nacl from "tweetnacl";
import { Connection, PublicKey } from "@solana/web3.js";
import CustomButton from "./CustomButton";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "@expo/vector-icons/Ionicons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Clipboard from "@react-native-clipboard/clipboard";
import axios from "axios";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface SolanaWalletProps {
  connected: boolean;
  walletAddress: string;
  setConnected: (connected: boolean) => void;
  setWalletAddress: (walletAddress: string) => void;
  balance: number | null;
  setBalance: (balance: number | null) => void;
  redirectUrl?: string;
  updateWalletAddress?: boolean;
  clerkId?: string;
  googleSignInId?: string;
}

const useUniversalLinks = false;
const devnetEndpoint = "https://api.devnet.solana.com";

const buildUrl = (path: string, params: URLSearchParams) =>
  `${
    useUniversalLinks ? "https://phantom.app/ul/" : "phantom://"
  }v1/${path}?${params.toString()}`;

const truncateAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

export default function SolanaWallet({
  connected,
  walletAddress,
  setConnected,
  setWalletAddress,
  balance,
  setBalance,
  redirectUrl,
  updateWalletAddress,
  clerkId,
  googleSignInId,
}: SolanaWalletProps) {
  const { colorScheme } = useColorScheme();
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const { isinvestor } = useGlobalContext();

  const connection = new Connection(devnetEndpoint, "confirmed");

  const updateWalletAddressInDatabase = async (
    address: string,
    clerkId: string | undefined,
    googleSignInId: string | undefined
    // balance: number | null
  ) => {
    try {
      // if (balance === null) {
      //   console.error("Balance is not available yet");
      //   return;
      // }
      const response = await fetch("/(api)/walletaddress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletaddress: address,
          clerk_id: clerkId,
          google_signin_id: googleSignInId,
          // balance: balance,
        }),
      });

      const data = await response.json();
      console.log("Wallet address updated successfully", data);
    } catch (error) {
      console.error("Failed to update wallet address", error);
    }
  };

  const decryptPayload = (
    data: string,
    nonce: string,
    sharedSecret?: Uint8Array
  ) => {
    try {
      if (!sharedSecret) throw new Error("missing shared secret");

      const decryptedData = nacl.box.open.after(
        base58.decode(data),
        base58.decode(nonce),
        sharedSecret
      );

      if (!decryptedData) {
        throw new Error("Unable to decrypt data");
      }
      return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      try {
        console.log("Received URL:", url);

        const eventUrl = new URL(url);
        const params = eventUrl.searchParams;

        const phantomEncryptionPublicKey = params.get(
          "phantom_encryption_public_key"
        );
        const data = params.get("data");
        const nonce = params.get("nonce");

        if (!phantomEncryptionPublicKey || !data || !nonce) {
          console.error("Missing one or more required URL parameters");
          return;
        }

        const sharedSecretDapp = nacl.box.before(
          base58.decode(phantomEncryptionPublicKey),
          dappKeyPair.secretKey
        );

        const connectData = decryptPayload(data, nonce, sharedSecretDapp);

        if (connectData && connectData.public_key) {
          const address = new PublicKey(connectData.public_key);
          const balanceInLamports = await connection.getBalance(address);
          const balanceInSol = balanceInLamports / 1e9;
          if (balanceInSol < 1 && isinvestor) {
            Alert.alert(
              "Insufficient Balance",
              `You are an investor. Please add more SOL to your wallet (${truncateAddress(
                address.toBase58()
              )}) to continue. Minimum balance: 1 SOL`
            );
            return;
            // setisinvestor(false);
          }
          // setBalance(balanceInSol);
          // if (balanceInSol >= 1) {
          //   setisinvestor(true);
          // } else {
          //   setisinvestor(false);
          // }
          console.log("Wallet Address:", address.toBase58());
          setWalletAddress(address.toBase58());
          if (updateWalletAddress) {
            updateWalletAddressInDatabase(
              address.toBase58(),
              clerkId,
              googleSignInId
              // balanceInSol
            );
          }
          setConnected(true);
        } else {
          console.error("Decryption failed or public key is missing");
        }
      } catch (error) {
        console.error("Error handling deep link:", error);
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [dappKeyPair]);

  useEffect(() => {
    if (walletAddress) {
      const address = new PublicKey(walletAddress);
      connection.getBalance(address).then((balance) => {
        setBalance(balance / 10 ** 9);
      });
    }
  }, [walletAddress]);

  return (
    <View>
      <CustomButton
        title={
          connected ? truncateAddress(walletAddress) : "Connect Phantom Wallet"
        }
        // disabled={connected}
        onPress={async () => {
          const params = new URLSearchParams({
            dapp_encryption_public_key: base58.encode(dappKeyPair.publicKey),
            cluster: "devnet", // Changed to devnet
            app_url: "https://phantom.app",
            redirect_link: redirectUrl
              ? `antimatrix://${redirectUrl}`
              : "antimatrix://(root)/userFlashcardForm", // Change to antiMatrix
          });
          Linking.openURL(buildUrl("connect", params));
        }}
        className="mt-5"
        IconLeft={() =>
          connected ? (
            <Image
              source={{
                uri: "https://s5-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/073/700/original/1200x1200.png?1712005160",
              }}
              resizeMode="contain"
              className="w-5 h-5 mx-2 mt-1"
            />
          ) : (
            <View className="mx-2 mt-1">
              <Entypo name="wallet" size={20} color="#fff" />
            </View>
          )
        }
      />
      {connected && balance !== null && (
        <View className="mt-2">
          {/* <Text
            className={`font-JakartaSemiBold text-[22px] ${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            }`}
          >
            Your Phantom Portfolio
          </Text> */}
          <PortfolioCard balance={balance} walletAddress={walletAddress} />
        </View>
      )}
    </View>
  );
}

const PortfolioCard = ({ balance, walletAddress }: any) => {
  const { colorScheme } = useColorScheme();
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const copyToClipboard = (address: string) => {
    Clipboard.setString(address);
    setCopiedWallet(address);
    setTimeout(() => setCopiedWallet(null), 2000); // Hide "Copied!" after 2 seconds
  };

  return (
    <View style={{ ...styles.cardContainer }}>
      <LinearGradient
        className="border border-neutral-100 p-[20px] rounded-[20px]"
        colors={
          colorScheme === "dark" ? ["#02050A", "#02050A"] : ["#fff", "#fff"]
        }
      >
        <View style={styles.header}>
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            } font-JakartaExtraBold`}
            style={styles.portfolioValue}
          >
            {balance.toFixed(4)} SOL
          </Text>
          <Text
            className={`${
              colorScheme === "dark" ? "text-[#e0e0e0]" : "text-[#616161]"
            } font-JakartaSemiBold`}
            style={styles.portfolioLabel}
          >
            Phantom Wallet SOL Balance
          </Text>
        </View>

        <Animated.View
          entering={FadeIn.duration(600)}
          // exiting={FadeOut.duration(600)}
          style={styles.walletContainer}
        >
          <LinearGradient
            colors={
              colorScheme === "dark"
                ? ["#1f1f3d", "#3b3b98"]
                : ["#4646fc", "#6e8efb"]
            }
            style={styles.gradient}
          >
            <View className="p-4 flex-row justify-between items-center">
              <View>
                <Text
                  className="font-JakartaBold text-[16px]"
                  style={[
                    styles.networkName,
                    styles.textWhite,
                    // colorScheme === "dark" ? styles.textWhite : styles.textDark,
                  ]}
                >
                  SOLANA_DEVNET
                </Text>
                <Text className="font-Jakarta" style={styles.walletAddress}>
                  {truncateAddress(walletAddress)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard(walletAddress)}>
                <Icon name="wallet-outline" size={36} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    marginBottom: 10,
    alignItems: "center",
  },
  portfolioValue: {
    fontSize: 32,
  },
  portfolioLabel: {
    fontSize: 14,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4646fc",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    marginRight: 5,
  },
  textWhite: {
    color: "#fff",
  },
  textDark: {
    color: "#02050A",
  },
  walletContainer: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: 16,
    padding: 12,
  },
  networkName: {
    marginBottom: 4,
  },
  walletAddress: {
    color: "#d1d1d1",
  },
  copiedText: {
    color: "#00FF00",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "bold",
  },
});
