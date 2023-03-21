import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { useDispatch } from "react-redux";
import { removeItem } from "../feature/basketSlice";

const BascketCard = ({ basket }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem({ dish: basket, count: 0 }));
  };
  return (
    <View>
      <View className="flex flex-row justify-between px-2 py-3 bg-white mt-2">
        <View className="flex flex-row items-center space-x-2">
          <Text>{basket.count} x</Text>
          <Image
            source={{
              uri: urlFor(basket.image).url(),
            }}
            className="h-20 w-20 bg-gray-300 p-4 rounded-full"
          />
          <Text>{basket.name}</Text>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <Text>$ {basket.total}</Text>
          <TouchableOpacity onPress={handleRemove}>
            <Text className="text-red-500">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BascketCard;
