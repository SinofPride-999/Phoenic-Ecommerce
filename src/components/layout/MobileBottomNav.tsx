import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingBag, User, ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      name: 'Home',
      icon: Home,
      path: '/',
      badge: null
    },
    {
      name: 'Shop',
      icon: ShoppingCart,
      path: '/shop',
      badge: null
    },
    {
      name: 'Cart',
      icon: ShoppingBag,
      path: '/shopping-bag',
      badge: '0'
    },
    {
      name: 'Profile',
      icon: User,
      path: '/profile',
      badge: null
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
    >
      {/* iOS-style glass dock with liquid effect */}
      <div
        className="rounded-3xl p-2.5 overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 20px 30px rgba(0, 0, 0, 0.15),
            inset 0 -5px 10px rgba(255, 255, 255, 0.5),
            inset 0 5px 10px rgba(255, 255, 255, 0.2)
          `,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);

            return (
              <motion.button
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                  active
                    ? 'bg-white/40 text-red-600'
                    : 'text-gray-600 hover:text-red-500'
                }`}
                whileTap={{ scale: 0.92 }}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {tab.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium text-[10px] shadow-sm"
                    >
                      {tab.badge}
                    </motion.span>
                  )}
                </div>

                {/* Active indicator with liquid effect */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-red-600 rounded-full shadow-sm"
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MobileBottomNav;
