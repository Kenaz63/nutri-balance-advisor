
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NutritionSummary from '@/components/nutrition/NutritionSummary';
import FoodList from '@/components/nutrition/FoodList';
import FoodSelector from '@/components/nutrition/FoodSelector';
import { 
  getUserDailyNutrition, 
  getNutritionRecommendations, 
  FoodItem, 
  DailyNutrition 
} from '@/services/nutritionService';
import { useToast } from "@/hooks/use-toast";

const Nutrition = () => {
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial nutrition data
    const nutrition = getUserDailyNutrition();
    setDailyNutrition(nutrition);
  }, []);

  const handleAddFood = (food: FoodItem, mealType: string) => {
    if (!dailyNutrition) return;

    // Create a deep copy of the current nutrition data
    const updatedNutrition = JSON.parse(JSON.stringify(dailyNutrition)) as DailyNutrition;

    // Add the food to the appropriate meal type
    if (mealType === 'breakfast') {
      updatedNutrition.foods.breakfast.push(food);
    } else if (mealType === 'lunch') {
      updatedNutrition.foods.lunch.push(food);
    } else if (mealType === 'dinner') {
      updatedNutrition.foods.dinner.push(food);
    } else if (mealType === 'snacks') {
      updatedNutrition.foods.snacks.push(food);
    }

    // Update totals
    updatedNutrition.totalCalories += food.calories;
    
    // Update macros
    updatedNutrition.totalMacros.protein += food.macros.protein;
    updatedNutrition.totalMacros.carbs += food.macros.carbs;
    updatedNutrition.totalMacros.fat += food.macros.fat;
    updatedNutrition.totalMacros.fiber += food.macros.fiber;
    
    // Update micros
    updatedNutrition.totalMicros.vitaminA += food.micros.vitaminA;
    updatedNutrition.totalMicros.vitaminC += food.micros.vitaminC;
    updatedNutrition.totalMicros.calcium += food.micros.calcium;
    updatedNutrition.totalMicros.iron += food.micros.iron;
    updatedNutrition.totalMicros.vitaminD += food.micros.vitaminD;
    updatedNutrition.totalMicros.potassium += food.micros.potassium;
    
    // Update sugar and sodium
    updatedNutrition.totalSugar += food.sugar;
    updatedNutrition.totalSodium += food.sodium;

    setDailyNutrition(updatedNutrition);
    
    toast({
      title: "Food added",
      description: `${food.name} added to your ${mealType}`,
    });
  };

  // If data is still loading
  if (!dailyNutrition) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const nutritionRecommendations = getNutritionRecommendations(dailyNutrition);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Nutrition Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Nutrition Summary */}
          <div className="lg:col-span-2">
            <NutritionSummary 
              nutrition={dailyNutrition}
              recommendations={nutritionRecommendations}
            />
          </div>
          
          {/* Right column - Food Selector */}
          <div>
            <FoodSelector onAddFood={handleAddFood} />
          </div>
        </div>
        
        {/* Food Lists */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FoodList title="Breakfast" foods={dailyNutrition.foods.breakfast} />
          <FoodList title="Lunch" foods={dailyNutrition.foods.lunch} />
          <FoodList title="Dinner" foods={dailyNutrition.foods.dinner} />
          <FoodList title="Snacks" foods={dailyNutrition.foods.snacks} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Nutrition;
