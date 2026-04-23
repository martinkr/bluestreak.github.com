import{a as s}from"./code-highlighting-DDbubx5s.js";const e=document.querySelector("#app");if(!e)throw new Error("Missing #app");e.innerHTML=`
  <div class="container">
    <nav class="nav">
      <div class="brand"><strong>Bluestreak</strong></div>
      <div class="nav-links">
        <a class="pill" href="/">Home</a>
        <a class="pill" href="/docs/">Docs</a>
      </div>
    </nav>

    <header class="hero">
      <div class="logo-stage">
        <img class="logo" src="/bluestreak-logo.png" alt="Bluestreak logo" />
        <span class="pill" style="border-radius:9999px;background:#f2f9ff;color:#097fe8;border-color:transparent;">Policy-driven log redaction</span>
      </div>
      <h1>Keep logs useful without leaking sensitive data</h1>
      <p>
        Bluestreak helps teams redact secrets and personal data before logs leave the app.
        It is fast enough for real pipelines, predictable enough for compliance reviews, and simple
        enough to adopt without redesigning your logger setup.
      </p>
      <div class="button-row">
        <a class="button primary" href="/docs/">Read documentation</a>
        <a class="button secondary" href="https://github.com/martinkr/bluestreak">View source</a>
      </div>
    </header>

    <section class="section alt-section" style="padding-left:1rem;padding-right:1rem;border-radius:12px;">
      <h2>Why teams pick Bluestreak</h2>
      <div class="grid three">
        <article class="card">
          <h3>Practical defaults</h3>
          <p class="muted">Start with a recommended baseline, then tune rules by locale, profile, and patterns.</p>
        </article>
        <article class="card">
          <h3>Works with existing logs</h3>
          <p class="muted">Use direct function calls or stream transforms for Pino, Winston, and custom pipelines.</p>
        </article>
        <article class="card">
          <h3>No hidden behavior</h3>
          <p class="muted">Redaction policy is explicit, testable, and reusable across services.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Common use cases</h2>
      <div class="grid three">
        <article class="card">
          <h3>Production API logs</h3>
          <p class="muted">Mask auth headers, bearer tokens, and known PII keys before shipping logs to vendors.</p>
        </article>
        <article class="card">
          <h3>Cross-language teams</h3>
          <p class="muted">Merge locale packs so mixed naming conventions still match sensitive fields.</p>
        </article>
        <article class="card">
          <h3>Incident response</h3>
          <p class="muted">Share logs quickly without manually sanitizing payloads under time pressure.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>What it actually does</h2>
      <div class="card">
        <p class="muted">
          Bluestreak combines key-name matching, exact-path rules, and optional text-pattern scanning.
          That means values can be redacted because of <em>where</em> they appear (<code>request.headers.authorization</code>),
          <em>what key they use</em> (<code>password</code>, <code>token</code>, aliases from locale packs), or <em>what shape they have</em>
          (emails, bearer tokens, card candidates).
        </p>
      </div>
    </section>

    <section class="section">
      <h2>Quick start</h2>
      <div class="card">
        <pre><code>import { compileRecommendedPolicy, redactLine } from "bluestreak";

const policy = compileRecommendedPolicy();

const input = '{"message":"email alice@example.com","authorization":"Bearer top-secret"}';
const output = redactLine(input, policy);

console.log(output);
// {"message":"email [**REDACTED**]","authorization":"Bearer [**REDACTED**]"}</code></pre>
      </div>
      <p class="muted" style="margin-top:0.8rem;">
        Same policy, two integration modes: direct function calls (non-stream) and Node stream transforms.
      </p>
    </section>

    <section class="section">
      <h2>Profiles and locales</h2>
      <div class="grid three">
        <article class="card">
          <h3>Compliance profiles</h3>
          <p class="muted">Choose from GDPR, HIPAA, PCI_DSS, SOC2, or "*" to merge all profile keyword buckets.</p>
        </article>
        <article class="card">
          <h3>Locale coverage</h3>
          <p class="muted">Built-in tags: en-en, de-de, es-es, fr-fr. For multilingual apps, list every locale you need.</p>
        </article>
        <article class="card">
          <h3>Recommended baseline</h3>
          <p class="muted">Fast adoption path: compileRecommendedPolicy() defaults to en-en + GDPR/PCI + baseline text patterns.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Adoption path</h2>
      <div class="callout">
        Start in one service with the recommended preset, validate redaction in staging, then roll out
        the same policy shape across your fleet. Consistent rules reduce surprises during audits.
      </div>
    </section>

    <footer>
      Bluestreak docs site (Vite static build) - practical guidance for safe logging in Node and browser contexts.
    </footer>
  </div>
`;s(e);
