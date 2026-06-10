# TECH_SPEC.md — Teknik Gereksinimler

> **Bu dosya ne içerir:** Etkileşimli editör implementasyonu (Pyodide, sql.js, Babel),  
> TR/ENG dil toggle mimarisi, localStorage şeması, performans kuralları,  
> sayfa içi navigasyon teknik detayları.  
> **Ne zaman oku:** Editör, dil sistemi, localStorage, performans konularında çalışırken.

---

## 1. Etkileşimli Editör Sistemi

### 1.1 Python Editörü — Pyodide

Pyodide, Python'u WebAssembly üzerinden tarayıcıda çalıştırır.

**CDN yükleme (head'de bir kez):**
```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"></script>
```

**React bileşeni:**
```jsx
const PyodideEditor = ({ initialCode, height = '200px' }) => {
  const [code, setCode]         = React.useState(initialCode);
  const [output, setOutput]     = React.useState('');
  const [loading, setLoading]   = React.useState(false);
  const [pyReady, setPyReady]   = React.useState(false);
  const pyodideRef              = React.useRef(null);

  React.useEffect(() => {
    // Pyodide singleton — sayfa boyunca tek kez yüklenir
    if (window._pyodideInstance) {
      pyodideRef.current = window._pyodideInstance;
      setPyReady(true);
      return;
    }
    window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' })
      .then(py => {
        window._pyodideInstance = py;
        pyodideRef.current = py;
        setPyReady(true);
      });
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) return;
    setLoading(true);
    setOutput('');
    try {
      // stdout'u yakala
      pyodideRef.current.runPython(`
import sys, io
sys.stdout = io.StringIO()
`);
      pyodideRef.current.runPython(code);
      const out = pyodideRef.current.runPython('sys.stdout.getvalue()');
      setOutput(out || '(no output)');
    } catch (err) {
      setOutput(`❌ Error:\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #313148', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Editör toolbar */}
      <div style={{ background: '#12121f', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#6c7086', fontSize: '13px' }}>
          {pyReady ? '🐍 Python (Pyodide)' : '⏳ Python yükleniyor...'}
        </span>
        <button
          onClick={runCode}
          disabled={!pyReady || loading}
          style={{
            padding: '6px 18px', borderRadius: '6px',
            background: pyReady ? '#7c3aed' : '#313148',
            color: '#fff', border: 'none', cursor: pyReady ? 'pointer' : 'not-allowed',
            fontSize: '13px', fontWeight: 600,
          }}
        >
          {loading ? '⏳ Running...' : '▶ Run'}
        </button>
      </div>
      {/* Kod alanı */}
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{
          width: '100%', minHeight: height,
          background: '#12121f', color: '#cdd6f4',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '14px',
          border: 'none', padding: '16px', resize: 'vertical',
          boxSizing: 'border-box', outline: 'none',
        }}
        spellCheck={false}
      />
      {/* Çıktı alanı */}
      {output && (
        <pre style={{
          margin: 0, padding: '12px 16px',
          background: '#0d0d1a', color: output.startsWith('❌') ? '#ef4444' : '#10b981',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
          borderTop: '1px solid #313148', whiteSpace: 'pre-wrap',
        }}>
          {output}
        </pre>
      )}
    </div>
  );
};
```

---

### 1.2 SQL Editörü — sql.js (WebAssembly SQLite)

```html
<!-- CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js"></script>
```

**React bileşeni:**
```jsx
const SQLEditor = ({ initialCode, initialSchema = '' }) => {
  const [code, setCode]     = React.useState(initialCode);
  const [result, setResult] = React.useState(null);
  const [error, setError]   = React.useState('');
  const dbRef               = React.useRef(null);

  React.useEffect(() => {
    // sql.js singleton
    if (window._sqlDB) { dbRef.current = window._sqlDB; return; }
    window.initSqlJs({
      locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`
    }).then(SQL => {
      const db = new SQL.Database();
      // Örnek tablo
      db.run(`
        CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary INTEGER
        );
        INSERT INTO employees VALUES
          (1,'Alice','Engineering',95000),
          (2,'Bob','Marketing',75000),
          (3,'Carol','Engineering',105000),
          (4,'Dave','HR',65000),
          (5,'Eve','Engineering',115000);
      `);
      if (initialSchema) db.run(initialSchema);
      window._sqlDB = db;
      dbRef.current = db;
    });
  }, []);

  const runQuery = () => {
    if (!dbRef.current) return;
    setError('');
    setResult(null);
    try {
      const results = dbRef.current.exec(code);
      if (results.length === 0) {
        setResult({ message: '✅ Query executed successfully (no rows returned).' });
      } else {
        setResult(results[0]);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ border: '1px solid #313148', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ background: '#12121f', padding: '8px 12px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#6c7086', fontSize: '13px' }}>🗄️ SQL (SQLite)</span>
        <button onClick={runQuery} style={{ padding: '6px 18px', borderRadius: '6px', background: '#7c3aed', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
          ▶ Run
        </button>
      </div>
      <textarea
        value={code} onChange={e => setCode(e.target.value)}
        style={{ width: '100%', minHeight: '120px', background: '#12121f', color: '#cdd6f4', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', border: 'none', padding: '16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
        spellCheck={false}
      />
      {error && (
        <pre style={{ margin: 0, padding: '12px 16px', background: '#0d0d1a', color: '#ef4444', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', borderTop: '1px solid #313148' }}>
          ❌ {error}
        </pre>
      )}
      {result && !result.message && (
        <div style={{ overflowX: 'auto', borderTop: '1px solid #313148' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr>
                {result.columns.map(col => (
                  <th key={col} style={{ padding: '8px 12px', background: '#313148', color: '#a78bfa', textAlign: 'left', borderBottom: '1px solid #4a4a6a' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.values.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#12121f' : '#1a1a2e' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '8px 12px', color: '#cdd6f4', borderBottom: '1px solid #27273a' }}>
                      {cell ?? 'NULL'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {result?.message && (
        <div style={{ padding: '12px 16px', color: '#10b981', background: '#0d0d1a', borderTop: '1px solid #313148', fontSize: '13px' }}>
          {result.message}
        </div>
      )}
    </div>
  );
};
```

---

### 1.3 TypeScript Editörü — Babel Transpile → eval

TypeScript playground API yerine istemci tarafı Babel kullan:

```html
<!-- CDN -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

**React bileşeni:**
```jsx
const TSEditor = ({ initialCode }) => {
  const [code, setCode]     = React.useState(initialCode);
  const [output, setOutput] = React.useState('');
  const [error, setError]   = React.useState('');

  const runCode = () => {
    setOutput('');
    setError('');
    try {
      // TypeScript → JavaScript
      const result = Babel.transform(code, {
        filename: 'code.ts',
        presets: ['typescript'],
        plugins: [],
      });
      // console.log yakalama
      const logs = [];
      const fakeConsole = {
        log: (...args) => logs.push(args.map(a =>
          typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' ')),
        error: (...args) => logs.push('ERROR: ' + args.join(' ')),
      };
      // Güvenli eval
      const fn = new Function('console', result.code);
      fn(fakeConsole);
      setOutput(logs.join('\n') || '(no output)');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ border: '1px solid #313148', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ background: '#12121f', padding: '8px 12px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#6c7086', fontSize: '13px' }}>🔷 TypeScript (Babel)</span>
        <button onClick={runCode} style={{ padding: '6px 18px', borderRadius: '6px', background: '#7c3aed', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
          ▶ Run
        </button>
      </div>
      <textarea
        value={code} onChange={e => setCode(e.target.value)}
        style={{ width: '100%', minHeight: '160px', background: '#12121f', color: '#cdd6f4', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', border: 'none', padding: '16px', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }}
        spellCheck={false}
      />
      {error && (
        <pre style={{ margin: 0, padding: '12px 16px', background: '#0d0d1a', color: '#ef4444', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', borderTop: '1px solid #313148', whiteSpace: 'pre-wrap' }}>
          ❌ {error}
        </pre>
      )}
      {output && !error && (
        <pre style={{ margin: 0, padding: '12px 16px', background: '#0d0d1a', color: '#10b981', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', borderTop: '1px solid #313148', whiteSpace: 'pre-wrap' }}>
          {output}
        </pre>
      )}
    </div>
  );
};
```

---

## 2. TR/ENG Dil Toggle Sistemi

### 2.1 localStorage Şeması

```js
// Tüm localStorage key'leri
const LS_KEYS = {
  lang:      'qa-platform-lang',       // 'tr' | 'en'
  completed: 'qa-platform-completed',  // string[] — tamamlanan topic id'leri
  theme:     'qa-platform-theme',      // 'dark' | 'light' (ileride)
};
```

### 2.2 Dil Context

```jsx
// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('qa-platform-lang') || 'tr';
  });

  const toggle = () => {
    const next = lang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('qa-platform-lang', next);
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);

// Kullanım: const { lang, toggle } = useLang();
// İçerik: item.content[lang] veya (typeof item.content === 'string' ? item.content : item.content[lang])
```

### 2.3 Toggle Butonu

Sağ üst köşede, navbar'da sabit konum:

```jsx
const LangToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed', top: '16px', right: '16px', zIndex: 1000,
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px', borderRadius: '20px',
        background: '#27273a', border: '1px solid #313148',
        color: '#cdd6f4', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => e.target.style.borderColor = '#7c3aed'}
      onMouseLeave={e => e.target.style.borderColor = '#313148'}
    >
      <span style={{ opacity: lang === 'tr' ? 1 : 0.4 }}>🇹🇷 TR</span>
      <span style={{ color: '#313148' }}>|</span>
      <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>🇬🇧 EN</span>
    </button>
  );
};
```

### 2.4 İçerik Çözümleme Yardımcısı

```js
// Her blokta kullan
const t = (content, lang) => {
  if (!content) return '';
  if (typeof content === 'string') return content;      // Dil bağımsız
  return content[lang] || content['en'] || content['tr'] || '';
};

// Örnek kullanım
<p>{t(block.content, lang)}</p>
<h3>{t(block.title, lang)}</h3>
```

---

## 3. Home Butonu (Fixed Position)

Her sayfada sağ alt köşede sabit home butonu:

```jsx
const HomeButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      title="Başa dön / Back to top"
      style={{
        position: 'fixed', bottom: '24px', right: '24px',
        width: '48px', height: '48px', borderRadius: '50%',
        background: '#7c3aed', color: '#fff', border: 'none',
        cursor: 'pointer', fontSize: '20px', zIndex: 999,
        boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.6)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.4)';
      }}
    >
      🏠
    </button>
  );
};
```

---

## 4. Performans Kuralları

### 4.1 CDN Bağımlılıkları (İzin Verilenler)

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Prism.js — syntax highlighting -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>

<!-- Pyodide (sadece Python sayfası) -->
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"></script>

<!-- sql.js (sadece SQL sayfası) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js"></script>

<!-- Babel standalone (sadece TypeScript sayfası) -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

### 4.2 Yasaklı Şeyler

- ❌ `<img src="...">` (dış sunucu görsel)
- ❌ Base64 embedded görseller (büyük dosya boyutu)
- ❌ GSAP, anime.js, framer-motion (gereksiz büyük kütüphane)
- ❌ jQuery
- ❌ Lodash (native JS yeterli)
- ❌ `moment.js` (dayjs veya native Date yeterli)

### 4.3 localStorage Tam Şema

```js
// qa-platform-lang
// Tip: string
// Değerler: 'tr' | 'en'
// Default: 'tr'
localStorage.setItem('qa-platform-lang', 'tr');

// qa-platform-completed  
// Tip: JSON string — string[]
// Örnek: '["python-variables","python-lists","sql-select"]'
// Format: "{pageName}-{sectionId}" (kebab-case)
localStorage.setItem('qa-platform-completed', JSON.stringify([]));

// qa-platform-theme (ileride)
// Tip: string
// Değerler: 'dark' | 'light'
// Default: 'dark'
localStorage.setItem('qa-platform-theme', 'dark');
```

---

## 5. Anchor Link Navigasyon

Her bölüm başlığına anchor link ile direkt erişilebilmeli:

```jsx
// Bölüm başlığı komponenti
const SectionHeader = ({ id, title, level = 'beginner' }) => (
  <div id={id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', scrollMarginTop: '80px' }}>
    <a href={`#${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <h2 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>
        {title}
      </h2>
    </a>
    <DifficultyBadge level={level} />
    <CompletionCheckbox topicId={id} label="" />
    <a
      href={`#${id}`}
      style={{ color: '#6c7086', fontSize: '18px', textDecoration: 'none', opacity: 0, transition: 'opacity 0.2s' }}
      className="anchor-link"
    >
      #
    </a>
  </div>
);

// CSS
// .section-header:hover .anchor-link { opacity: 1; }
```

---

## 6. React Router Yapısı

```jsx
// src/App.jsx — mevcut yapıyı koru
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/"          element={<HomePage />} />
      <Route path="/jmeter"    element={<JMeterPage />} />
      <Route path="/sql"       element={<SQLPage />} />
      <Route path="/typescript" element={<TypeScriptPage />} />
      <Route path="/python"    element={<PythonPage />} />
    </Routes>
  )
}
```

Yeni sayfa eklerken: Route ekle + component oluştur + HomePage'e link ekle.
