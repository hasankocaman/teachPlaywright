# QA_FRAMEWORK_SPEC.md — QA Framework Derinlik Kuralları

> **Bu dosya ne içerir:** pytest, Selenium, Playwright için tam proje yapıları,  
> her QA aksiyonunun eksiksiz kodu, mimari diyagramları, hata sözlükleri.  
> **Ne zaman oku:** Python/TS sayfalarında Test Frameworks bölümü yazarken.  
> **Not:** Her örnekte Java eşdeğeri de verilmeli. Bkz: `.claude/JAVA_COMPARISON.md`

---

## 1. Framework Sekmesi Yapısı

Python sayfasında ayrı "Test Frameworks" sekmesi/bölümü olmalı.  
Bu bölüm 3 alt framework içerir: **pytest | Selenium | Playwright**

TypeScript sayfasında: **Playwright (TS) | Jest** 

Her framework bölümü şunları içermeli:
1. Proje yapısı (interactive file tree)
2. Mimari diyagram (inline SVG)
3. Kurulum adımları
4. Tüm QA aksiyonları (aşağıdaki liste eksiksiz olmalı)
5. Error Dictionary

---

## 2. pytest — Tam Proje Yapısı

```
my_project/
├── conftest.py              ← Global fixture tanımları, hooks
├── pytest.ini               ← pytest konfigürasyonu
├── requirements.txt         ← Bağımlılıklar
├── .env                     ← Ortam değişkenleri (BASE_URL vb.)
├── pages/                   ← Page Object Model sınıfları
│   ├── __init__.py
│   ├── base_page.py         ← Tüm page'lerin türediği temel sınıf
│   ├── login_page.py        ← Login sayfası aksiyonları
│   └── dashboard_page.py    ← Dashboard sayfası aksiyonları
├── tests/
│   ├── __init__.py
│   ├── test_login.py        ← Login test case'leri
│   ├── test_dashboard.py    ← Dashboard test case'leri
│   └── api/
│       └── test_users_api.py← API test case'leri
├── utils/
│   ├── __init__.py
│   ├── data_factory.py      ← Test verisi üretici
│   └── helpers.py           ← Yardımcı fonksiyonlar
└── reports/
    └── .gitkeep             ← HTML raporlar buraya gider
```

**pytest.ini:**
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = --html=reports/report.html --self-contained-html -v
markers =
    smoke: Smoke test suite
    regression: Regression test suite
    api: API tests only
    ui: UI tests only
```

**conftest.py (tam örnek):**
```python
import pytest                          # pytest framework
from selenium import webdriver         # Selenium WebDriver
from selenium.webdriver.chrome.options import Options  # Chrome ayarları

@pytest.fixture(scope="session")       # Tüm session boyunca TEK kez çalışır
def base_url():
    return "https://automationexercise.com"

@pytest.fixture(scope="function")      # Her test için ayrı browser başlatır
def driver(base_url):
    options = Options()
    options.add_argument("--headless")  # Görünmez mod (CI için)
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    drv = webdriver.Chrome(options=options)  # Chrome başlat
    drv.implicitly_wait(5)                   # Implicit wait: 5 saniye
    drv.maximize_window()                    # Ekranı maksimize et
    drv.get(base_url)                        # Başlangıç URL'i aç
    
    yield drv                                # Testi çalıştır
    
    drv.quit()                               # Test bitince browser kapat

@pytest.fixture                        # API testleri için base session
def api_session():
    import requests
    session = requests.Session()             # HTTP oturum oluştur
    session.headers.update({
        "Content-Type": "application/json"  # JSON header ekle
    })
    yield session
    session.close()                          # Oturum kapat
```

---

## 3. Selenium — Tam Aksiyon Listesi

Aşağıdaki her aksiyon için: açıklama + kod + Java karşılığı + ne zaman kullanılır.

### 3.1 Temel Aksiyonlar

```python
# CLICK
element.click()                            # Normal tıklama

# DOUBLE CLICK
from selenium.webdriver.common.action_chains import ActionChains
ActionChains(driver).double_click(element).perform()

# RIGHT CLICK (Context Menu)
ActionChains(driver).context_click(element).perform()

# HOVER
ActionChains(driver).move_to_element(element).perform()

