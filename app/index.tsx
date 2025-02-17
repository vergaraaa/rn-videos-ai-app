import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-pblack">Aora!</Text>

      <StatusBar style="auto" />

      <Link href="/home" className="text-blue-600">
        Go to Home
      </Link>
    </View>
  );
}
