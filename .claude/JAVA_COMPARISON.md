# JAVA_COMPARISON.md — Java ↔ Python / TypeScript Karşılaştırma Kuralları

> **Bu dosya ne içerir:** Kullanıcının Core Java bilgisi göz önüne alınarak  
> Python ve TypeScript konularını Java analojisiyle nasıl anlatacağına dair  
> kurallar, şablonlar ve hazır karşılaştırma tabloları.  
> **Ne zaman oku:** Python veya TypeScript konusu yazarken, her zaman.

---

## 1. Temel Kural

**Kullanıcı Core Java biliyor (Collections dahil).**  
Her anlatımda şu sırayla anlat:

1. Java'da nasıl yapılır? (biliyor, referans nokta)
2. Python/TS'te nasıl yapılır? (yeni, öğreniyor)
3. Farklar ve neden öyle tasarlanmış?

**Her konuda `comparison` tipli block ekle.**

---

## 2. Block Formatı

```js
{
  type: 'comparison',
  title: { tr: 'Java ile Karşılaştırma', en: 'Comparison with Java' },
  columns: ['Java', 'Python', 'TypeScript'],  // veya sadece ['Java', 'Python']
  rows: [
    {
      concept: { tr: 'Değişken tanımlama', en: 'Variable declaration' },
      java:   'int x = 5;\nString name = "Alice";',
      python: 'x = 5\nname = "Alice"',
      ts:     'let x: number = 5;\nlet name: string = "Alice";'
    },
    // ...
  ]
}
```

---

## 3. Dil Özellikleri Karşılaştırma Tablosu (Ana Referans)

### 3.1 Tip Sistemi

| Kavram | Java | Python | TypeScript |
|--------|------|--------|------------|
| Tip belirtme | Zorunlu: `int x = 5` | Opsiyonel: `x = 5` | Opsiyonel ama önerilen: `let x: number = 5` |
| Tip kontrolü | Derleme zamanı (compile-time) | Çalışma zamanı (runtime) | Derleme zamanı (transpile-time) |
| Dinamik tip | Hayır (generic ile bağımlı) | Evet | `any` ile mümkün |
| Null güvenliği | Null Pointer Exception riski | None kullanılır | `strictNullChecks` ile korunur |
| Tip dönüşümü | `(int) x`, `Integer.parseInt()` | `int(x)`, `str(x)`, `float(x)` | `Number(x)`, `String(x)`, `as Type` |

**Anlatım şablonu:**
```
Java'da değişken tanımlarken tipi açıkça yazmanız gerekir: `int age = 25`.
Python'da tip belirtmenize gerek yok — Python kendisi anlar: `age = 25`.
TypeScript ise ikisinin ortasındadır: tipi yazabilirsiniz (`let age: number = 25`) 
ama zorunlu değildir. Ancak TypeScript'in gücü tiplerden gelir, bu yüzden yazın.
```

---

### 3.2 Koleksiyonlar (Collections)

| Java | Python | TypeScript | Açıklama |
|------|--------|------------|----------|
| `ArrayList<String>` | `list` (`[]`) | `string[]` veya `Array<string>` | Sıralı, değiştirilebilir dizi |
| `LinkedList<T>` | `collections.deque` | — (array yeterli) | İkili bağlı liste |
| `HashMap<K,V>` | `dict` (`{}`) | `Record<K,V>` veya `Map<K,V>` | Anahtar-değer |
| `HashSet<T>` | `set` (`set()`) | `Set<T>` | Tekrarsız koleksiyon |
| `Stack<T>` | `list` (append/pop) | — | LIFO yığını |
| `Queue<T>` | `collections.deque` | — | FIFO kuyruğu |
| `Tuple` (yok) | `tuple` (`()`) | `[string, number]` | Değiştirilemez sıralı çift |

**Kod karşılaştırması:**
```java
// Java
ArrayList<String> list = new ArrayList<>();
list.add("Alice");
list.add("Bob");
list.remove("Alice");
System.out.println(list.size());  // 1
```
```python
# Python — çok daha kısa
list = ["Alice", "Bob"]
list.append("Carol")   # Sona ekle
list.remove("Alice")   # Değere göre sil
print(len(list))        # 2
```
```typescript
// TypeScript
const list: string[] = ["Alice", "Bob"];
list.push("Carol");
list.splice(list.indexOf("Alice"), 1);
console.log(list.length);  // 2
```

---

### 3.3 Döngüler