# DRAG AND DROP
ActionChains(driver).drag_and_drop(source, target).perform()
# Alternatif (offset ile):
ActionChains(driver).click_and_hold(source).move_by_offset(x, y).release().perform()

# SEND KEYS (yazma)
element.send_keys("merhaba dünya")        # Metin yaz
from selenium.webdriver.common.keys import Keys
element.send_keys(Keys.ENTER)             # Enter'a bas
element.send_keys(Keys.TAB)              # Tab'a bas
element.send_keys(Keys.CONTROL + 'a')   # Ctrl+A (tümünü seç)
element.send_keys(Keys.CONTROL + 'c')   # Ctrl+C (kopyala)

# CLEAR (temizle)
element.clear()                           # Input içeriğini sil
```

### 3.2 Dropdown Seçimi

```python
from selenium.webdriver.support.ui import Select

select = Select(driver.find_element(By.ID, "dropdown"))

# Görünen metne göre seç
select.select_by_visible_text("Option 2")

# Value attribute'una göre seç
select.select_by_value("option2")

# Index'e göre seç (0'dan başlar)
select.select_by_index(1)

# Seçili seçeneği al
selected = select.first_selected_option.text

# Tüm seçenekleri listele
all_options = [opt.text for opt in select.options]
```

### 3.3 iframe İşlemleri

```python
# ID ile iframe'e geç
driver.switch_to.frame("iframe-id")

# Name ile geç
driver.switch_to.frame("iframe-name")

# Index ile geç (sayfadaki kaçıncı iframe — 0'dan başlar)
driver.switch_to.frame(0)

# Element ile geç
iframe_elem = driver.find_element(By.TAG_NAME, "iframe")
driver.switch_to.frame(iframe_elem)

# Ana içeriğe geri dön
driver.switch_to.default_content()

# Bir üst frame'e çık (iç içe iframe'lerde)
driver.switch_to.parent_frame()
```

### 3.4 Alert / Confirm / Prompt

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, 10)           # Max 10 saniye bekle

# Alert bekleme
alert = wait.until(EC.alert_is_present())

# Alert metnini al
text = alert.text                          # "Are you sure?" gibi

# Alert kabul et (OK)
alert.accept()

# Alert reddet (Cancel)
alert.dismiss()

# Prompt'a metin yaz
alert.send_keys("merhaba")               # Önce yaz
alert.accept()                            # Sonra OK'ye bas
```

### 3.5 Pencere / Sekme Yönetimi

```python
# Mevcut pencere handle'ı al
main_window = driver.current_window_handle

# Tüm pencere handle'larını al
all_windows = driver.window_handles

# Yeni sekmeye geç
driver.switch_to.window(all_windows[1])   # 2. sekmeye geç

# Yeni sekme aç
driver.execute_script("window.open('', '_blank');")
driver.switch_to.window(driver.window_handles[-1])  # En son sekmeye geç

# Ana pencereye dön
driver.switch_to.window(main_window)

# Pencereyi kapat (sadece aktif sekme)
driver.close()

# Tüm browser'ı kapat
driver.quit()
```

### 3.6 Screenshot

```python
# Sayfanın tamamını screenshot al
driver.save_screenshot("screenshot.png")

# Sadece bir element'in screenshot'ı
element.screenshot("element.png")

# Base64 olarak al (CI raporlama için)
png_data = driver.get_screenshot_as_base64()
```

### 3.7 Scroll

```python
# Sayfanın en altına git
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# Sayfanın en üstüne git
driver.execute_script("window.scrollTo(0, 0);")

# Belirli element'e scroll (görünür yap)
driver.execute_script("arguments[0].scrollIntoView(true);", element)

# Belirli koordinata scroll
driver.execute_script("window.scrollTo(500, 1000);")

# ActionChains ile scroll (Selenium 4.2+)
ActionChains(driver).scroll_to_element(element).perform()
```

### 3.8 JavaScript Yürütme

```python
# JS kodu çalıştır
driver.execute_script("document.title = 'Test';")

# Element üzerinde JS çalıştır (arguments[0] = element)
driver.execute_script("arguments[0].click();", element)     # JS click (normal click çalışmıyorsa)
driver.execute_script("arguments[0].value = '';", element)  # Input'u temizle
driver.execute_script("arguments[0].style.border='2px solid red';", element)  # Highlight

# Değer döndür
title = driver.execute_script("return document.title;")
scroll_pos = driver.execute_script("return window.pageYOffset;")
```

### 3.9 Cookie İşlemleri

```python
# Tüm cookie'leri al
all_cookies = driver.get_cookies()

# Belirli cookie'yi al
session_cookie = driver.get_cookie("session_id")

# Cookie ekle
driver.add_cookie({
    "name": "session_id",
    "value": "abc123",
    "domain": "example.com",
    "path": "/",
    "secure": True,
    "httpOnly": False
})

# Cookie sil
driver.delete_cookie("session_id")

# Tüm cookie'leri sil
driver.delete_all_cookies()
```

### 3.10 Dosya Upload

```python
import os

# Dosya input'una dosya yolu gönder
file_input = driver.find_element(By.CSS_SELECTOR, "input[type='file']")
file_path = os.path.abspath("test_file.txt")   # Mutlak yol kullan
file_input.send_keys(file_path)                # Dosyayı seç
```

### 3.11 Explicit Wait / Implicit Wait

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# IMPLICIT WAIT (global, tüm find_element'ler için)
driver.implicitly_wait(10)                     # 10 saniyeye kadar bekle

# EXPLICIT WAIT (belirli koşul için)
wait = WebDriverWait(driver, 15)               # Timeout: 15 saniye

# Yaygın bekleme koşulları:
wait.until(EC.presence_of_element_located((By.ID, "result")))      # DOM'da var mı?
wait.until(EC.visibility_of_element_located((By.ID, "modal")))     # Görünür mü?
wait.until(EC.element_to_be_clickable((By.ID, "submit")))          # Tıklanabilir mi?
wait.until(EC.text_to_be_present_in_element((By.ID, "msg"), "OK")) # Metin var mı?
wait.until(EC.invisibility_of_element_located((By.ID, "loader")))  # Kayboldu mu?
wait.until(EC.title_contains("Dashboard"))                          # Başlık değişti mi?
wait.until(EC.url_contains("/dashboard"))                          # URL değişti mi?
wait.until(EC.alert_is_present())                                  # Alert çıktı mı?
wait.until(EC.frame_to_be_available_and_switch_to_it((By.ID, "iframe-id")))  # Frame hazır mı?

# FLUENT WAIT (özelleşmiş bekleme)
from selenium.webdriver.support.wait import WebDriverWait
wait = WebDriverWait(driver, 20, poll_frequency=0.5,               # Her 0.5 saniyede kontrol
    ignored_exceptions=[NoSuchElementException])                   # Bu hatayı yok say
```

### 3.12 Locator Stratejileri

```python
from selenium.webdriver.common.by import By

# ID
driver.find_element(By.ID, "username")

# CSS Selector
driver.find_element(By.CSS_SELECTOR, "#username")
driver.find_element(By.CSS_SELECTOR, ".login-btn")
driver.find_element(By.CSS_SELECTOR, "input[type='email']")
driver.find_element(By.CSS_SELECTOR, "input[data-testid='email']")
driver.find_element(By.CSS_SELECTOR, "ul > li:first-child")

# XPath
driver.find_element(By.XPATH, "//input[@id='username']")
driver.find_element(By.XPATH, "//button[text()='Login']")
driver.find_element(By.XPATH, "//button[contains(text(), 'Log')]")
driver.find_element(By.XPATH, "//label[text()='Email']/following-sibling::input")
driver.find_element(By.XPATH, "//div[@class='container']//button")

# Name
driver.find_element(By.NAME, "username")

# Class Name (sadece tek class)
driver.find_element(By.CLASS_NAME, "login-button")

# Tag Name
driver.find_elements(By.TAG_NAME, "input")

# Link Text (tam metin)
driver.find_element(By.LINK_TEXT, "Forgot Password?")

# Partial Link Text (kısmi metin)
driver.find_element(By.PARTIAL_LINK_TEXT, "Forgot")

# Birden fazla element (liste döner)
elements = driver.find_elements(By.CSS_SELECTOR, "li.item")
```

---

## 4. Playwright (Python) — Tam Aksiyon Listesi

### 4.1 Kurulum ve Proje Yapısı

```
playwright_project/
├── conftest.py              ← Playwright fixture'ları (page, browser)
├── pytest.ini               ← pytest konfigürasyonu
├── playwright.config.py     ← Playwright global ayarları (bkz. aşağı)
├── pages/
│   ├── base_page.py         ← BasePage
│   ├── login_page.py
│   └── product_page.py
├── tests/
│   ├── test_login.py
│   ├── test_checkout.py
│   └── api/
│       └── test_api.py
├── test_data/
│   └── users.json
└── reports/
    └── .gitkeep
