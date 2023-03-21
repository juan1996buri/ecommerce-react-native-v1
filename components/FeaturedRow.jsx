import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import sanityClient from "../sanity";
import { Ionicons } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ category }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]
    `,
        { id: category._id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [category._id]);
  return (
    <View>
      <View className="flex flex-row items-center px-2  pt-2 pb-2">
        <View className="flex-1">
          <Text className="font-bold text-lg">{category.name}</Text>
          <Text>{category.short_description}</Text>
        </View>
        <Ionicons name="arrow-forward-outline" color="#E33342" size={24} />
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
