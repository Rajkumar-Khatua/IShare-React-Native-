import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import {
  getAllPosts,
  getCurrentUser,
  getLatestPosts,
} from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
const Home = () => {
  const { data: posts, isLoading, refetch } = useAppWrite(getAllPosts);
  const { data: LatestPosts } = useAppWrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    // Fetch data from API
    // Re-Call videos -> if any videos apperars
    setRefreshing(false);
  };

  // console.log(posts, isLoading, refetch);
  // console.log("Latest", LatestPosts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[]} // Replace with data from API}
        data={posts} // Replace with data from API}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {getCurrentUser?.username ?? "User"}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>

            <SearchInput
              placeholder="Search for any videos"
              otherStyles={"h-12 rounded-full"}
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-5">
                Fresh Updates
              </Text>
              <Trending posts={LatestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title={"No posts found. Please try again later."}
              subtitle={"Be the first to post something here."}
            />
          );
        }}
        refreshControl={
          // Refresh the API Call's
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
