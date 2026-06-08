import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function TopicHeader({ darkMode, setDarkMode }) {
    const { language, t, toggleLanguage } = useLanguage()
    const navigate = useNavigate()

    return (
        <header className={`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/')}
                        data-testid="topic-back-btn"
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${darkMode
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                            }`}
                    >
                        {t('pages.backButton')}
                    </button>

                    <div className="flex gap-3">
                        <div className="flex bg-white rounded-lg overflow-hidden" data-testid="language-toggle">
                            <button
                                onClick={() => language === 'tr' && toggleLanguage()}
                                className={`px-4 py-2 font-semibold transition-all duration-300 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                ENG
                            </button>
                            <button
                                onClick={() => language === 'en' && toggleLanguage()}
                                className={`px-4 py-2 font-semibold transition-all duration-300 ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                TR
                            </button>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            data-testid="dark-mode-toggle"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${darkMode
                                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                }`}
                        >
                            {darkMode ? `☀️ ${t('buttons.lightMode')}` : `🌙 ${t('buttons.darkMode')}`}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopicHeader
