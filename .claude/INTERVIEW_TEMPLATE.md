# INTERVIEW_TEMPLATE.md — Mülakat Soruları Şablonu

> **Bu dosya ne içerir:** Her konu için mülakat sorusu yazarken kullanılacak  
> şablon, düzey kuralları, cevap formatı ve örnek dolu sorular.  
> **Ne zaman oku:** Herhangi bir konuya interview-questions bölümü eklerken.

---

## 1. Veri Yapısı Şablonu

```js
// *Data.js dosyasında bu formatı kullan:
{
  type: 'interview-questions',
  topic: 'Python Lists',          // Konu adı (İngilizce, görüntülenmez)
  questions: [
    // ────── 5 BASIC ──────────────────────────────────────────────────────
    {
      level: 'basic',
      q: {
        tr: 'Soru Türkçe?',
        en: 'Question in English?'
      },
      a: {
        tr: 'Cevap Türkçe. 2-4 cümle. Somut örnek içermeli.',
        en: 'Answer in English. 2-4 sentences. Must include concrete example.'
      }
    },
    // ... 4 daha

    // ────── 5 INTERMEDIATE ────────────────────────────────────────────────
    {
      level: 'intermediate',
      q: { tr: '...', en: '...' },
      a: { tr: '...', en: '...' }
    },
    // ... 4 daha

    // ────── 5 ADVANCED ────────────────────────────────────────────────────
    {
      level: 'advanced',
      q: { tr: '...', en: '...' },
      a: { tr: '...', en: '...' }
    },
    // ... 4 daha
  ]
}
```

---

## 2. Düzey Kuralları

### 🟢 Basic (Giriş Seviye)
- "X nedir?" / "Ne işe yarar?"
- Sözdizimi nasıldır?
- Hangi durumda kullanılır?
- Basit örnek verebilir misiniz?

**Cevap tonu:** Net, kısa, örnekli. Teknik terim varsa açıkla.

### 🟡 Intermediate (Orta Seviye)
- "A ile B arasındaki fark nedir?"
- "Nasıl çalışır?" (iç mekanizma)
- "Neden X yerine Y kullanırsınız?"
- "Bu yaklaşımın dezavantajı nedir?"

**Cevap tonu:** Karşılaştırmalı, trade-off farkında, pratik deneyim içeren.

### 🔴 Advanced (İleri Seviye)
- "Gerçek projede nasıl uygularsınız?"
- "Edge case nedir?"
- "Performans etkisi nedir?"
- "Nasıl debug edersiniz?"
- "Alternatifler nelerdir ve hangisini seçersiniz?"

**Cevap tonu:** Deneyimli, bağlam bağımlı, "production'da gördüm" kalibreli.

---

## 3. Cevap Yazım Kuralları

1. **Mülakat dili:** Yazılı değil, sözlü cümle yapısı kullan.  
   ❌ "Lists are mutable data structures that..."  
   ✅ "So a list is mutable — meaning you can add or remove items after you create it."

2. **Somut örnek zorunlu:** Her cevapta en az 1 kod örneği veya gerçek kullanım senaryosu.

3. **Türkçe cevapta teknik terimler İngilizce kalır:**  
   ✅ "List değiştirilebilir (mutable) — tuple ise değiştirilemez (immutable)."  
   ❌ "Liste değiştirilebilir — demet ise değiştirilemez."

4. **Cevap uzunluğu:** 2-4 cümle ideal. Daha uzunsa madde madde yap.

5. **Java bağlantısı (Python/TS sorularında):** Java bildiği bilinen kullanıcı için  
   "Java'daki ArrayList gibi ama..." kalibreli bağlantı yap.

---

## 4. Tam Dolu Örnek — Python Lists

