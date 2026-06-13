// ─── Shared bilingual sections ────────────────────────────────────────────────
// All text fields use { tr, en } — tx() helper picks the right language.
// Code blocks never change between languages.

const sections = [

  // ── 0: Why REST Assured? ────────────────────────────────────────────────────
  {
    title: { tr: '🏠 Neden REST Assured?', en: '🏠 Why REST Assured?' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '😤',
        content: {
          tr: 'Sabah 9\'da deployment var. Geliştirici "API hazır" dedi. Postman\'da 47 isteği tek tek elle test ettin, 3 saat geçti. Bir dahaki deployment\'ta yine aynı. REST Assured bu 3 saati 30 saniyeye indirir.',
          en: 'Deployment is at 9 AM. The developer said "API is ready." You manually tested 47 requests in Postman — 3 hours gone. Next deployment, same story. REST Assured cuts those 3 hours down to 30 seconds.',
        },
      },
      {
        type: 'heading',
        text: {
          tr: '🎬 Gerçek Senaryo: Postman\'dan REST Assured\'a Geçiş',
          en: '🎬 Real Scenario: Moving from Postman to REST Assured',
        },
      },
      {
        type: 'text',
        content: {
          tr: 'Bir e-ticaret projesinde çalışıyorsun. Her sprint\'te şu endpointler test edilmeli: Kullanıcı kayıt/login, Ürün listeleme/arama, Sepet ekleme/güncelleme/silme, Ödeme işlemi. Postman\'la haftada 6 saat harcıyorsun. Yeni bir geliştirici geldi, Postman collection\'ını bozdu, kimse fark etmedi, production\'a gitti. REST Assured bu senaryoyu tamamen ortadan kaldırır.',
          en: 'You\'re on an e-commerce project. Every sprint these endpoints need testing: user register/login, product listing/search, cart add/update/delete, payment flow. You spend 6 hours a week in Postman. A new developer joined, broke the collection, nobody noticed, it went to production. REST Assured eliminates this scenario entirely.',
        },
      },
      {
        type: 'grid',
        cols: 2,
        items: [
          {
            icon: '🤖',
            label: { tr: 'Tam Otomasyon', en: 'Full Automation' },
            desc: {
              tr: 'Her git push\'ta otomatik çalışır. "Geliştirici merge etti mi?" değil, "CI testleri geçti mi?" sorusu.',
              en: 'Runs automatically on every git push. The question is not "did the developer merge?" but "did the CI tests pass?"',
            },
          },
          {
            icon: '☕',
            label: { tr: 'Saf Java Gücü', en: 'Pure Java Power' },
            desc: {
              tr: 'DB\'den kullanıcı çek, API\'ye gönder, response\'u kontrol et — hepsini tek test içinde Java ile yap.',
              en: 'Fetch a user from DB, send to API, verify the response — all in one test, all in Java.',
            },
          },
          {
            icon: '🔁',
            label: { tr: 'Sıfır Manuel İş', en: 'Zero Manual Work' },
            desc: {
              tr: '200 endpoint? Fark etmez. mvn test yaz, git. Her test saniyeler içinde biter.',
              en: '200 endpoints? No problem. Type mvn test and walk away. Every test finishes in seconds.',
            },
          },
          {
            icon: '📊',
            label: { tr: 'Allure Rapor', en: 'Allure Reporting' },
            desc: {
              tr: 'Her test için screenshot değil, request/response logu, süre, başarı/hata oranı. Yöneticiye göster.',
              en: 'Not screenshots — request/response logs, duration, pass/fail rate. Show it to your manager.',
            },
          },
          {
            icon: '🔒',
            label: { tr: 'Regresyon Kalkanı', en: 'Regression Shield' },
            desc: {
              tr: 'Yeni özellik eski endpoint\'i kırdı mı? REST Assured 30 saniyede söyler.',
              en: 'Did the new feature break an old endpoint? REST Assured tells you in 30 seconds.',
            },
          },
          {
            icon: '🧩',
            label: { tr: 'Test Veri Yönetimi', en: 'Test Data Management' },
            desc: {
              tr: 'Faker ile dinamik test verisi, DB cleanup, environment bazlı config — hepsi Java.',
              en: 'Dynamic test data with Faker, DB cleanup, environment-based config — all in Java.',
            },
          },
        ],
      },
      {
        type: 'heading',
        text: {
          tr: '📊 Gerçek Rakamlar: Ne Kadar Zaman Kazanırsın?',
          en: '📊 Real Numbers: How Much Time Do You Save?',
        },
      },
      {
        type: 'table',
        headers: ['Task', 'Postman (Manual)', 'REST Assured (Automated)'],
        rows: [
          ['Post-sprint regression test (50 endpoints)', '4–6 hours', '2–3 minutes'],
          ['New developer onboarding', '2 days (learn the collection)', '30 minutes (read the code)'],
          ['Pre-production deploy test', 'Skipped (no time)', 'Runs in the pipeline automatically'],
          ['Test result reporting', 'Screenshot', 'Allure HTML report'],
          ['Broken test detection', 'Weeks later', 'Instantly on git push'],
        ],
      },
      {
        type: 'postman-compare',
        comparisons: [
          {
            scenario: '🟢 GET — List Users',
            postman: 'Select Method: GET\nURL: {{baseUrl}}/api/users?page=1\nClick Send\n→ Check response manually\n→ Repeat for every test',
            restAssured: `given()
    .baseUri("https://reqres.in")
    .queryParam("page", 1)
.when()
    .get("/api/users")
.then()
    .statusCode(200)
    .body("page", equalTo(1))
    .body("data.size()", greaterThan(0))
    .body("data[0].email", notNullValue());
// Runs automatically in CI/CD on every push`,
          },
          {
            scenario: '🟡 POST — Create User',
            postman: 'Method: POST\nBody > raw > JSON:\n{"name":"Alice","job":"QA"}\nSend > Check result\n→ Is it 201? Is there an id?\n→ Manual inspection',
            restAssured: `UserRequest req = new UserRequest("Alice","QA");

given()
    .contentType(ContentType.JSON)
    .body(req)           // POJO → JSON automatically
.when()
    .post("https://reqres.in/api/users")
.then()
    .statusCode(201)
    .body("name", equalTo("Alice"))
    .body("id", notNullValue());
// Type-safe, IDE autocomplete supported`,
          },
          {
            scenario: '🔐 Bearer Token Auth',
            postman: 'Authorization tab → Bearer Token\nToken: {{authToken}}\n→ Did you set the variable?\n→ Has the token expired?',
            restAssured: `// Login → get token → use automatically
String token = given()
    .contentType(ContentType.JSON)
    .body(new LoginRequest("eve.holt@reqres.in","cityslicka"))
.when()
    .post("https://reqres.in/api/login")
.then()
    .statusCode(200)
    .extract().path("token");

given().auth().oauth2(token)
    .when().get("/api/users/me")
    .then().statusCode(200);`,
          },
          {
            scenario: '✅ Assertions / Tests',
            postman: `Tests tab → write JavaScript:
pm.test("Status 200", ()=>{
  pm.response.to.have.status(200);
});
pm.test("Email exists", ()=>{
  pm.expect(pm.response.json()
    .data[0].email).to.include("@");
});`,
            restAssured: `.then()
    .statusCode(200)
    .body("data[0].email", containsString("@"))
    .body("data[0].id", greaterThan(0))
    .body("total", greaterThanOrEqualTo(1))
    .body("data", hasSize(greaterThan(0)))
    .time(lessThan(3000L));
// Type-safe, compile-time checks`,
          },
          {
            scenario: '🔄 Test Chaining (Pass Values)',
            postman: `Save to variable in Tests:
pm.collectionVariables.set(
  "newUserId",
  pm.response.json().id
);
// Use in next request: {{newUserId}}
// Breaks if collection order changes`,
            restAssured: `// Safe, type-safe chaining
String id = given()
    .contentType(ContentType.JSON)
    .body(new UserRequest("Bob","Dev"))
.when()
    .post("/api/users")
.then()
    .statusCode(201)
    .extract().path("id");

given().pathParam("id", id)
    .when().delete("/api/users/{id}")
    .then().statusCode(204);`,
          },
          {
            scenario: '🌍 Environment → BaseURI Config',
            postman: 'Environments > New\nbaseUrl: https://reqres.in\nEach request uses {{baseUrl}}\n→ Forget to select env? Error.',
            restAssured: `// application.properties or BaseTest
public class BaseTest {
  @BeforeAll static void init() {
    RestAssured.baseURI =
      System.getProperty("env",
        "https://reqres.in");
    // mvn test -Denv=https://staging
    // No "forgot to select env" mistakes
  }
}`,
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: 'Büyük bir projede REST Assured\'ın Postman\'a göre en kritik avantajı nedir?',
          en: 'What is the most critical advantage of REST Assured over Postman in a large project?',
        },
        options: [
          { id: 'a', text: { tr: 'GUI\'si daha güzel', en: 'It has a nicer GUI' } },
          { id: 'b', text: { tr: 'CI/CD\'e native entegrasyon — her push\'ta otomatik çalışma', en: 'Native CI/CD integration — runs automatically on every push' } },
          { id: 'c', text: { tr: 'Daha fazla renk teması var', en: 'It has more color themes' } },
          { id: 'd', text: { tr: 'İnternetsiz çalışır', en: 'It works offline' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'CI/CD entegrasyonu en kritik fark. Jenkins/GitHub Actions\'da mvn test komutuyla tüm API testleri otomatik çalışır, rapor üretir, hata varsa pipeline durdurur.',
          en: 'CI/CD integration is the most critical difference. In Jenkins/GitHub Actions, mvn test runs all API tests automatically, generates a report, and stops the pipeline if there are failures.',
        },
      },
    ],
  },

  // ── 1: Setup ─────────────────────────────────────────────────────────────────
  {
    title: { tr: '⚙️ Kurulum ve Proje Yapısı', en: '⚙️ Setup & Project Structure' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🏗️',
        content: {
          tr: 'Bir inşaat projesinde önce temel atılır. REST Assured projesinde temel: pom.xml bağımlılıkları + BaseTest sınıfı. Bu ikisi doğru kurulursa geri kalan test yazmak kolaylaşır.',
          en: 'Every building starts with a foundation. In a REST Assured project the foundation is: pom.xml dependencies + BaseTest class. Get these right and writing the actual tests becomes easy.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Maven pom.xml — Tüm Bağımlılıklar', en: 'Maven pom.xml — All Dependencies' },
      },
      {
        type: 'code',
        language: 'xml',
        code: `<dependencies>
    <!-- REST Assured core library -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JSON Path (extract values from response) -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-path</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JSON Schema validation -->
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-schema-validator</artifactId>
        <version>5.4.0</version>
        <scope>test</scope>
    </dependency>

    <!-- JUnit 5 test framework -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>

    <!-- Hamcrest assertion matchers -->
    <dependency>
        <groupId>org.hamcrest</groupId>
        <artifactId>hamcrest</artifactId>
        <version>2.2</version>
        <scope>test</scope>
    </dependency>

    <!-- Jackson: POJO <-> JSON conversion (REQUIRED) -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.17.0</version>
    </dependency>

    <!-- Lombok: eliminates getter/setter boilerplate -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.32</version>
        <scope>provided</scope>
    </dependency>

    <!-- Allure reporting (optional but recommended) -->
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-rest-assured</artifactId>
        <version>2.25.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>`,
      },
      {
        type: 'heading',
        text: { tr: 'Proje Klasör Yapısı', en: 'Project Folder Structure' },
      },
      {
        type: 'file-tree',
        title: { tr: 'REST Assured Proje Yapısı (Kurumsal)', en: 'REST Assured Project Structure (Enterprise)' },
        tree: `src/
├── main/
│   └── java/com/mycompany/
│       └── models/                    ← Application POJOs (if any)
│
└── test/
    ├── java/com/mycompany/
    │   ├── config/
    │   │   ├── BaseTest.java          ← Main config, @BeforeAll
    │   │   └── ConfigReader.java      ← Read config from properties files
    │   ├── models/
    │   │   ├── request/
    │   │   │   ├── UserRequest.java   ← POST/PUT request body POJO
    │   │   │   └── LoginRequest.java
    │   │   └── response/
    │   │       ├── UserResponse.java  ← Response POJO
    │   │       └── UsersListResponse.java
    │   ├── tests/
    │   │   ├── UserApiTest.java       ← User API tests
    │   │   ├── AuthApiTest.java       ← Auth tests
    │   │   └── ProductApiTest.java    ← Product API tests
    │   └── utils/
    │       ├── TestDataBuilder.java   ← Test data factory
    │       └── AuthHelper.java        ← Token management
    └── resources/
        ├── schemas/
        │   ├── user-schema.json       ← JSON Schema files
        │   └── users-list-schema.json
        └── config/
            ├── dev.properties         ← Dev environment config
            └── staging.properties     ← Staging environment config`,
        note: {
          tr: 'config/, models/, utils/ ayrımı projeyi büyüdükçe yönetilebilir tutar.',
          en: 'The config/, models/, utils/ separation keeps the project manageable as it grows.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'BaseTest.java — Her Şeyin Temeli', en: 'BaseTest.java — The Foundation of Everything' },
      },
      {
        type: 'code',
        language: 'java',
        code: `package com.mycompany.config;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.BeforeAll;

public class BaseTest {

    // All test classes inherit this spec
    protected static RequestSpecification spec;

    @BeforeAll
    static void globalSetup() {
        // Base URI — read from system property, fallback to default
        String baseUri = System.getProperty("baseUri", "https://reqres.in");

        spec = new RequestSpecBuilder()
            .setBaseUri(baseUri)               // All requests start from this URL
            .setContentType(ContentType.JSON)  // Every request sends/expects JSON
            .setRelaxedHTTPSValidation()       // Skip SSL cert check in dev/staging
            .addFilter(new RequestLoggingFilter())  // Log all requests
            .addFilter(new ResponseLoggingFilter()) // Log all responses
            .build();
    }
}`,
      },
      {
        type: 'heading',
        text: { tr: 'ConfigReader.java — Ortam Konfigürasyonu', en: 'ConfigReader.java — Environment Configuration' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// src/test/resources/config/dev.properties:
// base.uri=https://reqres.in
// admin.email=eve.holt@reqres.in
// admin.password=cityslicka

public class ConfigReader {
    private static Properties props = new Properties();
    static {
        String env = System.getProperty("env", "dev");
        try {
            props.load(ConfigReader.class
                .getResourceAsStream("/config/" + env + ".properties"));
        } catch (IOException e) {
            throw new RuntimeException("Config file not found: " + env, e);
        }
    }
    public static String get(String key) { return props.getProperty(key); }
}

// Usage:  ConfigReader.get("base.uri")  →  "https://reqres.in"
// mvn test -Denv=staging  →  loads staging.properties`,
      },
      {
        type: 'quiz',
        question: {
          tr: 'setRelaxedHTTPSValidation() ne işe yarar?',
          en: 'What does setRelaxedHTTPSValidation() do?',
        },
        options: [
          { id: 'a', text: { tr: 'HTTP\'yi HTTPS\'e yönlendirir', en: 'Redirects HTTP to HTTPS' } },
          { id: 'b', text: { tr: 'Self-signed veya süresi dolmuş SSL sertifikalarında hata fırlatmaz', en: 'Does not throw errors for self-signed or expired SSL certificates' } },
          { id: 'c', text: { tr: 'HTTPS isteklerini şifreler', en: 'Encrypts HTTPS requests' } },
          { id: 'd', text: { tr: 'Bağlantı timeout\'unu artırır', en: 'Increases the connection timeout' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'Dev ve staging ortamlarında genellikle self-signed SSL sertifikası olur. setRelaxedHTTPSValidation() bu sertifikaları doğrulamadan geçer. Production\'da kullanma — güvenlik riski.',
          en: 'Dev and staging environments often use self-signed SSL certificates. setRelaxedHTTPSValidation() skips certificate validation. Never use it in production — it is a security risk.',
        },
      },
    ],
  },

  // ── 2: Basic Requests ────────────────────────────────────────────────────────
  {
    title: { tr: '📡 Temel HTTP İstekleri (reqres.in ile)', en: '📡 Basic HTTP Requests (using reqres.in)' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '📬',
        content: {
          tr: 'Tüm örneklerde ücretsiz test API\'si reqres.in kullanılmıştır. Bu API\'yi gerçek projenle değiştirmek için sadece baseUri ve endpoint path\'ini değiştirmen yeterli.',
          en: 'All examples use the free test API reqres.in. To switch to your real project\'s API, just change the baseUri and endpoint path.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'GET — Sayfalı Kullanıcı Listesi', en: 'GET — Paginated User List' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// GET https://reqres.in/api/users?page=2
@Test
@DisplayName("GET /api/users?page=2 → returns 6 users")
void getUsers_page2_shouldReturn6Users() {
    given()
        .spec(spec)
        .queryParam("page", 2)           // Appends ?page=2
    .when()
        .get("/api/users")
    .then()
        .statusCode(200)
        .body("page", equalTo(2))
        .body("per_page", equalTo(6))
        .body("total", greaterThan(0))
        .body("data", hasSize(6))        // Exactly 6 users returned
        .body("data[0].id", notNullValue())
        .body("data[0].email", containsString("@"))
        .body("data.first_name", everyItem(notNullValue()))
        .time(lessThan(5000L));          // Response under 5 seconds
}`,
      },
      {
        type: 'heading',
        text: { tr: 'GET — ID ile Tek Kayıt ve 404 Testi', en: 'GET — Single Record by ID and 404 Test' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Existing user: GET /api/users/2
@Test
void getUser_existingId_shouldReturnUser() {
    given()
        .spec(spec)
        .pathParam("id", 2)
    .when()
        .get("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("data.id", equalTo(2))
        .body("data.email", equalTo("janet.weaver@reqres.in"))
        .body("data.first_name", equalTo("Janet"));
}

// Non-existing user: GET /api/users/999 → 404
@Test
void getUser_notExistingId_shouldReturn404() {
    given()
        .spec(spec)
        .pathParam("id", 999)
    .when()
        .get("/api/users/{id}")
    .then()
        .statusCode(404)
        .body(equalTo("{}")); // reqres.in returns empty JSON body

    // Negative tests are equally important!
    // Does the API handle errors correctly?
}`,
      },
      {
        type: 'heading',
        text: { tr: 'POST — Yeni Kullanıcı Oluştur', en: 'POST — Create a New User' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// POST https://reqres.in/api/users
@Test
void createUser_validData_shouldReturn201() {
    UserRequest request = UserRequest.builder()
        .name("Alice Smith")
        .job("Senior QA Engineer")
        .build();

    given()
        .spec(spec)
        .body(request)                   // Jackson serializes to JSON automatically
    .when()
        .post("/api/users")
    .then()
        .statusCode(201)                 // 201 Created (not 200!)
        .body("name", equalTo("Alice Smith"))
        .body("job", equalTo("Senior QA Engineer"))
        .body("id", notNullValue())      // Server must generate an id
        .body("createdAt", notNullValue()); // Timestamp must be present
}`,
      },
      {
        type: 'heading',
        text: { tr: 'PUT & PATCH & DELETE', en: 'PUT & PATCH & DELETE' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// PUT /api/users/2 — send the complete record
@Test
void updateUser_PUT_shouldReturn200() {
    given()
        .spec(spec)
        .pathParam("id", 2)
        .body(new UserRequest("Janet Updated", "QA Lead"))
    .when()
        .put("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("name", equalTo("Janet Updated"))
        .body("updatedAt", notNullValue());
}

// PATCH /api/users/2 — send only the changed field
@Test
void updateUser_PATCH_onlyJob_shouldReturn200() {
    given()
        .spec(spec)
        .pathParam("id", 2)
        .body("{\"job\": \"Principal QA\"}")
    .when()
        .patch("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("job", equalTo("Principal QA"));
}

// DELETE /api/users/2
@Test
void deleteUser_shouldReturn204() {
    given()
        .spec(spec)
        .pathParam("id", 2)
    .when()
        .delete("/api/users/{id}")
    .then()
        .statusCode(204);  // 204 No Content — no body, just the success code
}`,
      },
      {
        type: 'quiz',
        question: {
          tr: 'POST başarılı olduğunda hangi HTTP status code beklenir?',
          en: 'Which HTTP status code is expected when a POST is successful?',
        },
        options: [
          { id: 'a', text: '200 OK' },
          { id: 'b', text: '201 Created' },
          { id: 'c', text: '204 No Content' },
          { id: 'd', text: '202 Accepted' },
        ],
        correct: 'b',
        explanation: {
          tr: '201 Created — yeni kayıt oluşturulduğunda standart. 200 genelde GET için. 204 DELETE/PUT için (body yok). 202 ise async işlemlerde kullanılır.',
          en: '201 Created is the standard for new resource creation. 200 is typically for GET. 204 for DELETE/PUT when there is no body. 202 is for async operations.',
        },
      },
    ],
  },

  // ── 3: Authentication ────────────────────────────────────────────────────────
  {
    title: { tr: '🔐 Kimlik Doğrulama', en: '🔐 Authentication' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔑',
        content: {
          tr: 'Kapıcıya kimlik göstermeden binaya giremezsin. API\'de bu kimlik ya Basic Auth (kullanıcı:şifre), ya Bearer Token (JWT), ya da API Key\'dir. REST Assured üçünü de destekler.',
          en: 'You cannot enter a building without showing ID to the doorman. In an API, that ID is either Basic Auth (username:password), a Bearer Token (JWT), or an API Key. REST Assured supports all three.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Basic Authentication', en: 'Basic Authentication' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Basic Auth: "username:password" → Base64 encode → Authorization header
given()
    .spec(spec)
    .auth().preemptive().basic("admin", "secret123")
    // Adds header: Authorization: Basic YWRtaW46c2VjcmV0MTIz
.when()
    .get("/api/admin/dashboard")
.then()
    .statusCode(200);

// Why preemptive()?
// Normal .basic() → sends request without auth → gets 401 → retries with auth
// .preemptive() → sends auth from the very first request (faster, more reliable)`,
      },
      {
        type: 'heading',
        text: { tr: 'Bearer Token — Login → Token Al → Kullan', en: 'Bearer Token — Login → Get Token → Use It' },
      },
      {
        type: 'code',
        language: 'java',
        code: `public class AuthApiTest extends BaseTest {

    private static String token; // Shared across all test methods

    @BeforeAll
    static void login() {
        LoginRequest creds = new LoginRequest(
            "eve.holt@reqres.in", "cityslicka"
        );
        token = given()
            .spec(spec)
            .body(creds)
        .when()
            .post("/api/login")
        .then()
            .statusCode(200)
            .body("token", notNullValue())
            .extract().path("token");  // Extract as String
    }

    @Test
    void accessProtectedEndpoint_withToken_shouldReturn200() {
        given()
            .spec(spec)
            .auth().oauth2(token)      // Adds: Authorization: Bearer {token}
        .when()
            .get("/api/users/2")
        .then()
            .statusCode(200);
    }

    @Test
    void accessProtectedEndpoint_withoutToken_shouldReturn401() {
        given().spec(spec)             // No token — expect failure
        .when().get("/api/users/me")
        .then().statusCode(401);       // Negative test matters too!
    }
}`,
      },
      {
        type: 'heading',
        text: { tr: 'Token Auto-Refresh Filter — Gerçek Hayat Çözümü', en: 'Token Auto-Refresh Filter — Real-World Solution' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Real-world problem: token expires mid test suite
// Solution: a Filter that automatically refreshes the token on 401

public class TokenRefreshFilter implements Filter {
    private String token;
    private long tokenExpiry;

    public TokenRefreshFilter() { refreshToken(); }

    @Override
    public Response filter(FilterableRequestSpecification req,
                           FilterableResponseSpecification res,
                           FilterContext ctx) {
        if (System.currentTimeMillis() > tokenExpiry - 300_000)
            refreshToken();  // Refresh 5 minutes before expiry

        req.header("Authorization", "Bearer " + token);
        Response response = ctx.next(req, res);

        if (response.statusCode() == 401) { // Got 401? Refresh and retry
            refreshToken();
            req.header("Authorization", "Bearer " + token);
            response = ctx.next(req, res);
        }
        return response;
    }

    private void refreshToken() {
        token = RestAssured.given()
            .contentType(ContentType.JSON)
            .body(new LoginRequest("admin@example.com", "password"))
            .post("/auth/login")
            .then().statusCode(200)
            .extract().path("access_token");
        tokenExpiry = System.currentTimeMillis() + 3600_000; // 1 hour
    }
}
// Add in BaseTest: RestAssured.filters(new TokenRefreshFilter());`,
      },
      {
        type: 'quiz',
        question: {
          tr: 'Uzun süren test süitlerinde token yönetimi için en iyi yaklaşım nedir?',
          en: 'What is the best approach for token management in long-running test suites?',
        },
        options: [
          { id: 'a', text: { tr: 'Her test metodunda ayrı login yap', en: 'Login separately in every test method' } },
          { id: 'b', text: { tr: '@BeforeAll\'da bir kez token al', en: 'Get the token once in @BeforeAll' } },
          { id: 'c', text: { tr: 'Token refresh Filter kullan — 401\'de otomatik yeniler', en: 'Use a Token refresh Filter — automatically refreshes on 401' } },
          { id: 'd', text: { tr: 'Token\'ı sabit kodla', en: 'Hardcode the token' } },
        ],
        correct: 'c',
        explanation: {
          tr: 'Token refresh Filter en temiz çözüm: her test metoduna login kodu yazmak zorunda kalmazsın, 401 alındığında otomatik yenilenir, kod tekrarı sıfır.',
          en: 'The Token refresh Filter is the cleanest solution: no login code in every test method, automatically refreshes on 401, zero code duplication.',
        },
      },
    ],
  },

  // ── 4: POJO & Jackson ────────────────────────────────────────────────────────
  {
    title: { tr: '📦 POJO & Jackson — Tip-Safe API Testi', en: '📦 POJO & Jackson — Type-Safe API Testing' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🧱',
        content: {
          tr: 'String JSON yazmak sanki şifreli mesaj göndermek gibi — typo yapsan derleme hatası vermez, runtime\'da patlar. POJO kullanmak ise IDE\'nin seni uyarması, autocomplete desteği ve tip güvenliği demektir.',
          en: 'Writing raw String JSON is like sending a message in code — a typo gives no compile error, it just blows up at runtime. Using a POJO means the IDE warns you, autocomplete works, and you get full type safety.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'POJO Nedir? — Java Analogisi', en: 'What is a POJO? — Java Analogy' },
      },
      {
        type: 'text',
        content: {
          tr: 'Java\'da HashMap ile String key/value sakladığında typo yapabilirsin, tip güvenliği yoktur. POJO (Plain Old Java Object) ise alan isimlerini ve tiplerini sınıf olarak tanımlamaktır — tıpkı HashMap\'i type-safe hale getirmek gibi.',
          en: 'When you store key/value pairs in a Java HashMap, you can make typos and there is no type safety. A POJO (Plain Old Java Object) defines field names and types as a class — it is like making a HashMap type-safe.',
        },
      },
      {
        type: 'comparison',
        left: {
          label: { tr: '❌ String JSON (Kırılgan)', en: '❌ String JSON (Fragile)' },
          code: `// Typo: "nme" should be "name"
// No compile error — blows up at runtime!
String body = "{\\"nme\\": \\"Alice\\"," +
              "\\"job\\": \\"QA\\"}";

given().body(body)
    .post("/api/users");`,
          note: { tr: 'IDE\'nin typo\'yu yakalaması imkansız.', en: 'The IDE cannot catch this typo.' },
        },
        right: {
          label: { tr: '✅ POJO (Tip-Safe)', en: '✅ POJO (Type-Safe)' },
          code: `// IDE autocomplete + compile error
UserRequest req = UserRequest.builder()
    .name("Alice")   // .nme() → compile error!
    .job("QA")
    .build();

given().body(req)
    .post("/api/users");
// Jackson auto-converts to JSON`,
          note: { tr: 'IDE anında işaretler. Refactor otomatik.', en: 'IDE flags it instantly. Refactoring is automatic.' },
        },
      },
      {
        type: 'heading',
        text: { tr: 'Request POJO — Lombok ile Temiz Kod', en: 'Request POJO — Clean Code with Lombok' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// @Data     = @Getter + @Setter + @ToString + @EqualsAndHashCode
// @Builder  = UserRequest.builder().name("Alice").build()
// @JsonInclude(NON_NULL) = null fields are excluded from JSON output
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRequest {

    private String name;    // JSON: "name"
    private String job;     // JSON: "job"

    // API expects "first_name" but Java convention is "firstName"
    @JsonProperty("first_name") // Serialized as "first_name" in JSON
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;
}

// Build with only name and job → null fields omitted:
UserRequest req = UserRequest.builder().name("Alice").job("QA").build();
// → {"name":"Alice","job":"QA"}

// Build with all fields:
UserRequest req2 = UserRequest.builder()
    .firstName("Alice").lastName("Smith").job("Senior QA").build();
// → {"first_name":"Alice","last_name":"Smith","job":"Senior QA"}`,
      },
      {
        type: 'heading',
        text: { tr: 'Response POJO — API Cevabını Nesneye Dönüştür', en: 'Response POJO — Deserialize API Response into an Object' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// reqres.in GET /api/users/2 response:
// { "data": { "id":2, "email":"janet.weaver@reqres.in",
//             "first_name":"Janet", "last_name":"Weaver" } }

// @JsonIgnoreProperties(ignoreUnknown = true) is REQUIRED on every response POJO
// It prevents UnrecognizedPropertyException if the API adds new fields later
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SingleUserResponse {

    @JsonProperty("data")
    private UserData data;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class UserData {
        private int id;
        private String email;

        @JsonProperty("first_name")   // JSON "first_name" → Java firstName
        private String firstName;

        @JsonProperty("last_name")
        private String lastName;
    }
}

// Usage:
@Test
void getUser_shouldDeserializeCorrectly() {
    SingleUserResponse response = given().spec(spec)
        .when().get("/api/users/2")
        .then().statusCode(200)
        .extract().body().as(SingleUserResponse.class); // Auto-deserialize

    assertEquals(2, response.getData().getId());
    assertEquals("Janet", response.getData().getFirstName());
    assertTrue(response.getData().getEmail().contains("@"));
}`,
      },
      {
        type: 'heading',
        text: { tr: 'ObjectMapper — Manuel Kontrol', en: 'ObjectMapper — Manual Control' },
      },
      {
        type: 'code',
        language: 'java',
        code: `ObjectMapper mapper = new ObjectMapper()
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    // Equivalent to @JsonIgnoreProperties(ignoreUnknown = true)

// 1. POJO → JSON String  (Serialization)
String json = mapper.writeValueAsString(new UserRequest("Alice", "QA"));
// → {"name":"Alice","job":"QA"}

// 2. JSON String → POJO  (Deserialization)
String responseBody = """{"id":"456","name":"Alice","createdAt":"2024-01-15"}""";
UserResponse user = mapper.readValue(responseBody, UserResponse.class);
System.out.println(user.getName()); // Alice

// 3. Read dynamically without a POJO (ObjectNode)
String body = given().spec(spec).get("/api/users/1").asString();
ObjectNode node = mapper.readValue(body, ObjectNode.class);
String email = node.get("data").get("email").asText();
System.out.println(email); // george.bluth@reqres.in`,
      },
      {
        type: 'quiz',
        question: {
          tr: '@JsonIgnoreProperties(ignoreUnknown = true) neden önemlidir?',
          en: 'Why is @JsonIgnoreProperties(ignoreUnknown = true) important?',
        },
        options: [
          { id: 'a', text: { tr: 'Performansı artırır', en: 'It improves performance' } },
          { id: 'b', text: { tr: 'API yeni alan eklediğinde testlerin patlamasını önler', en: 'It prevents tests from blowing up when the API adds a new field' } },
          { id: 'c', text: { tr: 'Null alanları JSON\'a dahil etmez', en: 'It excludes null fields from JSON' } },
          { id: 'd', text: { tr: 'Serialization\'ı hızlandırır', en: 'It speeds up serialization' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'API geliştiricisi "avatar_thumb" gibi yeni bir alan ekleyebilir. Bunu POJO\'na eklemediysen UnrecognizedPropertyException fırlar. @JsonIgnoreProperties(ignoreUnknown = true) bu alanları sessizce atlar.',
          en: 'An API developer might add a new field like "avatar_thumb". Without this annotation, an UnrecognizedPropertyException is thrown. @JsonIgnoreProperties(ignoreUnknown = true) silently ignores unknown fields.',
        },
      },
    ],
  },

  // ── 5: Assertions ────────────────────────────────────────────────────────────
  {
    title: { tr: '✅ Assertions — Hamcrest Derinlemesine', en: '✅ Assertions — Hamcrest Deep Dive' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔍',
        content: {
          tr: 'Assertion, "beklediğim bu, aldığım bu, eşleşiyor mu?" sorusudur. Hamcrest matchers bu soruyu hem koda döker hem de hata olduğunda ne yanlış gittiğini net söyler.',
          en: 'An assertion asks: "I expected this, I got that — do they match?" Hamcrest matchers turn that question into code AND clearly tell you what went wrong when a test fails.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Tüm Önemli Hamcrest Matchers', en: 'All Important Hamcrest Matchers' },
      },
      {
        type: 'code',
        language: 'java',
        code: `import static org.hamcrest.Matchers.*;

.then()
    // ─── Equality ───────────────────────────────────────────
    .body("name", equalTo("Alice"))
    .body("name", not(equalTo("Bob")))
    .body("status", equalToIgnoringCase("ok"))

    // ─── Null checks ────────────────────────────────────────
    .body("id", notNullValue())
    .body("deletedAt", nullValue())
    .body("name", not(emptyString()))
    .body("name", not(blankString()))

    // ─── Numeric ────────────────────────────────────────────
    .body("age", greaterThan(0))
    .body("age", greaterThanOrEqualTo(18))
    .body("age", lessThan(150))
    .body("age", between(18, 65))

    // ─── String ─────────────────────────────────────────────
    .body("email", containsString("@"))
    .body("url", startsWith("https://"))
    .body("file", endsWith(".json"))
    .body("code", matchesPattern("[A-Z]{3}-\\\\d{4}"))

    // ─── Collections ────────────────────────────────────────
    .body("data", hasSize(6))
    .body("data", hasSize(greaterThan(0)))
    .body("data", not(empty()))
    .body("data.id", hasItem(3))
    .body("data.id", everyItem(greaterThan(0)))
    .body("data.name", everyItem(notNullValue()))

    // ─── Performance & Headers ──────────────────────────────
    .time(lessThan(3000L))
    .header("Content-Type", containsString("application/json"))

    // ─── Status ─────────────────────────────────────────────
    .statusCode(200)
    .statusCode(anyOf(equalTo(200), equalTo(201)));`,
      },
      {
        type: 'heading',
        text: { tr: 'Soft Assertions — Tüm Hataları Topla', en: 'Soft Assertions — Collect All Failures' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Problem: normal assertion stops at the first failure
// Solution: SoftAssertions — run all, report all failures at once

import org.assertj.core.api.SoftAssertions;

@Test
void userResponse_allFieldsValidation() {
    Response response = given().spec(spec)
        .when().get("/api/users/2")
        .then().extract().response();

    SoftAssertions soft = new SoftAssertions();

    soft.assertThat(response.statusCode())
        .as("HTTP Status Code")   // Label shown in error message
        .isEqualTo(200);

    soft.assertThat(response.<Integer>path("data.id"))
        .as("User ID").isGreaterThan(0);

    soft.assertThat(response.<String>path("data.email"))
        .as("Email format")
        .contains("@").doesNotContain(" ");

    soft.assertThat(response.<String>path("data.first_name"))
        .as("First name").isNotBlank().hasSizeLessThan(100);

    soft.assertAll(); // Execute all assertions, report all failures together
}`,
      },
      {
        type: 'quiz',
        question: {
          tr: '.body("data.id", everyItem(greaterThan(0))) ne doğrular?',
          en: 'What does .body("data.id", everyItem(greaterThan(0))) verify?',
        },
        options: [
          { id: 'a', text: { tr: 'data dizisinin ilk id\'si 0\'dan büyük', en: 'The first id in the data array is greater than 0' } },
          { id: 'b', text: { tr: 'data dizisindeki tüm id değerleri 0\'dan büyük', en: 'All id values in the data array are greater than 0' } },
          { id: 'c', text: { tr: 'data dizisinde en az bir id 0\'dan büyük', en: 'At least one id in the data array is greater than 0' } },
          { id: 'd', text: { tr: 'data dizisinin boyutu 0\'dan büyük', en: 'The size of the data array is greater than 0' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'everyItem() koleksiyonun HER elemanının koşulu sağlamasını test eder. hasItem() ise en az birinin sağlamasını test eder.',
          en: 'everyItem() checks that EVERY element in the collection satisfies the condition. hasItem() checks that at least one element satisfies it.',
        },
      },
    ],
  },

  // ── 6: JSON Path & Schema ────────────────────────────────────────────────────
  {
    title: { tr: '🗂️ JSON Path & Schema Validation', en: '🗂️ JSON Path & Schema Validation' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🗺️',
        content: {
          tr: '"data.users[0].address.city" — JSON Path, iç içe JSON\'da istediğin değere giden adrestir. Haritada koordinat gibi: latitude/longitude yerine nokta ve köşeli parantez kullanırsın.',
          en: '"data.users[0].address.city" — JSON Path is like a street address to the value you want inside nested JSON. Instead of latitude/longitude, you use dots and square brackets.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'extract() — Response\'dan Değer Çekme', en: 'extract() — Pulling Values from a Response' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Extract a String value
String email = given().spec(spec)
    .when().get("/api/users/2")
    .then().statusCode(200)
    .extract().path("data.email");
// → "janet.weaver@reqres.in"

// Extract a list (all emails on page 1)
List<String> emails = given().spec(spec)
    .when().get("/api/users?page=1")
    .then().extract().path("data.email");

// Get the full Response object to read multiple fields
Response res = given().spec(spec)
    .when().get("/api/users/2")
    .then().statusCode(200).extract().response();

String email2    = res.path("data.email");
String firstName = res.path("data.first_name");
int    id        = res.path("data.id");
String bodyStr   = res.asString();  // Entire body as a raw String`,
      },
      {
        type: 'heading',
        text: { tr: 'Gelişmiş JSON Path — Groovy Filtreler', en: 'Advanced JSON Path — Groovy Filters' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Groovy GPath — conditional search inside arrays

// Email of the user where id == 3
String email = given().spec(spec)
    .when().get("/api/users?page=1")
    .then().extract().path("data.find { it.id == 3 }.email");

// Names of all users with id > 4
List<String> names = given().spec(spec)
    .when().get("/api/users?page=1")
    .then().extract().path("data.findAll { it.id > 4 }.first_name");

// Works in assertions too:
.then()
    .body("data.find { it.id == 2 }.email",
          equalTo("janet.weaver@reqres.in"))
    .body("data.findAll { it.id > 3 }.size()", greaterThan(0));`,
      },
      {
        type: 'heading',
        text: { tr: 'JSON Schema Validation — Kontrat Testi', en: 'JSON Schema Validation — Contract Testing' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Schema: src/test/resources/schemas/single-user-schema.json
// Defines: required fields, types, formats

import static io.restassured.module.jsv.JsonSchemaValidator.*;

@Test
void getUser_shouldMatchJsonSchema() {
    given().spec(spec)
    .when().get("/api/users/2")
    .then()
        .statusCode(200)
        // Validates structure, types and required fields — in one line!
        .body(matchesJsonSchemaInClasspath("schemas/single-user-schema.json"));
    // Is id an integer? Is email a string? Is first_name required?
    // All checked automatically.
}`,
      },
      {
        type: 'tip',
        content: {
          tr: 'JSON Schema Validation, microservice mimarisinde "API Kontrat Testi" için idealdir. Backend ekibi yeni bir alan eklediğinde veya bir alanın tipini değiştirdiğinde testlerin otomatik olarak bozulmasını sağlar.',
          en: 'JSON Schema Validation is ideal for "API Contract Testing" in microservice architectures. When the backend team adds a new field or changes a field type, your tests automatically break — which is exactly what you want.',
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'extract().path("data.find { it.id == 3 }.email") ne döner?',
          en: 'What does extract().path("data.find { it.id == 3 }.email") return?',
        },
        options: [
          { id: 'a', text: { tr: 'data dizisindeki tüm email\'ler', en: 'All emails in the data array' } },
          { id: 'b', text: { tr: 'data dizisinde id=3 olan kullanıcının email\'i', en: 'The email of the user in the data array where id=3' } },
          { id: 'c', text: { tr: 'data dizisinin 3. elemanının email\'i (index 3)', en: 'The email of the 3rd element of the data array (index 3)' } },
          { id: 'd', text: { tr: 'Hata fırlatır', en: 'Throws an error' } },
        ],
        correct: 'b',
        explanation: {
          tr: 'find { it.id == 3 } Groovy\'de "id alanı 3\'e eşit olan elemanı bul" demektir. data[3] ise dizinin 4. elemanıdır — tamamen farklı şeyler!',
          en: 'find { it.id == 3 } in Groovy means "find the element where the id field equals 3". data[3] returns the 4th element (index 3) — two completely different things!',
        },
      },
    ],
  },

  // ── 7: Test Chaining ─────────────────────────────────────────────────────────
  {
    title: { tr: '🔗 Test Zinciri — Gerçek E2E Senaryolar', en: '🔗 Test Chaining — Real E2E Scenarios' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⛓️',
        content: {
          tr: 'Gerçek hayatta API testleri birbirinden bağımsız değildir. Önce kayıt ol, sonra giriş yap, sonra sepete ekle, sonra öde. Her adımın çıktısı bir sonrakinin girdisidir.',
          en: 'In real life, API tests are not independent of each other. First register, then login, then add to cart, then pay. The output of each step is the input of the next.',
        },
      },
      {
        type: 'heading',
        text: { tr: 'Tam E2E CRUD Zinciri (reqres.in)', en: 'Full E2E CRUD Chain (reqres.in)' },
      },
      {
        type: 'code',
        language: 'java',
        code: `@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserCrudE2ETest extends BaseTest {

    private static String createdUserId;
    private static String createdUserName;

    @Test @Order(1)
    @DisplayName("1️⃣ POST: Create new user")
    void step1_createUser() {
        UserRequest req = UserRequest.builder()
            .name("E2E Test User " + System.currentTimeMillis())
            .job("QA Automation")
            .build();

        createdUserId = given().spec(spec).body(req)
            .when().post("/api/users")
            .then().statusCode(201)
            .body("id", notNullValue())
            .extract().path("id");

        createdUserName = req.getName();
        assertNotNull(createdUserId, "Failed to get user ID!");
    }

    @Test @Order(2)
    @DisplayName("2️⃣ PUT: Update the user")
    void step2_updateUser() {
        assumeTrue(createdUserId != null, "step1 failed, skipping");

        given().spec(spec)
            .pathParam("id", createdUserId)
            .body(UserRequest.builder()
                .name(createdUserName + " UPDATED")
                .job("Senior QA").build())
        .when().put("/api/users/{id}")
        .then().statusCode(200)
            .body("name", equalTo(createdUserName + " UPDATED"))
            .body("updatedAt", notNullValue());
    }

    @Test @Order(3)
    @DisplayName("3️⃣ DELETE: Delete the user")
    void step3_deleteUser() {
        assumeTrue(createdUserId != null, "step1 failed, skipping");

        given().spec(spec).pathParam("id", createdUserId)
            .when().delete("/api/users/{id}")
            .then().statusCode(204);
    }
}`,
      },
      {
        type: 'quiz',
        question: {
          tr: 'JUnit 5\'te test sırasını garantilemek için ne kullanılır?',
          en: 'What is used to guarantee test execution order in JUnit 5?',
        },
        options: [
          { id: 'a', text: '@TestOrder annotation' },
          { id: 'b', text: '@TestMethodOrder(MethodOrderer.OrderAnnotation.class) + @Order(n)' },
          { id: 'c', text: { tr: 'Metot isimleri alfabetik sıralanır', en: 'Method names are sorted alphabetically' } },
          { id: 'd', text: { tr: 'JUnit 5\'te test sırası garanti edilemez', en: 'Test order cannot be guaranteed in JUnit 5' } },
        ],
        correct: 'b',
        explanation: {
          tr: '@TestMethodOrder(MethodOrderer.OrderAnnotation.class) sınıf seviyesinde, @Order(n) metot seviyesinde eklenir.',
          en: '@TestMethodOrder(MethodOrderer.OrderAnnotation.class) is added at class level, @Order(n) at method level. @Order(1) runs first, @Order(2) runs second.',
        },
      },
    ],
  },

  // ── 8: Real-Life Issues ──────────────────────────────────────────────────────
  {
    title: { tr: '🚨 Gerçek Hayat Sorunları ve Çözümleri', en: '🚨 Real-Life Problems and Solutions' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '🔧',
        content: {
          tr: 'Her deneyimli QA bu sorunlarla karşılaşmıştır. Çözümleri ezberlemek değil, sebebini anlamak önemli. Her sorunun altında "neden oluyor?" sorusunu sor.',
          en: 'Every experienced QA engineer has run into these problems. What matters is not memorizing solutions but understanding the root cause. Always ask "why is this happening?"',
        },
      },
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 1: SSL Hatası', en: '🚨 Problem 1: SSL Error' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// ERROR: javax.net.ssl.SSLHandshakeException: PKIX path building failed
// Cause: Self-signed or expired certificate in dev/staging environment
// Fix: add setRelaxedHTTPSValidation() to RequestSpecBuilder (dev/test only!)

spec = new RequestSpecBuilder()
    .setBaseUri("https://dev.api.company.com")
    .setRelaxedHTTPSValidation() // Skip SSL cert check — never in production!
    .build();

// Cause: App starts after tests in CI/CD
// Fix: health check loop
@BeforeAll
static void waitForService() throws InterruptedException {
    for (int i = 0; i < 10; i++) {
        try {
            int status = given().baseUri("https://api.example.com")
                .when().get("/health").statusCode();
            if (status == 200) return; // Ready!
        } catch (Exception ignored) {}
        System.out.println("Waiting... " + (i+1) + "/10");
        Thread.sleep(3000);
    }
    throw new RuntimeException("Service did not start in 30 seconds!");
}`,
      },
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 2: Flaky Test', en: '🚨 Problem 2: Flaky Test' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Cause: Async operation — API returns 202 immediately but data takes time
// ❌ WRONG — checks before data is ready
given().post("/api/orders").then().statusCode(202);
given().get("/api/orders/latest").then().body("status", equalTo("PROCESSED"));
// status might still be "PENDING" → flaky!

// ✅ CORRECT — Awaitility polling
@Test
void createOrder_shouldEventuallyBeProcessed() {
    String orderId = given().spec(spec)
        .body(new OrderRequest("ITEM-001", 2))
        .when().post("/api/orders")
        .then().statusCode(202)
        .extract().path("id");

    Awaitility.await()
        .atMost(30, TimeUnit.SECONDS)       // Max wait time
        .pollInterval(2, TimeUnit.SECONDS)  // Check every 2 seconds
        .until(() -> {
            String status = given().spec(spec)
                .pathParam("id", orderId)
                .when().get("/api/orders/{id}")
                .then().statusCode(200)
                .extract().path("status");
            return "PROCESSED".equals(status);
        });
}`,
      },
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 3: Paralel Testlerde Veri Çakışması', en: '🚨 Problem 3: Data Collision in Parallel Tests' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// ❌ WRONG — fixed test data causes collisions in parallel runs
UserRequest req = new UserRequest("alice@test.com", "QA");

// ✅ CORRECT — unique data every time
// Method 1: UUID
String email = "user_" + UUID.randomUUID() + "@example.com";

// Method 2: Faker
Faker faker = new Faker();
UserRequest uniqueReq = UserRequest.builder()
    .name(faker.name().fullName())
    .job(faker.job().title())
    .build();

// Method 3: Cleanup in @AfterEach
private List<String> createdIds = new ArrayList<>();

@AfterEach
void cleanup() {
    createdIds.forEach(id ->
        given().spec(spec).pathParam("id", id)
            .when().delete("/api/users/{id}")
            .then().statusCode(anyOf(equalTo(204), equalTo(404)))
    );
    createdIds.clear();
}`,
      },
      {
        type: 'heading',
        text: { tr: '🚨 Sorun 4: 429 Rate Limiting & JSON Parse Hatası', en: '🚨 Problem 4: 429 Rate Limiting & JSON Parse Error' },
      },
      {
        type: 'code',
        language: 'java',
        code: `// Rate limit: API returns 429 Too Many Requests
// Fix: pause between tests or use a retry Filter
@BeforeEach
void rateLimitGuard() throws InterruptedException {
    Thread.sleep(500); // Wait 500ms before each test
}

// JSON parse error: UnrecognizedPropertyException
// Fix: @JsonIgnoreProperties(ignoreUnknown = true) on every response POJO

// JSON parse error: response is HTML, not JSON (error page)
// Fix: check status code BEFORE parsing
Response res = given().spec(spec).get("/api/users").then().extract().response();
if (res.statusCode() != 200) {
    System.err.println("Error body: " + res.asString()); // Print raw body
    fail("Expected 200, got: " + res.statusCode());
}
UserResponse user = res.as(UserResponse.class); // Only parse on 200`,
      },
      {
        type: 'error-dictionary',
        framework: 'REST Assured',
        errors: [
          {
            error: 'javax.net.ssl.SSLHandshakeException',
            fullMessage: 'PKIX path building failed: unable to find valid certification path to requested target',
            cause: {
              tr: 'SSL sertifikası self-signed, süresi dolmuş veya CA tarafından tanınmıyor.',
              en: 'SSL certificate is self-signed, expired, or not recognized by the CA.',
            },
            solution: {
              tr: 'RequestSpecBuilder\'a .setRelaxedHTTPSValidation() ekle. Production\'da kullanma!',
              en: 'Add .setRelaxedHTTPSValidation() to RequestSpecBuilder. Never use in production!',
            },
            codeWrong: `new RequestSpecBuilder()
    .setBaseUri("https://dev.api.company.com")
    .build(); // SSL error!`,
            codeFixed: `new RequestSpecBuilder()
    .setBaseUri("https://dev.api.company.com")
    .setRelaxedHTTPSValidation() // Skip SSL
    .build();`,
          },
          {
            error: 'com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException',
            fullMessage: 'Unrecognized field "avatar_thumb" (class UserResponse), not marked as ignorable',
            cause: {
              tr: 'API yeni bir alan ekledi ("avatar_thumb"), ama response POJO\'sunda tanımlanmamış.',
              en: 'The API added a new field ("avatar_thumb") that is not defined in your response POJO.',
            },
            solution: {
              tr: 'Response POJO\'na @JsonIgnoreProperties(ignoreUnknown = true) ekle.',
              en: 'Add @JsonIgnoreProperties(ignoreUnknown = true) to your response POJO.',
            },
            codeWrong: `public class UserResponse {
    private int id;
    private String email;
    // New API field "avatar_thumb" → EXPLODES!
}`,
            codeFixed: `@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResponse {
    private int id;
    private String email;
    // Unknown fields are silently ignored
}`,
          },
          {
            error: '1 expectation failed — Expected status code <200> but was <401>',
            fullMessage: 'java.lang.AssertionError: 1 expectation failed. Expected status code <200> but was <401>.',
            cause: {
              tr: 'Token eksik, süresi dolmuş veya "Bearer " prefix\'i eksik.',
              en: 'Token is missing, expired, or the "Bearer " prefix is forgotten.',
            },
            solution: {
              tr: '.auth().oauth2(token) kullan — "Bearer " prefix\'ini otomatik ekler.',
              en: 'Use .auth().oauth2(token) — it adds the "Bearer " prefix automatically.',
            },
            codeWrong: `given()
    .header("Authorization", token) // Missing "Bearer " prefix!
    .get("/api/protected");`,
            codeFixed: `given()
    .auth().oauth2(token) // Adds "Bearer " automatically
    .get("/api/protected");`,
          },
          {
            error: 'io.restassured.path.json.exception.JsonPathException',
            fullMessage: 'No results for path: $.data.users',
            cause: {
              tr: 'JSON path yanlış. API response yapısı değişmiş veya yazım hatası var.',
              en: 'Wrong JSON path. The API response structure changed or there is a typo.',
            },
            solution: {
              tr: 'Önce response.asString() ile ham body\'yi yazdır, path\'i doğrula.',
              en: 'First print the raw body with response.asString(), then verify the path.',
            },
            codeWrong: `.extract().path("data.users[0].email")
// But response is: {"data": [{"email":"..."}]}
// "users" key does not exist!`,
            codeFixed: `System.out.println(response.asString()); // Print first
.extract().path("data[0].email")       // Correct path`,
          },
        ],
      },
      {
        type: 'quiz',
        question: {
          tr: '"Flaky test" için en yaygın çözüm nedir?',
          en: 'What is the most common fix for a flaky test?',
        },
        options: [
          { id: 'a', text: { tr: 'Thread.sleep(5000) ekle', en: 'Add Thread.sleep(5000)' } },
          { id: 'b', text: { tr: 'Testi sil', en: 'Delete the test' } },
          { id: 'c', text: { tr: 'Awaitility ile polling — koşul sağlanana kadar kontrol et', en: 'Polling with Awaitility — check until the condition is met' } },
          { id: 'd', text: { tr: 'Testi tek başına çalıştır', en: 'Run the test in isolation' } },
        ],
        correct: 'c',
        explanation: {
          tr: 'Thread.sleep sabit bekler — çok az ya da çok fazla. Awaitility\'de koşul sağlandığı an geçer. Hem güvenilir hem de hızlı.',
          en: 'Thread.sleep waits a fixed amount — too little or too much. Awaitility proceeds the moment the condition is met. Both reliable and fast.',
        },
      },
    ],
  },

  // ── 9: Tool Comparison ────────────────────────────────────────────────────────
  {
    title: { tr: '🆚 API Test Araçları Karşılaştırması', en: '🆚 API Testing Tools Comparison' },
    blocks: [
      {
        type: 'simple-box',
        emoji: '⚖️',
        content: {
          tr: 'Doğru araç, projenin diline ve ekibin deneyimine göre değişir. REST Assured Java projeleri için güçlüdür, Postman manuel test için hızlıdır, Karate hem teknik hem teknik olmayan kullanıcılar için uygundur.',
          en: 'The right tool depends on your project language and team experience. REST Assured is powerful for Java projects, Postman is fast for manual testing, and Karate suits both technical and non-technical users.',
        },
      },
      {
        type: 'table',
        headers: ['Feature', 'REST Assured', 'Postman', 'Karate DSL', 'RestTemplate'],
        rows: [
          ['Language', 'Java DSL', 'GUI + JS', 'Gherkin', 'Java (Spring)'],
          ['Learning curve', 'Medium', 'Low', 'Low', 'High'],
          ['CI/CD integration', '✅ Native', '⚠️ Newman', '✅ Native', '✅ Native'],
          ['POJO / Type safety', '✅ Full', '❌ None', '⚠️ Limited', '✅ Full'],
          ['JSON Path', '✅ Groovy GPath', '✅ Yes', '✅ Yes', '❌ Manual'],
          ['JSON Schema', '✅ Yes', '✅ Yes', '✅ Yes', '❌ No'],
          ['Mock server', '❌ No', '⚠️ Limited', '✅ Yes', '❌ No'],
          ['Allure reporting', '✅ Full', '❌ GUI only', '✅ Yes', '⚠️ JUnit XML'],
          ['Best for', 'Java API automation', 'Manual exploration', 'BDD / low-code', 'Spring internals'],
        ],
      },
      {
        type: 'comparison',
        left: {
          label: '☕ REST Assured (Java DSL)',
          code: `@Test
void createAndVerifyUser() {
  String id = given()
    .spec(spec)
    .body(new UserRequest("Alice","QA"))
  .when()
    .post("/api/users")
  .then()
    .statusCode(201)
    .body("name", equalTo("Alice"))
    .extract().path("id");

  assertNotNull(id);
}`,
          note: { tr: 'IDE autocomplete, derleme kontrolü, tip güvenliği.', en: 'IDE autocomplete, compile-time checks, type safety.' },
        },
        right: {
          label: '🥋 Karate DSL (Gherkin)',
          code: `Feature: User API

Scenario: Create user with POST
  Given url 'https://reqres.in'
  And path '/api/users'
  And request {name:'Alice',job:'QA'}
  When method POST
  Then status 201
  And match response.name == 'Alice'
  And match response.id != null`,
          note: { tr: 'Java bilmeyenler okuyabilir. IDE desteği zayıf.', en: 'Readable by non-Java developers. IDE support is weaker.' },
        },
      },
      {
        type: 'quiz',
        question: {
          tr: 'Takımda Java bilen kimse yoksa hangi API test aracı daha uygun?',
          en: 'If nobody on the team knows Java, which API testing tool is more appropriate?',
        },
        options: [
          { id: 'a', text: 'REST Assured' },
          { id: 'b', text: { tr: 'Karate DSL — Gherkin diliyle, Java bilgisi gerekmez', en: 'Karate DSL — written in Gherkin, no Java knowledge required' } },
          { id: 'c', text: 'RestTemplate' },
          { id: 'd', text: 'HttpClient' },
        ],
        correct: 'b',
        explanation: {
          tr: 'Karate DSL, Gherkin tabanlı Given/When/Then sözdizimi kullanır. Java kodu yazmadan API testleri yazılabilir.',
          en: 'Karate DSL uses Gherkin-based Given/When/Then syntax. API tests can be written without writing Java code. Both technical and non-technical team members can read them.',
        },
      },
    ],
  },

  // ── 10: Interview Questions ───────────────────────────────────────────────────
  {
    title: { tr: '💼 Mülakat Soruları', en: '💼 Interview Questions' },
    blocks: [
      {
        type: 'interview-questions',
        topic: 'REST Assured',
        questions: [
          {
            level: 'basic',
            q: { tr: 'REST Assured nedir ve ne için kullanılır?', en: 'What is REST Assured and what is it used for?' },
            a: {
              tr: 'REST Assured, Java ile REST API testleri yazmak için kullanılan açık kaynak DSL kütüphanesidir. given().when().then() sözdizimi ile HTTP istekleri gönderir, Hamcrest matchers ile doğrular. CI/CD pipeline\'ına native entegre olur.',
              en: 'REST Assured is an open-source DSL library for writing REST API tests in Java. It sends HTTP requests with given().when().then() syntax and verifies responses with Hamcrest matchers. It integrates natively with CI/CD pipelines.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'given(), when(), then() bloklarının görevleri nelerdir?', en: 'What are the roles of given(), when(), and then()?' },
            a: {
              tr: 'given(): Request ön koşulları — headers, params, body, auth. when(): HTTP metodu ve URL. then(): Response doğrulama — statusCode, body, header, time. BDD stilinden gelir.',
              en: 'given(): request pre-conditions — headers, params, body, auth. when(): HTTP method and URL. then(): response verification — statusCode, body, header, time. Comes from BDD style.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'POJO neden önemlidir?', en: 'Why are POJOs important?' },
            a: {
              tr: 'String JSON\'da typo yapsan runtime\'da patlar. POJO ile tip güvenliği ve IDE desteği kazanırsın. Jackson otomatik serialize/deserialize yapar.',
              en: 'A typo in String JSON blows up at runtime. With a POJO you get type safety and IDE support. Jackson handles serialization/deserialization automatically.',
            },
          },
          {
            level: 'basic',
            q: { tr: '@JsonIgnoreProperties(ignoreUnknown = true) ne zaman kullanılır?', en: 'When should @JsonIgnoreProperties(ignoreUnknown = true) be used?' },
            a: {
              tr: 'Her response POJO\'suna eklenmeli. API yeni alan eklediğinde UnrecognizedPropertyException\'ı önler.',
              en: 'It should be added to every response POJO. It prevents UnrecognizedPropertyException when the API adds a new field.',
            },
          },
          {
            level: 'basic',
            q: { tr: 'BaseTest neden kullanılır?', en: 'Why is a BaseTest class used?' },
            a: {
              tr: 'RequestSpecification\'ı bir kez kurar. Tüm testler extends ile miras alır. DRY prensibini uygular.',
              en: 'It configures the RequestSpecification once. All test classes inherit it via extends. Applies the DRY principle.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'extract().path() ile extract().body().as() farkı nedir?', en: 'What is the difference between extract().path() and extract().body().as()?' },
            a: {
              tr: '.path() tek bir değeri primitive olarak alır. .as(Class) tüm body\'yi POJO\'ya dönüştürür — birden fazla alana erişmek için kullanılır.',
              en: '.path() extracts a single value as a primitive. .as(Class) converts the entire body to a POJO — use it when you need access to multiple fields.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'Flaky testlerle nasıl başa çıkılır?', en: 'How do you deal with flaky tests?' },
            a: {
              tr: 'En yaygın sebep async işlem. Çözüm: Awaitility ile polling. Thread.sleep kullanma — sabit bekler, güvenilir değil.',
              en: 'The most common cause is an async operation. Fix: use Awaitility for polling. Avoid Thread.sleep — it waits a fixed amount and is unreliable.',
            },
          },
          {
            level: 'intermediate',
            q: { tr: 'JSON Schema Validation ne sağlar?', en: 'What does JSON Schema Validation provide?' },
            a: {
              tr: 'Response yapısını (zorunlu alanlar, tipler, formatlar) tek satırda doğrular. Contract testing için idealdir.',
              en: 'It validates the response structure (required fields, types, formats) in a single line. Ideal for contract testing in microservice architectures.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Token auto-refresh nasıl implement edilir?', en: 'How do you implement token auto-refresh?' },
            a: {
              tr: 'REST Assured Filter arayüzünü implement et. filter() içinde: token süresi dolduysa yenile, header\'a ekle. 401 alınca da yenile ve tekrar dene.',
              en: 'Implement the REST Assured Filter interface. In filter(): refresh if expired, add to header. On 401, refresh and retry. Add globally via RestAssured.filters().',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Paralel testlerde test izolasyonu nasıl sağlanır?', en: 'How do you ensure test isolation in parallel tests?' },
            a: {
              tr: '(1) UUID/timestamp ile benzersiz test verisi. (2) Static değişken yerine ThreadLocal. (3) @AfterEach\'de oluşturulan kaynakları sil.',
              en: '(1) Unique test data with UUID/timestamp. (2) ThreadLocal instead of static variables. (3) Delete created resources in @AfterEach.',
            },
          },
          {
            level: 'advanced',
            q: { tr: 'Postman collection\'ını REST Assured\'a nasıl migrate edersiniz?', en: 'How would you migrate a Postman collection to REST Assured?' },
            a: {
              tr: '(1) Folder → test sınıfı. (2) Request → @Test metodu. (3) baseUrl → BaseTest/ConfigReader. (4) Environment variables → properties dosyaları. (5) Tests scripts → .then().body(). (6) Collection Runner → mvn test.',
              en: '(1) Folder → test class. (2) Request → @Test method. (3) baseUrl → BaseTest/ConfigReader. (4) Environment variables → properties files. (5) Tests scripts → .then().body(). (6) Collection Runner → mvn test.',
            },
          },
        ],
      },
      {
        type: 'glossary-section',
        terms: [
          { term: 'DSL', definition: { tr: 'Domain-Specific Language — belirli alan için özelleştirilmiş mini dil.', en: 'Domain-Specific Language — a mini-language specialized for a specific domain.' } },
          { term: 'RequestSpecification', definition: { tr: 'Tekrar kullanılabilir request ayarları: baseUri, headers, auth.', en: 'Reusable request settings: baseUri, headers, auth. Created with RequestSpecBuilder.' } },
          { term: 'Hamcrest', definition: { tr: 'Java assertion kütüphanesi. equalTo(), notNullValue(), hasSize() gibi matchers.', en: 'Java assertion library providing readable matchers like equalTo(), notNullValue(), hasSize().' } },
          { term: 'POJO', definition: { tr: 'Plain Old Java Object — request/response body\'yi tip-safe temsil eden sade Java sınıfı.', en: 'Plain Old Java Object — a simple Java class that represents request/response body in a type-safe way.' } },
          { term: 'Jackson', definition: { tr: 'Java ↔ JSON dönüşüm kütüphanesi. REST Assured otomatik kullanır.', en: 'Java ↔ JSON conversion library. REST Assured uses it automatically when it is on the classpath.' } },
          { term: 'JsonPath', definition: { tr: '"data[0].email" gibi JSON navigasyon dili.', en: 'A JSON navigation language like "data[0].email". Used with extract().path().' } },
          { term: 'extract()', definition: { tr: 'Response\'dan değer çıkarmak için kullanılır.', en: 'Used to pull values from a response: .extract().path("token") or .extract().body().as(MyClass.class)' } },
          { term: 'Filter', definition: { tr: 'Her request/response döngüsüne müdahale eden interceptor.', en: 'An interceptor that hooks into every request/response cycle. Used for token refresh, logging, rate limiting.' } },
          { term: 'Awaitility', definition: { tr: 'Async işlemleri test etmek için polling kütüphanesi.', en: 'A polling library for testing async operations. The clean alternative to Thread.sleep.' } },
          { term: 'Contract Testing', definition: { tr: 'API\'nin belirlenen kontrata uyup uymadığını doğrulama. JSON Schema ile yapılır.', en: 'Verifying that an API conforms to a defined contract. Implemented with JSON Schema validation.' } },
        ],
      },
    ],
  },
]

// ─── Hero & Tabs ──────────────────────────────────────────────────────────────

const trHero = {
  title: '🧪 REST Assured',
  subtitle: 'Java ile API Test Otomasyonu — Sıfırdan Gerçek Projeye',
  intro: 'REST Assured, Java\'da REST API testleri yazmak için kullanılan DSL kütüphanesidir. given().when().then() sözdizimi, POJO desteği, JSON Schema validation ve CI/CD entegrasyonu ile kurumsal projelerde sektör standardı haline gelmiştir.',
}

const enHero = {
  title: '🧪 REST Assured',
  subtitle: 'Java API Test Automation — Zero to Real Projects',
  intro: 'REST Assured is a DSL library for writing REST API tests in Java. With given().when().then() syntax, POJO support, JSON Schema validation, and CI/CD integration, it has become the industry standard in enterprise API testing.',
}

const trTabs = [
  '🏠 Neden REST Assured?', '⚙️ Kurulum', '📡 Temel İstekler', '🔐 Authentication',
  '📦 POJO & Jackson', '✅ Assertions', '🗂️ JSON Path & Schema',
  '🔗 Test Zinciri', '🚨 Gerçek Hayat Sorunları', '🆚 Araç Karşılaştırması', '💼 Mülakat Soruları',
]

const enTabs = [
  '🏠 Why REST Assured?', '⚙️ Setup', '📡 Basic Requests', '🔐 Authentication',
  '📦 POJO & Jackson', '✅ Assertions', '🗂️ JSON Path & Schema',
  '🔗 Test Chaining', '🚨 Real-Life Issues', '🆚 Tool Comparison', '💼 Interview Q&A',
]

// ─── Export ───────────────────────────────────────────────────────────────────

export const restAssuredData = {
  tr: { hero: trHero, tabs: trTabs, sections },
  en: { hero: enHero, tabs: enTabs, sections },
}
