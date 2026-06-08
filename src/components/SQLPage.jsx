import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

function SQLPage() {
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
    const badge = `inline-block px-2 py-1 rounded text-xs font-semibold mr-2 mb-2 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`
    const codeBlock = `mt-3 p-3 rounded-lg font-mono text-xs ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-700'}`

    const whyItems = Object.values(t('sql.whyUseItems') || {})

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50'}`}>
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-6 py-8 max-w-5xl">
                {/* Hero */}
                <div className="rounded-2xl p-8 mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl">
                    <h1 className="text-4xl font-bold mb-2">{t('sql.title')}</h1>
                    <p className="text-lg opacity-90">{t('sql.subtitle')}</p>
                    <p className="mt-3 opacity-80 max-w-2xl text-sm">{t('sql.intro')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* What is SQL */}
                    <div className={card}>
                        <h2 className={h2}>🎯 {t('sql.whatIs')}</h2>
                        <p className={text}>{t('sql.whatIsDesc')}</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {['CREATE', 'READ (SELECT)', 'UPDATE', 'DELETE'].map((op, i) => (
                                <div key={i} className={`p-2 rounded text-xs text-center font-mono font-bold ${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                    {op}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why SQL */}
                    <div className={card}>
                        <h2 className={h2}>✅ {t('sql.whyUse')}</h2>
                        <div className="flex flex-wrap mt-2">
                            {whyItems.map((item, i) => (
                                <span key={i} className={badge}>{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* SELECT */}
                    <div className={card}>
                        <h2 className={h2}>🔍 {t('sql.select')}</h2>
                        <p className={text}>{t('sql.selectDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">-- Basic SELECT</div>
                            <div>SELECT name, email, age</div>
                            <div>FROM users</div>
                            <div>WHERE status = 'active'</div>
                            <div>ORDER BY name ASC</div>
                            <div>LIMIT 10;</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('sql.comingSoon')}</div>
                    </div>

                    {/* JOINs */}
                    <div className={card}>
                        <h2 className={h2}>🔗 {t('sql.joins')}</h2>
                        <p className={text}>{t('sql.joinsDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">-- INNER JOIN</div>
                            <div>SELECT u.name, o.total</div>
                            <div>FROM users u</div>
                            <div>INNER JOIN orders o</div>
                            <div>  ON u.id = o.user_id;</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('sql.comingSoon')}</div>
                    </div>

                    {/* Aggregates */}
                    <div className={card}>
                        <h2 className={h2}>📊 {t('sql.aggregates')}</h2>
                        <p className={text}>{t('sql.aggregatesDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">-- Aggregate Functions</div>
                            <div>SELECT country,</div>
                            <div>  COUNT(*) AS total,</div>
                            <div>  AVG(age) AS avg_age,</div>
                            <div>  MAX(salary) AS max_sal</div>
                            <div>FROM users</div>
                            <div>GROUP BY country</div>
                            <div>HAVING COUNT(*) {'>'} 5;</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('sql.comingSoon')}</div>
                    </div>

                    {/* DML */}
                    <div className={card}>
                        <h2 className={h2}>✏️ {t('sql.dml')}</h2>
                        <p className={text}>{t('sql.dmlDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">-- Test Data Setup</div>
                            <div>INSERT INTO users (name, email)</div>
                            <div>VALUES ('Test User', 'test@mail.com');</div>
                            <div className="mt-2 opacity-60">-- Cleanup</div>
                            <div>DELETE FROM users</div>
                            <div>WHERE email LIKE '%test%';</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('sql.comingSoon')}</div>
                    </div>

                    {/* Subqueries */}
                    <div className={card}>
                        <h2 className={h2}>🔄 {t('sql.subqueries')}</h2>
                        <p className={text}>{t('sql.subqueriesDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1">-- CTE Example</div>
                            <div>WITH active_users AS (</div>
                            <div>  SELECT * FROM users</div>
                            <div>  WHERE status = 'active'</div>
                            <div>)</div>
                            <div>SELECT * FROM active_users</div>
                            <div>WHERE age {'>'} 25;</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('sql.comingSoon')}</div>
                    </div>

                    {/* DB Testing */}
                    <div className={card}>
                        <h2 className={h2}>🧪 {t('sql.testing')}</h2>
                        <p className={text}>{t('sql.testingDesc')}</p>
                        <ul className="mt-3 space-y-1.5">
                            {['Schema validation (column types, constraints)', 'Foreign key & referential integrity', 'Stored procedure testing', 'Data migration verification', 'Index performance analysis'].map((item, i) => (
                                <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <span className="text-blue-500 mt-0.5">▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={comingSoon}>🚧 {t('sql.comingSoon')}</div>
                    </div>
                </div>

                <div className={`mt-8 rounded-xl p-6 text-center ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' : 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200'}`}>
                    <div className="text-3xl mb-2">🚧</div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t('sql.comingSoon')}</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Window Functions • Transactions • Stored Procedures • NoSQL Comparison • Real-world Test Scenarios
                    </p>
                </div>
            </main>
        </div>
    )
}

export default SQLPage