```js
{
  type: 'interview-questions',
  topic: 'Python Lists',
  questions: [
    // ══════════════════ BASIC ══════════════════
    {
      level: 'basic',
      q: {
        tr: 'Python\'da list nedir ve nasıl oluşturulur?',
        en: 'What is a Python list and how do you create one?'
      },
      a: {
        tr: 'List, sıralı ve değiştirilebilir bir koleksiyon veri tipidir. Köşeli parantez [] kullanarak oluşturulur. Java\'daki ArrayList\'e benzer ama daha az yazımla. Farklı tipleri bir arada tutabilir: `items = [1, "hello", True, 3.14]`. Özellikle test verisi saklamak ve döngülerle gezinmek için idealdir.',
        en: 'A list is an ordered, mutable collection in Python. You create it with square brackets []. It\'s similar to Java\'s ArrayList but requires much less boilerplate. It can hold mixed types: `items = [1, "hello", True, 3.14]`. It\'s ideal for storing test data and iterating with loops.'
      }
    },
    {
      level: 'basic',
      q: {
        tr: 'List\'e eleman eklemek ve çıkarmak için hangi metodlar kullanılır?',
        en: 'Which methods are used to add and remove items from a list?'
      },
      a: {
        tr: 'Eklemek için `append()` sona ekler, `insert(index, value)` belirli konuma ekler, `extend()` başka bir liste ekler. Çıkarmak için `remove(value)` değere göre siler, `pop(index)` index\'e göre siler ve silinen değeri döndürür, `del list[index]` doğrudan siler. QA testlerinde en çok `append()` kullanılır — test adımlarını dinamik olarak listeye eklerken.',
        en: 'To add: `append()` adds to the end, `insert(index, value)` adds at a position, `extend()` adds another list. To remove: `remove(value)` deletes by value, `pop(index)` removes by index and returns it, `del list[index]` directly deletes. In QA, `append()` is most common — for dynamically building test step lists.'
      }
    },
    {
      level: 'basic',
      q: {
        tr: 'List ile Tuple arasındaki temel fark nedir?',
        en: 'What is the main difference between a list and a tuple?'
      },
      a: {
        tr: 'List değiştirilebilir (mutable) — oluşturduktan sonra eleman ekleyip çıkarabilirsiniz. Tuple değiştirilemez (immutable) — bir kez oluşturulunca sabit kalır. Bu yüzden tuple genellikle koordinatlar, konfigürasyon değerleri gibi sabit veriler için kullanılır. Tuple ayrıca dictionary key\'i olabilir, list olamaz.',
        en: 'A list is mutable — you can add or remove elements after creation. A tuple is immutable — once created, it stays fixed. Tuples are typically used for fixed data like coordinates or config values. Also, tuples can be dictionary keys, lists cannot.'
      }
    },
    {
      level: 'basic',
      q: {
        tr: 'List\'te bir elemana nasıl erişilir? Negatif index ne anlama gelir?',
        en: 'How do you access a list element? What does a negative index mean?'
      },
      a: {
        tr: 'Index ile erişilir: `list[0]` ilk, `list[-1]` son elemanı verir. Negatif index sondan saymayı sağlar: `-1` son, `-2` sondan ikinci elemandır. Bu özellikle "son kaydı al" gibi senaryolarda çok kullanışlıdır. Java\'da bunu `list.get(list.size()-1)` ile yapardınız — Python\'da sadece `list[-1]`.',
        en: 'You access elements by index: `list[0]` is the first, `list[-1]` is the last. Negative indexing counts from the end: `-1` is last, `-2` is second-to-last. This is very handy for "get the last item" scenarios. In Java you\'d write `list.get(list.size()-1)` — Python just uses `list[-1]`.'
      }
    },
    {
      level: 'basic',
      q: {
        tr: 'List slicing nedir? Bir örnek verir misiniz?',
        en: 'What is list slicing? Can you give an example?'
      },
      a: {
        tr: 'Slicing, listenin bir alt kümesini almaktır: `list[start:stop:step]`. Örnek: `items = [10, 20, 30, 40, 50]` → `items[1:3]` → `[20, 30]`. `items[:2]` ilk 2 elemanı, `items[2:]` 3. elemandan sonunu, `items[::-1]` ters sırayı verir. QA\'da test sonuçlarının son N kaydını almak için sıkça kullanılır.',
        en: 'Slicing takes a subset of a list: `list[start:stop:step]`. Example: `items = [10, 20, 30, 40, 50]` → `items[1:3]` → `[20, 30]`. `items[:2]` gives first 2, `items[2:]` gives everything from index 2, `items[::-1]` reverses. In QA, it\'s often used to grab the last N test results.'
      }
    },

    // ══════════════════ INTERMEDIATE ══════════════════
    {
      level: 'intermediate',
      q: {
        tr: 'List comprehension nedir? Neden tercih edilir?',
        en: 'What is a list comprehension and why is it preferred?'
      },
      a: {
        tr: 'List comprehension, bir döngüyü tek satırda liste oluşturmak için kullanılan kısa yazım biçimidir. `squares = [x**2 for x in range(10) if x % 2 == 0]` — çift sayıların karesini alır. Normal for döngüsüne kıyasla daha okunabilir ve genellikle daha hızlıdır. QA\'da test data üretmek veya response\'lardan değer filtrelemek için idealdir.',
        en: 'A list comprehension is a concise way to create lists from a loop in one line. `squares = [x**2 for x in range(10) if x % 2 == 0]` — squares of even numbers. Compared to a regular for loop, it\'s more readable and often faster. In QA, it\'s ideal for generating test data or filtering values from API responses.'
      }
    },
    {
      level: 'intermediate',
      q: {
        tr: 'Python\'da list kopyalama yaparken shallow copy ile deep copy farkı nedir?',
        en: 'What is the difference between shallow copy and deep copy for lists in Python?'
      },
      a: {
        tr: 'Shallow copy (`list.copy()` veya `list[:]`) sadece üst katmanı kopyalar — iç içe listeler hâlâ aynı referansı paylaşır. Deep copy (`copy.deepcopy()`) tüm katmanları bağımsız olarak kopyalar. Örnek: Selenium test\'te web element\'lerin listesini kopyalıyorsanız ve elementler DOM\'da değişiyorsa deep copy gerekebilir.',
        en: 'Shallow copy (`list.copy()` or `list[:]`) only copies the top level — nested lists still share the same reference. Deep copy (`copy.deepcopy()`) independently copies all levels. Example: if you\'re copying a list of web elements that might change in the DOM, a deep copy may be necessary.'
      }
    },
    {
      level: 'intermediate',
      q: {
        tr: '`sort()` ile `sorted()` arasındaki fark nedir?',
        en: 'What is the difference between `sort()` and `sorted()`?'
      },
      a: {
        tr: '`sort()` listeyi yerinde (in-place) sıralar — orijinal liste değişir, `None` döner. `sorted()` yeni bir sıralı liste döndürür — orijinal değişmez. QA\'da test sonuçlarını sıralarken orijinal listeyi korumak istiyorsanız `sorted()` kullanın. Her ikisi de `reverse=True` ve `key=` parametrelerini destekler.',
        en: '`sort()` sorts the list in-place — the original list is modified, it returns `None`. `sorted()` returns a new sorted list — the original is unchanged. In QA, use `sorted()` when you want to keep the original test results list intact. Both support `reverse=True` and a `key=` parameter.'
      }
    },
    {
      level: 'intermediate',
      q: {
        tr: 'Python\'da list\'i fonksiyona geçirirken referans mı, kopya mı geçirilir?',
        en: 'When passing a list to a function in Python, is it passed by reference or by copy?'
      },
      a: {
        tr: 'Python "pass-by-object-reference" kullanır. Liste fonksiyona referansla geçer — fonksiyon içinde listeyi değiştirirseniz orijinal de değişir. Ama yeni bir liste ataması (`lst = [...]`) orijinali etkilemez. Bu, Java\'daki ArrayList davranışına benzer. Eğer fonksiyonun orijinali değiştirmesini istemiyorsanız `list.copy()` ile kopya gönderin.',
        en: 'Python uses "pass-by-object-reference." The list is passed by reference — if you modify it inside the function, the original changes too. But reassigning the variable (`lst = [...]`) doesn\'t affect the original. This is similar to how Java passes an ArrayList. If you don\'t want the function to modify the original, pass `list.copy()`.'
      }
    },
    {
      level: 'intermediate',
      q: {
        tr: 'List\'ten tekrarlı elemanları kaldırmanın en iyi yolu nedir?',
        en: 'What is the best way to remove duplicates from a list?'
      },
      a: {
        tr: 'En hızlı yol `list(set(original))` — ama sıralamayı kaybeder. Sıralamayı korumak için: `list(dict.fromkeys(original))` — Python 3.7\'den itibaren dict insertion order garanti eder. QA\'da test ID\'lerini de-duplicate ederken `dict.fromkeys()` tercih edilir çünkü sıralama önemlidir.',
        en: 'Fastest: `list(set(original))` — but loses order. To preserve order: `list(dict.fromkeys(original))` — since Python 3.7, dict preserves insertion order. In QA, when deduplicating test IDs, `dict.fromkeys()` is preferred because order matters.'
      }
    },

    // ══════════════════ ADVANCED ══════════════════
    {
      level: 'advanced',
      q: {
        tr: 'Büyük test data setlerinde list yerine generator kullanmanın avantajı nedir?',
        en: 'What is the advantage of using a generator over a list for large test datasets?'
      },
      a: {
        tr: 'List tüm elemanları belleğe yükler — 100.000 satır CSV\'yi liste olarak tutmak bellek sorununa yol açabilir. Generator sadece istenen elemanı üretir (`yield`) — bellek kullanımı sabit kalır. `(x for x in range(1_000_000))` yerine liste oluşturmak belleği gereksiz doldurur. Selenium ile büyük tablo testlerinde verileri generator\'la beslemek daha verimlidir.',
        en: 'A list loads all elements into memory — holding a 100,000-row CSV as a list can cause memory issues. A generator produces elements on demand (`yield`) — memory stays constant. Creating a list from `range(1_000_000)` unnecessarily fills memory. When feeding data to Selenium table tests, a generator is far more efficient.'
      }
    },
    {
      level: 'advanced',
      q: {
        tr: 'Python list\'in zaman karmaşıklığı nedir? Hangi operasyonlar yavaştır?',
        en: 'What is the time complexity of Python list operations? Which are slow?'
      },
      a: {
        tr: 'Sonuna ekleme `append()` O(1) amortize. Index ile erişim O(1). `in` operatörü O(n) — büyük listede yavaşlar, set kullanın. Başa ekleme `insert(0, x)` O(n) — tüm elemanları kaydırır, deque kullanın. `remove()` O(n) — önce arar. QA\'da büyük log listelerinde `in` yerine set oluşturun.',
        en: '`append()` is O(1) amortized. Index access is O(1). The `in` operator is O(n) — slow for large lists, use a set instead. `insert(0, x)` is O(n) — shifts all elements, use deque. `remove()` is O(n) — searches first. In QA, convert large log lists to a set before membership checks.'
      }
    },
    {
      level: 'advanced',
      q: {
        tr: 'pytest\'te parametrize ile list kullanımı nasıl optimize edilir?',
        en: 'How do you optimize list usage with pytest parametrize?'
      },
      a: {
        tr: '`@pytest.mark.parametrize` ile test data listesi verilebilir. İdeal kullanım: harici dosyadan (JSON/CSV) veriyi yükle, list comprehension ile filtrele, parametrize\'e ver. Büyük data setlerinde `ids=` parametresiyle her test case\'e anlamlı isim ver — hata raporunda hangi satır başarısız olduğu görünür. `pytest -k "smoke"` ile belirli marker\'lı testleri koş.',
        en: '`@pytest.mark.parametrize` accepts a list of test data. Best practice: load data from an external file (JSON/CSV), filter with list comprehension, pass to parametrize. For large datasets, use the `ids=` parameter to give each test case a meaningful name — you\'ll see which row failed in the report. Run subsets with `pytest -k "smoke"`.'
      }
    },
    {
      level: 'advanced',
      q: {
        tr: 'Playwright\'te page.locator().all() yerine explicit döngü ne zaman tercih edilir?',
        en: 'When is an explicit loop preferred over page.locator().all() in Playwright?'
      },
      a: {
        tr: '`locator.all()` o an sayfadaki tüm eşleşen elementlerin snapshot\'ını alır — DOM değişirse stale olur. Eğer döngü sırasında liste değişiyorsa (infinite scroll, dynamic loading) her iterasyonda yeniden query atmak gerekir: `for i in range(count): page.locator(".item").nth(i).click()`. `all()` static, bilinen elementler için ideal; dynamic içerik için `nth()` döngüsü tercih edilir.',
        en: '`locator.all()` takes a snapshot of matching elements at that moment — it can go stale if the DOM changes. If the list grows during the loop (infinite scroll, dynamic loading), re-query on each iteration: `for i in range(count): page.locator(".item").nth(i).click()`. Use `all()` for static known elements; use an `nth()` loop for dynamic content.'
      }
    },
    {
      level: 'advanced',
      q: {
        tr: 'Fonksiyonel programlama açısından `map()`, `filter()`, `reduce()` vs list comprehension — hangisini ne zaman seçersiniz?',
        en: 'From a functional programming perspective — `map()`, `filter()`, `reduce()` vs list comprehension: when do you choose which?'
      },
      a: {
        tr: 'List comprehension genellikle daha okunabilirdir ve Pythonic\'tir — basit dönüşüm ve filtrelemede tercih edilir. `map()` ve `filter()` lazy evaluation yapar (generator döner) — büyük veri setlerinde bellek avantajı sağlar. `reduce()` (`functools`) kümülatif işlemler için (toplam, birleştirme). QA\'da API response listelerini dönüştürmek için list comprehension yeterli; büyük log dosyalarında `map()`\'in generator avantajından yararlanılır.',
        en: 'List comprehensions are generally more readable and Pythonic — preferred for simple transformations and filtering. `map()` and `filter()` are lazy (return generators) — memory-efficient for large datasets. `reduce()` (`functools`) is for cumulative operations (sums, joins). In QA, list comprehensions are fine for transforming API response lists; use `map()` generator advantage for large log files.'
      }
    }
  ]
}
```

---

## 5. Sayfa Sonu Tam Liste Formatı

Her sayfanın altında kategorilere göre tam liste:

```jsx
// Bu bölüm her sayfanın en altına eklenir
const FullInterviewList = ({ allQuestions, lang }) => {
  const byLevel = {
    basic:        allQuestions.filter(q => q.level === 'basic'),
    intermediate: allQuestions.filter(q => q.level === 'intermediate'),
    advanced:     allQuestions.filter(q => q.level === 'advanced'),
  };
  // ... accordion render
};
```

---

## 6. Konu Başına Soru Sayısı Kuralı

| Konu Büyüklüğü | Basic | Intermediate | Advanced | Toplam |
|----------------|-------|--------------|----------|--------|
| Küçük konu (örn: Comments) | 3 | 2 | 0 | 5 |
| Orta konu (örn: Functions) | 5 | 5 | 3 | 13 |
| Büyük konu (örn: Classes) | 5 | 5 | 5 | 15 |
| Framework bölümü (Selenium/Playwright) | 5 | 5 | 5 | 15 |

Minimum her konuda 5 soru olmalı (karma düzey).
