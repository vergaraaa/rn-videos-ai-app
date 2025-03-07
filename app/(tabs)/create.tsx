import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProviders";
import { createVideoPost } from "@/lib/appwrite";

export interface CreateForm {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
  userId: string | null;
}

const Create = () => {
  const { user } = useGlobalContext();

  const [form, setForm] = useState<CreateForm>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    userId: user?.$id || null,
  });
  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpeg", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (result.canceled) return;

    if (selectType === "image")
      setForm({ ...form, thumbnail: result.assets[0] });

    if (selectType === "video") setForm({ ...form, video: result.assets[0] });
  };

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt)
      return Alert.alert("Please fill in all the fields");

    setUploading(true);

    try {
      await createVideoPost(form);

      Alert.alert("Success", "Video uploaded successfully");

      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
        userId: user?.$id || null,
      });

      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        return Alert.alert(error.message);
      }

      return Alert.alert("Unknown error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          handleChangeText={(e) => {
            setForm({ ...form, title: e });
          }}
          value={form.title}
          placeholder="Give your video a catchy title..."
          className="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="size-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="size-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row gap-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="size-5"
                />

                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          handleChangeText={(e) => {
            setForm({ ...form, prompt: e });
          }}
          value={form.prompt}
          placeholder="The promopt you used to create this video"
          className="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
