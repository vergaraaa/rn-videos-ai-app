import { View, Text } from "react-native";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  classNameTitle?: string;
}

const InfoBox = ({
  title,
  subtitle = "",
  className = "",
  classNameTitle = "",
}: Props) => {
  return (
    <View className={className}>
      <Text
        className={`text-white text-center font-psemibold ${classNameTitle}`}
      >
        {title}
      </Text>

      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
