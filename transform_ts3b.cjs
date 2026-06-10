// Rewrites Intermediate TypeScript section with proper template literal escaping
// In CJS script, TypeScript template literals need: \\\` and \\\${
const fs = require('fs');
const src = fs.readFileSync('./src/data/typescriptData.js', 'utf8');

const lines = src.split('\n');
let s3Start = -1, s4Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"Intermediate TypeScript"') && s3Start === -1) s3Start = i - 1;
  if (lines[i].includes('"Advanced TypeScript"') && s4Start === -1) s4Start = i - 1;
}
console.log(`Intermediate: lines ${s3Start+1}–${s4Start+1}`);

// Helper: for TypeScript code inside defaultCode/code template literals,
// all template literals in TS code need to be written as:
//   \\\` ... \\\` (produces \` ... \` in the JS data file)
//   \\\${ ... } (produces \${ ... } in the JS data file)
// This ensures the template literal content is not broken when stored in a JS template literal

const newIntermediate = `  {
    title: "Intermediate TypeScript",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 7 — Aliases & Interfaces
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Aliases & Interfaces", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "📝", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Type alias, bir tip için kısayol isim. Interface, nesnelerin nasıl görünmesi gerektiğini tanımlayan sözleşme. İkisi de benzer görünür ama interface genişletilebilir — büyük projelerde interface tercih edilir.", en: "A type alias is a shortcut name for a type. An interface is a contract defining what an object must look like. Both look similar but interfaces are extendable — preferred in large projects." } },
      { type: "text", content: { tr: "Java'da interface çok önemli — OOP'un temeli. TypeScript'te interface benzer görevi görür ama daha basit. Type alias ise Java'daki typedef gibi. Temel kural: obje şekli için interface, union/intersection için type alias kullan.", en: "Java interfaces are central to OOP. TypeScript interfaces serve a similar role. Type aliases are like typedef in Java. General rule: use interface for object shapes, type alias for unions/intersections." } },
      { type: "code", language: "typescript", code: \`// Type Alias — creates a new name for any type
type UserId = number;
type Status = "PASS" | "FAIL" | "SKIP";
type Callback = (msg: string) => void;

// Interface — defines object shape (like Java interface)
interface TestResult {
  testId: number;
  name: string;
  status: Status;
  duration: number;
}

// Interface extends — like Java extends
interface ExtendedResult extends TestResult {
  browserName: string;
  screenshots: string[];
}

const result: ExtendedResult = {
  testId: 1,
  name: "login_test",
  status: "PASS",
  duration: 342,
  browserName: "chrome",
  screenshots: ["step1.png", "step2.png"],
};
console.log(result.name, result.status, result.browserName);\` },
      { type: "editor", lang: "typescript", defaultCode: \`interface ApiTest {
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  expectedStatus: number;
  auth?: boolean;
}

interface ApiTestResult extends ApiTest {
  actualStatus: number;
  passed: boolean;
  responseTimeMs: number;
}

const tests: ApiTest[] = [
  { name: "Get users", method: "GET", endpoint: "/api/users", expectedStatus: 200, auth: true },
  { name: "Login", method: "POST", endpoint: "/api/login", expectedStatus: 200 },
];

const results: ApiTestResult[] = tests.map(t => ({
  ...t,
  actualStatus: t.expectedStatus,
  passed: true,
  responseTimeMs: Math.floor(Math.random() * 500),
}));

results.forEach(r => console.log(
  (r.passed ? "PASS" : "FAIL") + " " + r.name + " (" + r.responseTimeMs + "ms)"
));\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Interfaces" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Define interface", java: "interface IUser { String email; }", typescript: "interface User { email: string; }" },
        { concept: "Implement", java: "class A implements IUser", typescript: "const a: User = { email: '...' }" },
        { concept: "Extend", java: "interface B extends A", typescript: "interface B extends A" },
        { concept: "Optional field", java: "@Nullable String field;", typescript: "field?: string;" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te interface ve type alias arasındaki önemli fark nedir?", en: "What is an important difference between interface and type alias in TypeScript?" }, options: [{ id: "a", text: { tr: "Interface sadece class için kullanılır", en: "Interface can only be used with classes" } }, { id: "b", text: { tr: "Interface extends edilebilir ve declaration merging destekler", en: "Interface supports extends and declaration merging; type alias cannot be reopened" } }, { id: "c", text: { tr: "Type alias daha hızlıdır", en: "Type aliases are faster" } }, { id: "d", text: { tr: "Hiçbir fark yok", en: "No difference" } }], correct: "b", explanation: { tr: "Interface 'declaration merging' destekler — aynı isimle iki interface tanımlarsan birleşirler. Type alias desteklemez. Bu nedenle kütüphane tiplerini genişletmek için interface tercih edilir.", en: "Interfaces support declaration merging — if you declare the same interface name twice, they merge. Type aliases cannot be reopened. This is why interfaces are preferred for extending library types." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 8 — Union Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Union Types", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🔀", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Union type, 'bu ya şu ya bu' demek. ID ya number ya string olabilir. Java'da bunu generic ya da overload ile yapardın — TypeScript daha zarif.", en: "A union type means 'this OR that.' An ID can be either a number or a string. In Java you'd use generics or overloads — TypeScript is more elegant." } },
      { type: "code", language: "typescript", code: \`// Union Types — value can be one of multiple types
type TestStatus = "PASS" | "FAIL" | "SKIP";     // literal union

function formatId(id: string | number): string {
  if (typeof id === "number") {           // type narrowing
    return "TC-" + id.toString().padStart(4, "0");
  }
  return id.startsWith("TC-") ? id : "TC-" + id;
}
console.log(formatId(42));          // TC-0042
console.log(formatId("LOGIN-001")); // TC-LOGIN-001

// Discriminated union — best pattern for modeling variants
type ApiResponse =
  | { status: "success"; data: unknown; statusCode: 200 }
  | { status: "error"; message: string; statusCode: 400 | 401 | 404 | 500 };

function handleResponse(res: ApiResponse): void {
  if (res.status === "success") {
    console.log("Data:", res.data);
  } else {
    console.error("Error " + res.statusCode + ": " + res.message);
  }
}

handleResponse({ status: "success", data: { users: 5 }, statusCode: 200 });
handleResponse({ status: "error", message: "Not found", statusCode: 404 });\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Model test events with discriminated union
type TestEvent =
  | { type: "start"; testName: string; timestamp: number }
  | { type: "pass"; testName: string; durationMs: number }
  | { type: "fail"; testName: string; errorMessage: string; durationMs: number }
  | { type: "skip"; testName: string; reason: string };

function logEvent(event: TestEvent): void {
  switch (event.type) {
    case "start":
      console.log("Starting: " + event.testName);
      break;
    case "pass":
      console.log("PASS: " + event.testName + " (" + event.durationMs + "ms)");
      break;
    case "fail":
      console.log("FAIL: " + event.testName + " — " + event.errorMessage);
      break;
    case "skip":
      console.log("SKIP: " + event.testName + " — " + event.reason);
      break;
  }
}

const events: TestEvent[] = [
  { type: "start", testName: "login_test", timestamp: Date.now() },
  { type: "pass", testName: "login_test", durationMs: 342 },
  { type: "fail", testName: "checkout_test", errorMessage: "Timeout", durationMs: 5000 },
  { type: "skip", testName: "payment_test", reason: "Feature not ready" },
];
events.forEach(logEvent);\` },
      { type: "quiz", question: { tr: "TypeScript'te 'type narrowing' ne anlama gelir?", en: "What does 'type narrowing' mean in TypeScript?" }, options: [{ id: "a", text: { tr: "Tipi daraltmak (kötü)", en: "Making the type smaller (bad thing)" } }, { id: "b", text: { tr: "typeof/instanceof kontrolleri sonrası TypeScript'in daha spesifik tip bilmesi", en: "TypeScript knowing a more specific type after typeof/instanceof checks" } }, { id: "c", text: { tr: "Tipi any'ye çevirmek", en: "Converting to any type" } }, { id: "d", text: { tr: "Union'dan bir tip kaldırmak", en: "Removing a type from a union" } }], correct: "b", explanation: { tr: "Type narrowing: typeof kontrolü sonrası TypeScript değişkenin tipini bilir. if (typeof x === 'number') içinde TypeScript x'in number olduğunu garanti eder.", en: "Type narrowing: after a typeof check, TypeScript knows the variable's specific type. Inside if (typeof x === 'number'), TypeScript guarantees x is a number." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 9 — Functions
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Functions", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "⚙️", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript fonksiyonları Java metodlarına çok benzer — ama daha kısa syntax. Parametre tipleri ve dönüş tipi belirtilir.", en: "TypeScript functions are very similar to Java methods — but with shorter syntax. Parameter types and return types are specified." } },
      { type: "code", language: "typescript", code: \`// TypeScript Functions — all key patterns
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function createTestUser(
  email: string,
  role: "admin" | "user" = "user",    // default value
  active?: boolean                      // optional
): { email: string; role: string; active: boolean } {
  return { email, role, active: active ?? true };
}

console.log(JSON.stringify(createTestUser("alice@example.com")));
console.log(JSON.stringify(createTestUser("admin@example.com", "admin")));

// Rest parameters (like Java varargs)
function joinLogs(...messages: string[]): string {
  return messages.join(" | ");
}
console.log(joinLogs("PASS", "login", "342ms"));

// Function type
type Validator = (value: string) => boolean;

const isEmail: Validator = (v) => v.includes("@") && v.includes(".");
const isPhone: Validator = (v) => /^[0-9]{10,11}$/.test(v);

console.log(isEmail("test@example.com"));  // true
console.log(isPhone("05551234567"));       // true\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Generic assertion helper with typed parameters
function assertEqual<T>(actual: T, expected: T, message?: string): void {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  const label = message ?? "assertEqual";
  const icon = passed ? "PASS" : "FAIL";
  console.log(icon + ": " + label);
  if (!passed) {
    console.log("  Expected: " + JSON.stringify(expected));
    console.log("  Actual:   " + JSON.stringify(actual));
  }
}

assertEqual(2 + 2, 4, "2+2=4");
assertEqual("hello".toUpperCase(), "HELLO", "toUpperCase");
assertEqual([1, 2, 3].length, 3, "array length");
assertEqual("test".includes("es"), false, "includes check"); // fails\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Functions" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Basic function", java: "public int add(int a, int b)", typescript: "function add(a: number, b: number): number" },
        { concept: "Arrow/lambda", java: "(a, b) -> a + b", typescript: "(a, b) => a + b" },
        { concept: "Default param", java: "Not supported (use overload)", typescript: "function f(x: number = 0)" },
        { concept: "Varargs", java: "void f(String... msgs)", typescript: "function f(...msgs: string[])" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te parametre sonundaki '?' ne anlama gelir?", en: "What does '?' at the end of a parameter name mean in TypeScript?" }, options: [{ id: "a", text: { tr: "Parametre nullable", en: "Parameter is nullable" } }, { id: "b", text: { tr: "Parametre opsiyonel — undefined olabilir, geçilmeyebilir", en: "Parameter is optional — can be undefined, can be omitted" } }, { id: "c", text: { tr: "Parametre bir string", en: "Parameter is a string" } }, { id: "d", text: { tr: "Return type optional", en: "Return type is optional" } }], correct: "b", explanation: { tr: "function f(x?: number) yazınca x hem number hem undefined olabilir ve çağırırken geçilmeyebilir. f() ve f(42) ikisi de geçerli.", en: "function f(x?: number) means x can be number or undefined, and can be omitted. f() and f(42) are both valid." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 10 — Casting
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Casting", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🔄", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Casting, TypeScript'e 'Biliyorum bu any tipinde görünüyor ama aslında string — güven bana' demek. 'as' keyword'ü kullanılır. Java'daki (String) obj gibi.", en: "Casting tells TypeScript 'I know this looks like any but it is actually a string — trust me.' Uses the 'as' keyword. Like (String) obj in Java." } },
      { type: "code", language: "typescript", code: \`// TypeScript Casting (Type Assertions)
// as keyword — tells TypeScript what type to treat a value as
// NOTE: no actual runtime conversion — purely compile-time hint

interface User {
  id: number;
  email: string;
  role: string;
}

// Casting from unknown (common with API responses)
function toUser(raw: unknown): User | null {
  if (
    typeof raw === "object" && raw !== null &&
    "id" in raw && "email" in raw && "role" in raw
  ) {
    return raw as User;      // safe: we checked the shape
  }
  return null;
}

const apiData: unknown = { id: 1, email: "alice@example.com", role: "admin" };
const user = toUser(apiData);
if (user) {
  console.log("User:", user.email, user.role);
}

// DOM casting (when working in browsers)
// const input = document.getElementById("username") as HTMLInputElement;
// input.value  — works because TypeScript now knows it's HTMLInputElement

// Danger: double casting bypasses safety (avoid!)
const a: string = "hello";
const b = a as unknown as number;  // compiles, but bad practice
console.log(typeof b);             // "string" — cast did NOT convert!\` },
      { type: "editor", lang: "typescript", defaultCode: \`interface Config {
  baseUrl: string;
  timeout: number;
  retries: number;
}

function parseConfig(raw: unknown): Config {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Config must be an object");
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj.baseUrl !== "string") throw new Error("baseUrl must be string");
  if (typeof obj.timeout !== "number") throw new Error("timeout must be number");
  if (typeof obj.retries !== "number") throw new Error("retries must be number");
  return obj as unknown as Config;
}

const valid = { baseUrl: "https://api.example.com", timeout: 5000, retries: 3 };
const parsed = parseConfig(valid);
console.log("Config: " + parsed.baseUrl + ", timeout: " + parsed.timeout);\` },
      { type: "quiz", question: { tr: "TypeScript'te 'as' keyword'ü ne yapar?", en: "What does the 'as' keyword do in TypeScript?" }, options: [{ id: "a", text: { tr: "Değeri gerçekten dönüştürür", en: "Actually converts the value" } }, { id: "b", text: { tr: "TypeScript'e tip hakkında bilgi verir — runtime'da etkisi yok", en: "Tells TypeScript about the type — no effect at runtime" } }, { id: "c", text: { tr: "Null kontrolü yapar", en: "Performs a null check" } }, { id: "d", text: { tr: "Değeri clone'lar", en: "Clones the value" } }], correct: "b", explanation: { tr: "'as' compile-time'da TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java'daki (String) obj gerçekten cast eder. TypeScript'te 'as' yanlış tipte kullanılsa bile runtime'da ClassCastException atmaz.", en: "'as' tells TypeScript the type at compile-time — nothing happens at runtime. Java's (String) obj actually converts. TypeScript 'as' with a wrong type causes wrong behavior at runtime, not an explicit crash." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 11 — Classes
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Classes", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🏗️", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript class'ları Java class'larına çok benzer ama daha kısa syntax. Java'da field tanımla, constructor'da this.field = value yaz. TypeScript'te constructor parametresine 'public' yaz — ikisi birden yapılır.", en: "TypeScript classes are very similar to Java classes but with shorter syntax. In Java, declare field, then write this.field = value. In TypeScript, add 'public' to constructor parameters — it does both at once." } },
      { type: "code", language: "typescript", code: \`// TypeScript Classes — constructor shorthand
class User {
  constructor(
    public readonly id: number,       // public + readonly in one line!
    public email: string,
    private role: string = "user",    // private with default
  ) {}

  getRole(): string { return this.role; }

  toString(): string {
    return "User(" + this.id + ": " + this.email + ", " + this.role + ")";
  }
}

// Inheritance
class AdminUser extends User {
  constructor(id: number, email: string, private permissions: string[]) {
    super(id, email, "admin");
  }

  hasPermission(perm: string): boolean {
    return this.permissions.includes(perm);
  }
}

const u = new User(1, "alice@example.com");
const admin = new AdminUser(2, "admin@example.com", ["delete", "manage"]);

console.log(u.toString());
console.log(admin.toString());
console.log(admin.hasPermission("delete"));   // true

// Abstract class
abstract class BaseTest {
  abstract run(): void;
  log(msg: string): void { console.log("[TEST] " + msg); }
}

class LoginTest extends BaseTest {
  run(): void { this.log("Running login test"); }
}
new LoginTest().run();\` },
      { type: "editor", lang: "typescript", defaultCode: \`class TestSuite {
  private tests: Array<{ name: string; fn: () => boolean }> = [];

  constructor(public readonly name: string) {}

  addTest(name: string, fn: () => boolean): this {
    this.tests.push({ name, fn });
    return this;
  }

  run(): { passed: number; failed: number; total: number } {
    let passed = 0, failed = 0;
    for (const test of this.tests) {
      const ok = test.fn();
      console.log("  " + (ok ? "PASS" : "FAIL") + " " + test.name);
      if (ok) passed++; else failed++;
    }
    return { passed, failed, total: this.tests.length };
  }
}

const suite = new TestSuite("Math Tests")
  .addTest("2+2=4", () => 2 + 2 === 4)
  .addTest("5>3", () => 5 > 3)
  .addTest("string check", () => typeof "hello" === "string")
  .addTest("intentional fail", () => 1 === 2);

console.log("Suite: " + suite.name);
const res = suite.run();
console.log("Result: " + res.passed + "/" + res.total + " passed");\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Classes" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Field + constructor", java: "String x; MyClass(String x) { this.x = x; }", typescript: "constructor(public x: string) {} (one line!)" },
        { concept: "Access modifiers", java: "public, protected, private, default", typescript: "public, protected, private" },
        { concept: "Readonly", java: "final String x;", typescript: "readonly x: string;" },
        { concept: "Abstract", java: "abstract class A { abstract void run(); }", typescript: "abstract class A { abstract run(): void; }" },
      ]},
      { type: "quiz", question: { tr: "TypeScript constructor parametresinde 'public' yazmanın avantajı nedir?", en: "What is the advantage of writing 'public' in a TypeScript constructor parameter?" }, options: [{ id: "a", text: { tr: "Hiç avantajı yok", en: "No advantage" } }, { id: "b", text: { tr: "Field tanımlama ve atamayı tek satırda yapar", en: "Defines and assigns the field in one line (Java's 2 steps become 1)" } }, { id: "c", text: { tr: "Performansı artırır", en: "Improves performance" } }, { id: "d", text: { tr: "Sadece string için çalışır", en: "Only works for strings" } }], correct: "b", explanation: { tr: "Java'da: 'String email; MyClass(String email) { this.email = email; }' — 2 adım. TypeScript'te: 'constructor(public email: string)' — 1 adım. Constructor shorthand field tanımlamayı ve atamayı aynı anda yapar.", en: "In Java: field declaration + constructor assignment = 2 steps. In TypeScript: 'constructor(public email: string)' = 1 step. Constructor shorthand defines and assigns simultaneously." } },

      // ─── Interview Questions ──────────────────────────────────────────────
      { type: "interview-questions", topic: "TypeScript Intermediate", questions: [
        { level: "basic", q: { tr: "TypeScript'te interface ve type alias ne zaman kullanılır?", en: "When do you use interface vs type alias in TypeScript?" }, a: { tr: "Interface: obje şekilleri ve class contracts için. Declaration merging gerektiğinde. Type alias: union types, intersection types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu' diyorsan type alias.", en: "Interface: for object shapes and class contracts, especially when you need declaration merging. Type alias: for union types, intersections. Simple rule: if describing an object shape, use interface; if saying 'this OR that,' use type alias." } },
        { level: "intermediate", q: { tr: "Discriminated union nedir? QA'de nasıl kullanılır?", en: "What is a discriminated union? How is it used in QA?" }, a: { tr: "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: { status: 'pass', data: T } | { status: 'fail', error: string }. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.", en: "A union where each variant has a shared literal-type 'discriminant' field. Example: { status: 'pass', data: T } | { status: 'fail', error: string }. Great in QA for modeling test events — start, pass, fail, skip each have different fields." } },
        { level: "advanced", q: { tr: "TypeScript 'private' Java 'private'den nasıl farklı?", en: "How does TypeScript 'private' differ from Java 'private'?" }, a: { tr: "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced. Gerçek runtime gizlilik için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı destekler.", en: "TypeScript 'private' is only compile-time enforced — accessible at runtime in JavaScript. Java 'private' is runtime-enforced. For true runtime privacy, use JS private field syntax: #field. TypeScript supports this syntax." } },
      ]},
    ],
  },

`;

const beforeSection = lines.slice(0, s3Start).join('\n');
const afterSection = lines.slice(s4Start).join('\n');
const newContent = beforeSection + '\n' + newIntermediate + afterSection;
fs.writeFileSync('./src/data/typescriptData.js', newContent);
console.log('TypeScript Intermediate replaced (v2 — no nested template literals)!');
