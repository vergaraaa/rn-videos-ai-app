import { useState } from "react";
import {
  View,
  Text,
  KeyboardType,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputProps,
  Alert,
} from "react-native";

import { icons } from "../constants";
import { router, usePathname } from "expo-router";

interface Props {
  initialQuery?: string;
}

const SearchInput = ({ initialQuery }: Props) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="size-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
