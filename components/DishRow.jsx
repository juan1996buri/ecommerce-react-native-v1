import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../sanity";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../feature/basketSlice";
import { useEffect } from "react";

const DishRow = ({ dish }) => {
  const itemsList = useSelector((state) => state.bascket.itemsList);
  const [count, setCount] = useState(0);
  const [isActiveCount, setIsActiveCount] = useState(false);
  const dispatch = useDispatch();
  const handleAddCar = () => {
    setCount(count + 1);
    dispatch(addItem({ dish, count: count + 1 }));
  };
  const handleRemoveCar = () => {
    if (count > 0) {
      setCount(count - 1);
      dispatch(removeItem({ dish, count: count - 1 }));
    }
  };
  const handleIsActive = () => {
    setIsActiveCount((isActiveCount) => !isActiveCount);
  };

  useEffect(() => {
    const product = itemsList.find((item) => item._id === dish._id);
    if (!product?.count) {
      setCount(0);
    } else {
      setCount(product.count);
    }
  }, [dish._id, itemsList]);

  return (
    <>
      <TouchableOpacity
        onPress={handleIsActive}
        className="flex flex-row p-2 border-y  border-gray-200"
      >
        <View className="flex-1 space-y-1">
          <Text>{dish?.name}</Text>
          <Text className="text-gray-500">{dish?.short_description}</Text>
          <Text className="text-gray-500"> $ {dish.price}</Text>
          {isActiveCount && (
            <View className="flex flex-row items-center  space-x-2 z-20">
              <TouchableOpacity onPress={handleRemoveCar}>
                <AntDesign name="minuscircle" size={24} color="#E33342" />
              </TouchableOpacity>
              <Text>{count}</Text>
              <TouchableOpacity onPress={() => handleAddCar()}>
                <AntDesign name="pluscircle" size={24} color="#E33342" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Image
          source={{ uri: urlFor(dish.image).width(200).url() }}
          className="w-24 h-24 "
        />
      </TouchableOpacity>
    </>
  );
};

export default DishRow;
