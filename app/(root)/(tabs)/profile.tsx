import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import InputField from "@/components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useOkto,
  type OktoContextType,
  type User,
} from "okto-sdk-react-native";
import React, { useState } from "react";

const Profile = () => {
  const { user } = useUser();

  const { getUserDetails } = useOkto() as OktoContextType;
  const [userDetails, setUserDetails] = useState<User | null>(null);

  React.useEffect(() => {
    getUserDetails()
      .then((result) => {
        setUserDetails(result);
      })
      .catch((error) => {
        console.error(`error:`, error);
      });
  }, []);

  console.log(userDetails);

  return (
    <SafeAreaView>
      <View className="mt-20">
        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

          <View className="flex items-center justify-center my-5">
            <Image
              source={{
                uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
              }}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
          </View>

          <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
            <View className="flex flex-col items-start justify-start w-full">
              <InputField
                label="First name"
                placeholder={user?.firstName || "Not Found"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Last name"
                placeholder={user?.lastName || "Not Found"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Email"
                placeholder={
                  user?.primaryEmailAddress?.emailAddress || userDetails?.email || "Not Found"
                }
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Phone"
                placeholder={
                  user?.primaryPhoneNumber?.phoneNumber || "Not Found"
                }
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
