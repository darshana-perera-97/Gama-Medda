import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Search, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';

export function AdminLeaderboard() {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');

  // Mock leaderboard data
  const gameResults = [
    { id: 1, player: 'Saman P.', game: 'Aliyata Asa', score: 2850, rank: 1, date: '2024-01-15', avatar: '👨' },
    { id: 2, player: 'Nimal R.', game: 'Kana Mutti', score: 2650, rank: 2, date: '2024-01-14', avatar: '👨' },
    { id: 3, player: 'Kamala W.', game: 'Lissana Gaha', score: 2400, rank: 3, date: '2024-01-13', avatar: '👩' },
    { id: 4, player: 'Priya S.', game: 'Kotta Pora', score: 2200, rank: 4, date: '2024-01-12', avatar: '👩' },
    { id: 5, player: 'Ravi K.', game: 'Aliyata Asa', score: 2100, rank: 5, date: '2024-01-11', avatar: '👨' },
    { id: 6, player: 'Lakshmi M.', game: 'Kana Mutti', score: 1950, rank: 6, date: '2024-01-10', avatar: '👩' },
    { id: 7, player: 'Dinesh T.', game: 'Lissana Gaha', score: 1800, rank: 7, date: '2024-01-09', avatar: '👨' },
    { id: 8, player: 'Anjali N.', game: 'Kotta Pora', score: 1650, rank: 8, date: '2024-01-08', avatar: '👩' },
  ];

  const games = ['all', 'Aliyata Asa', 'Kana Mutti', 'Lissana Gaha', 'Kotta Pora'];

  const filteredResults = gameResults.filter((result) => {
    const matchesSearch = result.player.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === 'all' || result.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: Trophy, color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-100' };
    if (rank === 2) return { icon: Medal, color: 'from-gray-300 to-gray-500', bg: 'bg-gray-100' };
    if (rank === 3) return { icon: Award, color: 'from-orange-400 to-orange-600', bg: 'bg-orange-100' };
    return { icon: null, color: '', bg: 'bg-gray-50' };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {t.admin.leaderboard.title}
          </h1>
          <p className="text-gray-600">{t.admin.leaderboard.subtitle}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.admin.leaderboard.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
          />
        </div>

        {/* Game Filter */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent appearance-none bg-white"
          >
            {games.map((game) => (
              <option key={game} value={game}>
                {game === 'all' ? t.admin.leaderboard.allGames : game}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#d4af37]/10 to-[#dc143c]/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.leaderboard.rank}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.leaderboard.player}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.leaderboard.game}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.leaderboard.score}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t.admin.leaderboard.date}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((result, index) => {
                const badge = getRankBadge(result.rank);
                return (
                  <motion.tr
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {badge.icon ? (
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
                            <badge.icon className="w-5 h-5 text-white" />
                          </div>
                        ) : (
                          <div className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center`}>
                            <span className="text-gray-700 font-bold">{result.rank}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{result.avatar}</span>
                        <span className="font-medium text-gray-900">{result.player}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{result.game}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-lg bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
                        {result.score.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{new Date(result.date).toLocaleDateString()}</span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="text-sm text-gray-600 mb-1">{t.admin.leaderboard.totalPlayers}</div>
          <div className="text-2xl font-bold text-gray-900">{gameResults.length}</div>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="text-sm text-gray-600 mb-1">{t.admin.leaderboard.totalGames}</div>
          <div className="text-2xl font-bold text-gray-900">{new Set(gameResults.map(r => r.game)).size}</div>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg">
          <div className="text-sm text-gray-600 mb-1">{t.admin.leaderboard.highestScore}</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#dc143c] bg-clip-text text-transparent">
            {Math.max(...gameResults.map(r => r.score)).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

