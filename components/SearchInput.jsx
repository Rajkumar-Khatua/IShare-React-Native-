import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  return (
    <View
      className={`  border-1
        border-black-200
        w-full
        h-12
        px-4
        rounded-2xl
        bg-black-100
        focus:border-secondary
        items-center
        flex-row
        space-x-4
        ${otherStyles}`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert("Please enter a search query");
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
