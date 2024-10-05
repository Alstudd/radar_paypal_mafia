import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useColorScheme } from "nativewind";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  const { colorScheme } = useColorScheme();

  return (
    <ScrollView
      className={`flex-1 ${
        colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
      }`}
    >
      <View
        className={`flex-1 ${
          colorScheme === "dark" ? "bg-[#02050A]" : "bg-white"
        }`}
      >
        <View className="relative w-full h-[250px]">
          <Image
            source={{
              uri: "https://c4.wallpaperflare.com/wallpaper/58/483/756/digital-digital-art-artwork-illustration-romain-trystram-hd-wallpaper-preview.jpg",
            }}
            className="z-0 w-full h-[250px]"
          />
          <Text className="text-2xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth title={"Log In"} />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10 font-Jakarta"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
      <View className="absolute top-5 w-full flex flex-row justify-between items-center p-5">
        <ThemeSwitcher />
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)/welcome");
          }}
        >
          <Text className="text-md font-JakartaBold text-white">Who are we?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;
