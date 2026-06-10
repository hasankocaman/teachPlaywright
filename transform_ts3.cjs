const fs = require('fs');
const src = fs.readFileSync('./src/data/typescriptData.js', 'utf8');

const lines = src.split('\n');
let s3Start = -1, s4Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"Intermediate TypeScript"') && s3Start === -1) s3Start = i - 1;
  if (lines[i].includes('"Advanced TypeScript"') && s4Start === -1) s4Start = i - 1;
}
console.log(`Intermediate: lines ${s3Start+1}–${s4Start+1}`);

const newIntermediate = `  {
    title: "Intermediate TypeScript",
    blocks: [

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 7 — Aliases & Interfaces
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Aliases & Interfaces", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "📝", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Type alias, bir tip için kısayol isim. Interface, nesnelerin nasıl görünmesi gerektiğini tanımlayan sözleşme. İkisi de benzer görünür ama interface genişletilebilir — büyük projelerde interface tercih edilir.", en: "A type alias is a shortcut name for a type. An interface is a contract defining what an object must look like. Both look similar but interfaces are extendable — preferred in large projects." } },
      { type: "text", content: { tr: "Java'da interface çok önemli — OOP'un temeli. TypeScript'te interface benzer görevi görür ama daha basit. Type alias ise Java'daki typedef gibi — yeni bir isim oluşturur. Temel kural: obje şekli için interface, union/intersection için type alias kullan.", en: "Java interfaces are central — they are the basis of OOP. TypeScript interfaces serve a similar role but are simpler. Type aliases are like Java's typedef — they create a new name. General rule: use interface for object shapes, use type alias for unions/intersections." } },
      { type: "code", language: "typescript", code: \`// Type Alias — creates a new name for any type
type UserId = number;           // alias for primitive
type Status = "PASS" | "FAIL" | "SKIP";  // union type alias
type Callback = (msg: string) => void;   // function type alias

// Interface — defines object shape
interface User {
  id: UserId;                   // using the alias
  email: string;
  role: "admin" | "user";
  createdAt?: Date;             // optional
}

interface TestResult {
  testId: number;
  name: string;
  status: Status;               // using the type alias
  duration: number;
}

// Interface extends — like Java extends
interface ExtendedResult extends TestResult {
  browserName: string;
  screenshots: string[];
}

// Type intersection — like interface extends but with &
type DetailedResult = TestResult & {
  browserName: string;
  screenshots: string[];
};

const result: ExtendedResult = {
  testId: 1,
  name: "login_test",
  status: "PASS",
  duration: 342,
  browserName: "chrome",
  screenshots: ["step1.png", "step2.png"],
};
console.log(result.name, result.status, result.browserName);\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Define types for an API test framework
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type StatusCode = 200 | 201 | 400 | 401 | 404 | 500;

interface ApiTest {
  name: string;
  method: HttpMethod;
  endpoint: string;
  expectedStatus: StatusCode;
  auth?: boolean;
}

interface ApiTestResult extends ApiTest {
  actualStatus: StatusCode;
  passed: boolean;
  responseTimeMs: number;
}

const tests: ApiTest[] = [
  { name: "Get users", method: "GET", endpoint: "/api/users", expectedStatus: 200, auth: true },
  { name: "Login", method: "POST", endpoint: "/api/login", expectedStatus: 200 },
];

const results: ApiTestResult[] = tests.map(t => ({
  ...t,
  actualStatus: t.expectedStatus,  // simulated
  passed: true,
  responseTimeMs: Math.floor(Math.random() * 500),
}));

results.forEach(r => console.log(\`\${r.passed ? "✓" : "✗"} \${r.name} (\${r.responseTimeMs}ms)\`));\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Interfaces" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Define interface", java: "interface IUser { String email; }", typescript: "interface User { email: string; }" },
        { concept: "Implement", java: "class A implements IUser", typescript: "const a: User = { email: '...' }" },
        { concept: "Extend", java: "interface B extends A", typescript: "interface B extends A" },
        { concept: "Optional field", java: "@Nullable String field;", typescript: "field?: string;" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te interface ve type alias arasındaki önemli fark nedir?", en: "What is an important difference between interface and type alias in TypeScript?" }, options: [{ id: "a", text: { tr: "Interface sadece class için kullanılır", en: "Interface can only be used with classes" } }, { id: "b", text: { tr: "Interface extends edilebilir, type alias birden fazla kez tanımlanırsa merge edilir", en: "Interfaces can extend and merge; type aliases cannot be reopened" } }, { id: "c", text: { tr: "Type alias daha hızlıdır", en: "Type aliases are faster" } }, { id: "d", text: { tr: "Hiçbir fark yok", en: "No difference" } }], correct: "b", explanation: { tr: "Interface 'declaration merging' destekler — aynı isimle iki interface tanımlarsan birleşirler. Type alias desteklemez. Interface extends ile genişletilebilir. Bu nedenle kütüphane tiplerini genişletmek için interface tercih edilir.", en: "Interfaces support declaration merging — if you declare the same interface name twice, they merge. Type aliases cannot be reopened. Interfaces can be extended with extends. This is why interfaces are preferred for extending library types." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 8 — Union Types
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Union Types", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🔀", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Union type, 'bu ya şu ya bu' demek. ID ya number ya string olabilir. Ödeme yöntemi ya kredi kartı ya nakit ya da kripto. Java'da bunu generic ya da overload ile yapardın — TypeScript daha zarif.", en: "A union type means 'this OR that.' An ID can be either a number or a string. Payment can be credit card, cash, or crypto. In Java you'd use generics or overloads — TypeScript is more elegant." } },
      { type: "code", language: "typescript", code: \`// Union Types — value can be one of multiple types
type StringOrNumber = string | number;
type TestStatus = "PASS" | "FAIL" | "SKIP";     // literal union (most common)

// Function accepting multiple types
function formatId(id: string | number): string {
  if (typeof id === "number") {           // type narrowing — TypeScript knows it's number here
    return \`TC-\${id.toString().padStart(4, "0")}\`;
  }
  return id.startsWith("TC-") ? id : \`TC-\${id}\`;
}
console.log(formatId(42));          // TC-0042
console.log(formatId("LOGIN-001")); // TC-LOGIN-001

// Discriminated union — best pattern for modeling variants
type ApiResponse =
  | { status: "success"; data: unknown; statusCode: 200 }
  | { status: "error"; message: string; statusCode: 400 | 401 | 404 | 500 };

function handleResponse(res: ApiResponse): void {
  if (res.status === "success") {         // TypeScript knows data exists here
    console.log("Data:", res.data);
  } else {                                // TypeScript knows message exists here
    console.error(\`Error \${res.statusCode}: \${res.message}\`);
  }
}

handleResponse({ status: "success", data: { users: 5 }, statusCode: 200 });
handleResponse({ status: "error", message: "Not found", statusCode: 404 });\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Model different test event types with discriminated union
type TestEvent =
  | { type: "start"; testName: string; timestamp: number }
  | { type: "pass"; testName: string; durationMs: number }
  | { type: "fail"; testName: string; errorMessage: string; durationMs: number }
  | { type: "skip"; testName: string; reason: string };

function logEvent(event: TestEvent): void {
  switch (event.type) {
    case "start":
      console.log(\`▶ Starting: \${event.testName}\`);
      break;
    case "pass":
      console.log(\`✓ PASS: \${event.testName} (\${event.durationMs}ms)\`);
      break;
    case "fail":
      console.log(\`✗ FAIL: \${event.testName} — \${event.errorMessage}\`);
      break;
    case "skip":
      console.log(\`⏭ SKIP: \${event.testName} — \${event.reason}\`);
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
      { type: "quiz", question: { tr: "TypeScript'te 'type narrowing' ne anlama gelir?", en: "What does 'type narrowing' mean in TypeScript?" }, options: [{ id: "a", text: { tr: "Tipi daraltmak (kötü)", en: "Making the type smaller (bad thing)" } }, { id: "b", text: { tr: "typeof/instanceof kontrolleri sonrası TypeScript'in daha spesifik tip bilmesi", en: "TypeScript knowing a more specific type after typeof/instanceof checks" } }, { id: "c", text: { tr: "Tipi any'ye çevirmek", en: "Converting to any type" } }, { id: "d", text: { tr: "Union'dan bir tip kaldırmak", en: "Removing a type from a union" } }], correct: "b", explanation: { tr: "Type narrowing: typeof kontrolü sonrası TypeScript değişkenin tipini bilir. if (typeof x === 'number') bloğu içinde TypeScript x'in number olduğunu garanti eder. Discriminated union'da da aynı şey olur.", en: "Type narrowing: after a typeof check, TypeScript knows the variable's specific type. Inside if (typeof x === 'number'), TypeScript guarantees x is a number. The same happens with discriminated unions." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 9 — Functions
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Functions", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "⚙️", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript fonksiyonları Java metodlarına çok benzer — ama daha kısa syntax ile. Parametre tipleri ve dönüş tipi belirtilir. Java'da overload için metodu tekrar yazardın — TypeScript'te union type ile tek fonksiyon yeterli.", en: "TypeScript functions are very similar to Java methods — but with shorter syntax. Parameter types and return types are specified. In Java you'd rewrite the method for overloading — in TypeScript a single function with union types is enough." } },
      { type: "code", language: "typescript", code: \`// TypeScript Functions — all patterns

// Basic typed function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (same as above, different syntax)
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function createTestUser(
  email: string,
  role: "admin" | "user" = "user",    // default value
  active?: boolean                      // optional: boolean | undefined
): { email: string; role: string; active: boolean } {
  return { email, role, active: active ?? true };
}

console.log(createTestUser("alice@example.com"));
console.log(createTestUser("admin@example.com", "admin"));
console.log(createTestUser("test@example.com", "user", false));

// Rest parameters (like Java varargs)
function joinLogs(...messages: string[]): string {
  return messages.join(" | ");
}
console.log(joinLogs("PASS", "login", "342ms"));

// Function overloads — type-safe based on input type
function format(value: number): string;
function format(value: string): string;
function format(value: number | string): string {
  if (typeof value === "number") return value.toFixed(2);
  return value.trim().toUpperCase();
}
console.log(format(3.14159));  // 3.14
console.log(format("  hello  "));  // HELLO\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Build a typed test assertion helper
function assertEqual<T>(actual: T, expected: T, message?: string): void {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  const label = message ?? "assertEqual";
  console.log(\`\${passed ? "✓" : "✗"} \${label}\`);
  if (!passed) {
    console.log(\`  Expected: \${JSON.stringify(expected)}\`);
    console.log(\`  Actual:   \${JSON.stringify(actual)}\`);
  }
}

assertEqual(2 + 2, 4, "2+2=4");
assertEqual("hello".toUpperCase(), "HELLO", "toUpperCase");
assertEqual([1, 2, 3].length, 3, "array length");
assertEqual("test".includes("es"), false, "includes check"); // This one fails\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Functions" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Basic function", java: "public int add(int a, int b) { return a+b; }", typescript: "function add(a: number, b: number): number { return a+b; }" },
        { concept: "Arrow/lambda", java: "(a, b) -> a + b", typescript: "(a, b) => a + b" },
        { concept: "Default param", java: "Not supported (use overload)", typescript: "function f(x: number = 0)" },
        { concept: "Varargs", java: "void f(String... msgs)", typescript: "function f(...msgs: string[])" },
      ]},
      { type: "quiz", question: { tr: "TypeScript'te parametre sonundaki '?' ne anlama gelir?", en: "What does '?' at the end of a parameter name mean in TypeScript?" }, options: [{ id: "a", text: { tr: "Parametre nullable", en: "Parameter is nullable" } }, { id: "b", text: { tr: "Parametre opsiyonel — undefined olabilir, geçilmeyebilir", en: "Parameter is optional — can be undefined, can be omitted" } }, { id: "c", text: { tr: "Parametre bir string", en: "Parameter is a string" } }, { id: "d", text: { tr: "Return type optional", en: "Return type is optional" } }], correct: "b", explanation: { tr: "function f(x?: number) yazınca x hem number hem undefined olabilir ve çağırırken geçilmeyebilir. f() ve f(42) ikisi de geçerli. Java'da bu yok — default değer veya overload kullanılırdı.", en: "function f(x?: number) means x can be number or undefined, and can be omitted when calling. f() and f(42) are both valid. Java has no equivalent — you'd use default values or overloads." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 10 — Casting
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Casting", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🔄", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "Casting, TypeScript'e 'Biliyorum bu any tipinde görünüyor ama aslında string — güven bana' demek. Java'da (String) obj gibi. as keyword'ü veya <Type> syntax kullanılır. Gereksiz casting bug'lara yol açabilir.", en: "Casting tells TypeScript 'I know this looks like any but it is actually a string — trust me.' Like (String) obj in Java. Uses the 'as' keyword or <Type> syntax. Unnecessary casting can introduce bugs." } },
      { type: "code", language: "typescript", code: \`// TypeScript Casting (Type Assertions)
// Note: these don't convert values — they tell TypeScript what type to expect

// as keyword (preferred)
const input = document.getElementById("username") as HTMLInputElement;
// input.value now works — TypeScript knows it's an HTMLInputElement

// Casting unknown input from API
async function fetchUser(id: number): Promise<unknown> {
  return { id, email: "alice@example.com", role: "admin" };  // simulated
}

interface User {
  id: number;
  email: string;
  role: string;
}

async function getUser(id: number): Promise<User> {
  const raw = await fetchUser(id);
  return raw as User;        // we trust the API returns the right shape
}

// Safer: validate before casting
function toUser(raw: unknown): User | null {
  if (
    typeof raw === "object" && raw !== null &&
    "id" in raw && "email" in raw && "role" in raw
  ) {
    return raw as User;      // safe: we checked the shape
  }
  return null;
}

// Double casting through unknown (escape hatch — use sparingly)
const a: string = "hello";
const b = a as unknown as number;  // TypeScript won't catch this — dangerous!
console.log(typeof b);             // "string" — the cast didn't actually convert!\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Practice: safe casting with validation
interface Config {
  baseUrl: string;
  timeout: number;
  retries: number;
}

function parseConfig(raw: unknown): Config {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Config must be an object");
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj.baseUrl !== "string") throw new Error("baseUrl must be a string");
  if (typeof obj.timeout !== "number") throw new Error("timeout must be a number");
  if (typeof obj.retries !== "number") throw new Error("retries must be a number");
  return obj as unknown as Config;
}

const validConfig = { baseUrl: "https://api.example.com", timeout: 5000, retries: 3 };
const parsed = parseConfig(validConfig);
console.log("Config:", parsed.baseUrl, "timeout:", parsed.timeout);\` },
      { type: "quiz", question: { tr: "TypeScript'te 'as' keyword'ü ne yapar?", en: "What does the 'as' keyword do in TypeScript?" }, options: [{ id: "a", text: { tr: "Değeri gerçekten dönüştürür (Java casting gibi)", en: "Actually converts the value (like Java casting)" } }, { id: "b", text: { tr: "TypeScript'e tip hakkında bilgi verir — runtime'da etkisi yok", en: "Tells TypeScript about the type — has no effect at runtime" } }, { id: "c", text: { tr: "Null kontrolü yapar", en: "Performs a null check" } }, { id: "d", text: { tr: "Değeri clone'lar", en: "Clones the value" } }], correct: "b", explanation: { tr: "'as' compile-time'da TypeScript'e tipi söyler — runtime'da hiçbir şey olmaz. Java'daki (String) obj gerçekten cast eder ve runtime'da ClassCastException atar. TypeScript'te 'as' yanlış tipte kullanılsa bile runtime'da patlama yok — sadece yanlış davranış.", en: "'as' tells TypeScript the type at compile-time — nothing happens at runtime. Java's (String) obj actually casts and throws ClassCastException at runtime. With TypeScript 'as', using wrong types causes wrong behavior at runtime, not an explicit crash." } },

      // ═══════════════════════════════════════════════════════════════════════
      // W3Schools Topic 11 — Classes
      // ═══════════════════════════════════════════════════════════════════════
      { type: "heading", text: "Classes", difficulty: "🟡 Intermediate" },
      { type: "simple-box", emoji: "🏗️", title: { tr: "Bunu 10 yaşındaki birine anlatalım:", en: "Simply put:" }, content: { tr: "TypeScript class'ları Java class'larına çok benzer — ama daha kısa syntax ile. Java'da field tanımla, constructor'da this.field = value yaz. TypeScript'te constructor parametresine 'public' yaz — ikisi birden yapılır.", en: "TypeScript classes are very similar to Java classes — but with shorter syntax. In Java, declare field, then write this.field = value in constructor. In TypeScript, add 'public' to constructor parameters — it does both at once." } },
      { type: "code", language: "typescript", code: \`// TypeScript Classes — with Java comparison

// Java style (verbose):
// class User {
//   private String email;
//   public User(String email) { this.email = email; }
// }

// TypeScript shorthand — constructor parameter shortcut
class User {
  constructor(
    public readonly id: number,       // public + readonly field in one line
    public email: string,             // public field
    private role: string = "user",    // private field with default
  ) {}

  getRole(): string { return this.role; }

  toString(): string {
    return \`User(\${this.id}: \${this.email}, \${this.role})\`;
  }
}

// Inheritance (like Java extends)
class AdminUser extends User {
  constructor(id: number, email: string, private permissions: string[]) {
    super(id, email, "admin");        // call parent constructor
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
console.log(admin.hasPermission("sudo"));     // false

// Abstract class (like Java abstract)
abstract class BaseTest {
  abstract run(): void;               // must be implemented by subclass
  log(msg: string): void { console.log(\`[TEST] \${msg}\`); }
}

class LoginTest extends BaseTest {
  run(): void { this.log("Running login test"); }
}

new LoginTest().run();\` },
      { type: "editor", lang: "typescript", defaultCode: \`// Build a typed test suite class
class TestSuite {
  private tests: Array<{ name: string; fn: () => boolean }> = [];

  constructor(public readonly name: string) {}

  addTest(name: string, fn: () => boolean): this {
    this.tests.push({ name, fn });
    return this;  // allow chaining
  }

  run(): { passed: number; failed: number; total: number } {
    let passed = 0;
    let failed = 0;
    for (const test of this.tests) {
      const result = test.fn();
      console.log(\`  \${result ? "✓" : "✗"} \${test.name}\`);
      if (result) passed++; else failed++;
    }
    return { passed, failed, total: this.tests.length };
  }
}

const suite = new TestSuite("Math Tests")
  .addTest("2+2=4", () => 2 + 2 === 4)
  .addTest("5>3", () => 5 > 3)
  .addTest("hello is string", () => typeof "hello" === "string")
  .addTest("intentional fail", () => 1 === 2);

console.log(\`Running suite: \${suite.name}\`);
const result = suite.run();
console.log(\`Result: \${result.passed}/\${result.total} passed\`);\` },
      { type: "comparison", title: { tr: "Java ile Karşılaştırma", en: "Java vs TypeScript — Classes" }, columns: ["Java", "TypeScript"], rows: [
        { concept: "Field + constructor", java: "String x; MyClass(String x) { this.x = x; }", typescript: "constructor(public x: string) {} (one line!)" },
        { concept: "Access modifiers", java: "public, protected, private, default", typescript: "public, protected, private (no default)" },
        { concept: "Readonly", java: "final String x;", typescript: "readonly x: string;" },
        { concept: "Abstract", java: "abstract class A { abstract void run(); }", typescript: "abstract class A { abstract run(): void; }" },
      ]},
      { type: "quiz", question: { tr: "TypeScript constructor parametresinde 'public' yazmanın avantajı nedir?", en: "What is the advantage of writing 'public' in a TypeScript constructor parameter?" }, options: [{ id: "a", text: { tr: "Hiç avantajı yok", en: "No advantage" } }, { id: "b", text: { tr: "Field tanımlama ve atamayı tek satırda yapar (Java'daki 2 adımı 1'e indirir)", en: "Defines and assigns the field in one line (reduces Java's 2 steps to 1)" } }, { id: "c", text: { tr: "Performansı artırır", en: "Improves performance" } }, { id: "d", text: { tr: "Sadece string için çalışır", en: "Only works for strings" } }], correct: "b", explanation: { tr: "Java'da: 'String email; MyClass(String email) { this.email = email; }' — 2 adım. TypeScript'te: 'constructor(public email: string)' — 1 adım. Constructor shorthand denen bu syntax field tanımlamayı ve atamayı aynı anda yapar.", en: "In Java: 'String email; MyClass(String email) { this.email = email; }' — 2 steps. In TypeScript: 'constructor(public email: string)' — 1 step. This constructor shorthand syntax defines and assigns the field simultaneously." } },

      // ─── Interview Questions for Intermediate ─────────────────────────────
      { type: "interview-questions", topic: "TypeScript Intermediate", questions: [
        { level: "basic", q: { tr: "TypeScript'te interface ve type alias ne zaman kullanılır?", en: "When do you use interface vs type alias in TypeScript?" }, a: { tr: "Interface: obje şekilleri, class contracts, kütüphane tipi genişletme (declaration merging) için. Type alias: union types, intersection types, primitive alias, function types için. Basit kural: obje yapısı tarif ediyorsan interface, 'bu ya şu ya bu' diyorsan type alias.", en: "Interface: for object shapes, class contracts, extending library types (declaration merging). Type alias: for union types, intersection types, primitive aliases, function types. Simple rule: if you're describing an object shape, use interface; if you're saying 'this OR that,' use type alias." } },
        { level: "intermediate", q: { tr: "Discriminated union nedir? QA'de nasıl kullanılır?", en: "What is a discriminated union? How is it used in QA?" }, a: { tr: "Her varyantın ortak bir literal tip discriminant field'ı olan union. Örnek: type Result = { status: 'pass', data: T } | { status: 'fail', error: string }. switch(result.status) içinde TypeScript her branch'te doğru tipi bilir. QA'de test olaylarını modellemek için harika — start | pass | fail | skip her biri farklı field'a sahip.", en: "A union where each variant has a shared literal-type 'discriminant' field. Example: type Result = { status: 'pass', data: T } | { status: 'fail', error: string }. In a switch(result.status), TypeScript knows the correct type in each branch. Great in QA for modeling test events — start | pass | fail | skip, each with different fields." } },
        { level: "advanced", q: { tr: "TypeScript class'larında 'private' keyword'ü Java'dan nasıl farklı?", en: "How does the 'private' keyword in TypeScript classes differ from Java?" }, a: { tr: "TypeScript 'private' sadece compile-time'da enforced — JavaScript'te runtime'da erişilebilir. Java 'private' runtime'da da enforced — reflection dışında erişilemez. Gerçek runtime private için JS private field syntax kullanılır: #field. TypeScript bu syntax'ı da destekler. QA testlerinde bunu bilmek önemli — TypeScript private field'a JavaScript ile erişilebilir.", en: "TypeScript 'private' is only enforced at compile-time — it is accessible at runtime in JavaScript. Java 'private' is enforced at runtime — not accessible except through reflection. For true runtime privacy, use JS private field syntax: #field. TypeScript also supports this syntax. Important for QA testing — TypeScript private fields can be accessed via JavaScript." } },
      ]},
    ],
  },

`;

const beforeSection = lines.slice(0, s3Start).join('\n');
const afterSection = lines.slice(s4Start).join('\n');
const newContent = beforeSection + '\n' + newIntermediate + afterSection;
fs.writeFileSync('./src/data/typescriptData.js', newContent);
console.log('TypeScript Intermediate replaced successfully!');
