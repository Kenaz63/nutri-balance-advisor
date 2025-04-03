
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getAllHealthConditions, HealthCondition } from '@/services/healthConditionsService';

interface HealthConditionSelectorProps {
  selectedConditions: string[];
  onSelectCondition: (conditionId: string, isSelected: boolean) => void;
}

const HealthConditionSelector: React.FC<HealthConditionSelectorProps> = ({ 
  selectedConditions, 
  onSelectCondition 
}) => {
  const healthConditions = getAllHealthConditions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Select Your Health Conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthConditions.map((condition) => (
            <div key={condition.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <Checkbox 
                id={condition.id}
                checked={selectedConditions.includes(condition.id)}
                onCheckedChange={(checked) => {
                  onSelectCondition(condition.id, checked === true);
                }}
              />
              <div className="space-y-1">
                <Label 
                  htmlFor={condition.id}
                  className="text-base font-medium cursor-pointer"
                >
                  {condition.name}
                </Label>
                <p className="text-sm text-gray-500">
                  {condition.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthConditionSelector;
