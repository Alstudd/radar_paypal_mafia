import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
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

const Profile = () => {
  const { user: clerkUser, isSignedIn: isClerkSignedIn } = useUser();
  const { colorScheme } = useColorScheme();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

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
        const { data } = await fetchAPI("/(api)/user");

        let user;
        if (isClerkSignedIn) {
          user = data.find(
            (user: any) =>
              user.email === clerkUser?.primaryEmailAddress?.emailAddress
          );
        } else if (userDetails) {
          user = data.find((user: any) => user.email === userDetails?.email);
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
      <View className="mt-20">
        {loading ? (
          <View className="flex items-center justify-center h-full">
            <ActivityIndicator size="large" color="#4646fc" />
          </View>
        ) : fetchError ? (
          <Text className="text-red-500 text-center">{fetchError}</Text>
        ) : (
          <ScrollView
            className="px-5"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Text
              className={`text-2xl font-JakartaBold my-5 ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              My profile
            </Text>

            <View className="flex items-center justify-center my-5">
              {userData?.photo ? (
                <Image
                  source={{
                    uri: userData?.photo,
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

            <View
              className={`flex flex-col items-start justify-center ${
                colorScheme === "dark"
                  ? "shadow-none"
                  : "shadow-sm shadow-neutral-300 bg-white"
              } rounded-lg px-5 py-3`}
            >
              <View className="flex flex-col items-start justify-start w-full">
                <InputField
                  label="First name"
                  placeholder={userData?.firstname || "Not Found"}
                  containerStyle="w-full"
                  inputStyle="p-3.5"
                  editable={false}
                />

                <InputField
                  label="Last name"
                  placeholder={userData?.lastname || "Not Found"}
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
    </SafeAreaView>
  );
};

export default Profile;
