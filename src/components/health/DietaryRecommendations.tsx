
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, AlertTriangle, Smile } from 'lucide-react';
import { PersonalizedRecommendation } from '@/services/healthConditionsService';

interface DietaryRecommendationsProps {
  recommendations: PersonalizedRecommendation[];
}

const DietaryRecommendations: React.FC<DietaryRecommendationsProps> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Dietary Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <AlertTriangle className="h-12 w-12 mb-4" />
            <p className="text-center">
              Please select at least one health condition to see personalized recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {recommendations.map((rec) => (
        <Card key={rec.condition.id}>
          <CardHeader className="bg-health-green-light/10">
            <CardTitle className="text-xl font-bold text-health-green-dark">
              {rec.condition.name} Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Positive behaviors section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium text-lg">Foods You're Already Consuming Right</h3>
                </div>
                {rec.alreadyEating.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rec.alreadyEating.map((food, index) => (
                      <div key={index} className="flex items-center p-2 bg-green-50 rounded-md border border-green-100">
                        <Smile className="h-4 w-4 text-green-500 mr-2" />
                        <span>{food}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    You aren't currently eating any of the recommended foods for this condition.
                  </p>
                )}
              </div>

              {/* Foods to add section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-lg">Foods You Should Add to Your Diet</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rec.shouldAdd.map((food, index) => (
                    <div key={index} className="flex items-center p-2 bg-blue-50 rounded-md border border-blue-100">
                      <span>{food}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foods to avoid that are currently consuming */}
              {rec.currentlyConsuming.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <X className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium text-lg">Foods You Should Reduce or Avoid</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rec.currentlyConsuming.map((food, index) => (
                      <div key={index} className="flex items-center p-2 bg-red-50 rounded-md border border-red-100">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        <span>{food}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General foods to avoid section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium text-lg">Other Foods to Be Cautious With</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {rec.shouldAvoid.map((food, index) => (
                    <div key={index} className="flex items-center p-2 bg-amber-50 rounded-md border border-amber-100">
                      <span>{food}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DietaryRecommendations;
