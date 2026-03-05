import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, BookOpen, ArrowRight, X } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';

export function CultureCenter() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recipes = [
    {
      id: 1,
      name: t.culture.recipes.kokis.name,
      prepTime: '30 min',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1695279087980-6f3d3102bf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBrb2tpcyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MjY4NjY5OHww&ixlib=rb-4.1.0&q=80&w=800',
      description: t.culture.recipes.kokis.description,
    },
    {
      id: 2,
      name: t.culture.recipes.kondaKavum.name,
      prepTime: '45 min',
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1742281095650-dd3c50c08772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBrYXZ1bSUyMHJlYWxpc3RpYyUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NzI2ODc2MDh8MA&ixlib=rb-4.1.0&q=80&w=800',
      description: t.culture.recipes.kondaKavum.description,
    },
    {
      id: 3,
      name: t.culture.recipes.aluwa.name,
      prepTime: '40 min',
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1561827978-45f07fa822fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjB0cmFkaXRpb25hbCUyMHN3ZWV0cyUyMGthdnVtfGVufDF8fHx8MTc3MjY4NjY5OHww&ixlib=rb-4.1.0&q=80&w=800',
      description: t.culture.recipes.aluwa.description,
    },
    {
      id: 4,
      name: t.culture.recipes.kiribath.name,
      prepTime: '25 min',
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1561827978-45f07fa822fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjB0cmFkaXRpb25hbCUyMHN3ZWV0cyUyMGthdnVtfGVufDF8fHx8MTc3MjY4NjY5OHww&ixlib=rb-4.1.0&q=80&w=800',
      description: t.culture.recipes.kiribath.description,
    },
    {
      id: 5,
      name: t.culture.recipes.athirasa.name,
      prepTime: '50 min',
      difficulty: 'Hard',
      image: 'https://images.unsplash.com/photo-1695279087980-6f3d3102bf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBrb2tpcyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc3MjY4NjY5OHww&ixlib=rb-4.1.0&q=80&w=800',
      description: t.culture.recipes.athirasa.description,
    },
  ];

  const rituals = [
    {
      id: 1,
      title: t.culture.rituals.lightOilLamp.title,
      description: t.culture.rituals.lightOilLamp.description,
      time: '09:42 AM',
      icon: '🪔',
    },
    {
      id: 2,
      title: t.culture.rituals.milkRice.title,
      description: t.culture.rituals.milkRice.description,
      time: '11:32 AM',
      icon: '🍚',
    },
    {
      id: 3,
      title: t.culture.rituals.firstTransaction.title,
      description: t.culture.rituals.firstTransaction.description,
      time: '06:42 AM',
      icon: '💰',
    },
    {
      id: 4,
      title: t.culture.rituals.anointingOil.title,
      description: t.culture.rituals.anointingOil.description,
      time: '04:45 PM',
      icon: '✨',
    },
    {
      id: 5,
      title: t.culture.rituals.workCommencement.title,
      description: t.culture.rituals.workCommencement.description,
      time: '02:18 PM',
      icon: '⚙️',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Culture & Recipes Center',
    description: 'Learn about Sinhala and Tamil New Year traditions, rituals, and authentic recipes',
    url: 'https://avuruduulela.lk/culture',
  };

  return (
    <>
      <SEO
        title="Culture & Recipes Center"
        description="Explore authentic Sinhala and Tamil New Year recipes including Kokis, Kavum, Kiribath, and Aluwa. Learn about traditional rituals, Nakath times, and cultural significance."
        keywords="New Year recipes, Traditional food, Kokis recipe, Kavum recipe, Kiribath, Aluwa, New Year rituals, Nakath times, Cultural traditions"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-[#fdfdfd] bg-gradient-to-b from-[#fdfdfd] to-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-3 text-gray-900 font-semibold">
            {t.culture.title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto sm:mx-0">
            {t.culture.subtitle}
          </p>
        </motion.div>

        {/* Recipe Cards - Masonry Grid */}
        <section className="mb-10 sm:mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-5 sm:mb-8 md:mb-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 md:mb-3 text-gray-900 font-semibold">
              {t.culture.recipeCollection}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {t.culture.recipeSubtitle}
            </p>
          </motion.div>

          <Masonry 
            columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}
            gutter="12px"
            className="[&>div]:gap-3 sm:[&>div]:gap-4 md:[&>div]:gap-6"
          >
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden cursor-pointer mb-3 sm:mb-4 md:mb-6"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
                }}
              >
                {/* Image */}
                <div className="relative h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{
                      filter: 'contrast(1.1) saturate(1.2)',
                    }}
                    loading="lazy"
                  />
                  
                  {/* Glassmorphic overlay button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6">
                      <button 
                        onClick={() => {
                          setSelectedRecipe(recipe);
                          setIsModalOpen(true);
                        }}
                        className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all flex items-center gap-1.5 sm:gap-2 shadow-xl text-[10px] sm:text-xs md:text-sm font-medium"
                      >
                        {t.culture.viewRecipe}
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 text-gray-900 font-semibold line-clamp-1">
                    {recipe.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="font-medium">{recipe.prepTime}</span>
                    {recipe.difficulty && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="capitalize">{recipe.difficulty}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </section>

        {/* Rituals & Meanings - List View */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-5 sm:mb-8 md:mb-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2 md:mb-3 text-gray-900 font-semibold">
              {t.culture.ritualsTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              {t.culture.ritualsSubtitle}
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {rituals.map((ritual, index) => (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="group flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] hover:shadow-2xl transition-all cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                }}
              >
                {/* 3D Icon */}
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-gradient-to-br from-[#d4af37]/20 to-[#dc143c]/20 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl"
                    style={{
                      boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.8)',
                    }}
                  >
                    {ritual.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3 gap-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold pr-2">
                      {ritual.title}
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#dc143c]/10 w-fit flex-shrink-0">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#d4af37] flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium whitespace-nowrap">
                        {ritual.time}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 leading-relaxed">
                    {ritual.description}
                  </p>
                  <button className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent hover:opacity-70 transition-opacity font-medium">
                    <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                    <span>{t.culture.readMore}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" style={{ color: '#dc143c' }} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="h-6 sm:h-10 md:h-16" />
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRecipe && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
              <div
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] p-6 sm:p-8 md:p-10 relative pointer-events-auto recipe-modal-scrollbar"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '24px 24px 48px rgba(0,0,0,0.2), -24px -24px 48px rgba(255,255,255,0.8)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Recipe Image */}
                <div className="relative h-48 sm:h-64 md:h-80 rounded-[1.5rem] overflow-hidden mb-6 sm:mb-8">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Recipe Header */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-gray-900 font-bold">
                    {selectedRecipe.name}
                  </h2>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                      <span className="text-sm sm:text-base text-gray-700">{selectedRecipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#dc143c]" />
                      <span className="text-sm sm:text-base text-gray-700">{selectedRecipe.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Recipe Description */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {selectedRecipe.description}
                  </p>
                </div>

                {/* Recipe Details */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-900 font-semibold">
                      {t.culture.ingredients}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {getRecipeIngredients(selectedRecipe.id, t).map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3">
                          <span className="text-[#d4af37] mt-1.5">•</span>
                          <span className="text-sm sm:text-base text-gray-700 flex-1">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-gray-900 font-semibold">
                      {t.culture.instructions}
                    </h3>
                    <ol className="space-y-3 sm:space-y-4">
                      {getRecipeInstructions(selectedRecipe.id, t).map((step, index) => (
                        <li key={index} className="flex items-start gap-3 sm:gap-4">
                          <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-sm sm:text-base text-gray-700 flex-1 pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

// Helper function to get recipe ingredients
function getRecipeIngredients(recipeId, t) {
  const recipeMap = {
    1: t.culture.recipes.kokis,
    2: t.culture.recipes.kondaKavum,
    3: t.culture.recipes.aluwa,
    4: t.culture.recipes.kiribath,
    5: t.culture.recipes.athirasa,
  };
  return recipeMap[recipeId]?.ingredients || [];
}

// Helper function to get recipe instructions
function getRecipeInstructions(recipeId, t) {
  const recipeMap = {
    1: t.culture.recipes.kokis,
    2: t.culture.recipes.kondaKavum,
    3: t.culture.recipes.aluwa,
    4: t.culture.recipes.kiribath,
    5: t.culture.recipes.athirasa,
  };
  return recipeMap[recipeId]?.instructions || [];
}

