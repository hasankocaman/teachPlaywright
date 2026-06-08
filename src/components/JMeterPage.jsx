import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

function JMeterPage() {
    const { t } = useLanguage()
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved !== null ? JSON.parse(saved) : true
    })

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    const card = `rounded-xl p-6 shadow-md border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
    const h2 = `text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`
    const text = `text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`
    const comingSoon = `mt-4 p-3 rounded-lg border-2 border-dashed text-center text-sm ${darkMode ? 'border-gray-600 text-gray-500' : 'border-gray-300 text-gray-400'}`
    const badge = `inline-block px-2 py-1 rounded text-xs font-semibold mr-2 mb-2 ${darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700'}`
    const codeBlock = `mt-3 p-3 rounded-lg font-mono text-xs ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-700'}`

    const featureItems = Object.values(t('jmeter.whyUseItems') || {})
    const conceptItems = Object.values(t('jmeter.conceptsItems') || {})

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'}`}>
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-6 py-8 max-w-5xl">
                {/* Hero */}
                <div className="rounded-2xl p-8 mb-8 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl">
                    <h1 className="text-4xl font-bold mb-2">{t('jmeter.title')}</h1>
                    <p className="text-lg opacity-90">{t('jmeter.subtitle')}</p>
                    <p className="mt-3 opacity-80 max-w-2xl text-sm">{t('jmeter.intro')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* What is JMeter */}
                    <div className={card}>
                        <h2 className={h2}>🎯 {t('jmeter.whatIs')}</h2>
                        <p className={text}>{t('jmeter.whatIsDesc')}</p>
                        <div className={comingSoon}>🚧 {t('jmeter.comingSoon')}</div>
                    </div>

                    {/* Why JMeter */}
                    <div className={card}>
                        <h2 className={h2}>✅ {t('jmeter.whyUse')}</h2>
                        <div className="flex flex-wrap mt-2">
                            {featureItems.map((item, i) => (
                                <span key={i} className={badge}>{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* Installation */}
                    <div className={card}>
                        <h2 className={h2}>📦 {t('jmeter.installation')}</h2>
                        <p className={text}>{t('jmeter.installationDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 text-xs mb-1"># Gereksinim / Requirement</div>
                            <div>java -version  <span className="opacity-50">→ 8+</span></div>
                            <div className="mt-1">wget apache-jmeter-5.x.tgz</div>
                            <div>tar -xzf apache-jmeter-5.x.tgz</div>
                            <div>cd bin && ./jmeter</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('jmeter.comingSoon')}</div>
                    </div>

                    {/* Core Concepts */}
                    <div className={card}>
                        <h2 className={h2}>🧩 {t('jmeter.concepts')}</h2>
                        <ul className="space-y-1.5 mt-2">
                            {conceptItems.map((item, i) => (
                                <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <span className="text-orange-500 mt-0.5">▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* First Test Plan */}
                    <div className={card}>
                        <h2 className={h2}>🚀 {t('jmeter.firstTest')}</h2>
                        <p className={text}>{t('jmeter.firstTestDesc')}</p>
                        <div className="mt-4 space-y-2">
                            {['Add Thread Group', 'Add HTTP Request Sampler', 'Configure Host & Path', 'Add View Results Listener', 'Run Test (Ctrl+R)'].map((step, i) => (
                                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${darkMode ? 'bg-orange-800 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>{i + 1}</span>
                                    {step}
                                </div>
                            ))}
                        </div>
                        <div className={comingSoon}>🚧 {t('jmeter.comingSoon')}</div>
                    </div>

                    {/* Reports */}
                    <div className={card}>
                        <h2 className={h2}>📊 {t('jmeter.reports')}</h2>
                        <p className={text}>{t('jmeter.reportsDesc')}</p>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {['Response Time', 'Throughput (req/s)', 'Error Rate %', 'Percentiles (90th)', 'Active Threads', 'Latency'].map((metric, i) => (
                                <div key={i} className={`p-2 rounded text-xs text-center ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                    📈 {metric}
                                </div>
                            ))}
                        </div>
                        <div className={comingSoon}>🚧 {t('jmeter.comingSoon')}</div>
                    </div>
                </div>

                <div className={`mt-8 rounded-xl p-6 text-center ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' : 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200'}`}>
                    <div className="text-3xl mb-2">🚧</div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t('jmeter.comingSoon')}</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Distributed Testing • Plugins • CI/CD Integration • Real-world Scenarios
                    </p>
                </div>
            </main>
        </div>
    )
}

export default JMeterPage