```

**Kurulum:**
```bash
pip install pytest-playwright          # pytest Playwright entegrasyonu
playwright install chromium            # Chromium tarayıcısını indir
playwright install firefox             # (opsiyonel)
playwright install webkit              # (opsiyonel)
```

### 4.2 conftest.py (Playwright)

```python
import pytest
from playwright.sync_api import sync_playwright, Page, BrowserContext

@pytest.fixture(scope="session")
def playwright_instance():
    with sync_playwright() as pw:         # Playwright başlat
        yield pw                           # Testler çalışsın

@pytest.fixture(scope="session")
def browser(playwright_instance):
    browser = playwright_instance.chromium.launch(
        headless=False,                    # Görünür mod (debug için True yap)
        slow_mo=100,                       # Her aksiyon arası 100ms bekle
    )
    yield browser
    browser.close()                        # Tüm testler bitince kapat

@pytest.fixture
def context(browser):
    ctx: BrowserContext = browser.new_context(
        viewport={"width": 1280, "height": 720},  # Ekran boyutu
        record_video_dir="videos/",               # Video kayıt (opsiyonel)
    )
    yield ctx
    ctx.close()

@pytest.fixture
def page(context) -> Page:
    pg = context.new_page()               # Yeni sekme aç
    pg.set_default_timeout(15000)         # Global timeout: 15 saniye
    yield pg
    pg.screenshot(path="last_state.png") # Hata sonrası screenshot
    pg.close()
```

### 4.3 Playwright Aksiyonlar

```python
# CLICK
page.click("#submit-btn")                                    # CSS ile
page.locator("button", has_text="Login").click()            # Metin ile
page.get_by_role("button", name="Login").click()            # ARIA role ile
page.get_by_test_id("login-btn").click()                    # data-testid ile
page.get_by_label("Email").click()                          # Label ile
page.get_by_placeholder("Enter email").click()              # Placeholder ile

# DOUBLE CLICK
page.dblclick("#item")
page.locator("#item").dblclick()

# RIGHT CLICK
page.click("#item", button="right")

# HOVER
page.hover("#menu-item")
page.locator("#menu").hover()

# DRAG AND DROP
page.drag_and_drop("#source", "#target")
page.locator("#source").drag_to(page.locator("#target"))

# TYPE (karakter karakter)
page.type("#search", "hello", delay=100)                    # Her karakter arası 100ms

# FILL (hızlı doldur, type'dan farklı — events tetikler)
page.fill("#email", "test@example.com")
page.locator("#password").fill("secret123")

# CLEAR + FILL
page.fill("#input", "")                                     # Önce temizle
page.fill("#input", "yeni değer")                          # Sonra yaz

# PRESS KEY
page.press("#input", "Enter")
page.press("#input", "Tab")
page.press("#input", "Control+A")
page.keyboard.press("Escape")

# SELECT DROPDOWN
page.select_option("#dropdown", "option-value")            # Value ile
page.select_option("#dropdown", label="Option Text")       # Görünen metin ile
page.select_option("#dropdown", index=2)                   # Index ile

# CHECKBOX
page.check("#agree-checkbox")
page.uncheck("#agree-checkbox")
page.locator("#agree").set_checked(True)

# SCREENSHOT
page.screenshot(path="full-page.png", full_page=True)     # Tam sayfa
page.locator("#header").screenshot(path="header.png")     # Element screenshot

# SCROLL
page.mouse.wheel(0, 1000)                                  # Aşağı scroll
page.locator("#lazy-section").scroll_into_view_if_needed() # Element'e scroll
page.evaluate("window.scrollTo(0, document.body.scrollHeight)")  # JS ile

# JAVASCRIPT YÜRÜTME
result = page.evaluate("document.title")                   # Değer döndür
page.evaluate("document.title = 'Test'")                  # Değer ata
page.evaluate("el => el.click()", element_handle)         # Element üzerinde

