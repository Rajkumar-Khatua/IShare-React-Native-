import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const BookMark = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="">
        <View className="flex items-center justify-center">
          <Text className="text-xl text-gray-100 font-pmedium">
            Coming Soon... 🚀
          </Text>
          <Text className="text-gray-100">
            Powered by{" "}
            <Text className="text-rose-500 font-psemibold">The IShare</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookMark;
