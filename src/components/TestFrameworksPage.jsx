import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FrameworkComparison from './FrameworkComparison'
import PlaywrightLangCompare from './PlaywrightLangCompare'
import { useLanguage } from '../context/LanguageContext'

function TestFrameworksPage() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })
    const [activeSection, setActiveSection] = useState(0)
    const { language, toggleLanguage } = useLanguage()
    const navigate = useNavigate()

    const sections = [
        { label: '🔍 Framework Karşılaştırma', labelEn: '🔍 Framework Comparison' },
        { label: '🎭 Playwright Dil Karşılaştırma', labelEn: '🎭 Playwright Language Compare' },
    ]

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <header className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
                <div className="container mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/python')}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 ${darkMode
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                        }`}
                    >
                        ← {language === 'tr' ? 'Python Sayfasına Dön' : 'Back to Python'}
                    </button>

                    <div className="flex items-center gap-2">
                        <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
                            🧪 Test Frameworks
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex bg-white rounded-lg overflow-hidden">
                            <button
                                onClick={() => language === 'tr' && toggleLanguage()}
                                className={`px-4 py-2 font-semibold transition-all ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                ENG
                            </button>
                            <button
                                onClick={() => language === 'en' && toggleLanguage()}
                                className={`px-4 py-2 font-semibold transition-all ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                            >
                                TR
                            </button>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${darkMode
                                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                        >
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className={`sticky top-16 z-40 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white border-b border-gray-200'}`}>
                <div className="container mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
                    {sections.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveSection(i)}
                            className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${activeSection === i
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                                : darkMode
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                        >
                            {language === 'tr' ? s.label : s.labelEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-4 md:px-6 py-8">
                {activeSection === 0 && <FrameworkComparison darkMode={darkMode} />}
                {activeSection === 1 && <PlaywrightLangCompare darkMode={darkMode} />}
            </main>

            {/* Home button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Başa dön"
                style={{
                    position: 'fixed', bottom: '24px', right: '24px',
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: '#7c3aed', color: '#fff', border: 'none',
                    cursor: 'pointer', fontSize: '20px', zIndex: 999,
                    boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                ↑
            </button>
        </div>
    )
}

export default TestFrameworksPage
