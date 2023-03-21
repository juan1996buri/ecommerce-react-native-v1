import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import BascketCard from "../components/BascketCard";
import { useEffect } from "react";
import { getTotal } from "../feature/basketSlice";

const BasketScreen = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const itemsList = useSelector((state) => state.bascket.itemsList);
  const basketTotal = useSelector((state) => state.bascket.total);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(getTotal());
  }, [itemsList]);

  return (
    <SafeAreaView className="flex-1 ">
      <View className="relative flex justify-center items-center  pt-8 border-b border-red-300 bg-white">
        <Text>Basket</Text>
        <Text>{restaurant?.name}</Text>
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute  right-3 top-8"
        >
          <Ionicons name="close-circle" size={30} color="#E33342" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center w-full mt-4 bg-white p-2">
        <View className="flex-1 flex-row items-center space-x-2">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text>Delivery in 30 - 35 mins</Text>
        </View>
        <Text className="text-red-500">Changs</Text>
      </View>
      <ScrollView
        className="divide-y divide-gray-200"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      >
        {itemsList.map((basket, index) => (
          <BascketCard basket={basket} key={index} />
        ))}
      </ScrollView>
      <View className=" bg-white  pt-2   w-full z-50   ">
        <View className="flex justify-between flex-row rounded-t-md px-2">
          <Text className="text-slate-400 text-lg">Subtotal</Text>
          <Text className="text-slate-400 text-lg">$ {basketTotal}</Text>
        </View>
        <View className="flex justify-between flex-row rounded-t-md px-2">
          <Text className="text-slate-400 text-lg">Delivery fee</Text>
          <Text className="text-slate-400 text-lg">$ 47</Text>
        </View>
        <View className="flex justify-between flex-row rounded-t-md px-2">
          <Text className="text-slate-500 text-lg">Order total</Text>
          <Text className="text-slate-500 text-lg">$ {basketTotal + 47}</Text>
        </View>
        <TouchableOpacity className="bg-red-500 flex items-center py-3">
          <Text className="text-white font-bold text-xl">Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
