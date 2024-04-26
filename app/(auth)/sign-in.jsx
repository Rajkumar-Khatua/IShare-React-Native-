import { Alert, Dimensions, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appWrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      // Alert.alert("Wow, You're now logged In");
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
            Welcome back to Ishare, sign in to continue
          </Text>
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
            title="Sign In"
            containerStyles="mt-6"
            isLoading={isSubmitting}
            handlePress={submit} // This is a placeholder for the actual sign in function
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-md font-pmedium">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-secondary font-psemibold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
