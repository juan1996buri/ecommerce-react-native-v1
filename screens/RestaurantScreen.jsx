import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import sanityClient from "../sanity";
import { useState } from "react";
import { urlFor } from "../sanity";
import { Feather, Ionicons } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRestaurant } from "../feature/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {
    _id,
    image,
    name,
    rating,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = route.params.restaurant;
  const count = useSelector((state) => state.bascket.count);

  useEffect(() => {
    dispatch(
      addRestaurant({
        restaurant: {
          _id,
          image,
          name,
          rating,
          address,
          short_description,
          dishes,
          long,
          lat,
        },
      })
    );
  }, [dispatch]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <View className="relative">
        <Image
          source={{ uri: urlFor(image).width(200).url() }}
          className="w-full h-60"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          className="w-10 h-10 bg-white rounded-full flex justify-center items-center absolute top-10 left-2 z-10"
        >
          <Ionicons name="arrow-back" size={20} color="#E33342" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white">
          <Text className="text-2xl font-bold mx-2">{name}</Text>
          <View className="flex flex-row space-x-2 mx-2">
            <View className="flex flex-row items-center space-x-1">
              <Ionicons name="star" size={22} opacity={0.5} color="#fcc203" />
              <Text className="text-yellow-500">{rating}</Text>
              <Text className="text-gray-500">• Offers</Text>
            </View>
            <View className="flex flex-row items-center">
              <Ionicons
                name="location-outline"
                size={22}
                opacity={0.5}
                color="gray"
              />
              <Text className="text-gray-500">{address}</Text>
            </View>
          </View>
          <Text className=" pt-1 text-gray-500 mx-2">{short_description}</Text>

          <TouchableOpacity className="flex flex-row  py-3 mt-2  border-y  border-gray-300 px-2">
            <View className=" flex-1 flex-row items-center space-x-2 ">
              <Ionicons
                name="help-circle-outline"
                size={20}
                opacity={0.6}
                color="gray"
              />
              <Text>Have a food allergy?</Text>
            </View>
            <View className="w-10">
              <Feather name="chevron-right" size={20} color="#E33342" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="text-xl font-bold mx-2 py-2">Menu</Text>
          <View className="bg-white">
            {dishes.map((dish, index) => (
              <DishRow key={index} dish={dish} />
            ))}
          </View>
        </View>
      </ScrollView>
      {count !== 0 && <BasketIcon />}
    </>
  );
};

export default RestaurantScreen;
