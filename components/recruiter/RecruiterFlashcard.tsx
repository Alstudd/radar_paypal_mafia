import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { onboarding } from "@/constants";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface RecruiterFlashcardProps {
  item: any;
  index: number;
  actualIndex: number;
  setActualIndex: React.Dispatch<React.SetStateAction<number>>;
}

const RecruiterFlashcard = ({
  item,
  index,
  actualIndex,
  setActualIndex,
}: RecruiterFlashcardProps) => {
  const position = useSharedValue({ x: 0, y: 0 });
  const lastOffset = useSharedValue({ x: 0, y: 0 });
  const value = useSharedValue(onboarding.length);
  const panGestureHandler = Gesture.Pan()
    .runOnJS(true)
    .onUpdate(({ translationX, translationY }) => {
      position.value = {
        x: lastOffset.value.x + translationX,
        y: lastOffset.value.y + translationY,
      };
    })
    .onEnd(() => {
      if (
        Math.abs(position.value.x) < 100 &&
        Math.abs(position.value.y) < 100
      ) {
        lastOffset.value = {
          x: 0,
          y: 0,
        };
        position.value = withSpring({ x: 0, y: 0 });
      } else {
        lastOffset.value = {
          x: 0,
          y: 0,
        };
        position.value = withTiming({
          x: position.value.x * 10,
          y: position.value.y * 10,
        });
        setActualIndex(actualIndex - 1);
        // onboarding.pop();
      }
    });
  const rotate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 8, -8, 0],
      Extrapolation.CLAMP
    );
  });
  const additionalTranslate = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0, 30, -30, 0],
      Extrapolation.CLAMP
    );
  });
  const scale = useDerivedValue(() => {
    return interpolate(
      index,
      [value.value - 3, value.value - 2, value.value - 1, value.value],
      [0.2, 0.9, 0.9, 1],
      Extrapolation.CLAMP
    );
  });
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotate.value}deg`,
        },
        {
          translateX: position.value.x + additionalTranslate.value,
        },
        {
          translateY: position.value.y,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });
  useEffect(() => {
    value.value = withSpring(actualIndex, {
      damping: 10,
      stiffness: 100,
    });
  }, [actualIndex]);
  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View style={[{ zIndex: actualIndex + 1 }, styles.animatedView, rnStyle]}>
        <ImageBackground style={styles.imageStyle} source={item.image}>
          <View style={styles.imageView}>
            <View style={styles.imageTextView}>
              <Text style={styles.imageText}>hello</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
};

export default RecruiterFlashcard;

const styles = StyleSheet.create({
  animatedView: {
    position: "absolute",
    width: "70%",
    height: "55%",
    backgroundColor: "lightblue",
    borderRadius: 12,
  },
  imageView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageTextView: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  imageText: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    objectFit: "contain",
  },
});
