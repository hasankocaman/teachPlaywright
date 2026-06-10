import React from 'react'

function FrameworkComparison({ darkMode }) {
    return (
        <div className={`section-card max-w-7xl mx-auto transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} data-testid="comparison-title">
                🔍 Cypress, Selenium ve Playwright Komut Karşılaştırması
            </h1>

            {/* Genel Bakış */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>1. Genel Bakış</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl">
                        <h3 className="text-xl font-bold text-green-900 mb-3">🌲 Cypress</h3>
                        <ul className="text-sm text-green-800 space-y-2">
                            <li>• Node.js tabanlı, JavaScript/TypeScript</li>
                            <li>• Chrome, Firefox, Edge, Electron destekler</li>
                            <li>• Real-time reload ve otomatik bekleme</li>
                            <li>• Screenshot ve video kaydı</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl">
                        <h3 className="text-xl font-bold text-orange-900 mb-3">🔶 Selenium</h3>
                        <ul className="text-sm text-orange-800 space-y-2">
                            <li>• Çoklu dil desteği (Java, Python, C#, JS vb.)</li>
                            <li>• Geniş tarayıcı ve platform desteği</li>
                            <li>• WDIO, Selenium Grid gibi ekosistem</li>
                            <li>• Daha eski, olgun bir teknoloji</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-900 mb-3">🎭 Playwright</h3>
                        <ul className="text-sm text-blue-800 space-y-2">
                            <li>• Microsoft geliştiricisi</li>
                            <li>• Chrome, Firefox, WebKit destekler</li>
                            <li>• Otomatik bekleme ve network mocking</li>
                            <li>• Multi-tab, multi-origin desteği</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Temel Komutlar */}
            <section className="mb-12">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-900'}`}>2. Temel Komutlar - Sayfaya Gitme</h2>
                <div className="overflow-x-auto">
                    <table className={`w-full border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">İşlem</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">URL'ye git</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.visit('/')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.get("https://...")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.goto('https://...')</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Geri git</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.go('back')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.navigate().back()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.goBack()</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">İleri git</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.go('forward')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.navigate().forward()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.goForward()</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Yenile</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded">cy.reload()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.navigate().refresh()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.reload()</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Element Bulma */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">3. Element Bulma ve Doğrulama</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">İşlem</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Element bul (CSS)</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">driver.findElement(By.css(".btn"))</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.locator('.btn')</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">İç metinle bul</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.contains('Kaydet')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">By.xpath("//*[text()='Kaydet']")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.getByText('Kaydet')</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Görünür mü</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">should('be.visible')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.isDisplayed()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">toBeVisible()</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Text kontrol</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">should('have.text', 'Başlık')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">getText().equals("Başlık")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">toHaveText('Başlık')</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Tıklama İşlemleri */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">4. Tıklama İşlemleri</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">İşlem</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Normal tık</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').click()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.click()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.click()</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Sağ tık</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').rightclick()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Actions.contextClick()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">click({'{'}{"button: 'right'"}{'}'})< /code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Çift tık</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').dblclick()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Actions.doubleClick()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.dblclick()</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Checkbox işaretle</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('[type="checkbox"]').check()</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.click()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.check()</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Form İşlemleri */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">5. Form İşlemleri</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">İşlem</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Text yaz</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('input').type('text')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.sendKeys("text")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.fill('text')</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Temizle ve yaz</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">clear().type('yeni')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">element.clear(); sendKeys("yeni")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">locator.fill('yeni')</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Dropdown (value)</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">select('value')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Select().selectByValue("value")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">selectOption({'{'}{"value: 'value'"}{'}'})< /code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Dropdown (text)</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">select('Metin')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">selectByVisibleText("Metin")</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">selectOption({'{'}{"label: 'Metin'"}{'}'})< /code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Bekleme İşlemleri */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">6. Bekleme İşlemleri</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">İşlem</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Sabit bekleme</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.wait(1000)</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Thread.sleep(1000)</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">page.waitForTimeout(1000)</code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Element görünene kadar</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">cy.get('.btn').should('be.visible')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">WebDriverWait.visibilityOf()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">waitFor({'{'}{"state: 'visible'"}{'}'})< /code></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Element kaybolana kadar</td>
                                <td className="px-6 py-4"><code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">should('not.exist')</code></td>
                                <td className="px-6 py-4"><code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">invisibilityOf()</code></td>
                                <td className="px-6 py-4"><code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">waitFor({'{'}{"state: 'hidden'"}{'}'})< /code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Performans Karşılaştırması */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">7. Performans Karşılaştırması</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Kriter</th>
                                <th className="px-6 py-4 text-left font-semibold">Cypress</th>
                                <th className="px-6 py-4 text-left font-semibold">Selenium</th>
                                <th className="px-6 py-4 text-left font-semibold">Playwright</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Hız</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Öğrenme kolaylığı</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Tarayıcı desteği</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">API test desteği</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-indigo-50">
                                <td className="px-6 py-4 font-medium">Paralel test</td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐</span></td>
                                <td className="px-6 py-4"><span className="text-yellow-500">⭐⭐⭐⭐⭐</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Tavsiyeler */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">8. Ne Zaman Hangi Aracı Kullanmalı?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-green-50 border-2 border-green-300 rounded-xl">
                        <h3 className="text-xl font-bold text-green-900 mb-4">🌲 Cypress Seçin Eğer:</h3>
                        <ul className="text-sm text-green-800 space-y-2 list-disc list-inside">
                            <li>Frontend odaklı proje (React, Vue, Angular)</li>
                            <li>Hızlı kurulum ve öğrenme istiyorsanız</li>
                            <li>Modern JavaScript/TypeScript stack</li>
                            <li>Chrome/Firefox testi yeterli ise</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-orange-50 border-2 border-orange-300 rounded-xl">
                        <h3 className="text-xl font-bold text-orange-900 mb-4">🔶 Selenium Seçin Eğer:</h3>
                        <ul className="text-sm text-orange-800 space-y-2 list-disc list-inside">
                            <li>Çoklu dil desteği gerekiyorsa</li>
                            <li>Eski bir sistemle entegrasyon</li>
                            <li>Geniş tarayıcı/cihaz desteği</li>
                            <li>Selenium Grid ile dağıtık test</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-xl">
                        <h3 className="text-xl font-bold text-blue-900 mb-4">🎭 Playwright Seçin Eğer:</h3>
                        <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                            <li>Modern web uygulamaları</li>
                            <li>Multi-tab, iframe, service worker testi</li>
                            <li>Network mocking ve interception</li>
                            <li>Cross-browser (WebKit dahil) test</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Örnek Senaryolar */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">9. Örnek: Login Formu Testi</h2>

                <div className="grid grid-cols-1 gap-6">
                    <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
                        <h4 className="font-bold text-green-900 mb-3">🌲 Cypress</h4>
                        <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                            {`describe('Login Test', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('#username').type('testuser');
    cy.get('#password').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
    cy.get('.welcome-message').should('contain', 'Hoşgeldin');
  });
});`}
                        </pre>
                    </div>

                    <div className="p-6 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
                        <h4 className="font-bold text-orange-900 mb-3">🔶 Selenium (Java)</h4>
                        <pre className="bg-gray-900 text-orange-400 p-4 rounded-lg overflow-x-auto text-sm">
                            {`@Test
