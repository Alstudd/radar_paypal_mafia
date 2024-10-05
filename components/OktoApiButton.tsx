import { TouchableOpacity, Text } from "react-native";

import { ButtonProps } from "@/types/type";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#4646fc]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const OktoApiButton = ({
  apiFn,
  setterFn,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps & {
  apiFn: () => Promise<any>;
  setterFn: (data: any) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (GoogleSignin.getCurrentUser()) {
          apiFn()
            .then((result) => {
              console.log(`${title}:`, result);
              setterFn(result);
            })
            .catch((error) => {
              console.error(`${title} error:`, error);
            });
        }
      }}
      className={`w-full rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-JakartaBold ${getTextVariantStyle(
          textVariant
        )}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default OktoApiButton;
