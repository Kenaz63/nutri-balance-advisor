
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FoodItem } from '@/services/nutritionService';

interface FoodListProps {
  title: string;
  foods: FoodItem[];
}

const FoodList: React.FC<FoodListProps> = ({ title, foods }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {foods.length === 0 ? (
          <p className="text-gray-500 text-sm">No foods added yet</p>
        ) : (
          <div className="space-y-2">
            {foods.map((food) => (
              <div 
                key={food.id} 
                className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-medium">{food.name}</h4>
                  <p className="text-xs text-gray-500">{food.servingSize}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{food.calories} kcal</p>
                  <p className="text-xs text-gray-500">
                    P: {food.macros.protein}g | C: {food.macros.carbs}g | F: {food.macros.fat}g
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodList;
