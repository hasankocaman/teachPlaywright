const fs = require('fs');
const src = fs.readFileSync('./src/data/typescriptData.js', 'utf8');

const lines = src.split('\n');
// Find "TypeScript Foundations" section start and "Intermediate TypeScript" section start
let s2Start = -1, s3Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"TypeScript Foundations"') && s2Start === -1) s2Start = i - 1; // the '{' line before title
  if (lines[i].includes('"Intermediate TypeScript"') && s3Start === -1) s3Start = i - 1;
}
console.log(`Foundations: lines ${s2Start+1}–${s3Start+1}`);

const newFoundations = `  {
    title: "TypeScript Foundations",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 1 — Simple Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Simple Types", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "🔷", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript, JavaScript'in üzerine etiket takılmış hali. 'Bu kutu sadece sayı içerir' etiketi gibi — yanlış bir şey koymaya çalışırsan hemen uyarı alırsın. Java'da zaten böyleydi; TypeScript bunu JavaScript'e getiriyor.", en: "TypeScript is JavaScript with labels attached. Like a box labeled 'numbers only' — if you try to put the wrong thing in, you get an immediate warning. Java already had this; TypeScript brings it to JavaScript." } },
      { type: "text", content: { tr: "Java'da her değişkenin tipi açıkça belirtilir: int x = 5; String name = 'Ali'. TypeScript'te aynı şey: let x: number = 5; let name: string = 'Ali'. Fark: TypeScript genellikle tipi otomatik çıkarabilir (type inference) — her yere yazmak zorunda değilsin.", en: "Java requires explicit types: int x = 5; String name = 'Ali'. TypeScript is the same: let x: number = 5; let name: string = 'Ali'. Difference: TypeScript can usually infer the type automatically — you don't have to write it everywhere." } },
      { type: "code", language: "typescript", code: \`// TypeScript Simple Types — Java Comparison
// Java:    int age = 25;
// TypeScript: let age: number = 25;  (or just: let age = 25)

let age: number = 25;          // number (int, float, double all combined)
let name: string = "Alice";    // string
let isActive: boolean = true;  // boolean
let score: number = 98.5;      // TypeScript number = Java double

// Type inference — TypeScript deduces type from value
let city = "Istanbul";         // TypeScript knows this is string
// city = 42;                  // ERROR: Type 'number' not assignable to type 'string'

// Type annotation vs inference
let explicitNum: number = 10;  // explicit annotation
let inferredNum = 10;          // inferred as number (same result)

// any — disables type checking (avoid in production!)
let anything: any = "hello";
anything = 42;                 // no error — but you lose type safety
anything = true;

// Function with typed params and return type
function greet(name: string, times: number): string {
  return (name + " ").repeat(times).trim();
}
console.log(greet("Hi", 3));   // Hi Hi Hi
// greet(42, "three");          // ERROR: wrong types\` },
      { type: "editor", lang: "typescript", defaultCode: \`// TypeScript catches errors at compile time
function calculateTax(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}

const total = calculateTax(100, 0.18);
console.log("Total with tax:", total);

// Try: change 100 to "100" — TypeScript will show an error
// const wrongTotal = calculateTax("100", 0.18);\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Basic Types" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Integer", java: "int x = 5;", typescript: "let x: number = 5;" },
        { concept: "Float", java: "double d = 3.14;", typescript: "let d: number = 3.14;" },
        { concept: "String", java: "String s = \"hi\";", typescript: "let s: string = \"hi\";" },
        { concept: "Boolean", java: "boolean b = true;", typescript: "let b: boolean = true;" },
        { concept: "No type", java: "Object o = anything;", typescript: "let o: any = anything;" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te hem integer hem float için hangi tip kullanılır?", en: "Which TypeScript type is used for both integers and floats?" }, options: [{ id: "a", text: "int" }, { id: "b", text: "float" }, { id: "c", text: "number" }, { id: "d", text: "numeric" }], correct: "c", explanation: { tr: "TypeScript'te 'number' tipi Java'daki int, long, double, float'un hepsini kapsar. Tek bir sayısal tip var. Java'da bu ayrım önemliydi — TypeScript'te yok.", en: "TypeScript's 'number' type covers Java's int, long, double, and float. There is only one numeric type. This distinction was important in Java — not in TypeScript." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 2 — Special Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Special Types", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "⚠️", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Özel tipler, beklenmedik durumlar için. 'any' = her şey olabilir (kötü pratik), 'unknown' = bilinmiyor ama önce kontrol et, 'never' = bu kod asla çalışmaz, 'void' = fonksiyon bir şey döndürmez.", en: "Special types for unexpected situations. 'any' = can be anything (bad practice), 'unknown' = unknown but check first, 'never' = this code never runs, 'void' = function returns nothing." } },
      { type: "code", language: "typescript", code: \`// TypeScript Special Types

// void — function returns nothing (like Java void)
function logMessage(msg: string): void {
  console.log("[LOG]", msg);
  // no return value
}

// null and undefined
let nullVal: null = null;
let undVal: undefined = undefined;

// any — escapes type checking (use sparingly)
let userInput: any = document.getElementById("input");  // from DOM
userInput = 42;         // no error

// unknown — safer than any: must type-check before use
function processInput(input: unknown): string {
  if (typeof input === "string") {
    return input.toUpperCase();    // safe: we checked the type
  }
  if (typeof input === "number") {
    return input.toFixed(2);       // safe: we checked the type
  }
  return String(input);            // fallback
}
console.log(processInput("hello"));  // HELLO
console.log(processInput(42.5));     // 42.50

// never — function that never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);         // never returns normally
}

// Type guard pattern (common in QA code)
function assertDefined<T>(val: T | null | undefined, name: string): T {
  if (val == null) throwError(\\\`\\\${name} is required but was \\\${val}\\\`);
  return val;
}\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Practice unknown vs any
function parseAge(input: unknown): number {
  if (typeof input === "number") return input;
  if (typeof input === "string") {
    const parsed = parseInt(input);
    if (isNaN(parsed)) throw new Error("Invalid age: " + input);
    return parsed;
  }
  throw new Error("Cannot parse age from: " + typeof input);
}

console.log(parseAge(25));       // 25
console.log(parseAge("30"));    // 30
// console.log(parseAge(true)); // Error\` },
      { type: "quiz", question: { tr: "TypeScript'te 'unknown' ve 'any' arasındaki temel fark nedir?", en: "What is the key difference between 'unknown' and 'any' in TypeScript?" }, options: [{ id: "a", text: { tr: "Hiçbir fark yok", en: "No difference" } }, { id: "b", text: { tr: "unknown kullanmadan önce tip kontrolü zorunlu, any'de değil", en: "unknown requires a type check before use, any does not" } }, { id: "c", text: { tr: "unknown sadece string için, any hepsi için", en: "unknown is only for strings, any is for everything" } }, { id: "d", text: { tr: "any daha güvenli", en: "any is safer" } }], correct: "b", explanation: { tr: "'unknown' tip kontrolü (typeof, instanceof) yapılmadan kullanılamaz. 'any' tip güvenliğini tamamen devre dışı bırakır. Production kodunda any yerine unknown tercih edilir.", en: "'unknown' cannot be used without a type check (typeof, instanceof). 'any' completely disables type safety. In production code, prefer unknown over any." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 3 — Arrays
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Arrays", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "📚", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript array'i Java'nın typed ArrayList'i gibi. Java'da List<String> yazınca sadece String girebilirdin. TypeScript'te string[] yazarsan sadece string girebilirsin.", en: "TypeScript arrays are like Java's typed ArrayList. In Java, List<String> only accepts Strings. In TypeScript, string[] only accepts strings." } },
      { type: "code", language: "typescript", code: \`// TypeScript Arrays — two syntax options (both work)
// Java: List<String> names = new ArrayList<>();
// TypeScript:
let names: string[] = ["Alice", "Bob", "Carol"];    // preferred syntax
let scores: Array<number> = [95, 87, 72, 98];       // generic syntax

// Typed array operations
names.push("Dave");           // OK: string
// names.push(42);            // ERROR: number not assignable to string

// Array of objects (common in QA test data)
interface TestCase {
  id: number;
  name: string;
  passed: boolean;
}

const testCases: TestCase[] = [
  { id: 1, name: "login_test", passed: true },
  { id: 2, name: "checkout_test", passed: false },
  { id: 3, name: "profile_test", passed: true },
];

// Filter, map, reduce — same as Java Stream API
const failedTests = testCases.filter(t => !t.passed);
const testNames = testCases.map(t => t.name);
const passCount = testCases.reduce((acc, t) => acc + (t.passed ? 1 : 0), 0);

console.log("Failed:", failedTests.length);    // 1
console.log("Names:", testNames);
console.log("Pass count:", passCount);          // 2

// readonly array — like Java unmodifiableList
const fixedList: readonly string[] = ["a", "b", "c"];
// fixedList.push("d");        // ERROR: readonly\` },
      { type: "editor", lang: "typescript", defaultCode: \`interface ApiEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  requiresAuth: boolean;
}

const endpoints: ApiEndpoint[] = [
  { path: "/api/login", method: "POST", requiresAuth: false },
  { path: "/api/users", method: "GET", requiresAuth: true },
  { path: "/api/users/1", method: "DELETE", requiresAuth: true },
];

const publicEndpoints = endpoints.filter(e => !e.requiresAuth);
const paths = endpoints.map(e => \\\`\\\${e.method} \\\${e.path}\\\`);

console.log("Public endpoints:", publicEndpoints.length);
paths.forEach(p => console.log(p));\` },
      { type: "quiz", question: { tr: "TypeScript'te string array nasıl tanımlanır?", en: "How do you declare a string array in TypeScript?" }, options: [{ id: "a", text: "let arr: Array<String>" }, { id: "b", text: "let arr: string[]" }, { id: "c", text: "let arr = String[]" }, { id: "d", text: "let arr: [string]" }], correct: "b", explanation: { tr: "string[] tercih edilen syntax'tır. Array<string> da çalışır. [string] ise tuple sözdizimi — tek elemanlı string tuple'ı tanımlar.", en: "string[] is the preferred syntax. Array<string> also works. [string] is tuple syntax — it defines a single-element string tuple." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 4 — Tuples
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Tuples", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "🎁", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Tuple, sabit boyutlu ve her pozisyonun tipi bilinen bir dizi. 'İlk eleman her zaman isim (string), ikincisi yaş (number)' gibi. Java'da tam karşılığı yok — ama Python'da tuple var ve aynı mantık.", en: "A tuple is a fixed-size array where each position has a known type. 'First element is always name (string), second is age (number).' Java has no direct equivalent — but Python has tuples with the same idea." } },
      { type: "code", language: "typescript", code: \`// TypeScript Tuples — fixed-length, typed by position
// Java has no direct equivalent (use a simple class instead)
// Python: (name, age) = ("Alice", 25)

// Basic tuple
let person: [string, number] = ["Alice", 25];
let [name, age] = person;               // destructuring
console.log(name, age);                 // Alice 25

// Tuple types prevent index errors
// person[0] = 42;                      // ERROR: number not assignable to string
// person[2] = "extra";                 // ERROR: index 2 out of bounds

// Named tuple elements (TypeScript 4.0+)
type TestResult = [testName: string, passed: boolean, durationMs: number];

const result: TestResult = ["login_test", true, 342];
console.log(result[0], result[1], result[2]);  // login_test true 342

// Tuple array — array of fixed-structure pairs
type KeyValue = [string, string];
const headers: KeyValue[] = [
  ["Content-Type", "application/json"],
  ["Authorization", "Bearer token123"],
  ["Accept", "application/json"],
];

headers.forEach(([key, value]) => {
  console.log(\\\`\\\${key}: \\\${value}\\\`);
});

// Optional tuple element
type Point3D = [x: number, y: number, z?: number];
const p2d: Point3D = [10, 20];          // z is optional
const p3d: Point3D = [10, 20, 30];\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Use tuples to represent test step results
type StepResult = [stepName: string, passed: boolean, ms: number];

function runStep(name: string, shouldPass: boolean): StepResult {
  const ms = Math.floor(Math.random() * 500) + 50;
  return [name, shouldPass, ms];
}

const steps: StepResult[] = [
  runStep("Navigate to login", true),
  runStep("Enter credentials", true),
  runStep("Click submit", true),
  runStep("Assert dashboard", false),  // simulated failure
];

const failed = steps.filter(([, passed]) => !passed);
console.log("Total steps:", steps.length);
console.log("Failed steps:", failed.length);
steps.forEach(([name, passed, ms]) => {
  console.log(\\\`  \\\${passed ? "✓" : "✗"} \\\${name} (\\\${ms}ms)\\\`);
});\` },
      { type: "quiz", question: { tr: "let t: [string, number] = [42, 'hello'] neden hata verir?", en: "Why does let t: [string, number] = [42, 'hello'] cause an error?" }, options: [{ id: "a", text: { tr: "Tuple boş olmalı", en: "Tuple must be empty" } }, { id: "b", text: { tr: "Eleman sayısı hatalı", en: "Wrong number of elements" } }, { id: "c", text: { tr: "Tip sıralaması yanlış: ilk eleman string, ikinci number olmalı", en: "Type order is wrong: first must be string, second must be number" } }, { id: "d", text: { tr: "Tuple readonly olmalı", en: "Tuple must be readonly" } }], correct: "c", explanation: { tr: "[string, number] tuple'ında 0. pozisyon string, 1. pozisyon number olmalı. 42 number'dır, string değil. TypeScript her pozisyonun tipini kontrol eder.", en: "In [string, number] tuple, position 0 must be string, position 1 must be number. 42 is a number, not a string. TypeScript checks the type of each position." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 5 — Object Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Object Types", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "📋", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Object type, bir nesnenin içinde ne olması gerektiğini söyleyen sözleşme. 'Test sonucu için mutlaka ad, durum ve süre lazım' gibi. Java'da interface veya class ile yapılır.", en: "Object type is a contract saying what must be inside an object. 'A test result must have a name, status, and duration.' In Java, this is done with an interface or class." } },
      { type: "code", language: "typescript", code: \`// TypeScript Object Types

// Inline object type annotation
function printTest(test: { name: string; passed: boolean; duration: number }): void {
  const icon = test.passed ? "✓" : "✗";
  console.log(\\\`\\\${icon} \\\${test.name} (\\\${test.duration}ms)\\\`);
}

printTest({ name: "login_test", passed: true, duration: 342 });

// Optional properties (Java: nullable fields)
type Config = {
  baseUrl: string;
  timeout?: number;         // optional — may be undefined
  retries?: number;
};

const cfg: Config = { baseUrl: "https://api.example.com" };
const cfgWithTimeout: Config = { baseUrl: "https://api.example.com", timeout: 5000 };

// Readonly properties
type ImmutableUser = {
  readonly id: number;      // like final in Java
  readonly email: string;
  role: string;             // mutable
};

const user: ImmutableUser = { id: 1, email: "alice@example.com", role: "admin" };
user.role = "user";         // OK: mutable
// user.id = 2;             // ERROR: Cannot assign to readonly property

// Index signatures — object with dynamic keys
type TestSuiteResults = {
  [testName: string]: "PASS" | "FAIL" | "SKIP";
};

const results: TestSuiteResults = {
  login_test: "PASS",
  checkout_test: "FAIL",
  profile_test: "SKIP",
};
console.log(results["login_test"]);  // PASS\` },
      { type: "editor", lang: "typescript", defaultCode: \`type ApiRequest = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  body?: unknown;
};

function describeRequest(req: ApiRequest): string {
  const hasBody = req.body !== undefined ? " with body" : "";
  const headerCount = req.headers ? Object.keys(req.headers).length : 0;
  return \\\`\\\${req.method} \\\${req.url}\\\${hasBody} (\\\${headerCount} headers)\\\`;
}

const loginReq: ApiRequest = {
  url: "/api/login",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: { email: "test@example.com", password: "secret" },
};

const listReq: ApiRequest = {
  url: "/api/users",
  method: "GET",
};

console.log(describeRequest(loginReq));
console.log(describeRequest(listReq));\` },
      { type: "quiz", question: { tr: "TypeScript object type'ta '?' ile işaretlenmiş property ne anlama gelir?", en: "What does a '?' after a property name mean in a TypeScript object type?" }, options: [{ id: "a", text: { tr: "readonly", en: "readonly" } }, { id: "b", text: { tr: "Opsiyonel — tanımsız olabilir", en: "Optional — may be undefined" } }, { id: "c", text: { tr: "Null olamaz", en: "Cannot be null" } }, { id: "d", text: { tr: "Zorunlu alan", en: "Required field" } }], correct: "b", explanation: { tr: "'?' property'yi opsiyonel yapar — değer olmayabilir (undefined). Java'da @Nullable annotation'ına benzer. timeout?: number yazınca timeout veya undefined olabilir.", en: "'?' makes a property optional — the value may not be present (undefined). Similar to Java's @Nullable annotation. timeout?: number means it can be a number or undefined." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 6 — Enums
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Enums", difficulty: "🟢 Beginner" },
      { type: "simple-box", emoji: "🎯", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Enum, izin verilen değerlerin sabit listesi. 'Test durumu sadece PASS, FAIL veya SKIP olabilir — başka bir şey yazarsan hata alırsın.' Java'da enum zaten vardı — TypeScript'te de aynı mantık.", en: "An enum is a fixed list of allowed values. 'Test status can only be PASS, FAIL, or SKIP — write anything else and you get an error.' Java already had enums — TypeScript works the same way." } },
      { type: "text", content: { tr: "Java'da enum çok güçlü — method'u, field'ı olabilir. TypeScript'te numeric enum (0,1,2) ve string enum var. QA'de string enum tercih edilir çünkü debug edilmesi kolay: TestStatus.PASS = 'PASS' string değeri taşır.", en: "Java enums are powerful — they can have methods and fields. TypeScript has numeric enums (0,1,2) and string enums. In QA, string enums are preferred because they are easy to debug: TestStatus.PASS carries the string value 'PASS'." } },
      { type: "code", language: "typescript", code: \`// TypeScript Enums — QA Test Status Example

// String enum (preferred in QA — readable in logs)
enum TestStatus {
  PASS = "PASS",      // value = string literal
  FAIL = "FAIL",
  SKIP = "SKIP",
  PENDING = "PENDING"
}

// Numeric enum (auto-increments from 0)
enum Priority {
  LOW,      // = 0
  MEDIUM,   // = 1
  HIGH,     // = 2
  CRITICAL  // = 3
}

interface TestCase {
  name: string;
  status: TestStatus;
  priority: Priority;
}

const tc: TestCase = {
  name: "login_test",
  status: TestStatus.PASS,   // type-safe: only PASS/FAIL/SKIP/PENDING allowed
  priority: Priority.HIGH,
};

console.log(tc.status);                 // PASS (string enum)
console.log(tc.priority);               // 2   (numeric enum)
console.log(Priority[2]);               // HIGH (reverse lookup works for numeric)

// Use in switch
function getStatusIcon(status: TestStatus): string {
  switch (status) {
    case TestStatus.PASS:    return "✅";
    case TestStatus.FAIL:    return "❌";
    case TestStatus.SKIP:    return "⏭️";
    case TestStatus.PENDING: return "⏳";
  }
}

console.log(getStatusIcon(TestStatus.FAIL));  // ❌\` },
      { type: "editor", lang: "typescript", defaultCode: \`enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

interface ApiCall {
  method: HttpMethod;
  endpoint: string;
  expectedStatus: StatusCode;
}

const apiTests: ApiCall[] = [
  { method: HttpMethod.GET, endpoint: "/api/users", expectedStatus: StatusCode.OK },
  { method: HttpMethod.POST, endpoint: "/api/users", expectedStatus: StatusCode.CREATED },
  { method: HttpMethod.DELETE, endpoint: "/api/users/1", expectedStatus: StatusCode.OK },
];

apiTests.forEach(t => {
  console.log(\\\`\\\${t.method} \\\${t.endpoint} → expected \\\${t.expectedStatus}\\\`);
});\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Enums" }, columns: ["Java", "TypeScript"], rows: [
        { concept: { tr: "Temel enum", en: "Basic enum" }, java: "enum Status { PASS, FAIL }", typescript: "enum Status { PASS = 'PASS', FAIL = 'FAIL' }" },
        { concept: { tr: "Metod", en: "Methods" }, java: "Can have methods/fields", typescript: "No methods (use namespace for that)" },
        { concept: { tr: "Kullanım", en: "Usage" }, java: "Status.PASS", typescript: "Status.PASS" },
        { concept: { tr: "Switch", en: "Switch" }, java: "switch(s) { case PASS: }", typescript: "switch(s) { case Status.PASS: }" },
      ]},
      { type: "quiz", question: { tr: "QA testlerinde string enum neden numeric enum'a tercih edilir?", en: "Why are string enums preferred over numeric enums in QA tests?" }, options: [{ id: "a", text: { tr: "Daha hızlı", en: "They are faster" } }, { id: "b", text: { tr: "Log ve debug'da değer okunabilir (PASS görürsün, 0 değil)", en: "Values are readable in logs and debug (you see PASS, not 0)" } }, { id: "c", text: { tr: "Daha az bellek kullanır", en: "They use less memory" } }, { id: "d", text: { tr: "Zorunlu — TypeScript'te numeric enum yok", en: "Required — TypeScript has no numeric enums" } }], correct: "b", explanation: { tr: "String enum'da TestStatus.PASS = 'PASS' — log dosyasında 'PASS' görürsün. Numeric enum'da TestStatus.PASS = 0 — log'da 0 görürsün, anlamak zor. QA araçlarında okunabilirlik önemli.", en: "With string enum, TestStatus.PASS = 'PASS' — you see 'PASS' in logs. With numeric enum, TestStatus.PASS = 0 — you see 0 in logs, hard to understand. Readability matters in QA tools." } },

      // ─── Interview Questions for Foundations ──────────────────────────────
      { type: "interview-questions", topic: "TypeScript Foundations", questions: [
        { level: "basic", q: { tr: "TypeScript neden JavaScript'e üstündür? Ne zaman tercih edilir?", en: "Why is TypeScript better than JavaScript? When should you prefer it?" }, a: { tr: "TypeScript compile-time type checking sağlar — hatalar çalıştırmadan önce yakalanır. Büyük ekiplerde, uzun vadeli projelerde, framework geliştirmede tercih edilir. Playwright ve Angular TypeScript ile yazılmıştır. Küçük scriptler için overkill olabilir.", en: "TypeScript provides compile-time type checking — bugs are caught before running. Preferred for large teams, long-term projects, framework development. Playwright and Angular are written in TypeScript. May be overkill for small scripts." } },
        { level: "basic", q: { tr: "TypeScript'te 'any' tipini neden kaçınmalısın?", en: "Why should you avoid the 'any' type in TypeScript?" }, a: { tr: "'any' tipin tüm type checking'i devre dışı bırakır — TypeScript'i JavaScript gibi yapar. 'any' değişkeni her metodu çağırabilir, hiçbiri kontrol edilmez. Bunun yerine 'unknown' kullan: önce typeof kontrolü yapman gerekir. Codebase'de any'nin yayılması tip güvenliğini tamamen mahveder.", en: "'any' disables all type checking — makes TypeScript behave like JavaScript. An 'any' variable can call any method with no checks. Use 'unknown' instead: it requires a typeof check first. Spreading 'any' through a codebase completely destroys type safety." } },
        { level: "intermediate", q: { tr: "TypeScript'te tuple ne zaman kullanılmalı?", en: "When should you use a tuple in TypeScript?" }, a: { tr: "Sabit sayıda eleman ve her pozisyonun tipi farklı olduğunda. Örneğin: [string, number, boolean] — name, age, active gibi. Genellikle fonksiyon dönüş değerleri için kullanılır: function useState<T>(init: T): [T, (v: T) => void]. Nesne daha okunabilirse, tuple yerine obje tercih et.", en: "When you have a fixed number of elements and each position has a different type. Example: [string, number, boolean] — like name, age, active. Often used for function return values: function useState<T>(init: T): [T, (v: T) => void]. If an object would be more readable, prefer that over a tuple." } },
      ]},
    ],
  },

`;

const beforeSection = lines.slice(0, s2Start).join('\n');
const afterSection = lines.slice(s3Start).join('\n');
const newContent = beforeSection + '\n' + newFoundations + afterSection;
fs.writeFileSync('./src/data/typescriptData.js', newContent);
console.log('TypeScript Foundations replaced successfully!');
