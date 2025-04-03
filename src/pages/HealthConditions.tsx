
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HealthConditionSelector from '@/components/health/HealthConditionSelector';
import DietaryRecommendations from '@/components/health/DietaryRecommendations';
import { 
  getPersonalizedRecommendations,
  PersonalizedRecommendation
} from '@/services/healthConditionsService';
import { getUserDailyNutrition } from '@/services/nutritionService';

const HealthConditions = () => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);

  const handleSelectCondition = (conditionId: string, isSelected: boolean) => {
    let updatedConditions: string[];
    
    if (isSelected) {
      updatedConditions = [...selectedConditions, conditionId];
    } else {
      updatedConditions = selectedConditions.filter(id => id !== conditionId);
    }
    
    setSelectedConditions(updatedConditions);
    
    // Only update recommendations if we have selected conditions
    if (updatedConditions.length > 0) {
      // Get the current user's diet
      const nutrition = getUserDailyNutrition();
      const currentDiet: string[] = [];
      
      // Collect all food names from the user's daily nutrition
      Object.values(nutrition.foods).forEach(mealFoods => {
        mealFoods.forEach(food => {
          currentDiet.push(food.name);
        });
      });
      
      // Get personalized recommendations
      const newRecommendations = getPersonalizedRecommendations(updatedConditions, currentDiet);
      setRecommendations(newRecommendations);
    } else {
      // Clear recommendations if no conditions selected
      setRecommendations([]);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Health Conditions & Dietary Advice</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Health Condition Selector */}
          <div>
            <HealthConditionSelector 
              selectedConditions={selectedConditions}
              onSelectCondition={handleSelectCondition}
            />
          </div>
          
          {/* Right column - Dietary Recommendations */}
          <div className="lg:col-span-2">
            <DietaryRecommendations recommendations={recommendations} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthConditions;
