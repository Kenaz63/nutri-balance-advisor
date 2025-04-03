
// Mock nutrition data service

export interface FoodItem {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'meats' | 'dairy' | 'grains' | 'sweets' | 'other';
  servingSize: string;
  calories: number;
  macros: {
    protein: number; // in grams
    carbs: number; // in grams
    fat: number; // in grams
    fiber: number; // in grams
  };
  micros: {
    vitaminA: number; // percentage of RDA
    vitaminC: number; // percentage of RDA
    calcium: number; // percentage of RDA
    iron: number; // percentage of RDA
    vitaminD: number; // percentage of RDA
    potassium: number; // percentage of RDA
  };
  sugar: number; // in grams
  sodium: number; // in mg
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalMacros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  totalMicros: {
    vitaminA: number;
    vitaminC: number;
    calcium: number;
    iron: number;
    vitaminD: number;
    potassium: number;
  };
  totalSugar: number;
  totalSodium: number;
  foods: {
    breakfast: FoodItem[];
    lunch: FoodItem[];
    dinner: FoodItem[];
    snacks: FoodItem[];
  };
}

export interface NutritionRecommendation {
  nutrient: string;
  status: 'deficient' | 'adequate' | 'excess';
  percentage: number;
  recommendations: string[];
}

// Mock food database
const mockFoodDatabase: FoodItem[] = [
  {
    id: '1',
    name: 'Apple',
    category: 'fruits',
    servingSize: '1 medium (182g)',
    calories: 95,
    macros: { protein: 0.5, carbs: 25, fat: 0.3, fiber: 4 },
    micros: { vitaminA: 2, vitaminC: 14, calcium: 1, iron: 1, vitaminD: 0, potassium: 4 },
    sugar: 19,
    sodium: 2
  },
  {
    id: '2',
    name: 'Banana',
    category: 'fruits',
    servingSize: '1 medium (118g)',
    calories: 105,
    macros: { protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
    micros: { vitaminA: 1, vitaminC: 10, calcium: 0, iron: 1, vitaminD: 0, potassium: 9 },
    sugar: 14,
    sodium: 1
  },
  {
    id: '3',
    name: 'Chicken Breast',
    category: 'meats',
    servingSize: '3 oz (85g)',
    calories: 165,
    macros: { protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    micros: { vitaminA: 0, vitaminC: 0, calcium: 1, iron: 5, vitaminD: 0, potassium: 5 },
    sugar: 0,
    sodium: 74
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    category: 'dairy',
    servingSize: '6 oz (170g)',
    calories: 100,
    macros: { protein: 17, carbs: 6, fat: 0, fiber: 0 },
    micros: { vitaminA: 0, vitaminC: 0, calcium: 15, iron: 0, vitaminD: 0, potassium: 6 },
    sugar: 6,
    sodium: 65
  },
  {
    id: '5',
    name: 'Spinach',
    category: 'vegetables',
    servingSize: '1 cup (30g)',
    calories: 7,
    macros: { protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7 },
    micros: { vitaminA: 56, vitaminC: 14, calcium: 3, iron: 5, vitaminD: 0, potassium: 5 },
    sugar: 0.1,
    sodium: 24
  },
  {
    id: '6',
    name: 'Salmon',
    category: 'meats',
    servingSize: '3 oz (85g)',
    calories: 177,
    macros: { protein: 19, carbs: 0, fat: 11, fiber: 0 },
    micros: { vitaminA: 1, vitaminC: 0, calcium: 0, iron: 3, vitaminD: 25, potassium: 8 },
    sugar: 0,
    sodium: 50
  },
  {
    id: '7',
    name: 'Brown Rice',
    category: 'grains',
    servingSize: '1 cup cooked (195g)',
    calories: 216,
    macros: { protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
    micros: { vitaminA: 0, vitaminC: 0, calcium: 1, iron: 5, vitaminD: 0, potassium: 3 },
    sugar: 0.7,
    sodium: 10
  },
  {
    id: '8',
    name: 'Chocolate Chip Cookie',
    category: 'sweets',
    servingSize: '1 cookie (16g)',
    calories: 78,
    macros: { protein: 1, carbs: 10, fat: 3.8, fiber: 0.4 },
    micros: { vitaminA: 0, vitaminC: 0, calcium: 1, iron: 2, vitaminD: 0, potassium: 1 },
    sugar: 6,
    sodium: 60
  },
];

// RDA (Recommended Daily Allowance) reference values
export const rdaReference = {
  calories: 2000, // kcal
  macros: {
    protein: 50, // g
    carbs: 275, // g
    fat: 78, // g
    fiber: 28, // g
  },
  micros: {
    vitaminA: 100, // percentage
    vitaminC: 100, // percentage
    calcium: 100, // percentage
    iron: 100, // percentage
    vitaminD: 100, // percentage
    potassium: 100, // percentage
  },
  sugar: 36, // g
  sodium: 2300, // mg
};

// Get all food items
export const getAllFoods = (): FoodItem[] => {
  return mockFoodDatabase;
};

// Get foods by category
export const getFoodsByCategory = (category: FoodItem['category']): FoodItem[] => {
  return mockFoodDatabase.filter(food => food.category === category);
};

// Get food by id
export const getFoodById = (id: string): FoodItem | undefined => {
  return mockFoodDatabase.find(food => food.id === id);
};

// Mock function to get a user's daily nutrition
export const getUserDailyNutrition = (date: string = new Date().toISOString().split('T')[0]): DailyNutrition => {
  // In a real app, this would fetch from an API or database
  const breakfast = [mockFoodDatabase[0], mockFoodDatabase[3]]; // Apple and Greek Yogurt
  const lunch = [mockFoodDatabase[2], mockFoodDatabase[4], mockFoodDatabase[6]]; // Chicken, Spinach, Brown Rice
  const dinner = [mockFoodDatabase[5], mockFoodDatabase[4]]; // Salmon and Spinach
  const snacks = [mockFoodDatabase[1], mockFoodDatabase[7]]; // Banana and Cookie

  // Calculate total nutrition values
  const allFoods = [...breakfast, ...lunch, ...dinner, ...snacks];
  
  const totalCalories = allFoods.reduce((sum, food) => sum + food.calories, 0);
  
  const totalMacros = {
    protein: allFoods.reduce((sum, food) => sum + food.macros.protein, 0),
    carbs: allFoods.reduce((sum, food) => sum + food.macros.carbs, 0),
    fat: allFoods.reduce((sum, food) => sum + food.macros.fat, 0),
    fiber: allFoods.reduce((sum, food) => sum + food.macros.fiber, 0)
  };
  
  const totalMicros = {
    vitaminA: allFoods.reduce((sum, food) => sum + food.micros.vitaminA, 0),
    vitaminC: allFoods.reduce((sum, food) => sum + food.micros.vitaminC, 0),
    calcium: allFoods.reduce((sum, food) => sum + food.micros.calcium, 0),
    iron: allFoods.reduce((sum, food) => sum + food.micros.iron, 0),
    vitaminD: allFoods.reduce((sum, food) => sum + food.micros.vitaminD, 0),
    potassium: allFoods.reduce((sum, food) => sum + food.micros.potassium, 0)
  };
  
  const totalSugar = allFoods.reduce((sum, food) => sum + food.sugar, 0);
  const totalSodium = allFoods.reduce((sum, food) => sum + food.sodium, 0);

  return {
    date,
    totalCalories,
    totalMacros,
    totalMicros,
    totalSugar,
    totalSodium,
    foods: {
      breakfast,
      lunch,
      dinner,
      snacks
    }
  };
};

// Generate nutrition recommendations based on daily consumption
export const getNutritionRecommendations = (dailyNutrition: DailyNutrition): NutritionRecommendation[] => {
  const recommendations: NutritionRecommendation[] = [];
  
  // Check protein
  const proteinPercentage = (dailyNutrition.totalMacros.protein / rdaReference.macros.protein) * 100;
  if (proteinPercentage < 80) {
    recommendations.push({
      nutrient: 'Protein',
      status: 'deficient',
      percentage: proteinPercentage,
      recommendations: ['Add more lean meats like chicken or turkey', 'Consider plant-based proteins like lentils or beans', 'Greek yogurt is a great high-protein snack']
    });
  } else if (proteinPercentage > 150) {
    recommendations.push({
      nutrient: 'Protein',
      status: 'excess',
      percentage: proteinPercentage,
      recommendations: ['Consider reducing portion sizes of high-protein foods', 'Balance your diet with more fruits and vegetables', 'Spread protein intake throughout the day']
    });
  } else {
    recommendations.push({
      nutrient: 'Protein',
      status: 'adequate',
      percentage: proteinPercentage,
      recommendations: ['Maintaining good protein intake', 'Continue with balanced portions']
    });
  }
  
  // Check fiber
  const fiberPercentage = (dailyNutrition.totalMacros.fiber / rdaReference.macros.fiber) * 100;
  if (fiberPercentage < 80) {
    recommendations.push({
      nutrient: 'Fiber',
      status: 'deficient',
      percentage: fiberPercentage,
      recommendations: ['Add more whole grains to your diet', 'Increase fruit and vegetable consumption', 'Consider beans and legumes for fiber boost']
    });
  } else {
    recommendations.push({
      nutrient: 'Fiber',
      status: 'adequate',
      percentage: fiberPercentage,
      recommendations: ['Good fiber intake', 'Continue eating plenty of fruits and vegetables']
    });
  }
  
  // Check Vitamin C
  const vitaminCPercentage = dailyNutrition.totalMicros.vitaminC;
  if (vitaminCPercentage < 80) {
    recommendations.push({
      nutrient: 'Vitamin C',
      status: 'deficient',
      percentage: vitaminCPercentage,
      recommendations: ['Add more citrus fruits like oranges and grapefruits', 'Bell peppers are high in vitamin C', 'Consider strawberries or kiwi as snacks']
    });
  } else {
    recommendations.push({
      nutrient: 'Vitamin C',
      status: 'adequate',
      percentage: vitaminCPercentage,
      recommendations: ['Good vitamin C levels', 'Continue your current fruit and vegetable intake']
    });
  }
  
  // Check Vitamin D
  const vitaminDPercentage = dailyNutrition.totalMicros.vitaminD;
  if (vitaminDPercentage < 50) {
    recommendations.push({
      nutrient: 'Vitamin D',
      status: 'deficient',
      percentage: vitaminDPercentage,
      recommendations: ['Include more fatty fish like salmon or mackerel', 'Consider vitamin D fortified foods', 'Moderate sun exposure can help vitamin D production']
    });
  } else {
    recommendations.push({
      nutrient: 'Vitamin D',
      status: 'adequate',
      percentage: vitaminDPercentage,
      recommendations: ['Good vitamin D levels', 'Continue including vitamin D rich foods in your diet']
    });
  }

  return recommendations;
};
