const fs = require('fs');
const src = fs.readFileSync('./src/data/pythonData.js', 'utf8');

const lines = src.split('\n');
let s4Start = -1, s5Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// ── 4. ADVANCED') && s4Start === -1) s4Start = i;
  if (lines[i].includes('// ── 5. QA USE CASES') && s5Start === -1) s5Start = i;
}
console.log(`Section 4: lines ${s4Start+1}–${s5Start+1}`);

const newSection4 = `  // ── 4. ADVANCED ─────────────────────────────────────────────────────────────
  {
    title: '🔴 Level 3: Advanced Python',
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 19 — Classes / Objects
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Classes / Objects', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🏗️', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Class, bir nesne şablonu gibi. Araba şablonunda renk, hız, model var — her araba bu şablondan yaratılır ama hepsinin rengi farklı olabilir. Class = şablon, nesne (object) = şablondan üretilen şey.", en: "A class is a blueprint. The car blueprint has color, speed, model — every car is made from it but each can have a different color. Class = blueprint, object = thing made from it." } },
      { type: 'text', content: { tr: "Java'da constructor açıkça yazılır: public Car(String color) {...}. Python'da __init__ metodu constructor görevi görür. Python'daki 'self', Java'daki 'this' gibidir — ama Python'da her metoda açıkça yazılmalıdır.", en: "Java constructors are explicit: public Car(String color) {}. Python uses __init__ as the constructor. Python's 'self' is like Java's 'this' — but must be written explicitly in every method." } },
      { type: 'code', language: 'python', code: \`# Python Classes — QA Engineer Example
class TestResult:
    # Class attribute — shared by all instances
    company = "QA Corp"

    def __init__(self, test_name, status):  # __init__ = constructor
        self.test_name = test_name          # instance attribute
        self.status = status                # instance attribute
        self.duration = 0.0                 # default value

    def set_duration(self, ms):             # instance method
        self.duration = ms

    def summary(self):                      # method using self
        return f"[{self.status}] {self.test_name} ({self.duration}ms)"

    def __str__(self):                      # like Java toString()
        return self.summary()

# Create instances
r1 = TestResult("login_test", "PASS")      # calls __init__
r1.set_duration(342)

r2 = TestResult("checkout_test", "FAIL")
r2.set_duration(1205)

print(r1)                                   # [PASS] login_test (342ms)
print(r2)                                   # [FAIL] checkout_test (1205ms)
print(TestResult.company)                   # QA Corp\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Create a BankAccount class
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited {amount}. Balance: {self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
        else:
            self.balance -= amount
            print(f"Withdrew {amount}. Balance: {self.balance}")

acc = BankAccount("Alice", 1000)
acc.deposit(500)
acc.withdraw(200)
acc.withdraw(2000)\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Classes' }, columns: ['Java', 'Python'], rows: [
        { concept: 'Constructor', java: 'public MyClass(int x) { this.x = x; }', python: 'def __init__(self, x): self.x = x' },
        { concept: 'Instance method', java: 'public void doIt() { ... }', python: 'def do_it(self): ...' },
        { concept: 'toString', java: '@Override public String toString()', python: 'def __str__(self):' },
        { concept: 'Access modifier', java: 'private int x; (enforced)', python: '_x or __x (convention only)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da __init__ metodunun ilk parametresi nedir?", en: 'What is the first parameter of a Python __init__ method?' }, options: [{ id: 'a', text: 'this' }, { id: 'b', text: 'self' }, { id: 'c', text: 'cls' }, { id: 'd', text: 'me' }], correct: 'b', explanation: { tr: "'self' bu sınıfın o anki instance'ını temsil eder — Java'daki 'this' gibi. Python'da her instance metoduna açıkça yazılır.", en: "'self' represents the current instance of the class — like Java's 'this'. It must be written explicitly in every instance method in Python." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 20 — Inheritance
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Inheritance', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🧬', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Kalıtım, miras gibi. Ebeveynin özellikleri çocuğa geçer. Araba şablonundan 'Elektrikli Araba' şablonu türetilirse, arabanın tüm özellikleri artık elektrikli arabada da var — üstüne pil kapasitesi ekleniyor.", en: "Inheritance is like a family trait. A child class gets all properties of the parent. ElectricCar inherits from Car — gets all car features plus adds battery capacity." } },
      { type: 'text', content: { tr: "Java'da 'extends' keyword'ü kullanılır: class Dog extends Animal. Python'da parantez içinde yazılır: class Dog(Animal). Her iki dilde de 'super()' ile parent constructor çağrılır.", en: "Java uses 'extends': class Dog extends Animal. Python puts the parent in parentheses: class Dog(Animal). Both languages use super() to call the parent constructor." } },
      { type: 'code', language: 'python', code: \`# Python Inheritance — Test Framework Example
class BaseTest:
    """Parent class with shared test behavior."""
    def __init__(self, browser="chrome"):
        self.browser = browser              # inherited by all subclasses
        self.results = []

    def log(self, msg):                     # shared method — all tests can use this
        print(f"[{self.browser.upper()}] {msg}")
        self.results.append(msg)

    def teardown(self):
        self.log("Test complete.")

class LoginTest(BaseTest):                  # inherits from BaseTest
    def __init__(self, browser, base_url):
        super().__init__(browser)           # call parent __init__ — like super() in Java
        self.base_url = base_url

    def run(self):
        self.log(f"Navigating to {self.base_url}/login")
        self.log("Filling credentials...")
        self.log("Asserting redirect to dashboard")
        self.teardown()                     # inherited method

class ApiTest(BaseTest):                    # different child, same parent
    def run(self, endpoint):
        self.log(f"GET {endpoint}")
        self.log("Asserting 200 OK")
        self.teardown()

t1 = LoginTest("firefox", "https://shop.example.com")
t1.run()
t2 = ApiTest("chrome")
t2.run("/api/users")\` },
      { type: 'editor', lang: 'python', defaultCode: \`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def speak(self):                        # override parent method
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says: Meow!"

animals = [Dog("Rex"), Cat("Whiskers"), Animal("Unknown")]
for a in animals:
    print(a.speak())\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Inheritance' }, columns: ['Java', 'Python'], rows: [
        { concept: 'Extend class', java: 'class Dog extends Animal {}', python: 'class Dog(Animal): ...' },
        { concept: 'Call parent', java: 'super(name);', python: 'super().__init__(name)' },
        { concept: 'Override', java: '@Override void speak()', python: 'def speak(self): (no annotation)' },
        { concept: 'Multiple inheritance', java: 'Not supported (use interface)', python: 'class C(A, B): # supported!' },
      ]},
      { type: 'quiz', question: { tr: "Python'da parent class constructor'ını çağırmak için ne kullanılır?", en: 'How do you call the parent class constructor in Python?' }, options: [{ id: 'a', text: 'parent().__init__()' }, { id: 'b', text: 'super().__init__()' }, { id: 'c', text: 'this.__init__()' }, { id: 'd', text: 'base.__init__()' }], correct: 'b', explanation: { tr: "super().__init__() parent class'ın constructor'ını çağırır. Java'daki super() gibi — ama Python'da açıkça super().__init__() yazılır.", en: "super().__init__() calls the parent class constructor. Like Java's super() — but in Python you must explicitly call super().__init__()." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 21 — Scope
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Scope', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🔭', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Scope, değişkenin görünebildiği alan. Odanın içinde tanımladığın bir şey odanın dışından görünmez — tıpkı bir fonksiyon içindeki değişkenin dışarıdan erişilememesi gibi.", en: "Scope is the area where a variable can be seen. Something defined inside a room can't be seen from outside — just like a variable inside a function can't be accessed from outside." } },
      { type: 'text', content: { tr: "Python LEGB kuralını kullanır: Local → Enclosing → Global → Built-in. Java'da benzer kural: yerel değişken → metod → sınıf → paket. 'global' keyword'ü ile Python'da global değişkene yazılabilir — ama bu pratikte kaçınılması gereken bir pattern.", en: "Python uses the LEGB rule: Local → Enclosing → Global → Built-in. Java has a similar rule. The 'global' keyword allows writing to a global variable — but this pattern is generally avoided in practice." } },
      { type: 'code', language: 'python', code: \`# Python Scope — LEGB Rule
x = "global"                    # Global scope — visible everywhere

def outer():
    x = "enclosing"             # Enclosing scope

    def inner():
        x = "local"             # Local scope — shadows outer x
        print(f"inner: {x}")    # local

    inner()
    print(f"outer: {x}")        # enclosing

outer()
print(f"global: {x}")           # global

# global keyword — modify global from inside function
counter = 0

def increment():
    global counter              # declare we want to write to global
    counter += 1

increment()
increment()
print(f"Counter: {counter}")    # 2

# nonlocal — modify enclosing scope variable
def make_counter():
    count = 0
    def tick():
        nonlocal count          # modify enclosing count
        count += 1
        return count
    return tick

c = make_counter()
print(c(), c(), c())            # 1 2 3\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Test scope understanding
total = 0

def add(n):
    global total
    total += n

add(5)
add(3)
add(2)
print(f"Total: {total}")        # Should print 10\` },
      { type: 'quiz', question: { tr: "Python'da LEGB kuralında 'E' neyi temsil eder?", en: "In Python's LEGB rule, what does 'E' stand for?" }, options: [{ id: 'a', text: 'External' }, { id: 'b', text: 'Enclosing' }, { id: 'c', text: 'Exported' }, { id: 'd', text: 'Extended' }], correct: 'b', explanation: { tr: "LEGB = Local, Enclosing, Global, Built-in. Python değişkeni bu sırayla arar. Enclosing, iç içe fonksiyonlarda dıştaki fonksiyonun kapsamını ifade eder.", en: "LEGB = Local, Enclosing, Global, Built-in. Python searches for variables in this order. Enclosing refers to the scope of outer functions in nested function definitions." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 22 — Modules
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Modules', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '📦', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Module, araç kutusu gibi. Matematiksel işlemler için 'math' kutusunu aç, tarih işlemleri için 'datetime' kutusunu. Her kutuda hazır araçlar var — sıfırdan yazman gerekmiyor.", en: "A module is like a toolbox. Open the 'math' toolbox for math operations, 'datetime' for date work. Each box has ready-made tools — you don't need to build them from scratch." } },
      { type: 'text', content: { tr: "Java'da import java.util.List gibi paket import edilir. Python'da import math veya from math import sqrt. Python'da kendi modülünü yazmak da çok kolay — .py dosyası oluştur, import et.", en: "Java imports packages like import java.util.List. Python uses import math or from math import sqrt. Writing your own module in Python is simple — just create a .py file and import it." } },
      { type: 'code', language: 'python', code: \`import os                       # operating system interface
import sys                      # system-specific parameters
import json                     # JSON encode/decode
from datetime import datetime   # import specific class from module
from math import sqrt, pi       # import multiple names

# os module — file system operations
print(os.getcwd())              # current working directory
print(os.path.exists("/tmp"))   # True/False — check if path exists

# sys module — interpreter info
print(sys.version)              # Python version string
print(sys.platform)             # 'linux', 'win32', 'darwin'

# math module
print(sqrt(144))                # 12.0
print(round(pi, 4))             # 3.1416

# datetime module
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))  # 2024-01-15 14:30

# Custom module (if you had a file qa_helpers.py):
# import qa_helpers
# qa_helpers.take_screenshot(driver)
print("Modules loaded successfully")\` },
      { type: 'editor', lang: 'python', defaultCode: \`import random
import string

# Generate a random test user
def generate_user():
    suffix = ''.join(random.choices(string.digits, k=4))
    email = f"testuser{suffix}@qa.example.com"
    return {"email": email, "id": int(suffix)}

for i in range(3):
    user = generate_user()
    print(user)\` },
      { type: 'quiz', question: { tr: "Python'da math modülünden sadece sqrt fonksiyonunu import etmek için hangi syntax kullanılır?", en: 'Which syntax imports only sqrt from the math module?' }, options: [{ id: 'a', text: 'import math.sqrt' }, { id: 'b', text: 'from math import sqrt' }, { id: 'c', text: 'include math: sqrt' }, { id: 'd', text: 'using math import sqrt' }], correct: 'b', explanation: { tr: "'from math import sqrt' sadece sqrt'yi import eder. Java'daki static import gibi: import static java.lang.Math.sqrt; Python'da bu şekilde kullanılır.", en: "'from math import sqrt' imports only sqrt. Like Java's static import: import static java.lang.Math.sqrt; This is the Python equivalent." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 23 — Try...Except (Error Handling)
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Try...Except', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🛡️', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Try-except, kalkan gibi. 'Dene, çalışmazsa şu planı uygula.' Bisiklet sürerken düşebilirsin — ama kaskın varsa ciddi bir şey olmaz. Kod patlarsa except bloğu devreye girer.", en: "Try-except is like a safety helmet. 'Try this, if it breaks do this instead.' You might fall off a bike — but with a helmet, nothing serious happens. If code crashes, except catches it." } },
      { type: 'text', content: { tr: "Java'da try-catch-finally kullanılır. Python'da da aynı yapı var: try-except-finally. Java'da Exception sınıfından türetme — Python'da da aynı. Fark: Python'da as keyword'ü ile exception nesnesine erişilir.", en: "Java uses try-catch-finally. Python has the same structure: try-except-finally. Both inherit from a base Exception class. Difference: Python uses the 'as' keyword to access the exception object." } },
      { type: 'code', language: 'python', code: \`# Python Error Handling — QA Patterns
def safe_divide(a, b):
    try:
        result = a / b              # might raise ZeroDivisionError
        return result
    except ZeroDivisionError:       # specific exception — like catch(ArithmeticException e)
        print("Cannot divide by zero!")
        return None
    except TypeError as e:          # 'as e' gives access to error object
        print(f"Wrong type: {e}")
        return None
    else:                           # runs only if NO exception (no Java equivalent)
        print("Division OK")        # Note: this is after return, so only runs if not returned
    finally:
        print("Division attempted") # ALWAYS runs — like Java finally

# Multiple exception types
def read_config(path):
    try:
        with open(path) as f:
            return f.read()
    except FileNotFoundError:
        print(f"Config not found: {path}")
    except PermissionError:
        print("No read permission")
    except (IOError, OSError) as e:  # catch multiple types at once
        print(f"IO error: {e}")
    return None

# Custom exception
class TestFailedError(Exception):
    def __init__(self, test_name, expected, actual):
        super().__init__(f"Test '{test_name}' failed: expected={expected}, actual={actual}")
        self.test_name = test_name

try:
    raise TestFailedError("login_test", "dashboard", "error_page")
except TestFailedError as e:
    print(f"Caught: {e}")

print(safe_divide(10, 2))\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Practice: handle multiple errors gracefully
def get_user_age(data, key):
    try:
        age = data[key]
        return int(age)
    except KeyError:
        print(f"Key '{key}' not found in data")
    except ValueError:
        print(f"Cannot convert '{data.get(key)}' to integer")
    return -1

print(get_user_age({"age": "25"}, "age"))         # 25
print(get_user_age({"age": "abc"}, "age"))        # ValueError
print(get_user_age({"name": "Ali"}, "age"))       # KeyError\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Error Handling' }, columns: ['Java', 'Python'], rows: [
        { concept: 'Try block', java: 'try { ... }', python: 'try: ...' },
        { concept: 'Catch', java: 'catch (IOException e) { }', python: 'except IOError as e:' },
        { concept: 'Finally', java: 'finally { }', python: 'finally:' },
        { concept: 'Multiple catches', java: 'catch (A | B e)', python: 'except (A, B) as e:' },
        { concept: 'Else (no exception)', java: 'not available', python: 'else: (runs if no exception)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da exception olmadığında çalışan blok hangisidir?", en: 'Which block in Python runs only when no exception occurs?' }, options: [{ id: 'a', text: 'finally' }, { id: 'b', text: 'else' }, { id: 'c', text: 'clean' }, { id: 'd', text: 'ok' }], correct: 'b', explanation: { tr: "'else' bloğu try bloğu exception fırlatmadan tamamlandığında çalışır. Java'da bu bloğun karşılığı yok — Python'a özgü.", en: "The 'else' block runs only when the try block completes without raising an exception. Java has no equivalent — this is unique to Python." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 24 — JSON
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'JSON', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🔄', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "JSON, evrensel dil gibi. Farklı dillerdeki programlar birbirleriyle konuşmak için JSON kullanır. Türkçe-İngilizce tercüman gibi — Python dict'ini JSON'a çevir, karşı taraf anlasın.", en: "JSON is like a universal language. Programs in different languages use JSON to talk to each other. Like a translator — convert Python dict to JSON, and any other language can understand it." } },
      { type: 'text', content: { tr: "Java'da Jackson veya Gson kütüphanesi kullanılır. Python'da standart kütüphane 'json' modülü yeterli — import etmek yeterli. json.dumps() Python'u JSON string'e, json.loads() JSON string'i Python'a çevirir.", en: "Java requires Jackson or Gson library. Python's built-in 'json' module is sufficient — just import it. json.dumps() converts Python to JSON string, json.loads() converts JSON string back to Python." } },
      { type: 'code', language: 'python', code: \`import json

# Python dict → JSON string (dumps = dump string)
test_result = {
    "test_name": "login_test",
    "status": "PASS",
    "duration_ms": 342,
    "tags": ["regression", "smoke"],
    "metadata": None           # None → null in JSON
}

json_str = json.dumps(test_result, indent=2)   # indent=2 for pretty print
print(json_str)

# JSON string → Python dict (loads = load string)
api_response = '''
{
  "users": [
    {"id": 1, "email": "alice@example.com", "active": true},
    {"id": 2, "email": "bob@example.com", "active": false}
  ],
  "total": 2
}
'''

data = json.loads(api_response)
print(type(data))              # <class 'dict'>
print(data["total"])           # 2
print(data["users"][0]["email"])  # alice@example.com

# Filter active users — common QA pattern
active = [u for u in data["users"] if u["active"]]
print(f"Active users: {len(active)}")\` },
      { type: 'editor', lang: 'python', defaultCode: \`import json

# Parse this API response and check all tests passed
response = """
{
  "suite": "Regression Suite",
  "results": [
    {"name": "login", "status": "PASS", "ms": 342},
    {"name": "checkout", "status": "PASS", "ms": 891},
    {"name": "profile", "status": "FAIL", "ms": 1205}
  ]
}
"""

data = json.loads(response)
failed = [r for r in data["results"] if r["status"] != "PASS"]
print(f"Suite: {data['suite']}")
print(f"Total: {len(data['results'])}, Failed: {len(failed)}")
if failed:
    for f in failed:
        print(f"  FAIL: {f['name']} ({f['ms']}ms)")\` },
      { type: 'quiz', question: { tr: "Python'da dict'i JSON string'e dönüştüren fonksiyon hangisidir?", en: 'Which function converts a Python dict to a JSON string?' }, options: [{ id: 'a', text: 'json.stringify()' }, { id: 'b', text: 'json.encode()' }, { id: 'c', text: 'json.dumps()' }, { id: 'd', text: 'json.serialize()' }], correct: 'c', explanation: { tr: "json.dumps() (dump string) Python nesnesini JSON string'e çevirir. json.loads() (load string) tersini yapar. JavaScript'teki JSON.stringify() ve JSON.parse() gibi.", en: "json.dumps() (dump string) converts Python objects to JSON string. json.loads() (load string) does the reverse. Like JavaScript's JSON.stringify() and JSON.parse()." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 25 — RegEx
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'RegEx', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🔍', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Regex, metin arama için çok güçlü bir filtre. 'E-posta bul' gibi değil — '@' işareti olan, noktayla biten, belirli uzunlukta olan metinleri bul. QA'de form validation testlerinde çok kullanılır.", en: "Regex is a powerful text filter. Not just 'find email' — find text that has '@', ends with a dot, has a specific length. Very useful in QA for form validation testing." } },
      { type: 'code', language: 'python', code: \`import re   # regular expressions module

# Basic patterns:
# \\d = digit, \\w = word char, \\s = whitespace
# .  = any char, * = 0+, + = 1+, ? = 0 or 1
# ^  = start of string, $ = end

# --- Email validation (common QA use case) ---
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'

emails = ["alice@example.com", "not-an-email", "user@.com", "test@qa.org"]
for email in emails:
    is_valid = bool(re.match(email_pattern, email))
    print(f"{email}: {'VALID' if is_valid else 'INVALID'}")

# --- Extract data from text ---
log = "2024-01-15 14:32:01 ERROR test_login.py:42 Timeout after 30s"
date = re.search(r'\\d{4}-\\d{2}-\\d{2}', log)    # find date
level = re.search(r'(ERROR|WARN|INFO)', log)      # find log level

print(f"Date: {date.group()}")                    # 2024-01-15
print(f"Level: {level.group()}")                  # ERROR

# --- Find all matches ---
text = "Test IDs: TC-001, TC-042, TC-099 passed"
ids = re.findall(r'TC-\\d{3}', text)
print(f"Found: {ids}")                            # ['TC-001', 'TC-042', 'TC-099']

# --- Replace ---
masked = re.sub(r'\\b\\d{4}\\b', '****', "Card: 1234 expires 2025")
print(masked)                                     # Card: **** expires ****\` },
      { type: 'editor', lang: 'python', defaultCode: \`import re

# Validate phone numbers: format must be +90-555-123-4567 or 05551234567
phone_pattern = r'^(\\+90-\\d{3}-\\d{3}-\\d{4}|0\\d{10})$'

phones = ["+90-555-123-4567", "05551234567", "5551234", "+1-555-123-4567"]
for phone in phones:
    valid = bool(re.match(phone_pattern, phone))
    print(f"{phone}: {'VALID' if valid else 'INVALID'}")\` },
      { type: 'quiz', question: { tr: "re.findall() ve re.search() arasındaki fark nedir?", en: 'What is the difference between re.findall() and re.search()?' }, options: [{ id: 'a', text: { tr: 'Hiçbir fark yok', en: 'No difference' } }, { id: 'b', text: { tr: 'findall tüm eşleşmeleri listeler, search ilkini bulur', en: 'findall returns all matches as list, search returns first match object' } }, { id: 'c', text: { tr: 'search sadece başlangıçta arar', en: 'search only checks at the start' } }, { id: 'd', text: { tr: 'findall büyük/küçük harf duyarsız', en: 'findall is case-insensitive' } }], correct: 'b', explanation: { tr: "re.findall() tüm eşleşmeleri string listesi olarak döner. re.search() ilk eşleşmeyi Match nesnesi olarak döner — veya None. .group() ile eşleşen metni alırsın.", en: "re.findall() returns all matches as a list of strings. re.search() returns the first match as a Match object — or None. Use .group() to get the matched text." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 26 — Comprehensions
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Comprehensions', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '⚡', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Comprehension, listeni tek satırda oluşturmanın kısa yolu. 'Sepetteki tüm meyvelerden sadece kırmızı olanları al' — bunu Python'da tek satırda yazabilirsin. Uzun for döngüsü yazmaya gerek yok.", en: "Comprehension is a shortcut to build lists in one line. 'From all fruits in basket, take only the red ones' — Python lets you write this in one line. No need for a long for loop." } },
      { type: 'code', language: 'python', code: \`# List Comprehension — [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Without comprehension (Java-style):
evens_java = []
for n in numbers:
    if n % 2 == 0:
        evens_java.append(n)

# With list comprehension:
evens = [n for n in numbers if n % 2 == 0]
squares = [n**2 for n in range(1, 6)]
print(evens)    # [2, 4, 6, 8, 10]
print(squares)  # [1, 4, 9, 16, 25]

# QA Use Case: filter test results
results = [
    {"name": "login", "status": "PASS", "ms": 342},
    {"name": "checkout", "status": "FAIL", "ms": 891},
    {"name": "profile", "status": "PASS", "ms": 215},
    {"name": "payment", "status": "FAIL", "ms": 3201},
]

failed_tests = [r["name"] for r in results if r["status"] == "FAIL"]
slow_tests = [r["name"] for r in results if r["ms"] > 500]
print(f"Failed: {failed_tests}")   # ['checkout', 'payment']
print(f"Slow: {slow_tests}")       # ['checkout', 'payment']

# Dict comprehension
durations = {r["name"]: r["ms"] for r in results}
print(durations)   # {'login': 342, 'checkout': 891, ...}

# Set comprehension (unique statuses)
statuses = {r["status"] for r in results}
print(statuses)    # {'PASS', 'FAIL'}\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Use comprehensions to process this test data
tests = [
    {"id": "TC-001", "duration": 120, "passed": True},
    {"id": "TC-002", "duration": 2500, "passed": False},
    {"id": "TC-003", "duration": 89, "passed": True},
    {"id": "TC-004", "duration": 1800, "passed": False},
    {"id": "TC-005", "duration": 342, "passed": True},
]

# 1. Get IDs of failed tests
failed = [t["id"] for t in tests if not t["passed"]]

# 2. Get avg duration of passed tests
passed = [t["duration"] for t in tests if t["passed"]]
avg = sum(passed) / len(passed) if passed else 0

print(f"Failed: {failed}")
print(f"Avg duration of passed tests: {avg:.0f}ms")\` },
      { type: 'quiz', question: { tr: "[x*2 for x in range(5) if x % 2 == 0] ne üretir?", en: 'What does [x*2 for x in range(5) if x % 2 == 0] produce?' }, options: [{ id: 'a', text: '[0, 2, 4, 6, 8]' }, { id: 'b', text: '[0, 4, 8]' }, { id: 'c', text: '[0, 2, 4]' }, { id: 'd', text: '[2, 4, 6, 8, 10]' }], correct: 'b', explanation: { tr: "range(5) = 0,1,2,3,4. x%2==0 filtrelemesi: 0,2,4 kalır. x*2 işlemi: 0,4,8. Sonuç: [0, 4, 8].", en: "range(5) = 0,1,2,3,4. Filter x%2==0 keeps 0,2,4. Then x*2 gives 0,4,8. Result: [0, 4, 8]." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 27 — Iterators
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Iterators', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🎡', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Iterator, sıra bekleyen bir kuyruk gibi. Her defasında bir sonraki kişiyi verir. Dondurma kuyruğu — her çağırdığında sıradaki kişi gelir, kuyruğun hepsi hafızada değil.", en: "An iterator is like a queue. Each time you ask, it gives you the next one. An ice cream queue — each call gives the next person, not everyone in memory at once." } },
      { type: 'code', language: 'python', code: \`# Python Iterators and Generators
# Iterator protocol: __iter__() and __next__()

# Simple counter iterator
class TestCounter:
    def __init__(self, max_count):
        self.max = max_count
        self.current = 0

    def __iter__(self):             # returns the iterator object itself
        return self

    def __next__(self):             # returns next value
        if self.current >= self.max:
            raise StopIteration    # signals end — like Java's hasNext() returning False
        self.current += 1
        return f"TC-{self.current:03d}"

# Use in for loop — Python calls __next__ automatically
for tc in TestCounter(5):
    print(tc)                      # TC-001, TC-002, ..., TC-005

# Built-in iterators
lst = [10, 20, 30]
it = iter(lst)                     # get iterator from list
print(next(it))                    # 10
print(next(it))                    # 20
print(next(it))                    # 30

# Generator function — simpler way to create iterators
def test_ids(prefix, count):
    for i in range(1, count + 1):
        yield f"{prefix}-{i:03d}"  # yield pauses and returns value

for id in test_ids("SMOKE", 3):
    print(id)                      # SMOKE-001, SMOKE-002, SMOKE-003\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Generator that yields test data lazily
def generate_test_users(count):
    for i in range(1, count + 1):
        yield {
            "id": i,
            "email": f"user{i:03d}@test.com",
            "role": "admin" if i == 1 else "user"
        }

# Only processes one user at a time — memory efficient!
for user in generate_test_users(5):
    print(user)\` },
      { type: 'quiz', question: { tr: "Python'da bir generator fonksiyonu oluşturmak için hangi keyword kullanılır?", en: 'Which keyword is used to create a generator function in Python?' }, options: [{ id: 'a', text: 'return' }, { id: 'b', text: 'generate' }, { id: 'c', text: 'yield' }, { id: 'd', text: 'next' }], correct: 'c', explanation: { tr: "'yield' ile normal fonksiyon generator'a dönüşür. Her yield çağrısında değer döner ve fonksiyon duraklar. Java'da bu pattern için Iterator interface'i implement edilir.", en: "'yield' turns a normal function into a generator. Each yield returns a value and pauses the function. In Java, you'd implement the Iterator interface for this pattern." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 28 — Decorators
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Decorators', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🎀', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Decorator, hediye paketleyici gibi. Çikolata güzel — ama paketleyince daha iyi görünüyor. Decorator, bir fonksiyonun etrafına ek davranış sarar — fonksiyonu değiştirmeden.", en: "A decorator is like a gift wrapper. Chocolate is great — but wrapped it looks even better. A decorator wraps a function with extra behavior — without changing the function itself." } },
      { type: 'text', content: { tr: "Java'da Aspect Oriented Programming (AOP) veya @annotation + proxy pattern ile benzer şeyler yapılır. Python'da decorator çok daha basit — sadece @ ile fonksiyon üstüne yaz. QA'de retry, timer, log gibi cross-cutting concerns için idealdir.", en: "Java does similar things with AOP or @annotation + proxy pattern. Python decorators are much simpler — just write @ above the function. In QA, ideal for cross-cutting concerns like retry, timer, and logging." } },
      { type: 'code', language: 'python', code: \`import functools
import time

# Basic decorator — logs function calls
def log_call(func):
    @functools.wraps(func)           # preserves function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@log_call                            # equivalent to: add = log_call(add)
def add(a, b):
    return a + b

add(3, 5)                            # prints call info + 8

# Decorator with parameters (factory pattern)
def retry(times=3, delay=1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt}/{times} failed: {e}")
                    if attempt < times:
                        time.sleep(delay)
            raise RuntimeError(f"{func.__name__} failed after {times} attempts")
        return wrapper
    return decorator

@retry(times=3, delay=0.1)           # QA pattern: retry flaky tests
def unstable_check():
    import random
    if random.random() < 0.5:
        raise ConnectionError("Flaky network")
    return "OK"

try:
    print(unstable_check())
except RuntimeError as e:
    print(e)\` },
      { type: 'editor', lang: 'python', defaultCode: \`import time
import functools

# Write a timer decorator that measures execution time
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {(end-start)*1000:.1f}ms")
        return result
    return wrapper

@timer
def slow_function(n):
    total = 0
    for i in range(n):
        total += i
    return total

result = slow_function(100000)
print(f"Result: {result}")\` },
      { type: 'quiz', question: { tr: "@functools.wraps(func) ne işe yarar?", en: 'What does @functools.wraps(func) do in a decorator?' }, options: [{ id: 'a', text: { tr: 'Fonksiyonu kopyalar', en: 'Copies the function' } }, { id: 'b', text: { tr: "Wrapper'ın orijinal fonksiyonun adını ve docstring'ini korumasını sağlar", en: "Preserves the original function's name and docstring on the wrapper" } }, { id: 'c', text: { tr: 'Decorator olmadan çağrılmasını sağlar', en: 'Allows calling without the decorator' } }, { id: 'd', text: { tr: 'Performansı artırır', en: 'Improves performance' } }], correct: 'b', explanation: { tr: "@functools.wraps(func) olmadan, wrapper.__name__ 'wrapper' olur. Wraps ile orijinal fonksiyonun adı ve docstring'i korunur — debugging ve logging için önemli.", en: "Without @functools.wraps(func), wrapper.__name__ would be 'wrapper'. Wraps preserves the original name and docstring — important for debugging and logging." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 29 — Context Managers
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Context Managers', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🚪', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Context manager, otomatik kapı gibi. Kütüphaneye girince kapı açılır, çıkınca kapanır — sen manuel kapatmak zorunda değilsin. Dosya açınca aynı şey: 'with' ile açarsan, Python otomatik kapatır.", en: "A context manager is like an automatic door. It opens when you enter, closes when you leave — you don't need to close it manually. Same with files: use 'with' and Python closes it automatically." } },
      { type: 'code', language: 'python', code: \`from contextlib import contextmanager
import time

# 'with' statement — guaranteed cleanup (like try-finally)
# Instead of:
# f = open("test.txt")
# try:
#     data = f.read()
# finally:
#     f.close()   # must remember to close!

# Use 'with' — auto-closes even if exception occurs:
# with open("test.txt") as f:
#     data = f.read()

# Custom context manager using @contextmanager
@contextmanager
def test_timer(test_name):
    start = time.perf_counter()
    print(f"Starting: {test_name}")
    try:
        yield                          # code inside 'with' runs here
    finally:
        elapsed = (time.perf_counter() - start) * 1000
        print(f"Finished: {test_name} ({elapsed:.1f}ms)")

# Usage
with test_timer("login_test"):
    time.sleep(0.01)                  # simulate test work
    print("  Executing login test...")

# Class-based context manager
class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name

    def __enter__(self):              # setup — called on 'with' entry
        print(f"Connecting to {self.db_name}")
        return self                   # returned as 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):  # teardown
        print(f"Closing connection to {self.db_name}")
        return False                  # False = don't suppress exceptions

with DatabaseConnection("test_db") as db:
    print("  Running queries...")\` },
      { type: 'editor', lang: 'python', defaultCode: \`from contextlib import contextmanager

@contextmanager
def assert_raises(exception_type):
    """Context manager that passes only if the expected exception is raised."""
    try:
        yield
        # If we get here, no exception was raised
        raise AssertionError(f"Expected {exception_type.__name__} but no exception raised")
    except exception_type:
        print(f"OK: {exception_type.__name__} was raised as expected")
    except Exception as e:
        raise AssertionError(f"Expected {exception_type.__name__}, got {type(e).__name__}: {e}")

# Test it
with assert_raises(ZeroDivisionError):
    result = 1 / 0

with assert_raises(ValueError):
    int("not a number")\` },
      { type: 'quiz', question: { tr: "Python'da with statement kullanmanın temel avantajı nedir?", en: 'What is the main advantage of using a with statement in Python?' }, options: [{ id: 'a', text: { tr: 'Daha hızlı çalışır', en: 'It runs faster' } }, { id: 'b', text: { tr: 'Exception olsa bile cleanup kodu garanti çalışır', en: 'Cleanup code runs guaranteed even if an exception occurs' } }, { id: 'c', text: { tr: 'Sadece dosya işlemleri için kullanılır', en: 'Can only be used with files' } }, { id: 'd', text: { tr: "try/except'e gerek bırakmaz", en: "Eliminates the need for try/except" } }], correct: 'b', explanation: { tr: "with statement, __exit__ metodunun exception durumunda bile çalışmasını garanti eder. Java'daki try-with-resources gibi: try (Resource r = new Resource()). Kaynak sızıntısını önler.", en: "The with statement guarantees __exit__ runs even if an exception occurs. Like Java's try-with-resources: try (Resource r = new Resource()). Prevents resource leaks." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 30 — Type Hints
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Type Hints', difficulty: '🔴 Advanced' },
      { type: 'simple-box', emoji: '🏷️', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: "Type hint, adım adım tariften 'şekeri ölçerken bardakla değil, gramla koy' demek gibi. Zorunlu değil ama çok yardımcı — IDE sana yanlış tip verdiğinde uyarır, ekip arkadaşın kodu daha hızlı anlar.", en: "Type hints are like adding 'use grams not cups' to a recipe. Not required but very helpful — your IDE warns you about wrong types, and teammates understand the code faster." } },
      { type: 'text', content: { tr: "Java statically-typed — her değişkene tip belirtmek zorunlu: String name = 'Ali'. Python dynamically-typed — tip opsiyonel ama type hint ekleyebilirsin: name: str = 'Ali'. Çalışma zamanında fark yaratmaz, sadece IDE ve mypy gibi araçlar kullanır.", en: "Java is statically-typed — types are mandatory: String name = 'Ali'. Python is dynamically-typed — types are optional but you can add hints: name: str = 'Ali'. No runtime difference, only IDEs and tools like mypy use them." } },
      { type: 'code', language: 'python', code: \`from typing import Optional, List, Dict, Union, Tuple, Callable

# Basic type hints
name: str = "Alice"             # string
age: int = 25                   # integer
score: float = 98.5             # float
active: bool = True             # boolean

# Function with type hints
def greet(name: str, times: int = 1) -> str:    # -> return type
    return (f"Hello, {name}! " * times).strip()

print(greet("Bob", 3))

# Complex types
def process_results(
    results: List[Dict[str, str]],  # list of string-keyed dicts
    filter_by: Optional[str] = None  # Optional = can be None or str
) -> Tuple[int, int]:               # returns (pass_count, fail_count)
    passed = sum(1 for r in results if r.get("status") == "PASS")
    failed = sum(1 for r in results if r.get("status") == "FAIL")
    return (passed, failed)

# Union type — accepts multiple types
def get_id(identifier: Union[int, str]) -> str:
    if isinstance(identifier, int):
        return f"TC-{identifier:04d}"
    return identifier

print(get_id(42))           # TC-0042
print(get_id("TC-007"))     # TC-007

# Python 3.10+ shorthand: X | Y instead of Union[X, Y]
def newer(val: int | str) -> str:
    return str(val)\` },
      { type: 'editor', lang: 'python', defaultCode: \`from typing import Optional, List

class TestSuite:
    def __init__(self, name: str) -> None:
        self.name = name
        self.tests: List[str] = []

    def add_test(self, test_name: str) -> None:
        self.tests.append(test_name)

    def get_test(self, index: int) -> Optional[str]:
        if 0 <= index < len(self.tests):
            return self.tests[index]
        return None

    def summary(self) -> str:
        return f"Suite '{self.name}': {len(self.tests)} tests"

suite = TestSuite("Regression")
suite.add_test("test_login")
suite.add_test("test_checkout")
print(suite.summary())
print(suite.get_test(0))
print(suite.get_test(99))   # Should return None\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Type System' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Tip zorunlu mu?', en: 'Types required?' }, java: 'Yes — compile error if missing', python: 'No — hints are optional' },
        { concept: 'Optional', java: 'Optional<String>', python: 'Optional[str] or str | None' },
        { concept: 'List type', java: 'List<String>', python: 'List[str] or list[str]' },
        { concept: 'Map type', java: 'Map<String, Integer>', python: 'Dict[str, int]' },
        { concept: 'Type check tool', java: 'javac (compile time)', python: 'mypy (separate tool)' },
      ]},
      { type: 'quiz', question: { tr: "Python'da Optional[str] ne anlama gelir?", en: 'What does Optional[str] mean in Python type hints?' }, options: [{ id: 'a', text: { tr: 'Sadece string olabilir', en: 'Can only be a string' } }, { id: 'b', text: { tr: 'String veya None olabilir', en: 'Can be a string or None' } }, { id: 'c', text: { tr: 'Tip belirtmek isteğe bağlı', en: 'The type hint is optional' } }, { id: 'd', text: { tr: 'Birden fazla string', en: 'Multiple strings' } }], correct: 'b', explanation: { tr: "Optional[str] = Union[str, None] — değer str veya None olabilir. Java'daki Optional<String> ile benzer ama Python'da None döndürebilecek fonksiyonlarda yaygın.", en: "Optional[str] = Union[str, None] — the value can be str or None. Similar to Java's Optional<String> but commonly used in Python for functions that might return None." } },

      // ─── Interview Questions for Advanced Topics ───────────────────────────
      { type: 'interview-questions', topic: 'Python Advanced', questions: [
        { level: 'basic', q: { tr: "Python'da decorator ne işe yarar? Bir örnek ver.", en: 'What does a decorator do in Python? Give an example.' }, a: { tr: "Decorator, bir fonksiyonun davranışını değiştirmek veya genişletmek için kullanılır — orijinal fonksiyona dokunmadan. @retry, @timer, @cache gibi. def retry(func): wrapper(*args): try: func(*args) except: retry... Bir QA test framework'ünde flaky testler için @retry(times=3) dekoratörü kullanılabilir.", en: "A decorator modifies or extends a function's behavior without touching the original. Examples: @retry, @timer, @cache. In a QA test framework, @retry(times=3) can automatically retry flaky tests." } },
        { level: 'basic', q: { tr: "Python'da 'with' statement ne zaman kullanılır?", en: "When do you use the 'with' statement in Python?" }, a: { tr: "Kaynak yönetimi gereken yerlerde: dosya açma, veritabanı bağlantısı, network bağlantısı. with open('file.txt') as f: otomatik kapatır. Hata olsa bile __exit__ çalışır — Java'daki try-with-resources gibi.", en: "When resource management is needed: file operations, database connections, network connections. with open('file.txt') as f: closes automatically. __exit__ runs even if an error occurs — like Java's try-with-resources." } },
        { level: 'intermediate', q: { tr: "Python'da generator ve list arasındaki fark nedir? QA'de neden generator kullanırsın?", en: 'What is the difference between a generator and a list in Python? Why use generators in QA?' }, a: { tr: "List tüm elemanları bellekte tutar. Generator lazy — her seferinde bir eleman üretir, bellekte hepsi tutulmaz. QA'de 100.000 test verisi üretmek için generator idealdir: def gen_users(): for i in range(100000): yield {...}. Bellek tasarrufu büyük.", en: "A list holds all elements in memory. A generator is lazy — produces one element at a time, not all in memory. In QA, generators are ideal for producing large test datasets: def gen_users(): for i in range(100000): yield {...}. Significant memory savings." } },
        { level: 'advanced', q: { tr: "Python type hints runtime'da nasıl çalışır? Tip hatası olursa ne olur?", en: 'How do Python type hints work at runtime? What happens if there is a type mismatch?' }, a: { tr: "Python type hints runtime'da enforce edilmez — sadece documentation ve tool'lar (mypy, IDE) için var. def foo(x: int): pass; foo('string') çalışır, hata vermez. Hata almak için mypy ile statik analiz veya pydantic gibi bir validation kütüphanesi gerekir. Java'nın static typing'ından bu farkı bilmek önemli.", en: "Python type hints are not enforced at runtime — they are only for documentation and tools like mypy and IDEs. def foo(x: int): pass; foo('string') works without error. To get errors, use mypy for static analysis or a validation library like pydantic. This difference from Java's static typing is important to understand." } },
      ]},
    ],
  },

`;

// Find section boundaries and replace
const beforeSection4 = lines.slice(0, s4Start).join('\n');
const afterSection4 = lines.slice(s5Start).join('\n');
const newContent = beforeSection4 + '\n' + newSection4 + afterSection4;
fs.writeFileSync('./src/data/pythonData.js', newContent);
console.log('Section 4 replaced successfully!');
console.log(`Old section was lines ${s4Start+1}-${s5Start}`);
