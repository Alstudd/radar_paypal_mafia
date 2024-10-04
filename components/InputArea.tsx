import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { InputFieldProps } from "@/types/type";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

const InputArea = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  useExpoVectorIcons,
  ...props
}: InputFieldProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text
              className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle} ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
            >
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start rounded-xl border border-neutral-100 focus:border-primary-500 ${containerStyle} ${containerStyle} ${
              colorScheme === "dark" ? "bg-[#02050A]" : "bg-neutral-100"
            }`}
          >
            {useExpoVectorIcons ? (
              <View className="ml-4 mt-4">
                <MaterialIcons
                  name={icon}
                  size={24}
                  className={`${iconStyle}`}
                  color={"#0286FF"}
                />
              </View>
            ) : (
              icon && (
                <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
              )
            )}
            <TextInput
              placeholderTextColor={
                colorScheme === "dark" ? "#e0e0e0" : "#616161"
              }
              cursorColor={"#0286FF"}
              className={`p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} ${
                colorScheme === "dark" ? "text-white" : "text-[#02050A]"
              }`}
              secureTextEntry={secureTextEntry}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputArea;
