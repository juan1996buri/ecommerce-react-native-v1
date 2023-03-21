import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import sanityClient, { urlFor } from "../sanity";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", { restaurant });
      }}
      className="mx-1"
    >
      <Image
        source={{ uri: urlFor(restaurant.image).width(200).url() }}
        className="w-72 h-48 "
      />
      <Text className="font-semibold">{restaurant.name}</Text>
      <View className="flex-row items-center space-x-1">
        <Ionicons name="star" size={22} opacity={0.5} color="#fcc203" />
        <Text className="text-xs text-gray-500">
          <Text className="text-yellow-500">{restaurant.rating}</Text> • Offers
        </Text>
      </View>
      <View className="flex-row items-center space-x-1">
        <Ionicons
          name="location-outline"
          size={22}
          opacity={0.4}
          color="gray"
        />
        <Text className="text-xs text-gray-500">
          Nearby • {restaurant.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
