import{a as o}from"./code-highlighting-DSiBdJNj.js";const e=document.querySelector("#app");if(!e)throw new Error("Missing #app");e.innerHTML=`
  <div class="site-wrapper">
    <div class="container">
      <nav class="nav">
        <a class="brand" href="/">
          <img class="nav-logo" src="/bluestreak-logo.png" alt="Bluestreak" />
          <strong>Bluestreak</strong>
        </a>
        <div class="nav-links">
          <a class="pill" href="/">Home</a>
          <a class="pill" href="/docs/">Docs</a>
          <a class="pill pill-github" href="https://github.com/martinkr/bluestreak" target="_blank" rel="noopener">GitHub</a>
        </div>
      </nav>
    </div>

    <div class="container">
      <div class="docs-layout">
        <aside class="sidebar">
          <h3>Getting started</h3>
          <a href="#install">Install</a>
          <a href="#quick-start">Quick start</a>
          <a href="#use-cases">Use cases</a>
          <h3>Configuration</h3>
          <a href="#profiles">Compliance profiles</a>
          <a href="#locales">Locale packs</a>
          <a href="#config">All options</a>
          <h3>API</h3>
          <a href="#api">API reference</a>
          <a href="#patterns">Available patterns</a>
          <h3>Integrations</h3>
          <a href="#pino">Pino</a>
          <a href="#winston">Winston</a>
          <a href="#console-browser">Browser console</a>
          <a href="#stream-pipeline">Stream pipeline</a>
          <h3>Advanced</h3>
          <a href="#stream-vs-non-stream">Stream vs non-stream</a>
          <a href="#custom-locale">Custom locale packs</a>
          <a href="#tenant">Tenant-specific fields</a>
          <a href="#performance">Performance tuning</a>
        </aside>

        <main class="content">
          <header class="docs-header">
            <div class="hero-badge">Implementation guide</div>
            <h1>Documentation</h1>
            <p>
              Practical reference for adopting, configuring, and integrating Bluestreak into your Node.js services.
              Start with the quick start, then jump to your logger's integration section.
            </p>
          </header>

          <section class="section" id="install">
            <h2>Install</h2>
            <div class="card">
              <pre><code>npm install bluestreak</code></pre>
            </div>
            <p class="muted" style="margin-top:0.8rem;">Requires Node.js 20+. Zero runtime dependencies. TypeScript types included.</p>
          </section>

          <section class="section" id="quick-start">
            <h2>Quick start</h2>
            <p>
              <code>compileRecommendedPolicy()</code> gives you a production-ready baseline:
              <code>en-en</code> locale · <code>GDPR</code> / <code>PCI_DSS</code> profiles ·
              email, bearer token, and auth header pattern scanning.
              No configuration required.
            </p>
            <div class="card">
              <pre><code>import { compileRecommendedPolicy, redactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

const output = redactLine(
  JSON.stringify({
    password: "hunter2",
    message: "login from alice@example.com",
    authorization: "Bearer top-secret-token",
    card: "4111 1111 1111 1111"
  }),
  policy
);

console.log(output);
// {"password":"[**REDACTED**]","message":"login from [**REDACTED**]",
//  "authorization":"Bearer [**REDACTED**]","card":"[**REDACTED**]"}</code></pre>
            </div>
            <div class="callout" style="margin-top:0.8rem;">
              Compile the policy <strong>once</strong> at startup. It is a plain object — share it across workers, queue consumers, and services. Never call <code>compilePolicy</code> per log line.
            </div>
          </section>

          <section class="section" id="use-cases">
            <h2>Use cases</h2>
            <div class="grid two">
              <article class="card"><h3>Pipeline redaction</h3><p class="muted">Scrub logs before they reach Datadog, Elasticsearch, S3, or SIEM tooling. The same compiled policy everywhere means one auditable definition of "redacted."</p></article>
              <article class="card"><h3>Text field scanning</h3><p class="muted">Catch secrets inside <code>message</code>, <code>error</code>, <code>stack</code>, and other free-text fields where path rules alone are not enough.</p></article>
              <article class="card"><h3>Shared org policy</h3><p class="muted">Compile once and reuse across workers and services. Security teams own a single policy; application teams call <code>redactLine</code>.</p></article>
              <article class="card"><h3>Incident response</h3><p class="muted">Share logs quickly without manually sanitising payloads under time pressure. Bluestreak handles it at the source, before the log leaves the process.</p></article>
            </div>
          </section>

          <section class="section" id="profiles">
            <h2>Compliance profiles</h2>
            <p>Pass any combination of profiles. Each adds a curated list of field name aliases to the keyword set.</p>
            <div class="card">
              <pre><code>const policy = compilePolicy({
  complianceProfiles: ["GDPR", "SOC2"],
  locales: ["en-en"]
});</code></pre>
            </div>
            <div class="profile-list" style="margin-top:1rem;">
              <div class="profile-item">
                <span class="profile-tag">GDPR</span>
                <span class="muted">Names, addresses, national IDs, location, tax IDs</span>
              </div>
              <div class="profile-item">
                <span class="profile-tag">HIPAA</span>
                <span class="muted">Patient IDs, medical records, diagnoses, insurance numbers</span>
              </div>
              <div class="profile-item">
                <span class="profile-tag">PCI_DSS</span>
                <span class="muted">Card numbers, CVV/CVC, expiry dates, track data</span>
              </div>
              <div class="profile-item">
                <span class="profile-tag">SOC2</span>
                <span class="muted">API keys, session tokens, private keys, auth headers</span>
              </div>
            </div>
            <p class="muted" style="margin-top:0.8rem;">Use <code>"*"</code> to load all profile keyword buckets at once.</p>
          </section>

          <section class="section" id="locales">
            <h2>Locale packs</h2>
            <p>Each locale pack covers its own language only. Include <code>"en-en"</code> explicitly alongside other locales — English field names are not in non-English packs.</p>
            <div class="card">
              <pre><code>// Multilingual codebase — merge all needed locales
const policy = compilePolicy({
  complianceProfiles: ["GDPR"],
  locales: ["en-en", "de-de", "fr-fr"],
  // password + passwort + mot_de_passe → all caught
  scanTextFields: ["message", "log"],
  maxFieldScanLength: 4096,
});</code></pre>
            </div>
            <p class="muted" style="margin-top:0.8rem;">Supported built-in tags: <code>en-en</code>, <code>de-de</code>, <code>es-es</code>, <code>fr-fr</code>. You can also define custom locale packs — see <a href="#custom-locale">Custom locale packs</a>.</p>
          </section>

          <section class="section" id="config">
            <h2>All configuration options</h2>
            <div class="card">
              <pre><code>const policy = compilePolicy({
  complianceProfiles: ["GDPR"],        // profile keyword buckets
  locales: ["en-en"],                  // locale packs (string tags or pack objects)
  preset: "logging",                   // "logging" | "strict" | "recommended"
  scanTextFields: ["message", "log"],  // fields to pattern-scan
  maxFieldScanLength: 4096,            // cap for scanned text (chars)
  extraKeywordLists: [["tenant_key"]], // runtime-injected key names
  panSeparatorChars: " -._",           // enable card number detection (Luhn)
  customPatterns: [],                  // your regex list (g flag added automatically)
  redactPaths: ["request.headers.authorization"],  // exact paths to redact
  excludePaths: ["product.id"],        // exact paths to preserve
  pathCensor: "[**REDACTED**]"         // replacement string or (value, path) => unknown
});</code></pre>
            </div>
            <div class="callout" style="margin-top:0.8rem;">
              <strong>Exact paths only.</strong> Wildcards (<code>*</code>) and deep-globs (<code>**</code>) are rejected at compile time — matching stays deterministic and fast.
            </div>
          </section>

          <section class="section" id="api">
            <h2>API reference</h2>
            <div class="grid two">
              <article class="card"><h3><code>compilePolicy(config)</code></h3><p class="muted">Build and cache a <code>CompiledPolicy</code> once. Share across workers.</p></article>
              <article class="card"><h3><code>compileRecommendedPolicy(config?)</code></h3><p class="muted">Shorthand for <code>preset: "recommended"</code>. All fields optional.</p></article>
              <article class="card"><h3><code>composeKeywordSet(input)</code></h3><p class="muted">Same options as <code>compilePolicy</code>. Useful for runtime keyword composition (tenant fields).</p></article>
              <article class="card"><h3><code>redactLine(raw, policy)</code></h3><p class="muted">Main entry point. JSON parse → redact → stringify. Falls back to raw scrubber on invalid JSON. Returns original string unchanged when nothing is redacted.</p></article>
              <article class="card"><h3><code>tryRedactLine(raw, policy)</code></h3><p class="muted">Never throws. Returns <code>raw</code> unchanged on any failure. Use on hot production sinks.</p></article>
              <article class="card"><h3><code>redactParsed(value, policy)</code></h3><p class="muted">Redact an already-parsed object — skips <code>JSON.parse</code>.</p></article>
              <article class="card"><h3><code>redactTree(node, policy)</code></h3><p class="muted">Copy-on-write redaction of a parsed JSON tree. Returns <code>{ value, changed }</code>.</p></article>
              <article class="card"><h3><code>redactLines(lines, policy)</code></h3><p class="muted">Async generator over any <code>AsyncIterable&lt;string&gt;</code>.</p></article>
              <article class="card"><h3><code>tryRedactLines(lines, policy)</code></h3><p class="muted">Safe async generator — uses <code>tryRedactLine</code> per line.</p></article>
              <article class="card"><h3><code>normalizeKey(raw)</code></h3><p class="muted">The same normalization used internally. Useful for debugging why a key didn't match.</p></article>
            </div>

            <h3 class="subsection-h3" style="margin-top:1.6rem;">Stream API — import from <code>bluestreak/node</code></h3>
            <div class="grid two">
              <article class="card"><h3><code>createLineRedactingTransform(policy, options?)</code></h3><p class="muted">Buffers UTF-8 chunks, splits on newlines, redacts each complete line. <code>options.safe</code> uses <code>tryRedactLine</code> per line. No <code>split2</code> required.</p></article>
              <article class="card"><h3><code>redactTransform(policy)</code></h3><p class="muted">Node.js <code>Transform</code> where each chunk is a single complete log line. Split chunks yourself first (e.g. with <code>split2</code>).</p></article>
            </div>
          </section>

          <section class="section" id="patterns">
            <h2>Available patterns</h2>
            <p>No patterns run by default — you choose exactly what gets scanned. Import and add to <code>customPatterns</code>.</p>
            <div class="card" style="margin-bottom:0.8rem;">
              <pre><code>import {
  BUILTIN_PATTERNS,       // EMAIL, BEARER_TOKEN, AUTH_HEADER
  SOURCE_CONTROL_PATTERNS,// GitHub, GitLab, npm
  CLOUD_PATTERNS,         // AWS, Google Cloud, DigitalOcean, HashiCorp Vault
  PAYMENT_PATTERNS,       // Stripe, Square
  MESSAGING_PATTERNS,     // Slack, Twilio, SendGrid, Mailgun
  ECOMMERCE_PATTERNS,     // Shopify, WooCommerce
  MONITORING_PATTERNS,    // New Relic, Grafana, PlanetScale
  CRM_PATTERNS,           // HubSpot, Mailchimp
  AI_PATTERNS,            // OpenAI, Anthropic, Hugging Face
  AUTH_PATTERNS,          // JWT
  SERVICE_PATTERNS,       // all of the above merged flat
} from "bluestreak";</code></pre>
            </div>
            <p class="muted">Card number detection is configured via <code>panSeparatorChars</code> (not a regex) because it requires a Luhn checksum that plain regexes can't express. Set <code>panSeparatorChars: " -._"</code> to enable it.</p>
          </section>

          <section class="section" id="pino">
            <h2>Pino integration</h2>
            <p>
              Pino already ships path-based redaction (<code>redact</code> / <code>fast-redact</code>). Keep that when you only
              need fast in-process path rules on objects you control. Add Bluestreak when you want
              locale + compliance key sets, regex scanning on <code>message</code> / <code>stack</code>,
              or the same policy on non-JSON lines at the serialized line boundary.
            </p>
            <h3 class="subsection-h3">Recommended pattern — redact the serialized line</h3>
            <p class="muted">Compile the policy once. Wrap the final destination so every line goes through Bluestreak before the log agent sees it.</p>
            <div class="card">
              <pre><code>import pino from "pino";
import { Writable } from "node:stream";
import { compileRecommendedPolicy, tryRedactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

function createRedactingSink(sink: NodeJS.WritableStream) {
  let buffer = "";
  return new Writable({
    write(chunk, _encoding, callback) {
      buffer += chunk.toString("utf8");
      const parts = buffer.split("\\n");
      buffer = parts.pop() ?? "";
      for (const line of parts) {
        if (!line) { sink.write("\\n"); continue; }
        sink.write(tryRedactLine(line, policy) + "\\n");
      }
      callback();
    },
    final(callback) {
      if (buffer.length > 0) sink.write(tryRedactLine(buffer, policy));
      buffer = "";
      callback();
    },
  });
}

const logger = pino(createRedactingSink(process.stdout));
logger.info({ email: "alice@example.com", token: "Bearer abc123" }, "user login");</code></pre>
            </div>
            <div class="callout" style="margin-top:0.8rem;">
              Use <code>tryRedactLine</code> (not <code>redactLine</code>) on hot sinks — it never throws, so a redaction bug won't crash your process.
            </div>

            <h3 class="subsection-h3" style="margin-top:1.4rem;">Alternative — stream transform from <code>bluestreak/node</code></h3>
            <div class="card">
              <pre><code>import { compileRecommendedPolicy } from "bluestreak";
import { createLineRedactingTransform } from "bluestreak/node";

const policy = compileRecommendedPolicy();

// Pipe Pino's output stream through the transform
process.stdout
  .pipe(createLineRedactingTransform(policy, { safe: true }))
  .pipe(yourFinalDestination);</code></pre>
            </div>
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
              Example output: <code>{"level":"info","authorization":"Bearer [**REDACTED**]","userEmail":"[**REDACTED**]"}</code>
            </p>
          </section>

          <section class="section" id="console-browser">
            <h2>Browser console wrapper</h2>
            <p>Use the main package only (not <code>bluestreak/node</code>) in browser builds — it has no Node-specific imports.</p>
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
});
// {"event":"checkout","email":"[**REDACTED**]","authorization":"Bearer [**REDACTED**]"}</code></pre>
            </div>
          </section>

          <section class="section" id="stream-pipeline">
            <h2>File and stream pipelines</h2>
            <p>Use the line-buffering transform from <code>bluestreak/node</code> to process files or any byte stream without a line-splitter dependency.</p>
            <div class="card">
              <pre><code>import { createReadStream, createWriteStream } from "node:fs";
import { compileRecommendedPolicy } from "bluestreak";
import { createLineRedactingTransform } from "bluestreak/node";

const policy = compileRecommendedPolicy();

// Handles chunk boundaries — no split2 needed
createReadStream("app.log")
  .pipe(createLineRedactingTransform(policy, { safe: true }))
  .pipe(createWriteStream("app.redacted.log"));</code></pre>
            </div>

            <h3 class="subsection-h3" style="margin-top:1.4rem;">With split2 (one chunk = one line)</h3>
            <div class="card">
              <pre><code>import split2 from "split2";
import { redactTransform } from "bluestreak/node";

createReadStream("app.log")
  .pipe(split2())
  .pipe(redactTransform(policy))
  .pipe(createWriteStream("redacted.log"));</code></pre>
            </div>
          </section>

          <section class="section" id="stream-vs-non-stream">
            <h2>Stream vs non-stream mode</h2>
            <p>Both modes use the same <code>CompiledPolicy</code> and identical redaction rules. Only the integration style differs.</p>
            <div class="card">
              <pre><code>// Non-stream — you already have the line in memory
import { redactLine } from "bluestreak";
const output = redactLine(rawLogLine, policy);

// Stream — data flows through Node.js streams or transports
import { createLineRedactingTransform } from "bluestreak/node";
source.pipe(createLineRedactingTransform(policy)).pipe(destination);</code></pre>
            </div>
            <div class="callout" style="margin-top:0.8rem;">
              <strong>Non-stream</strong> is the right choice for request handlers, queue jobs, browser wrappers, and anywhere you build or receive one log object at a time.<br><br>
              <strong>Stream</strong> is the right choice when log data flows through Node.js streams, Pino destinations, or file pipelines.
            </div>
          </section>

          <section class="section" id="custom-locale">
            <h2>Custom locale packs</h2>
            <p>Define a <code>LocaleKeywordPack</code> in your own codebase — no fork of Bluestreak required.</p>
            <div class="card">
              <pre><code>import type { LocaleKeywordPack } from "bluestreak";
import { compilePolicy } from "bluestreak";

const myPack: LocaleKeywordPack = {
  generalKeywords: ["vault_token", "internal_secret", "legacy_ssn_field"],
  profileKeywords: {
    GDPR: ["customer_ref", "account_holder"],
    HIPAA: ["mrn_internal", "patient_ref"],
    PCI_DSS: ["payment_ref"],
    SOC2: [],
  },
  patterns: [
    /\\bINT-\\d{8}\\b/g,          // internal transaction ID
    /\\bACCT-[A-Z0-9]{12}\\b/g,  // account reference
  ],
};

// Mix with built-in packs
const policy = compilePolicy({
  locales: ["en-en", myPack],
  complianceProfiles: ["GDPR"],
  scanTextFields: ["message", "log"],
  maxFieldScanLength: 4096,
});</code></pre>
            </div>
            <p class="muted" style="margin-top:0.8rem;">
              Patterns defined on a locale pack are applied automatically when that pack is included in <code>locales</code>.
              Use <code>customPatterns</code> in <code>compilePolicy</code> for app-specific formats (external service tokens, internal IDs) that aren't tied to any locale.
            </p>
          </section>

          <section class="section" id="tenant">
            <h2>Tenant-specific field names</h2>
            <p>Inject runtime keywords — from a database, config service, or per-tenant record — using <code>extraKeywordLists</code>. Build and cache one policy per tenant; don't call per line.</p>
            <div class="card">
              <pre><code>import { composeKeywordSet } from "bluestreak";

const tenantFields = await db.query(
  "SELECT field_name FROM sensitive_fields WHERE tenant_id = ?",
  [tenantId],
);

const policy = composeKeywordSet({
  complianceProfiles: ["GDPR"],
  locales: ["en-en"],
  extraKeywordLists: [tenantFields.map((r) => r.field_name)],
  scanTextFields: ["message", "log"],
  maxFieldScanLength: 4096,
});</code></pre>
            </div>
          </section>

          <section class="section" id="performance">
            <h2>Performance tuning</h2>
            <p>Dominant costs: <strong>regex passes</strong> on <code>scanTextFields</code> first, then <strong>exact-path checks</strong>. Keyword set size (locales, profiles) is usually a smaller lever because lookups are O(1).</p>
            <div class="grid two" style="margin-bottom:1rem;">
              <article class="card">
                <h3>Throughput benchmarks</h3>
                <p class="muted">Apple Silicon · Node v20.15.0 · 120 000 lines · median of 3 rounds</p>
                <table class="perf-table">
                  <tr><td>Baseline</td><td class="perf-num">645 466 /s</td></tr>
                  <tr><td>+10 customPatterns</td><td class="perf-num">521 451 /s</td></tr>
                  <tr><td>3 redactPaths</td><td class="perf-num">651 898 /s</td></tr>
                  <tr><td>10 paths + 2 excludes</td><td class="perf-num">433 506 /s</td></tr>
                </table>
              </article>
              <article class="card">
                <h3>Recommendations</h3>
                <ol class="muted perf-list">
                  <li>Compile one policy per hot path — never per line.</li>
                  <li>Minimise <code>customPatterns</code> — each runs over every scanned field.</li>
                  <li>Keep <code>redactPaths</code> / <code>excludePaths</code> short (≤ 5 for ultra-hot pipes).</li>
                  <li>Prefer a static <code>pathCensor</code> string over a callback.</li>
                  <li>Re-run <code>npm run perf</code> after policy changes.</li>
                </ol>
              </article>
            </div>
            <div class="callout">
              Run the benchmark on your hardware: <code>npm run perf</code>. Results are appended to <code>PERFORMANCE_RESULTS.md</code>.
            </div>
          </section>

          <footer class="docs-footer">
            <p>Something missing? Open an issue on <a href="https://github.com/martinkr/bluestreak" target="_blank" rel="noopener">GitHub</a> or check the main README for the full API reference.</p>
          </footer>
        </main>
      </div>
    </div>
  </div>
`;o(e);
