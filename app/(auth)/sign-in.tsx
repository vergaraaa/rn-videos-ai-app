import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill all the fields.");
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);

      router.replace("/home");
    } catch (error) {
      if (error instanceof Error) {
        return Alert.alert("Error", error.message);
      }

      return Alert.alert("Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            className="mt-7"
            value={form.email}
            keyboardType="email-address"
            autoCapitalize="none"
            handleChangeText={(email: string) => {
              setForm({
                ...form,
                email,
              });
            }}
          />

          <FormField
            title="Password"
            className="mt-7"
            value={form.password}
            autoCapitalize="none"
            handleChangeText={(password: string) => {
              setForm({
                ...form,
                password,
              });
            }}
          />

          <CustomButton
            title="Sign In"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2 items-center">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>

            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
