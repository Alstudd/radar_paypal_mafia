import "react-native-get-random-values";
import { View, Image, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import base58 from "bs58";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { Entypo } from "@expo/vector-icons";

interface SolanaWalletProps {
  connected: boolean;
  walletAddress: string;
  setConnected: (connected: boolean) => void;
  setWalletAddress: (walletAddress: string) => void;
}

const useUniversalLinks = false;

const buildUrl = (path: string, params: URLSearchParams) =>
  `${
    useUniversalLinks ? "https://phantom.app/ul/" : "phantom://"
  }v1/${path}?${params.toString()}`;

export default function SolanaWallet({
  connected,
  walletAddress,
  setConnected,
  setWalletAddress,
}: SolanaWalletProps) {
  const [dappKeyPair] = useState(nacl.box.keyPair());

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
    const handleDeepLink = ({ url }: { url: string }) => {
      try {
        console.log("Received URL:", url);

        const eventUrl = new URL(url);
        const params = eventUrl.searchParams;

        console.log(
          "phantom_encryption_public_key:",
          params.get("phantom_encryption_public_key")
        );
        console.log("data:", params.get("data"));
        console.log("nonce:", params.get("nonce"));

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
          console.log("Wallet Address:", address.toBase58());
          setWalletAddress(address.toBase58());
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

  const truncateAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <CustomButton
      title={
        connected ? truncateAddress(walletAddress) : "Connect Phantom Wallet"
      }
      disabled={connected}
      onPress={async () => {
        const params = new URLSearchParams({
          dapp_encryption_public_key: base58.encode(dappKeyPair.publicKey),
          cluster: "mainnet-beta",
          app_url: "https://phantom.app",
          redirect_link: "myapp://(root)/userFlashcardForm", // Change to antiMatrix here and app.config.js
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
  );
}
