import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getTotal } from "../feature/basketSlice";
import { useEffect } from "react";

const BasketIcon = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const basketTotal = useSelector((state) => state.bascket.total);
  const itemsList = useSelector((state) => state.bascket.itemsList);
  const count = useSelector((state) => state.bascket.count);
  useEffect(() => {
    dispatch(getTotal());
  }, [itemsList]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Basket")}
      className="absolute bottom-10  w-full z-50   "
    >
      <View className="bg-red-500 flex-1 flex-row mx-3 rounded-sm justify-between items-center h-20  px-3">
        <Text className="text-white font-semibold bg-red-700 px-3 py-2">
          {count}
        </Text>
        <Text className="text-white font-semibold">View Bascket</Text>
        <Text className="text-white font-semibold">$ {basketTotal}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BasketIcon;
