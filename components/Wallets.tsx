import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Clipboard from "@react-native-clipboard/clipboard";

export default function Wallets({ wallets, setOpen }: any) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

  const copyToClipboard = (address: string) => {
    Clipboard.setString(address);
    setCopiedWallet(address);
    setTimeout(() => setCopiedWallet(null), 2000); // Hide "Copied!" after 2 seconds
  };

  const renderWallet = ({ item }: any) => (
    <Animated.View
      entering={FadeIn.duration(600)}
      exiting={FadeOut.duration(600)}
      style={styles.walletContainer}
    >
      <LinearGradient
        colors={isDark ? ["#1f1f3d", "#3b3b98"] : ["#4646fc", "#6e8efb"]}
        style={styles.gradient}
      >
        <View className="p-4 flex-row justify-between items-center">
          <View>
            <Text
              className="font-JakartaBold text-[16px]"
              style={[
                styles.networkName,
                styles.textWhite,
                // isDark ? styles.textWhite : styles.textDark,
              ]}
            >
              {item.network_name}
            </Text>
            <Text
              numberOfLines={1}
              className="truncate w-[200px] font-Jakarta"
              style={styles.walletAddress}
            >
              {item.address}
            </Text>
          </View>
          <TouchableOpacity onPress={() => copyToClipboard(item.address)}>
            <Icon name="wallet-outline" size={36} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <View style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <View className="absolute top-0 right-0 left-0 flex flex-row justify-between items-center mx-9 mt-4">
        <View className="flex-row items-center gap-2">
          <Icon name="wallet-outline" size={40} color={"#4646fc"} />
          <Text
            className="font-JakartaBold text-[18px]"
            style={[isDark ? styles.textWhite : styles.textDark]}
          >
            Okto Wallets
          </Text>
        </View>
        <View className="flex flex-row gap-3 items-center">
          <View>
            <ThemeSwitcher />
          </View>
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={styles.closeButton}
          >
            <Icon name="close-sharp" size={36} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        className="mt-20"
        data={wallets}
        renderItem={renderWallet}
        keyExtractor={(item) => item.address}
        contentContainerStyle={styles.walletList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bgDark: {
    backgroundColor: "#02050A",
  },
  bgLight: {
    backgroundColor: "#fff",
  },
  textWhite: {
    color: "#fff",
  },
  textDark: {
    color: "#02050A",
  },
  closeButton: {
    backgroundColor: "#FF5E5E",
    borderRadius: 30,
    padding: 4,
  },
  walletList: {
    paddingTop: 16,
  },
  walletContainer: {
    marginBottom: 16,
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