# IFRAME
frame = page.frame_locator("#my-iframe")                  # iframe içeriğine eriş
frame.locator("#button-inside").click()                   # iframe içinde aksiyon
# Ada göre
frame_by_name = page.frame(name="iframe-name")
frame_by_name.locator("button").click()

# ALERT / DIALOG
page.on("dialog", lambda dialog: dialog.accept())         # Otomatik kabul
page.on("dialog", lambda dialog: dialog.dismiss())        # Otomatik reddet
page.on("dialog", lambda dialog: (dialog.fill("cevap"), dialog.accept()))

# NETWORK INTERCEPTION
page.route("**/api/login", lambda route: route.fulfill(
    status=200,
    content_type="application/json",
    body='{"token": "fake-token", "userId": 1}'
))

# API yanıtı bekleme
with page.expect_response("**/api/login") as resp_info:
    page.click("#login-btn")
response = resp_info.value
assert response.status == 200

# DOSYA UPLOAD
page.set_input_files("#file-input", "path/to/file.txt")
page.set_input_files("#file-input", ["file1.txt", "file2.txt"])  # Çoklu dosya

# COOKIE
context.add_cookies([{
    "name": "session",
    "value": "abc123",
    "domain": "example.com",
    "path": "/"
}])
cookies = context.cookies()
context.clear_cookies()

# YENİ SEKME / PENCERE
with context.expect_page() as new_page_info:
    page.click("#open-new-tab")
new_page = new_page_info.value
new_page.wait_for_load_state()                             # Yüklenmesini bekle

# WAIT
page.wait_for_selector("#result", state="visible")        # Görünür olana dek
page.wait_for_selector("#loader", state="hidden")         # Kaybolana dek
page.wait_for_url("**/dashboard")                         # URL değişene dek
page.wait_for_load_state("networkidle")                   # Ağ trafiği duruana dek

# ASSERTION (expect)
from playwright.sync_api import expect
expect(page.locator("#title")).to_be_visible()
expect(page.locator("#title")).to_have_text("Dashboard")
expect(page.locator("#count")).to_have_text("5")
expect(page).to_have_url("https://example.com/dashboard")
expect(page).to_have_title("Dashboard")
expect(page.locator("#btn")).to_be_enabled()
expect(page.locator("#loader")).to_be_hidden()
```

---

## 5. Playwright (TypeScript) — Proje Yapısı

```
playwright-ts-project/
├── playwright.config.ts         ← Playwright konfigürasyonu
├── package.json
├── tsconfig.json
├── pages/
│   ├── BasePage.ts              ← Temel sayfa sınıfı
│   ├── LoginPage.ts             ← Login aksiyonları
│   └── DashboardPage.ts         ← Dashboard aksiyonları
├── tests/
│   ├── login.spec.ts            ← Login testleri
│   └── dashboard.spec.ts        ← Dashboard testleri
├── fixtures/
│   └── customFixtures.ts        ← Özelleştirilmiş fixture'lar
├── utils/
│   └── helpers.ts               ← Yardımcı fonksiyonlar
└── test-results/                ← Otomatik oluşur
```

**playwright.config.ts:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,              // Testleri paralel çalıştır
  retries: process.env.CI ? 2 : 0, // CI'da 2 retry
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',        // Hata olursa trace kaydet
    screenshot: 'only-on-failure',  // Sadece başarısız testte screenshot
    video: 'retain-on-failure',     // Sadece başarısız testte video
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  ],
});
```

---

## 6. Mimari Diyagram SVG'leri

### pytest Diyagramı

