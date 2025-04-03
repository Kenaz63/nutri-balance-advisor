
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DailyNutrition, rdaReference, NutritionRecommendation } from '@/services/nutritionService';

interface NutritionSummaryProps {
  nutrition: DailyNutrition;
  recommendations: NutritionRecommendation[];
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ nutrition, recommendations }) => {
  // Calculate percentages for the progress bars
  const caloriePercentage = Math.min(Math.round((nutrition.totalCalories / rdaReference.calories) * 100), 100);
  const proteinPercentage = Math.min(Math.round((nutrition.totalMacros.protein / rdaReference.macros.protein) * 100), 100);
  const carbsPercentage = Math.min(Math.round((nutrition.totalMacros.carbs / rdaReference.macros.carbs) * 100), 100);
  const fatPercentage = Math.min(Math.round((nutrition.totalMacros.fat / rdaReference.macros.fat) * 100), 100);
  const fiberPercentage = Math.min(Math.round((nutrition.totalMacros.fiber / rdaReference.macros.fiber) * 100), 100);
  const sugarPercentage = Math.min(Math.round((nutrition.totalSugar / rdaReference.sugar) * 100), 100);

  const getProgressColor = (percentage: number, isReverse: boolean = false) => {
    if (isReverse) {
      // For nutrients where lower is better (like sugar)
      if (percentage > 100) return 'bg-red-500';
      if (percentage > 80) return 'bg-yellow-500';
      return 'bg-green-500';
    } else {
      // For nutrients where higher is better (up to 100%)
      if (percentage < 50) return 'bg-red-500';
      if (percentage < 80) return 'bg-yellow-500';
      return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Daily Nutrition Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Calories</span>
                <span className="text-sm text-muted-foreground">
                  {nutrition.totalCalories} / {rdaReference.calories} kcal
                </span>
              </div>
              <Progress value={caloriePercentage} className={getProgressColor(caloriePercentage)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-muted-foreground">
                    {nutrition.totalMacros.protein.toFixed(1)} / {rdaReference.macros.protein}g
                  </span>
                </div>
                <Progress value={proteinPercentage} className={getProgressColor(proteinPercentage)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Carbs</span>
                  <span className="text-sm text-muted-foreground">
                    {nutrition.totalMacros.carbs.toFixed(1)} / {rdaReference.macros.carbs}g
                  </span>
                </div>
                <Progress value={carbsPercentage} className={getProgressColor(carbsPercentage)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-muted-foreground">
                    {nutrition.totalMacros.fat.toFixed(1)} / {rdaReference.macros.fat}g
                  </span>
                </div>
                <Progress value={fatPercentage} className={getProgressColor(fatPercentage)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Fiber</span>
                  <span className="text-sm text-muted-foreground">
                    {nutrition.totalMacros.fiber.toFixed(1)} / {rdaReference.macros.fiber}g
                  </span>
                </div>
                <Progress value={fiberPercentage} className={getProgressColor(fiberPercentage)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Sugar</span>
                  <span className="text-sm text-muted-foreground">
                    {nutrition.totalSugar.toFixed(1)} / {rdaReference.sugar}g
                  </span>
                </div>
                <Progress value={sugarPercentage} className={getProgressColor(sugarPercentage, true)} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Micronutrients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(nutrition.totalMicros).map(([key, value]) => {
              const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              const percentage = Math.min(value, 100);
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{formattedKey}</span>
                    <span className="text-sm text-muted-foreground">{value.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} className={getProgressColor(percentage)} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-md">{rec.nutrient}</h3>
                  <span 
                    className={`text-sm px-2 py-1 rounded ${
                      rec.status === 'deficient' ? 'bg-red-100 text-red-800' : 
                      rec.status === 'excess' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)} ({Math.round(rec.percentage)}%)
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {rec.recommendations.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionSummary;
