// src/data/dishes.js

export const dishes = [
  {
    categoryId: 1,
    mealType: "MAIN COURSE",
    type: "VEG",
    description: "Paneer cubes in spicy onion gravy with onions and capsicum cubes.",
    image: null,
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CURRY",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: "",
    id: 1,
    name: "Kadhai Paneer 1"
  },
  {
    categoryId: 1,
    mealType: "MAIN COURSE",
    type: "VEG",
    description: "Paneer cubes in spicy onion gravy with onions and capsicum cubes.",
    image: null,
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CURRY",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: "",
    id: 2,
    name: "Kadhai Paneer 2"
  },
  {
    categoryId: 1,
    mealType: "MAIN COURSE",
    type: "VEG",
    description: "Paneer cubes in spicy onion gravy with onions and capsicum cubes.",
    image: null,
    category: {
      id: 1,
      name: "North Indian",
      image: "https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png",
      isRecommendedForMealSuggestion: true
    },
    dishType: "CURRY",
    forChefit: true,
    forParty: true,
    nameHi: "",
    nameBn: "",
    id: 3,
    name: "Kadhai Paneer 3"
  }
];

// Optional helper function
export const getDishes = () => dishes;
