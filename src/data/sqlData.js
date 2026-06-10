const sections = [
  // ── 0. INTRO & WHY ──────────────────────────────────────────────────────────
  {
    title: '🎯 What is SQL & Why Does Every QA Engineer Need It?',
    blocks: [
      { type: 'heading', text: 'What is a Database?' },
      { type: 'text', content: 'A database is an organized collection of structured data stored electronically. Think of it as a super-powered spreadsheet that can store millions of rows, link related data together, and answer complex questions in milliseconds. Every app you test stores its data somewhere — that somewhere is almost always a database.' },
      { type: 'heading', text: 'What is SQL?' },
      { type: 'text', content: 'SQL (Structured Query Language) is the standard language for communicating with relational databases. You use it to ask questions ("which users signed up today?"), add data ("create this new order"), update records, and delete them. It\'s been the industry standard since the 1970s and works across MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and more.' },
      { type: 'heading', text: 'Why QA Engineers Must Know SQL' },
      {
        type: 'grid', cols: 3,
        items: [
          { icon: '✅', label: 'Verify Backend State', desc: 'After a UI action, query the DB to confirm data was saved correctly — not just the UI says so.' },
          { icon: '🌱', label: 'Seed Test Data', desc: 'INSERT test users, products, orders directly before tests run — no manual setup.' },
          { icon: '🧹', label: 'Cleanup After Tests', desc: 'DELETE test records after each run so the next run starts clean.' },
          { icon: '🔍', label: 'Backend Validation', desc: 'Verify business rules: order total = sum of line items, FK constraints, data integrity.' },
          { icon: '⚡', label: 'Faster Than UI', desc: 'A DB query takes milliseconds. Clicking through UI to find the same data takes minutes.' },
          { icon: '🐛', label: 'Find Hidden Bugs', desc: 'UI shows success but DB was not updated — SQL exposes the truth.' },
        ]
      },
      { type: 'heading', text: 'Key Database Terminology' },
      {
        type: 'table',
        headers: ['Term', 'Meaning', 'Example'],
        rows: [
          ['Table', 'Stores data in rows and columns (like a spreadsheet)', '"users" table with columns: id, email, age'],
          ['Row / Record', 'One entry in a table', 'A single user: {id:1, email:"alice@test.com"}'],
          ['Column / Field', 'An attribute/property stored per row', '"email", "created_at", "is_active"'],
          ['Primary Key', 'Unique identifier for each row — never NULL, never repeated', '"id" column with AUTO_INCREMENT'],
          ['Foreign Key', 'Column that references a PK in another table — creates a relationship', '"orders.user_id" → "users.id"'],
          ['Index', 'Data structure that speeds up searches on a column', 'INDEX on "email" column → fast WHERE email=?'],
          ['Schema', 'The blueprint of a database — all tables, columns, types, constraints', 'CREATE TABLE definitions'],
          ['Query', 'A request sent to the database using SQL', 'SELECT * FROM users WHERE age > 25'],
        ]
      },
      { type: 'heading', text: 'Popular Databases Compared' },
      {
        type: 'table',
        headers: ['Database', 'Type', 'Best For', 'Free?'],
        rows: [
          ['MySQL', 'Open-source', 'Web apps, most common in industry', '✅ Yes'],
          ['PostgreSQL', 'Open-source', 'Complex queries, JSON, enterprise apps', '✅ Yes'],
          ['SQLite', 'Embedded / serverless', 'Local dev, testing, mobile apps', '✅ Yes'],
          ['SQL Server', 'Microsoft commercial', 'Windows/.NET enterprise', '✅ Express edition'],
          ['Oracle', 'Commercial enterprise', 'Large-scale banking/finance', '❌ Paid'],
        ]
      },
      { type: 'tip', content: 'Start learning with SQLiteOnline.com — runs in your browser, zero installation. For a real environment, install DBeaver (free GUI) and connect to SQLite or MySQL.' },
      { type: 'heading', text: 'SQL in the QA Workflow' },
      {
        type: 'visual', variant: 'boxes',
        title: 'How SQL Connects to QA Testing',
        items: [
          { icon: '🧪', label: 'Test Script', desc: 'Playwright / pytest' },
          { arrow: true },
          { icon: '🖥️', label: 'App UI/API', desc: 'Makes DB changes' },
          { arrow: true },
          { icon: '🗄️', label: 'Database', desc: 'MySQL / PostgreSQL' },
          { arrow: true },
          { icon: '🔍', label: 'SQL Query', desc: 'You verify here!', highlight: true },
        ],
        note: 'After every test action, a SQL query can verify the database state was updated correctly — not just what the UI shows.',
      },
      {
        type: 'visual', variant: 'table',
        title: 'Example: A Typical Database Table',
        tables: [{
          name: 'users',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'name', type: 'VARCHAR' },
            { name: 'email', type: 'VARCHAR' },
            { name: 'role', type: 'VARCHAR' },
            { name: 'created_at', type: 'DATETIME' },
          ],
          rows: [
            { cells: [1, 'Alice', 'alice@test.com', 'admin', '2024-01-10'] },
            { cells: [2, 'Bob', 'bob@test.com', 'user', '2024-01-12'] },
            { cells: [3, 'Carol', 'carol@test.com', 'user', '2024-01-15'], highlighted: true },
          ]
        }],
        note: 'Each row is a record. Each column is a field. id is the Primary Key — it uniquely identifies every row.',
      },
      {
        type: 'quiz',
        question: 'What does SQL stand for?',
        options: ['Standard Query Logic', 'Structured Query Language', 'Simple Question Language', 'Sequential Query Library'],
        correct: 1,
        explanation: 'SQL = Structured Query Language. It\'s been the standard language for relational databases since the 1970s and is used by MySQL, PostgreSQL, SQLite, Oracle, and SQL Server.',
      },
    ],
  },

  // ── 1. INSTALLATION ─────────────────────────────────────────────────────────
  {
    title: '📦 Setting Up Your SQL Environment',
    blocks: [
      { type: 'heading', text: 'Option A: Zero-Install Online Editors (Start Here)' },
      {
        type: 'list', icon: '🌐',
        items: [
          { label: 'db-fiddle.com', desc: 'Best option. MySQL, PostgreSQL, SQLite. Schema + query split view.' },
          { label: 'sqliteonline.com', desc: 'Runs SQLite in your browser. Upload a .db file or create tables.' },
          { label: 'sqlfiddle.com', desc: 'Classic. Multiple DB engines. Good for sharing examples.' },
        ]
      },
      { type: 'heading', text: 'Option B: SQLite CLI (Lightest Local Option)' },
      {
        type: 'steps',
        items: [
          'Windows: Download "sqlite-tools-win32" from sqlite.org/download.html and extract to C:\\sqlite\\',
          'Mac: Already installed! Run: sqlite3 —— or install via Homebrew: brew install sqlite',
          'Linux: sudo apt install sqlite3',
          'Create a database: sqlite3 mytest.db',
          'Verify: SELECT sqlite_version();',
        ]
      },
      {
        type: 'code',
        code: `-- SQLite CLI quick reference:
sqlite3 mytest.db        -- open or create database

.tables                  -- list all tables
.schema users            -- show CREATE TABLE for "users"
.headers on              -- show column headers in output
.mode column             -- aligned column output
.quit                    -- exit SQLite

SELECT sqlite_version();`,
        expected: `3.43.0`
      },
      { type: 'heading', text: 'Option C: MySQL Community Server' },
      {
        type: 'steps',
        items: [
          'Windows: Download MySQL Installer from dev.mysql.com/downloads/installer/ → choose "Developer Default"',
          'Mac: brew install mysql → brew services start mysql → mysql -u root',
          'Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root',
          'Verify installation: SELECT VERSION();',
        ]
      },
      {
        type: 'code',
        code: `-- Connect and verify:
mysql -u root -p          -- connect with root user (enter password)

SELECT VERSION();         -- check MySQL version`,
        expected: `+-----------+\n| VERSION() |\n+-----------+\n| 8.0.35    |\n+-----------+`
      },
      { type: 'heading', text: 'Option D: DBeaver GUI (Recommended for Beginners)' },
      { type: 'text', content: 'DBeaver is a free universal database GUI that works with ALL databases. Much easier than the command line — you can browse tables visually and run queries with autocomplete.' },
      {
        type: 'steps',
        items: [
          'Download DBeaver Community from dbeaver.io (free)',
          'Install and launch DBeaver',
          'Click "New Database Connection" (the plug icon, top left)',
          'Select your DB type: SQLite, MySQL, or PostgreSQL',
          'SQLite: click Browse → select your .db file (or create new)',
          'MySQL/PostgreSQL: enter host, port, database name, username, password',
          'Click "Test Connection" — must show green "Connected" before Finish',
          'Open SQL Editor with Ctrl+] and start writing queries',
        ]
      },
      { type: 'heading', text: 'Using SQL in Python (for Test Automation)' },
      {
        type: 'code',
        code: `# SQLite — built into Python, no install needed:
import sqlite3

conn   = sqlite3.connect("test.db")   # connect (creates file if not exists)
cursor = conn.cursor()

cursor.execute("SELECT * FROM users WHERE age > 25")
rows = cursor.fetchall()              # get all results as list of tuples

for row in rows:
    print(row)

conn.close()

# PostgreSQL — install: pip install psycopg2-binary
import psycopg2

conn = psycopg2.connect(
    host="localhost", database="testdb",
    user="postgres",  password="mypassword"
)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM orders WHERE status = 'pending'")
count = cursor.fetchone()[0]
print(f"Pending orders: {count}")
conn.close()`,
      },
      { type: 'heading', text: '☕ If You Know Java: Database Connection Bridge' },
      {
        type: 'java-compare',
        topic: 'DB Connection Setup (DriverManager vs sqlite3)',
        why: 'Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.',
        why_en: 'Java uses JDBC — you add a driver to pom.xml/build.gradle, then call DriverManager.getConnection() with a JDBC URL. Python has sqlite3 built-in (zero install!) and psycopg2 for PostgreSQL. Pattern is identical: open connection → use → close.',
        java: `// Java: JDBC connection via DriverManager
import java.sql.*;

// Open connection (MySQL example):
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/testdb",
    "root", "password"
);
Statement stmt = conn.createStatement();
ResultSet rs   = stmt.executeQuery("SELECT * FROM users");

// ALWAYS close — use try-with-resources:
try (Connection c = DriverManager.getConnection(url, user, pass)) {
    Statement s = c.createStatement();
    ResultSet r = s.executeQuery("SELECT COUNT(*) FROM users");
}   // auto-closed here`,
        python: `# Python: sqlite3 — BUILT-IN, zero install!
import sqlite3

conn = sqlite3.connect("test.db")  # creates file if not exists
cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()           # list of tuples
conn.close()

# Context manager = try-with-resources:
with sqlite3.connect("test.db") as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
# conn auto-closed after with block

# PostgreSQL (pip install psycopg2-binary):
import psycopg2
conn = psycopg2.connect(
    host="localhost", dbname="testdb",
    user="postgres", password="secret"
)`,
        note: 'sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency.',
        note_en: 'sqlite3 is in the Python standard library — no Maven, no pip, no pom.xml! Just import and use. pip install psycopg2-binary is equivalent to adding a single Maven dependency.',
      },
      {
        type: 'java-compare',
        topic: 'Dependency Setup (Maven pom.xml vs pip)',
        why: 'In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.',
        why_en: 'In Java you declare JDBC driver dependencies in pom.xml and Maven downloads them. In Python, pip install downloads the driver. For SQLite — nothing at all, it ships with Python.',
        java: `<!-- Java: pom.xml — add JDBC driver dependency -->
<dependencies>

  <!-- MySQL -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
  </dependency>

  <!-- PostgreSQL -->
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.6.0</version>
  </dependency>

</dependencies>
<!-- then: mvn install -->`,
        python: `# Python: pip — no config file needed at all!

# SQLite: NOTHING — built in to Python!
import sqlite3           # works with zero setup

# MySQL:
# pip install mysql-connector-python
import mysql.connector

# PostgreSQL:
# pip install psycopg2-binary
import psycopg2

# requirements.txt (optional, like pom.xml):
# psycopg2-binary==2.9.9
# mysql-connector-python==8.2.0`,
        note: 'Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything.',
        note_en: 'Python wins on speed-to-first-query for SQLite. For real project deps, use requirements.txt (same idea as pom.xml). pip install -r requirements.txt installs everything.',
      },
    ],
  },

  // ── 2. FOUNDATIONS ──────────────────────────────────────────────────────────
  {
    title: '🟢 Level 1: SQL Foundations',
    blocks: [
      { type: 'heading', text: 'CREATE TABLE — Defining Structure', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Create a test_results table to store automation run data:
CREATE TABLE test_results (
    id          INT           PRIMARY KEY AUTO_INCREMENT,  -- unique ID, auto-increments
    test_name   VARCHAR(100)  NOT NULL,                    -- text up to 100 chars, required
    status      VARCHAR(10)   NOT NULL,                    -- 'PASS', 'FAIL', 'SKIP'
    duration_ms INT           DEFAULT 0,                   -- test duration in milliseconds
    run_date    DATETIME      DEFAULT CURRENT_TIMESTAMP,   -- auto-set to now
    environment VARCHAR(20)   DEFAULT 'staging',           -- which env was tested
    is_flaky    BOOLEAN       DEFAULT FALSE                 -- marks known flaky tests
);

-- Common SQL data types:
-- INT / BIGINT        → whole numbers (28, 1000000)
-- DECIMAL(10,2)       → precise decimals, e.g. prices (99.99)
-- VARCHAR(n)          → variable text up to n characters
-- TEXT                → unlimited text (descriptions, logs)
-- BOOLEAN / TINYINT   → true/false
-- DATE                → 2024-01-15
-- DATETIME/TIMESTAMP  → 2024-01-15 14:30:00`,
      },
      { type: 'heading', text: 'INSERT INTO — Adding Data', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Single row insert:
INSERT INTO test_results (test_name, status, duration_ms, environment)
VALUES ('Login Test', 'PASS', 1234, 'staging');

-- Multiple rows at once (much faster than one at a time!):
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Signup Test',    'PASS', 890),
    ('Checkout Flow',  'FAIL', 5400),
    ('Profile Update', 'SKIP', 0),
    ('Password Reset', 'PASS', 1100),
    ('Search Feature', 'FAIL', 8200);

-- Copy rows from one table to another:
INSERT INTO test_archive
SELECT * FROM test_results WHERE run_date < '2023-01-01';`,
      },
      { type: 'heading', text: 'SELECT — Reading Data', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Select all columns and all rows:
SELECT * FROM test_results;

-- Select specific columns only:
SELECT test_name, status, duration_ms FROM test_results;

-- WHERE — filter rows:
SELECT * FROM test_results WHERE status = 'FAIL';
SELECT * FROM test_results WHERE duration_ms > 3000;        -- slow tests
SELECT * FROM test_results WHERE status = 'FAIL' AND duration_ms > 5000;
SELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');

-- LIKE — pattern matching:
SELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains "Login"
SELECT * FROM test_results WHERE test_name LIKE 'Sign%';    -- starts with "Sign"

-- ORDER BY — sort results:
SELECT * FROM test_results ORDER BY duration_ms DESC;       -- slowest first
SELECT * FROM test_results ORDER BY run_date DESC LIMIT 10; -- last 10 runs

-- LIMIT + OFFSET — pagination:
SELECT * FROM test_results LIMIT 10;            -- first 10 rows
SELECT * FROM test_results LIMIT 10 OFFSET 20;  -- rows 21-30 (page 3)

-- DISTINCT — unique values only:
SELECT DISTINCT environment FROM test_results;`,
        expected: `+----+----------------+--------+-------------+\n| id | test_name      | status | duration_ms |\n+----+----------------+--------+-------------+\n|  3 | Checkout Flow  | FAIL   |        5400 |\n|  5 | Search Feature | FAIL   |        8200 |\n+----+----------------+--------+-------------+`
      },
      { type: 'heading', text: 'UPDATE and DELETE', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- UPDATE — modify existing rows:
UPDATE test_results SET status = 'PASS' WHERE id = 3;
UPDATE test_results SET is_flaky = TRUE WHERE test_name = 'Search Feature';

-- DELETE — remove rows:
DELETE FROM test_results WHERE status = 'SKIP';
DELETE FROM test_results WHERE run_date < NOW() - INTERVAL 30 DAY;

-- SAFE PATTERN: always SELECT first to verify, THEN DELETE:
SELECT * FROM test_results WHERE environment = 'test-cleanup';  -- verify
DELETE FROM test_results WHERE environment = 'test-cleanup';    -- then delete`,
      },
      { type: 'warning', content: 'ALWAYS include WHERE with UPDATE and DELETE! Without WHERE, every row in the table is affected. Run a SELECT with the same WHERE first to verify which rows will be changed.' },
      { type: 'heading', text: 'NULL Values', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- NULL means "no value / unknown" — NOT the same as 0 or empty string!
-- You CANNOT use = to check for NULL — it always returns false:

SELECT * FROM test_results WHERE error_msg IS NULL;      -- correct
SELECT * FROM test_results WHERE error_msg IS NOT NULL;  -- has an error
-- SELECT * WHERE error_msg = NULL;   WRONG — always returns 0 rows!

-- COALESCE: return first non-NULL value:
SELECT test_name,
       COALESCE(error_msg, 'No error') AS error_display
FROM test_results;

-- NULLIF: return NULL if two values are equal (avoid division by zero!):
SELECT test_name, NULLIF(duration_ms, 0) AS duration
FROM test_results;`,
      },
      { type: 'heading', text: 'Interactive Example: test_results Table', difficulty: '🟢 Beginner' },
      {
        type: 'code',
        code: `-- Copy this into db-fiddle.com and run it!
-- Select MySQL 8.0 as the engine.

-- 1. Create the table:
CREATE TABLE test_results (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    test_name   VARCHAR(100) NOT NULL,
    status      VARCHAR(10)  NOT NULL,
    duration_ms INT DEFAULT 0
);

-- 2. Insert test data:
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Login Test',      'PASS',  1200),
    ('Checkout Flow',   'FAIL',  5400),
    ('Signup Test',     'PASS',   890),
    ('Profile Update',  'FAIL',  3100),
    ('Search Feature',  'PASS',  2200),
    ('Logout Test',     'SKIP',     0);

-- 3. Query it:
SELECT * FROM test_results ORDER BY duration_ms DESC;
SELECT * FROM test_results WHERE status = 'FAIL';
SELECT COUNT(*) AS total, status FROM test_results GROUP BY status;`,
        expected: `+----+----------------+--------+\n| id | test_name      | status |\n+----+----------------+--------+\n|  2 | Checkout Flow  | FAIL   |\n|  4 | Profile Update | FAIL   |\n+----+----------------+--------+`
      },
      { type: 'heading', text: 'SQL Query Execution Order — The Secret Most Beginners Miss' },
      { type: 'text', content: 'SQL does NOT execute top-to-bottom like regular code. It follows a specific internal order. This is WHY you can\'t use SELECT aliases in WHERE, and WHY aggregate functions go in HAVING not WHERE.' },
      {
        type: 'visual', variant: 'flow',
        title: 'SQL Clause Evaluation Order (Step by Step)',
        note: 'You write SELECT at the top, but it executes almost LAST. This is why aliases defined in SELECT aren\'t available in WHERE!',
        steps: [
          { num: '1', label: 'FROM', desc: 'Load tables' },
          { num: '2', label: 'JOIN', desc: 'Combine' },
          { num: '3', label: 'WHERE', desc: 'Filter rows', highlight: true },
          { num: '4', label: 'GROUP BY', desc: 'Group' },
          { num: '5', label: 'HAVING', desc: 'Filter groups', highlight: true },
          { num: '6', label: 'SELECT', desc: 'Pick columns' },
          { num: '7', label: 'ORDER BY', desc: 'Sort' },
          { num: '8', label: 'LIMIT', desc: 'Slice' },
        ],
      },
      {
        type: 'visual', variant: 'table',
        title: 'Our Sample Data — test_results Table',
        tables: [{
          name: 'test_results',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'test_name', type: 'VARCHAR' },
            { name: 'status', type: 'VARCHAR' },
            { name: 'duration_ms', type: 'INT' },
            { name: 'environment', type: 'VARCHAR' },
          ],
          rows: [
            { cells: [1, 'Login Test', 'PASS', 1200, 'staging'] },
            { cells: [2, 'Checkout Flow', 'FAIL', 5400, 'staging'], highlighted: true },
            { cells: [3, 'Signup Test', 'PASS', 890, 'prod'] },
            { cells: [4, 'Profile Update', 'FAIL', 3100, 'prod'], highlighted: true },
            { cells: [5, 'Search Feature', 'PASS', 2200, 'staging'] },
            { cells: [6, 'Logout Test', 'SKIP', 0, 'staging'] },
          ]
        }],
        note: 'Highlighted rows = FAIL status. Try: SELECT * FROM test_results WHERE status = \'FAIL\' → returns rows 2 and 4.',
      },
      { type: 'heading', text: 'NULL — The Most Common SQL Mistake' },
      { type: 'text', content: 'NULL means "no value / unknown" — it is NOT zero, it is NOT an empty string. Any comparison with NULL returns NULL (not true/false). This trips up every SQL beginner.' },
      {
        type: 'comparison',
        left: {
          label: '❌ Wrong — = NULL never works',
          code: `SELECT * FROM users WHERE email = NULL;
-- Returns 0 rows EVERY TIME!
-- Even if NULL values exist.
-- Why? NULL = NULL → NULL (not true)`,
          note: 'Never use = or != to check for NULL',
        },
        right: {
          label: '✅ Correct — IS NULL / IS NOT NULL',
          code: `SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
-- COALESCE: replace NULL with a default:
SELECT name, COALESCE(email, 'no email') FROM users;`,
          note: 'IS NULL and IS NOT NULL always work correctly',
        },
      },
      {
        type: 'quiz',
        question: 'A query returns 0 rows when you filter: WHERE discount = NULL. Why?',
        options: [
          'There are no NULL discounts in the table',
          'NULL comparisons with = always return NULL (not TRUE), so no rows match',
          'You need quotes: WHERE discount = "NULL"',
          'NULL is automatically converted to 0',
        ],
        correct: 1,
        explanation: 'Any comparison with NULL using = or != returns NULL, which is treated as FALSE. Use IS NULL or IS NOT NULL instead. This is one of the most common SQL bugs.',
      },
      { type: 'heading', text: '☕ If You Know Java: Database Access Bridge' },
      {
        type: 'java-compare',
        topic: 'DB Connection (DriverManager vs sqlite3)',
        why: 'Java uses JDBC DriverManager with a URL + credentials. Python uses lightweight driver modules (sqlite3 is built-in, psycopg2 for PostgreSQL). The connection pattern is the same — the API differs.',
        java: `// Java: JDBC connection
import java.sql.*;
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb",
    "username", "password"
);
// Always close — use try-with-resources:
try (Connection c = DriverManager.getConnection(url, user, pass)) {
    // use c here — auto-closed
}`,
        python: `# Python: sqlite3 (built-in, zero install!)
import sqlite3
conn = sqlite3.connect("mydb.sqlite")

# PostgreSQL:
import psycopg2
conn = psycopg2.connect(
    host="localhost", dbname="mydb",
    user="username", password="password"
)

# Context manager — auto-closes like try-with-resources:
with sqlite3.connect("mydb.sqlite") as conn:
    cursor = conn.cursor()`,
        note: 'Python sqlite3 is built into Python — no pip install. For MySQL: mysql-connector-python; PostgreSQL: psycopg2.',
      },
      {
        type: 'java-compare',
        topic: 'Executing SELECT → Iterating Results',
        why: 'Java uses ResultSet with rs.next() loop and column-by-name getters. Python cursor.fetchall() returns a simple list of tuples — far less boilerplate.',
        java: `// Java: Statement + ResultSet
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(
    "SELECT test_name, status FROM test_results WHERE status='FAIL'"
);
while (rs.next()) {
    String name = rs.getString("test_name");
    String status = rs.getString("status");
    System.out.println(name + " → " + status);
}
rs.close(); stmt.close();`,
        python: `# Python: cursor + fetchall
cursor = conn.cursor()
cursor.execute(
    "SELECT test_name, status FROM test_results WHERE status='FAIL'"
)
rows = cursor.fetchall()  # list of tuples
for name, status in rows:
    print(f"{name} → {status}")

# Single row — like rs.next() once:
cursor.execute("SELECT COUNT(*) FROM test_results")
count = cursor.fetchone()[0]`,
        note: 'cursor.fetchall() returns all rows as a list of tuples. cursor.fetchone() returns one row or None — equivalent to rs.next() called once.',
      },
      { type: 'heading', text: '☕ If You Know Java: DML Operations Bridge' },
      {
        type: 'java-compare',
        topic: 'INSERT → JPA persist() vs SQL INSERT INTO',
        why: 'In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.',
        why_en: 'In Java enterprise projects you likely used JPA/Hibernate (EntityManager.persist) to insert objects. In SQL you write INSERT INTO directly. Both end up doing the same SQL — JPA just generates it for you.',
        java: `// Java: JPA EntityManager
@Entity
@Table(name = "test_results")
public class TestResult {
    @Id @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String testName;
    private String status;
}

// Insert: no SQL needed — JPA generates it
EntityManager em = emf.createEntityManager();
em.getTransaction().begin();
TestResult r = new TestResult();
r.setTestName("Login Test");
r.setStatus("PASS");
em.persist(r);          // ← generates: INSERT INTO test_results ...
em.getTransaction().commit();`,
        sql: `-- Direct SQL: you write it yourself
INSERT INTO test_results (test_name, status, duration_ms)
VALUES ('Login Test', 'PASS', 1234);

-- Multiple rows at once (JPA needs a loop or batch):
INSERT INTO test_results (test_name, status, duration_ms) VALUES
    ('Signup Test',   'PASS', 890),
    ('Checkout Flow', 'FAIL', 5400);

-- Copy rows (JPA: query + persist loop):
INSERT INTO test_archive
SELECT * FROM test_results WHERE run_date < '2024-01-01';`,
        note: 'SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity.',
        note_en: 'SQL INSERT is explicit and powerful — batch inserts and INSERT-SELECT have no JPA equivalent without custom queries. Direct SQL is preferred in test automation for speed and simplicity.',
      },
      {
        type: 'java-compare',
        topic: 'UPDATE/DELETE → JPA merge()/remove() vs SQL',
        why: 'JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.',
        why_en: 'JPA abstracts UPDATE and DELETE through entity state changes. SQL gives you direct control — update/delete exactly the rows you specify with WHERE.',
        java: `// Java: JPA update — find then mutate
EntityManager em = ...;
em.getTransaction().begin();

TestResult r = em.find(TestResult.class, 3L);  // SELECT first
r.setStatus("PASS");         // mark as mutated
em.merge(r);                 // generates: UPDATE test_results SET status='PASS' WHERE id=3

// JPA delete:
TestResult toDelete = em.find(TestResult.class, 3L);
em.remove(toDelete);         // generates: DELETE FROM test_results WHERE id=3

em.getTransaction().commit();`,
        sql: `-- SQL UPDATE: direct, no find() needed
UPDATE test_results
SET    status = 'PASS'
WHERE  id = 3;

-- Update multiple rows at once (JPA needs a loop):
UPDATE test_results
SET    is_flaky = TRUE
WHERE  test_name LIKE '%Search%';

-- SQL DELETE: also direct
DELETE FROM test_results WHERE status = 'SKIP';

-- Safe pattern: SELECT first to verify, then DELETE
SELECT * FROM test_results WHERE environment = 'cleanup';
DELETE FROM test_results WHERE environment = 'cleanup';`,
        note: 'SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common.',
        note_en: 'SQL UPDATE and DELETE with WHERE can affect many rows in one statement. JPA needs individual entity loads for each row. In test automation, direct SQL cleanup is faster and more common.',
      },
    ],
  },

  // ── 3. INTERMEDIATE ─────────────────────────────────────────────────────────
  {
    title: '🟡 Level 2: Intermediate SQL',
    blocks: [
      { type: 'heading', text: 'Aggregate Functions', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- Aggregate functions summarize multiple rows into one value:
SELECT COUNT(*)                 AS total_tests    FROM test_results;
SELECT COUNT(*) FILTER (WHERE status='PASS') AS passed FROM test_results;  -- PostgreSQL
SELECT SUM(duration_ms)         AS total_ms       FROM test_results;
SELECT AVG(duration_ms)         AS avg_ms         FROM test_results;
SELECT MIN(duration_ms)         AS fastest_ms     FROM test_results;
SELECT MAX(duration_ms)         AS slowest_ms     FROM test_results;

-- Round decimals:
SELECT ROUND(AVG(duration_ms), 0) AS avg_ms FROM test_results;`,
        expected: `+-------------+\n| total_tests |\n+-------------+\n|           6 |\n+-------------+`
      },
      { type: 'heading', text: 'GROUP BY and HAVING', difficulty: '🟡 Intermediate' },
      { type: 'text', content: 'GROUP BY groups rows with the same value in a column. HAVING filters those groups (like WHERE but for aggregate results). You CANNOT use COUNT/SUM/etc. in a WHERE clause — use HAVING instead.' },
      {
        type: 'code',
        code: `-- Count tests by status:
SELECT status, COUNT(*) AS count
FROM test_results
GROUP BY status
ORDER BY count DESC;

-- Average duration per environment (only envs with > 3 tests):
SELECT environment,
       COUNT(*)            AS total,
       ROUND(AVG(duration_ms), 0) AS avg_ms
FROM test_results
GROUP BY environment
HAVING COUNT(*) > 3          -- HAVING filters groups (not rows!)
ORDER BY avg_ms DESC;

-- WHERE (filter before grouping) + HAVING (filter after):
SELECT test_name, COUNT(*) AS run_count
FROM test_results
WHERE status = 'FAIL'        -- only FAIL rows
GROUP BY test_name
HAVING COUNT(*) > 2;         -- tests that failed more than 2 times`,
        expected: `+--------+-------+\n| status | count |\n+--------+-------+\n| PASS   |     3 |\n| FAIL   |     2 |\n| SKIP   |     1 |\n+--------+-------+`
      },
      { type: 'heading', text: 'JOINs — Combining Tables', difficulty: '🟡 Intermediate' },
      { type: 'text', content: 'JOINs let you query data from multiple related tables in one go. Essential for any real-world database where data is split across tables.' },
      {
        type: 'code',
        code: `-- Our tables:
-- testers:  id, name, email
-- bugs:     id, title, status, tester_id (FK → testers.id), project_id (FK → projects.id)
-- projects: id, name, deadline

-- INNER JOIN: only rows matching in BOTH tables
SELECT t.name AS tester, b.title AS bug, b.status
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id;
-- Rows with no matching tester OR no matching bug are EXCLUDED

-- LEFT JOIN: ALL rows from left table + matching from right (NULL if no match)
SELECT t.name, COUNT(b.id) AS assigned_bugs
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Testers with 0 bugs still appear (assigned_bugs = 0)

-- RIGHT JOIN: ALL rows from right table + matching from left
-- (rarely used — usually rewrite as LEFT JOIN with tables swapped)

-- Multi-table JOIN:
SELECT t.name AS tester, p.name AS project, b.title AS bug, b.status
FROM testers t
JOIN bugs b      ON t.id = b.tester_id
JOIN projects p  ON b.project_id = p.id
WHERE b.status = 'OPEN'
ORDER BY p.name, t.name;`,
      },
      { type: 'heading', text: 'Subqueries', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- Subquery in WHERE (scalar subquery):
SELECT test_name, duration_ms
FROM test_results
WHERE duration_ms > (SELECT AVG(duration_ms) FROM test_results);
-- tests that are slower than average

-- Subquery with IN:
SELECT t.name
FROM testers t
WHERE t.id IN (
    SELECT DISTINCT tester_id FROM bugs WHERE status = 'OPEN'
);
-- testers who have at least one open bug

-- Subquery in FROM (derived table — must be aliased):
SELECT environment, avg_ms
FROM (
    SELECT environment, AVG(duration_ms) AS avg_ms
    FROM test_results
    GROUP BY environment
) AS env_stats
WHERE avg_ms > 2000;`,
      },
      { type: 'heading', text: 'LIKE, BETWEEN, IN', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- LIKE: pattern matching
-- % = any number of characters, _ = exactly one character
SELECT * FROM test_results WHERE test_name LIKE '%Login%';  -- contains
SELECT * FROM test_results WHERE test_name LIKE 'Sign_p%';  -- starts with Sign?p

-- BETWEEN: inclusive range
SELECT * FROM test_results WHERE duration_ms BETWEEN 1000 AND 3000;
SELECT * FROM test_results WHERE run_date BETWEEN '2024-01-01' AND '2024-01-31';

-- IN: matches any value in a list
SELECT * FROM test_results WHERE status IN ('FAIL', 'SKIP');
SELECT * FROM test_results WHERE environment NOT IN ('prod', 'staging');

-- Aliases make output readable:
SELECT
    t.test_name  AS "Test Name",
    t.duration_ms / 1000.0 AS "Duration (sec)",
    t.status
FROM test_results AS t
WHERE t.status != 'SKIP';`,
      },
      { type: 'heading', text: 'Bug Tracking DB — Interactive Example', difficulty: '🟡 Intermediate' },
      {
        type: 'code',
        code: `-- Paste this into db-fiddle.com (MySQL 8.0)

CREATE TABLE testers  (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE projects (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE bugs (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(100),
    status     VARCHAR(20) DEFAULT 'OPEN',
    priority   VARCHAR(10) DEFAULT 'MEDIUM',
    tester_id  INT, project_id INT,
    FOREIGN KEY (tester_id)  REFERENCES testers(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

INSERT INTO testers  VALUES (1,'Alice'),(2,'Bob'),(3,'Carol');
INSERT INTO projects VALUES (1,'WebApp'),(2,'Mobile'),(3,'API');
INSERT INTO bugs (title, status, priority, tester_id, project_id) VALUES
    ('Login fails on Safari',   'OPEN',   'HIGH',   1, 1),
    ('Broken image on profile', 'CLOSED', 'LOW',    1, 1),
    ('API timeout on checkout', 'OPEN',   'HIGH',   2, 3),
    ('Wrong error message',     'OPEN',   'MEDIUM', 2, 2),
    ('Crash on empty search',   'OPEN',   'HIGH',   3, 1);

-- Who has the most open bugs?
SELECT te.name, COUNT(*) AS open_bugs
FROM testers te
JOIN bugs b ON te.id = b.tester_id
WHERE b.status = 'OPEN'
GROUP BY te.id, te.name
ORDER BY open_bugs DESC;`,
        expected: `+-------+-----------+\n| name  | open_bugs |\n+-------+-----------+\n| Alice |         2 |\n| Bob   |         2 |\n| Carol |         1 |\n+-------+-----------+`
      },
      { type: 'heading', text: 'Visual JOIN Guide — See Exactly Which Rows Are Returned' },
      { type: 'text', content: 'The 4 diagrams below use the same data. Click "Eşleşmeleri Göster" to highlight matched rows, then "Sonucu Göster" to see the query result. This is the fastest way to truly understand JOINs.' },
      {
        type: 'visual', variant: 'join',
        joinType: 'INNER JOIN',
        leftTable: {
          name: 'testers',
          rows: [
            { label: '1 | Alice', matched: true },
            { label: '2 | Bob', matched: true },
            { label: '3 | Carol', matched: false },
          ]
        },
        rightTable: {
          name: 'bugs',
          rows: [
            { label: '1 | Login fails | t=1', matched: true },
            { label: '2 | Broken img | t=1', matched: true },
            { label: '3 | API timeout | t=2', matched: true },
          ]
        },
        resultHeaders: ['tester', 'bug_title', 'status'],
        resultRows: [
          ['Alice', 'Login fails on Safari', 'OPEN'],
          ['Alice', 'Broken image on profile', 'CLOSED'],
          ['Bob', 'API timeout on checkout', 'OPEN'],
        ],
        explanation: 'INNER JOIN returns ONLY rows that match in BOTH tables. Carol has no bugs — she is completely excluded from the result.',
      },
      {
        type: 'visual', variant: 'join',
        joinType: 'LEFT JOIN',
        leftTable: {
          name: 'testers',
          rows: [
            { label: '1 | Alice', matched: true },
            { label: '2 | Bob', matched: true },
            { label: '3 | Carol', matched: false, nullFill: true },
          ]
        },
        rightTable: {
          name: 'bugs',
          rows: [
            { label: '1 | Login fails | t=1', matched: true },
            { label: '2 | Broken img | t=1', matched: true },
            { label: '3 | API timeout | t=2', matched: true },
          ]
        },
        resultHeaders: ['tester', 'bug_count'],
        resultRows: [
          ['Alice', 2],
          ['Bob', 1],
          ['Carol', 0],
        ],
        explanation: 'LEFT JOIN returns ALL rows from the LEFT table (testers), plus matches from bugs. Carol appears with bug_count=0 — LEFT JOIN is perfect for "count per user including zeros".',
      },
      {
        type: 'visual', variant: 'join',
        joinType: 'RIGHT JOIN',
        leftTable: {
          name: 'testers',
          rows: [
            { label: '1 | Alice', matched: true },
            { label: '2 | Bob', matched: true },
            { label: '3 | Carol', matched: false },
          ]
        },
        rightTable: {
          name: 'bugs',
          rows: [
            { label: '1 | Login fails | t=1', matched: true },
            { label: '2 | Broken img | t=1', matched: true },
            { label: '3 | API timeout | t=2', matched: true },
            { label: '4 | Crash | t=99 (no tester!)', matched: false, nullFill: true },
          ]
        },
        resultHeaders: ['tester', 'bug_title'],
        resultRows: [
          ['Alice', 'Login fails on Safari'],
          ['Alice', 'Broken image on profile'],
          ['Bob', 'API timeout on checkout'],
          [null, 'Crash on empty search'],
        ],
        explanation: 'RIGHT JOIN returns ALL rows from the RIGHT table (bugs). Bug #4 has no tester — it still appears with tester = NULL. Rarely used — most developers rewrite as LEFT JOIN with tables swapped.',
      },
      {
        type: 'comparison',
        left: {
          label: '❌ Slow — Subquery for every row',
          code: `SELECT name,
  (SELECT COUNT(*) FROM bugs
   WHERE tester_id = t.id) AS bug_count
FROM testers t;
-- Runs inner SELECT once per tester row!`,
          note: 'Correlated subquery: O(n) inner queries',
        },
        right: {
          label: '✅ Fast — Single JOIN + GROUP BY',
          code: `SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Single pass through both tables`,
          note: 'LEFT JOIN: handles 0 bugs correctly too',
        },
      },
      {
        type: 'quiz',
        question: 'Which JOIN type returns ALL rows from the left table, including rows with NO matches in the right table?',
        options: ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 2,
        explanation: 'LEFT JOIN (also called LEFT OUTER JOIN) returns every row from the left table. For right-table columns with no match, NULL values appear. Use it when you need "all X, even if they have no related Y" — like all testers including those with 0 bugs.',
      },
      { type: 'heading', text: '☕ If You Know Java: PreparedStatement & Transactions' },
      {
        type: 'java-compare',
        topic: 'PreparedStatement → Parameterized Query',
        why: 'SQL Injection prevention! Java uses ? placeholders with PreparedStatement. Python uses the same concept — %s (MySQL/PostgreSQL) or ? (SQLite). Never concatenate user input into SQL strings!',
        java: `// Java: PreparedStatement — SQL injection safe!
String sql = "SELECT * FROM users WHERE email = ? AND is_active = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, userEmail);   // 1-indexed params
ps.setBoolean(2, true);
ResultSet rs = ps.executeQuery();

// INSERT with PreparedStatement:
PreparedStatement ins = conn.prepareStatement(
    "INSERT INTO test_results (test_name, status) VALUES (?, ?)"
);
ins.setString(1, testName);
ins.setString(2, "PASS");
ins.executeUpdate();`,
        python: `# Python: parameterized query (%s for MySQL/psycopg2)
cursor.execute(
    "SELECT * FROM users WHERE email = %s AND is_active = %s",
    (user_email, True)   # tuple of values — NOT f-string!
)

# SQLite uses ? (same as Java PreparedStatement):
cursor.execute(
    "SELECT * FROM users WHERE email = ? AND is_active = ?",
    (user_email, 1)
)

# INSERT:
cursor.execute(
    "INSERT INTO test_results (test_name, status) VALUES (%s, %s)",
    (test_name, "PASS")
)
conn.commit()  # don't forget!`,
        note: 'Python psycopg2/MySQL uses %s. SQLite uses ? (same as Java!). NEVER use f-strings or + concatenation for SQL values — always use parameterized queries.',
      },
      {
        type: 'java-compare',
        topic: 'Transaction Management (commit / rollback)',
        why: 'Transactions guarantee all-or-nothing changes — critical for test data setup. Java calls setAutoCommit(false). Python\'s drivers have auto-commit off by default, so you explicitly call commit().',
        java: `// Java: manual transaction control
try {
    conn.setAutoCommit(false);  // begin transaction
    stmt.executeUpdate("INSERT INTO orders ...");
    stmt.executeUpdate("UPDATE inventory SET qty=qty-1 ...");
    conn.commit();               // save ALL changes
} catch (SQLException e) {
    conn.rollback();             // undo ALL changes
    throw e;
} finally {
    conn.setAutoCommit(true);
}`,
        python: `# Python: explicit commit / rollback
try:
    cursor.execute("INSERT INTO orders ...")
    cursor.execute("UPDATE inventory SET qty=qty-1 ...")
    conn.commit()    # save ALL changes
except Exception:
    conn.rollback()  # undo ALL changes
    raise

# Cleanest: "with" context manager (psycopg2):
with conn:   # auto-commits on success, rolls back on error
    cursor.execute("INSERT INTO orders ...")
    cursor.execute("UPDATE inventory SET qty=qty-1 ...")`,
        note: 'QA tip: wrap test data setup in a transaction and rollback after each test — keeps the DB clean without writing DELETE cleanup queries.',
      },
    ],
  },

  // ── 4. ADVANCED ─────────────────────────────────────────────────────────────
  {
    title: '🔴 Level 3: Advanced SQL',
    blocks: [
      { type: 'heading', text: 'Window Functions', difficulty: '🔴 Advanced' },
      { type: 'text', content: 'Window functions perform calculations across a "window" of related rows WITHOUT collapsing them like GROUP BY does. Each row gets its own result while also knowing about surrounding rows.' },
      {
        type: 'code',
        code: `-- ROW_NUMBER: sequential number (ties each get unique numbers)
-- RANK:       ties get same number, then GAPS (1,1,3)
-- DENSE_RANK: ties get same number, NO gaps (1,1,2)

SELECT test_name, duration_ms,
       ROW_NUMBER()  OVER (ORDER BY duration_ms DESC) AS rn,
       RANK()        OVER (ORDER BY duration_ms DESC) AS rnk,
       DENSE_RANK()  OVER (ORDER BY duration_ms DESC) AS dense_rnk
FROM test_results;

-- PARTITION BY: reset numbering per group (like GROUP BY without collapsing)
SELECT tester_name, project, bug_count,
       RANK() OVER (PARTITION BY project ORDER BY bug_count DESC) AS rank_in_project
FROM tester_project_bugs;
-- → Rank 1 per project's top bug-finder

-- LAG / LEAD: access previous/next row values
SELECT run_date, total_failures,
       LAG(total_failures)  OVER (ORDER BY run_date) AS prev_failures,
       total_failures - LAG(total_failures) OVER (ORDER BY run_date) AS change
FROM daily_test_stats;

-- Running total:
SELECT run_date, new_tests,
       SUM(new_tests) OVER (ORDER BY run_date) AS cumulative_tests
FROM daily_stats;`,
      },
      { type: 'heading', text: 'CTEs — Common Table Expressions', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- CTE: a named subquery at the top of your statement.
-- Makes complex queries readable by breaking into named steps.

WITH failed_tests AS (
    SELECT test_name, COUNT(*) AS fail_count
    FROM test_results
    WHERE status = 'FAIL'
    GROUP BY test_name
),
recent_passes AS (
    SELECT test_name, MAX(run_date) AS last_pass_date
    FROM test_results
    WHERE status = 'PASS'
    GROUP BY test_name
)
-- Now use both CTEs together:
SELECT f.test_name, f.fail_count, p.last_pass_date
FROM failed_tests f
LEFT JOIN recent_passes p ON f.test_name = p.test_name
ORDER BY f.fail_count DESC;

-- Recursive CTE (for hierarchical data like org charts, nested categories):
WITH RECURSIVE org AS (
    SELECT id, name, manager_id, 0 AS level
    FROM employees WHERE manager_id IS NULL          -- start: CEO

    UNION ALL

    SELECT e.id, e.name, e.manager_id, o.level + 1
    FROM employees e
    JOIN org o ON e.manager_id = o.id
)
SELECT level, name FROM org ORDER BY level;`,
      },
      { type: 'heading', text: 'Transactions — ACID Properties', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- A transaction is a group of SQL statements that execute as ONE unit.
-- Either ALL succeed (COMMIT) or ALL are undone (ROLLBACK).
-- ACID: Atomicity, Consistency, Isolation, Durability

-- Example: Transfer test case from one project to another
START TRANSACTION;

UPDATE test_cases SET project_id = 2 WHERE id = 42;  -- move test case
INSERT INTO audit_log (action, test_id)              -- log the action
       VALUES ('moved_to_project_2', 42);

-- If everything looks good:
COMMIT;

-- If something went wrong:
-- ROLLBACK;   -- undo BOTH statements

-- SAVEPOINT: partial rollback
START TRANSACTION;
INSERT INTO test_results (test_name, status) VALUES ('Test A', 'PASS');
SAVEPOINT after_a;
INSERT INTO test_results (test_name, status) VALUES ('Test B', 'FAIL');
ROLLBACK TO SAVEPOINT after_a;  -- undo Test B, keep Test A
COMMIT;                          -- commits only Test A`,
      },
      { type: 'heading', text: 'Indexes — Speed Up Queries', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- Create indexes on columns used frequently in WHERE/JOIN:
CREATE INDEX idx_results_status  ON test_results(status);
CREATE INDEX idx_results_run_date ON test_results(run_date);
CREATE INDEX idx_bugs_tester     ON bugs(tester_id);       -- FK columns always!
CREATE INDEX idx_results_env_status ON test_results(environment, status);  -- composite

-- Unique index (also enforces uniqueness):
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- View indexes on a table:
SHOW INDEX FROM test_results;      -- MySQL
\di test_results                   -- PostgreSQL

-- EXPLAIN: see how MySQL plans to execute a query
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';
-- "type: ALL" = full table scan (slow, needs index)
-- "type: ref" = using index (fast!)

-- Add index and check improvement:
CREATE INDEX idx_status ON test_results(status);
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';
-- Now shows: key: idx_status, rows: ~10 (not all rows)`,
      },
      { type: 'heading', text: 'Views', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `-- A VIEW is a saved SQL query that acts like a virtual table.
-- Great for: reusable complex queries, hiding complexity, security.

CREATE VIEW active_failures AS
    SELECT t.name AS tester, b.title, b.priority, p.name AS project
    FROM bugs b
    JOIN testers t  ON b.tester_id  = t.id
    JOIN projects p ON b.project_id = p.id
    WHERE b.status = 'OPEN';

-- Use the view like a table:
SELECT * FROM active_failures WHERE priority = 'HIGH';
SELECT tester, COUNT(*) AS high_priority FROM active_failures
GROUP BY tester;

-- Drop a view:
DROP VIEW active_failures;`,
      },
      { type: 'heading', text: 'SQL Injection & Parameterized Queries', difficulty: '🔴 Advanced' },
      {
        type: 'code',
        code: `# SQL INJECTION: attacker injects SQL code through user input.
# Classic example:
username = "admin' OR '1'='1"
# Vulnerable query becomes:
# WHERE username = 'admin' OR '1'='1' -- true for ALL users!

# ❌ VULNERABLE (never do this in tests or apps):
query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# ✅ SAFE: Use parameterized queries (placeholders):
# Python sqlite3:
cursor.execute(
    "SELECT * FROM users WHERE username = ?",
    (username,)              # value is passed separately — SQL engine escapes it
)

# Python psycopg2 (PostgreSQL):
cursor.execute(
    "SELECT * FROM users WHERE username = %s AND role = %s",
    (username, "admin")
)

# Why safe? The DB engine handles the values as DATA, never as SQL code.
# 'admin' OR '1'='1' becomes a literal string to match, not executable SQL.`,
      },
      {
        type: 'visual', variant: 'flow',
        title: 'ACID Transaction Flow — What Happens Inside the DB',
        note: 'ACID guarantees mean your test data is always in a consistent state — no partial inserts, no phantom reads between transactions.',
        steps: [
          { num: 'A', label: 'Atomicity', desc: 'All or nothing', highlight: true },
          { num: 'C', label: 'Consistency', desc: 'Rules enforced' },
          { num: 'I', label: 'Isolation', desc: 'Concurrent safe', highlight: true },
          { num: 'D', label: 'Durability', desc: 'Survived crash' },
        ],
      },
      {
        type: 'visual', variant: 'boxes',
        title: 'Transaction Lifecycle — What Each SQL Command Does',
        items: [
          { icon: '🚀', label: 'START TRANSACTION', desc: 'Begin atomic block' },
          { arrow: true },
          { icon: '✏️', label: 'INSERT / UPDATE / DELETE', desc: 'Multiple statements' },
          { arrow: true },
          { icon: '✅', label: 'COMMIT', desc: 'Persist all changes', highlight: true },
          { arrow: true },
          { icon: '↩️', label: 'ROLLBACK', desc: 'Undo all if error' },
        ],
        note: 'COMMIT makes all changes permanent. ROLLBACK undoes everything back to START TRANSACTION — like Ctrl+Z for the entire batch.',
      },
    ],
  },

  // ── 5. QA USE CASES ─────────────────────────────────────────────────────────
  {
    title: '🧪 SQL for QA — Real Testing Scenarios',
    blocks: [
      { type: 'heading', text: 'Use Case 1: Find All Failed Tests in Last 7 Days' },
      {
        type: 'code',
        code: `-- Find failed tests from the last 7 days with details:
SELECT
    test_name,
    status,
    duration_ms,
    environment,
    run_date
FROM test_results
WHERE status = 'FAIL'
  AND run_date >= NOW() - INTERVAL 7 DAY  -- MySQL
-- AND run_date >= CURRENT_TIMESTAMP - INTERVAL '7 days'  -- PostgreSQL
ORDER BY run_date DESC;

-- Count failures per test in last 7 days:
SELECT test_name, COUNT(*) AS fail_count
FROM test_results
WHERE status = 'FAIL'
  AND run_date >= NOW() - INTERVAL 7 DAY
GROUP BY test_name
ORDER BY fail_count DESC;`,
        expected: `+-----------------+--------+-------------+\n| test_name       | status | duration_ms |\n+-----------------+--------+-------------+\n| Checkout Flow   | FAIL   |        5400 |\n| Search Feature  | FAIL   |        8200 |\n+-----------------+--------+-------------+`
      },
      { type: 'heading', text: 'Use Case 2: Find Duplicate Test Data Entries' },
      {
        type: 'code',
        code: `-- Find duplicate email addresses in a users table:
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- See ALL rows that have a duplicate email:
SELECT *
FROM users
WHERE email IN (
    SELECT email FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
)
ORDER BY email;

-- Find duplicates across multiple columns (exact duplicate records):
SELECT test_name, environment, run_date, COUNT(*) AS count
FROM test_results
GROUP BY test_name, environment, run_date
HAVING COUNT(*) > 1;`,
      },
      { type: 'heading', text: 'Use Case 3: Verify Foreign Key Relationships (Find Orphaned Records)' },
      {
        type: 'code',
        code: `-- Find orders whose user_id doesn't exist in the users table (orphaned records):
SELECT o.id AS order_id, o.user_id, o.total
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;      -- user_id exists in orders but NOT in users = orphan!

-- Find test results whose test_case_id doesn't exist:
SELECT r.id, r.test_case_id
FROM test_results r
LEFT JOIN test_cases tc ON r.test_case_id = tc.id
WHERE tc.id IS NULL;

-- Count valid vs orphaned records:
SELECT
    SUM(CASE WHEN u.id IS NOT NULL THEN 1 ELSE 0 END) AS valid_orders,
    SUM(CASE WHEN u.id IS NULL     THEN 1 ELSE 0 END) AS orphaned_orders
FROM orders o
LEFT JOIN users u ON o.user_id = u.id;`,
      },
      { type: 'heading', text: 'Use Case 4: Count Test Results by Status with Percentages' },
      {
        type: 'code',
        code: `-- Count and percentage per status:
SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage
FROM test_results
WHERE run_date >= NOW() - INTERVAL 7 DAY
GROUP BY status
ORDER BY count DESC;

-- MySQL alternative (no window function needed):
SELECT
    status,
    COUNT(*) AS count,
    ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM test_results), 1) AS pct
FROM test_results
GROUP BY status
ORDER BY count DESC;`,
        expected: `+--------+-------+------------+\n| status | count | percentage |\n+--------+-------+------------+\n| PASS   |    30 |       60.0 |\n| FAIL   |    12 |       24.0 |\n| SKIP   |     8 |       16.0 |\n+--------+-------+------------+`
      },
      { type: 'heading', text: 'Use Case 5: Clean Up Test Data Older Than 30 Days' },
      {
        type: 'code',
        code: `-- SAFE PATTERN: ALWAYS SELECT first to verify what will be deleted!

-- Step 1: see what will be deleted:
SELECT COUNT(*), MIN(run_date), MAX(run_date)
FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
  AND environment = 'staging';        -- only delete staging data, not prod!

-- Step 2: if the count looks right, delete:
DELETE FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
  AND environment = 'staging';

-- To be extra safe, delete in batches (avoids locking the table):
DELETE FROM test_results
WHERE run_date < NOW() - INTERVAL 30 DAY
LIMIT 1000;         -- delete max 1000 rows per run
-- Repeat until 0 rows affected.`,
      },
      { type: 'heading', text: 'Use Case 6: EXPLAIN — Find and Fix Slow Queries' },
      {
        type: 'code',
        code: `-- 1. Identify a slow query and add EXPLAIN before it:
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';

-- Look for:
-- type: "ALL" = full table scan (bad — reads every row)
-- key: NULL   = no index being used (bad)
-- rows: high  = many rows examined

-- 2. Create a composite index:
CREATE INDEX idx_status_env ON test_results(status, environment);

-- 3. Run EXPLAIN again:
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL' AND environment = 'prod';
-- Now see: type: "ref", key: idx_status_env, rows: much lower

-- EXPLAIN ANALYZE (PostgreSQL — actually runs the query):
EXPLAIN ANALYZE SELECT * FROM test_results WHERE status = 'FAIL';`,
        expected: `Before index: type=ALL, rows=50000, key=NULL\nAfter index:  type=ref, rows=120, key=idx_status_env`
      },
    ],
  },

  // ── 6. INTERVIEW Q&A ────────────────────────────────────────────────────────
  {
    title: '💼 SQL Interview Questions & Answers',
    blocks: [
      { type: 'text', content: 'Click each question to expand the model answer. Includes code examples.' },
      { type: 'subheading', text: '🟢 Basic Questions' },
      { type: 'qa', question: 'Q1: What is the difference between WHERE and HAVING?',
        answer: 'WHERE filters individual ROWS before any grouping happens — it works on raw column values.\nHAVING filters GROUPS after GROUP BY has run — it works on aggregate function results.\n\nRule: If you need COUNT, SUM, AVG, etc. in your filter → HAVING. Otherwise → WHERE.',
        code: `-- WHERE: filter rows before grouping
SELECT * FROM test_results WHERE status = 'FAIL';

-- HAVING: filter groups after aggregation
SELECT test_name, COUNT(*) AS fails
FROM test_results
WHERE status = 'FAIL'          -- first filter rows (only FAIL rows)
GROUP BY test_name
HAVING COUNT(*) > 5;           -- then filter groups (only frequent failures)` },
      { type: 'qa', question: 'Q2: Explain the different types of JOINs.',
        answer: 'INNER JOIN: Returns rows where there is a match in BOTH tables. Rows with no match on either side are excluded.\n\nLEFT (OUTER) JOIN: Returns ALL rows from the left table. For right-side rows with no match → NULL in right columns.\n\nRIGHT (OUTER) JOIN: Returns ALL rows from the right table. Left-side NULLs where no match.\n\nFULL OUTER JOIN: Returns ALL rows from BOTH tables. NULLs where no match on either side.\n\nCROSS JOIN: Cartesian product — every row from left combined with every row from right.',
        code: `-- Find testers WITH open bugs (INNER JOIN):
SELECT t.name, COUNT(b.id) AS open_bugs
FROM testers t
INNER JOIN bugs b ON t.id = b.tester_id AND b.status = 'OPEN'
GROUP BY t.id, t.name;

-- Find ALL testers, even those with no bugs (LEFT JOIN):
SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;` },
      { type: 'qa', question: 'Q3: What is a PRIMARY KEY vs FOREIGN KEY?',
        answer: 'PRIMARY KEY (PK): Uniquely identifies each row in a table. Cannot be NULL. Only one per table. Usually an auto-incrementing integer.\n\nFOREIGN KEY (FK): A column that references the PRIMARY KEY of another table, creating a relationship and enforcing referential integrity — you cannot insert a FK value that doesn\'t exist in the parent table.',
        code: `CREATE TABLE users (
    id    INT PRIMARY KEY AUTO_INCREMENT,  -- PK
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE orders (
    id      INT PRIMARY KEY AUTO_INCREMENT,  -- PK
    user_id INT NOT NULL,                    -- FK column
    total   DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)  -- FK constraint
    -- → cannot insert user_id = 999 if no user with id=999 exists
);` },
      { type: 'qa', question: 'Q4: What is NULL and how do you check for it?',
        answer: 'NULL means "no value" or "unknown". It\'s not the same as 0, empty string "", or false. NULL is its own type — any comparison to NULL returns NULL (not true or false).\n\nYou CANNOT use = or != to check for NULL. Must use IS NULL or IS NOT NULL. Use COALESCE() to provide a default value when something is NULL.',
        code: `-- Wrong:
SELECT * FROM users WHERE phone = NULL;    -- returns 0 rows! Always false.
SELECT * FROM users WHERE phone != NULL;   -- same problem

-- Correct:
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Provide default with COALESCE:
SELECT name, COALESCE(phone, 'N/A') AS phone FROM users;` },
      { type: 'qa', question: 'Q5: What is the difference between DELETE, TRUNCATE, and DROP?',
        answer: 'DELETE: Removes rows matching a WHERE clause. Supports WHERE (can target specific rows). Supports ROLLBACK. Fires row-level triggers. Slower for large tables.\n\nTRUNCATE: Removes ALL rows instantly without a WHERE clause. Cannot be ROLLBACKed in MySQL. Much faster than DELETE for large tables. Does not fire triggers.\n\nDROP: Permanently removes the ENTIRE TABLE including its structure and data. The table no longer exists after DROP.',
        code: `DELETE FROM test_results WHERE status = 'SKIP';    -- remove specific rows
DELETE FROM test_results;                           -- remove all rows (slow)

TRUNCATE TABLE test_results;                        -- remove all rows (fast)

DROP TABLE test_results;                            -- delete entire table!` },
      { type: 'subheading', text: '🟡 Intermediate Questions' },
      { type: 'qa', question: 'Q6: What is the difference between UNION and UNION ALL?',
        answer: 'UNION: Combines results of two queries and removes duplicate rows. Slower because it must scan and compare all rows.\n\nUNION ALL: Combines results and keeps ALL rows including duplicates. Faster because no deduplication step.\n\nBoth queries must have the same number of columns with compatible data types.',
        code: `-- UNION: removes duplicates (slower):
SELECT email FROM users WHERE role = 'admin'
UNION
SELECT email FROM users WHERE is_verified = TRUE;

-- UNION ALL: keeps duplicates (faster):
SELECT test_name FROM test_results WHERE status = 'FAIL'
UNION ALL
SELECT test_name FROM archived_results WHERE status = 'FAIL';` },
      { type: 'qa', question: 'Q7: How do subqueries work? What is a correlated subquery?',
        answer: 'A subquery is a SELECT inside another query. Can appear in WHERE (returns a value or set), FROM (acts as a table), or SELECT (returns one value per row).\n\nA CORRELATED subquery references a column from the outer query — it runs once per outer row (can be slow!). Use JOINs when possible instead of correlated subqueries for better performance.',
        code: `-- Simple subquery (runs ONCE):
SELECT * FROM tests WHERE duration > (SELECT AVG(duration) FROM tests);

-- Correlated subquery (runs once per outer row — slow on large tables!):
SELECT t.name,
    (SELECT COUNT(*) FROM bugs b WHERE b.tester_id = t.id) AS bug_count
FROM testers t;
-- Better: use LEFT JOIN + GROUP BY instead` },
      { type: 'qa', question: 'Q8: What are indexes and how do they affect performance?',
        answer: 'An index is a data structure (usually B-tree) that lets the database find rows matching a condition WITHOUT scanning every row. Like a book\'s index — jump directly to the page instead of reading cover-to-cover.\n\nSpeeds up: SELECT with WHERE, JOIN ON, ORDER BY.\nSlows down: INSERT, UPDATE, DELETE (indexes must be updated too).\nAdd indexes on: columns in WHERE clauses, FK columns, frequently sorted columns.\nDon\'t index: small tables, columns with very few distinct values (boolean, status with 3 values), frequently updated columns.',
        code: `-- Before index: EXPLAIN shows type=ALL (reads ALL 50,000 rows)
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';

-- Add index:
CREATE INDEX idx_status ON test_results(status);

-- After index: EXPLAIN shows type=ref (uses index, reads ~5000 rows)
EXPLAIN SELECT * FROM test_results WHERE status = 'FAIL';` },
      { type: 'qa', question: 'Q9: Write a query to find the second highest value in a table.',
        answer: 'Classic interview question. Multiple approaches — using LIMIT/OFFSET, subquery, or window functions.',
        code: `-- Option 1: LIMIT + OFFSET (simplest):
SELECT DISTINCT duration_ms
FROM test_results
ORDER BY duration_ms DESC
LIMIT 1 OFFSET 1;         -- skip the highest, take the next one

-- Option 2: Subquery:
SELECT MAX(duration_ms) AS second_highest
FROM test_results
WHERE duration_ms < (SELECT MAX(duration_ms) FROM test_results);

-- Option 3: Window function (most robust, handles ties correctly):
SELECT duration_ms
FROM (
    SELECT duration_ms, DENSE_RANK() OVER (ORDER BY duration_ms DESC) AS rnk
    FROM test_results
) ranked
WHERE rnk = 2
LIMIT 1;` },
      { type: 'qa', question: 'Q10: GROUP BY — what rules apply to SELECT columns?',
        answer: 'RULE: Every column in the SELECT list must EITHER be in the GROUP BY clause OR be wrapped in an aggregate function (COUNT, SUM, AVG, etc.).\n\nWhy? When you GROUP BY, multiple rows collapse into one group. For non-aggregated columns, the DB doesn\'t know WHICH row\'s value to show — so you must either include it in GROUP BY (every value in the group must be the same) or aggregate it.',
        code: `-- CORRECT: group_col in GROUP BY, aggregated cols use SUM/COUNT
SELECT environment, COUNT(*) AS total, MAX(duration_ms) AS max_ms
FROM test_results
GROUP BY environment;

-- WRONG: test_name is not in GROUP BY and not aggregated
-- SELECT environment, test_name, COUNT(*)
-- FROM test_results GROUP BY environment;
-- → Error: 'test_name' is not in GROUP BY` },
      { type: 'subheading', text: '🔴 Advanced Questions' },
      { type: 'qa', question: 'Q11: Explain window functions with a practical example.',
        answer: 'Window functions perform calculations across a "window" of related rows without collapsing them. Unlike GROUP BY, each row keeps its own identity plus the window calculation result.\n\nOVER() defines the window. PARTITION BY groups (like GROUP BY but doesn\'t collapse). ORDER BY within OVER() creates a sequence. Use cases: ranking, running totals, comparing to previous/next row.',
        code: `SELECT tester_name, test_date, tests_run,
    -- Rank each tester within their team by tests run:
    RANK() OVER (PARTITION BY team ORDER BY tests_run DESC) AS team_rank,
    -- Running total of tests for the tester:
    SUM(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS cumulative,
    -- Compare to previous day:
    LAG(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS prev_day,
    tests_run - LAG(tests_run) OVER (PARTITION BY tester_name ORDER BY test_date) AS delta
FROM daily_tester_stats;` },
      { type: 'qa', question: 'Q12: What is a CTE and when would you use it over a subquery?',
        answer: 'A CTE (WITH clause) is a named temporary result set. It\'s evaluated once and can be referenced multiple times.\n\nUse CTEs over subqueries when: the query has multiple steps that are clearer as named sub-steps, you need to reference the same subquery multiple times, you want recursive queries (hierarchical data). Subqueries are fine for simple, single-use derivations.',
        code: `-- Hard to read with subqueries:
SELECT * FROM (
    SELECT tester_id, COUNT(*) fails FROM bugs WHERE status='FAIL' GROUP BY tester_id
) f JOIN (
    SELECT id, name FROM testers
) t ON f.tester_id = t.id WHERE f.fails > 3;

-- Same query, much clearer with CTE:
WITH bug_counts AS (
    SELECT tester_id, COUNT(*) AS fails
    FROM bugs WHERE status = 'FAIL'
    GROUP BY tester_id
)
SELECT t.name, bc.fails
FROM bug_counts bc
JOIN testers t ON bc.tester_id = t.id
WHERE bc.fails > 3;` },
      { type: 'qa', question: 'Q13: How does a transaction work? What are ACID properties?',
        answer: 'A transaction is a sequence of operations treated as a single unit — either ALL succeed or NONE do.\n\nACID:\nAtomicity: All or nothing — one failure rolls back everything.\nConsistency: Transaction moves DB from one valid state to another.\nIsolation: Concurrent transactions don\'t see each other\'s in-progress changes.\nDurability: Committed data survives crashes (written to disk).',
        code: `-- Transfer money example (classic ACID test):
START TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;   -- debit
UPDATE accounts SET balance = balance + 500 WHERE id = 2;   -- credit

-- Verify (within transaction):
SELECT balance FROM accounts WHERE id IN (1, 2);

COMMIT;   -- persist if OK
-- ROLLBACK; -- undo both updates if something went wrong` },
      { type: 'qa', question: 'Q14: What is SQL injection and how do parameterized queries prevent it?',
        answer: 'SQL injection: user-supplied input is interpreted as SQL code, allowing attackers to bypass authentication, read all data, or drop tables.\n\nParameterized queries (prepared statements) pass values as DATA separately from the SQL structure. The DB engine escapes the values automatically — they can never be interpreted as SQL code regardless of content.',
        code: `# VULNERABLE — username input directly in SQL string:
username = "' OR '1'='1"
query = f"SELECT * FROM users WHERE username = '{username}'"
# Becomes: WHERE username = '' OR '1'='1' → returns ALL users!

# SAFE — parameterized query:
cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
# The ? placeholder means username is always treated as a string value,
# never as SQL code. Injection is impossible.` },
      { type: 'qa', question: 'Q15: How would you optimize a slow query?',
        answer: '1. Run EXPLAIN/EXPLAIN ANALYZE to see the query plan — look for "full table scan" (type:ALL) and NULL indexes.\n2. Add appropriate indexes on WHERE columns, JOIN columns.\n3. Rewrite subqueries as JOINs when possible.\n4. Select only needed columns instead of SELECT *.\n5. Use LIMIT to reduce result size.\n6. For aggregations, ensure GROUP BY columns are indexed.\n7. For complex queries, use CTEs for clarity and potential query plan hints.\n8. Check for missing FK indexes.\n9. Consider EXPLAIN output after each change to verify improvement.',
        code: `-- Step 1: Identify slow query
EXPLAIN SELECT t.name, COUNT(b.id) bugs
FROM testers t LEFT JOIN bugs b ON t.id = b.tester_id
WHERE b.created_at > '2024-01-01'
GROUP BY t.id, t.name;
-- Shows: type=ALL on bugs table, key=NULL

-- Step 2: Add missing indexes
CREATE INDEX idx_bugs_tester  ON bugs(tester_id);
CREATE INDEX idx_bugs_created ON bugs(created_at);

-- Step 3: Re-check
EXPLAIN SELECT ...  -- Now shows type=ref, using indexes` },
    ],
  },

  // ── 7. PRACTICE & REFERENCE ─────────────────────────────────────────────────
  {
    title: '📝 Practice Exercises & Quick Reference',
    blocks: [
      { type: 'heading', text: 'Practice Exercises' },
      {
        type: 'exercise',
        difficulty: '🟢 Beginner',
        title: 'Exercise 1: Query Failed Test Runs',
        description: 'Given a test_runs table with columns: id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date. Write THREE queries: (a) all failed runs today, (b) count of each status, (c) slowest 3 tests.',
        hint: 'Use WHERE status="FAIL" AND DATE(run_date)=CURDATE(). For counts use GROUP BY status. For slowest use ORDER BY duration_ms DESC LIMIT 3.',
        solution: `-- (a) Failed runs today:
SELECT test_name, duration_ms, run_date
FROM test_runs
WHERE status = 'FAIL'
  AND DATE(run_date) = CURDATE()
ORDER BY duration_ms DESC;

-- (b) Count by status:
SELECT status, COUNT(*) AS count
FROM test_runs
GROUP BY status
ORDER BY count DESC;

-- (c) Slowest 3 tests:
SELECT test_name, duration_ms
FROM test_runs
ORDER BY duration_ms DESC
LIMIT 3;`,
        explanation: 'DATE() extracts just the date part of a DATETIME. CURDATE() returns today. These are MySQL functions — PostgreSQL uses CURRENT_DATE.',
      },
      {
        type: 'exercise',
        difficulty: '🟡 Intermediate',
        title: 'Exercise 2: Multi-Table Join',
        description: 'You have three tables: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Write a query showing: tester name, test case title, status, and run_date — only for tests run in the last 30 days, ordered by most recent first.',
        hint: 'JOIN all 3 tables. users→results on user_id, test_cases→results on test_case_id. Use WHERE run_date >= NOW() - INTERVAL 30 DAY.',
        solution: `SELECT
    u.name         AS tester,
    tc.title       AS test_case,
    tc.category,
    r.status,
    r.run_date
FROM results r
JOIN users      u  ON r.user_id      = u.id
JOIN test_cases tc ON r.test_case_id = tc.id
WHERE r.run_date >= NOW() - INTERVAL 30 DAY
ORDER BY r.run_date DESC;`,
        explanation: 'Start from the "results" table (the junction table linking users and test_cases) and JOIN outward. This avoids accidental cartesian products.',
      },
      {
        type: 'exercise',
        difficulty: '🔴 Advanced',
        title: 'Exercise 3: CTE + Window Function — Rank Testers by Pass Rate',
        description: 'Using the results table (user_id, status, sprint), write a query that ranks testers by their pass rate PER SPRINT using a CTE to calculate stats and RANK() window function. Show: sprint, tester name, total tests, pass count, pass rate %, rank within sprint.',
        hint: 'CTE: GROUP BY sprint, user_id to get counts. Then JOIN users for names. Then add RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC).',
        solution: `WITH sprint_stats AS (
    SELECT
        sprint,
        user_id,
        COUNT(*)                                  AS total,
        SUM(CASE WHEN status = 'PASS' THEN 1 ELSE 0 END) AS passed
    FROM results
    GROUP BY sprint, user_id
),
sprint_rates AS (
    SELECT
        s.sprint,
        u.name    AS tester,
        s.total,
        s.passed,
        ROUND(s.passed * 100.0 / s.total, 1) AS pass_rate
    FROM sprint_stats s
    JOIN users u ON s.user_id = u.id
)
SELECT
    sprint,
    tester,
    total,
    passed,
    pass_rate,
    RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) AS rank_in_sprint
FROM sprint_rates
ORDER BY sprint, rank_in_sprint;`,
        explanation: 'Two CTEs: first aggregates raw counts, second calculates rate and joins user names. The final SELECT adds the window function. Splitting into CTEs makes each step debuggable.',
      },
      { type: 'heading', text: 'Quick Reference Card' },
      {
        type: 'table',
        headers: ['Command', 'Syntax', 'Purpose'],
        rows: [
          ['SELECT', 'SELECT col FROM tbl WHERE cond', 'Read data from table'],
          ['INSERT', 'INSERT INTO tbl (cols) VALUES (...)', 'Add new rows'],
          ['UPDATE', 'UPDATE tbl SET col=val WHERE cond', 'Modify existing rows'],
          ['DELETE', 'DELETE FROM tbl WHERE cond', 'Remove rows'],
          ['CREATE TABLE', 'CREATE TABLE t (id INT PRIMARY KEY, ...)', 'Define a new table'],
          ['JOIN (INNER)', 'JOIN t2 ON t1.id = t2.fk', 'Match rows in both tables'],
          ['LEFT JOIN', 'LEFT JOIN t2 ON t1.id = t2.fk', 'All left rows + matched right'],
          ['GROUP BY', 'GROUP BY col HAVING COUNT(*) > N', 'Aggregate + filter groups'],
          ['ORDER BY', 'ORDER BY col DESC LIMIT N', 'Sort and limit results'],
          ['COUNT/SUM/AVG', 'SELECT COUNT(*), AVG(col)', 'Aggregate functions'],
          ['NULL check', 'WHERE col IS NULL', 'Find missing values'],
          ['COALESCE', 'COALESCE(col, default)', 'Replace NULL with default'],
          ['CTE', 'WITH name AS (SELECT ...) SELECT ...', 'Named temp subquery'],
          ['Window RANK', 'RANK() OVER (PARTITION BY ... ORDER BY ...)', 'Rank within groups'],
          ['EXPLAIN', 'EXPLAIN SELECT ...', 'Show query execution plan'],
        ]
      },
      { type: 'tip', content: 'Bookmark db-fiddle.com for quick experiments. Always test your WHERE clause with a SELECT before running DELETE or UPDATE — one missing WHERE can wipe your entire table.' },
    ],
  },
]

