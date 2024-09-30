import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { onboarding } from "@/constants";
import RecruiterFlashcard from "./RecruiterFlashcard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RecruiterFlashcardWrapper = () => {
  const [actualIndex, setActualIndex] = React.useState(onboarding.length - 1);
  return (
    <GestureHandlerRootView style={styles.gestureHandlerView}>
      <View style={styles.container}>
        {onboarding.map((item, index) => (
          <RecruiterFlashcard
            key={index}
            item={item}
            index={index}
            actualIndex={actualIndex}
            setActualIndex={setActualIndex}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default RecruiterFlashcardWrapper;

const styles = StyleSheet.create({
  gestureHandlerView: {
    flex: 1,
  },
  container: {
    margin: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
