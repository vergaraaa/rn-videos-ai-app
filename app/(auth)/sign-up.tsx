import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

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
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            className="mt-7"
            value={form.username}
            handleChangeText={(username: string) => {
              setForm({
                ...form,
                username,
              });
            }}
          />

          <FormField
            title="Email"
            className="mt-7"
            value={form.email}
            keyboardType="email-address"
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
            handleChangeText={(password: string) => {
              setForm({
                ...form,
                password,
              });
            }}
          />

          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2 items-center">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>

            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-lg font-psemibold text-secondary">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
