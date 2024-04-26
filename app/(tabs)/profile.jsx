import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons, images } from "../../constants";
import InfoBox from "../../components/infoBox";
import { BlurView } from "expo-blur";
const Profile = ({ initialQuery }) => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppWrite(() => getUserPosts(user.$id));

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <ImageBackground
            source={images.profileBg}
            className="w-full justify-center items-center mb-12 "
          >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-20 h-20 border border-secondary rounded-full justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyle="text-lg font-bold"
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title="Posts"
                subtitle={posts?.length || 0}
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox title="Followers" subtitle={0} containerStyle="mr-4" />
              <InfoBox title="Following" subtitle={0} containerStyle="mr-4" />
            </View>
          </ImageBackground>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title={"No videos found."}
              subtitle={"Create One Now!"}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