function applyTr(enSection, overrides) {
  return {
    title: overrides.title ?? enSection.title,
    blocks: enSection.blocks.map((block, i) => {
      const o = overrides.blocks?.[i]
      if (!o) return block
      return { ...block, ...o }
    })
  }
}

const trSections = [
  applyTr(sections[0], {
    title: '🎯 SQL Nedir & Her QA Mühendisi Neden Bilmeli?',
    blocks: {
      0: { text: 'Veritabanı Nedir?' },
      1: { content: 'Veritabanı, elektronik ortamda depolanan yapılandırılmış veri koleksiyonudur. Milyonlarca satır saklayan, ilgili verileri birbirine bağlayan ve karmaşık sorulara milisaniyeler içinde yanıt veren güçlü bir spreadsheet gibi düşünebilirsiniz. Test ettiğiniz her uygulamanın verileri neredeyse her zaman bir veritabanında saklanır.' },
      2: { text: 'SQL Nedir?' },
      3: { content: "SQL (Structured Query Language), ilişkisel veritabanlarıyla iletişim kurmak için standart dildir. Soru sormak ('bugün kaç kullanıcı kaydoldu?'), veri eklemek, kayıt güncellemek ve silmek için kullanılır. 1970'lerden bu yana endüstri standardıdır; MySQL, PostgreSQL, SQLite, SQL Server ve Oracle dahil tüm büyük veritabanlarında çalışır." },
      4: { text: 'QA Mühendisleri Neden SQL Bilmeli?' },
      5: { items: [
        { icon: '✅', label: 'Backend Durumunu Doğrula', desc: 'UI işleminden sonra DB\'yi sorgulayarak verinin doğru kaydedildiğini doğrulayın — yalnızca UI\'ya güvenmeyin.' },
        { icon: '🌱', label: 'Test Verisi Ekle', desc: 'Testler çalışmadan önce INSERT ile test kullanıcıları, ürünler ve siparişleri ekleyin — manuel kurulum gerekmez.' },
        { icon: '🧹', label: 'Test Sonrası Temizlik', desc: 'Her çalıştırmadan sonra test kayıtlarını DELETE edin, sonraki çalıştırma temiz başlasın.' },
        { icon: '🔍', label: 'Backend Doğrulaması', desc: 'İş kurallarını kontrol edin: sipariş toplamı = satır kalemlerinin toplamı, FK kısıtlamaları, veri bütünlüğü.' },
        { icon: '⚡', label: "UI'dan Daha Hızlı", desc: 'Bir DB sorgusu milisaniyeler alır. Aynı veriye UI üzerinden tıklayarak ulaşmak dakikalar sürer.' },
        { icon: '🐛', label: 'Gizli Hataları Bul', desc: 'UI başarı gösteriyor ama DB güncellenmedi — SQL gerçeği ortaya koyar.' },
      ]},
      6: { text: 'Temel Veritabanı Terminolojisi' },
      7: {
        headers: ['Terim', 'Anlam', 'Örnek'],
        rows: [
          ['Table (Tablo)', 'Satır ve sütunlarda veri saklar (spreadsheet gibi)', '"users" tablosu: id, email, age sütunları'],
          ['Row / Record (Satır)', 'Tablodaki tek bir kayıt', 'Tek kullanıcı: {id:1, email:"alice@test.com"}'],
          ['Column / Field (Sütun)', 'Her satır için saklanan bir özellik', '"email", "created_at", "is_active"'],
          ['Primary Key', 'Her satır için benzersiz tanımlayıcı — NULL olamaz, tekrar edemez', '"id" sütunu, AUTO_INCREMENT ile'],
          ['Foreign Key', "Başka tablonun PK'sını referans alan sütun — ilişki ve bütünlük sağlar", '"orders.user_id" → "users.id"'],
          ['Index', 'Sütun aramalarını hızlandıran veri yapısı', '"email" sütununa INDEX → hızlı WHERE email=?'],
          ['Schema', 'Veritabanının planı — tüm tablolar, sütunlar, tipler, kısıtlamalar', 'CREATE TABLE tanımları'],
          ['Query (Sorgu)', 'SQL kullanılarak veritabanına gönderilen istek', 'SELECT * FROM users WHERE age > 25'],
        ]
      },
      8: { text: 'Popüler Veritabanları Karşılaştırması' },
      9: {
        headers: ['Veritabanı', 'Tip', 'En İyi Kullanım', 'Ücretsiz?'],
        rows: [
          ['MySQL', 'Açık kaynak', 'Web uygulamaları, endüstride en yaygın', '✅ Evet'],
          ['PostgreSQL', 'Açık kaynak', 'Karmaşık sorgular, JSON, kurumsal uygulamalar', '✅ Evet'],
          ['SQLite', 'Gömülü / sunucusuz', 'Yerel geliştirme, test, mobil uygulamalar', '✅ Evet'],
          ['SQL Server', 'Microsoft ticari', 'Windows/.NET kurumsal uygulamalar', '✅ Express sürüm'],
          ['Oracle', 'Ticari kurumsal', 'Büyük ölçekli bankacılık/finans', '❌ Ücretli'],
        ]
      },
      10: { content: "SQLiteOnline.com ile öğrenmeye başlayın — tarayıcınızda çalışır, kurulum gerekmez. Gerçek ortam için DBeaver (ücretsiz GUI) kurun ve SQLite veya MySQL'e bağlanın." },
      11: { text: 'SQL, QA İş Akışında Nerede Kullanılır?' },
      12: {
        title: 'SQL Test Sürecinize Nasıl Entegre Olur?',
        items: [
          { icon: '🧪', label: 'Test Scripti', desc: 'Playwright / pytest' },
          { arrow: true },
          { icon: '🖥️', label: 'Uygulama UI/API', desc: 'DB değişikliği yapar' },
          { arrow: true },
          { icon: '🗄️', label: 'Veritabanı', desc: 'MySQL / PostgreSQL' },
          { arrow: true },
          { icon: '🔍', label: 'SQL Sorgusu', desc: 'Buradan doğrularsın!', highlight: true },
        ],
        note: 'Her test işleminden sonra bir SQL sorgusu veritabanı durumunun doğru şekilde güncellendiğini doğrulayabilir — yalnızca UI\'nun gösterdiğine güvenmeyin.',
      },
      13: {
        title: 'Örnek: Bir Veritabanı Tablosu',
        tables: [{
          name: 'users',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'name', type: 'VARCHAR' },
            { name: 'email', type: 'VARCHAR' },
            { name: 'role', type: 'VARCHAR' },
            { name: 'created_at', type: 'DATETIME' },
          ],
          rows: [
            { cells: [1, 'Alice', 'alice@test.com', 'admin', '2024-01-10'] },
            { cells: [2, 'Bob', 'bob@test.com', 'user', '2024-01-12'] },
            { cells: [3, 'Carol', 'carol@test.com', 'user', '2024-01-15'], highlighted: true },
          ]
        }],
        note: 'Her satır bir kayıttır. Her sütun bir alandır. id, Primary Key\'dir — her satırı benzersiz olarak tanımlar.',
      },
      14: {
        question: 'SQL neyin kısaltmasıdır?',
        options: ['Standard Query Logic', 'Structured Query Language', 'Simple Question Language', 'Sequential Query Library'],
        correct: 1,
        explanation: "SQL = Structured Query Language (Yapılandırılmış Sorgu Dili). 1970'lerden bu yana ilişkisel veritabanları için standart dildir; MySQL, PostgreSQL, SQLite, Oracle ve SQL Server tarafından kullanılır.",
      },
    }
  }),
  applyTr(sections[1], {
    title: '📦 SQL Ortamınızı Kurma',
    blocks: {
      0: { text: 'Seçenek A: Kurulum Gerektirmeyen Çevrimiçi Editörler (Buradan Başlayın)' },
      1: { items: [
        { label: 'db-fiddle.com', desc: 'En iyi seçenek. MySQL, PostgreSQL, SQLite. Schema + sorgu bölünmüş görünüm.' },
        { label: 'sqliteonline.com', desc: "SQLite'ı tarayıcınızda çalıştırır. .db dosyası yükleyin veya tablo oluşturun." },
        { label: 'sqlfiddle.com', desc: 'Klasik. Birden fazla DB motoru. Örnekleri paylaşmak için uygun.' },
      ]},
      2: { text: 'Seçenek B: SQLite CLI (En Hafif Yerel Seçenek)' },
      3: { items: [
        'Windows: sqlite.org/download.html\'den "sqlite-tools-win32" indirin ve C:\\sqlite\\ klasörüne çıkarın',
        'Mac: Zaten yüklü! Çalıştır: sqlite3 — veya Homebrew ile: brew install sqlite',
        'Linux: sudo apt install sqlite3',
        'Veritabanı oluştur: sqlite3 mytest.db',
        'Doğrula: SELECT sqlite_version();',
      ]},
      5: { text: 'Seçenek C: MySQL Community Server' },
      6: { items: [
        'Windows: dev.mysql.com/downloads/installer/ adresinden MySQL Installer indirin → "Developer Default" seçin',
        'Mac: brew install mysql → brew services start mysql → mysql -u root',
        'Linux: sudo apt install mysql-server → sudo systemctl start mysql → sudo mysql -u root',
        'Kurulumu doğrula: SELECT VERSION();',
      ]},
      8: { text: 'Seçenek D: DBeaver GUI (Yeni Başlayanlar için Önerilen)' },
      9: { content: "DBeaver, tüm veritabanlarıyla çalışan ücretsiz evrensel bir GUI'dir. Komut satırından çok daha kolaydır — tabloları görsel olarak inceleyebilir ve otomatik tamamlama ile sorgular çalıştırabilirsiniz." },
      10: { items: [
        'dbeaver.io adresinden DBeaver Community\'i indirin (ücretsiz)',
        "DBeaver'ı kurun ve başlatın",
        '"New Database Connection" seçeneğine tıklayın (sol üstteki fiş simgesi)',
        'DB türünüzü seçin: SQLite, MySQL veya PostgreSQL',
        'SQLite: Göz At\'a tıklayın → .db dosyanızı seçin (veya yeni oluşturun)',
        'MySQL/PostgreSQL: host, port, veritabanı adı, kullanıcı adı ve şifreyi girin',
        '"Test Connection"\'a tıklayın — Finish\'ten önce yeşil "Connected" mesajı görünmeli',
        'Ctrl+] ile SQL Editor\'ü açın ve sorgu yazmaya başlayın',
      ]},
      11: { text: "Python'da SQL Kullanımı (Test Otomasyonu için)" },
      13: { text: '☕ Java Biliyorsan: Veritabanı Bağlantısı Köprüsü' },
      14: {
        topic: 'DB Bağlantısı Kurma (DriverManager vs sqlite3)',
        why: 'Java\'da JDBC kullanırsın — pom.xml\'e sürücü ekler, DriverManager.getConnection() çağırırsın. Python\'da sqlite3 yerleşik (sıfır kurulum!) ve PostgreSQL için psycopg2 var. Kalıp aynı: bağlantı aç → kullan → kapat.',
        note: 'sqlite3 Python standart kütüphanesinde — Maven yok, pip yok, pom.xml yok! Sadece import et ve kullan. pip install psycopg2-binary tek bir Maven bağımlılığı eklemeye eşdeğer.',
      },
      15: {
        topic: 'Bağımlılık Kurulumu (Maven pom.xml vs pip)',
        why: 'Java\'da JDBC sürücü bağımlılıklarını pom.xml\'de bildirirsin, Maven indirir. Python\'da pip install sürücüyü indirir. SQLite için hiçbir şey gerekmez — Python ile birlikte gelir.',
        note: 'Python SQLite için en hızlı başlangıcı sağlar. Gerçek proje bağımlılıkları için requirements.txt kullan (pom.xml ile aynı fikir). pip install -r requirements.txt her şeyi kurar.',
      },
    }
  }),
  applyTr(sections[2], {
    title: '🟢 Seviye 1: SQL Temelleri',
    blocks: {
      0: { text: 'CREATE TABLE — Yapıyı Tanımlama', difficulty: '🟢 Başlangıç' },
      2: { text: 'INSERT INTO — Veri Ekleme', difficulty: '🟢 Başlangıç' },
      4: { text: 'SELECT — Veri Okuma', difficulty: '🟢 Başlangıç' },
      6: { text: 'UPDATE ve DELETE', difficulty: '🟢 Başlangıç' },
      8: { content: 'UPDATE ve DELETE komutlarında MUTLAKA WHERE kullanın! WHERE olmadan tablodaki tüm satırlar etkilenir. Değiştirilecek satırları önce SELECT ile doğrulayın, ardından güncelleme veya silme işlemini yapın.' },
      9: { text: 'NULL Değerleri', difficulty: '🟢 Başlangıç' },
      11: { text: 'İnteraktif Örnek: test_results Tablosu', difficulty: '🟢 Başlangıç' },
      13: { text: 'SQL Yürütme Sırası — Çoğu Yeni Başlayanın Kaçırdığı Sır' },
      14: { content: "SQL, normal kod gibi yukarıdan aşağıya çalışmaz. Belirli bir dahili sıra izler. Bu yüzden WHERE içinde SELECT takma adları kullanamaz ve aggregate fonksiyonlar HAVING'e gider, WHERE'e değil." },
      15: {
        title: 'SQL Cümle Değerlendirme Sırası (Adım Adım)',
        note: 'SELECT\'i en üste yazarsın ama neredeyse en son çalışır. Bu yüzden SELECT\'te tanımlanan takma adlar WHERE\'de kullanılamaz!',
        steps: [
          { num: '1', label: 'FROM', desc: 'Tabloları yükle' },
          { num: '2', label: 'JOIN', desc: 'Birleştir' },
          { num: '3', label: 'WHERE', desc: 'Satırları filtrele', highlight: true },
          { num: '4', label: 'GROUP BY', desc: 'Grupla' },
          { num: '5', label: 'HAVING', desc: 'Grupları filtrele', highlight: true },
          { num: '6', label: 'SELECT', desc: 'Sütunları seç' },
          { num: '7', label: 'ORDER BY', desc: 'Sırala' },
          { num: '8', label: 'LIMIT', desc: 'Dilimleme' },
        ],
      },
      16: {
        title: 'Örnek Verimiz — test_results Tablosu',
        tables: [{
          name: 'test_results',
          columns: [
            { name: 'id', type: 'INT', pk: true },
            { name: 'test_name', type: 'VARCHAR' },
            { name: 'status', type: 'VARCHAR' },
            { name: 'duration_ms', type: 'INT' },
            { name: 'environment', type: 'VARCHAR' },
          ],
          rows: [
            { cells: [1, 'Login Test', 'PASS', 1200, 'staging'] },
            { cells: [2, 'Checkout Flow', 'FAIL', 5400, 'staging'], highlighted: true },
            { cells: [3, 'Signup Test', 'PASS', 890, 'prod'] },
            { cells: [4, 'Profile Update', 'FAIL', 3100, 'prod'], highlighted: true },
            { cells: [5, 'Search Feature', 'PASS', 2200, 'staging'] },
            { cells: [6, 'Logout Test', 'SKIP', 0, 'staging'] },
          ]
        }],
        note: "Sarı satırlar = FAIL durumu. Dene: SELECT * FROM test_results WHERE status = 'FAIL' → 2. ve 4. satırları döndürür.",
      },
      17: { text: 'NULL — En Yaygın SQL Hatası' },
      18: { content: "NULL, 'değer yok / bilinmiyor' anlamına gelir — sıfır değil, boş string değil. NULL ile yapılan her karşılaştırma NULL döndürür (true veya false değil). Bu durum her SQL yeni başlayanının tökezlediği noktadır." },
      19: {
        left: {
          label: '❌ Yanlış — = NULL hiçbir zaman çalışmaz',
          code: `SELECT * FROM users WHERE email = NULL;
-- Her zaman 0 satır döndürür!
-- NULL değerler var olsa bile.
-- Neden? NULL = NULL → NULL (true değil)`,
          note: "NULL kontrolü için = veya != kullanmayın",
        },
        right: {
          label: '✅ Doğru — IS NULL / IS NOT NULL',
          code: `SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
-- COALESCE: NULL'ı varsayılanla değiştir:
SELECT name, COALESCE(email, 'eposta yok') FROM users;`,
          note: "IS NULL ve IS NOT NULL her zaman doğru çalışır",
        },
      },
      20: {
        question: "WHERE discount = NULL filtresi uyguladığında sorgu 0 satır döndürüyor. Neden?",
        options: [
          'Tabloda NULL indirim yok',
          '= ile NULL karşılaştırması her zaman NULL (TRUE değil) döndürür, hiçbir satır eşleşmez',
          'Tırnak gerekiyor: WHERE discount = "NULL"',
          "NULL otomatik olarak 0'a dönüştürülür",
        ],
        correct: 1,
        explanation: "= veya != ile yapılan NULL karşılaştırmaları FALSE gibi davranır. Bunun yerine IS NULL veya IS NOT NULL kullanın. Bu, en yaygın SQL hatalarından biridir.",
      },
      21: { text: '☕ Java Biliyorsan: Veritabanı Erişim Köprüsü' },
      22: {
        topic: 'DB Bağlantısı (DriverManager vs sqlite3)',
        why: "Java, JDBC DriverManager ile URL + kimlik bilgileriyle bağlanır. Python, hafif sürücü modülleri kullanır (sqlite3 yerleşik, PostgreSQL için psycopg2). Bağlantı mantığı aynı — API farklı.",
        note: "Python sqlite3, Python'a yerleşik gelir — pip kurulumu gerekmez. MySQL: mysql-connector-python; PostgreSQL: psycopg2.",
      },
      23: {
        topic: 'SELECT Çalıştırma → Sonuçları Okuma',
        why: "Java, rs.next() döngüsü ve sütun adıyla getter metodlar içeren ResultSet kullanır. Python'un cursor.fetchall() metodu basit bir demet listesi döndürür — çok daha az kod.",
        note: "cursor.fetchall() tüm satırları demet listesi olarak döndürür. cursor.fetchone() bir satır ya da None döndürür — rs.next() bir kez çağırmaya eşdeğer.",
      },
      24: { text: '☕ Java Biliyorsan: DML Operasyonları Köprüsü' },
      25: {
        topic: 'INSERT → JPA persist() vs SQL INSERT INTO',
        why: "Java kurumsal projelerinde büyük ihtimalle JPA/Hibernate (EntityManager.persist) ile nesne ekliyordunuz. SQL'de INSERT INTO doğrudan yazılır. İkisi de aynı SQL'i üretir — JPA sadece bunu sizin yerinize oluşturur.",
        note: "SQL INSERT açık ve güçlüdür — toplu insert'ler ve INSERT-SELECT'in JPA'da custom query olmadan karşılığı yoktur. Test otomasyonunda hız ve sadelik için doğrudan SQL tercih edilir.",
      },
      26: {
        topic: 'UPDATE/DELETE → JPA merge()/remove() vs SQL',
        why: "JPA, UPDATE ve DELETE'i entity durum değişiklikleri üzerinden soyutlar. SQL doğrudan kontrol sağlar — WHERE ile tam olarak istediğiniz satırları güncelleyin/silin.",
        note: "SQL UPDATE ve DELETE, WHERE ile tek sorguda çok sayıda satırı etkileyebilir. JPA her satır için ayrı entity yükleme gerektirir. Test otomasyonunda temizleme için doğrudan SQL daha hızlı ve yaygındır.",
      },
    }
  }),
  applyTr(sections[3], {
    title: '🟡 Seviye 2: Orta Seviye SQL',
    blocks: {
      0: { text: 'Aggregate (Toplama) Fonksiyonları', difficulty: '🟡 Orta Seviye' },
      2: { text: 'GROUP BY ve HAVING', difficulty: '🟡 Orta Seviye' },
      3: { content: 'GROUP BY, aynı değere sahip satırları gruplar. HAVING ise bu grupları filtreler — WHERE gibi ama aggregate sonuçları için. COUNT/SUM gibi fonksiyonları WHERE içinde kullanamazsınız; bunun için HAVING kullanın.' },
      5: { text: "JOIN'ler — Tabloları Birleştirme", difficulty: '🟡 Orta Seviye' },
      6: { content: "JOIN'ler, birden fazla ilişkili tablodan tek sorguda veri almanızı sağlar. Gerçek dünya veritabanlarında veriler tablolar arasında bölündüğünden JOIN'ler vazgeçilmezdir." },
      8: { text: 'Alt Sorgular (Subquery)', difficulty: '🟡 Orta Seviye' },
      10: { text: 'LIKE, BETWEEN, IN', difficulty: '🟡 Orta Seviye' },
      12: { text: 'Bug Takip DB — İnteraktif Örnek', difficulty: '🟡 Orta Seviye' },
      14: { text: 'Görsel JOIN Kılavuzu — Tam Olarak Hangi Satırların Döndüğünü Gör' },
      15: { content: "Aşağıdaki 4 diyagram aynı veriyi kullanıyor. Eşleşen satırları vurgulamak için 'Eşleşmeleri Göster', sorgu sonucunu görmek için 'Sonucu Göster'e tıklayın. JOIN'leri gerçekten anlamanın en hızlı yolu bu." },
      16: {
        explanation: 'INNER JOIN, yalnızca HER İKİ tabloda da eşleşen satırları döndürür. Carol\'un hiç hatası yok — sonuçtan tamamen hariç tutulur.',
      },
      17: {
        explanation: 'LEFT JOIN, SOL tablodan (testers) TÜM satırları döndürür, artı bugs\'dan eşleşmeleri. Carol bug_count=0 ile görünür — LEFT JOIN, "sıfır dahil her kullanıcı başına say" için mükemmeldir.',
      },
      18: {
        explanation: 'RIGHT JOIN, SAĞ tablodan (bugs) TÜM satırları döndürür. Bug #4\'ün test uzmanı yok — hâlâ tester=NULL ile görünür. Nadiren kullanılır — çoğu geliştirici bunu tablolar yer değiştirilerek LEFT JOIN olarak yeniden yazar.',
      },
      19: {
        left: {
          label: '❌ Yavaş — Her satır için alt sorgu',
          code: `SELECT name,
  (SELECT COUNT(*) FROM bugs
   WHERE tester_id = t.id) AS bug_count
FROM testers t;
-- İç SELECT her tester satırı için bir kez çalışır!`,
          note: "Bağıntılı alt sorgu: O(n) iç sorgu",
        },
        right: {
          label: '✅ Hızlı — Tek JOIN + GROUP BY',
          code: `SELECT t.name, COUNT(b.id) AS bug_count
FROM testers t
LEFT JOIN bugs b ON t.id = b.tester_id
GROUP BY t.id, t.name;
-- Her iki tabloda tek geçiş`,
          note: "LEFT JOIN: 0 hatalı durumları da doğru işler",
        },
      },
      20: {
        question: 'Hangi JOIN türü, sağ tabloda eşleşmesi olmayan satırlar dahil sol tablodan TÜM satırları döndürür?',
        options: ['INNER JOIN', 'CROSS JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 2,
        explanation: "LEFT JOIN (LEFT OUTER JOIN olarak da bilinir), sol tablodan her satırı döndürür. Sağ tabloda eşleşme yoksa NULL değerler görünür. \"Sıfır hataya sahip olanlar dahil tüm test uzmanları\" gibi durumlarda kullanılır.",
      },
      21: { text: '☕ Java Biliyorsan: PreparedStatement ve Transaction Köprüsü' },
      22: {
        topic: "PreparedStatement → Parametreli Sorgu",
        why: "SQL Injection önleme! Java, PreparedStatement ile ? yer tutucuları kullanır. Python aynı konsepti uygular — %s (MySQL/PostgreSQL) veya ? (SQLite). Kullanıcı girdilerini asla SQL string'ine birleştirmeyin!",
        note: "Python psycopg2/MySQL %s kullanır. SQLite ? kullanır (Java gibi!). SQL değerleri için asla f-string veya + birleştirme kullanmayın — her zaman parametreli sorgu kullanın.",
      },
      23: {
        topic: "Transaction Yönetimi (commit / rollback)",
        why: "Transaction'lar, hepsini-ya-da-hiçbirini değişiklikleri garanti eder — test verisi kurulumu için kritik. Java setAutoCommit(false) çağırır. Python sürücülerinde otomatik commit varsayılan olarak kapalıdır; siz commit() çağırırsınız.",
        note: "QA ipucu: test verisi kurulumunu transaction içine sarın ve her testin ardından geri alın — DELETE temizlik sorguları yazmadan DB'yi temiz tutar.",
      },
    }
  }),
  applyTr(sections[4], {
    title: '🔴 Seviye 3: İleri Seviye SQL',
    blocks: {
      0: { text: 'Window (Pencere) Fonksiyonları', difficulty: '🔴 İleri' },
      1: { content: "Window fonksiyonları, GROUP BY'ın aksine satırları daraltmadan ilgili satırlar üzerinde hesaplamalar yapar. Her satır kendi sonucunu korurken komşu satırlar hakkında da bilgi alır." },
      3: { text: 'CTE — Common Table Expressions (Ortak Tablo İfadeleri)', difficulty: '🔴 İleri' },
      5: { text: "Transaction'lar — ACID Özellikleri", difficulty: '🔴 İleri' },
      7: { text: "Index'ler — Sorguları Hızlandırma", difficulty: '🔴 İleri' },
      9: { text: "View'lar (Görünümler)", difficulty: '🔴 İleri' },
      11: { text: 'SQL Injection & Parametreli Sorgular', difficulty: '🔴 İleri' },
      13: {
        title: 'ACID Transaction Akışı — DB İçinde Neler Oluyor',
        note: 'ACID garantileri, test verinizin her zaman tutarlı bir durumda olduğu anlamına gelir — kısmi insert yok, işlemler arası phantom read yok.',
        steps: [
          { num: 'A', label: 'Atomiklik', desc: 'Hepsi veya hiçbiri', highlight: true },
          { num: 'C', label: 'Tutarlılık', desc: 'Kurallar zorlanır' },
          { num: 'I', label: 'İzolasyon', desc: 'Eş zamanlı güvenli', highlight: true },
          { num: 'D', label: 'Dayanıklılık', desc: 'Çökmeden sağ kaldı' },
        ],
      },
      14: {
        title: 'Transaction Yaşam Döngüsü — Her SQL Komutu Ne Yapar',
        items: [
          { icon: '🚀', label: 'START TRANSACTION', desc: 'Atomik bloğu başlat' },
          { arrow: true },
          { icon: '✏️', label: 'INSERT / UPDATE / DELETE', desc: 'Birden fazla ifade' },
          { arrow: true },
          { icon: '✅', label: 'COMMIT', desc: 'Tüm değişiklikleri kalıcı yap', highlight: true },
          { arrow: true },
          { icon: '↩️', label: 'ROLLBACK', desc: 'Hata varsa tümünü geri al' },
        ],
        note: 'COMMIT tüm değişiklikleri kalıcı kılar. ROLLBACK START TRANSACTION\'a kadar her şeyi geri alır — tüm batch için Ctrl+Z gibi.',
      },
    }
  }),
  applyTr(sections[5], {
    title: '🧪 QA için SQL — Gerçek Test Senaryoları',
    blocks: {
      0: { text: 'Senaryo 1: Son 7 Günde Başarısız Olan Testleri Bul' },
      2: { text: 'Senaryo 2: Tekrarlanan Test Verisi Girişlerini Bul' },
      4: { text: 'Senaryo 3: Foreign Key İlişkilerini Doğrula (Yetim Kayıtları Bul)' },
      6: { text: 'Senaryo 4: Test Sonuçlarını Duruma Göre Yüzdeyle Say' },
      8: { text: 'Senaryo 5: 30 Günden Eski Test Verilerini Temizle' },
      10: { text: 'Senaryo 6: EXPLAIN — Yavaş Sorguları Bul ve Düzelt' },
    }
  }),
  applyTr(sections[6], {
    title: '💼 SQL Mülakat Soruları & Cevapları',
    blocks: {
      0: { content: 'Model cevabı görmek için her soruya tıklayın. Kod örnekleri içerir.' },
      1: { text: '🟢 Temel Sorular' },
      2: { question: 'S1: WHERE ile HAVING arasındaki fark nedir?', answer: 'WHERE, gruplama yapılmadan önce tek tek SATIRLARI filtreler — ham sütun değerleri üzerinde çalışır.\nHAVING, GROUP BY çalıştıktan sonra GRUPLARI filtreler — aggregate fonksiyon sonuçları üzerinde çalışır.\n\nKural: Filtrenizde COUNT, SUM, AVG gibi fonksiyonlar varsa → HAVING. Aksi hâlde → WHERE.' },
      3: { question: 'S2: Farklı JOIN türlerini açıklayın.', answer: 'INNER JOIN: Yalnızca her iki tabloda da eşleşen satırları döndürür. Eşleşmeyen satırlar hariç tutulur.\n\nLEFT (OUTER) JOIN: Sol tablodaki TÜM satırları + eşleşen sağ satırları döndürür. Eşleşme yoksa sağ taraf NULL olur.\n\nRIGHT (OUTER) JOIN: Sağ tablodaki TÜM satırları döndürür; sol taraf eşleşmiyorsa NULL.\n\nFULL OUTER JOIN: Her iki tablodaki TÜM satırları döndürür; eşleşme yoksa NULL.\n\nCROSS JOIN: Kartezyen çarpım — sol tablodaki her satır sağ tablodaki her satırla birleştirilir.' },
      4: { question: 'S3: PRIMARY KEY ile FOREIGN KEY arasındaki fark nedir?', answer: "PRIMARY KEY (PK): Tablodaki her satırı benzersiz olarak tanımlar. NULL olamaz. Her tabloda yalnızca bir tane bulunur. Genellikle otomatik artan tam sayıdır.\n\nFOREIGN KEY (FK): Başka bir tablonun PRIMARY KEY'ini referans alan sütundur. Referans bütünlüğünü zorunlu kılar — ana tabloda bulunmayan bir FK değeri eklenemez." },
      5: { question: 'S4: NULL nedir ve nasıl kontrol edilir?', answer: "NULL 'değer yok' veya 'bilinmiyor' anlamına gelir. 0, boş string '' ya da false'tan farklıdır. NULL'a yapılan her karşılaştırma NULL döndürür (true veya false değil).\n\nNULL kontrolü için = veya != kullanILAMAZ; IS NULL veya IS NOT NULL kullanılmalıdır. Varsayılan değer sağlamak için COALESCE() kullanın." },
      6: { question: 'S5: DELETE, TRUNCATE ve DROP arasındaki fark nedir?', answer: "DELETE: WHERE koşuluna uyan satırları kaldırır. ROLLBACK destekler. Trigger'ları tetikler. Büyük tablolarda yavaştır.\n\nTRUNCATE: WHERE olmadan TÜM satırları anında kaldırır. MySQL'de ROLLBACK yapılamaz. DELETE'den çok daha hızlıdır. Trigger'ları tetiklemez.\n\nDROP: Tüm yapısıyla birlikte TABLOYU tamamen siler. DROP'tan sonra tablo artık mevcut değildir." },
      7: { text: '🟡 Orta Seviye Sorular' },
      8: { question: 'S6: UNION ile UNION ALL arasındaki fark nedir?', answer: 'UNION: İki sorgunun sonuçlarını birleştirir ve tekrarlanan satırları kaldırır. Tüm satırları tarayıp karşılaştırdığı için daha yavaştır.\n\nUNION ALL: Sonuçları birleştirir ve tekrarlananlar dahil TÜM satırları korur. Tekilleştirme adımı olmadığı için daha hızlıdır.\n\nHer iki sorgunun da uyumlu veri tiplerine sahip aynı sayıda sütunu olmalıdır.' },
      9: { question: 'S7: Alt sorgular nasıl çalışır? Bağlantılı alt sorgu (correlated subquery) nedir?', answer: "Alt sorgu (subquery), başka bir sorgunun içindeki SELECT'tir. WHERE'de (değer veya küme döndürür), FROM'da (tablo gibi davranır) veya SELECT'te (satır başına bir değer döndürür) yer alabilir.\n\nBağlantılı alt sorgu (correlated subquery), dış sorgudaki bir sütunu referans alır — dış sorgunun her satırı için bir kez çalışır (yavaş olabilir!). Daha iyi performans için mümkünse JOIN kullanın." },
      10: { question: "S8: Index nedir, performansı nasıl etkiler?", answer: "Index, veritabanının her satırı taramadan koşula uyan satırları bulmasını sağlayan bir veri yapısıdır (genellikle B-tree). Kitabın dizini gibi — sayfaları tek tek okumak yerine doğrudan atlarsınız.\n\nHızlandırır: WHERE içeren SELECT, JOIN ON, ORDER BY.\nYavaşlatır: INSERT, UPDATE, DELETE (index'ler de güncellenmeli).\nIndex ekleyin: WHERE sütunları, FK sütunları, sık sıralanan sütunlar.\nIndex eklemeyin: Küçük tablolar, az farklı değerli sütunlar (boolean, 3 değerli status), sık güncellenen sütunlar." },
      11: { question: 'S9: Bir tablodaki en yüksek ikinci değeri bulan sorgu yazın.', answer: 'Klasik mülakat sorusu. LIMIT/OFFSET, alt sorgu veya window fonksiyonu ile birden fazla yaklaşım vardır.' },
      12: { question: 'S10: GROUP BY — SELECT sütunlarına hangi kurallar uygulanır?', answer: "KURAL: SELECT listesindeki her sütun ya GROUP BY'da bulunmalı ya da bir aggregate fonksiyonuna (COUNT, SUM, AVG vb.) sarılmalıdır.\n\nNeden? GROUP BY ile birden fazla satır tek bir gruba çöker. Aggregate edilmemiş sütunlar için DB hangi satırın değerini göstereceğini bilemez — ya GROUP BY'a ekleyin ya da aggregate edin." },
      13: { text: '🔴 İleri Seviye Sorular' },
      14: { question: 'S11: Window fonksiyonlarını pratik bir örnekle açıklayın.', answer: "Window fonksiyonları, satırları daraltmadan ilgili satırlar 'penceresi' üzerinde hesaplamalar yapar. GROUP BY'ın aksine her satır kendi kimliğini korur ve window hesaplaması sonucunu alır.\n\nOVER() pencereyi tanımlar. PARTITION BY gruplar (GROUP BY gibi ama daraltmaz). OVER içindeki ORDER BY bir sıra oluşturur. Kullanım alanları: sıralama, kümülatif toplamlar, önceki/sonraki satırla karşılaştırma." },
      15: { question: "S12: CTE nedir? Alt sorguya göre ne zaman tercih edilmeli?", answer: "CTE (WITH ifadesi), adlandırılmış geçici bir sonuç kümesidir. Bir kez değerlendirilir ve birden fazla kez referans alınabilir.\n\nCTE'yi alt sorgulara tercih edin: sorguyu adlandırılmış alt adımlara bölmek okunabilirliği artırıyorsa, aynı alt sorguya birden fazla referans verecekseniz, recursive sorgular (hiyerarşik veri) yazıyorsanız. Basit tek kullanımlık türetmeler için alt sorgular yeterlidir." },
      16: { question: "S13: Transaction nasıl çalışır? ACID özellikleri nelerdir?", answer: "Transaction, tek bir birim olarak işlenen bir dizi SQL işlemidir — ya TÜMÜ başarılı olur ya da HİÇBİRİ olmaz.\n\nACID:\nAtomicity (Atomiklik): Ya hepsi ya hiç — tek başarısızlık her şeyi geri alır.\nConsistency (Tutarlılık): Transaction, DB'yi bir geçerli durumdan diğerine taşır.\nIsolation (İzolasyon): Eş zamanlı transaction'lar birbirinin devam eden değişikliklerini görmez.\nDurability (Kalıcılık): Commit edilen veriler çökmelerden sağ çıkar (diske yazılır)." },
      17: { question: 'S14: SQL injection nedir ve parametreli sorgular bunu nasıl önler?', answer: "SQL injection: Kullanıcı girişi SQL kodu olarak yorumlanır; saldırganlar kimlik doğrulamayı atlayabilir, tüm verileri okuyabilir veya tabloları silebilir.\n\nParametreli sorgular (hazırlanmış ifadeler), değerleri SQL yapısından ayrı olarak DATA şeklinde iletir. DB motoru değerleri otomatik olarak escape eder — içeriklerinden bağımsız olarak asla SQL kodu olarak yorumlanamaz." },
      18: { question: 'S15: Yavaş bir sorguyu nasıl optimize edersiniz?', answer: "1. Sorgu planını görmek için EXPLAIN/EXPLAIN ANALYZE çalıştırın — 'full table scan' (type:ALL) ve NULL index'lere bakın.\n2. WHERE sütunlarına, JOIN sütunlarına uygun index'ler ekleyin.\n3. Mümkünse alt sorguları JOIN'lere çevirin.\n4. SELECT * yerine yalnızca gerekli sütunları seçin.\n5. Sonuç boyutunu azaltmak için LIMIT kullanın.\n6. Toplamalar için GROUP BY sütunlarının index'li olduğundan emin olun.\n7. Karmaşık sorgular için CTE kullanın.\n8. Eksik FK index'lerini kontrol edin.\n9. Her değişiklikten sonra EXPLAIN çıktısını doğrulayın." },
    }
  }),
  applyTr(sections[7], {
    title: '📝 Pratik Alıştırmalar & Hızlı Referans',
    blocks: {
      0: { text: 'Pratik Alıştırmalar' },
      1: {
        difficulty: '🟢 Başlangıç',
        title: 'Alıştırma 1: Başarısız Test Çalıştırmalarını Sorgula',
        description: 'id, test_name, status (PASS/FAIL/SKIP), duration_ms, run_date sütunlarına sahip bir test_runs tablosu verilmektedir. ÜÇ sorgu yazın: (a) bugünün tüm başarısız çalıştırmaları, (b) her durumun sayısı, (c) en yavaş 3 test.',
        hint: 'WHERE status="FAIL" AND DATE(run_date)=CURDATE() kullanın. Sayımlar için GROUP BY status. En yavaş için ORDER BY duration_ms DESC LIMIT 3.',
        explanation: "DATE() bir DATETIME'den yalnızca tarih bölümünü çıkarır. CURDATE() bugünün tarihini döndürür. Bunlar MySQL fonksiyonlarıdır — PostgreSQL'de CURRENT_DATE kullanılır.",
      },
      2: {
        difficulty: '🟡 Orta',
        title: 'Alıştırma 2: Çoklu Tablo JOIN',
        description: 'Üç tablonuz var: users (id, name, email), test_cases (id, title, category), results (id, user_id, test_case_id, status, run_date). Son 30 günde çalıştırılan testler için: test uzmanı adı, test case başlığı, durum ve tarihi gösteren, en yenisi önce sıralı bir sorgu yazın.',
        hint: '3 tabloyu JOIN edin: users→results (user_id üzerinden), test_cases→results (test_case_id üzerinden). WHERE run_date >= NOW() - INTERVAL 30 DAY kullanın.',
        explanation: '"results" tablosundan (users ve test_cases\'ı birleştiren ara tablo) başlayıp JOIN yapın. Bu, istenmeyen kartezyen çarpımı önler.',
      },
      3: {
        difficulty: '🔴 İleri',
        title: 'Alıştırma 3: CTE + Window Fonksiyonu — Test Uzmanlarını Başarı Oranına Göre Sırala',
        description: 'results tablosunu (user_id, status, sprint) kullanarak: CTE ile istatistikleri hesaplayıp RANK() window fonksiyonu ile test uzmanlarını SPRINT BAŞINA başarı oranına göre sıralayan bir sorgu yazın. Göster: sprint, uzman adı, toplam test, başarı sayısı, başarı oranı %, sprint içi sıralama.',
        hint: 'CTE: sayımlar için sprint ve user_id grupla. Sonra isimler için users JOIN. Ardından RANK() OVER (PARTITION BY sprint ORDER BY pass_rate DESC) ekle.',
        explanation: "İki CTE: birincisi ham sayımları toplar, ikincisi oranı hesaplar ve kullanıcı adlarını JOIN eder. Son SELECT window fonksiyonunu ekler. CTE'lere bölmek her adımı ayrıca hata ayıklanabilir kılar.",
      },
      4: { text: 'Hızlı Referans Kartı' },
      5: {
        headers: ['Komut', 'Söz Dizimi', 'Amaç'],
        rows: [
          ['SELECT', 'SELECT col FROM tbl WHERE cond', 'Tablodan veri oku'],
          ['INSERT', 'INSERT INTO tbl (cols) VALUES (...)', 'Yeni satır ekle'],
          ['UPDATE', 'UPDATE tbl SET col=val WHERE cond', 'Mevcut satırları güncelle'],
          ['DELETE', 'DELETE FROM tbl WHERE cond', 'Satırları sil'],
          ['CREATE TABLE', 'CREATE TABLE t (id INT PRIMARY KEY, ...)', 'Yeni tablo tanımla'],
          ['JOIN (INNER)', 'JOIN t2 ON t1.id = t2.fk', 'Her iki tabloda eşleşen satırlar'],
          ['LEFT JOIN', 'LEFT JOIN t2 ON t1.id = t2.fk', 'Sol tablodaki tüm satırlar + eşleşen sağ'],
          ['GROUP BY', 'GROUP BY col HAVING COUNT(*) > N', 'Topla + grupları filtrele'],
          ['ORDER BY', 'ORDER BY col DESC LIMIT N', 'Sırala ve sınırla'],
          ['COUNT/SUM/AVG', 'SELECT COUNT(*), AVG(col)', 'Aggregate fonksiyonlar'],
          ['NULL kontrolü', 'WHERE col IS NULL', 'Eksik değerleri bul'],
          ['COALESCE', 'COALESCE(col, default)', "NULL'ı varsayılan ile değiştir"],
          ['CTE', 'WITH name AS (SELECT ...) SELECT ...', 'Adlandırılmış geçici alt sorgu'],
          ['Window RANK', 'RANK() OVER (PARTITION BY ... ORDER BY ...)', 'Gruplar içinde sırala'],
          ['EXPLAIN', 'EXPLAIN SELECT ...', 'Sorgu yürütme planını göster'],
        ]
      },
      6: { content: "Hızlı deneyler için db-fiddle.com'u yer imlerine ekleyin. DELETE veya UPDATE çalıştırmadan önce WHERE koşulunu SELECT ile test edin — tek bir eksik WHERE tüm tabloyu silebilir." },
    }
  }),
]

