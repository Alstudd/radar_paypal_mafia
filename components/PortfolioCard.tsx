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
import { Ionicons } from "@expo/vector-icons"; // For icons
import { Portfolio, useOkto } from "okto-sdk-react-native";

const PortfolioCard = ({ portfolio }: any) => {
  const { colorScheme } = useColorScheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderTokenItem = ({ item }: any) => (
    <View style={styles.tokenContainer}>
      <Image source={{ uri: item.token_image }} style={styles.tokenLogo} />
      <View style={styles.tokenDetails}>
        <Text style={styles.tokenName}>{item.token_name}</Text>
        <Text numberOfLines={1} className="truncate" style={styles.tokenAmount}>
          {item.token_address}
        </Text>
      </View>
      <View className="flex flex-col">
        <Text style={styles.tokenValue}>{item.amount_in_inr} INR</Text>
        <Text style={styles.tokenValue}>
          {item.quantity} {item.token_name}
        </Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={{ ...styles.cardContainer, opacity: fadeAnim }}>
      <LinearGradient
        colors={colorScheme === "dark" ? ["#333", "#444"] : ["#fff", "#ddd"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardBackground}
      >
        <View style={styles.header}>
          <Text style={styles.portfolioValue}>
            ${portfolio.total.toFixed(2)}
          </Text>
          <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
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
          <Text style={styles.actionText}>View Details</Text>
          <Ionicons name="chevron-forward-outline" size={16} color="#fff" />
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
  cardBackground: {
    borderRadius: 20,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  portfolioLabel: {
    fontSize: 14,
    color: "#bbb",
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
    color: "#fff",
    fontWeight: "500",
  },
  tokenAmount: {
    fontSize: 14,
    color: "#bbb",
  },
  tokenValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#905BF5",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    marginRight: 5,
  },
});

export default PortfolioCard;
