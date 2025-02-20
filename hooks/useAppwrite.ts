import { Video } from "@/types/video";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn: Function) => {
  const [data, setData] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }

      Alert.alert("Unkown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refetch = () => getData();

  return {
    data,
    isLoading,
    refetch,
  };
};
