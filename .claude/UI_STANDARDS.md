# UI_STANDARDS.md — Görsel ve Animasyon Standartları

> **Bu dosya ne içerir:** Renk paleti, tipografi, zorluk etiketleri, ilerleme takibi,  
> copy butonu, animasyon kuralları, sayfa içi navigasyon standartları.  
> **Ne zaman oku:** Yeni UI bileşeni eklerken, stil değişikliği yaparken.

---

## 1. Renk Paleti (Değiştirilemez)

```css
:root {
  /* Arka plan */
  --bg-primary:    #1e1e2e;  /* Ana sayfa arka planı */
  --bg-secondary:  #27273a;  /* Kart, sidebar arka planı */
  --bg-tertiary:   #313148;  /* Hover, aktif durum */
  --bg-code:       #12121f;  /* Kod bloğu arka planı */

  /* Metin */
  --text-primary:  #cdd6f4;  /* Ana metin */
  --text-muted:    #6c7086;  /* Soluk metin (placeholder, label) */
  --text-heading:  #ffffff;  /* Başlıklar */

  /* Accent ve durum renkleri */
  --accent:        #7c3aed;  /* Mor — ana vurgu, butonlar, link */
  --accent-light:  #a78bfa;  /* Açık mor — hover durumu */
  --success:       #10b981;  /* Yeşil — başarı, tamamlanan */
  --warning:       #f59e0b;  /* Turuncu — uyarı, intermediate */
  --error:         #ef4444;  /* Kırmızı — hata, advanced */
  --info:          #3b82f6;  /* Mavi — bilgi kutusu */

  /* Zorluk etiket renkleri */
  --beginner:      #10b981;  /* Yeşil */
  --intermediate:  #f59e0b;  /* Turuncu */
  --advanced:      #ef4444;  /* Kırmızı */

  /* Simple box (10 yaş kutusu) */
  --simple-box-bg:     #fef3c7;
  --simple-box-border: #f59e0b;
  --simple-box-text:   #92400e;
}
```

---

## 2. Tipografi

```css
/* Google Fonts CDN (head'de) */
/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"> */

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

code, pre, .code-block {
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 14px;
}

h1 { font-size: 2rem;   font-weight: 700; }
h2 { font-size: 1.5rem; font-weight: 600; }
h3 { font-size: 1.25rem; font-weight: 600; }
```

---

## 3. Zorluk Etiketleri (Difficulty Badges)

Her konunun başlığının yanında zorluk rozeti olmalı.

**JSX bileşeni:**
```jsx
const DifficultyBadge = ({ level }) => {
  const config = {
    beginner:     { emoji: '🟢', label: 'Beginner',     color: '#10b981' },
    intermediate: { emoji: '🟡', label: 'Intermediate', color: '#f59e0b' },
    advanced:     { emoji: '🔴', label: 'Advanced',     color: '#ef4444' },
  };
  const { emoji, label, color } = config[level] || config.beginner;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '2px 10px', borderRadius: '12px',
      border: `1px solid ${color}20`,
      backgroundColor: `${color}15`,
      color: color, fontSize: '12px', fontWeight: 600,
    }}>
      {emoji} {label}
    </span>
  );
};
```

---

## 4. Filtre Butonları (Zorluk Seviyesine Göre)

Her sayfanın üst kısmında zorluk filtresi bulunmalı:

```jsx
const FilterBar = ({ active, onChange }) => {
  const filters = [
    { key: 'all',          label: 'Tümü / All' },
    { key: 'beginner',     label: '🟢 Beginner' },
    { key: 'intermediate', label: '🟡 Intermediate' },
    { key: 'advanced',     label: '🔴 Advanced' },
  ];
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0' }}>
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          style={{
            padding: '6px 16px', borderRadius: '20px', cursor: 'pointer',
            border: active === f.key ? '2px solid #7c3aed' : '1px solid #313148',
            background: active === f.key ? '#7c3aed20' : 'transparent',
            color: active === f.key ? '#a78bfa' : '#6c7086',
            fontWeight: active === f.key ? 600 : 400,
            transition: 'all 0.2s',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};
```

---

## 5. İlerleme Takibi (Completion Checkbox)

Her konu başlığının yanında tamamlama checkbox'ı olmalı.  
Tamamlanan konular sidebar'da ✅ ile gösterilir.

**localStorage key:** `qa-platform-completed` (JSON dizisi: `["python-lists", "python-dicts", ...]`)

