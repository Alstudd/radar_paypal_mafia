import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons"; // Icons for sun/moon

const THEME_DURATION = 500;

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Shared value to animate the switch position
  const progress = useSharedValue(colorScheme === "dark" ? 1 : 0);

  // Update the animation when the theme changes
  React.useEffect(() => {
    progress.value = withTiming(colorScheme === "dark" ? 1 : 0, {
      duration: THEME_DURATION,
    });
  }, [colorScheme]);

  // Animate the switch background color
  const animatedBgStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#4646fc", "#1E1E1E"] // Light (sunny) to Dark (dark gray) transition
    );
    return {
      backgroundColor,
    };
  });

  // Animate the switch's button (sun/moon)
  const animatedSwitchStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(progress.value * 24, {
            duration: THEME_DURATION,
          }),
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback onPress={toggleColorScheme}>
      <Animated.View style={[styles.container, animatedBgStyle]}>
        {/* Sun/Moon Icon Switch */}
        <Animated.View style={[styles.switch, animatedSwitchStyle]}>
          {colorScheme === "dark" ? (
            <Ionicons name="moon" size={20} color="#1E1E1E" />
          ) : (
            <Ionicons name="sunny" size={20} color="#4646fc" />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 30,
    borderRadius: 30,
    padding: 4,
    justifyContent: "center",
  },
  switch: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThemeSwitcher;