```jsx
// data dosyasında:
{
  type: 'diagram-svg',
  title: { tr: 'pytest Akış Diyagramı', en: 'pytest Flow Diagram' },
  svg: `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;background:#12121f;border-radius:8px;padding:16px">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed"/>
    </marker>
  </defs>
  <!-- conftest.py -->
  <rect x="20" y="120" width="120" height="60" rx="8" fill="#27273a" stroke="#7c3aed" stroke-width="2"/>
  <text x="80" y="148" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold">conftest.py</text>
  <text x="80" y="168" text-anchor="middle" fill="#6c7086" font-size="11">fixtures &amp; hooks</text>
  <!-- Arrow -->
  <line x1="140" y1="150" x2="200" y2="150" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- test_*.py -->
  <rect x="200" y="120" width="120" height="60" rx="8" fill="#27273a" stroke="#10b981" stroke-width="2"/>
  <text x="260" y="148" text-anchor="middle" fill="#10b981" font-size="13" font-weight="bold">test_*.py</text>
  <text x="260" y="168" text-anchor="middle" fill="#6c7086" font-size="11">test functions</text>
  <!-- Arrow -->
  <line x1="320" y1="150" x2="380" y2="150" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Assert -->
  <rect x="380" y="120" width="100" height="60" rx="8" fill="#27273a" stroke="#f59e0b" stroke-width="2"/>
  <text x="430" y="148" text-anchor="middle" fill="#f59e0b" font-size="13" font-weight="bold">assert</text>
  <text x="430" y="168" text-anchor="middle" fill="#6c7086" font-size="11">PASS / FAIL</text>
  <!-- Arrow -->
  <line x1="480" y1="150" x2="540" y2="150" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow)"/>
  <!-- Report -->
  <rect x="540" y="120" width="50" height="60" rx="8" fill="#27273a" stroke="#3b82f6" stroke-width="2"/>
  <text x="565" y="148" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">HTML</text>
  <text x="565" y="165" text-anchor="middle" fill="#3b82f6" font-size="11">Report</text>
  <!-- Title -->
  <text x="300" y="40" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">pytest Execution Flow</text>
  <!-- Fixture flow -->
  <text x="80" y="100" text-anchor="middle" fill="#6c7086" font-size="11">setup()</text>
  <text x="80" y="210" text-anchor="middle" fill="#6c7086" font-size="11">teardown()</text>
</svg>
`
}
```

---

## 7. Error Dictionary

### 7.1 Selenium Hataları

| Hata | Sebep | Çözüm |
|------|-------|-------|
| `NoSuchElementException` | Locator yanlış / element yok / iframe içinde | Explicit wait ekle, iframe'e geç |
| `StaleElementReferenceException` | DOM yenilendi, eski referans geçersiz | Elementi tekrar bul |
| `ElementNotInteractableException` | Element gizli veya disabled | JS ile tıkla, scroll et |
| `TimeoutException` | Element bekleme süresi doldu | Timeout artır, bekleme koşulunu gözden geçir |
| `ElementClickInterceptedException` | Başka element üstte (modal, overlay) | Overlay'i kapat, JS click kullan |
| `InvalidSelectorException` | CSS veya XPath sözdizimi yanlış | Selector'ı DevTools'da test et |
| `NoSuchWindowException` | Geçilmek istenen pencere kapandı | window_handles kontrolü yap |
| `NoAlertPresentException` | Alert açılmadan switch_to.alert çağrıldı | alert_is_present ile bekle |
| `NoSuchFrameException` | iframe ID/name yanlış | Sayfadaki iframe'leri listele |
| `WebDriverException` | Driver yolu yanlış / sürüm uyumsuz | webdriver-manager kullan |

### 7.2 pytest Hataları

| Hata | Sebep | Çözüm |
|------|-------|-------|
| `fixture 'X' not found` | conftest.py'de tanımlanmamış | Fixture'ı conftest.py'ye ekle |
| `FAILED vs ERROR` | FAILED = assertion başarısız; ERROR = exception | Stack trace'e bak |
| `ImportError` | Modül bulunamadı | pip install, PYTHONPATH kontrolü |
| `Collection Error` | test_*.py'de syntax hatası | Dosyayı python -m py_compile ile kontrol et |
| `ScopeMismatch` | Yüksek scope fixture'ı düşük scope'ta kullanma | Scope'ları hizala |

### 7.3 Playwright Hataları

| Hata | Sebep | Çözüm |
|------|-------|-------|
| `TimeoutError: locator.click` | Element zaman aşımında görünmedi | Timeout artır, bekleme koşulu ekle |
| `strict mode violation` | CSS çok fazla eleman eşleştirdi | Daha özgün locator kullan |
| `page has been closed` | Test bitince page kapandı, hâlâ kullanılıyor | fixture scope'u kontrol et |
| `net::ERR_CONNECTION_REFUSED` | Uygulama çalışmıyor | `npm start` ile uygulamayı başlat |
| `expect().to_be_visible() timeout` | Element DOM'da var ama gizli | `to_be_visible()` yerine `to_be_attached()` dene |
