import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function PillowFightGame() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [playerStamina, setPlayerStamina] = useState(100);
  const [opponentStamina, setOpponentStamina] = useState(100);
  const [balance, setBalance] = useState(50); // 50 = centered, 0 = left fall, 100 = right fall
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isOpponentAttacking, setIsOpponentAttacking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState(null);

  // Opponent AI
  useEffect(() => {
    if (showResult) return;

    const opponentInterval = setInterval(() => {
      const action = Math.random();
      if (action > 0.7) {
        // Opponent attacks
        setIsOpponentAttacking(true);
        setPlayerStamina((prev) => Math.max(0, prev - 10));
        setBalance((prev) => Math.max(0, prev - 15));
        setTimeout(() => setIsOpponentAttacking(false), 500);
      }
    }, 2000);

    return () => clearInterval(opponentInterval);
  }, [showResult]);

  // Check game over
  useEffect(() => {
    if (playerStamina <= 0 || balance <= 0) {
      setWinner('opponent');
      setShowResult(true);
    } else if (opponentStamina <= 0 || balance >= 100) {
      setWinner('player');
      setShowResult(true);
    }
  }, [playerStamina, opponentStamina, balance]);

  // Balance naturally drifts back to center
  useEffect(() => {
    if (showResult) return;

    const balanceInterval = setInterval(() => {
      setBalance((prev) => {
        if (prev < 50) return Math.min(50, prev + 1);
        if (prev > 50) return Math.max(50, prev - 1);
        return prev;
      });
    }, 100);

    return () => clearInterval(balanceInterval);
  }, [showResult]);

  const handleAttack = () => {
    if (isPlayerAttacking || showResult) return;
    
    setIsPlayerAttacking(true);
    setOpponentStamina((prev) => Math.max(0, prev - 15));
    setBalance((prev) => Math.min(100, prev + 15));
    setTimeout(() => setIsPlayerAttacking(false), 500);
  };

  const handleBalance = () => {
    if (showResult) return;
    
    setBalance((prev) => {
      if (prev < 50) return Math.min(50, prev + 10);
      if (prev > 50) return Math.max(50, prev - 10);
      return prev;
    });
  };

  const handlePlayAgain = () => {
    setPlayerStamina(100);
    setOpponentStamina(100);
    setBalance(50);
    setShowResult(false);
    setWinner(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#fdfdfd] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#dc143c] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#228b22] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-gray-900">{t.pillowFightGame.title}</h1>
          <p className="text-sm sm:text-base text-gray-600">Balance and strike to win!</p>
        </motion.div>

        {/* Game Stage - 1v1 View */}
        <div className="relative max-w-5xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative p-6 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem]"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '16px 16px 32px #d9d9d9, -16px -16px 32px #ffffff',
            }}
          >
            {/* Log Balance Platform */}
            <div className="relative mb-8 sm:mb-16">
              {/* Log */}
              <div
                className="w-full h-6 sm:h-8 rounded-full mx-auto"
                style={{
                  background: 'linear-gradient(90deg, #8b4513, #654321, #8b4513)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transform: `rotate(${(balance - 50) * 0.2}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              />

              {/* Players on Log */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 sm:px-12">
                {/* Player */}
                <motion.div
                  animate={{
                    y: balance < 20 ? 20 : 0,
                    rotate: balance < 20 ? -20 : 0,
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      scale: isPlayerAttacking ? 1.2 : 1,
                      rotate: isPlayerAttacking ? -45 : 0,
                    }}
                    className="text-4xl sm:text-6xl"
                  >
                    🧑
                  </motion.div>
                  {isOpponentAttacking && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-red-500/30 rounded-full"
                    />
                  )}
                </motion.div>

                {/* Opponent */}
                <motion.div
                  animate={{
                    y: balance > 80 ? 20 : 0,
                    rotate: balance > 80 ? 20 : 0,
                  }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      scale: isOpponentAttacking ? 1.2 : 1,
                      rotate: isOpponentAttacking ? 45 : 0,
                    }}
                    className="text-4xl sm:text-6xl"
                  >
                    🧑
                  </motion.div>
                  {isPlayerAttacking && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-red-500/30 rounded-full"
                    />
                  )}
                </motion.div>
              </div>
            </div>

            {/* Balance Bar */}
            <div className="mb-4 sm:mb-8">
              <div className="text-center text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Balance</div>
              <div className="relative h-5 sm:h-6 rounded-full bg-gray-200 overflow-hidden">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400" />
                <motion.div
                  className="absolute top-0 bottom-0 w-5 sm:w-6 rounded-full bg-gradient-to-r from-[#dc143c] to-[#d4af37] shadow-lg"
                  animate={{ 
                    left: `calc(${balance}% - 0.625rem)` 
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 sm:gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAttack}
            disabled={isPlayerAttacking || showResult}
            className={`flex flex-col items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-white shadow-2xl transition-all ${
              isPlayerAttacking || showResult
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#dc143c] to-[#d4af37]'
            }`}
          >
            <div className="text-3xl sm:text-4xl">🛏️</div>
            <span className="text-xs sm:text-sm">Attack</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBalance}
            disabled={showResult}
            className={`flex flex-col items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-white shadow-2xl transition-all ${
              showResult
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#228b22] to-[#d4af37]'
            }`}
          >
            <div className="text-3xl sm:text-4xl">🪵</div>
            <span className="text-xs sm:text-sm">Balance</span>
          </motion.button>
        </div>
      </div>

      {/* Fixed Scoreboard at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-center p-4 sm:p-6"
      >
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-t-[1.5rem] sm:rounded-t-[2rem] bg-white/90 backdrop-blur-xl border-t border-x border-white/50 shadow-2xl max-w-2xl w-full">
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-2">{t.pillowFightGame.you}</div>
            <div className="w-24 sm:w-32 md:w-40 h-3 sm:h-4 rounded-full bg-gray-200 overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-[#228b22] to-[#d4af37]"
                animate={{ width: `${playerStamina}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-2">{t.pillowFightGame.opponent}</div>
            <div className="w-24 sm:w-32 md:w-40 h-3 sm:h-4 rounded-full bg-gray-200 overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-[#dc143c] to-[#d4af37]"
                animate={{ width: `${opponentStamina}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

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
                  {winner === 'player' ? '🎉' : '😓'}
                </div>
                <h2 className="text-2xl sm:text-4xl mb-3 sm:mb-4 text-gray-900">
                  {winner === 'player' ? 'Victory!' : 'Defeated!'}
                </h2>
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-6xl bg-gradient-to-r from-[#dc143c] to-[#d4af37] bg-clip-text text-transparent mb-2">
                    {winner === 'player' ? 'Winner' : 'Try Again'}
                  </div>
                </div>
                {winner === 'player' && (
                  <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 px-4 sm:px-6 py-3 sm:py-4 rounded-[1.5rem] bg-[#d4af37]/10">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                    <span className="text-lg sm:text-xl text-gray-900">+800 Bazaar Coins</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handlePlayAgain}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-gradient-to-r from-[#228b22] to-[#d4af37] text-white hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.pillowFightGame.playAgain}
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-white text-gray-700 hover:shadow-xl transition-all text-sm sm:text-base"
                    style={{
                      boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                    }}
                  >
                    {t.pillowFightGame.home}
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

