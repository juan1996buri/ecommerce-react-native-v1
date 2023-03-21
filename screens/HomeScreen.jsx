import {
  View,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useState } from "react";
import sanityClient from "../sanity";
import { useEffect } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //when component loads
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex flex-row mx-2 space-x-2">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
          }}
          className="w-10 h-10 rounded-full p-4"
        />
        <View className="flex-1">
          <Text>Deliver Now!</Text>
          <View className="flex flex-row">
            <Text>Current Localitation</Text>
            <Feather name="chevron-down" size={20} color="#E33342" />
          </View>
        </View>
        <Ionicons name="person-outline" size={35} color="#E33342" />
      </View>
      <View className="flex flex-row mx-2 items-center space-x-2 pb-2 pt-2">
        <View className="flex-1   items-center flex-row bg-slate-200  space-x-2 p-2">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput placeholder="search" className="py-2 text-lg" />
        </View>
        <Feather name="sliders" size={20} color="#E33342" />
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <Categories />
        {featuredCategories.map((category, index) => (
          <FeaturedRow key={index} category={category} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
