
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home,
  Heart,
  User,
  Menu,
  X
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-health-green p-1 rounded-md">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-health-green">HealthyYou</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-health-green flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/nutrition" className="text-gray-700 hover:text-health-green flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Nutrition Tracker</span>
            </Link>
            <Link to="/health-conditions" className="text-gray-700 hover:text-health-green flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Health Conditions</span>
            </Link>
            <Button className="bg-health-green hover:bg-health-green-dark text-white">
              Get Started
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-60" : "max-h-0"
        )}>
          <nav className="flex flex-col p-4 space-y-4 border-t border-gray-200">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-700 hover:text-health-green p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/nutrition" 
              className="flex items-center gap-2 text-gray-700 hover:text-health-green p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Nutrition Tracker</span>
            </Link>
            <Link 
              to="/health-conditions" 
              className="flex items-center gap-2 text-gray-700 hover:text-health-green p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-4 w-4" />
              <span>Health Conditions</span>
            </Link>
            <Button 
              className="bg-health-green hover:bg-health-green-dark text-white w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 HealthyYou. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
