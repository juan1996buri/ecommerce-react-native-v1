import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

const CategoryCard = ({ category }) => {
  return (
    <TouchableOpacity className="relative mx-1">
      <Image
        source={{ uri: urlFor(category.image).width(200).url() }}
        className="w-20 h-20"
      />
      <View className="absolute w-full bottom-0">
        <View className="flex justify-center items-center ">
          <Text className="font-bold text-white">{category.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
