import { Models } from "react-native-appwrite";
import { User } from "./user";

export interface Video extends Models.Document {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: User;
}
