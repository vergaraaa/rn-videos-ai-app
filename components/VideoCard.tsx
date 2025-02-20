import { Video } from "@/types/video";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { icons } from "../constants";
import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

interface Props {
  video: Video;
}

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: Props) => {
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="size-[46px] border border-secondary rounded-lg justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="size-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>

            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="size-5" resizeMode="contain" />
        </View>
      </View>

      {isPlaying ? (
        <VideoView
          className="my-5 overflow-hidden shadow-lg shadow-black/40"
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
        />
      ) : (
        <TouchableOpacity
          onPress={() => player.play()}
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="size-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute size-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  controlsContainer: {
    padding: 10,
  },
});
