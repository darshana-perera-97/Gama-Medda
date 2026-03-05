import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { SEO } from '../../components/SEO';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError(t.admin.login.invalidCredentials);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <SEO
        title="Admin Login"
        description="Admin login page for Avurudu Ulela Digital Village"
        noindex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] via-[#f5f5f5] to-[#f0f0f0] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div
          className="p-8 sm:p-10 rounded-[2rem]"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
          }}
        >
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4af37] to-[#dc143c] flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t.admin.login.title}
            </h1>
            <p className="text-sm text-gray-600">{t.admin.login.subtitle}</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.admin.login.username}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all"
                  placeholder={t.admin.login.usernamePlaceholder}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.admin.login.password}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all"
                  placeholder={t.admin.login.passwordPlaceholder}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#dc143c] text-white font-medium hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.admin.login.loggingIn}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{t.admin.login.loginButton}</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials - Only show in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                <strong>{t.admin.login.demoCredentials}:</strong>{' '}
                {process.env.REACT_APP_ADMIN_USERNAME || 'admin'} /{' '}
                {process.env.REACT_APP_ADMIN_PASSWORD ? '••••••' : 'admin123'}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
    </>
  );
}

