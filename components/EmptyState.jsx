import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl font-pmedium text-white mt-2 text-center">
        {subtitle}
      </Text>
      <CustomButton
        title={"Create Post"}
        containerStyles={"w-full my-5"}
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
