import TopicPage from './TopicPage'
import { pythonData } from '../data/pythonData'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'

const TestFrameworksBanner = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const isTr = language === 'tr'
  return (
    <button
        onClick={() => navigate('/test-frameworks')}
        className="group w-full text-left block mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-400/70 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 bg-transparent cursor-pointer"
    >
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 p-5 flex items-center gap-5">
            <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">🧪</div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                    {isTr ? 'Etkileşimli Rehber' : 'Interactive Guide'}
                </div>
                <div className="text-lg font-bold text-white leading-tight">Python Test Frameworks</div>
                <div className="text-sm text-purple-200/80 mt-1 leading-relaxed">
                    pytest · Selenium · Playwright
                    <span className="mx-2 text-purple-500">·</span>
                    {isTr ? 'Java karşılaştırmaları, SVG diyagramlar, terminal simülasyonu' : 'Java comparisons, SVG diagrams, terminal simulation'}
                </div>
                <div className="flex flex-wrap gap-2 mt-2.5">
                    {['🧪 pytest', '🌐 Selenium', '🎭 Playwright', '☕ Java Compare'].map(tag => (
                        <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-3xl text-purple-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0">→</div>
        </div>
    </button>
  )
}

function PythonPage() {
    return (
        <TopicPage
            data={pythonData}
            gradient="from-yellow-500 to-green-600"
            bgLight="bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50"
            extraBanner={<TestFrameworksBanner />}
        />
    )
}

export default PythonPage
