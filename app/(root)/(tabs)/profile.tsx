import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useOkto,
  type OktoContextType,
  type User,
} from "okto-sdk-react-native";
import React, { useState } from "react";
import { fetchAPI } from "@/lib/fetch";
import { icons } from "@/constants";
import { useColorScheme } from "nativewind";

interface UserData {
  fullname: string;
  firstname: string;
  lastname: string;
  email: string;
  photo: string;
  user_id: string;
}

const Profile = () => {
  const { colorScheme } = useColorScheme();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { getUserDetails } = useOkto() as OktoContextType;

  React.useEffect(() => {
    getUserDetails()
      .then((result) => {
        setUserDetails(result);
      })
      .catch((error) => {
        console.error(`error:`, error);
      });
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchAPI("/(api)/user");
      const user = data.find((user: any) => user.email === userDetails?.email);
      setUserData(user);
      setLoading(false);
    };
    fetchData();
  }, [userDetails]);

  return (
    <SafeAreaView className={`${colorScheme === 'dark' ? 'bg-[#02050A]' : 'bg-white'} h-full`}>
      <View className="mt-20">
        {loading ? (
          <View className="flex items-center justify-center h-full">
            <ActivityIndicator size="large" color="#4646fc" />
          </View>
        ) : (
          <ScrollView
            className="px-5"
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Text className={`text-2xl font-JakartaBold my-5 ${colorScheme === 'dark' ? 'text-white' : 'text-[#02050A]'}`}>My profile</Text>

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

            <View className={`flex flex-col items-start justify-center ${colorScheme === 'dark' ? 'shadow-none' : 'shadow-sm shadow-neutral-300 bg-white'} rounded-lg px-5 py-3`}>
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
