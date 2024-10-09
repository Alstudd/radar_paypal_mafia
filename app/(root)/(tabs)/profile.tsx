import { useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useOkto,
  type OktoContextType,
  type User,
} from "okto-sdk-react-native";
import React, { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/fetch";
import { icons } from "@/constants";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserFlashcard from "@/components/UserFlashcard";
import Icon from "@expo/vector-icons/Ionicons";
import WalletConnection from "@/components/WalletConnection";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { StatusBar } from "expo-status-bar";
import SolanaWallet from "@/components/SolanaWallet";

const Profile = () => {
  const { user: clerkUser, isSignedIn: isClerkSignedIn } = useUser();
  const { colorScheme } = useColorScheme();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [flashcardOpen, setFlashcardOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  const { getUserDetails } = useOkto() as OktoContextType;

  useEffect(() => {
    if (!isClerkSignedIn) {
      getUserDetails()
        .then((result: User) => {
          setUserDetails(result);
        })
        .catch((error) => {
          console.error("Error fetching Okto user details:", error);
        });
    }
  }, [isClerkSignedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/(api)/profile", {
          method: "GET",
        });
        const { data } = await response.json();

        let user;
        if (isClerkSignedIn) {
          user = data.find(
            (user: any) =>
              user.email === clerkUser?.primaryEmailAddress?.emailAddress
          );
        } else if (userDetails) {
          user = data.find((user: any) => user.email === userDetails?.email);
        }

        if (user) {
          setWalletAddress(user?.walletaddress);
          if (user.walletaddress) {
            setConnected(true);
          }
        }

        setUserData(user || null);
        setLoading(false);
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFetchError("Failed to load user data.");
        setLoading(false);
      }
    };

    if (isClerkSignedIn || userDetails) {
      fetchData();
    }
  }, [isClerkSignedIn, clerkUser, userDetails]);

  return (
    <SafeAreaView
      className={`${
        colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
      } h-full`}
    >
      <StatusBar
        backgroundColor={colorScheme == "dark" ? "black" : "white"}
        style={colorScheme == "dark" ? "light" : "dark"}
      />
      <View className="mt-20">
        {loading ? (
          <View className="flex items-center justify-center h-full">
            <ActivityIndicator size="large" color="#4646fc" />
          </View>
        ) : fetchError ? (
          <Text className="text-red-500 text-center">{fetchError}</Text>
        ) : (
          <ScrollView
            className="px-5 py-1"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Text
              className={`text-2xl font-JakartaBold ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              My profile
            </Text>

            <View className="flex items-center justify-center my-5">
              {userData?.profilepicture ? (
                <Image
                  source={{
                    uri: userData?.profilepicture,
                  }}
                  style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                  className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
                />
              ) : (
                <Image
                  source={icons.profile}
                  style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                  className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => setFlashcardOpen(true)}
              style={styles.actionButton}
              className="mx-5"
            >
              <View className="mt-1">
                <Ionicons name="card-outline" size={16} color="#fff" />
              </View>
              <Text className="font-JakartaBold" style={styles.actionText}>
                User Flashcard
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWalletOpen(true)}
              style={styles.actionButton}
              className="mx-5 mt-4"
            >
              <View className="mt-1">
                <Ionicons name="wallet-outline" size={16} color="#fff" />
              </View>
              <Text className="font-JakartaBold" style={styles.actionText}>
                Your Wallets
              </Text>
            </TouchableOpacity>

            <View
              className={`flex flex-col items-start justify-center ${
                colorScheme === "dark"
                  ? "shadow-none"
                  : "shadow-sm shadow-neutral-300 bg-white"
              } rounded-lg px-5 py-2`}
            >
              <View className="flex flex-col items-start justify-start w-full">
                <InputField
                  label="Name"
                  placeholder={userData?.name || "Not Found"}
                  containerStyle="w-full"
                  inputStyle="p-3.5"
                  editable={false}
                />

                <InputField
                  label="Email"
                  placeholder={userData?.email || "Not Found"}
                  containerStyle="w-full"
                  inputStyle="p-3.5"
                  editable={false}
                />
                {/* <InputField
                  label="Phone"
                  placeholder={"Not Found"}
                  containerStyle="w-full"
                  inputStyle="p-3.5"
                  editable={false}
                /> */}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={flashcardOpen}
        onRequestClose={() => setFlashcardOpen(false)}
      >
        <View
          className={`flex-1 ${
            colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
          }`}
        >
          <View className="absolute top-0 right-0 left-0 flex flex-row justify-between items-center mx-9 mt-4">
            <View className="flex-row items-center gap-2">
              <Icon
                name="card-outline"
                size={40}
                color={colorScheme === "dark" ? "#fff" : "#02050A"}
              />
              <Text
                className="font-JakartaBold text-[18px]"
                style={[
                  colorScheme === "dark" ? styles.textWhite : styles.textDark,
                ]}
              >
                User Flashcard
              </Text>
            </View>
            <View className="flex flex-row gap-3 items-center">
              <View>
                <ThemeSwitcher />
              </View>
              <TouchableOpacity
                onPress={() => setFlashcardOpen(false)}
                style={styles.closeButton}
              >
                <Icon name="close-sharp" size={36} color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-1 justify-center items-center mx-4 mt-10">
            <UserFlashcard user={userData} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={walletOpen}
        onRequestClose={() => setWalletOpen(false)}
      >
        <View
          className={`flex-1 ${
            colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
          }`}
        >
          <View
            className={`z-10 absolute top-0 right-0 left-0 ${
              colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
            }`}
          >
            <View className="mx-9 my-4 flex flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <Icon
                  name="card-outline"
                  size={40}
                  color={colorScheme === "dark" ? "#fff" : "#02050A"}
                />
                <Text
                  className="font-JakartaBold text-[18px]"
                  style={[
                    colorScheme === "dark" ? styles.textWhite : styles.textDark,
                  ]}
                >
                  Wallet
                </Text>
              </View>
              <View className="flex flex-row gap-3 items-center">
                <View>
                  <ThemeSwitcher />
                </View>
                <TouchableOpacity
                  onPress={() => setWalletOpen(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close-sharp" size={36} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView className="flex-1">
            <View className="mx-10 mt-20 mb-10">
              <SolanaWallet
                connected={connected}
                walletAddress={walletAddress}
                setConnected={setConnected}
                setWalletAddress={setWalletAddress}
                balance={balance}
                setBalance={setBalance}
                redirectUrl="(root)/(tabs)/profile"
                updateWalletAddress={true}
                clerkId={userData?.clerk_id}
                googleSignInId={userData?.google_signin_id}
              />
              <WalletConnection />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4646fc",
    padding: 12,
    borderRadius: 25,
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
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
});
