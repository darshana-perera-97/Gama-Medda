import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RotateCcw, Trophy, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function ElephantGame() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });
  const [targetPosition, setTargetPosition] = useState({ x: 65, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [accuracy, setAccuracy] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showTargetHint, setShowTargetHint] = useState(true);

  const generateRandomTarget = () => {
    // Generate random position within reasonable bounds (20% to 80% to keep it visible)
    const randomX = Math.random() * 60 + 20; // 20% to 80%
    const randomY = Math.random() * 60 + 20; // 20% to 80%
    return { x: randomX, y: randomY };
  };

  const handlePlaceEye = () => {
    // Calculate accuracy based on distance from random target position
    const distance = Math.sqrt(
      Math.pow(eyePosition.x - targetPosition.x, 2) + Math.pow(eyePosition.y - targetPosition.y, 2)
    );
    const calculatedAccuracy = Math.max(0, 100 - distance * 2);
    const earnedScore = Math.round(calculatedAccuracy * 10);
    
    setAccuracy(Math.round(calculatedAccuracy));
    setScore(earnedScore);
    setShowResult(true);
  };

  const handlePlayAgain = () => {
    const newTarget = generateRandomTarget();
    setTargetPosition(newTarget);
    setEyePosition({ x: 50, y: 50 });
    setAttempts(3);
    setAccuracy(0);
    setTimeElapsed(0);
    setShowResult(false);
    setScore(0);
    setIsGameStarted(true);
    setShowTargetHint(true);
    
    // Hide the target hint after 1 second
    setTimeout(() => {
      setShowTargetHint(false);
    }, 1000);
  };

  const handleStartGame = () => {
    const newTarget = generateRandomTarget();
    setTargetPosition(newTarget);
    setEyePosition({ x: 50, y: 50 });
    setAttempts(3);
    setAccuracy(0);
    setTimeElapsed(0);
    setShowResult(false);
    setScore(0);
    setIsGameStarted(true);
    setShowTargetHint(true);
    
    // Hide the target hint after 1 second
    setTimeout(() => {
      setShowTargetHint(false);
    }, 1000);
  };

  // Auto-hide target hint after 1 second when game starts
  useEffect(() => {
    if (isGameStarted && showTargetHint) {
      const timer = setTimeout(() => {
        setShowTargetHint(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isGameStarted, showTargetHint]);

  const handleMarkEye = (e) => {
    if (!isGameStarted) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setEyePosition({ x, y });
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isGameStarted ? 'bg-black' : 'bg-gradient-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#fdfdfd]'
    }`}>
      {/* Background Pattern - Only show when game not started */}
      {!isGameStarted && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#dc143c] rounded-full blur-3xl" />
        </div>
      )}

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 transition-opacity duration-500 ${
        isGameStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-[1.5rem] bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-lg"
          >
            <Home className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Game Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-gray-900">{t.elephantGame.title}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t.elephantGame.subtitle}</p>
        </motion.div>

        {/* Game Stage - Hidden when game started */}
      </div>

      {/* Black Game Board - Full Screen */}
      {isGameStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-20 bg-black flex items-center justify-center cursor-crosshair pb-24 sm:pb-28"
          onClick={handleMarkEye}
        >
          {/* Elephant Illustration - Centered */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[15rem] sm:text-[20rem] md:text-[25rem] lg:text-[30rem] opacity-30 select-none">
              🐘
            </div>
          </div>

          {/* Eye Target Area - Shows hint for 1 second, then fades */}
          <motion.div 
            className="absolute w-8 h-8 rounded-full border-2 border-dashed pointer-events-none"
            style={{
              top: `${targetPosition.y}%`,
              left: `${targetPosition.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              borderColor: showTargetHint 
                ? 'rgba(212, 175, 55, 0.2)' 
                : 'rgba(212, 175, 55, 0.01)',
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          />

          {/* Eye Marker - Placed where user clicks */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute pointer-events-none"
            style={{
              left: `${eyePosition.x}%`,
              top: `${eyePosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#dc143c] to-[#d4af37] shadow-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl ring-4 ring-white/20">
              👁️
            </div>
          </motion.div>

          {/* Instructions */}
          <div className="absolute bottom-32 sm:bottom-36 left-1/2 transform -translate-x-1/2 text-white/60 text-sm sm:text-base text-center px-4">
            {t.elephantGame.clickToPlace}
          </div>

          {/* Check Button - Above scoreboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-24 sm:bottom-28 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlaceEye}
              className="px-8 sm:px-12 py-4 sm:py-5 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white text-base sm:text-xl shadow-2xl hover:shadow-3xl transition-all"
            >
                  {t.elephantGame.checkAccuracy}
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Fixed Scoreboard at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-center p-4 sm:p-6"
      >
        <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-t-[1.5rem] sm:rounded-t-[2rem] bg-white/90 backdrop-blur-xl border-t border-x border-white/50 shadow-2xl max-w-2xl w-full">
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{t.elephantGame.attempts}</div>
            <div className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
              {attempts}
            </div>
          </div>
          <div className="w-px h-8 sm:h-10 bg-gray-300" />
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{t.elephantGame.accuracy}</div>
            <div className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[#228b22] to-[#d4af37] bg-clip-text text-transparent">
              {accuracy}%
            </div>
          </div>
          <div className="w-px h-8 sm:h-10 bg-gray-300" />
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{t.elephantGame.time}</div>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-900">{timeElapsed}s</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Start Game Button - Centered */}
      {!isGameStarted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="fixed inset-0 flex items-center justify-center z-30"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleStartGame}
            className="group relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center"
            style={{
              boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4), 0 0 0 0 rgba(212, 175, 55, 0.7)',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37] to-[#dc143c] opacity-30"
            />
            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative z-10 ml-1" fill="currentColor" />
            
            {/* Text Label */}
            <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-sm sm:text-base px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                {t.elephantGame.startGame}
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
            >
              <div
                className="w-full max-w-md p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] text-center"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '24px 24px 48px #d9d9d9, -24px -24px 48px #ffffff',
                }}
              >
                <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">
                  {accuracy >= 80 ? '🎉' : accuracy >= 50 ? '👍' : '😅'}
                </div>
                <h2 className="text-2xl sm:text-4xl mb-3 sm:mb-4 text-gray-900">
                      {accuracy >= 80 ? t.elephantGame.perfectHit : accuracy >= 50 ? t.elephantGame.goodTry : t.elephantGame.tryAgain}
                </h2>
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-6xl bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent mb-2">
                    {accuracy}%
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">{t.elephantGame.accuracyScore}</div>
                </div>
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 px-4 sm:px-6 py-3 sm:py-4 rounded-[1.5rem] bg-[#d4af37]/10">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                      <span className="text-lg sm:text-xl text-gray-900">+{score} {t.elephantGame.bazaarCoins}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handlePlayAgain}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-gradient-to-r from-[#228b22] to-[#d4af37] text-white hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t.elephantGame.playAgain}
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-white text-gray-700 hover:shadow-xl transition-all text-sm sm:text-base"
                    style={{
                      boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                    }}
                  >
                        {t.elephantGame.home}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

