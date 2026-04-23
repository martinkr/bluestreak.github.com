import{a as o}from"./code-highlighting-DDbubx5s.js";const e=document.querySelector("#app");if(!e)throw new Error("Missing #app");e.innerHTML=`
  <div class="container">
    <nav class="nav">
      <div class="brand"><strong>Bluestreak Docs</strong></div>
      <div class="nav-links">
        <a class="pill" href="/">Home</a>
        <a class="pill" href="/docs/">Docs</a>
      </div>
    </nav>

    <div class="docs-layout">
      <aside class="sidebar">
        <h3>On this page</h3>
        <a href="#quick-start">Recommended quick start</a>
        <a href="#use-cases">Use cases</a>
        <a href="#profiles">Compliance profiles</a>
        <a href="#config">Configuration options</a>
        <a href="#api">API reference</a>
        <a href="#pino">Pino</a>
        <a href="#winston">Winston</a>
        <a href="#console-browser">Browser console.log</a>
        <a href="#console-node">Node console and files</a>
        <a href="#stream-vs-non-stream">Stream vs non-stream</a>
      </aside>

      <main class="content">
        <header class="hero" style="padding-top:1rem;">
          <div class="logo-stage">
            <img class="logo" src="/bluestreak-logo.png" alt="Bluestreak logo" />
            <span class="pill" style="border-radius:9999px;background:#f2f9ff;color:#097fe8;border-color:transparent;">Implementation guide</span>
          </div>
          <h1>Documentation and integration examples</h1>
          <p>
            Practical docs for adoption, configuration, and logger integration. This mirrors the core README content,
            organized for fast implementation in real services.
          </p>
        </header>

        <section class="section" id="quick-start">
          <h2>Recommended quick start</h2>
          <p>
            Use <code>compileRecommendedPolicy()</code> for a low-friction baseline:
            <code>en-en</code> locale + <code>GDPR</code>/<code>PCI_DSS</code> profiles +
            baseline text patterns (<code>EMAIL</code>, <code>BEARER_TOKEN</code>, <code>AUTH_HEADER</code>).
          </p>
          <div class="card">
            <pre><code>import { compileRecommendedPolicy, redactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

const output = redactLine(
  JSON.stringify({
    password: "secret",
    message: "contact alice@example.com",
    authorization: "Bearer token-123"
  }),
  policy
);</code></pre>
          </div>
          <p class="muted" style="margin-top:0.8rem;">
            Override any option while keeping the recommended preset:
            locales, profiles, paths, patterns, and scan limits.
          </p>
        </section>

        <section class="section" id="use-cases">
          <h2>Use cases</h2>
          <div class="grid three">
            <article class="card"><h3>Pipeline redaction</h3><p class="muted">Scrub logs before they reach Datadog, Elasticsearch, S3, or SIEM tooling.</p></article>
            <article class="card"><h3>Text field scanning</h3><p class="muted">Catch secrets inside <code>message</code>, <code>error</code>, <code>stack</code>, and other free-text fields.</p></article>
            <article class="card"><h3>Shared org policy</h3><p class="muted">Compile once at startup and reuse a single policy across workers and services.</p></article>
          </div>
        </section>

        <section class="section" id="profiles">
          <h2>Compliance profiles</h2>
          <p>Choose one or many: <code>GDPR</code>, <code>HIPAA</code>, <code>PCI_DSS</code>, <code>SOC2</code>, or <code>"*"</code> for all.</p>
          <div class="card">
            <pre><code>// GDPR: names, addresses, tax IDs
// HIPAA: patient and medical records
// PCI_DSS: card and payment fields
// SOC2: auth and secret material

const policy = compilePolicy({
  complianceProfiles: ["GDPR", "SOC2"],
  locales: ["en-en", "de-de"]
});</code></pre>
          </div>
          <p class="muted" style="margin-top:0.8rem;">Supported built-in locale tags: <code>en-en</code>, <code>de-de</code>, <code>es-es</code>, <code>fr-fr</code>.</p>
        </section>

        <section class="section" id="config">
          <h2>Configuration options</h2>
          <div class="card">
            <pre><code>const policy = compilePolicy({
  complianceProfiles: ["GDPR"],        // profile keyword buckets
  locales: ["en-en"],                  // locale packs
  preset: "logging",                   // "logging" | "strict" | "recommended"
  scanTextFields: ["message", "log"],  // fields to regex scan
  maxFieldScanLength: 4096,            // cap for scanned text length
  extraKeywordLists: [["tenant_key"]], // runtime-added key names
  panSeparatorChars: " -._",           // enable card candidate detection
  customPatterns: [],                  // your regex list
  redactPaths: ["request.headers.authorization"],
  excludePaths: ["product.id"],
  pathCensor: "[**REDACTED**]"         // or callback (value, path) => unknown
});</code></pre>
          </div>
          <div class="callout" style="margin-top:0.8rem;">
            Exact path mode is intentional: wildcards are rejected so matching remains deterministic and performant.
          </div>
        </section>

        <section class="section" id="api">
          <h2>API reference</h2>
          <div class="grid three">
            <article class="card"><h3>compilePolicy(config)</h3><p class="muted">Build and cache a <code>CompiledPolicy</code> once.</p></article>
            <article class="card"><h3>compileRecommendedPolicy(config?)</h3><p class="muted">Shortcut for <code>preset: "recommended"</code>.</p></article>
            <article class="card"><h3>composeKeywordSet(input)</h3><p class="muted">Same option surface; useful for runtime keyword composition.</p></article>
            <article class="card"><h3>redactLine(raw, policy)</h3><p class="muted">Main line-level entry point with raw fallback on invalid JSON.</p></article>
            <article class="card"><h3>tryRedactLine(raw, policy)</h3><p class="muted">Never throws; returns raw input on failure.</p></article>
            <article class="card"><h3>redactParsed(value, policy)</h3><p class="muted">Redact already-parsed objects.</p></article>
            <article class="card"><h3>redactTree(node, policy)</h3><p class="muted">Returns <code>{ value, changed }</code> for parsed JSON trees.</p></article>
            <article class="card"><h3>redactLines(lines, policy)</h3><p class="muted">Async iterator wrapper around <code>redactLine</code>.</p></article>
            <article class="card"><h3>tryRedactLines(lines, policy)</h3><p class="muted">Safe async iterator wrapper.</p></article>
          </div>
          <p class="muted" style="margin-top:0.8rem;">
            Pattern exports include <code>BUILTIN_PATTERNS</code>, <code>SERVICE_PATTERNS</code>,
            and category sets (<code>SOURCE_CONTROL_PATTERNS</code>, <code>CLOUD_PATTERNS</code>, etc).
          </p>
        </section>

        <section class="section" id="pino">
          <h2>Pino integration</h2>
          <p>Use a writable destination wrapper to redact each emitted line before output.</p>
          <div class="card">
        <pre><code>import pino from "pino";
import { Writable } from "node:stream";
import { compileRecommendedPolicy, tryRedactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

function createRedactingSink(target: NodeJS.WritableStream) {
  return new Writable({
    write(chunk, _enc, cb) {
      const line = chunk.toString("utf8");
      target.write(tryRedactLine(line, policy));
      cb();
    }
  });
}

const logger = pino({}, createRedactingSink(process.stdout));
logger.info({ email: "alice@example.com", token: "Bearer abc123" }, "user login");</code></pre>
          </div>
          <p class="muted" style="margin-top:0.7rem;">
            Example output:
            <code>{"level":30,"msg":"user login","email":"[**REDACTED**]","token":"Bearer [**REDACTED**]"}</code>
          </p>
        </section>

        <section class="section" id="winston">
          <h2>Winston integration</h2>
          <p>Configure JSON output and pass logs through a redacting writable stream.</p>
          <div class="card">
        <pre><code>import winston from "winston";
import { Writable } from "node:stream";
import { compileRecommendedPolicy, tryRedactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

function sink(target: NodeJS.WritableStream) {
  return new Writable({
    write(chunk, _enc, cb) {
      target.write(tryRedactLine(chunk.toString("utf8"), policy));
      cb();
    }
  });
}

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.Stream({ stream: sink(process.stdout) })]
});

logger.info({ authorization: "Bearer top-secret", userEmail: "bob@example.com" });</code></pre>
          </div>
          <p class="muted" style="margin-top:0.7rem;">
            Example output:
            <code>{"level":"info","authorization":"Bearer [**REDACTED**]","userEmail":"[**REDACTED**]"}</code>
          </p>
        </section>

        <section class="section" id="console-browser">
          <h2>Browser console.log wrapper</h2>
          <p>Use the main package only (not <code>bluestreak/node</code>) in browser builds.</p>
          <div class="card">
        <pre><code>import { compileRecommendedPolicy, redactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

function safeLog(payload: unknown) {
  const raw = typeof payload === "string" ? payload : JSON.stringify(payload);
  console.log(redactLine(raw, policy));
}

safeLog({
  event: "checkout",
  email: "shopper@example.com",
  authorization: "Bearer browser-token"
});</code></pre>
          </div>
          <p class="muted" style="margin-top:0.7rem;">
            Example output:
            <code>{"event":"checkout","email":"[**REDACTED**]","authorization":"Bearer [**REDACTED**]"}</code>
          </p>
        </section>

        <section class="section" id="console-node">
          <h2>Node console and file pipeline</h2>
          <p>For files or transport pipes, use line-aware transforms from <code>bluestreak/node</code>.</p>
          <div class="card">
        <pre><code>import { createReadStream, createWriteStream } from "node:fs";
import { compileRecommendedPolicy } from "bluestreak";
import { createLineRedactingTransform } from "bluestreak/node";

const policy = compileRecommendedPolicy();

createReadStream("app.log")
  .pipe(createLineRedactingTransform(policy, { safe: true }))
  .pipe(createWriteStream("app.redacted.log"));</code></pre>
          </div>
          <p class="muted" style="margin-top:0.7rem;">
            Example output line in <code>app.redacted.log</code>:
            <code>{"message":"Authorization: Bearer [**REDACTED**]","password":"[**REDACTED**]"}</code>
          </p>
        </section>

        <section class="section" id="stream-vs-non-stream">
          <h2>When to use stream vs non-stream mode</h2>
          <div class="card">
        <pre><code>// Non-stream mode
// - You have one payload or one line in memory
// - Call redactLine / tryRedactLine directly
//
// Stream mode
// - Data flows through Node streams/transports
// - Use createLineRedactingTransform / redactTransform</code></pre>
          </div>
          <p class="muted" style="margin-top:0.8rem;">
            Redaction rules are identical in both modes. The only difference is integration style.
          </p>
        </section>

        <footer>
          Need deeper API detail? Pair this guide with the main Bluestreak README and docs folder in the library repo.
        </footer>
      </main>
    </div>
  </div>
`;o(e);
