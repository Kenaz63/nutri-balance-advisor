
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-health-green-light/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Personalized Guide to <span className="text-health-green">Better Nutrition</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track your daily nutrients, discover deficiencies, and get personalized dietary 
              recommendations based on your health conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-health-green hover:bg-health-green-dark text-white px-8"
              >
                <Link to="/nutrition">
                  Track Your Nutrition
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-health-green text-health-green hover:bg-health-green/10"
              >
                <Link to="/health-conditions">
                  Health Recommendations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How HealthyYou Helps You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-health-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-health-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Daily Nutrients</h3>
              <p className="text-gray-600">
                Log your daily food intake and track your macro and micronutrients with an 
                easy-to-use interface.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-health-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-health-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze Deficiencies</h3>
              <p className="text-gray-600">
                Identify nutritional gaps in your diet by comparing your intake to recommended daily allowances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="bg-health-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-health-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Recommendations</h3>
              <p className="text-gray-600">
                Get food recommendations tailored to your health conditions and specific dietary needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-health-green-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Health Journey Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Take control of your nutrition and make informed dietary choices based on your health conditions.
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-health-green-dark hover:bg-gray-100 px-8"
          >
            <Link to="/nutrition">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