```jsx
const CompletionCheckbox = ({ topicId, label }) => {
  const [done, setDone] = React.useState(() => {
    const saved = JSON.parse(localStorage.getItem('qa-platform-completed') || '[]');
    return saved.includes(topicId);
  });

  const toggle = () => {
    const saved = JSON.parse(localStorage.getItem('qa-platform-completed') || '[]');
    const updated = done
      ? saved.filter(id => id !== topicId)
      : [...saved, topicId];
    localStorage.setItem('qa-platform-completed', JSON.stringify(updated));
    setDone(!done);
  };

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <input
        type="checkbox" checked={done} onChange={toggle}
        style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
      />
      <span style={{ 
        textDecoration: done ? 'line-through' : 'none',
        color: done ? '#10b981' : 'inherit'
      }}>
        {done ? '✅ ' : ''}{label}
      </span>
    </label>
  );
};
```

---

## 6. Copy Butonu Standardı

Her kod bloğunun sağ üst köşesinde copy butonu zorunludur.

```jsx
const CopyButton = ({ code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute', top: '8px', right: '8px',
        padding: '4px 10px', borderRadius: '6px',
        background: copied ? '#10b98120' : '#313148',
        border: `1px solid ${copied ? '#10b981' : '#4a4a6a'}`,
        color: copied ? '#10b981' : '#a0a0c0',
        fontSize: '12px', cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
};
```

---

## 7. Scroll Progress Bar

Her sayfanın en üstünde ince scroll progress bar olmalı.

```jsx
const ScrollProgressBar = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '3px',
      background: '#1e1e2e', zIndex: 9999,
    }}>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: `linear-gradient(90deg, #7c3aed, #10b981)`,
        transition: 'width 0.1s linear',
      }} />
    </div>
  );
};
```

---

## 8. Animasyon Standartları

- Animasyonlar: CSS keyframes veya vanilla JS ile (GSAP, anime.js, framer-motion YASAK)
- Transition süresi: 0.2s-0.3s (hızlı hissettirmeli)
- Hover efektleri: `transform: translateY(-2px)` ve `box-shadow` yeterli
- Accordion (mülakat soruları, glossary): CSS `max-height` transition

**Temel animasyonlar:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

/* Sayfa yüklenme animasyonu */
.section-enter {
  animation: fadeIn 0.4s ease forwards;
}

/* Kart hover */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.2);
  transition: all 0.2s ease;
}
```

---

## 9. Sidebar Standardı

Masaüstünde sol tarafta sticky sidebar, mobilden hamburger menü.

**Breakpoint:** `768px` altı = hamburger

```jsx
const Sidebar = ({ sections, activeId, completed }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Hamburger — sadece mobil */}
      <button
        className="hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: 'none' /* media query ile göster */ }}
      >
        ☰
      </button>

      <nav style={{
        position: 'sticky', top: '60px',
        width: '240px', flexShrink: 0,
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
        padding: '16px',
        background: '#27273a',
        borderRadius: '12px',
      }}>
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              display: 'block', padding: '8px 12px',
              borderRadius: '8px', marginBottom: '2px',
              color: activeId === s.id ? '#a78bfa' : '#6c7086',
              background: activeId === s.id ? '#7c3aed20' : 'transparent',
              fontWeight: activeId === s.id ? 600 : 400,
              textDecoration: 'none', fontSize: '14px',
              transition: 'all 0.2s',
              borderLeft: activeId === s.id ? '3px solid #7c3aed' : '3px solid transparent',
            }}
          >
            {completed.includes(s.id) ? '✅ ' : ''}{s.label}
          </a>
        ))}
      </nav>
    </>
  );
};
```

**Intersection Observer (aktif bölüm tespiti):**
```js
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveId(entry.target.id);
    });
  },
  { rootMargin: '-20% 0px -70% 0px' }
);
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
```

---

## 10. Prism.js Kurulumu

```html
<!-- CDN (head'de) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
```

React içinde kod bloğu render edildikten sonra:
```js
React.useEffect(() => {
  if (window.Prism) window.Prism.highlightAll();
}, [content]);
```

---

## 11. Renk Sistemi Özeti — Hangi Renk Nerede

| Durum | Renk | Kullanım |
|-------|------|----------|
| Ana vurgu | `#7c3aed` | Butonlar, aktif sidebar, seçili filtre |
| Başarı | `#10b981` | Quiz doğru, tamamlandı, copy success |
| Uyarı | `#f59e0b` | Intermediate badge, warning box, simple-box border |
| Hata | `#ef4444` | Advanced badge, hata mesajları, quiz yanlış |
| Bilgi | `#3b82f6` | Tip box, genel bilgilendirme |
| Arkaplan | `#1e1e2e` | Sayfa arka planı |
| Kart | `#27273a` | Sidebar, kart arka planı |
| Hover | `#313148` | Hover, seçili, aktif durum |
| Kod | `#12121f` | Kod bloğu arka planı |
