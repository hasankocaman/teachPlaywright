// Run: node transform_py.js
const fs = require('fs');

const NEW_SECTIONS_2_3_4 = `
  // ── 2. FOUNDATIONS ──────────────────────────────────────────────────────────
  {
    title: '🟢 Python Foundations',
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 1 — Python Syntax
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Python Syntax', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '📐', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Python kodu yazmak, cümle yazmak gibi. Süslü parantez yok, noktalı virgül yok. Sadece düzgün hizalama (girinti) gerekiyor — sanki bir liste hazırlıyorsun.', en: 'Writing Python is like writing sentences. No curly braces, no semicolons. Just proper indentation — like writing a neat outline.' } },
      { type: 'text', content: { tr: 'Java\'da bloklar {} ile açılır-kapanır ve her satır ";" ile biter. Python\'da bunların hiçbiri yok. Bloklar ":" (iki nokta) ile başlar, girintileme ile devam eder.', en: 'In Java, blocks open/close with {} and every statement ends with ";". Python has neither. Blocks start with ":" and continue by indentation.' } },
      { type: 'code', language: 'python', code: \`# Python Syntax Basics
# NO semicolons, NO curly braces
name = "Alice"              # Variable — no type declaration
age = 30                    # Integer

if age >= 18:               # Colon starts block
    print("Adult")          # 4-space indent = inside block
    print("Name:", name)    # Still inside block

for i in range(3):          # Loop
    print("Count:", i)      # Loop body (indented)

print("Done")               # Back to top level (no indent)\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Edit and run this code!
name = "QA Engineer"
experience = 3

if experience >= 2:
    print("Senior:", name)
    print("Years:", experience)
else:
    print("Junior:", name)

for skill in ["Python", "pytest", "Selenium"]:
    print("Skill:", skill)\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Syntax' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Blok açma', en: 'Open block' }, java: 'if (x > 0) {', python: 'if x > 0:' },
        { concept: { tr: 'Blok kapama', en: 'Close block' }, java: '}', python: '(dedent — no symbol needed)' },
        { concept: { tr: 'Satır sonu', en: 'Statement end' }, java: 'int x = 5;', python: 'x = 5' },
        { concept: { tr: 'Koşul parantezi', en: 'Condition parens' }, java: 'if (x > 0)', python: 'if x > 0:' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da bir kod bloğunun sonu nasıl anlaşılır?', en: 'How does Python mark the end of a code block?' }, options: [{ id: 'a', text: '}' }, { id: 'b', text: 'end' }, { id: 'c', text: 'Dedenting (going back to outer indentation level)' }, { id: 'd', text: ';' }], correct: 'c', explanation: { tr: 'Python, girintinin azalmasıyla bloğun bittiğini anlar. Süslü parantez ya da "end" keyword\'ü yoktur.', en: 'Python detects block end by dedenting — moving back to the outer indentation level. No closing symbol needed.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 2 — Comments
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Comments', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '💬', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Yorum, kodun içine "not" bırakmak gibi. Python bu satırları çalıştırmaz — sadece sen ve ekibindekiler okur.', en: 'A comment is like a sticky note inside your code. Python ignores it completely — it\'s just for humans to read.' } },
      { type: 'text', content: { tr: 'Java\'da // tek satır, /* */ çok satır yorum. Python\'da # tek satır, """ """ (docstring) çok satır yorum için kullanılır. Teknik terim değişmez ama sözdizimi farklı.', en: 'Java uses // for single-line and /* */ for multi-line comments. Python uses # for single-line and triple quotes """ for multi-line (docstrings).' } },
      { type: 'code', language: 'python', code: \`# Single-line comment — Python ignores this
name = "Alice"  # Inline comment — also ignored

"""
Multi-line comment (docstring).
Often used to document functions and classes.
Python ignores this at runtime.
"""

def greet(name):
    """This is a function docstring — documents what greet() does."""
    return f"Hello, {name}!"\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Try adding your own comments!
# This calculates a test pass rate

total_tests = 100       # How many tests were run
passed_tests = 87       # How many passed

pass_rate = (passed_tests / total_tests) * 100
print("Pass rate:", pass_rate, "%")\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Comments' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Tek satır yorum', en: 'Single-line comment' }, java: '// comment', python: '# comment' },
        { concept: { tr: 'Çok satır yorum', en: 'Multi-line comment' }, java: '/* comment */', python: '"""comment"""' },
        { concept: { tr: 'Dokümantasyon yorumu', en: 'Doc comment' }, java: '/** Javadoc */', python: '"""docstring"""' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da çok satırlı yorum için hangi sözdizimi kullanılır?', en: 'Which syntax creates a multi-line comment in Python?' }, options: [{ id: 'a', text: '/* ... */' }, { id: 'b', text: '// ...' }, { id: 'c', text: '"""..."""' }, { id: 'd', text: '#! ...' }], correct: 'c', explanation: { tr: 'Python\'da üçlü tırnak (""" veya \\'\\'\\'…\\'\\'\\'\\') docstring / çok satır yorum için kullanılır.', en: 'Triple quotes """ or \\'\\'\\'\\' create multi-line strings / docstrings. Python ignores them if not assigned.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 3 — Variables
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Variables', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🏷️', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Değişken, içine bir şey koyabileceğin etiketlenmiş bir kutu. "isim = \'Ali\'" diyince "isim" etiketli kutuya \'Ali\' koymuş olursun. İstediğin zaman açıp bakabilirsin.', en: 'A variable is a labeled box. When you write name = "Ali", you put "Ali" in a box labeled "name". You can check it anytime.' } },
      { type: 'text', content: { tr: 'Java\'da değişken tipi açıkça yazılır: int x = 5. Python\'da sadece x = 5 yazılır — Python tipi otomatik anlar. Bu "dinamik tipleme" olarak adlandırılır.', en: 'Java requires explicit type: int x = 5. Python just needs x = 5 — the type is inferred automatically. This is called dynamic typing.' } },
      { type: 'code', language: 'python', code: \`# Python Variables — no type declaration needed
name = "Alice"          # str (string)
age = 25                # int (integer)
score = 98.5            # float
is_active = True        # bool
nothing = None          # None (Java: null)

# Multiple assignment
x, y, z = 1, 2, 3      # Assign multiple at once

# Same value to multiple variables
a = b = c = 0

# Type can change (dynamic typing)
x = 10                  # int
x = "hello"             # now str — valid in Python!

# Check type
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Experiment with variables
test_name = "Login Test"
passed = True
duration_ms = 234
error_count = 0

print("Test:", test_name)
print("Passed:", passed)
print("Duration:", duration_ms, "ms")
print("Errors:", error_count)
print("Type of passed:", type(passed))\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Variables' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'int değişken', en: 'Integer variable' }, java: 'int x = 5;', python: 'x = 5' },
        { concept: { tr: 'String değişken', en: 'String variable' }, java: 'String s = "hi";', python: 's = "hi"' },
        { concept: { tr: 'Null değer', en: 'Null value' }, java: 'String s = null;', python: 's = None' },
        { concept: { tr: 'Tip kontrolü', en: 'Type check' }, java: 'x instanceof Integer', python: 'type(x) == int  or  isinstance(x, int)' },
        { concept: { tr: 'Sabit (const)', en: 'Constant' }, java: 'final int MAX = 100;', python: 'MAX = 100  # convention: ALL_CAPS' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da bir değişkenin tipini öğrenmek için hangi fonksiyon kullanılır?', en: 'Which function checks the type of a variable in Python?' }, options: [{ id: 'a', text: 'typeof(x)' }, { id: 'b', text: 'x.getClass()' }, { id: 'c', text: 'type(x)' }, { id: 'd', text: 'datatype(x)' }], correct: 'c', explanation: { tr: 'type(x) Python\'ın yerleşik fonksiyonudur. isinstance(x, int) ise miras (inheritance) dahil kontrol eder.', en: 'type(x) is Python\'s built-in. isinstance(x, int) also works and checks inheritance.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 4 — Data Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Data Types', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🗂️', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Veri tipleri, farklı "çekmece" türleri gibi. Sayılar, yazılar, listeler, doğru/yanlış — her veri türü için ayrı bir çekmece var.', en: 'Data types are like different drawer types. Numbers, text, lists, true/false — each kind of data has its own drawer.' } },
      { type: 'text', content: { tr: 'Java\'da primitive tipler (int, double, boolean) ve Object tipleri ayrıdır. Python\'da her şey bir object\'tir — int, str, list, dict hepsi birer sınıf örneğidir.', en: 'Java separates primitives (int, double, boolean) from Objects. In Python, everything is an object — int, str, list, dict are all class instances.' } },
      { type: 'table', headers: ['Python Type', 'Example', 'Java Equivalent', 'Mutable?'], rows: [
        ['str', '"hello"', 'String', 'No'],
        ['int', '42', 'int / Integer', 'No'],
        ['float', '3.14', 'double / Double', 'No'],
        ['bool', 'True / False', 'boolean', 'No'],
        ['list', '[1, 2, 3]', 'ArrayList<T>', 'Yes'],
        ['tuple', '(1, 2, 3)', 'List.of()', 'No'],
        ['dict', '{"a": 1}', 'HashMap<K,V>', 'Yes'],
        ['set', '{1, 2, 3}', 'HashSet<T>', 'Yes'],
        ['NoneType', 'None', 'null', '-'],
      ]},
      { type: 'editor', lang: 'python', defaultCode: \`# Explore Python data types
x = 42              # int
y = 3.14            # float
s = "hello"         # str
b = True            # bool
lst = [1, 2, 3]     # list
tpl = (1, 2)        # tuple
d = {"key": "val"}  # dict
st = {1, 2, 3}      # set

for var in [x, y, s, b, lst, tpl, d, st]:
    print(type(var).__name__, ":", var)\` },
      { type: 'quiz', question: { tr: 'Python\'da hangi veri tipi değiştirilemez (immutable)?', en: 'Which Python data type is immutable (cannot be changed after creation)?' }, options: [{ id: 'a', text: 'list' }, { id: 'b', text: 'dict' }, { id: 'c', text: 'tuple' }, { id: 'd', text: 'set' }], correct: 'c', explanation: { tr: 'Tuple immutable\'dır — oluşturduktan sonra eleman ekleyip çıkaramazsınız. Java\'daki List.of() gibi.', en: 'Tuples are immutable — you cannot add or remove elements after creation. Like Java\'s List.of().' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 5 — Numbers
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Numbers', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🔢', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Python\'da üç tür sayı var: tam sayılar (3, 100), ondalıklı sayılar (3.14), ve karmaşık sayılar (2+3j). Günlük kodlamada çoğunlukla ilk ikisini kullanırsın.', en: 'Python has three number types: integers (3, 100), floats (3.14), and complex (2+3j). In daily coding you mostly use the first two.' } },
      { type: 'text', content: { tr: 'Java\'da int sınırlı büyüklüktedir (max ~2 milyar). Python\'da int sınırsız büyüyebilir — memory yettikçe. float ise Java\'daki double\'a eşdeğerdir.', en: 'Java\'s int has a fixed limit (~2 billion). Python\'s int can grow infinitely — limited only by memory. Python\'s float is equivalent to Java\'s double.' } },
      { type: 'code', language: 'python', code: \`# Python Numbers
x = 10          # int
y = 3.14        # float
z = 2 + 3j      # complex

# Arithmetic operators
print(10 + 3)   # 13  — addition
print(10 - 3)   # 7   — subtraction
print(10 * 3)   # 30  — multiplication
print(10 / 3)   # 3.333... — true division (always float!)
print(10 // 3)  # 3   — floor division (Java: 10 / 3)
print(10 % 3)   # 1   — modulo
print(2 ** 10)  # 1024 — power (Java: Math.pow(2,10))

# Large numbers — Python handles them natively
big = 2 ** 100   # No overflow!
print(big)\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Number calculations for QA
total = 250         # Total test cases
passed = 223
failed = total - passed
pass_rate = (passed / total) * 100

print("Total:", total)
print("Passed:", passed)
print("Failed:", failed)
print(f"Pass rate: {pass_rate:.1f}%")  # 1 decimal place
print("Is 100% pass:", pass_rate == 100)\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Numbers' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Tam bölme', en: 'Integer division' }, java: '10 / 3  // = 3', python: '10 // 3  # = 3' },
        { concept: { tr: 'Gerçek bölme', en: 'True division' }, java: '10.0 / 3  // = 3.333', python: '10 / 3  # = 3.333 (always!)' },
        { concept: { tr: 'Üs alma', en: 'Power' }, java: 'Math.pow(2, 10)', python: '2 ** 10' },
        { concept: { tr: 'Sınırsız int', en: 'Unlimited int' }, java: 'BigInteger', python: 'int (built-in, unlimited)' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da 10 / 3 ifadesinin sonucu nedir?', en: 'What does 10 / 3 return in Python?' }, options: [{ id: 'a', text: '3' }, { id: 'b', text: '3.333...' }, { id: 'c', text: '3.0' }, { id: 'd', text: 'Error' }], correct: 'b', explanation: { tr: 'Python\'da / her zaman float döner (3.3333...). Tam bölme için // kullanılır ve 3 döner. Java\'dan büyük fark!', en: 'In Python, / always returns a float (3.3333...). Use // for integer division which returns 3. Big difference from Java!' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 6 — Casting
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Casting (Type Conversion)', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '🔄', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Casting, bir şeyi farklı bir şekle dönüştürmek gibi. Suyu buz yapıyorsun ama H₂O aynı kalıyor. "5" yazısını 5 sayısına çeviriyorsun — ama artık matematiksel işlem yapabilirsin.', en: 'Casting is like transforming something into a different form. "5" is a text, 5 is a number. Casting turns one into the other so you can do math.' } },
      { type: 'code', language: 'python', code: \`# Python Casting — converting between types
x = int("5")         # str → int  : 5
y = float(5)         # int → float: 5.0
z = str(3.14)        # float → str: "3.14"
b = bool(0)          # int → bool : False
b2 = bool("hello")   # str → bool : True  (non-empty = True)
b3 = bool("")        # str → bool : False (empty = False)

# Common in QA: reading CSV/JSON data
csv_value = "1500"   # From a CSV file — it's a string!
count = int(csv_value)
print(count * 2)     # 3000 — now we can do math

# Truthy / Falsy values
print(bool(0))       # False
print(bool(1))       # True
print(bool([]))      # False (empty list)
print(bool([1,2]))   # True  (non-empty list)\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Casting exercise
age_str = "25"        # From user input — always a string!
age_int = int(age_str)
print("Age as string:", age_str, type(age_str).__name__)
print("Age as int:", age_int, type(age_int).__name__)
print("Next year:", age_int + 1)

# Truthy/Falsy
values = [0, 1, "", "hello", [], [1,2], None]
for v in values:
    print(f"bool({repr(v)}) = {bool(v)}")\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Casting' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'String → int', en: 'String to int' }, java: 'Integer.parseInt("5")', python: 'int("5")' },
        { concept: { tr: 'int → String', en: 'int to String' }, java: 'String.valueOf(5)', python: 'str(5)' },
        { concept: { tr: 'int → double', en: 'int to float' }, java: '(double) 5', python: 'float(5)' },
        { concept: { tr: 'Herhangi → bool', en: 'Anything to bool' }, java: '(boolean) — limited', python: 'bool(x) — all values castable' },
      ]},
      { type: 'quiz', question: { tr: 'int("3.14") ifadesi ne döner?', en: 'What does int("3.14") return in Python?' }, options: [{ id: 'a', text: '3' }, { id: 'b', text: '3.14' }, { id: 'c', text: 'ValueError' }, { id: 'd', text: '0' }], correct: 'c', explanation: { tr: 'int() doğrudan ondalıklı string\'i çeviremez. Önce float("3.14"), sonra int() kullanmalısınız: int(float("3.14")) = 3', en: 'int() cannot directly convert a decimal string. Use int(float("3.14")) = 3. Direct int("3.14") raises ValueError.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 7 — Strings
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Strings', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '📝', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'String, harflerden oluşan bir dize — "merhaba" gibi. Python\'da stringleri tek (\\'\\'), çift (\\") veya üçlü (""") tırnak içinde yazabilirsin.', en: 'A string is a sequence of characters — like "hello". In Python you can write strings with single, double, or triple quotes.' } },
      { type: 'text', content: { tr: 'Java\'da String.charAt(), substring(), indexOf() gibi metodlar kullanılır. Python\'da aynı işler için daha kısa ve okunabilir sözdizimi var: s[0], s[1:5], "hello" in s gibi.', en: 'Java uses String.charAt(), substring(), indexOf(). Python has shorter, more readable syntax: s[0], s[1:5], "hello" in s.' } },
      { type: 'code', language: 'python', code: \`# Python Strings
s = "Hello, World!"

# Access characters
print(s[0])         # H  (first character)
print(s[-1])        # !  (last character)

# Slicing  [start:stop:step]
print(s[0:5])       # Hello
print(s[7:])        # World!
print(s[:5])        # Hello
print(s[::2])       # Hlo ol!  (every 2nd char)
print(s[::-1])      # !dlroW ,olleH  (reversed!)

# String methods
print(s.upper())       # HELLO, WORLD!
print(s.lower())       # hello, world!
print(s.replace("World", "Python"))  # Hello, Python!
print(s.split(", "))   # ['Hello', 'World!']
print(len(s))          # 13

# f-strings (most modern — use this!)
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")       # Python 3.6+
print(f"Next year: {age + 1}")           # Can do math inside!\` },
      { type: 'editor', lang: 'python', defaultCode: \`# String operations for QA
url = "https://automationexercise.com/api/users"
method = "GET"
status = 200

# f-string log message
print(f"[{method}] {url} → {status}")

# String methods
print("Upper:", url.upper())
print("Contains 'api':", "api" in url)
print("Split path:", url.split("/"))
print("Starts with https:", url.startswith("https"))
print("Replace:", url.replace("api", "v2"))\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Strings' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'İlk karakter', en: 'First character' }, java: 's.charAt(0)', python: 's[0]' },
        { concept: { tr: 'Alt string', en: 'Substring' }, java: 's.substring(0,5)', python: 's[0:5]' },
        { concept: { tr: 'Büyük harf', en: 'To upper' }, java: 's.toUpperCase()', python: 's.upper()' },
        { concept: { tr: 'İçeriyor mu?', en: 'Contains?' }, java: 's.contains("x")', python: '"x" in s' },
        { concept: { tr: 'Parçala', en: 'Split' }, java: 's.split(",")', python: 's.split(",")' },
        { concept: { tr: 'Format (modern)', en: 'String format' }, java: 'String.format("Hi %s", name)', python: 'f"Hi {name}"' },
      ]},
      { type: 'quiz', question: { tr: '"Hello"[::-1] ifadesi ne döner?', en: 'What does "Hello"[::-1] return?' }, options: [{ id: 'a', text: 'Hello' }, { id: 'b', text: 'olleH' }, { id: 'c', text: 'H' }, { id: 'd', text: 'Error' }], correct: 'b', explanation: { tr: '[::-1] slice\'ı stringi tersine çevirir. -1 adım = sondan başa gider. Bu Python\'a özgü çok kullanışlı bir trick.', en: '[::-1] reverses the string. Step -1 means go backwards. This is a very Pythonic trick with no Java equivalent.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 8 — Booleans
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Booleans', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '✅', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Boolean, sadece iki değer alır: True veya False (doğru veya yanlış). "Test geçti mi?" sorusunun cevabı gibi — ya evet ya hayır.', en: 'A Boolean has only two values: True or False. Like the answer to "Did the test pass?" — only yes or no.' } },
      { type: 'text', content: { tr: 'Java\'da boolean küçük harfle (true/false) yazılır. Python\'da büyük harfle (True/False). Ayrıca Python\'da her değer True ya da False gibi davranır — boş liste, 0, None hepsi False sayılır.', en: 'Java writes boolean lowercase (true/false). Python uses uppercase (True/False). Python also has "truthy/falsy" — empty list, 0, None all behave as False.' } },
      { type: 'code', language: 'python', code: \`# Python Booleans
print(True)          # True
print(False)         # False
print(10 > 5)        # True
print(10 == 5)       # False

# Comparison operators return bool
x = 5
print(x == 5)   # True   (equal)
print(x != 3)   # True   (not equal)
print(x > 3)    # True   (greater than)
print(x >= 5)   # True   (greater or equal)

# Logical operators (Python uses words, not symbols!)
print(True and False)    # False  (Java: &&)
print(True or False)     # True   (Java: ||)
print(not True)          # False  (Java: !)

# Truthy / Falsy
print(bool(0))      # False
print(bool(1))      # True
print(bool(""))     # False — empty string
print(bool("hi"))   # True  — non-empty string
print(bool([]))     # False — empty list
print(bool(None))   # False — None is always falsy\` },
      { type: 'editor', lang: 'python', defaultCode: \`# QA Boolean checks
test_passed = True
response_time = 120   # ms
expected_time = 200   # ms

is_fast = response_time < expected_time
print("Test passed:", test_passed)
print("Is fast:", is_fast)
print("Both OK:", test_passed and is_fast)

# Truthiness check
errors = []  # empty list
if not errors:
    print("No errors — all clear!")
else:
    print("Errors found:", errors)\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Booleans' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Boolean değerleri', en: 'Boolean values' }, java: 'true, false', python: 'True, False (capital!)' },
        { concept: { tr: 'VE operatörü', en: 'AND operator' }, java: '&&', python: 'and' },
        { concept: { tr: 'VEYA operatörü', en: 'OR operator' }, java: '||', python: 'or' },
        { concept: { tr: 'DEĞİL operatörü', en: 'NOT operator' }, java: '!', python: 'not' },
        { concept: { tr: 'Falsy değerler', en: 'Falsy values' }, java: 'false, null only', python: 'False, None, 0, "", [], {}, ()' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da bool([]) ifadesi ne döner?', en: 'What does bool([]) return in Python?' }, options: [{ id: 'a', text: 'True' }, { id: 'b', text: 'False' }, { id: 'c', text: 'None' }, { id: 'd', text: 'Error' }], correct: 'b', explanation: { tr: 'Boş liste False\'tur. Python\'da boş container\'lar ([], {}, (), set()), 0, None ve "" hepsi False sayılır.', en: 'Empty list is falsy. In Python: empty containers ([], {}, (), set()), 0, None, and "" are all False.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 9 — Operators
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Operators', difficulty: '🟢 Beginner' },
      { type: 'simple-box', emoji: '⚙️', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Operatörler, işlem sembolleri. Toplama (+), çıkarma (-), karşılaştırma (>, <), ve mantık (and, or) — bunların hepsi operatör. Matematik dersindeki sembollerin kod versiyonu.', en: 'Operators are action symbols. Addition (+), comparison (>, <), logic (and, or) — all operators. Think of them as the math symbols from school, but for code.' } },
      { type: 'code', language: 'python', code: \`# Python Operators — complete reference

# Arithmetic
print(7 + 2)    # 9  (add)
print(7 - 2)    # 5  (subtract)
print(7 * 2)    # 14 (multiply)
print(7 / 2)    # 3.5 (divide — float)
print(7 // 2)   # 3  (floor divide — int)
print(7 % 2)    # 1  (modulo)
print(7 ** 2)   # 49 (power)

# Comparison (return True or False)
x = 5
print(x == 5)   # True  — equal to
print(x != 3)   # True  — not equal to
print(x > 3)    # True  — greater than
print(x < 10)   # True  — less than
print(x >= 5)   # True  — greater or equal
print(x <= 5)   # True  — less or equal

# Assignment operators (shorthand)
x = 10
x += 3    # x = x + 3  → 13
x -= 2    # x = x - 2  → 11
x *= 2    # x = x * 2  → 22

# Identity & Membership
print(x is None)         # False
print(5 in [1, 3, 5])    # True
print(7 not in [1, 3, 5])# True\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Operator examples for QA
response_time = 150  # ms
threshold = 200      # ms SLA

# Arithmetic
margin = threshold - response_time
print("Margin:", margin, "ms")
print("50% of threshold:", threshold // 2)

# Comparison + logical
is_ok = response_time < threshold
is_critical = response_time >= threshold * 0.9
print("OK:", is_ok, "| Critical zone:", is_critical)

# Membership
allowed_methods = ["GET", "POST", "PUT", "DELETE"]
method = "PATCH"
print("Method allowed:", method in allowed_methods)\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Operators' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Üs alma', en: 'Power/Exponent' }, java: 'Math.pow(2, 8)', python: '2 ** 8' },
        { concept: { tr: 'Tam bölme', en: 'Floor division' }, java: '7 / 2  // = 3', python: '7 // 2  # = 3' },
        { concept: { tr: 'VE / VEYA / DEĞİL', en: 'AND / OR / NOT' }, java: '&& / || / !', python: 'and / or / not' },
        { concept: { tr: 'İçeriyor mu?', en: 'Contains check' }, java: 'list.contains(x)', python: 'x in list' },
        { concept: { tr: 'Referans eşitliği', en: 'Reference equality' }, java: '==', python: 'is' },
        { concept: { tr: 'Değer eşitliği', en: 'Value equality' }, java: '.equals()', python: '==' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da "not in" operatörü ne işe yarar?', en: 'What does the "not in" operator do in Python?' }, options: [{ id: 'a', text: 'It reverses a list' }, { id: 'b', text: 'It checks if a value is NOT in a sequence' }, { id: 'c', text: 'It removes an element from a list' }, { id: 'd', text: 'Same as !='}], correct: 'b', explanation: { tr: '"not in" bir değerin listede, string\'de ya da dict\'te OLMADIĞINI kontrol eder. Java\'da list.contains(x) == false ile eşdeğer.', en: '"not in" checks if a value is absent from a sequence. Equivalent to Java\'s !list.contains(x).' } },

      // Section interview questions
      { type: 'interview-questions', topic: 'Python Foundations', questions: [
        { level: 'basic', q: { tr: 'Python dinamik tipli bir dil ne demek?', en: 'What does it mean that Python is dynamically typed?' }, a: { tr: 'Değişken tipini siz belirtmezsiniz — Python çalışma zamanında anlar. x = 5 dersiniz, Python x\'i int olarak işler. Sonra x = "hello" derseniz, x artık str olur. Java\'da bu hata verir çünkü tip sabitlenir.', en: 'You don\'t declare variable types — Python infers them at runtime. x = 5 makes x an int. Then x = "hello" makes it a str. In Java, this would be a compile error.' } },
        { level: 'basic', q: { tr: 'Python\'da None nedir?', en: 'What is None in Python?' }, a: { tr: 'None, Java\'daki null\'ın karşılığıdır. "Değer yok" anlamına gelir. Karşılaştırma için == yerine "is" kullanılır: if x is None. Fonksiyon hiçbir şey dönmezse implicit olarak None döner.', en: 'None is Python\'s null. It means "no value." Compare with "is" not "==": if x is None. Functions that return nothing implicitly return None.' } },
        { level: 'intermediate', q: { tr: 'Python\'da "is" ile "==" operatörlerinin farkı nedir?', en: 'What is the difference between "is" and "==" in Python?' }, a: { tr: '"==" değer eşitliğini kontrol eder. "is" kimlik (identity) eşitliğini — aynı bellek nesnesini mi? None, True, False için "is" kullanın. Sayılar ve string\'ler için "==" kullanın. Java\'daki == (referans) → Python\'da is; Java\'daki .equals() → Python\'da ==.', en: '"==" checks value equality. "is" checks identity — are they the same object in memory? Use "is" for None, True, False. Use "==" for numbers and strings. Java\'s == → Python\'s is; Java\'s .equals() → Python\'s ==' } },
        { level: 'advanced', q: { tr: 'Python\'da truthy/falsy kavramını açıklayın ve QA\'da ne zaman kullanışlıdır?', en: 'Explain Python\'s truthy/falsy concept and when it\'s useful in QA.' }, a: { tr: 'Herhangi bir Python değeri bool\'a dönüştürülebilir. 0, None, "", [], {}, () False\'tur; geri kalanlar True\'dur. QA\'da: "if errors:" veya "if response.json():" şeklinde kullanılır — Java\'daki "if (errors != null && !errors.isEmpty())" yerine çok daha kısa.', en: 'Any Python value can be coerced to bool. 0, None, "", [], {}, () are False; everything else True. In QA: "if errors:" or "if response.json()" is much shorter than Java\'s "if (errors != null && !errors.isEmpty())".' } },
      ]},
    ],
  },

  // ── 3. INTERMEDIATE ─────────────────────────────────────────────────────────
  {
    title: '🟡 Intermediate Python',
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 10 — Lists
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Lists', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🛒', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Liste, sıralı bir alışveriş listesi gibi. Her maddenin bir numarası (index) var. İstediğin yere ekleyebilir, istediğini silebilirsin.', en: 'A list is like a numbered shopping list. Each item has an index. You can add anywhere, remove anything.' } },
      { type: 'text', content: { tr: 'Java\'daki ArrayList\'in karşılığı Python\'daki list\'tir. Ama hiçbir import gerekmez, generic tip yazmak gerekmez. [1, 2, 3] yeterli. Farklı tipte elemanlar da tutabilir.', en: 'Python list is Java\'s ArrayList. No import needed, no generic types. [1, 2, 3] is all you need. Lists can hold mixed types.' } },
      { type: 'code', language: 'python', code: \`# Python Lists — most used data structure
tests = ["login", "checkout", "search"]  # Create

# Access
print(tests[0])      # "login"  (first)
print(tests[-1])     # "search" (last)
print(tests[1:])     # ["checkout", "search"] (slice)

# Modify
tests.append("register")    # Add to end
tests.insert(1, "cart")     # Insert at index 1
tests.remove("search")      # Remove by value
popped = tests.pop()        # Remove & return last
tests[0] = "LOGIN"          # Change element

# Info
print(len(tests))           # Count elements
print("login" in tests)     # Membership check
tests.sort()                # Sort in place
tests.reverse()             # Reverse in place

# Iterate
for test in tests:
    print("-", test)\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Working with test case lists
failed_tests = ["test_login", "test_checkout", "test_payment"]
print("Failed tests:", len(failed_tests))

# Add a new failure
failed_tests.append("test_search")
print("After append:", failed_tests)

# Check if specific test failed
if "test_login" in failed_tests:
    print("ALERT: Login test failed!")

# Sort and print
failed_tests.sort()
print("Sorted:", failed_tests)

# Remove resolved test
failed_tests.remove("test_checkout")
print("After fix:", failed_tests)\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Lists' }, columns: ['Java (ArrayList)', 'Python (list)'], rows: [
        { concept: { tr: 'Oluştur', en: 'Create' }, java: 'new ArrayList<>()', python: '[]' },
        { concept: { tr: 'Ekle (sona)', en: 'Append (end)' }, java: 'list.add("x")', python: 'list.append("x")' },
        { concept: { tr: 'İndexle eriş', en: 'Access by index' }, java: 'list.get(0)', python: 'list[0]' },
        { concept: { tr: 'Boyut', en: 'Size' }, java: 'list.size()', python: 'len(list)' },
        { concept: { tr: 'İçeriyor mu?', en: 'Contains?' }, java: 'list.contains(x)', python: 'x in list' },
        { concept: { tr: 'Sırala', en: 'Sort' }, java: 'Collections.sort(list)', python: 'list.sort()' },
      ]},
      { type: 'quiz', question: { tr: 'tests = ["a","b","c"] ise tests[-1] ne döner?', en: 'If tests = ["a","b","c"], what does tests[-1] return?' }, options: [{ id: 'a', text: '"a"' }, { id: 'b', text: '"b"' }, { id: 'c', text: '"c"' }, { id: 'd', text: 'Error' }], correct: 'c', explanation: { tr: 'Negatif index sondan sayar. -1 = son eleman, -2 = sondan ikinci. Java\'da bu doğrudan desteklenmez.', en: 'Negative indices count from the end. -1 = last, -2 = second to last. Java doesn\'t support negative indexing.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 11 — Tuples
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Tuples', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📦', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Tuple, açılamaz, değiştirilemez bir kutu gibi. İçine koyduklarını sonsuza kadar öyle kalır. GPS koordinatları gibi — (lat, lon) değişmez.', en: 'A tuple is a sealed box — you can\'t change what\'s inside. Like GPS coordinates (lat, lon) — fixed and permanent.' } },
      { type: 'text', content: { tr: 'Java\'da değiştirilemez liste için List.of() veya Collections.unmodifiableList() kullanırsınız. Python\'da tuple bu işi görür. Tuple() sözdizimi ile [] yerine () kullanılır. Fonksiyondan birden fazla değer döndürmek için ideal.', en: 'Java uses List.of() or unmodifiableList() for immutable lists. Python\'s tuple does this. Use () instead of []. Ideal for returning multiple values from a function.' } },
      { type: 'code', language: 'python', code: \`# Python Tuples — immutable sequences
point = (10, 20)         # x, y coordinates
color = (255, 128, 0)    # RGB — never changes
status = (200, "OK")     # HTTP status + message

# Access (same as list)
print(point[0])          # 10
print(point[-1])         # 20

# Tuple unpacking — very Pythonic!
x, y = point             # x=10, y=20
code, msg = status       # code=200, msg="OK"
print(f"HTTP {code}: {msg}")

# Tuples are immutable — this raises TypeError:
# point[0] = 99  ← ERROR!

# Function returning multiple values (actually a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)   # Returns tuple!

low, high = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {low}, Max: {high}")

# tuple vs list
print(type((1, 2)))    # <class 'tuple'>
print(type([1, 2]))    # <class 'list'>\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Tuple use cases
def get_test_result(test_name):
    """Returns (passed: bool, duration_ms: int, message: str)"""
    return True, 145, "Element found successfully"

passed, duration, message = get_test_result("test_login")
print("Passed:", passed)
print("Duration:", duration, "ms")
print("Message:", message)

# Tuple in comparison
result = ("PASS", 200)
if result[0] == "PASS":
    print("Test OK with status", result[1])\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Tuples' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Immutable liste', en: 'Immutable sequence' }, java: 'List.of(1, 2, 3)', python: '(1, 2, 3)' },
        { concept: { tr: 'Çift döndür', en: 'Return pair' }, java: 'return new int[]{a, b}; or Pair', python: 'return a, b  # tuple implicitly' },
        { concept: { tr: 'Unpack', en: 'Destructure' }, java: 'pair.getFirst(), pair.getSecond()', python: 'a, b = pair' },
        { concept: { tr: 'Değiştirmeye çalış', en: 'Try to modify' }, java: 'throws UnsupportedOperationException', python: 'raises TypeError' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da bir fonksiyon "return a, b" döndürürse, dönen değer tipi nedir?', en: 'When a Python function does "return a, b", what type is returned?' }, options: [{ id: 'a', text: 'list' }, { id: 'b', text: 'tuple' }, { id: 'c', text: 'dict' }, { id: 'd', text: 'Two separate values' }], correct: 'b', explanation: { tr: '"return a, b" aslında bir tuple döndürür: (a, b). Bu Python\'da çok yaygın — değişken unpacking ile x, y = func() şeklinde kullanılır.', en: '"return a, b" returns a tuple (a, b). Very common in Python — use variable unpacking: x, y = func().' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 12 — Sets
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Sets', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🎯', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Set, tekrarsız bir koleksiyon. Bir sınıftaki öğrenci isimlerini listeliyor ama aynı isim birden fazla kez yazılmışsa — set kullanırsan sadece bir tane kalır.', en: 'A set is a collection with no duplicates. List student names but someone appears twice — a set keeps only one.' } },
      { type: 'text', content: { tr: 'Java\'daki HashSet\'in karşılığı Python\'daki set\'tir. İçe aktarma gerekmez. {1, 2, 3} ile oluşturulur. Sıralama garantisi yoktur.', en: 'Python set is Java\'s HashSet. No import needed. Created with {1, 2, 3}. No guaranteed order.' } },
      { type: 'code', language: 'python', code: \`# Python Sets — unique, unordered
browsers = {"Chrome", "Firefox", "Safari"}
browsers.add("Edge")           # Add element
browsers.add("Chrome")         # Duplicate — ignored silently!
print(len(browsers))           # 4 (no Chrome duplicate)

# Set operations (like math sets)
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)        # {1,2,3,4,5,6}  Union (a OR b)
print(a & b)        # {3, 4}          Intersection (both)
print(a - b)        # {1, 2}          Difference (in a, not b)
print(a ^ b)        # {1,2,5,6}       Symmetric diff (either, not both)

# Remove duplicates from a list
tags = ["smoke", "regression", "smoke", "e2e", "regression"]
unique_tags = list(set(tags))
print(unique_tags)   # each tag only once (order may vary)\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Set use case: finding duplicate test IDs
test_runs = ["TC001", "TC002", "TC001", "TC003", "TC002"]
print("With duplicates:", test_runs)
print("Unique tests:", set(test_runs))
print("Total runs:", len(test_runs))
print("Unique count:", len(set(test_runs)))

# Find which browsers are NOT yet tested
all_browsers = {"Chrome", "Firefox", "Safari", "Edge"}
tested = {"Chrome", "Safari"}
not_tested = all_browsers - tested
print("Not tested:", not_tested)\` },
      { type: 'quiz', question: { tr: 'Set\'e aynı eleman iki kez eklenirse ne olur?', en: 'What happens when you add the same element to a set twice?' }, options: [{ id: 'a', text: 'Error is raised' }, { id: 'b', text: 'It appears twice' }, { id: 'c', text: 'The duplicate is silently ignored' }, { id: 'd', text: 'The set is cleared' }], correct: 'c', explanation: { tr: 'Set\'ler benzersizdir. Aynı eleman eklendiğinde sessizce görmezden gelinir — hata olmaz.', en: 'Sets are unique. Adding a duplicate is silently ignored — no error, no duplicate.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 13 — Dictionaries
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Dictionaries', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '📖', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Dictionary, telefon rehberi gibi. İsim (key) yazıyorsun, numarayı (value) alıyorsun. {"Ali": "555-1234"} — Ali\'ye bak, numarasını al.', en: 'A dictionary is like a phone book. Look up a name (key), get the number (value). {"Ali": "555-1234"} — look up Ali, get his number.' } },
      { type: 'text', content: { tr: 'Java\'daki HashMap<K,V>\'nin karşılığı Python\'daki dict\'tir. İçe aktarma gerekmez. {"key": value} ile oluşturulur. Python 3.7\'den itibaren ekleme sırasını korur.', en: 'Python dict is Java\'s HashMap<K,V>. No import. Created with {"key": value}. Since Python 3.7, dicts preserve insertion order.' } },
      { type: 'code', language: 'python', code: \`# Python Dictionaries
test = {
    "name": "Login Test",
    "status": "PASSED",
    "duration": 1243,
    "tags": ["smoke", "auth"],
}

# Access
print(test["name"])               # "Login Test" — KeyError if missing
print(test.get("name"))           # Same but safer
print(test.get("owner", "N/A"))   # Default if key missing → "N/A"

# Modify
test["status"] = "FAILED"         # Update
test["retry"] = 2                 # Add new key

# Check key existence
print("name" in test)             # True
print("owner" in test)            # False

# Iterate
for key, value in test.items():   # .items() = key-value pairs
    print(f"  {key}: {value}")

print(list(test.keys()))    # all keys
print(list(test.values()))  # all values

# Delete
del test["retry"]                 # Remove key
test.pop("duration", None)        # Remove & return (safe)\` },
      { type: 'editor', lang: 'python', defaultCode: \`# API response as dictionary
api_response = {
    "status": 200,
    "message": "OK",
    "data": {"user_id": 42, "username": "testuser"},
    "elapsed_ms": 87
}

print("Status:", api_response["status"])
print("Message:", api_response.get("message"))
print("User ID:", api_response["data"]["user_id"])

# Check all expected keys are present
required_keys = ["status", "message", "data"]
for key in required_keys:
    if key not in api_response:
        print(f"MISSING KEY: {key}")
    else:
        print(f"✓ {key} present")\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Dictionaries' }, columns: ['Java (HashMap)', 'Python (dict)'], rows: [
        { concept: { tr: 'Oluştur', en: 'Create' }, java: 'new HashMap<>()', python: '{}  or  dict()' },
        { concept: { tr: 'Ekle / güncelle', en: 'Put / update' }, java: 'map.put("k", v)', python: 'map["k"] = v' },
        { concept: { tr: 'Değer al', en: 'Get value' }, java: 'map.get("k")', python: 'map["k"]  or  map.get("k")' },
        { concept: { tr: 'Güvenli al', en: 'Get with default' }, java: 'map.getOrDefault("k", def)', python: 'map.get("k", default)' },
        { concept: { tr: 'Anahtar var mı?', en: 'Contains key?' }, java: 'map.containsKey("k")', python: '"k" in map' },
        { concept: { tr: 'Tüm girişler', en: 'All entries' }, java: 'map.entrySet()', python: 'map.items()' },
      ]},
      { type: 'quiz', question: { tr: 'Sözlükte olmayan bir key için dict.get("key") ne döner?', en: 'What does dict.get("missing_key") return when the key doesn\'t exist?' }, options: [{ id: 'a', text: 'KeyError' }, { id: 'b', text: 'None' }, { id: 'c', text: '0' }, { id: 'd', text: 'False' }], correct: 'b', explanation: { tr: '.get() varsayılan olarak None döner. dict["key"] ise KeyError fırlatır. QA kodunda .get() tercih edilir — crash olmaz.', en: '.get() returns None by default. dict["key"] raises KeyError. In QA code, prefer .get() — it won\'t crash on missing data.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 14 — If...Else
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'If...Else (Conditions)', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🚦', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'If-else, trafik ışığı gibi. Yeşil → git, kırmızı → dur, sarı → yavaşla. Kod da aynı şekilde karar verir: "Bu durum mu? O zaman şunu yap."', en: 'If-else is like a traffic light. Green → go, red → stop, yellow → slow down. Code makes decisions the same way: "Is this true? Then do this."' } },
      { type: 'code', language: 'python', code: \`# Python If...Else
score = 87

# Basic if-else
if score >= 90:
    print("A grade")
elif score >= 80:      # "elif" — not "else if"!
    print("B grade")
elif score >= 70:
    print("C grade")
else:
    print("Below C")

# One-line ternary (inline if)
result = "PASS" if score >= 70 else "FAIL"
print(result)

# Nested conditions
user = "admin"
logged_in = True

if logged_in:
    if user == "admin":
        print("Admin dashboard")
    else:
        print("User dashboard")
else:
    print("Please login")

# Multiple conditions
status = 200
body = {"user": "alice"}

if status == 200 and "user" in body:
    print("Valid response")

# None check (use 'is', not ==)
value = None
if value is None:
    print("No value")\` },
      { type: 'editor', lang: 'python', defaultCode: \`# QA decision logic
def validate_response(status_code, body):
    if status_code == 200:
        if "error" in body:
            return "FAIL — body has error key"
        return "PASS"
    elif status_code == 401:
        return "FAIL — Unauthorized"
    elif status_code == 404:
        return "FAIL — Not Found"
    elif status_code >= 500:
        return "FAIL — Server Error"
    else:
        return f"UNKNOWN — status {status_code}"

print(validate_response(200, {"data": "ok"}))
print(validate_response(200, {"error": "oops"}))
print(validate_response(401, {}))
print(validate_response(503, {}))\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Conditions' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Else-if', en: 'Else-if' }, java: 'else if (cond)', python: 'elif cond:' },
        { concept: { tr: 'Ternary', en: 'Ternary operator' }, java: 'cond ? a : b', python: 'a if cond else b' },
        { concept: { tr: 'Switch', en: 'Switch statement' }, java: 'switch(x) { case 1: ... }', python: 'match x:  case 1:  (Python 3.10+)' },
        { concept: { tr: 'Null kontrolü', en: 'Null check' }, java: 'if (x == null)', python: 'if x is None:' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da "else if" yerine hangi keyword kullanılır?', en: 'Which keyword does Python use instead of "else if"?' }, options: [{ id: 'a', text: 'else if' }, { id: 'b', text: 'elsif' }, { id: 'c', text: 'elif' }, { id: 'd', text: 'elseif' }], correct: 'c', explanation: { tr: 'Python "elif" kullanır — "else if"nin kısaltması. Bu Python\'a özgüdür; Java\'da "else if" (iki kelime) kullanılır.', en: 'Python uses "elif" — short for "else if". This is Python-specific; Java uses "else if" (two words).' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 15 — While Loops
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'While Loops', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🔁', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'While döngüsü, "koşul doğru olduğu sürece tekrar et" demek. Alarm saati çalana kadar uyumaya devam etmek gibi.', en: 'A while loop means "keep doing this as long as condition is true." Like sleeping until your alarm rings.' } },
      { type: 'code', language: 'python', code: \`# Python While Loop
count = 0
while count < 5:
    print("Count:", count)  # 0, 1, 2, 3, 4
    count += 1               # MUST increment — else infinite loop!

# break — exit loop early
attempt = 0
while True:                  # Infinite loop
    attempt += 1
    if attempt >= 3:
        print("Max retries reached")
        break                # Exit loop

# continue — skip rest, go to next iteration
i = 0
while i < 5:
    i += 1
    if i == 3:
        continue             # Skip printing 3
    print(i)                 # Prints 1, 2, 4, 5

# else clause (runs when loop finishes normally — unique to Python!)
n = 0
while n < 3:
    n += 1
else:
    print("Loop finished normally")\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Retry pattern — common in QA automation
import random  # for simulation

def check_service():
    return random.choice([False, False, True])  # Simulates flaky service

max_retries = 5
retry = 0

while retry < max_retries:
    retry += 1
    print(f"Attempt {retry}...")
    if check_service():
        print("Service is UP!")
        break
else:
    print(f"Service still DOWN after {max_retries} retries")\` },
      { type: 'quiz', question: { tr: 'Python\'da while döngüsünde "else" bloğu ne zaman çalışır?', en: 'When does the "else" block of a Python while loop execute?' }, options: [{ id: 'a', text: 'When the loop body throws an exception' }, { id: 'b', text: 'When the condition was never True' }, { id: 'c', text: 'When the loop completes normally (without break)' }, { id: 'd', text: 'Java has the same feature' }], correct: 'c', explanation: { tr: 'Python\'a özgü: while...else bloğu döngü break ile sonlanmadıysa (normal bitti) çalışır. Java\'da bu özellik yoktur.', en: 'Python-specific: while...else runs only if the loop finished without hitting break. Java has no equivalent.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 16 — For Loops
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'For Loops', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🎢', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'For döngüsü, listedeki her şey için sırayla bir işlem yapar. "Her test için çalıştır" gibi — liste bitince döngü de biter.', en: 'A for loop does something for each item in a sequence. "Run for every test" — the loop ends when the list ends.' } },
      { type: 'text', content: { tr: 'Java\'da for-each: "for (String s : list)". Python\'da: "for s in list:". Çok benzer ama Python\'da index olmaz — index lazımsa enumerate() kullan.', en: 'Java for-each: "for (String s : list)". Python: "for s in list:". Very similar but Python has no index — if you need one, use enumerate().' } },
      { type: 'code', language: 'python', code: \`# Python For Loops
tests = ["login", "checkout", "search"]

# Basic for-each
for test in tests:
    print("Running:", test)

# range() — Java equivalent: for(int i=0; i<5; i++)
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8, 2):  # 2, 4, 6 (start, stop, step)
    print(i)

# enumerate() — index + value
for i, test in enumerate(tests):
    print(f"{i}: {test}")   # 0: login, 1: checkout, ...

# zip() — parallel iteration (Java: no direct equivalent)
names = ["Alice", "Bob", "Carol"]
scores = [95, 87, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# List comprehension — compact for loop
squares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]
evens = [x for x in range(20) if x % 2 == 0]

# break and continue work same as while\` },
      { type: 'editor', lang: 'python', defaultCode: \`# For loop QA examples
api_endpoints = ["/users", "/products", "/orders", "/cart"]
expected_status = 200

print("Testing endpoints:")
for i, endpoint in enumerate(api_endpoints, start=1):
    # Simulating a check
    result = "PASS" if endpoint != "/cart" else "FAIL"
    print(f"  {i}. GET {endpoint} → {result}")

# Count failures
results = ["PASS", "FAIL", "PASS", "PASS", "FAIL"]
failures = [r for r in results if r == "FAIL"]
print(f"\\nTotal: {len(results)}, Failed: {len(failures)}")\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — For Loops' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'For-each', en: 'For-each' }, java: 'for (String s : list)', python: 'for s in list:' },
        { concept: { tr: 'Sayaçlı döngü', en: 'Indexed loop' }, java: 'for(int i=0; i<n; i++)', python: 'for i in range(n):' },
        { concept: { tr: 'Index + değer', en: 'Index + value' }, java: 'IntStream.range(0,n).forEach(i→...)', python: 'for i, v in enumerate(lst):' },
        { concept: { tr: 'Paralel iterasyon', en: 'Parallel iteration' }, java: 'Iterator + two lists manually', python: 'for a, b in zip(lst1, lst2):' },
      ]},
      { type: 'quiz', question: { tr: 'range(2, 10, 3) hangi sayıları üretir?', en: 'What numbers does range(2, 10, 3) produce?' }, options: [{ id: 'a', text: '2, 3, 4, 5, 6, 7, 8, 9' }, { id: 'b', text: '2, 5, 8' }, { id: 'c', text: '2, 4, 6, 8' }, { id: 'd', text: '3, 6, 9' }], correct: 'b', explanation: { tr: 'range(start, stop, step) → 2\'den başla, 10\'dan önce dur, 3 adım at: 2, 5, 8. Java\'daki for(i=2; i<10; i+=3)\'e eşdeğer.', en: 'range(start, stop, step) → start at 2, stop before 10, step 3: 2, 5, 8. Equivalent to Java\'s for(i=2; i<10; i+=3).' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 17 — Functions
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Functions', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '🔧', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Fonksiyon, bir tarif gibi. "Çay yap" tarifi: su kaynat, demle, koy. Her çay yapmak istediğinde aynı adımları tekrar yazmana gerek yok — tarifi çağırırsın.', en: 'A function is like a recipe. "Make tea": boil water, steep, pour. You don\'t rewrite the steps every time — you call the recipe.' } },
      { type: 'text', content: { tr: 'Java\'da metod tanımlarken erişim belirleyici, dönüş tipi yazılır: public String greet(String name). Python\'da sadece "def" yeterli: def greet(name):. Tip ipuçları opsiyonel ama önerilen.', en: 'Java methods need access modifier and return type: public String greet(String name). Python just needs "def": def greet(name):. Type hints are optional but recommended.' } },
      { type: 'code', language: 'python', code: \`# Python Functions
# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))    # Hello, Alice!

# Default parameters
def run_test(url, method="GET", timeout=30):
    return f"{method} {url} (timeout: {timeout}s)"

print(run_test("/api/users"))                # GET /api/users (timeout: 30s)
print(run_test("/api/login", "POST", 60))   # POST /api/login (timeout: 60s)

# Keyword arguments — call in any order
print(run_test(method="DELETE", url="/api/item/5"))

# *args — variable number of arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))    # 15

# **kwargs — variable keyword arguments
def log(**kwargs):
    for k, v in kwargs.items():
        print(f"  {k}={v}")

log(test="login", status="PASS", time=234)

# Type hints (Python 3.5+, recommended!)
def add(a: int, b: int) -> int:
    return a + b\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Function exercises
def validate_email(email: str) -> bool:
    """Returns True if email looks valid."""
    return "@" in email and "." in email.split("@")[-1]

def calculate_pass_rate(passed: int, total: int) -> float:
    """Returns pass rate as percentage."""
    if total == 0:
        return 0.0
    return round((passed / total) * 100, 2)

# Test the functions
emails = ["user@test.com", "bad-email", "admin@example.co.uk"]
for email in emails:
    print(f"{email}: {validate_email(email)}")

print()
print(f"Pass rate: {calculate_pass_rate(87, 100)}%")
print(f"Pass rate: {calculate_pass_rate(0, 50)}%")\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Functions' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Metod tanımla', en: 'Define method' }, java: 'public String greet(String name)', python: 'def greet(name: str) -> str:' },
        { concept: { tr: 'Default parametre', en: 'Default parameter' }, java: 'Overloading only', python: 'def f(x=10):' },
        { concept: { tr: 'Varargs', en: 'Variable args' }, java: 'String... args', python: '*args' },
        { concept: { tr: 'Named args', en: 'Named args (kwargs)' }, java: 'No equivalent', python: '**kwargs or name=value calls' },
        { concept: { tr: 'Çoklu dönüş', en: 'Return multiple' }, java: 'array or wrapper class', python: 'return a, b  (tuple)' },
      ]},
      { type: 'quiz', question: { tr: 'Python\'da fonksiyon tanımlamak için hangi keyword kullanılır?', en: 'Which keyword defines a function in Python?' }, options: [{ id: 'a', text: 'function' }, { id: 'b', text: 'def' }, { id: 'c', text: 'func' }, { id: 'd', text: 'method' }], correct: 'b', explanation: { tr: '"def" (define\'ın kısası) Python\'da fonksiyon tanımlar. JavaScript\'te "function", Java\'da tip ve isim yeterlidir.', en: '"def" (short for define) creates a Python function. JavaScript uses "function", Java just needs type and name.' } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 18 — Lambda
      // ═══════════════════════════════════════════════════════════════════════
      { type: 'heading', text: 'Lambda Functions', difficulty: '🟡 Intermediate' },
      { type: 'simple-box', emoji: '⚡', title: { tr: 'Bunu 10 yaşındaki birine anlatalım:', en: 'Simply put:' }, content: { tr: 'Lambda, tek satırlık isimsiz bir fonksiyon. "Sadece bir kez kullanacağım, isim koymaya değmez" dediğinde kullanılır. Hesap makinesi gibi: sadece basarsın, sonucu alırsın.', en: 'A lambda is a one-line nameless function. Use it when "I only need this once, not worth naming." Like a quick calculator.' } },
      { type: 'text', content: { tr: 'Java\'da lambda: x -> x * 2. Python\'da: lambda x: x * 2. Çok benzer! Python lambda\'sı tek ifade ile sınırlıdır — birden fazla satıra ihtiyaç varsa normal def kullanılır.', en: 'Java lambda: x -> x * 2. Python: lambda x: x * 2. Very similar! Python lambda is limited to one expression — need multiple lines? Use def instead.' } },
      { type: 'code', language: 'python', code: \`# Python Lambda Functions
# Basic lambda — anonymous function
square = lambda x: x ** 2
print(square(5))    # 25

double = lambda x: x * 2
add = lambda x, y: x + y

# Real use: sorted() with key
tests = [
    {"name": "login", "duration": 1200},
    {"name": "search", "duration": 340},
    {"name": "checkout", "duration": 890},
]

# Sort by duration (ascending)
tests.sort(key=lambda t: t["duration"])
for t in tests:
    print(t["name"], t["duration"])

# Sort by name (descending)
tests.sort(key=lambda t: t["name"], reverse=True)

# filter() — keep only matching items
durations = [1200, 340, 890, 450, 2100]
slow = list(filter(lambda x: x > 1000, durations))
print("Slow tests:", slow)   # [1200, 2100]

# map() — transform each item
doubled = list(map(lambda x: x * 2, [1, 2, 3]))
print(doubled)               # [2, 4, 6]\` },
      { type: 'editor', lang: 'python', defaultCode: \`# Lambda sorting exercise
test_results = [
    {"test": "test_login", "status": "FAIL", "time": 1500},
    {"test": "test_api", "status": "PASS", "time": 200},
    {"test": "test_ui", "status": "FAIL", "time": 3200},
    {"test": "test_db", "status": "PASS", "time": 150},
]

# Sort by time (fastest first)
by_time = sorted(test_results, key=lambda r: r["time"])
print("By speed:")
for r in by_time:
    print(f"  {r['test']}: {r['time']}ms")

# Filter only failures
failures = list(filter(lambda r: r["status"] == "FAIL", test_results))
print("\\nFailures:", [r["test"] for r in failures])\` },
      { type: 'comparison', title: { tr: 'Java ile Karşılaştırma', en: 'Java vs Python — Lambda' }, columns: ['Java', 'Python'], rows: [
        { concept: { tr: 'Lambda sözdizimi', en: 'Lambda syntax' }, java: 'x -> x * 2', python: 'lambda x: x * 2' },
        { concept: { tr: 'İki parametre', en: 'Two params' }, java: '(x, y) -> x + y', python: 'lambda x, y: x + y' },
        { concept: { tr: 'Sort ile kullan', en: 'Use with sort' }, java: 'list.sort(Comparator.comparing(t -> t.name))', python: 'list.sort(key=lambda t: t["name"])' },
        { concept: { tr: 'Filter ile kullan', en: 'Use with filter' }, java: 'stream().filter(x -> x > 5)', python: 'filter(lambda x: x > 5, list)' },
      ]},
      { type: 'quiz', question: { tr: 'lambda x, y: x + y ifadesi ne işe yarar?', en: 'What does lambda x, y: x + y do?' }, options: [{ id: 'a', text: 'Returns x only' }, { id: 'b', text: 'Creates an anonymous function that returns x + y' }, { id: 'c', text: 'Prints x + y' }, { id: 'd', text: 'Creates a list' }], correct: 'b', explanation: { tr: 'Lambda, iki parametre alan ve toplamlarını döndüren isimsiz bir fonksiyon oluşturur. Java\'daki (x, y) -> x + y ile aynı.', en: 'Lambda creates an anonymous function with two parameters that returns their sum. Same as Java\'s (x, y) -> x + y.' } },

      // Section interview questions
      { type: 'interview-questions', topic: 'Python Intermediate', questions: [
        { level: 'basic', q: { tr: 'Python\'da list ve tuple arasındaki fark nedir?', en: 'What is the difference between a list and a tuple in Python?' }, a: { tr: 'List değiştirilebilir (mutable) — append, remove, değiştirme yapabilirsiniz. Tuple değiştirilemez (immutable) — oluşturduktan sonra element ekleyip çıkaramazsınız. List [] ile, tuple () ile tanımlanır. Tuple daha hızlıdır çünkü Python onu optimize edebilir.', en: 'List is mutable — you can append, remove, and change elements. Tuple is immutable — you cannot change it after creation. List uses [], tuple uses (). Tuples are faster because Python can optimize them.' } },
        { level: 'basic', q: { tr: 'Python\'da dictionary\'ye vs listelere erişimin zaman karmaşıklığı nedir?', en: 'What is the time complexity of dict vs list lookup in Python?' }, a: { tr: 'Dict lookup O(1) — anahtarı hash\'ler ve direkt gider. List lookup by index de O(1)\'dir. Ama "x in list" O(n)\'dir — her eleman kontrol edilir. "x in dict" ise O(1). Bu yüzden QA\'da büyük veri setlerinde dict tercih edilir.', en: 'Dict lookup is O(1) — it hashes the key and jumps directly. List by index is also O(1). But "x in list" is O(n) — checks every element. "x in dict" is O(1). That\'s why dict is preferred for large datasets in QA.' } },
        { level: 'intermediate', q: { tr: 'Python\'da *args ve **kwargs ne işe yarar?', en: 'What are *args and **kwargs in Python?' }, a: { tr: '*args, belirsiz sayıda pozisyonel argüman alır — tuple olarak gelir. **kwargs, belirsiz sayıda keyword argüman alır — dict olarak gelir. def log(*args, **kwargs) hem log("msg1", "msg2") hem de log(level="INFO", test="login") çağrılarını kabul eder.', en: '*args accepts a variable number of positional arguments — arrives as a tuple. **kwargs accepts variable keyword arguments — arrives as a dict. def log(*args, **kwargs) can accept both log("msg1", "msg2") and log(level="INFO", test="login").' } },
        { level: 'advanced', q: { tr: 'List comprehension ne zaman kullanılmalı, for döngüsü ne zaman?', en: 'When should you use list comprehension vs a for loop?' }, a: { tr: 'List comprehension tek bir dönüşüm veya filtreleme işlemi için kullanılır — [x*2 for x in lst if x>0]. Okunabilir ve genellikle daha hızlıdır. For döngüsü ise birden fazla işlem, yan etkiler (print, IO, state değişikliği) veya iç içe karmaşık mantık için kullanılır. Kural: if comprehension anlaşılmaz görünüyorsa, for döngüsü yaz.', en: 'List comprehension is for single transformations or filters — [x*2 for x in lst if x>0]. Readable and usually faster. For loops are for multiple operations, side effects (print, IO, state changes), or complex nested logic. Rule: if the comprehension looks hard to read, use a for loop.' } },
      ]},
    ],
  },

`;

let f = fs.readFileSync('./src/data/pythonData.js', 'utf8');
const s2 = f.indexOf('  // ── 2. FOUNDATIONS');
const s4 = f.indexOf('  // ── 4. ADVANCED');
const result = f.slice(0, s2) + NEW_SECTIONS_2_3_4 + f.slice(s4);
fs.writeFileSync('./src/data/pythonData.js', result);
console.log('Done! Lines:', result.split('\\n').length);
