import { View, Text } from "react-native";
import React from "react";
import UserFlashcardForm from "@/components/UserFlashcardForm";
import { useColorScheme } from "nativewind";

const userFlashcardForm = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className={`flex-1 ${colorScheme === 'dark' ? 'bg-[#02050A]' : 'bg-white'}`}>
      <View className="flex-1 justify-center m-4">
        <UserFlashcardForm />
      </View>
    </View>
  );
};

export default userFlashcardForm;
