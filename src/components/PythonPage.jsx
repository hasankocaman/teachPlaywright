import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import TopicHeader from './TopicHeader'

function PythonPage() {
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
    const badge = `inline-block px-2 py-1 rounded text-xs font-semibold mr-2 mb-2 ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`
    const codeBlock = `mt-3 p-3 rounded-lg font-mono text-xs ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-50 text-gray-700'}`

    const whyItems = Object.values(t('python.whyUseItems') || {})

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark-mode bg-gray-900' : 'bg-gradient-to-br from-yellow-50 via-green-50 to-emerald-50'}`}>
            <TopicHeader darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="container mx-auto px-6 py-8 max-w-5xl">
                {/* Hero */}
                <div className="rounded-2xl p-8 mb-8 bg-gradient-to-r from-yellow-500 to-green-600 text-white shadow-xl">
                    <h1 className="text-4xl font-bold mb-2">{t('python.title')}</h1>
                    <p className="text-lg opacity-90">{t('python.subtitle')}</p>
                    <p className="mt-3 opacity-80 max-w-2xl text-sm">{t('python.intro')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Why Python */}
                    <div className={card}>
                        <h2 className={h2}>🎯 {t('python.whatIs')}</h2>
                        <p className={text}>{t('python.whatIsDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1"># Python — readable automation</div>
                            <div>def test_login(driver):</div>
                            <div>    driver.find_element(By.ID, "user")</div>
                            <div>              .send_keys("admin")</div>
                            <div>    driver.find_element(By.ID, "pass")</div>
                            <div>              .send_keys("secret")</div>
                            <div>    driver.find_element(By.CSS, "button")</div>
                            <div>              .click()</div>
                        </div>
                    </div>

                    {/* Advantages */}
                    <div className={card}>
                        <h2 className={h2}>✅ {t('python.whyUse')}</h2>
                        <div className="flex flex-wrap mt-2">
                            {whyItems.map((item, i) => (
                                <span key={i} className={badge}>{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* pytest */}
                    <div className={card}>
                        <h2 className={h2}>🧪 {t('python.pytest')}</h2>
                        <p className={text}>{t('python.pytestDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1"># pytest example</div>
                            <div>import pytest</div>
                            <div className="mt-1">@pytest.fixture</div>
                            <div>def user_data():</div>
                            <div>    return {'{'}"name": "Alice", "role": "admin"{'}'}</div>
                            <div className="mt-1">@pytest.mark.parametrize("role", ["admin","user"])</div>
                            <div>def test_access(user_data, role):</div>
                            <div>    assert check_access(role) is True</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('python.comingSoon')}</div>
                    </div>

                    {/* Selenium + Python */}
                    <div className={card}>
                        <h2 className={h2}>🌐 {t('python.selenium')}</h2>
                        <p className={text}>{t('python.seleniumDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1"># Selenium setup</div>
                            <div>from selenium import webdriver</div>
                            <div>from selenium.webdriver.common.by import By</div>
                            <div>from selenium.webdriver.support.ui import WebDriverWait</div>
                            <div className="mt-1">driver = webdriver.Chrome()</div>
                            <div>driver.get("https://example.com")</div>
                            <div>wait = WebDriverWait(driver, 10)</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('python.comingSoon')}</div>
                    </div>

                    {/* Requests */}
                    <div className={card}>
                        <h2 className={h2}>📡 {t('python.requests')}</h2>
                        <p className={text}>{t('python.requestsDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1"># API Testing with requests</div>
                            <div>import requests</div>
                            <div className="mt-1">def test_get_users():</div>
                            <div>    r = requests.get('/api/users',</div>
                            <div>        headers={'{'}"Authorization": "Bearer token"{'}'}</div>
                            <div>    )</div>
                            <div>    assert r.status_code == 200</div>
                            <div>    assert len(r.json()) {'>'} 0</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('python.comingSoon')}</div>
                    </div>

                    {/* Data-driven */}
                    <div className={card}>
                        <h2 className={h2}>📊 {t('python.datadriven')}</h2>
                        <p className={text}>{t('python.datadrivenDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1"># Data-driven with parametrize</div>
                            <div>@pytest.mark.parametrize("email,pw,expected", [</div>
                            <div>    ("admin@x.com", "pass123", 200),</div>
                            <div>    ("bad@x.com",   "wrong",   401),</div>
                            <div>    ("",            "",        400),</div>
                            <div>])</div>
                            <div>def test_login(email, pw, expected):</div>
                            <div>    r = requests.post('/login',</div>
                            <div>        json={'{'}"email": email, "password": pw{'}'}</div>
                            <div>    )</div>
                            <div>    assert r.status_code == expected</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('python.comingSoon')}</div>
                    </div>

                    {/* POM */}
                    <div className={card}>
                        <h2 className={h2}>🏗️ {t('python.pom')}</h2>
                        <p className={text}>{t('python.pomDesc')}</p>
                        <div className={codeBlock}>
                            <div className="opacity-60 mb-1"># Page Object Model</div>
                            <div>class LoginPage:</div>
                            <div>    def __init__(self, driver):</div>
                            <div>        self.driver = driver</div>
                            <div className="mt-1">    def login(self, user, pwd):</div>
                            <div>        self.driver.find_element(</div>
                            <div>            By.ID, "username").send_keys(user)</div>
                            <div>        self.driver.find_element(</div>
                            <div>            By.ID, "password").send_keys(pwd)</div>
                            <div>        self.driver.find_element(</div>
                            <div>            By.CSS_SELECTOR, "button").click()</div>
                        </div>
                        <div className={comingSoon}>🚧 {t('python.comingSoon')}</div>
                    </div>

                    {/* Best Practices */}
                    <div className={card}>
                        <h2 className={h2}>⭐ {t('python.bestpractices')}</h2>
                        <p className={text}>{t('python.bestpracticesDesc')}</p>
                        <ul className="mt-3 space-y-1.5">
                            {['conftest.py for shared fixtures', 'requirements.txt / pyproject.toml', '.env files for secrets (python-dotenv)', 'allure-pytest for rich reports', 'Separate test data from test logic', 'Use type hints for better IDE support'].map((item, i) => (
                                <li key={i} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    <span className="text-yellow-500 mt-0.5">▸</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className={comingSoon}>🚧 {t('python.comingSoon')}</div>
                    </div>
                </div>

                <div className={`mt-8 rounded-xl p-6 text-center ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' : 'bg-gradient-to-r from-yellow-50 to-green-50 border border-yellow-200'}`}>
                    <div className="text-3xl mb-2">🚧</div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t('python.comingSoon')}</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Playwright for Python • Appium • allure Reports • CI/CD with GitHub Actions • Real-world Project Structure
                    </p>
                </div>
            </main>
        </div>
    )
}

export default PythonPage
