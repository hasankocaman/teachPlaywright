# Oturum Geçmişi & Yapılan İşler

> Oluşturulma: 2026-06-09 | Son Güncelleme: 2026-06-10  
> Bu dosya bir sonraki sohbet oturumunda context olarak kullanılmak üzere hazırlanmıştır.  
> Proje: `d:\ANTIGRAVITY\automationexercise` — React SPA (Vite + Tailwind + HashRouter)

---

## Kullanıcı Hakkında Önemli Bağlam

- **Core Java bilgisi var** (en son Collections: ArrayList, HashMap, HashSet)
- Python ve TypeScript öğrenirken Java ile karşılaştırmalı anlatım istiyor
- **Dil tercihi:** Türkçe arayüz (TR/EN toggle mevcut)
- **Hedef:** QA Mühendisi olarak test otomasyonu öğrenmek

---

## Prompt 1 — TypeScript Sekmeleri Boş Sayfa Hatası

**İstek:** TypeScript sayfasında "Intermediate" ve diğer sekmelere tıklandığında beyaz/boş sayfa çıkıyordu.

**Yapılan:**
- `TopicPage.jsx`'te `CodeBlock` bileşeninde `code.trim()` çağrısı `code` undefined olduğunda crash yapıyordu → `(code || '').trim()` düzeltmesi
- Heading bloklarında `{block.text}` → `{block.text || block.content}` (TypeScript verisi `content` field'ı kullanıyor, SQL/Python `text` kullanıyor)
- TypeScript kod blokları `block.content` field'ında, bu yüzden `code={block.code ?? block.content}` şeklinde düzeltildi

**Sonuç:** ✅ Tüm TypeScript sekmeleri çalışır hale geldi.

**Eksik/Not:** TypeScript veri yapısı tutarsızlık (`text` vs `content`, `code` vs `content`) proje genelinde hâlâ var. Gelecekte yeni içerik eklerken TypeScript data'ya özel davranış unutulmamalı.

---

## Prompt 2 — W3Schools Kalitesinde İçerik ("Başka Kaynağa İhtiyaç Duymasın")

**İstek:** "https://www.w3schools.com/ kendine referans alacaktın. Kullanıcı öğrenirken başka kaynağa ihtiyaç duymayacak. Gerekirse görseller ekle. gerekirse animasyonlar ekle. basit adım adım anlaşılır örneklenmiş olarak anlat."

### Yapılanlar

**`TopicPage.jsx`'e yeni bileşenler eklendi:**

| Block Tipi | Açıklama |
|---|---|
| `visual` + `variant: 'join'` | Animasyonlu JOIN diyagramı — 3 adım (tabloları göster → eşleşmeleri renklendir → sonucu göster) |
| `visual` + `variant: 'table'` | DB tablosu görselleştirmesi (PK, FK işaretleri ile) |
| `visual` + `variant: 'flow'` | Numaralı akış diyagramı (SQL çalışma sırası vb.) |
| `visual` + `variant: 'boxes'` | Bağlantılı kavram kutuları (pipeline gösterimi) |
| `visual` + `variant: 'pyramid'` | Piramit diyagramı (test pyramid) — renkli katmanlar |
| `visual` + `variant: 'data-structure'` | Python veri yapısı görseli (list/dict/set/tuple) |
| `comparison` | Sol/Sağ yan yana ❌ Yanlış / ✅ Doğru karşılaştırma |
| `quiz` | İnteraktif çoktan seçmeli quiz (cevap kontrol + açıklama) |
| `callout` | Renkli önemli not kutusu (6 renk seçeneği) |
| `java-compare` | ☕ Java / Yeni dil yan yana karşılaştırma kartı (Prompt 3'te eklendi) |

**İçerik eklenen sayfalar:**

- **SQL (`sqlData.js`):** Section 0 (QA workflow diagram, örnek tablo, quiz), Section 2 (SQL çalışma sırası flow, NULL comparison, quiz), Section 3 (INNER/LEFT/RIGHT JOIN animasyonları, correlated vs JOIN comparison, quiz)
- **Python (`pythonData.js`):** Section 2 (list/dict/set/tuple data-structure görselleri, karşılaştırma tablosu, comparison, quiz), Section 3 (for loop vs list comprehension, bare except vs specific except, quiz)
- **TypeScript (`typescriptData.js`):** Section 2 (derleme pipeline boxes, JS vs TS comparison, özellik tablosu, quiz)
- **JMeter (`jmeterData.js`):** Section 0 EN+TR (performans test piramidi, JMeter bileşen mimarisi, test çalışma flow, quiz)

**CodeBlock geliştirmesi:** `language` prop eklendi → sol üst köşede dil etiketi (sql, python, typescript...).

### ⚠️ Eksikler / Tamamlanmayanlar

1. **Kapsam tutarsız:** 4 sayfa × 8 sekme = 32 sekme var. İçerik şu sekmelere eklendi:
   - SQL: Section 0, 2, 3 ✅ | Section 1, 4, 5, 6, 7 ❌ görsel yok
   - Python: Section 2, 3 ✅ | Section 0, 1, 4, 5, 6, 7 ❌
   - TypeScript: Section 2 ✅ | Diğerleri ❌
   - JMeter: Section 0 ✅ | Diğerleri ❌

2. **"Try it yourself" editör yok:** W3Schools'un ayırt edici özelliği olan canlı kod editörü hiç eklenmedi. Sadece statik kod gösterimi var.

3. **Animasyon az:** JoinDiagram tek gerçek animasyon. Diğer görsel bloklar statik.

4. **Quiz tek tip:** Sadece çoktan seçmeli. W3Schools'ta fill-in-the-blank, drag-drop gibi çeşitler de var.

---

## Prompt 3 — Java Bilgisiyle Köprü Kurma

**İstek:** "ben core java biliyorum. yani en son collection hatırlıyorum. bu yüzden python ve typescript anlatırken java ile benzer yönlerini de yazarsan daha iyi anlarım. Örneğin bir metodu anlatıyorsun veya başka konu 1- bu neden gerekli 2- bunun java'da karşılığı nedir 3- bunun typescript ve pythonda handle edilmesi nasıldır"

### Yapılanlar

**`TopicPage.jsx`'e `JavaCompareBlock` bileşeni eklendi:**
- Turuncu çerçeveli kart
- Header: "☕ Java Biliyorsan: [topic]"
- "🤔 Neden?" açıklama satırı
- Yan yana iki kod paneli: ☕ Java'da (sarı) | 🐍 Python'da / 🔷 TypeScript'te (yeşil/mavi)
- Altında 💡 Not satırı

**Python'a yeni "☕ Java → Python" sekmesi eklendi (sections[8]):**
- 15 Java karşılaştırması: Değişkenler, None, list, dict, set, tuple, f-string, for loop, fonksiyon, exception, class, access modifiers, streams→comprehension, try-with-resources, kalıtım
- Hızlı karşılaştırma tablosu (18 satır)
- TR + EN çevirisi (`applyTr` ile)

**TypeScript'e yeni "☕ Java → TS" sekmesi eklendi (sections[8]):**
- 9 Java karşılaştırması: Basic types, interface (structural typing!), class, access modifiers, generics, enum, null safety, union types, async/await
- Hızlı karşılaştırma tablosu (18 satır)
- TR + EN çevirisi

### ⚠️ Eksikler / Tamamlanmayanlar

1. **Ayrı sekme, inline değil:** İstek "bir kavramı anlatırken hemen altında Java karşılaştırması göster" idi. Yapılan: tüm karşılaştırmalar ayrı bir sekmeye toplandı. Bu öğrenme deneyimi açısından daha az etkili — kullanıcı değişkeni öğrenirken Java'yı görmek ister, ayrı sekmeye geçmek zorunda değil.

2. **SQL ve JMeter için Java karşılaştırması yok:** İstek Python ve TypeScript için yapıldı ve sadece orada uygulandı. Ama SQL'de JDBC/PreparedStatement karşılaştırması, JMeter'da Java performans test araçları (Gatling, k6) karşılaştırması eklenebilirdi.

3. **Java kod örnekleri test edilmedi:** Java kod örnekleri syntax açısından elle yazıldı, compile edilmedi. Küçük hatalar olabilir.

4. **`note` field'larında bazı tırnak kaçış sorunları:** Build sırasında `QA'de` gibi apostroflar single-quote string içinde parse hatasına yol açtı. Sonradan düzeltildi.

---

## Prompt 4 — 3 Dil Playwright Karşılaştırması

**İstek:** "python ve playwright örnekler olmalı. yanında java ve playwright örnekler. yanında typescript ve playwright örnekler. Bu üçünü yanyana görsem çok daha anlaşılır olurdu. sence bu kıyaslama anasayfada nerede olmalı."

### Yapılanlar

**`PlaywrightLangCompare.jsx` bileşeni oluşturuldu:**
- 5 senaryo sekmesi:
  - 🔐 Login Testi
  - 🌐 API Testi (requests / RestAssured / Playwright request)
  - 📄 Page Object Model (class tabanlı POM)
  - 📊 Data-Driven Test (parametrize / @CsvSource / for...of)
  - 🔧 Setup/Teardown (pytest fixtures / JUnit @Before/@After / playwright.config.ts)
- Her dil için renkli panel: 🐍 sarı-yeşil, ☕ turuncu-sarı, 🔷 mavi
- Kod + madde işaretli notlar
- Alt kısımda "Temel Farklılıklar" callout

**`HomePage.jsx`'e "🔀 3 Dil Karşılaştır" butonu eklendi:**
- Nav'da `comparison` ile `practice` arasına yerleştirildi
- `id: 'lang-compare'` olarak sections dizisine eklendi

**Konumlandırma gerekçesi:** Cross-cutting kaynak, belirli bir dil sayfasına ait değil; mevcut `FrameworkComparison` bölümüyle aynı kategoride; sticky nav ile her yerden erişilebilir.

### ⚠️ Eksikler / Tamamlanmayanlar

1. **TR/EN dil desteği çalışmıyor:** `PlaywrightLangCompare.jsx`'te dil kontrolü için `document.documentElement.lang` kullanıldı — bu güvenilmez. Doğrusu `useLanguage()` context hook ile yapılmalıydı. Şu an bileşen her zaman Türkçe etiket gösteriyor ama scenario açıklamaları ve notlar Türkçe yazıldı (EN alternatifler hazırlandı ama switch mekanizması yok).

2. **Java API test örneği RestAssured kullanıyor, Playwright for Java değil:** RestAssured Java ekosisteminde standarttır ama prompt "Java ve Playwright örnekler" diyordu. Her iki versiyon da eklendi ama asıl Playwright for Java API testi daha az öne çıktı.

3. **Kod panelleri mobilde küçük:** 3 sütun `lg:grid-cols-3` kullandı. Mobil/tablet'te alt alta düşüyor, UX kabul edilebilir ama ideal değil.

4. **"Temel Farklılıklar" kutusu sabit:** Senaryo değiştikçe içerik güncellenmiyor — tüm senaryolar için aynı genel metin gösteriliyor.

5. **Mevcut `FrameworkComparison` ile çakışma:** Ana sayfada artık "comparison" (eski) ve "lang-compare" (yeni) olmak üzere iki karşılaştırma bölümü var. Bunlar birleştirilebilir ya da aralarındaki fark daha belirgin hale getirilebilir.

---

## Genel Mimari Notlar

### Dosya Yapısı

```
src/
├── components/
│   ├── TopicPage.jsx          ← Tüm topic sayfaları buradan render edilir
│   ├── HomePage.jsx           ← Ana sayfa (practice bölümleri + nav)
│   ├── PlaywrightLangCompare.jsx ← YENİ: 3 dil karşılaştırması
│   ├── FrameworkComparison.jsx   ← MEVCUT: framework karşılaştırması
│   └── ...
├── data/
│   ├── sqlData.js             ← applyTr() pattern
│   ├── pythonData.js          ← applyTr() pattern (sections[8] = Java→Python yeni)
│   ├── typescriptData.js      ← applyTr() pattern (sections[8] = Java→TS yeni)
│   └── jmeterData.js          ← Tam TR bölümleri (applyTr yok)
└── context/
    └── LanguageContext.jsx    ← language: 'en'|'tr', toggleLanguage()
```

### Kritik Teknik Notlar

1. **TypeScript veri dosyasında field adı tutarsızlığı:**
   - SQL/Python: `heading → block.text`, `code → block.code`
   - TypeScript: `heading → block.content`, `code → block.content`
   - TopicPage.jsx'te `{block.text || block.content}` ve `block.code ?? block.content` ile handle edildi

2. **Block index ve TR override ilişkisi:**
   - TR override'lar index bazlı: `blocks: { 5: { text: '...' } }` = 5. bloğun text'ini değiştir
   - Mevcut bir bölümün ORTASINA yeni blok eklemek → sonraki tüm TR override indekslerini kaydırır
   - **Her zaman bölümün SONUNA ekle**, TR override'larını da sona ekle

3. **jmeterData.js farklı:**
   - `applyTr()` yok, tam TR bölümleri ayrı yazılıyor
   - Yeni içerik hem EN hem TR bloklarına ayrı ayrı eklenmeli

4. **JS string içinde Turkish apostrophe tuzağı:**
   - `'QA'de'` → `'` single-quote string'i kapatır → parse error
   - Çözüm: `'QA\'de'` veya `"QA'de"`

---

---

## Prompt 5 — SESSION_HISTORY Eksikleri Tamamlandı (2026-06-09)

Bu oturumda Prompt 1-4'ten kalan 3 yüksek öncelikli eksik giderildi.

### Yapılan 1: PlaywrightLangCompare — `useLanguage()` dil desteği

**Dosya:** `src/components/PlaywrightLangCompare.jsx`

**Sorun:** `const isTr = document.documentElement.lang === 'tr'` güvenilmezdi; toggle'a tepki vermiyordu.

**Yapılan:**
- `import { useLanguage } from '../context/LanguageContext'` eklendi
- `const { language } = useLanguage(); const isTr = language === 'tr'` ile değiştirildi
- Senaryo tab etiketleri: `{isTr ? s.label : s.labelEn}`
- Senaryo açıklaması: `{isTr ? scenario?.desc : scenario?.descEn}`
- Kod paneli notları: `isTr ? scenario.notes[lang] : scenario.notesEn[lang]`
- Başlık ve alt açıklama metni TR/EN duyarlı hale getirildi

**Sonuç:** ✅ Dil toggle'ı artık PlaywrightLangCompare'i doğru şekilde güncelliyor.

---

### Yapılan 2: "Temel Farklılıklar" kutusu dinamik yapıldı

**Dosya:** `src/components/PlaywrightLangCompare.jsx`

**Sorun:** Kutudaki metin tüm senaryolar için aynı statik Login metnini gösteriyordu.

**Yapılan:**
- Her 5 senaryoya (`login`, `api`, `pom`, `data`, `hooks`) `differences` (TR) ve `differencesEn` (EN) alanı eklendi
- Kutu render'ı: `{isTr ? scenario?.differences : scenario?.differencesEn}`
- Başlık: `{isTr ? 'Temel Farklılıklar' : 'Key Differences'}`

**Örnek içerikler:**
- login: "Python: No await, synchronous API. Java: Manual browser management…"
- api: "Python: requests (3rd party) or page.request. Java: RestAssured BDD chain…"
- hooks: "Python: fixture scope, teardown after yield. Java: @BeforeAll/@AfterAll static…"

**Sonuç:** ✅ Senaryo değiştikçe kutu ilgili farklılıkları gösteriyor; TR/EN toggle çalışıyor.

---

### Yapılan 3: Java karşılaştırmaları inline eklendi

**Sorun:** Tüm Java karşılaştırmaları ayrı `sections[8]` sekmesinde toplanmıştı. Kullanıcı değişkeni öğrenirken Java karşılığını görmek için sekme değiştirmek zorunda kalıyordu.

**Yaklaşım:** Her section'ın `blocks` dizisinin **sonuna** yeni `java-compare` blokları eklendi (ortaya eklenmedi — TR override indeksleri kaymasın diye). `applyTr()` çağrılarına yeni indeksler için TR çevirileri eklendi. `sections[8]` referans amaçlı korundu.

#### `src/data/pythonData.js` — sections[2] sonuna (index 22-28):

| Index | Konu |
|---|---|
| 22 | Heading: `☕ If You Know Java: Data Type Bridge` |
| 23 | `java-compare`: Variables & Types |
| 24 | `java-compare`: null → None |
| 25 | `java-compare`: ArrayList → list |
| 26 | `java-compare`: HashMap → dict |
| 27 | `java-compare`: HashSet → set |
| 28 | `java-compare`: tuple (no Java equivalent!) |

#### `src/data/pythonData.js` — sections[3] sonuna (index 16-19):

| Index | Konu |
|---|---|
| 16 | Heading: `☕ If You Know Java: Control Flow Bridge` |
| 17 | `java-compare`: for loops |
| 18 | `java-compare`: methods → functions |
| 19 | `java-compare`: Exception handling |

#### `src/data/typescriptData.js` — sections[2] sonuna (index 24-27):

| Index | Konu |
|---|---|
| 24 | Heading: `☕ If You Know Java: Type System Bridge` |
| 25 | `java-compare`: Basic Types (number vs int/long/float) |
| 26 | `java-compare`: interface (structural typing!) |
| 27 | `java-compare`: access modifiers (same keywords!) |

#### `src/data/typescriptData.js` — sections[3] sonuna (index 16-18):

| Index | Konu |
|---|---|
| 16 | Heading: `☕ If You Know Java: Class & Generics Bridge` |
| 17 | `java-compare`: class (nearly identical!) |
| 18 | `java-compare`: Generics \<T\> |

**Sonuç:** ✅ Python Foundations sekmesi sonunda HashSet→set ve tuple blokları görünüyor. TypeScript Foundations sonunda structural typing karşılaştırması var. Build hatasız.

---

---

## Prompt 6 — test-frameworks.html TR/EN i18n (2026-06-09)

**İstek:** `public/test-frameworks.html` standalone HTML sayfasına (pytest/Selenium/Playwright rehberi) tam TR/EN dil desteği ekle. TR/EN toggle butonu, her yerden görünen 🏠 home butonu, Türkçe çeviri.

### Sorunlar ve Çözümler

| Sorun | Neden Oldu | Çözüm |
|---|---|---|
| Dil toggle çalışmıyordu | `el.style.display = ''` CSS kuralı `.lang-tr{display:none}`'i geçersiz kılmıyor | CSS data-attribute yaklaşımı: `[data-lang="tr"] .lang-en{display:none}` |
| TOC'ta EN+TR metin birleşik çıkıyordu | `h2.textContent` CSS `display:none`'ı görmez | `h2.innerText` kullanıldı (CSS'e saygı duyar) |
| Home butonu kaydırılıp görünmez oluyordu | Buton `.main` scroll alanının içindeydi | `position:fixed` `#floating-home` butonu eklendi (200px sonra görünür) |
| Back butonu yeni sekmede çalışmıyordu | `history.back()` yeni sekme açıldığında geçmişsiz | `goBack()`: `history.length > 1` kontrolü + fallback `./` |
| `applyLang` çalışmadan TOC build ediliyordu | Init sırası yanlıştı | Init: önce `applyLang(currentLang)`, sonra `updateNav()` |

### Çevrilen İçerikler (Tamamlanan)

- Hero başlık + açıklama
- Sidebar nav linkleri (20 adet)
- Tüm 14 section h2 başlığı
- 10+ h3 alt başlık
- 4 pytest kart, 4 Selenium kart, 6 Playwright özellik kartı
- 5 callout kutusu
- Lifecycle diyagram etiketleri, fixture scope barları, bekleme kartları
- Karşılaştırma tablo başlıkları
- Tüm paragraf metinleri (13 lang-en / 13 lang-tr çifti)
- java-cmp-note ve java-cmp-header metinleri
- "Playwright vs Selenium" karşılaştırma tablosu — 8 satır (Feature, Speed, Driver management vb.)
- "Framework Selection Guide" tablosu — 6 satır (Use Case, Recommendation, Why)
- `📋 Copy` / `✅ Copied!` → `📋 Kopyala` / `✅ Kopyalandı!` (currentLang bazlı)

### Sonuç

✅ Tüm içerik (paragraflar, kartlar, tablolar, başlıklar, butonlar) TR seçildiğinde Türkçe gösteriyor.  
✅ `data-lang` attribute CSS yaklaşımı — JS inline style hack yok.  
✅ TOC doğru dili yansıtıyor.  
✅ Home ve Back butonları çalışıyor.

### ⚠️ Eksikler / Tamamlanmayanlar

1. **React SPA ile dil senkronizasyonu yok:** `test-frameworks.html` localStorage'dan `tfLang` key'ini okur. Eğer React SPA'daki dil `en` iken kullanıcı `test-frameworks.html`'i açarsa sayfa `en` açılır — bağlantısı yok. Çözüm: React'ta "open" linkine `?lang=tr` query param eklemek.
2. **Karanlık/açık mod state kaybolur:** Tema tercihi localStorage'da tutulmuyor (sadece dil tutuluyor). Sayfa yenilendikçe dark mode'a dönüyor.
3. **Terminal simülasyonu statik:** pytest terminali section 1.5'te statik kod bloğu. Etkileşimli terminal animasyonu (karakter karakter yazma) olmadı.
4. **Tablo responsive değil:** `cmp-table` mobilde yatay scroll gerektiriyor ama bunu belirten bir UI ipucu yok.

---

## Prompt 7 — Bu Oturumda Devam Edilen İşler (2026-06-09)

Bu oturum Prompt 6'nın bıraktığı yerden devam etti. Context taşması nedeniyle iki tablo yarıda kalmıştı.

### Tamamlanan: Playwright vs Selenium karşılaştırma tablosu (8 satır)

`Auto-waiting`, `Driver management`, `Speed`, `Network mocking`, `Parallel tests`, `Industry adoption`, `Mobile emulation`, `Trace / debugging` — tümü `<span class="lang-en">...</span><span class="lang-tr">...</span>` çiftiyle sarıldı.

### Tamamlanan: Framework Selection Guide tablosu (6 satır)

`New project`, `Legacy project`, `Cross-browser`, `Complex test data`, `API-only`, `Enterprise` use case satırları — Use Case ve Why sütunları çevrildi.

### Son Doğrulama

- `<td>` içinde wrap'lenmemiş düz İngilizce metin kalmadı (grep doğruladı)
- `lang-en` / `lang-tr` paragraf çifti sayısı eşit: 13/13
- `cmp-note` sınıfında sarılmamış içerik kalmadı

---

## Prompt 8 — SESSION_HISTORY Sonraki Adımların Tamamlanması (2026-06-09)

Bu oturumda Prompt 7'nin "Yapılabilecek Sonraki Adımlar" listesindeki tüm maddeler tamamlandı.

### Tamamlanan 1: `test-frameworks.html` — React dil senkronizasyonu ✅

**Dosyalar:** `src/components/PythonPage.jsx`, `public/test-frameworks.html`

- `PythonPage.jsx` TestFrameworksBanner linkine `?lang=${language}` query param eklendi
- `test-frameworks.html` init'inde: `new URLSearchParams(location.search).get('lang') || localStorage.getItem('tfLang') || 'en'`
- React SPA'da TR seçiliyken linke tıklandığında `test-frameworks.html` doğrudan TR ile açılıyor

---

### Tamamlanan 2: `test-frameworks.html` — localStorage tema kaydı ✅

**Dosya:** `public/test-frameworks.html`

- `toggleTheme()` içine `localStorage.setItem('tfTheme', next)` eklendi
- Init'te `localStorage.getItem('tfTheme')` okunarak tema geri yükleniyor
- Sayfa yenilemesinde dark/light mod korunuyor

---

### Tamamlanan 3: SQL sayfasına Java (JDBC) karşılaştırmaları ✅

**Dosya:** `src/data/sqlData.js`

#### sections[2] sonuna eklendi (index 21-23):
| Index | Konu |
|---|---|
| 21 | Heading: `☕ If You Know Java: Database Access Bridge` |
| 22 | `java-compare`: JDBC DriverManager vs sqlite3/psycopg2 bağlantı açma |
| 23 | `java-compare`: Statement + ResultSet vs cursor.fetchall() |

#### sections[3] sonuna eklendi (index 21-23):
| Index | Konu |
|---|---|
| 21 | Heading: `☕ If You Know Java: PreparedStatement & Transactions` |
| 22 | `java-compare`: PreparedStatement → parameterized query (SQL injection önleme) |
| 23 | `java-compare`: Transaction yönetimi (setAutoCommit vs commit/rollback) |

Her iki section için `applyTr()` TR override'ları da eklendi.

---

### Tamamlanan 4: TypeScript Advanced + Intermediate görsel blokları ✅

**Dosya:** `src/data/typescriptData.js`

#### sections[3] sonuna (index 19-20):
| Index | Konu |
|---|---|
| 19 | `comparison` bloğu: Union (\|) "OR" vs Intersection (&) "AND" |
| 20 | `visual:flow` — POM sınıf hiyerarşisi (IPage → PageBase → LoginPage → test) |

#### sections[4] sonuna (index 16-17):
| Index | Konu |
|---|---|
| 16 | `visual:boxes` — Utility Types araç kutusu (Partial/Required/Readonly/Pick/Omit pipeline) |
| 17 | `visual:flow` — Conditional Type akış (T extends U ? X : Y, infer R, ReturnType\<T\>) |

Her iki section için TR override'ları eklendi.

---

### Tamamlanan 5: Python Advanced görselleştirmesi ✅

**Dosya:** `src/data/pythonData.js`

#### sections[4] sonuna (index 9-10):
| Index | Konu |
|---|---|
| 9 | `visual:flow` — Decorator execution flow (6 adım: receive func → wrapper → PRE → original → POST → return) |
| 10 | `visual:pyramid` — pytest fixture scopes (session → module → class → function, en geniş tabandan en dara) |

TR override'ları eklendi.

---

### Tamamlanan 6: JMeter sections[2] görsel bloklar ✅

**Dosya:** `src/data/jmeterData.js`

`jmeterData.js` `applyTr()` kullanmıyor — EN ve TR bloklar ayrı yazıldı.

#### EN sections[2] sonuna:
- `visual:boxes` — JMeter Test Plan Anatomy pipeline (Test Plan → Thread Group → HTTP Sampler → Assertion → Listener)
- `comparison` — Debug Listeners (View Results Tree) vs Report Listeners (Aggregate Report, Summary Report, HTML Dashboard)

#### TR sections[2] sonuna:
- Aynı bloklar Türkçe etiket ve içerikle

---

### Tamamlanan 7: Python/TypeScript sections[8] `why_en`/`note_en` EN çevirileri ✅

**Dosyalar:** `src/data/pythonData.js`, `src/data/typescriptData.js`, `src/components/TopicPage.jsx`

#### TopicPage.jsx — `JavaCompareBlock` güncellendi:
- `useLanguage()` hook eklendi
- `const whyText = isTr ? block.why : (block.why_en ?? block.why)` pattern
- `const noteText = isTr ? block.note : (block.note_en ?? block.note)`
- `block.sql` alanı desteği eklendi (SQL field için `🗄️` ikonu)
- Header label: TR'de "Java Biliyorsan:", EN'de "If You Know Java:"
- `whyLabel`: TR'de "🤔 Neden?", EN'de "🤔 Why?"

#### pythonData.js sections[8] — 15 java-compare bloğa `why_en`+`note_en` eklendi:
Variables, None, list, dict, set, tuple, f-string, for loop, functions, exception, class, access modifiers, streams→comprehension, try-with-resources, inheritance

#### typescriptData.js sections[8] — 9 java-compare bloğa `why_en`+`note_en` eklendi:
Basic Types, interface (structural typing), class, access modifiers, Generics, enum, null safety, union types, async/await

#### typescriptData.js sections[8] base data İngilizceye çevrildi:
- `title`: "☕ Java → TypeScript: Great News — Very Similar!"
- Block 0 intro metni İngilizce
- Tüm heading bloklar (1, 3, 5, 7, 9, 11, 13, 15, 17, 19) İngilizce
- Block 20 karşılaştırma tablosu (headers + rows) İngilizce
- `applyTr()` Türkçe override'ları yerinde bırakıldı

---

---

## Prompt 9 — Orta Öncelik Maddeleri Tamamlandı (2026-06-10)

### Tamamlanan 1: PlaywrightLangCompare.jsx TR/EN kontrol ✅

`useLanguage()` hook zaten doğru kullanılıyor. Tüm label, desc, notes, differences, başlık ve alt metin alanları `isTr` kontrolüyle TR/EN duyarlı. Sabit string kalmadı.

### Tamamlanan 2: Python sections[5] görsel bloklar ✅

**Dosya:** `src/data/pythonData.js`

Sections[5] sonuna (index 14-17) eklendi:

| Index | Tür | İçerik |
|---|---|---|
| 14 | `heading` | 🗂️ How pytest Finds and Injects Fixtures |
| 15 | `visual:flow` | pytest Fixture Discovery & Injection Flow (6 adım: test dosyası → yerel conftest → üst conftest → plugin → builtin → inject & run) |
| 16 | `comparison` | ❌ Manuel kurulum anti-pattern vs ✅ Fixture: DRY, Automatic Teardown |
| 17 | `quiz` | scope="session" → tüm oturum için 1 kez sorusu |

`applyTr(sections[5], ...)` bloğuna 14/15/16/17 TR override'ları eklendi.

### Tamamlanan 3: TypeScript sections[5] görsel bloklar ✅

**Dosya:** `src/data/typescriptData.js`

Sections[5] sonuna (index 14-17) eklendi:

| Index | Tür | İçerik |
|---|---|---|
| 14 | `heading` | 🏗️ Playwright POM Architecture — Class Hierarchy |
| 15 | `visual:flow` | TypeScript POM Class Hierarchy (IPage → PageBase → LoginPage → fixture → test) |
| 16 | `comparison` | ❌ Untyped Playwright (selector typo at runtime) vs ✅ Typed POM (compile error) |
| 17 | `visual:boxes` | Typed Fixture Pipeline (config → test.extend → LoginPage → test → assertions) |

`applyTr(sections[5], ...)` bloğuna 14/15/16/17 TR override'ları eklendi.

### Tamamlanan 4: SQL sections[2] DML Java karşılaştırmaları ✅

**Dosya:** `src/data/sqlData.js`

Sections[2] sonuna (index 24-26) eklendi:

| Index | Tür | İçerik |
|---|---|---|
| 24 | `heading` | ☕ If You Know Java: DML Operations Bridge |
| 25 | `java-compare` | INSERT INTO vs JPA EntityManager.persist() — SQL batch insert avantajı |
| 26 | `java-compare` | UPDATE/DELETE vs JPA merge()/remove() — SQL WHERE gücü |

`applyTr(sections[2], ...)` bloğuna 24/25/26 TR override'ları eklendi.

**Not:** SESSION_HISTORY'de "sections[1] (DML)" yazıyordu ama DML içeriği sections[2]'de (Foundations). Blocks sections[2]'ye eklendi.

### Tamamlanan 5: JMeter sections[2] Thread Group görseller ✅

**Dosya:** `src/data/jmeterData.js`

EN sections[2] ve TR sections[2] sonuna eklendi:

| Tür | İçerik |
|---|---|
| `visual:flow` | Thread Group Ramp-Up Timeline (T=0 → ramp → full load → sustained → end) |
| `visual:boxes` | Thread Group Parameters pipeline (Threads → Ramp-Up → Loop/Duration → test) |

Her iki dil için ayrı bloklar eklendi (jmeterData `applyTr` kullanmıyor).

---

## Prompt 10 — test-frameworks.html Back Butonu Düzeltmesi (2026-06-10)

**İstek:** `test-frameworks.html?lang=en#pytest-fixtures` sayfasında "← Back" butonuna basıldığında Python ana sayfasına dönmüyordu.

**Sorunun Nedeni:** `PythonPage.jsx`'teki bağlantı `target="_blank"` ile yeni sekmede açılıyor. Yeni sekme boş geçmişle başlar. Kullanıcı sayfa içi `#pytest-fixtures` anchor'ına tıklarsa `history.length` 2 olur ama `history.back()` sadece sayfanın başına döner — Python sayfasına değil.

**Yapılan:**

**`src/components/PythonPage.jsx`:**
- URL'ye `&ref=python` parametresi eklendi:  
  `test-frameworks.html?lang=${language}&ref=python`

**`public/test-frameworks.html` — `goBack()` fonksiyonu:**
```javascript
// Eski:
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = './';
  }
}

// Yeni:
function goBack() {
  const ref = new URLSearchParams(location.search).get('ref');
  if (ref) {
    window.location.href = './#/' + ref;   // → ./#/python
  } else if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = './';
  }
}
```

**Sonuç:** ✅ Back butonuna basıldığında `ref=python` okunarak `./#/python` adresine gidiliyor. Python sayfası açılıyor.

**Genişletilebilirlik:** Gelecekte başka sayfalardan da `test-frameworks.html`'e bağlantı verilirse ilgili `&ref=<route>` parametresi eklenerek doğru sayfaya dönüş sağlanabilir.

---

## Kapsam Durumu (2026-06-10 itibarıyla)

| Sayfa | Section | Görsel Blok | Java Karşılaştırması |
|---|---|---|---|
| **SQL** | 0 Intro | ✅ (QA flow, tablo, quiz) | ❌ |
| **SQL** | 1 Kurulum | ❌ | ❌ |
| **SQL** | 2 Foundations | ✅ (flow, table, null comparison, quiz) | ✅ (JDBC + DML) |
| **SQL** | 3 Intermediate | ✅ (JOIN animasyonları, comparison, quiz) | ✅ (PreparedStatement, Transaction) |
| **SQL** | 4–7 | ❌ | ❌ |
| **Python** | 0 Intro | ❌ | ❌ |
| **Python** | 1 Kurulum | ❌ | ❌ |
| **Python** | 2 Foundations | ✅ (data-structure, comparison, quiz) | ✅ (ArrayList→list, HashMap→dict, vb.) |
| **Python** | 3 Intermediate | ✅ (comparison, quiz) | ✅ (for loop, function, exception) |
| **Python** | 4 Advanced | ✅ (decorator flow, fixture pyramid) | ❌ |
| **Python** | 5 QA Use Cases | ✅ (fixture flow, comparison, quiz) | ❌ |
| **Python** | 6–7 | ❌ | ❌ |
| **Python** | 8 Java→Python | ✅ (15 karşılaştırma + tablo) | ✅ (ayrı sekme) |
| **TypeScript** | 0 Intro | ❌ | ❌ |
| **TypeScript** | 1 Kurulum | ❌ | ❌ |
| **TypeScript** | 2 Foundations | ✅ (pipeline boxes, comparison, quiz) | ✅ (type system, interface, access mod) |
| **TypeScript** | 3 Intermediate | ✅ (union vs intersection, POM flow) | ✅ (class, generics) |
| **TypeScript** | 4 Advanced | ✅ (utility types boxes, conditional flow) | ❌ |
| **TypeScript** | 5 QA Use Cases | ✅ (POM flow, comparison, fixture boxes) | ❌ |
| **TypeScript** | 6–7 | ❌ | ❌ |
| **TypeScript** | 8 Java→TS | ✅ (9 karşılaştırma + tablo) | ✅ (ayrı sekme) |
| **JMeter** | 0 Intro | ✅ (performans piramidi, bileşen mimarisi, flow, quiz) | ❌ |
| **JMeter** | 1 Kurulum | ❌ | ❌ |
| **JMeter** | 2 Intermediate | ✅ (Test Plan anatomy, Debug vs Report, Ramp-up flow, Thread Group boxes) | ❌ |
| **JMeter** | 3–4 | ❌ | ❌ |

---

---

## Prompt 11 — Orta Öncelik Maddeleri Tamamlandı (2026-06-10)

### Tamamlanan 1: SQL sections[1] Kurulum — Java JDBC bağlantı karşılaştırmaları ✅

**Dosya:** `src/data/sqlData.js`

Sections[1] sonuna (index 13-15) eklendi:
| Index | Tür | İçerik |
|---|---|---|
| 13 | `heading` | ☕ If You Know Java: Database Connection Bridge |
| 14 | `java-compare` | JDBC DriverManager vs sqlite3/psycopg2 bağlantı kurulumu |
| 15 | `java-compare` | Maven pom.xml vs pip — bağımlılık kurulumu |

`applyTr(sections[1])` bloğuna 13/14/15 TR override'ları eklendi.

---

### Tamamlanan 2: Python sections[6] Interview Q&A — ileri kavramlar java-compare ✅

**Dosya:** `src/data/pythonData.js`

Sections[6] sonuna (index 17-20) eklendi:
| Index | Tür | İçerik |
|---|---|---|
| 17 | `heading` | ☕ If You Know Java: Advanced Python Concepts Bridge |
| 18 | `java-compare` | Decorator vs AOP / Spring @Around |
| 19 | `java-compare` | Generator vs Iterator/Iterable boilerplate |
| 20 | `java-compare` | Context Manager vs try-with-resources |

`applyTr(sections[6])` bloğuna 17/18/19/20 TR override'ları eklendi.

---

### Tamamlanan 3: TypeScript sections[6] Interview Q&A — ileri kavramlar java-compare ✅

**Dosya:** `src/data/typescriptData.js`

Sections[6] sonuna (index 18-21) eklendi:
| Index | Tür | İçerik |
|---|---|---|
| 18 | `heading` | ☕ If You Know Java: Interview Q Bridge |
| 19 | `java-compare` | Structural vs Nominal Typing — interface Q2 derinlemesine |
| 20 | `java-compare` | Generics <T> — Java vs TypeScript Q7 derinlemesine |
| 21 | `java-compare` | readonly vs final + Readonly<T> utility — Q10 derinlemesine |

`applyTr(sections[6])` bloğuna 18/19/20/21 TR override'ları eklendi.

---

### Tamamlanan 4: SQL sections[4] Advanced — ACID flow ve Transaction boxes ✅

**Dosya:** `src/data/sqlData.js`

Sections[4] sonuna (index 13-14) eklendi:
| Index | Tür | İçerik |
|---|---|---|
| 13 | `visual:flow` | ACID Transaction Flow — A/C/I/D adımları highlight ile |
| 14 | `visual:boxes` | Transaction Lifecycle — START → INSERT/UPDATE → COMMIT / ROLLBACK |

`applyTr(sections[4])` bloğuna 13/14 TR override'ları eklendi.

---

### Tamamlanan 5: JMeter sections[3] Advanced (EN + TR) — CLI flow ve Debug vs Report comparison ✅

**Dosya:** `src/data/jmeterData.js`

EN sections[3] ve TR sections[3] sonuna eklendi:
| Tür | İçerik |
|---|---|
| `visual:flow` | Non-GUI CLI Command Pipeline (test.jmx → -n → .jtl → -e -o → HTML) |
| `comparison` | ❌ Debug Listeners (View Results Tree) vs ✅ Report Listeners (Aggregate Report + Dashboard) |

Her iki dil için ayrı bloklar eklendi (jmeterData `applyTr` kullanmıyor).

---

## Yapılabilecek Sonraki Adımlar (Güncel Öneri Sırası)

### Orta Öncelik
~~1–5 Tüm orta öncelik maddeleri~~ ✅ Tamamlandı (Prompt 11)

### Düşük Öncelik
6. **Python/TypeScript sections[8] (`java-compare`) `topic` field TR çevirisi:** `applyTr()` `topic` alanını override etmiyor — TR modda da İngilizce topic başlıkları görünüyor. Tutarsız ama kritik değil.

7. **"Try it yourself" editör:** Monaco Editor veya CodeMirror entegrasyonu — en büyük W3Schools farkı.

8. **Mevcut `FrameworkComparison` ile `PlaywrightLangCompare` birleştirme veya ayrım belirginleştirme:** Ana sayfada iki karşılaştırma bölümü var; rolleri daha net ayrılabilir.

9. **Progress tracking:** Tamamlanan sekmeleri localStorage'da tut, tab üzerinde ✅ göster.

10. **test-frameworks.html terminal simülasyonu:** Statik kod bloğu → karakter karakter yazan animasyonlu terminal.

11. **Mobil UX iyileştirme:** `PlaywrightLangCompare` 3 sütun `lg:grid-cols-3` → mobilde yatay kaydırma veya sekme düzeni.

---

## Hata Geçmişi (Build Sorunları)

| Hata | Sebep | Çözüm |
|---|---|---|
| TypeScript sekmeleri boş | `code.trim()` undefined crash | `(code \|\| '').trim()` |
| `animate-[fadeIn_0.3s_ease]` çalışmıyor | Tailwind custom animation tanımlı değil | `transition-all duration-300` ile değiştirildi |
| Build: `'QA'de'` parse error | Turkish apostrophe single-quote string kapatıyor | `'QA\'de'` escape |
| Build: `{}'içine` parse error | `{}` + `'` string'i kapatıyor | Farklı ifadeyle yeniden yazıldı |
| JMeter Edit failed | Exact whitespace mismatch | Dosya önce Read, sonra küçük match string ile Edit |