| Konsept | Java | Python | TypeScript |
|---------|------|--------|------------|
| For i döngüsü | `for(int i=0; i<10; i++)` | `for i in range(10):` | `for(let i=0; i<10; i++)` |
| For-each | `for(String s : list)` | `for s in list:` | `for(const s of list)` |
| While | `while(condition) {}` | `while condition:` | `while(condition) {}` |
| Do-while | `do {} while(cond)` | `while True: ... if: break` | `do {} while(cond)` |
| Enumerate | yok (index tracking elle) | `for i, v in enumerate(list):` | `list.entries()` ile |
| Zip | yok (Iterator.zip) | `for a, b in zip(list1, list2):` | — |

---

### 3.4 Fonksiyonlar / Metodlar

| Konsept | Java | Python | TypeScript |
|---------|------|--------|------------|
| Metod tanımlama | `public String greet(String name) {}` | `def greet(name: str) -> str:` | `function greet(name: string): string {}` |
| Default parametre | Overloading | `def f(x=10):` | `function f(x: number = 10)` |
| Varargs | `String... args` | `*args` | `...args: string[]` |
| Named args | Yok | `greet(name="Alice")` | — |
| Lambda | `x -> x * 2` | `lambda x: x * 2` | `x => x * 2` |
| Return birden fazla | Yok (array/tuple dön) | `return a, b` (tuple) | `return { a, b }` (object) |
| Static metod | `static void method()` | `@staticmethod` / `@classmethod` | `static method()` |

---

### 3.5 OOP (Nesne Yönelimli)

| Konsept | Java | Python | TypeScript |
|---------|------|--------|------------|
| Sınıf tanımlama | `public class Dog {}` | `class Dog:` | `class Dog {}` |
| Constructor | `public Dog(String name) {}` | `def __init__(self, name):` | `constructor(name: string) {}` |
| Kalıtım | `class Lab extends Dog {}` | `class Lab(Dog):` | `class Lab extends Dog {}` |
| Interface | `implements Runnable` | Duck typing / `Protocol` | `implements Runnable` |
| Abstract class | `abstract class Shape {}` | `from abc import ABC, abstractmethod` | `abstract class Shape {}` |
| Erişim belirleyici | `private`, `public`, `protected` | `_` (convention), `__` (name mangling) | `private`, `public`, `protected` |
| `this` / `self` | `this.name` | `self.name` | `this.name` |
| Super çağrı | `super.method()` | `super().method()` | `super.method()` |
| toString | `@Override toString()` | `def __str__(self):` | `toString()` |
| equals | `@Override equals()` | `def __eq__(self, other):` | — |

**Anlatım şablonu — Constructor:**
```
Java'da constructor sınıfla aynı ismi taşır ve dönüş tipi yazmazsınız:
  public Person(String name) { this.name = name; }

Python'da constructor'ın adı her zaman __init__ (dunder init) ve ilk parametre
her zaman self (this gibi, ama açıkça yazılır):
  def __init__(self, name: str):
      self.name = name

TypeScript'te Java gibi constructor kullanılır ama kısayol da var:
  constructor(private name: string) {}  // hem field tanımlar hem atar
```

---

### 3.6 Exception Handling

| Konsept | Java | Python | TypeScript |
|---------|------|--------|------------|
| Try-catch | `try {} catch(Exception e) {}` | `try: ... except Exception as e:` | `try {} catch(e) {}` |
| Finally | `finally {}` | `finally:` | `finally {}` |
| Throw | `throw new RuntimeException()` | `raise ValueError("msg")` | `throw new Error("msg")` |
| Custom exception | `class MyEx extends Exception` | `class MyEx(Exception):` | `class MyError extends Error` |
| Multiple catch | `catch(A a) {} catch(B b) {}` | `except (TypeError, ValueError) as e:` | `catch` + type check |
| Checked exception | Var (zorla handle ettirme) | Yok | Yok |

---

### 3.7 Dosya İşlemleri

| İşlem | Java | Python |
|-------|------|--------|
| Dosya oku | `Files.readString(Path.of("f.txt"))` | `open("f.txt").read()` |
| Satır satır oku | `BufferedReader` | `for line in open("f.txt"):` |
| Dosyaya yaz | `Files.writeString(path, content)` | `open("f.txt", "w").write(content)` |
| Context manager | `try-with-resources` | `with open("f.txt") as f:` |
| JSON parse | `ObjectMapper().readValue(...)` | `json.load(f)` / `json.loads(s)` |

**Anlatım şablonu:**
```
Java'da dosyayı kapatmayı garantilemek için try-with-resources kullanırsınız:
  try (BufferedReader br = new BufferedReader(new FileReader("f.txt"))) { ... }

Python'da with (context manager) aynı işi görür ve çok daha kısadır:
  with open("f.txt", "r") as f:
      content = f.read()
# Blok bitince f otomatik kapanır — try-with-resources'a birebir eşdeğer
```

---

### 3.8 Async/Await

