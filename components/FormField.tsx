import { useState } from "react";
import {
  View,
  Text,
  KeyboardType,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { icons } from "../constants";

interface Props {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  className?: string;
  keyboardType?: KeyboardType;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  className = "",
  keyboardType = "default",
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${className}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
