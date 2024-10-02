import { View, Text } from "react-native";
import React from "react";
import UserFlashcardForm from "@/components/UserFlashcardForm";

const userFlashcardForm = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center m-4">
        <UserFlashcardForm />
      </View>
    </View>
  );
};

export default userFlashcardForm;
