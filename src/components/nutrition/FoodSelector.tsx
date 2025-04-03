
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { FoodItem, getAllFoods } from '@/services/nutritionService';

interface FoodSelectorProps {
  onAddFood: (food: FoodItem, mealType: string) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onAddFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  const allFoods = getAllFoods();

  // Filter foods based on search and category
  const filteredFoods = allFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'meats', label: 'Meats' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'grains', label: 'Grains' },
    { value: 'sweets', label: 'Sweets' },
    { value: 'other', label: 'Other' },
  ];

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snacks', label: 'Snacks' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add Food</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMealType} onValueChange={setSelectedMealType}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Meal" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map(meal => (
                  <SelectItem key={meal.value} value={meal.value}>
                    {meal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md overflow-hidden max-h-64 overflow-y-auto">
            {filteredFoods.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No foods found matching your search
              </div>
            ) : (
              <div className="divide-y">
                {filteredFoods.map(food => (
                  <div 
                    key={food.id} 
                    className="flex justify-between items-center p-3 hover:bg-gray-50"
                  >
                    <div>
                      <h4 className="font-medium">{food.name}</h4>
                      <p className="text-xs text-gray-500">{food.servingSize} | {food.calories} kcal</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAddFood(food, selectedMealType)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodSelector;
