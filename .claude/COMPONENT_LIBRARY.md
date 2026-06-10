# COMPONENT_LIBRARY.md — Tekrar Kullanılan Bileşenler

> **Bu dosya ne içerir:** Her sayfada kullanılan, kopyala-yapıştır hazır  
> React bileşenleri ve CSS. Yeni bileşen yaratmak yerine buradakileri kullan.  
> **Ne zaman oku:** Yeni bir UI bileşeni eklerken, mevcut component'i özelleştirirken.

---

## 1. Sayfa Şablonu (Her yeni sayfa bu şablondan başlar)

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';

// ── Yardımcı: dil metnini çöz ──────────────────────────────────────────────
const t = (content, lang) => {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return content[lang] || content['en'] || content['tr'] || '';
};

const MyNewPage = () => {
  const { lang } = useLang();
  const [activeSection, setActiveSection] = useState('');
  const [completed, setCompleted] = useState(() =>
    JSON.parse(localStorage.getItem('qa-platform-completed') || '[]')
  );
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Intersection Observer — aktif bölümü takip et
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: '#1e1e2e', minHeight: '100vh', color: '#cdd6f4', fontFamily: 'Inter, sans-serif' }}>
      <ScrollProgressBar />
      <LangToggle />

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '80px 24px 24px' }}>
        {/* Sol Sidebar */}
        <Sidebar sections={PAGE_SECTIONS} activeId={activeSection} completed={completed} lang={lang} />

        {/* Ana İçerik */}
        <main style={{ flex: 1, minWidth: 0, marginLeft: '24px' }}>
          <FilterBar active={difficultyFilter} onChange={setDifficultyFilter} lang={lang} />
          {/* Bölümler buraya */}
        </main>
      </div>

      <HomeButton />
    </div>
  );
};

export default MyNewPage;
```

---

## 2. ScrollProgressBar

```jsx
const ScrollProgressBar = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#1e1e2e', zIndex: 9999 }}>
      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #7c3aed, #10b981)', transition: 'width 0.1s linear' }} />
    </div>
  );
};
```

---

## 3. LangToggle

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
      }}
    >
      <span style={{ opacity: lang === 'tr' ? 1 : 0.4 }}>🇹🇷 TR</span>
      <span style={{ color: '#4a4a6a' }}>|</span>
      <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>🇬🇧 EN</span>
    </button>
  );
};
```

---

## 4. HomeButton

```jsx
const HomeButton = () => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    title="Başa dön / Back to top"
    style={{
      position: 'fixed', bottom: '24px', right: '24px',
      width: '48px', height: '48px', borderRadius: '50%',
      background: '#7c3aed', color: '#fff', border: 'none',
      cursor: 'pointer', fontSize: '20px', zIndex: 999,
      boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
  >
    🏠
  </button>
);
```

---

## 5. Sidebar