const trHero = {
  title: '🗄️ SQL',
  subtitle: 'Sıfırdan Veritabanı Test Uzmanına',
  intro: 'SQL\'i test otomasyonu için öğrenin — backend durumunu doğrulamak, test verisi eklemek, bütünlüğü kontrol etmek ve her SQL mülakatını geçmek için. Önceden veritabanı deneyimi gerekmez.',
}

const trTabs = ['🎯 Giriş', '📦 Kurulum', '🟢 Temeller', '🟡 Orta Seviye', '🔴 İleri Seviye', '🧪 QA Kullanım', '💼 Mülakat', '📝 Pratik & Referans']

const enHero = {
  title: '🗄️ SQL',
  subtitle: 'From Zero to Database Testing Expert',
  intro: 'Master SQL for test automation — query databases to verify backend state, seed test data, validate integrity, and pass any SQL interview. No prior database experience needed.',
}

const enTabs = ['🎯 Intro & Why', '📦 Installation', '🟢 Foundations', '🟡 Intermediate', '🔴 Advanced', '🧪 QA Use Cases', '💼 Interview Q&A', '📝 Practice & Reference']

export const sqlData = {
  en: { hero: enHero, tabs: enTabs, sections },
  tr: { hero: trHero, tabs: trTabs, sections: trSections },
}
