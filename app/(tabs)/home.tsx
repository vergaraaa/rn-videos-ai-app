import { useGlobalContext } from "@/context/GlobalProviders";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";

const Home = () => {
  const { user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<{ $id: number }>
        data={[{ $id: 1 }, { $id: 2 }, { $id: 3 }]}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <Text className="text-white">{item.$id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>

                <Text className="font-psemibold text-2xl text-white">
                  username
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="size-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput
              value={""}
              placeholder="Search for a video topic"
              handleChangeText={() => {}}
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
