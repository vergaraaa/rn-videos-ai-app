import { View, Text, Image } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface Props {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="font-psemibold text-xl text-white text-center">
        {title}
      </Text>

      <Text className="font-pmedium text-sm text-gray-100 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full m-5"
      />
    </View>
  );
};

export default EmptyState;
