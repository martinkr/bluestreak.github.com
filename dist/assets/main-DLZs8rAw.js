import{a as t}from"./code-highlighting-DSiBdJNj.js";const a=document.querySelector("#app");if(!a)throw new Error("Missing #app");a.innerHTML=`
  <div class="site-wrapper">
    <div class="container">
      <nav class="nav">
        <a class="brand" href="/">
          <strong>Bluestreak</strong>
        </a>
        <div class="nav-links">
          <a class="pill" href="/">Home</a>
          <a class="pill" href="/docs/">Docs</a>
          <a class="pill pill-github" href="https://github.com/martinkr/bluestreak" target="_blank" rel="noopener">GitHub</a>
        </div>
      </nav>
    </div>

    <header class="hero-section">
      <div class="container">
        <div class="hero-layout">
                  <div class="hero-logo-col">
            <img class="hero-logo" src="/bluestreak-logo.png" alt="Bluestreak" />
          </div>
          <div class="hero-content-col">
          <h1 class="hero-h1">Your logs are<br>leaking secrets.
          <div class="hero-badge">Policy-driven log redaction for Node.js</div>
          </h1>
          <p class="hero-sub">
          Bluestreak scrubs PII and credentials from JSON log lines before they reach
              Datadog, Elasticsearch, or any vendor. GDPR, HIPAA, PCI, and SOC2
              compliance profiles. Four locale packs. Zero runtime dependencies.
            </p>
            <div class="button-row">
              <a class="button primary" href="/docs/">Get started</a>
              <a class="button secondary" href="https://github.com/martinkr/bluestreak" target="_blank" rel="noopener">View on GitHub</a>
            </div>
            <div class="install-block">
              <span class="install-prefix">$</span>
              <code>npm install bluestreak</code>
              <button class="install-copy-btn" aria-label="Copy install command" title="Copy">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>

    <div class="container">
      <div class="stats-strip">
        <div class="stat">
          <span class="stat-value">600k+</span>
          <span class="stat-label">lines / sec</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">GDPR · HIPAA<br>PCI · SOC2</span>
          <span class="stat-label">compliance profiles</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">EN · DE · ES · FR</span>
          <span class="stat-label">locale packs</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">0</span>
          <span class="stat-label">runtime dependencies</span>
        </div>
      </div>
    </div>

    <div class="container">
      <section class="section">
        <div class="before-after">
          <div class="ba-col">
            <div class="ba-label ba-label-bad">Without Bluestreak</div>
            <div class="card ba-card">
              <pre><code>{
  "level": "info",
  "password": "hunter2",
  "authorization": "Bearer sk-prod-a1b2c3",
  "message": "login from alice@example.com",
  "card": "4111 1111 1111 1111"
}</code></pre>
            </div>
          </div>
          <div class="ba-arrow">→</div>
          <div class="ba-col">
            <div class="ba-label ba-label-good">With Bluestreak</div>
            <div class="card ba-card">
              <pre><code>{
  "level": "info",
  "password": "[**REDACTED**]",
  "authorization": "Bearer [**REDACTED**]",
  "message": "login from [**REDACTED**]",
  "card": "[**REDACTED**]"
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Why teams choose Bluestreak</h2>
        <div class="feature-list">
          <div class="feature-row">
            <div class="feature-row-head">
              <strong>Fast enough for production</strong>
            </div>
            <p class="muted">600k+ lines/sec on Apple Silicon — measured on 120 000 lines, median of 3 rounds. Key-name matching compiles your keyword set into a hash at startup, so every JSON key is an O(1) lookup at runtime. Pattern scanning only runs on the fields you explicitly opt into, capped at a configurable character limit so long payloads can't become a latency cliff.</p>
          </div>
          <div class="feature-row">
            <div class="feature-row-head">
              <strong>Compliance without the setup tax</strong>
            </div>
            <p class="muted">One call to <code>compileRecommendedPolicy()</code> enables GDPR and PCI_DSS keyword coverage, English locale field names, and baseline pattern scanning for emails, bearer tokens, and auth headers. That's enough to make most SaaS API logs safe to ship to a vendor without writing a single regex. When you need more — HIPAA, SOC2, additional locales, custom token shapes — every option is additive and auditable.</p>
          </div>
          <div class="feature-row">
            <div class="feature-row-head">
              <strong>Works with your existing logger setup</strong>
            </div>
            <p class="muted">No logger replacement required. Wrap Pino or Winston's output destination with a <code>Writable</code> that calls <code>tryRedactLine</code> per line. Pipe log files through <code>createLineRedactingTransform</code>. Or call <code>redactLine()</code> directly in a request handler. Same policy, same behavior, regardless of how your logs flow.</p>
          </div>
          <div class="feature-row">
            <div class="feature-row-head">
              <strong>Multilingual field coverage, fully extensible</strong>
            </div>
            <p class="muted">Built-in locale packs for English, German, Spanish, and French merge their keyword sets at compile time — so <code>password</code>, <code>passwort</code>, and <code>mot_de_passe</code> are all caught by the same policy without per-line language detection. For fields specific to your domain, you can extend any built-in pack or author a fully custom <code>LocaleKeywordPack</code> in your own codebase — no fork required.</p>
          </div>
          <div class="feature-row">
            <div class="feature-row-head">
              <strong>Explicit, versionable, testable</strong>
            </div>
            <p class="muted">A compiled policy is a plain JavaScript object. No global state, no hidden defaults, no patterns that run unless you add them. That means you can serialize it, diff it in code review, and assert on its exact behavior in tests. Security teams can own one policy definition that every service imports — instead of each team maintaining its own ad-hoc redaction logic.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>How it works</h2>
        <p class="section-intro">Two complementary mechanisms cover the full surface of a log line.</p>
        <div class="grid two">
          <article class="card mechanism-card">
            <div class="mechanism-num">01</div>
            <h3>Key-name matching</h3>
            <p class="muted">At compile time, locale pack keywords and compliance profile buckets merge into a single hash set. At runtime, every JSON key is normalized — lowercased, separators stripped — and checked in O(1). A hit redacts the entire value regardless of its shape.</p>
            <div class="mechanism-example">
              <code>"API_KEY"</code> → <code>"apikey"</code> → in set → <code>[**REDACTED**]</code><br>
              <code>"api-key"</code> → <code>"apikey"</code> → in set → <code>[**REDACTED**]</code><br>
              <code>"apiKey"</code> &nbsp;→ <code>"apikey"</code> → in set → <code>[**REDACTED**]</code>
            </div>
          </article>
          <article class="card mechanism-card">
            <div class="mechanism-num">02</div>
            <h3>Pattern scanning</h3>
            <p class="muted">For fields you name in <code>scanTextFields</code> — typically <code>message</code>, <code>log</code>, <code>error</code> — the value is scanned with the patterns you configure. Only the first <code>maxFieldScanLength</code> characters are checked so very long fields can't become a performance cliff.</p>
            <p class="muted" style="margin-top:0.6rem;">Lines that fail <code>JSON.parse</code> fall through to a raw scrubber applying the same patterns to the whole string — nothing leaks on a bad line.</p>
          </article>
        </div>
      </section>

      <section class="section">
        <h2>The API in plain terms</h2>

        <div class="api-block">
          <div class="api-block-header">
            <code class="api-fn">compileRecommendedPolicy(overrides?)</code>
            <span class="api-badge">Start here</span>
          </div>
          <p class="muted">The recommended policy is an opinionated, named baseline — not a magic empty config. It combines the things most production Node.js services need without any setup: English locale keyword coverage, GDPR and PCI_DSS compliance profiles, and pattern scanning for emails, bearer tokens, and Authorization headers on common text fields. Call it once at startup and reuse the result everywhere.</p>
          <p class="muted">It's called "recommended" because it represents a deliberate set of tradeoffs: broad enough to catch the most common secrets and PII by default, narrow enough that it won't redact fields it has no business touching. It doesn't guess — every keyword and pattern in it is explicit and documented.</p>
          <div class="card" style="margin-top:0.9rem;">
            <pre><code>import { compileRecommendedPolicy, redactLine } from "bluestreak";

const policy = compileRecommendedPolicy();
// Gives you, out of the box:
//   locales:            ["en-en"]
//   complianceProfiles: ["GDPR", "PCI_DSS"]
//   scanTextFields:     ["message", "log", "msg", "error", "stack", ...]
//   customPatterns:     [EMAIL, BEARER_TOKEN, AUTH_HEADER]

console.log(redactLine(
  JSON.stringify({ password: "x", message: "user@example.com" }),
  policy
));
// {"password":"[**REDACTED**]","message":"[**REDACTED**]"}</code></pre>
          </div>
          <p class="muted" style="margin-top:0.8rem;">Every field is overridable. Add locales, profiles, patterns, or exact paths while keeping the preset as the base — or drop it entirely when you want full control with no implicit defaults.</p>
          <div class="card" style="margin-top:0.7rem;">
            <pre><code>// Extend the recommended baseline
const policy = compileRecommendedPolicy({
  locales: ["en-en", "de-de"],             // add German field names
  complianceProfiles: ["GDPR", "HIPAA"],   // override profiles
  customPatterns: [PAYMENT_PATTERNS.STRIPE_KEY],  // add Stripe key pattern
  redactPaths: ["request.headers.x-api-key"],     // redact a specific path
  excludePaths: ["product.id"],            // preserve a known-safe field
});</code></pre>
          </div>
        </div>

        <div class="api-block">
          <div class="api-block-header">
            <code class="api-fn">compilePolicy(config)</code>
            <span class="api-badge api-badge-neutral">Full control</span>
          </div>
          <p class="muted">When you need full control with no implicit defaults, use <code>compilePolicy</code> directly. You choose exactly which locales, profiles, patterns, and paths are active — nothing is included unless you ask for it. This is the right choice when you're building a shared org policy, serving multiple tenants with different rules, or operating under strict compliance requirements where implicit behavior is unacceptable.</p>
          <div class="card" style="margin-top:0.9rem;">
            <pre><code>import { compilePolicy, BUILTIN_PATTERNS, CLOUD_PATTERNS } from "bluestreak";

const policy = compilePolicy({
  complianceProfiles: ["GDPR", "SOC2"],
  locales: ["en-en", "fr-fr"],
  scanTextFields: ["message", "error", "stack"],
  maxFieldScanLength: 4096,
  panSeparatorChars: " -._",        // enable Luhn-validated card detection
  customPatterns: [
    BUILTIN_PATTERNS.EMAIL,
    BUILTIN_PATTERNS.BEARER_TOKEN,
    CLOUD_PATTERNS.AWS_ACCESS_KEY,
  ],
  redactPaths: ["session.token", "request.headers.authorization"],
  excludePaths: ["user.role"],      // keep this even if "role" hits a keyword
});</code></pre>
          </div>
        </div>

        <div class="api-block">
          <div class="api-block-header">
            <code class="api-fn">redactLine(raw, policy)</code>
            <span class="api-badge api-badge-neutral">Runtime call</span>
          </div>
          <p class="muted">The main function you call on every log event. Parses the line as JSON, walks the tree, redacts matching keys and patterns, and returns a new JSON string. If the input isn't valid JSON, it falls through to a raw scrubber that applies your configured patterns to the whole string — so broken or non-JSON lines don't bypass redaction. When nothing needs to be redacted, the original string is returned as-is with no extra allocations.</p>
          <p class="muted">Use <code>tryRedactLine</code> instead of <code>redactLine</code> on hot production sinks — it has the same behavior but never throws, so a redaction bug can't crash your process.</p>
          <div class="card" style="margin-top:0.9rem;">
            <pre><code>// Direct call — request handlers, browser wrappers, queue jobs
const output = redactLine(rawJsonString, policy);

// Safe variant — Pino/Winston sinks, stream transports
const output = tryRedactLine(rawJsonString, policy);

// Stream — Pino destinations, file pipelines
import { createLineRedactingTransform } from "bluestreak/node";
source.pipe(createLineRedactingTransform(policy, { safe: true })).pipe(dest);</code></pre>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Compliance profiles &amp; locale packs</h2>
        <div class="grid two">
          <div>
            <h3 class="subsection-h3">Compliance profiles</h3>
            <p class="muted" style="margin-bottom:0.8rem;">Each profile adds a curated set of field name aliases to the keyword set. Mix and match — or use <code>"*"</code> to load all at once.</p>
            <div class="profile-list">
              <div class="profile-item">
                <span class="profile-tag">GDPR</span>
                <span class="muted">Names, addresses, national IDs, location, tax IDs</span>
              </div>
              <div class="profile-item">
                <span class="profile-tag">HIPAA</span>
                <span class="muted">Patient IDs, medical records, diagnoses, insurance</span>
              </div>
              <div class="profile-item">
                <span class="profile-tag">PCI_DSS</span>
                <span class="muted">Card numbers, CVV/CVC, expiry, track data</span>
              </div>
              <div class="profile-item">
                <span class="profile-tag">SOC2</span>
                <span class="muted">API keys, session tokens, private keys, auth headers</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="subsection-h3">Locale packs — built-in and custom</h3>
            <p class="muted" style="margin-bottom:0.8rem;">Built-in packs cover English, German, Spanish, and French field name conventions. Combine as many as you need — keywords merge at compile time, not per line.</p>
            <div class="locale-pack-list">
              <div class="locale-pack-item">
                <span class="locale-tag">en-en</span><span class="locale-tag">de-de</span><span class="locale-tag">es-es</span><span class="locale-tag">fr-fr</span>
                <span class="muted">Built-in tags</span>
              </div>
            </div>
            <p class="muted" style="margin-top:0.9rem;">You can also <strong>extend a built-in pack</strong> — spread it and override the fields you need — or define a fully <strong>custom <code>LocaleKeywordPack</code></strong> from scratch. Custom packs live in your own codebase; no fork of Bluestreak required. Pass them directly in the <code>locales</code> array alongside any built-in tags:</p>
            <div class="card" style="margin-top:0.7rem;">
              <pre><code>import type { LocaleKeywordPack } from "bluestreak";
import { getLocalePackByTag, compilePolicy } from "bluestreak";

// Extend an existing pack
const dePack: LocaleKeywordPack = {
  ...getLocalePackByTag("de-de"),
  patterns: [/\bDEd{2}[0-9]{18}\b/g], // add German IBAN
};

// Or author one from scratch
const myPack: LocaleKeywordPack = {
  generalKeywords: ["vault_token", "internal_ref"],
  profileKeywords: { GDPR: ["customer_ref"], HIPAA: [], PCI_DSS: [], SOC2: [] },
  patterns: [/\bACCT-[A-Z0-9]{12}\b/g],
};

const policy = compilePolicy({
  locales: ["en-en", dePack, myPack],
  complianceProfiles: ["GDPR"],
});</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="callout cta-callout">
          <div class="cta-callout-content">
            <h3>Ready to stop secrets from reaching your logs?</h3>
            <p>Start in one service with the recommended preset, validate in staging, then roll the same policy across your fleet. One consistent definition of "redacted" across every service, every team.</p>
          </div>
          <div class="cta-callout-actions">
            <a class="button primary" href="/docs/">Read the docs</a>
            <a class="button secondary" href="https://github.com/martinkr/bluestreak" target="_blank" rel="noopener">View source</a>
          </div>
        </div>
      </section>
    </div>

    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <img class="nav-logo" src="/bluestreak-logo.png" alt="Bluestreak" />
          <span><strong>Bluestreak</strong> — MIT license</span>
        </div>
        <div class="footer-links">
          <a href="/docs/">Documentation</a>
          <a href="https://github.com/martinkr/bluestreak" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.npmjs.com/package/bluestreak" target="_blank" rel="noopener">npm</a>
        </div>
      </div>
    </footer>
  </div>
`;const e=a.querySelector(".install-copy-btn");if(e){const s=e.innerHTML,o='<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';e.addEventListener("click",()=>{navigator.clipboard.writeText("npm install bluestreak").then(()=>{e.innerHTML=o,e.classList.add("install-copy-btn--copied"),e.title="Copied!",setTimeout(()=>{e.innerHTML=s,e.classList.remove("install-copy-btn--copied"),e.title="Copy"},2e3)})})}t(a);
