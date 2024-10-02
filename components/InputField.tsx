import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";

import { InputFieldProps } from "@/types/type";
import { MaterialIcons } from "@expo/vector-icons";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  useExpoVectorIcons,
  iconRight,
  rightIcon,
  righButtonOnPress,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
          >
            {useExpoVectorIcons ? (
              <View className="ml-4 mt-[3px]">
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
              cursorColor={"#0286FF"}
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-leff`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {iconRight && (
              <TouchableOpacity onPress={righButtonOnPress} className="m-2">
                <MaterialIcons
                  name={rightIcon}
                  size={40}
                  className={`${iconStyle}`}
                  color={"#0286FF"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
