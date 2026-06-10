const fs = require('fs');
const src = fs.readFileSync('./src/data/typescriptData.js', 'utf8');

const lines = src.split('\n');
let s4Start = -1, s5Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"Advanced TypeScript"') && s4Start === -1) s4Start = i - 1;
  if (lines[i].includes('"QA Use Cases"') && s5Start === -1) s5Start = i - 1;
}
console.log(`Advanced: lines ${s4Start+1}–${s5Start+1}`);

const newAdvanced = `  {
    title: "Advanced TypeScript",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 12 — Basic Generics
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Basic Generics", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🧩", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Generic, doldurulabilir şablon gibi. 'Liste' diyorsun ama ne listesi? Sayı listesi mi, isim listesi mi? Tip parametresi ile sonradan belirtiyorsun. Java'daki List<T> ile aynı mantık.", en: "A generic is like a fill-in-the-blank template. 'A list' — but a list of what? Numbers? Names? You specify the type later with a type parameter. Same concept as Java's List<T>." } },
      { type: "text", content: { tr: "Java'da generics: ArrayList<String>, Map<String, Integer>. TypeScript'te aynı şey: Array<string>, Map<string, number>. Fonksiyon generic'leri: function identity<T>(x: T): T. Java'dan zaten tanıdık — sözdizimi biraz farklı.", en: "Java generics: ArrayList<String>, Map<String, Integer>. TypeScript is the same: Array<string>, Map<string, number>. Function generics: function identity<T>(x: T): T. Already familiar from Java — just slightly different syntax." } },
      { type: "code", language: "typescript", code: \`// TypeScript Generics — reusable code with type safety

// Generic function — like Java <T> method
function identity<T>(value: T): T {
  return value;
}
console.log(identity<string>("hello"));  // hello
console.log(identity<number>(42));       // 42
// TypeScript infers T automatically: identity("hello")

// Generic container — like Java class Box<T>
class Box<T> {
  constructor(private value: T) {}
  get(): T { return this.value; }
  toString(): string { return "Box(" + String(this.value) + ")"; }
}

const strBox = new Box<string>("TypeScript");
const numBox = new Box<number>(42);
console.log(strBox.toString());    // Box(TypeScript)
console.log(numBox.toString());    // Box(42)

// Generic with constraint — like Java <T extends Comparable<T>>
function findMax<T extends { value: number }>(items: T[]): T {
  return items.reduce((max, item) => item.value > max.value ? item : max);
}

const tests = [
  { name: "login", value: 342 },
  { name: "checkout", value: 891 },
  { name: "profile", value: 215 },
];
const slowest = findMax(tests);
console.log("Slowest:", slowest.name, slowest.value + "ms");\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Generic Result type — common QA pattern
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseJSON<T>(raw: string): Result<T> {
  try {
    const data = JSON.parse(raw) as T;
    return { success: true, data };
  } catch (e) {
    return { success: false, error: "Invalid JSON: " + String(e) };
  }
}

interface User { id: number; email: string; }

const good = parseJSON<User>('{"id": 1, "email": "alice@example.com"}');
const bad = parseJSON<User>("not json");

if (good.success) console.log("User:", good.data.email);
if (!bad.success) console.log("Error:", bad.error);\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Generics" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Generic class", java: "class Box<T> { T get() {...} }", typescript: "class Box<T> { get(): T {...} }" },
        { concept: "Generic method", java: "<T> T identity(T x)", typescript: "function identity<T>(x: T): T" },
        { concept: "Constraint", java: "<T extends Comparable<T>>", typescript: "<T extends { compareTo: (a: T) => number }>" },
        { concept: "Multiple params", java: "Map<K, V>", typescript: "Map<K, V> / function f<K, V>" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te <T extends { length: number }> ne anlama gelir?", en: "What does <T extends { length: number }> mean in TypeScript generics?" }, options: [{ id: "a", text: { tr: "T sadece number olabilir", en: "T can only be a number" } }, { id: "b", text: { tr: "T, 'length' adında number özelliği olan herhangi bir tip olabilir", en: "T can be any type that has a 'length' property of type number" } }, { id: "c", text: { tr: "T bir array olmak zorunda", en: "T must be an array" } }, { id: "d", text: { tr: "T'nin uzunluğu belirtiliyor", en: "The length of T is being specified" } }], correct: "b", explanation: { tr: "Generic constraint ile T'nin hangi özelliklere sahip olması gerektiği belirtilir. string, array, hatta { length: number } olan herhangi bir obje T olabilir. Java'daki <T extends Comparable<T>> gibi.", en: "Generic constraints specify what properties T must have. string, array, or any object with { length: number } can be T. Similar to Java's <T extends Comparable<T>>." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 13 — Utility Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Utility Types", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🔧", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Utility types, hazır tip dönüştürücüler. Bir tipin tüm alanlarını opsiyonel yap (Partial), sadece belirli alanları al (Pick), bir alanı çıkar (Omit). Java'da bunları manuel yapardın.", en: "Utility types are ready-made type transformers. Make all fields optional (Partial), pick specific fields (Pick), remove a field (Omit). In Java you'd do these manually." } },
      { type: "code", language: "typescript", code: \`// TypeScript Utility Types — powerful type transformations

interface TestCase {
  id: number;
  name: string;
  status: "PASS" | "FAIL" | "SKIP";
  duration: number;
  tags: string[];
}

// Partial — all fields optional (useful for updates)
type PartialTestCase = Partial<TestCase>;
const update: PartialTestCase = { status: "PASS" };  // only some fields

// Required — all fields required (reverse of Partial)
// Pick — select specific fields only
type TestSummary = Pick<TestCase, "id" | "name" | "status">;
const summary: TestSummary = { id: 1, name: "login", status: "PASS" };

// Omit — remove specific fields
type TestWithoutId = Omit<TestCase, "id">;

// Readonly — make all fields readonly
type ImmutableTest = Readonly<TestCase>;

// Record — create key-value map type
type TestResults = Record<string, "PASS" | "FAIL" | "SKIP">;
const results: TestResults = {
  login_test: "PASS",
  checkout_test: "FAIL",
};

// ReturnType — get return type of a function
function createUser() { return { id: 1, email: "a@b.com" }; }
type UserType = ReturnType<typeof createUser>;  // { id: number; email: string }

// Practical: build update payload type
function updateTest(id: number, changes: Partial<Omit<TestCase, "id">>): void {
  console.log("Updating test " + id + ":", JSON.stringify(changes));
}
updateTest(1, { status: "PASS", duration: 342 });\` },
      { type: "editor", lang: "typescript", defaultCode: \`interface Config {
  baseUrl: string;
  timeout: number;
  retries: number;
  apiKey: string;
  debug: boolean;
}

// Use utility types to create derived types
type PublicConfig = Omit<Config, "apiKey">;  // hide secret key
type PartialUpdate = Partial<Config>;         // all optional for PATCH
type RequiredCore = Required<Pick<Config, "baseUrl" | "timeout">>;  // subset required

const baseConfig: RequiredCore = { baseUrl: "https://api.example.com", timeout: 5000 };
const publicView: PublicConfig = { baseUrl: "https://api.example.com", timeout: 5000, retries: 3, debug: false };
const patchPayload: PartialUpdate = { timeout: 10000 };

console.log("Base:", JSON.stringify(baseConfig));
console.log("Public:", JSON.stringify(publicView));
console.log("Patch:", JSON.stringify(patchPayload));\` },
      { type: "quiz", question: { tr: "TypeScript'te Partial<T> ne yapar?", en: "What does Partial<T> do in TypeScript?" }, options: [{ id: "a", text: { tr: "T'nin tüm alanlarını siler", en: "Removes all fields from T" } }, { id: "b", text: { tr: "T'nin tüm alanlarını opsiyonel (?) yapar", en: "Makes all fields of T optional (?)" } }, { id: "c", text: { tr: "T'nin sadece kısmi alanlarını seçer", en: "Selects only some fields of T" } }, { id: "d", text: { tr: "T'yi readonly yapar", en: "Makes T readonly" } }], correct: "b", explanation: { tr: "Partial<T> tüm alanları opsiyonel yapar. PATCH endpoint'lerinde sadece değişen alanları göndermek için idealdir. Java'da bu tipi manuel olarak oluşturman gerekirdi.", en: "Partial<T> makes all fields optional. Ideal for PATCH endpoints where you only send changed fields. In Java you'd have to create this type manually." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 14 — Keyof
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Keyof", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🔑", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "keyof, bir nesnenin tüm anahtar isimlerini tip olarak alır. 'Bu fonksiyon TestCase'in herhangi bir alanı ile çağrılabilir, ama sadece gerçek alan isimleriyle' — TypeScript bunu garantiler.", en: "keyof gets all the key names of an object as a type. 'This function can be called with any field of TestCase, but only with real field names' — TypeScript guarantees this." } },
      { type: "code", language: "typescript", code: \`// keyof — get all keys of a type as a union
interface TestCase {
  id: number;
  name: string;
  status: "PASS" | "FAIL" | "SKIP";
  duration: number;
}

type TestCaseKeys = keyof TestCase;  // "id" | "name" | "status" | "duration"

// Practical use: type-safe property accessor
function getField<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const tc: TestCase = { id: 1, name: "login_test", status: "PASS", duration: 342 };
console.log(getField(tc, "name"));      // "login_test" — TypeScript knows type is string
console.log(getField(tc, "duration"));  // 342 — TypeScript knows type is number
// getField(tc, "invalid");             // ERROR: "invalid" not in keyof TestCase

// Sort array by any field — type-safe
function sortBy<T>(items: T[], key: keyof T): T[] {
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

const tests: TestCase[] = [
  { id: 3, name: "profile", status: "PASS", duration: 215 },
  { id: 1, name: "login", status: "PASS", duration: 342 },
  { id: 2, name: "checkout", status: "FAIL", duration: 891 },
];

const byName = sortBy(tests, "name");
const byDuration = sortBy(tests, "duration");
console.log(byName.map(t => t.name));      // ["checkout", "login", "profile"]
console.log(byDuration.map(t => t.name));  // ["profile", "login", "checkout"]\` },
      { type: "editor", lang: "typescript", defaultCode: \`interface User {
  id: number;
  email: string;
  role: "admin" | "user";
  active: boolean;
}

// Build a type-safe filter function using keyof
function filterBy<T>(
  items: T[],
  key: keyof T,
  value: T[keyof T]
): T[] {
  return items.filter(item => item[key] === value);
}

const users: User[] = [
  { id: 1, email: "alice@example.com", role: "admin", active: true },
  { id: 2, email: "bob@example.com", role: "user", active: true },
  { id: 3, email: "carol@example.com", role: "user", active: false },
  { id: 4, email: "dave@example.com", role: "admin", active: false },
];

const admins = filterBy(users, "role", "admin");
const activeUsers = filterBy(users, "active", true);

console.log("Admins:", admins.map(u => u.email));
console.log("Active:", activeUsers.map(u => u.email));\` },
      { type: "quiz", question: { tr: "keyof TestCase nedir? interface TestCase { id: number; name: string; }", en: "What is keyof TestCase if interface TestCase { id: number; name: string; }?" }, options: [{ id: "a", text: 'number | string' }, { id: "b", text: '"id" | "name"' }, { id: "c", text: '{ id: number; name: string }' }, { id: "d", text: 'TestCase' }], correct: "b", explanation: { tr: "keyof, nesnenin anahtar isimlerini string literal union olarak döner. TestCase için keyof = 'id' | 'name'. Java'da böyle bir built-in operatör yok — reflection ile benzer şeyler yapılır.", en: "keyof returns the key names as a string literal union. For TestCase, keyof = 'id' | 'name'. Java has no built-in equivalent — similar things are done with reflection." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 15 — Null (Null Safety)
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Null Safety", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🚫", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript null hataları derleme sırasında yakalar. Java'da NullPointerException çalışma sırasında patlardı — TypeScript bunu derlerken söyler. strictNullChecks açıksa, null/undefined kontrolü yapmadan değer kullanman engellenir.", en: "TypeScript catches null errors at compile time. Java's NullPointerException would crash at runtime — TypeScript warns you during compilation. With strictNullChecks enabled, you cannot use a value without checking for null/undefined first." } },
      { type: "code", language: "typescript", code: \`// TypeScript Null Safety with strictNullChecks
// (tsconfig.json: "strictNullChecks": true)

// Nullable types — must be explicit
let name: string | null = null;   // string OR null
let age: number | undefined;      // number or undefined (not initialized)

// Optional chaining — safe navigation (like Java ?. or Kotlin ?.))
interface User {
  id: number;
  profile?: {           // profile may not exist
    email: string;
    phone?: string;     // phone may not exist
  };
}

function getPhone(user: User): string {
  return user.profile?.phone ?? "No phone";  // ?. + ?? operator
}

const u1: User = { id: 1, profile: { email: "a@b.com", phone: "555-1234" } };
const u2: User = { id: 2 };  // no profile
console.log(getPhone(u1));   // 555-1234
console.log(getPhone(u2));   // No phone

// Nullish coalescing ?? vs || difference
const zero = 0;
console.log(zero || "default");   // "default" — 0 is falsy!
console.log(zero ?? "default");   // 0 — ?? only checks null/undefined

// Non-null assertion operator ! (use carefully)
function getLength(s: string | null): number {
  return s!.length;   // tells TypeScript: "I guarantee s is not null"
  // But if s IS null at runtime → crash! Use only when absolutely certain
}

// Safer approach: type guard
function safeLength(s: string | null | undefined): number {
  return s?.length ?? 0;
}\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Practice null-safe API response handling
interface ApiUser {
  id: number;
  name: string;
  email?: string;
  address?: {
    city: string;
    country?: string;
  };
}

function formatUser(user: ApiUser | null): string {
  if (user === null) return "No user";
  const email = user.email ?? "No email";
  const city = user.address?.city ?? "Unknown city";
  const country = user.address?.country ?? "Unknown country";
  return user.name + " | " + email + " | " + city + ", " + country;
}

const fullUser: ApiUser = {
  id: 1, name: "Alice", email: "alice@example.com",
  address: { city: "Istanbul", country: "Turkey" }
};
const partialUser: ApiUser = { id: 2, name: "Bob" };

console.log(formatUser(fullUser));
console.log(formatUser(partialUser));
console.log(formatUser(null));\` },
      { type: "quiz", question: { tr: "TypeScript'te '??' ve '||' operatörleri arasındaki fark nedir?", en: "What is the difference between '??' and '||' operators in TypeScript?" }, options: [{ id: "a", text: { tr: "Hiçbir fark yok", en: "No difference" } }, { id: "b", text: { tr: "?? sadece null/undefined'ı kontrol eder, || 0, '', false'ı da falsy sayar", en: "?? only checks for null/undefined, while || also treats 0, '', false as falsy" } }, { id: "c", text: { tr: "|| daha güvenli", en: "|| is safer" } }, { id: "d", text: { tr: "?? sadece TypeScript'te var, JS'de yok", en: "?? only exists in TypeScript, not JS" } }], correct: "b", explanation: { tr: "0 || 'default' = 'default' (0 falsy). 0 ?? 'default' = 0 (0 null/undefined değil). QA testlerinde sıfır değer kontrol ediyorsanız ?? kullanın — || sıfırı da default'a düşürür.", en: "0 || 'default' = 'default' (0 is falsy). 0 ?? 'default' = 0 (0 is not null/undefined). In QA tests checking for zero values, use ?? — || would incorrectly treat 0 as missing." } },

      // ═══════════════════════════════════════════════════════════════════════
      // Advanced: Conditional & Mapped Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Conditional & Mapped Types", difficulty: "🔴 Advanced" },
      { type: "simple-box", emoji: "🗺️", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Conditional type, 'eğer X ise A, değilse B' mantığında çalışan tip. Mapped type, bir nesnenin tüm alanlarını dönüştürür — her alanı opsiyonel yap, her alanı string yap gibi. Partial<T> aslında bir mapped type.", en: "A conditional type works like 'if X then A, else B' for types. A mapped type transforms all fields of an object — make every field optional, make every field a string. Partial<T> is actually a mapped type." } },
      { type: "code", language: "typescript", code: \`// Conditional Types — ternary for types
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;   // "yes"
type B = IsString<number>;   // "no"

// NonNullable (built-in utility — implemented as conditional type)
type NonNull<T> = T extends null | undefined ? never : T;

// Mapped Types — transform all properties
interface User { id: number; name: string; active: boolean; }

// Make all fields optional (same as Partial<T>)
type Optional<T> = { [K in keyof T]?: T[K] };

// Make all fields readonly (same as Readonly<T>)
type Immutable<T> = { readonly [K in keyof T]: T[K] };

// Make all fields strings (type transformation)
type Stringified<T> = { [K in keyof T]: string };

type StringUser = Stringified<User>;
const su: StringUser = { id: "1", name: "Alice", active: "true" };

// Practical: validation schema
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;  // null = valid
};

const userValidation: ValidationRules<User> = {
  name: (v) => v.length < 2 ? "Name too short" : null,
  id: (v) => v <= 0 ? "ID must be positive" : null,
};

function validate<T>(obj: T, rules: ValidationRules<T>): string[] {
  const errors: string[] = [];
  for (const key in rules) {
    const rule = rules[key];
    const error = rule ? rule(obj[key]) : null;
    if (error) errors.push(key + ": " + error);
  }
  return errors;
}

const u: User = { id: 1, name: "A", active: true };
console.log(validate(u, userValidation));  // ["name: Name too short"]\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Build a DeepReadonly mapped type
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: boolean;
  };
  database: {
    url: string;
    poolSize: number;
  };
}

const config: DeepReadonly<Config> = {
  server: { host: "localhost", port: 3000, ssl: true },
  database: { url: "postgres://localhost/testdb", poolSize: 5 },
};

console.log("Host:", config.server.host);
console.log("Port:", config.server.port);

// This would be a TypeScript error:
// config.server.port = 9000;  // Cannot assign to readonly\` },
      { type: "quiz", question: { tr: "TypeScript'te { [K in keyof T]?: T[K] } ne yapar?", en: "What does { [K in keyof T]?: T[K] } do in TypeScript?" }, options: [{ id: "a", text: { tr: "T'nin tüm alanlarını siler", en: "Removes all fields from T" } }, { id: "b", text: { tr: "T'nin tüm alanlarını opsiyonel yapar (Partial<T> ile aynı)", en: "Makes all fields of T optional (same as Partial<T>)" } }, { id: "c", text: { tr: "T'nin alanlarını string'e dönüştürür", en: "Converts T's fields to strings" } }, { id: "d", text: { tr: "T'yi array'e dönüştürür", en: "Converts T to an array" } }], correct: "b", explanation: { tr: "[K in keyof T] ile T'nin tüm keylerini iterate edersin. ?: her birini opsiyonel yapar. T[K] ile orijinal tipi korursun. Bu tam olarak Partial<T>'nin implementation'ı.", en: "[K in keyof T] iterates over all keys of T. ?: makes each optional. T[K] preserves the original type. This is exactly how Partial<T> is implemented." } },

      // ─── Interview Questions for Advanced ─────────────────────────────────
      { type: "interview-questions", topic: "TypeScript Advanced", questions: [
        { level: "basic", q: { tr: "TypeScript Generics neden kullanılır? Java'dan farkı nedir?", en: "Why are TypeScript Generics used? How do they differ from Java?" }, a: { tr: "Generic'ler tip-güvenli, yeniden kullanılabilir kod yazmak için. function identity<T>(x: T): T — her tip için aynı kodu kullanabilirsin. Java generic'leriyle aynı mantık. Fark: TypeScript structural typing kullanır, Java nominal typing. TypeScript'te <T extends { length: number }> ile duck typing yapılabilir.", en: "Generics write type-safe, reusable code. function identity<T>(x: T): T — same code works for every type. Same concept as Java generics. Difference: TypeScript uses structural typing, Java uses nominal typing. TypeScript allows duck typing: <T extends { length: number }>." } },
        { level: "intermediate", q: { tr: "Utility types nedir? En çok kullandığın hangisi ve neden?", en: "What are utility types? Which do you use most and why?" }, a: { tr: "Built-in tip dönüştürücüler: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. En çok: Partial<T> — PUT/PATCH API endpoint'lerinde tüm alanların opsiyonel olduğu update payload'lar için. Ve Omit<T, 'password'|'secret'> — hassas alanları response'dan çıkarmak için.", en: "Built-in type transformers: Partial<T>, Required<T>, Pick<T,K>, Omit<T,K>, Record<K,V>, Readonly<T>. Most used: Partial<T> — for update payloads in PUT/PATCH endpoints where all fields are optional. And Omit<T, 'password'|'secret'> — removing sensitive fields from API responses." } },
        { level: "advanced", q: { tr: "Conditional types ne zaman kullanılmalı?", en: "When should conditional types be used?" }, a: { tr: "Conditional types: T extends U ? X : Y — tipler üzerinde if/else gibi. Kullanım: 1) Utility types yazmak (NonNullable gibi). 2) Discriminated unions üzerinde çalışmak. 3) Function overload signatures yerine. Karmaşık olabilir — önce simpler çözüm dene. QA framework'lerinde genellikle result types için kullanılır.", en: "Conditional types: T extends U ? X : Y — if/else logic for types. Use cases: 1) Writing utility types (like NonNullable). 2) Working with discriminated unions. 3) Instead of function overload signatures. Can be complex — try simpler solutions first. In QA frameworks, often used for result types." } },
      ]},
    ],
  },

`;

const beforeSection = lines.slice(0, s4Start).join('\n');
const afterSection = lines.slice(s5Start).join('\n');
const newContent = beforeSection + '\n' + newAdvanced + afterSection;
fs.writeFileSync('./src/data/typescriptData.js', newContent);
console.log('TypeScript Advanced replaced!');
