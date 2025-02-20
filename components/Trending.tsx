import { useEvent, useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Video } from "@/types/video";
import { useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { Video as VideoAv, ResizeMode } from "expo-av";

interface Props {
  videos: Video[];
}

const zoomIn = {
  from: {
    scale: 0.9,
  },
  to: {
    scale: 1.1,
  },
};

const zoomOut = {
  from: {
    scale: 1.1,
  },
  to: {
    scale: 0.9,
  },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: Video;
}) => {
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <VideoView
          className="my-5 overflow-hidden shadow-lg shadow-black/40"
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => player.play()}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image source={icons.play} className="absolute size-12" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ videos }: Props) => {
  const [activeItem, setActiveItem] = useState(videos[1]?.$id ?? "");

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Video>[];
    changed: ViewToken<Video>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      horizontal
      data={videos}
      keyExtractor={(item) => item.$id.toString()}
      renderItem={({ item, index }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      contentOffset={{ x: 100, y: 0 }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 170,
      }}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 200,
    height: 288,
    borderRadius: 35,
    backgroundColor: "#ffffff0A",
  },
  controlsContainer: {
    padding: 10,
  },
});
