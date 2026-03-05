import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function PotsGame() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [power, setPower] = useState(50);
  const [powerDirection, setPowerDirection] = useState('up');
  const [pots, setPots] = useState([
    { id: 1, broken: false },
    { id: 2, broken: false },
    { id: 3, broken: false },
    { id: 4, broken: false },
    { id: 5, broken: false },
  ]);
  const [isSwinging, setIsSwinging] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(5);

  // Power meter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPower((prev) => {
        if (prev >= 95 && powerDirection === 'up') {
          setPowerDirection('down');
          return prev - 2;
        } else if (prev <= 5 && powerDirection === 'down') {
          setPowerDirection('up');
          return prev + 2;
        }
        return powerDirection === 'up' ? prev + 2 : prev - 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [powerDirection]);

  const handleStrike = () => {
    if (isSwinging || attempts === 0) return;

    setIsSwinging(true);
    setAttempts((prev) => prev - 1);

    // Check if hit is in good range (70-90%)
    if (power >= 70 && power <= 90) {
      // Break a random unbroken pot
      const unbrokenPots = pots.filter((p) => !p.broken);
      if (unbrokenPots.length > 0) {
        const randomPot = unbrokenPots[Math.floor(Math.random() * unbrokenPots.length)];
        setPots((prev) =>
          prev.map((p) => (p.id === randomPot.id ? { ...p, broken: true } : p))
        );
        setScore((prev) => prev + 200);
      }
    }

    setTimeout(() => {
      setIsSwinging(false);
      if (attempts === 1 || pots.filter((p) => p.broken).length === 5) {
        setTimeout(() => setShowResult(true), 500);
      }
    }, 800);
  };

  const handlePlayAgain = () => {
    setPots([
      { id: 1, broken: false },
      { id: 2, broken: false },
      { id: 3, broken: false },
      { id: 4, broken: false },
      { id: 5, broken: false },
    ]);
    setScore(0);
    setAttempts(5);
    setShowResult(false);
    setPower(50);
  };

  const brokenCount = pots.filter((p) => p.broken).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#fdfdfd] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#dc143c] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#228b22] rounded-full blur-3xl" />
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-gray-900">{t.potsGame.title}</h1>
          <p className="text-sm sm:text-base text-gray-600">{t.potsGame.subtitle}</p>
        </motion.div>

        {/* Game Stage */}
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
            {/* Rope */}
            <div className="absolute top-6 sm:top-12 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

            {/* Pots */}
            <div className="flex justify-around items-start mb-16 sm:mb-32 flex-wrap gap-4">
              {pots.map((pot, index) => (
                <motion.div
                  key={pot.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {/* String */}
                  <div className="w-0.5 h-12 sm:h-16 bg-gray-400 mb-2" />

                  {/* Pot */}
                  <AnimatePresence mode="wait">
                    {!pot.broken ? (
                      <motion.div
                        key="pot"
                        initial={{ scale: 1, rotate: 0 }}
                        animate={
                          isSwinging
                            ? {
                                rotate: [0, -10, 10, -5, 5, 0],
                                transition: { duration: 0.5 },
                              }
                            : { scale: 1 }
                        }
                        exit={{
                          scale: 0,
                          rotate: 45,
                          opacity: 0,
                          transition: { duration: 0.3 },
                        }}
                        className="text-4xl sm:text-6xl"
                      >
                        🏺
                      </motion.div>
                    ) : (
                      <motion.div
                        key="broken"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex gap-2"
                      >
                        <motion.span
                          initial={{ x: 0, y: 0 }}
                          animate={{ x: -20, y: 20, rotate: -45 }}
                          className="text-xl sm:text-2xl"
                        >
                          🪨
                        </motion.span>
                        <motion.span
                          initial={{ x: 0, y: 0 }}
                          animate={{ x: 20, y: 20, rotate: 45 }}
                          className="text-xl sm:text-2xl"
                        >
                          🪨
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Stick (appears during swing) */}
            {isSwinging && (
              <motion.div
                initial={{ rotate: -45, x: -100 }}
                animate={{ rotate: 45, x: 100 }}
                className="absolute bottom-16 sm:bottom-32 left-1/2 origin-bottom"
                style={{ transformOrigin: 'bottom left' }}
              >
                <div className="w-2 h-24 sm:h-32 bg-gradient-to-t from-[#8b4513] to-[#a0522d] rounded-full" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Power Meter */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="mb-3 sm:mb-4 text-center text-xs sm:text-sm text-gray-600">Power Meter</div>
          <div
            className="relative h-6 sm:h-8 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #e0e0e0, #f5f5f5)',
              boxShadow: 'inset 6px 6px 12px #d0d0d0, inset -6px -6px 12px #ffffff',
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${power}%`,
                background:
                  power >= 70 && power <= 90
                    ? 'linear-gradient(90deg, #228b22, #d4af37)'
                    : 'linear-gradient(90deg, #dc143c, #d4af37)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs text-gray-700">{Math.round(power)}%</div>
            </div>
          </div>
        </div>

        {/* Strike Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStrike}
            disabled={isSwinging || attempts === 0}
            className={`px-12 sm:px-16 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-white text-base sm:text-xl shadow-2xl transition-all ${
              isSwinging || attempts === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#dc143c] to-[#d4af37] hover:shadow-3xl'
            }`}
          >
            Strike!
          </motion.button>
        </div>
      </div>

      {/* Fixed Scoreboard at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-center p-4 sm:p-6"
      >
        <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-t-[1.5rem] sm:rounded-t-[2rem] bg-white/90 backdrop-blur-xl border-t border-x border-white/50 shadow-2xl max-w-2xl w-full">
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{t.potsGame.attempts}</div>
            <div className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[#dc143c] to-[#d4af37] bg-clip-text text-transparent">
              {attempts}
            </div>
          </div>
          <div className="w-px h-8 sm:h-10 bg-gray-300" />
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{t.potsGame.broken}</div>
            <div className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[#228b22] to-[#d4af37] bg-clip-text text-transparent">
              {brokenCount}/5
            </div>
          </div>
          <div className="w-px h-8 sm:h-10 bg-gray-300" />
          <div className="text-center flex-1">
            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">{t.potsGame.score}</div>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-900">{score}</div>
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
                  {brokenCount >= 4 ? '🎉' : brokenCount >= 2 ? '👍' : '😅'}
                </div>
                <h2 className="text-2xl sm:text-4xl mb-3 sm:mb-4 text-gray-900">
                  {brokenCount >= 4 ? 'Excellent!' : brokenCount >= 2 ? 'Good Job!' : 'Try Again!'}
                </h2>
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl sm:text-6xl bg-gradient-to-r from-[#dc143c] to-[#d4af37] bg-clip-text text-transparent mb-2">
                    {brokenCount}/5
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">{t.potsGame.broken}</div>
                </div>
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 px-4 sm:px-6 py-3 sm:py-4 rounded-[1.5rem] bg-[#d4af37]/10">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4af37]" />
                  <span className="text-lg sm:text-xl text-gray-900">+{score} Bazaar Coins</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handlePlayAgain}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-gradient-to-r from-[#228b22] to-[#d4af37] text-white hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t.potsGame.playAgain}
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 sm:py-4 rounded-[1.5rem] bg-white text-gray-700 hover:shadow-xl transition-all text-sm sm:text-base"
                    style={{
                      boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                    }}
                  >
                    {t.potsGame.home}
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

