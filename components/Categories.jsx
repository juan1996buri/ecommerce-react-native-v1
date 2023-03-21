import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import sanityClient, { urlFor } from "../sanity";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'category']
    `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </ScrollView>
  );
};

export default Categories;