public void testLogin() {
    driver.get("https://example.com/login");
    driver.findElement(By.id("username")).sendKeys("testuser");
    driver.findElement(By.id("password")).sendKeys("password123");
    driver.findElement(By.tagName("form")).submit();
    assert driver.getCurrentUrl().contains("/dashboard");
    assert driver.findElement(By.className("welcome-message"))
           .getText().contains("Hoşgeldin");
}`}
                        </pre>
                    </div>

                    <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                        <h4 className="font-bold text-blue-900 mb-3">🎭 Playwright</h4>
                        <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg overflow-x-auto text-sm">
                            {`test('Login Test', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill('testuser');
  await page.locator('#password').fill('password123');
  await page.locator('form').click();
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('.welcome-message'))
       .toContainText('Hoşgeldin');
});`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Sonuç */}
            <section className="mb-8">
                <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl">
                    <h2 className="text-3xl font-bold mb-4">💡 Sonuç</h2>
                    <p className="text-lg mb-4">
                        Her araç kendi güçlü yönlerine sahiptir:
                    </p>
                    <ul className="space-y-2 text-indigo-100">
                        <li>• <strong>Cypress:</strong> Geliştirici dostu, hızlı feedback, mükemmel debugging</li>
                        <li>• <strong>Selenium:</strong> Olgun, esnek, geniş dil ve tarayıcı desteği</li>
                        <li>• <strong>Playwright:</strong> Modern, hızlı, güçlü API ve network kontrolü</li>
                    </ul>
                    <p className="mt-4 text-indigo-100">
                        Proje gereksinimlerinize, ekibinizin becerilerine ve test kapsamınıza göre en uygun aracı seçin.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default FrameworkComparison
