import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import ts from "shiki/langs/typescript.mjs";
import js from "shiki/langs/javascript.mjs";
import bash from "shiki/langs/bash.mjs";
import json from "shiki/langs/json.mjs";
import githubLight from "shiki/themes/github-light.mjs";

let highlighterPromise: Promise<ReturnType<typeof createHighlighterCore>> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      themes: [githubLight],
      langs: [ts, js, bash, json]
    });
  }
  return highlighterPromise;
}

function inferLang(raw: string): "ts" | "js" | "bash" | "json" {
  if (/^\s*(npm|pnpm|yarn|bun)\s+/m.test(raw) || /^#!\/bin\/(bash|sh)/.test(raw)) return "bash";
  if (/^\s*\{[\s\S]*\}\s*$/m.test(raw) && /"\w+"\s*:/.test(raw)) return "json";
  if (/\bimport\b|\bconst\b|\binterface\b|\btype\b|\b=>\b/.test(raw)) return "ts";
  return "js";
}

const ICON_COPY = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

function attachCopyButton(wrapper: HTMLElement, source: string): void {
  const btn = document.createElement("button");
  btn.className = "code-copy-btn";
  btn.setAttribute("aria-label", "Copy code");
  btn.setAttribute("title", "Copy");
  btn.innerHTML = ICON_COPY;

  btn.addEventListener("click", () => {
    const finish = () => {
      btn.innerHTML = ICON_CHECK;
      btn.classList.add("code-copy-btn--copied");
      btn.setAttribute("title", "Copied!");
      setTimeout(() => {
        btn.innerHTML = ICON_COPY;
        btn.classList.remove("code-copy-btn--copied");
        btn.setAttribute("title", "Copy");
      }, 2000);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(source).then(finish).catch(finish);
    } else {
      // Fallback for environments without Clipboard API
      const ta = document.createElement("textarea");
      ta.value = source;
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (_) { /* silent */ }
      document.body.removeChild(ta);
      finish();
    }
  });

  wrapper.appendChild(btn);
}

export async function applyShikiToCodeBlocks(root: ParentNode = document): Promise<void> {
  const highlighter = await getHighlighter();
  const blocks = root.querySelectorAll("pre > code");

  blocks.forEach((codeEl) => {
    const source = codeEl.textContent ?? "";
    const lang = inferLang(source);
    const html = highlighter.codeToHtml(source, {
      lang,
      theme: "github-light"
    });

    const pre = codeEl.parentElement;
    if (!pre?.parentElement) return;

    const wrapper = document.createElement("div");
    wrapper.className = "code-shell";
    wrapper.innerHTML = html;
    attachCopyButton(wrapper, source);
    pre.replaceWith(wrapper);
  });
}