```jsx
const Sidebar = ({ sections, activeId, completed, lang }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navContent = (
    <nav style={{ padding: '8px' }}>
      {sections.map(s => (
        <a key={s.id} href={`#${s.id}`}
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'block', padding: '8px 12px', borderRadius: '8px', marginBottom: '2px',
            color: activeId === s.id ? '#a78bfa' : '#6c7086',
            background: activeId === s.id ? '#7c3aed20' : 'transparent',
            fontWeight: activeId === s.id ? 600 : 400,
            textDecoration: 'none', fontSize: '13px',
            borderLeft: activeId === s.id ? '3px solid #7c3aed' : '3px solid transparent',
            transition: 'all 0.15s',
          }}
        >
          {completed.includes(s.id) ? '✅ ' : ''}{typeof s.label === 'string' ? s.label : (s.label[lang] || s.label.en)}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobil hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none', position: 'fixed', top: '16px', left: '16px', zIndex: 1001,
          width: '40px', height: '40px', borderRadius: '8px',
          background: '#27273a', border: '1px solid #313148',
          color: '#cdd6f4', cursor: 'pointer', fontSize: '18px',
          // Media query ile display: block yapılmalı
        }}
        className="hamburger-btn"
      >
        ☰
      </button>

      {/* Masaüstü sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        position: 'sticky', top: '80px',
        maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
        background: '#27273a', borderRadius: '12px',
        alignSelf: 'flex-start',
      }}
        className="desktop-sidebar"
      >
        {navContent}
      </aside>

      {/* Mobil drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)', display: 'flex',
        }}
          onClick={() => setMobileOpen(false)}
        >
          <div style={{
            width: '280px', background: '#27273a', overflowY: 'auto',
            padding: '60px 8px 24px',
          }}
            onClick={e => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
```

---

## 6. FilterBar (Zorluk Filtresi)

```jsx
const FilterBar = ({ active, onChange, lang }) => {
  const filters = [
    { key: 'all',          label: { tr: 'Tümü', en: 'All' } },
    { key: 'beginner',     label: { tr: '🟢 Başlangıç', en: '🟢 Beginner' } },
    { key: 'intermediate', label: { tr: '🟡 Orta', en: '🟡 Intermediate' } },
    { key: 'advanced',     label: { tr: '🔴 İleri', en: '🔴 Advanced' } },
  ];
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '0 0 24px' }}>
      {filters.map(f => (
        <button key={f.key} onClick={() => onChange(f.key)} style={{
          padding: '6px 16px', borderRadius: '20px', cursor: 'pointer',
          border: active === f.key ? '2px solid #7c3aed' : '1px solid #313148',
          background: active === f.key ? '#7c3aed20' : 'transparent',
          color: active === f.key ? '#a78bfa' : '#6c7086',
          fontWeight: active === f.key ? 600 : 400, fontSize: '13px',
          transition: 'all 0.2s',
        }}>
          {f.label[lang] || f.label.tr}
        </button>
      ))}
    </div>
  );
};
```

---

## 7. DifficultyBadge

```jsx
const DifficultyBadge = ({ level }) => {
  const cfg = {
    beginner:     { emoji: '🟢', label: 'Beginner',     color: '#10b981' },
    intermediate: { emoji: '🟡', label: 'Intermediate', color: '#f59e0b' },
    advanced:     { emoji: '🔴', label: 'Advanced',     color: '#ef4444' },
  };
  const { emoji, label, color } = cfg[level] || cfg.beginner;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '2px 10px', borderRadius: '12px',
      border: `1px solid ${color}30`, background: `${color}15`,
      color, fontSize: '12px', fontWeight: 600,
    }}>
      {emoji} {label}
    </span>
  );
};
```

---

## 8. SectionHeader (Bölüm Başlığı)

```jsx
const SectionHeader = ({ id, title, level = 'beginner', lang }) => {
  const [done, setDone] = React.useState(() =>
    JSON.parse(localStorage.getItem('qa-platform-completed') || '[]').includes(id)
  );

  const toggleDone = () => {
    const saved = JSON.parse(localStorage.getItem('qa-platform-completed') || '[]');
    const updated = done ? saved.filter(x => x !== id) : [...saved, id];
    localStorage.setItem('qa-platform-completed', JSON.stringify(updated));
    setDone(!done);
  };

  const displayTitle = typeof title === 'string' ? title : (title[lang] || title.en);

  return (
    <div id={id} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', scrollMarginTop: '80px' }}>
      <h2 style={{ margin: 0, color: '#ffffff', fontSize: '1.5rem', fontWeight: 700 }}>
        {displayTitle}
      </h2>
      <DifficultyBadge level={level} />
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginLeft: 'auto' }}>
        <input type="checkbox" checked={done} onChange={toggleDone}
          style={{ width: '16px', height: '16px', accentColor: '#10b981' }} />
        <span style={{ fontSize: '12px', color: done ? '#10b981' : '#6c7086' }}>
          {done ? '✅ Tamamlandı' : 'Tamamla'}
        </span>
      </label>
    </div>
  );
};
```

---

## 9. SimpleBox (10 Yaş Açıklama Kutusu)

```jsx
const SimpleBox = ({ block, lang }) => (
  <div style={{
    background: '#fef3c7', border: '2px solid #f59e0b',
    borderRadius: '12px', padding: '16px 20px',
    marginBottom: '20px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <span style={{ fontSize: '24px' }}>{block.emoji || '🧒'}</span>
      <strong style={{ color: '#92400e', fontSize: '14px' }}>
        {lang === 'tr' ? 'Bunu 10 yaşındaki bir çocuğa anlatırsak:' : 'Explained simply:'}
      </strong>
    </div>
    <p style={{ margin: 0, color: '#78350f', fontSize: '15px', lineHeight: 1.6 }}>
      {typeof block.content === 'string' ? block.content : (block.content[lang] || block.content.tr)}
    </p>
  </div>
);
```

---

## 10. CodeBlock (Syntax Highlight + Copy)

```jsx
const CodeBlock = ({ code, language = 'python' }) => {
  const [copied, setCopied] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && window.Prism) window.Prism.highlightElement(ref.current);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <button onClick={handleCopy} style={{
        position: 'absolute', top: '8px', right: '8px', zIndex: 1,
        padding: '4px 10px', borderRadius: '6px',
        background: copied ? '#10b98120' : '#313148',
        border: `1px solid ${copied ? '#10b981' : '#4a4a6a'}`,
        color: copied ? '#10b981' : '#a0a0c0',
        fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s',
      }}>
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <pre style={{ margin: 0, borderRadius: '8px', overflow: 'auto' }}>
        <code ref={ref} className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
```

---

## 11. QuizBlock (Çoktan Seçmeli)

```jsx
const QuizBlock = ({ block, lang }) => {
  const [selected, setSelected] = React.useState(null);
  const [revealed, setRevealed] = React.useState(false);

  const t = c => (typeof c === 'string' ? c : (c[lang] || c.tr));

  return (
    <div style={{ background: '#27273a', borderRadius: '12px', padding: '20px', marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '20px' }}>🧠</span>
        <strong style={{ color: '#a78bfa' }}>{lang === 'tr' ? 'Soru:' : 'Quiz:'}</strong>
      </div>
      <p style={{ color: '#cdd6f4', marginBottom: '16px' }}>{t(block.question)}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {block.options.map(opt => {
          const isCorrect = opt.id === block.correct;
          const isSelected = selected === opt.id;
          let bg = '#313148', border = '#4a4a6a', color = '#cdd6f4';
          if (revealed && isCorrect) { bg = '#10b98120'; border = '#10b981'; color = '#10b981'; }
          if (revealed && isSelected && !isCorrect) { bg = '#ef444420'; border = '#ef4444'; color = '#ef4444'; }
          return (
            <button key={opt.id} onClick={() => { if (!revealed) setSelected(opt.id); }}
              style={{ padding: '10px 16px', borderRadius: '8px', border: `1px solid ${border}`, background: bg, color, textAlign: 'left', cursor: revealed ? 'default' : 'pointer', transition: 'all 0.2s' }}>
              <strong style={{ marginRight: '8px' }}>{opt.id.toUpperCase()})</strong>
              {typeof opt.text === 'string' ? opt.text : (opt.text[lang] || opt.text.tr)}
            </button>
          );
        })}
      </div>
      {!revealed && selected && (
        <button onClick={() => setRevealed(true)}
          style={{ marginTop: '12px', padding: '8px 20px', borderRadius: '8px', background: '#7c3aed', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          {lang === 'tr' ? 'Cevabı Gör' : 'Check Answer'}
        </button>
      )}
      {revealed && (
        <div style={{ marginTop: '12px', padding: '12px', borderRadius: '8px', background: '#10b98110', border: '1px solid #10b98130' }}>
          <strong style={{ color: '#10b981' }}>{lang === 'tr' ? '💡 Açıklama:' : '💡 Explanation:'}</strong>
          <p style={{ color: '#cdd6f4', margin: '8px 0 0', fontSize: '14px' }}>{t(block.explanation)}</p>
        </div>
      )}
    </div>
  );
};
```

---

## 12. InterviewQuestions (Accordion)

```jsx
const InterviewQuestions = ({ block, lang }) => {
  const [open, setOpen] = React.useState({});
  const [levelFilter, setLevelFilter] = React.useState('all');

  const t = c => (typeof c === 'string' ? c : (c[lang] || c.tr));

  const levelColors = {
    basic: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444'
  };

  const filtered = block.questions.filter(q =>
    levelFilter === 'all' || q.level === levelFilter
  );

  return (
    <div style={{ marginTop: '24px' }}>
      <h3 style={{ color: '#a78bfa', marginBottom: '12px' }}>
        🎯 {lang === 'tr' ? 'Mülakat Soruları' : 'Interview Questions'}
      </h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['all', 'basic', 'intermediate', 'advanced'].map(lv => (
          <button key={lv} onClick={() => setLevelFilter(lv)}
            style={{
              padding: '4px 12px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px',
              border: levelFilter === lv ? `2px solid ${levelColors[lv] || '#7c3aed'}` : '1px solid #313148',
              background: levelFilter === lv ? `${levelColors[lv] || '#7c3aed'}15` : 'transparent',
              color: levelFilter === lv ? (levelColors[lv] || '#a78bfa') : '#6c7086',
            }}>
            {lv === 'all' ? (lang === 'tr' ? 'Tümü' : 'All') : lv.charAt(0).toUpperCase() + lv.slice(1)}
          </button>
        ))}
      </div>
      {filtered.map((q, i) => (
        <div key={i} style={{ borderBottom: '1px solid #313148', marginBottom: '4px' }}>
          <button onClick={() => setOpen(prev => ({ ...prev, [i]: !prev[i] }))}
            style={{
              width: '100%', textAlign: 'left', padding: '14px 16px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
            <span style={{ color: '#cdd6f4', fontSize: '14px' }}>
              <span style={{
                display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                background: levelColors[q.level], marginRight: '10px', flexShrink: 0,
              }} />
              {t(q.q)}
            </span>
            <span style={{ color: '#6c7086', fontSize: '18px' }}>{open[i] ? '▲' : '▼'}</span>
          </button>
          {open[i] && (
            <div style={{ padding: '0 16px 14px 34px', color: '#a0a0c0', fontSize: '14px', lineHeight: 1.7 }}>
              {t(q.a)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

---

## 13. GlossaryTerm (Hover Kart)

```jsx
const GlossaryTerm = ({ block, lang }) => {
  const t = c => (typeof c === 'string' ? c : (c[lang] || c.tr));
  const iconBg = { '📖': '#3b82f620', '❌': '#ef444420', '✅': '#10b98120', '💡': '#f59e0b20' };

  return (
    <div style={{ background: '#27273a', border: '1px solid #313148', borderRadius: '12px', padding: '16px', margin: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px' }}>📚</span>
        <strong style={{ color: '#a78bfa', fontSize: '16px' }}>{block.term}</strong>
        <span style={{ fontSize: '12px', color: '#6c7086', background: '#313148', padding: '2px 8px', borderRadius: '8px' }}>
          {lang === 'tr' ? 'Terim' : 'Term'}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {block.items.map((item, i) => (
          <div key={i} style={{
            background: iconBg[item.icon] || '#31314820',
            borderRadius: '8px', padding: '12px',
          }}>
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>{item.icon}</div>
            <div style={{ color: '#a78bfa', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
              {t(item.label)}
            </div>
            <div style={{ color: '#cdd6f4', fontSize: '13px', lineHeight: 1.5 }}>
              {t(item.content)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 14. TipBox / WarningBox

```jsx
const TipBox = ({ content, lang }) => {
  const text = typeof content === 'string' ? content : (content[lang] || content.tr);
  return (
    <div style={{ background: '#3b82f615', border: '1px solid #3b82f640', borderRadius: '8px', padding: '12px 16px', margin: '12px 0', display: 'flex', gap: '10px' }}>
      <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
      <span style={{ color: '#93c5fd', fontSize: '14px', lineHeight: 1.6 }}>{text}</span>
    </div>
  );
};

const WarningBox = ({ content, lang }) => {
  const text = typeof content === 'string' ? content : (content[lang] || content.tr);
  return (
    <div style={{ background: '#f59e0b15', border: '1px solid #f59e0b40', borderRadius: '8px', padding: '12px 16px', margin: '12px 0', display: 'flex', gap: '10px' }}>
      <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠️</span>
      <span style={{ color: '#fcd34d', fontSize: '14px', lineHeight: 1.6 }}>{text}</span>
    </div>
  );
};
```

---

## 15. ComparisonTable (Java vs Python vs TS)

```jsx
const ComparisonTable = ({ block, lang }) => {
  const t = c => (typeof c === 'string' ? c : (c[lang] || c.tr));
  return (
    <div style={{ overflow: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {block.headers.map(h => (
              <th key={h} style={{ padding: '10px 14px', background: '#313148', color: '#a78bfa', textAlign: 'left', borderBottom: '2px solid #7c3aed' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#1e1e2e' : '#27273a' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 14px', color: '#cdd6f4', borderBottom: '1px solid #313148', verticalAlign: 'top' }}>
                  {typeof cell === 'string' ? cell : t(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## 16. CSS — Global Stiller (index.css'e ekle)

```css
/* Hamburger mobil göster */
@media (max-width: 768px) {
  .hamburger-btn { display: block !important; }
  .desktop-sidebar { display: none; }
  main { margin-left: 0 !important; }
}

/* Anchor hover */
.section-header:hover .anchor-link { opacity: 1 !important; }

/* Smooth scroll */
html { scroll-behavior: smooth; }

/* Scrollbar stili */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #1e1e2e; }
::-webkit-scrollbar-thumb { background: #313148; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #7c3aed; }

/* Sidebar scrollbar ince */
aside::-webkit-scrollbar { width: 3px; }

/* Kod blok arka planı override */
pre[class*="language-"] {
  background: #12121f !important;
  border-radius: 8px !important;
  margin: 0 !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 14px !important;
}

/* Section animasyon */
section { animation: fadeIn 0.4s ease forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
