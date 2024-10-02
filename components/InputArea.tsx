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
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="my-2 w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
            <View
              className={`flex flex-row justify-start bg-neutral-100 rounded-xl border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
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
                cursorColor={"#0286FF"}
                className={`p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle}`}
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
  