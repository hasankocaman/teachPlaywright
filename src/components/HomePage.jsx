import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import BasicElements from './BasicElements'
import ComplexInteractions from './ComplexInteractions'
import AdvancedScenarios from './AdvancedScenarios'
import DataTable from './DataTable'
import APISimulation from './APISimulation'
import FrameworkComparison from './FrameworkComparison'
import LocatorGuide from './LocatorGuide'
import Practice from './Practice'
import PlaywrightLangCompare from './PlaywrightLangCompare'

function HomePage() {
    const { language, t, toggleLanguage } = useLanguage()
    const navigate = useNavigate()
    const [activeSection, setActiveSection] = useState('basic')
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const sections = [
        { id: 'basic',        name: t('nav.basic'),       shortName: '📝 Temel' },
        { id: 'locator-guide',name: t('nav.locatorGuide'),shortName: '🎯 Locator' },
        { id: 'complex',      name: t('nav.complex'),     shortName: '🎯 Karmaşık' },
        { id: 'advanced',     name: t('nav.advanced'),    shortName: '🚀 Gelişmiş' },
        { id: 'table',        name: t('nav.table'),       shortName: '📊 Tablo' },
        { id: 'api',          name: t('nav.api'),         shortName: '🌐 API' },
        { id: 'comparison',   name: t('nav.comparison'),  shortName: '🔍 Araçlar' },
        { id: 'lang-compare', name: language === 'tr' ? '🔀 3 Dil Karşılaştır' : '🔀 3-Language Compare', shortName: '🔀 3 Dil' },
        { id: 'practice',     name: t('nav.practice') || '🛠️ Uygulama Bahçesi', shortName: '🛠️ Pratik' },
    ]

    const renderSection = () => {
        switch (activeSection) {
            case 'basic':
                return <BasicElements darkMode={darkMode} />
            case 'locator-guide':
                return <LocatorGuide darkMode={darkMode} />
            case 'complex':
                return <ComplexInteractions darkMode={darkMode} />
            case 'advanced':
                return <AdvancedScenarios darkMode={darkMode} />
            case 'table':
                return <DataTable darkMode={darkMode} />
            case 'api':
                return <APISimulation darkMode={darkMode} />
            case 'comparison':
                return <FrameworkComparison darkMode={darkMode} />
            case 'lang-compare':
                return <PlaywrightLangCompare darkMode={darkMode} />
            case 'practice':
                return <Practice darkMode={darkMode} onHomeClick={() => setActiveSection('basic')} />
            default:
                return <BasicElements darkMode={darkMode} />
        }
    }

    const topicBtn = (route, label, activeColor) => (
        <button
            onClick={() => navigate(route)}
            data-testid={`nav${route.replace('/', '-')}`}
            className={`px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base whitespace-nowrap transition-all duration-300 ${darkMode
                ? `bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-102`
                : `bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102`
                }`}
        >
            {label}
        </button>
    )

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
            {/* Header */}
            <header className={`shadow-2xl transition-colors duration-300 sticky top-0 z-50 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                <div className="container mx-auto px-3 py-3 md:px-6 md:py-6">
                    <div className="flex justify-between items-center gap-2">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            title={t('buttons.homeTooltip')}
                            className={`text-2xl md:text-4xl hover:scale-110 transition-transform duration-200 cursor-pointer flex-shrink-0 ${darkMode ? 'hover:text-yellow-400' : 'hover:text-yellow-300'}`}
                        >
                            🏠
                        </button>
                        <div className="flex-1 text-center min-w-0">
                            <h1 className={`text-lg sm:text-2xl md:text-4xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-white'}`} data-testid="main-title">
                                {t('header.title')}
                            </h1>
                            <p className={`text-xs md:text-lg hidden sm:block mt-0.5 ${darkMode ? 'text-gray-300' : 'text-indigo-100'}`}>
                                {t('header.subtitle')}
                            </p>
                        </div>
                        <div className="flex gap-1.5 md:gap-3 flex-shrink-0">
                            <div className="flex bg-white rounded-lg overflow-hidden" data-testid="language-toggle">
                                <button
                                    onClick={() => language === 'tr' && toggleLanguage()}
                                    className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    ENG
                                </button>
                                <button
                                    onClick={() => language === 'en' && toggleLanguage()}
                                    className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${language === 'tr' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                                >
                                    TR
                                </button>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                data-testid="dark-mode-toggle"
                                className={`px-2 md:px-4 py-1 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                            >
                                {darkMode ? `☀️ ` : `🌙 `}
                                <span className="hidden md:inline">{darkMode ? t('buttons.lightMode') : t('buttons.darkMode')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className={`shadow-md sticky top-0 z-40 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} data-testid="main-navigation">
                <div className="container mx-auto px-2 md:px-6">
                    <div className="flex flex-wrap gap-1 md:gap-2 py-2 md:py-4 md:justify-center">

                        {/* ── Dış Bağlantılar ─────────────────────────── */}
                        <a href="https://hasankocaman.github.io/teach-Cypress/"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            <span className="sm:hidden">Cypress</span>
                            <span className="hidden sm:inline">{language === 'tr' ? 'Cypress Öğren' : 'Learn Cypress'}</span>
                        </a>
                        <a href="https://hasankocaman.github.io/teachPlaywright/"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            <span className="sm:hidden">Playwright</span>
                            <span className="hidden sm:inline">{language === 'tr' ? 'Playwright Öğren' : 'Learn Playwright'}</span>
                        </a>
                        <a href="https://hasankocaman.github.io/boltJSTScompare/"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            <span className="sm:hidden">JS↔TS</span>
                            <span className="hidden sm:inline">{language === 'tr' ? 'JavaScript ve TypeScript Karşılaştırma' : 'JavaScript and TypeScript compare'}</span>
                        </a>

                        {/* Ayırıcı: mobilde yatay çizgi, masaüstünde dikey */}
                        <div className={`w-full md:hidden h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        <div className={`hidden md:block w-px h-8 self-center mx-1 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />

                        {/* ── Konu Sayfaları ───────────────────────────── */}
                        <button onClick={() => navigate('/jmeter')} data-testid="nav-jmeter"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-orange-300 hover:bg-orange-900 hover:text-orange-200' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}>
                            {t('jmeter.navButton')}
                        </button>
                        <button onClick={() => navigate('/sql')} data-testid="nav-sql"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-blue-300 hover:bg-blue-900 hover:text-blue-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                            {t('sql.navButton')}
                        </button>
                        <button onClick={() => navigate('/typescript')} data-testid="nav-typescript"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}>
                            {t('typescript.navButton')}
                        </button>
                        <button onClick={() => navigate('/python')} data-testid="nav-python"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-yellow-900 hover:text-yellow-200' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}>
                            {t('python.navButton')}
                        </button>
                        <button onClick={() => navigate('/postman')} data-testid="nav-postman"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-orange-300 hover:bg-orange-900 hover:text-orange-200' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}>
                            <span className="sm:hidden">📮 Postman</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '📮 Postman Öğren' : '📮 Learn Postman'}</span>
                        </button>
                        <button onClick={() => navigate('/jenkins')} data-testid="nav-jenkins"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-blue-300 hover:bg-blue-900 hover:text-blue-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                            <span className="sm:hidden">🔧 Jenkins</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🔧 Jenkins Öğren' : '🔧 Learn Jenkins'}</span>
                        </button>
                        <button onClick={() => navigate('/docker')} data-testid="nav-docker"
                            className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${darkMode ? 'bg-gray-700 text-cyan-300 hover:bg-cyan-900 hover:text-cyan-200' : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'}`}>
                            <span className="sm:hidden">🐳 Docker</span>
                            <span className="hidden sm:inline">{language === 'tr' ? '🐳 Docker Öğren' : '🐳 Learn Docker'}</span>
                        </button>

                        {/* Ayırıcı */}
                        <div className={`w-full md:hidden h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        <div className={`hidden md:block w-px h-8 self-center mx-1 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />

                        {/* ── Pratik Bölümleri ─────────────────────────── */}
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                data-testid={`nav-${section.id}`}
                                className={`px-2 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-base whitespace-nowrap transition-all duration-300 ${activeSection === section.id
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                    : darkMode
                                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="sm:hidden">{section.shortName || section.name}</span>
                                <span className="hidden sm:inline">{section.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-3 py-4 md:px-6 md:py-8">
                <div className="animate-fadeIn">
                    {renderSection()}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-8 md:mt-12">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <p className="text-gray-300" data-testid="footer-text">
                        {t('footer.text')}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                        {t('footer.hint')}
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