| Konsept | Java | Python | TypeScript |
|---------|------|--------|------------|
| Async fonksiyon | `CompletableFuture<T>` | `async def f():` | `async function f(): Promise<T>` |
| Await | `.get()` / `.join()` | `await coro()` | `await promise` |
| Thread pool | `ExecutorService` | `asyncio.gather()` | `Promise.all()` |
| Blocking call | Default | `asyncio.run()` ile başlat | `.then()` veya `await` |

---

## 4. QA Framework Karşılaştırması

| Konsept | Java (JUnit/TestNG) | Python (pytest) | TypeScript (Playwright) |
|---------|---------------------|-----------------|-------------------------|
| Test annotation | `@Test` | `def test_*():` | `test('name', async () => {})` |
| Before each | `@BeforeEach` | `@pytest.fixture` (function scope) | `test.beforeEach()` |
| Before all | `@BeforeAll` | `@pytest.fixture(scope="session")` | `test.beforeAll()` |
| Assertion | `assertEquals(expected, actual)` | `assert actual == expected` | `expect(actual).toBe(expected)` |
| Skip | `@Ignore` | `@pytest.mark.skip` | `test.skip()` |
| Parametrize | `@ParameterizedTest` | `@pytest.mark.parametrize` | `test.each()` |
| Tags/Groups | `@Tag("smoke")` | `@pytest.mark.smoke` | `test.describe("smoke", ...)` |
| Report | Allure, Surefire | pytest-html, Allure | Playwright HTML reporter |

---

## 5. Anlatım Şablonları

### Yeni konu açılırken:
```
[Konu adı] konusuna Java bağlamıyla başlayalım.

Java'da [konu Java'da nasıl]:
[Java kodu]

Python'da aynı işi [kısa özellik]:
[Python kodu]

TypeScript'te ise [TypeScript nasıl]:
[TS kodu]
```

### Fark vurgulayırken:
```
Java'dan gelen en büyük sürpriz: Python'da [özellik yok/farklı].
Bunun sebebi [neden tasarlandı böyle].
Pratikte bu şu anlama gelir: [pratik etki].
```

### Avantaj anlatırken:
```
Java'da [işi yapmak] için [Java yolu — verbose].
Python'da aynı iş [Python yolu — kısa].
Bu sadece sözdizimi şekeri değil — [neden gerçekten daha iyi/farklı].
```

---

## 6. Pytest vs JUnit/TestNG Detaylı Karşılaştırma

```python
# Java — JUnit 5
@Test
@DisplayName("Login with valid credentials should succeed")
void testValidLogin() {
    LoginPage page = new LoginPage(driver);
    page.enterUsername("admin");
    page.enterPassword("pass123");
    page.clickLogin();
    assertEquals("Dashboard", driver.getTitle());
}

# ═══════════════════════════════════════════

# Python — pytest
def test_valid_login(driver, login_page):   # driver ve login_page fixture'dan gelir
    login_page.enter_username("admin")       # Page Object metodu
    login_page.enter_password("pass123")
    login_page.click_login()
    assert "Dashboard" in driver.title      # Basit assert — JUnit assertEquals'a eşdeğer
```

**Fark notu:** pytest'te test class'ı zorunlu değil — düz fonksiyon yeterli.  
Java'da her test bir class içinde olmak zorundadır. Python'da class'a gerek yok.

---

## 7. Selenium Python vs Java Karşılaştırması

```java
// Java — Selenium
WebDriver driver = new ChromeDriver();
driver.get("https://example.com");
WebElement element = driver.findElement(By.id("username"));
element.sendKeys("admin");
driver.quit();
```

```python
# Python — Selenium (çok daha az boilerplate)
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()                         # Service otomatik
driver.get("https://example.com")
element = driver.find_element(By.ID, "username")    # By.ID — Java'daki gibi
element.send_keys("admin")                          # send_keys — sendKeys'e eşdeğer
driver.quit()
```

---

## 8. Playwright Python vs TypeScript Karşılaştırması

```typescript
// TypeScript — Playwright
import { test, expect } from '@playwright/test';

test('login works', async ({ page }) => {             // async/await — TypeScript native
  await page.goto('https://example.com');
  await page.fill('#username', 'admin');
  await page.click('#login-btn');
  await expect(page).toHaveTitle('Dashboard');
});
```

```python
# Python — Playwright (sync API)
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    page.fill("#username", "admin")
    page.click("#login-btn")
    expect(page).to_have_title("Dashboard")         # Python'da snake_case!
    browser.close()
```

**Fark notu:** Python'da `to_have_title` (snake_case), TypeScript'te `toHaveTitle` (camelCase).  
API aynı, sadece dil convention farklı.
