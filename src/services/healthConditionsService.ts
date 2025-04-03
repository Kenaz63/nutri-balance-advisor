
// Health conditions service with food recommendations

export interface HealthCondition {
  id: string;
  name: string;
  description: string;
  recommendedFoods: string[];
  foodsToAvoid: string[];
}

// Mock health conditions database
const healthConditions: HealthCondition[] = [
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'A disorder where the body does not produce enough insulin or respond properly to insulin, leading to high blood sugar levels.',
    recommendedFoods: [
      'Non-starchy vegetables (spinach, broccoli, green beans)',
      'Whole grains (brown rice, quinoa, barley)',
      'Lean proteins (chicken breast, fish, tofu)',
      'Healthy fats (avocados, nuts, olive oil)',
      'Low-glycemic fruits (berries, apples, pears)',
      'Legumes (chickpeas, lentils, beans)'
    ],
    foodsToAvoid: [
      'Sugary beverages (soda, fruit juice)',
      'Refined grains (white bread, white rice)',
      'Processed sweets (cookies, cakes, candies)',
      'Fried foods and fast food',
      'High-glycemic fruits (watermelon, pineapple)',
      'Alcohol (especially beer and sweet wines)'
    ]
  },
  {
    id: 'hypertension',
    name: 'High Blood Pressure',
    description: 'A condition in which the force of blood against artery walls is consistently too high, which can lead to heart disease.',
    recommendedFoods: [
      'Leafy green vegetables (spinach, kale)',
      'Low-fat dairy products',
      'Berries (blueberries, strawberries)',
      'Potassium-rich foods (bananas, sweet potatoes)',
      'Oily fish (salmon, mackerel)',
      'Garlic and herbs instead of salt'
    ],
    foodsToAvoid: [
      'High-sodium processed foods',
      'Canned soups and vegetables with added salt',
      'Pickled foods',
      'Fatty meats',
      'Fried foods',
      'Caffeine and alcohol'
    ]
  },
  {
    id: 'kidney',
    name: 'Kidney Issues',
    description: 'Problems with kidney function, including chronic kidney disease, which affects the kidneys\' ability to filter waste and excess fluid from the blood.',
    recommendedFoods: [
      'Lower protein options (depending on kidney function)',
      'Low-sodium foods',
      'Water and clear fluids',
      'Cranberry juice (for urinary tract health)',
      'Apple (low in potassium and phosphorus)',
      'Rice and rice products'
    ],
    foodsToAvoid: [
      'High-phosphorus foods (dairy, nuts, whole grains)',
      'High-potassium foods (bananas, oranges, potatoes)',
      'High-sodium foods (processed foods, canned soups)',
      'High-protein foods (if recommended by doctor)',
      'Chocolate',
      'Dark-colored colas'
    ]
  },
  {
    id: 'ulcer',
    name: 'Stomach Ulcer',
    description: 'Painful sores that develop in the lining of the stomach or small intestine, often due to bacterial infection or long-term use of certain medications.',
    recommendedFoods: [
      'Fiber-rich foods (oats, apples)',
      'Probiotic foods (yogurt, kefir)',
      'Non-acidic fruits (bananas, apples)',
      'Vegetables (especially leafy greens)',
      'Lean proteins (chicken, fish)',
      'Healthy fats (olive oil, avocados)'
    ],
    foodsToAvoid: [
      'Spicy foods',
      'Acidic foods (citrus, tomatoes)',
      'Coffee and caffeinated beverages',
      'Alcohol',
      'Chocolate',
      'Fatty and fried foods'
    ]
  }
];

// Get all health conditions
export const getAllHealthConditions = (): HealthCondition[] => {
  return healthConditions;
};

// Get a health condition by ID
export const getHealthConditionById = (id: string): HealthCondition | undefined => {
  return healthConditions.find(condition => condition.id === id);
};

// Get personalized recommendations based on user's health conditions and diet
export interface PersonalizedRecommendation {
  condition: HealthCondition;
  alreadyEating: string[];
  shouldAdd: string[];
  shouldAvoid: string[];
  currentlyConsuming: string[];
}

export const getPersonalizedRecommendations = (
  conditionIds: string[],
  currentDiet: string[] // List of foods the user currently consumes
): PersonalizedRecommendation[] => {
  return conditionIds.map(id => {
    const condition = getHealthConditionById(id);
    
    if (!condition) {
      throw new Error(`Health condition with ID ${id} not found`);
    }
    
    // Find foods they're already eating that are recommended
    const alreadyEating = condition.recommendedFoods.filter(food => 
      currentDiet.some(userFood => userFood.toLowerCase().includes(food.toLowerCase()))
    );
    
    // Find recommended foods they should add
    const shouldAdd = condition.recommendedFoods.filter(food => 
      !currentDiet.some(userFood => userFood.toLowerCase().includes(food.toLowerCase()))
    );
    
    // Check if they're eating foods they should avoid
    const currentlyConsuming = condition.foodsToAvoid.filter(food => 
      currentDiet.some(userFood => userFood.toLowerCase().includes(food.toLowerCase()))
    );
    
    // Foods to avoid that they're not currently eating
    const shouldAvoid = condition.foodsToAvoid.filter(food => 
      !currentDiet.some(userFood => userFood.toLowerCase().includes(food.toLowerCase()))
    );
    
    return {
      condition,
      alreadyEating,
      shouldAdd,
      shouldAvoid,
      currentlyConsuming
    };
  });
};
