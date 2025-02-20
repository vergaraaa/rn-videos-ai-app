import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { Video } from "@/types/video";
import { useAppwrite } from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProviders";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: videos } = useAppwrite(() => getUserPosts(user?.$id as string));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<Video>
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity onPress={logout} className="self-end mb-10">
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="size-6 "
              />
            </TouchableOpacity>

            <View className="size-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="size-[90%] rounded-lg"
                resizeMode="contain"
              />
            </View>

            <InfoBox
              title={user?.username as string}
              className="mt-5"
              classNameTitle="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={(videos.length ?? 0).toString()}
                subtitle="Posts"
                className="mr-10"
                classNameTitle="text-xl"
              />

              <InfoBox
                title="1.2k"
                subtitle="Followers"
                classNameTitle="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Create your first video!"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
