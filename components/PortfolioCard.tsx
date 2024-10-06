import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import CustomButton from "@/components/CustomButton"; // Your existing custom button
import { Entypo, Ionicons } from "@expo/vector-icons"; // For icons
import { Portfolio, useOkto } from "okto-sdk-react-native";

const PortfolioCard = ({ portfolio }: any) => {
  const { colorScheme } = useColorScheme();

  const renderTokenItem = ({ item }: any) => (
    <View style={styles.tokenContainer}>
      {item.token_image ? (
        <Image source={{ uri: item.token_image }} style={styles.tokenLogo} />
      ) : item.network_name === "SOLANA_DEVNET" ||
        item.network_name === "SOLANA" ? (
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/6001/6001527.png",
          }}
          style={styles.tokenLogo}
        />
      ) : (
        <Entypo name={"wallet"} size={40} color={"#4646fc"} />
      )}
      <View style={styles.tokenDetails}>
        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-[#02050A]"
          } font-JakartaBold`}
          style={styles.tokenName}
        >
          {item.token_name}
        </Text>
        {item.token_address && (
          <Text
            className={`${
              colorScheme === "dark" ? "text-white" : "text-[#02050A]"
            } truncate font-JakartaMedium`}
            numberOfLines={1}
            style={styles.tokenAmount}
          >
            {item.token_address}
          </Text>
        )}
      </View>
      <View className="flex flex-col">
        {/* <Text className={`${colorScheme === "dark" ? "text-white" : "text-[#02050A]"}`} style={styles.tokenValue}>{item.amount_in_inr} INR</Text> */}
        <Text
          className={`${
            colorScheme === "dark" ? "text-white" : "text-[#02050A]"
          } font-JakartaBold`}
          style={styles.tokenValue}
        >
          {item.quantity}{" "}
          <Text
            className={`${
              colorScheme === "dark" ? "text-[#e0e0e0]" : "text-[#616161]"
            } font-JakartaMedium`}
          >
            {item.token_name}
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={{ ...styles.cardContainer }}>
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
            {portfolio.total}
          </Text>
          <Text
            className={`${
              colorScheme === "dark" ? "text-[#e0e0e0]" : "text-[#616161]"
            } font-JakartaSemiBold`}
            style={styles.portfolioLabel}
          >
            Total Number of Tokens
          </Text>
        </View>

        <FlatList
          data={portfolio.tokens}
          renderItem={renderTokenItem}
          keyExtractor={(item) => item.token_address}
          style={styles.tokenList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />

        <TouchableOpacity style={styles.actionButton}>
          <Text className="font-JakartaBold" style={styles.actionText}>
            View Details
          </Text>
          <View className="mt-1">
            <Ionicons name="chevron-forward-outline" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
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
  tokenList: {
    marginVertical: 10,
  },
  tokenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tokenDetails: {
    flex: 1,
    marginLeft: 10,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: "500",
  },
  tokenAmount: {
    fontSize: 14,
  },
  tokenValue: {
    fontSize: 14,
    fontWeight: "600",
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
});

export default PortfolioCard;
