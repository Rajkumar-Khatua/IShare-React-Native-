import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[80px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-2xl text-white text-center font-bold">
              Discover the greatest stories ever told in a new way with{" "}
              <Text className="text-secondary-200">Ishare</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-2 -right-2 w-[136px] h-[15px]"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-200 mt-7 text-center">
            ishare is a platform that allows you to read and share stories in a
            new way. You can read stories from different genres and share your
            own stories with the world.
          </Text>
          <CustomButton
            title="Let's dive in"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}
