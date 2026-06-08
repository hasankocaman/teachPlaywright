import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

function TypeScriptPage() {
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
    const badge = `inline-block px-2 py-1 rounded text-xs font-semibold mr-2 mb-2 ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`
    const codeBlock = `mt-3 p-3 rounded-lg font-mono text-xs ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-700'}`

    const whyItems = Object.values(t('typescript.whyUseItems') || {})

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'}`}>
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-6 py-8 max-w-5xl">
                {/* Hero */}
                <div className="rounded-2xl p-8 mb-8 bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-xl">
                    <h1 className="text-4xl font-bold mb-2">{t('typescript.title')}</h1>
                    <p className="text-lg opacity-90">{t('typescript.subtitle')}</p>
                    <p className="mt-3 opacity-80 max-w-2xl text-sm">{t('typescript.intro')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* What is TS */}
                    <div className={card}>
                        <h2 className={h2}>🎯 {t('typescript.whatIs')}</h2>
                        <p className={text}>{t('typescript.whatIsDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">// JavaScript vs TypeScript</div>
                            <div className="opacity-60">// JS — no type safety:</div>
                            <div>let name = "Alice"</div>
                            <div>name = 42  <span className="text-red-400">// ❌ silently wrong</span></div>
                            <div className="mt-2 opacity-60">// TS — compile-time check:</div>
                            <div>let name: string = "Alice"</div>
                            <div>name = 42  <span className="text-red-400">// ✅ Error caught!</span></div>
                        </div>
                    </div>

                    {/* Why TS */}
                    <div className={card}>
                        <h2 className={h2}>✅ {t('typescript.whyUse')}</h2>
                        <div className="flex flex-wrap mt-2">
                            {whyItems.map((item, i) => (
                                <span key={i} className={badge}>{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* Basics */}
                    <div className={card}>
                        <h2 className={h2}>📝 {t('typescript.basics')}</h2>
                        <p className={text}>{t('typescript.basicsDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">// Types & Interfaces</div>
                            <div>type Status = 'active' | 'inactive'</div>
                            <div className="mt-1">interface User {'{'}</div>
                            <div>  id: number</div>
                            <div>  name: string</div>
                            <div>  status: Status</div>
                            <div>{'}'}</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('typescript.comingSoon')}</div>
                    </div>

                    {/* Classes */}
                    <div className={card}>
                        <h2 className={h2}>🏗️ {t('typescript.classes')}</h2>
                        <p className={text}>{t('typescript.classesDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">// Page Object Model</div>
                            <div>class LoginPage {'{'}</div>
                            <div>  constructor(private page: Page) {'{'}'{'}'}</div>
                            <div>  async login(u: string, p: string) {'{'}</div>
                            <div>    await this.page.fill('#user', u)</div>
                            <div>    await this.page.fill('#pass', p)</div>
                            <div>    await this.page.click('button')</div>
                            <div>  {'}'}</div>
                            <div>{'}'}</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('typescript.comingSoon')}</div>
                    </div>

                    {/* Generics */}
                    <div className={card}>
                        <h2 className={h2}>🔧 {t('typescript.generics')}</h2>
                        <p className={text}>{t('typescript.genericsDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">// Generic helper</div>
                            <div>async function getResponse{'<T>'}(url: string): Promise{'<T>'} {'{'}</div>
                            <div>  const res = await fetch(url)</div>
                            <div>  return res.json() as T</div>
                            <div>{'}'}</div>
                            <div className="mt-1 opacity-60">// Type-safe usage:</div>
                            <div>const users = await getResponse{'<User[]>'}('/api/users')</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('typescript.comingSoon')}</div>
                    </div>

                    {/* Async/Await */}
                    <div className={card}>
                        <h2 className={h2}>⚡ {t('typescript.async')}</h2>
                        <p className={text}>{t('typescript.asyncDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">// Playwright async test</div>
                            <div>test('login flow', async ({'{'} page {'}'}) =&gt; {'{'}</div>
                            <div>  await page.goto('/login')</div>
                            <div>  await page.fill('[name=email]', 'user@test.com')</div>
                            <div>  await page.click('button[type=submit]')</div>
                            <div>  await expect(page).toHaveURL('/dashboard')</div>
                            <div>{'}'}</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('typescript.comingSoon')}</div>
                    </div>

                    {/* TS + Playwright */}
                    <div className={card}>
                        <h2 className={h2}>🎭 {t('typescript.playwright')}</h2>
                        <p className={text}>{t('typescript.playwrightDesc')}</p>
                        <ul className="mt-3 space-y-1.5">
                            {['Full type safety for page.locator()', 'Typed fixtures with test.extend()', 'Auto-complete for all Playwright APIs', 'Strict null checks prevent runtime errors', 'Interface-driven Page Object Model'].map((item, i) => (
                                <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <span className="text-indigo-500 mt-0.5">▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={comingSoon}>🚧 {t('typescript.comingSoon')}</div>
                    </div>

                    {/* tsconfig */}
                    <div className={card}>
                        <h2 className={h2}>⚙️ {t('typescript.config')}</h2>
                        <p className={text}>{t('typescript.configDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">// tsconfig.json</div>
                            <div>{'{'}</div>
                            <div>  "compilerOptions": {'{'}</div>
                            <div>    "target": "ES2020",</div>
                            <div>    "strict": true,</div>
                            <div>    "moduleResolution": "node",</div>
                            <div>    "esModuleInterop": true,</div>
                            <div>    "outDir": "./dist"</div>
                            <div>  {'}'}</div>
                            <div>{'}'}</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('typescript.comingSoon')}</div>
                    </div>
                </div>

                <div className={`mt-8 rounded-xl p-6 text-center ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' : 'bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200'}`}>
                    <div className="text-3xl mb-2">🚧</div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t('typescript.comingSoon')}</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Decorators • Advanced Types • Utility Types • Design Patterns • Real-world Test Examples
                    </p>
                </div>
            </main>
        </div>
    )
}

export default TypeScriptPage
