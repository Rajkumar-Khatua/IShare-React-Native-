import { Alert, Dimensions, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appWrite";
import { getCurrentUser, signIn } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const signUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px] "
          />
          <Text
            className="
            text-2xl
            text-white
            text-semibold
            mt-10
            font-psemibold
          "
          >
            Create an account to continue using Ishare
          </Text>
          <FormField
            title="Username"
            value={form.username}
            otherStyles={"mt-9"}
            handleChangeText={(e) => setform({ ...form, username: e })}
          />
          <FormField
            title="Email"
            value={form.email}
            otherStyles={"mt-6"}
            handleChangeText={(e) => setform({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            otherStyles={"mt-6"}
            handleChangeText={(e) => setform({ ...form, password: e })}
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-6"
            isLoading={isSubmitting}
            handlePress={submit} // This is a placeholder for the actual sign in function
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-md font-pmedium">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-secondary font-psemibold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
