/* Shared Heimkoma Complianz adapter. Reuses the approved CMP, policy and cookies. */
(() => {
  "use strict";
  if (window.HeimkomaConsent) return;
  const config = window.HEIMKOMA_CONFIG || {};
  let ready = false;
  let failed = false;
  let started = false;
  let gtmLoaded = false;
  let metaLoaded = false;
  let hubspotLoaded = false;
  let synced = false;
  let pendingPageView = null;
  let state = { statistics: false, marketing: false };
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const googleState = (choices) => ({
    analytics_storage: choices.statistics ? "granted" : "denied",
    ad_storage: choices.marketing ? "granted" : "denied",
    ad_user_data: choices.marketing ? "granted" : "denied",
    ad_personalization: choices.marketing ? "granted" : "denied",
  });
  // Synchronous head script: these commands always precede GTM and any event.
  window.gtag("consent", "default", { ...googleState(state), wait_for_update: 500 });
  window.gtag("set", "ads_data_redaction", true);

  const readChoices = () => {
    if (!ready || typeof window.cmplz_has_consent !== "function") {
      return { statistics: false, marketing: false };
    }
    // CMP owns cookie prefix/path/expiry and policy invalidation. Never infer an
    // opt-in from a stale/orphaned category cookie or a bot's implied consent.
    const policy = window.cmplz_get_cookie("policy_id");
    const valid = policy === String(window.complianz.current_policy_id);
    return {
      statistics: valid && window.cmplz_has_consent("statistics"),
      marketing: valid && window.cmplz_has_consent("marketing"),
    };
  };

  const appendScript = (src, id) => {
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    document.head.append(script);
    return script;
  };

  // Use Meta's bootstrap interface, but do not download its SDK before consent.
  // GTM still owns the pixel ID, init and Lead calls. Drop denied events (do not
  // queue leads for replay on a later grant). Only the current page view is held.
  function fbq() {
    const args = Array.from(arguments);
    const isEvent = /^(track|trackCustom|trackSingle|trackSingleCustom)$/.test(args[0]);
    const isLead = isEvent && (args[1] === "Lead" || args[2] === "Lead");
    // GTM may finish downloading after a rejected form was submitted and the
    // visitor later opted in. Its event model retains the original snapshot.
    const eventChoices = window.google_tag_manager?.[config.gtmId]?.dataLayer?.get("heimkoma_consent");
    if (isEvent && (!config.enableAnalytics || !readChoices().marketing || (isLead && eventChoices?.marketing === false))) {
      if (args[0] === "track" && args[1] === "PageView") pendingPageView = args;
      return;
    }
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else if (args[0] !== "consent") fbq.queue.push(arguments);
    else {
      // A queued revoke locks Meta's queue, including any later queued grant.
      // Keep only the latest pre-load state, before init/event commands.
      fbq.queue = fbq.queue.filter((command) => command[0] !== "consent" &&
        !(args[1] === "revoke" && /^(track|trackCustom|trackSingle|trackSingleCustom)$/.test(command[0])));
      if (metaLoaded && args[1] === "revoke") fbq.queue.unshift(arguments);
    }
  }
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = window._fbq = fbq;
  fbq("consent", "revoke");

  // Remove only known optional vendor cookies, never Complianz's choices.
  const clearVendorCookies = (pattern) => {
    const domains = ["", location.hostname, `.${location.hostname}`];
    const paths = ["/", location.pathname, location.pathname.replace(/\/$/, "")];
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.trim().split("=")[0];
      if (!pattern.test(name)) return;
      for (const path of paths) for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=${path || "/"}; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
      }
    });
  };

  const sync = () => {
    const next = readChoices();
    if (state.statistics === next.statistics && state.marketing === next.marketing && (synced || !ready)) return;
    synced = true;
    const previous = state;
    state = next;
    window.gtag("consent", "update", googleState(state));
    fbq("consent", state.marketing ? "grant" : "revoke");
    if (!state.statistics) clearVendorCookies(/^_ga(?:_|$)|^_gid$|^_gat/);
    if (!state.marketing) {
      clearVendorCookies(/^_gcl_|^_fb[pc]$|^hubspotutk$|^__hs(?:tc|sc|src)$/);
      if (hubspotLoaded) {
        window._hsq = window._hsq || [];
        window._hsq.push(["doNotTrack"]);
      }
    } else if (config.enableAnalytics) {
      if (!metaLoaded) {
        metaLoaded = true;
        const sdk = appendScript("https://connect.facebook.net/en_US/fbevents.js", "heimkoma-meta-sdk");
        sdk.onload = () => fbq("consent", readChoices().marketing ? "grant" : "revoke");
      }
      if (pendingPageView) {
        const pageView = pendingPageView;
        pendingPageView = null;
        fbq.apply(null, pageView);
      }
      if (!hubspotLoaded && /^\d+$/.test(config.hubspotPortalId || "")) {
        hubspotLoaded = true;
        window._hsq = window._hsq || [];
        window._hsq.push(["doNotTrack", { track: true }]);
        appendScript(`https://js-eu1.hs-scripts.com/${config.hubspotPortalId}.js`, "hs-script-loader");
      }
    }
    window.dataLayer.push({ event: "heimkoma_consent_update", heimkoma_consent: { ...state } });
    // Complianz itself reloads on Marketing withdrawal, clearing active SDKs.
    // Also reload on Statistics-only withdrawal and changes made in another tab.
    if ((previous.statistics && !state.statistics) || (previous.marketing && !state.marketing)) {
      window.setTimeout(() => location.reload(), 100);
    }
  };

  const loadGtm = () => {
    if (gtmLoaded || !ready || !config.enableAnalytics || !/^GTM-[A-Z0-9]+$/i.test(config.gtmId || "")) return;
    gtmLoaded = true;
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    appendScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`, "heimkoma-gtm");
  };

  const trustedAsset = (value, pattern) => {
    const url = new URL(value, location.origin);
    if (url.origin !== location.origin || !pattern.test(url.pathname)) throw new Error("Unexpected Complianz asset");
    return url.href;
  };

  const importSharedBanner = async () => {
    const source = new URL(config.complianzSourceUrl || "/", location.origin);
    if (source.origin !== location.origin || source.pathname === location.pathname) {
      throw new Error("Complianz source must be another page on the same origin");
    }
    const response = await fetch(source, { credentials: "same-origin", cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("WordPress consent source unavailable");
    // Parse inertly. Never execute WP/Elementor/GTM/Analytics/HubSpot scripts.
    const template = document.createElement("template");
    template.innerHTML = await response.text();
    const sourceDoc = template.content;
    const json = sourceDoc.querySelector("#cmplz-cookiebanner-js-extra")?.textContent.match(/\bvar\s+complianz\s*=\s*(\{[^]*?\})\s*;/)?.[1];
    const settings = JSON.parse(json || "null");
    const banner = sourceDoc.querySelector("#cmplz-cookiebanner-container");
    const manage = sourceDoc.querySelector("#cmplz-manage-consent");
    const scriptUrl = sourceDoc.querySelector("#cmplz-cookiebanner-js")?.getAttribute("src");
    const sheets = [...sourceDoc.querySelectorAll('link[id^="cmplz-"][rel="stylesheet"]')];
    // This adapter is for the site's current opt-in, non-TCF configuration.
    // Unexpected configuration changes fail closed rather than guessing policy.
    if (!settings || !banner || !manage || !scriptUrl || !sheets.length ||
        settings.consenttype !== "optin" || settings.tcf_active || settings.geoip ||
        settings.cookie_path !== "/" || !settings.current_policy_id) {
      throw new Error("Shared Complianz configuration is missing or unsupported");
    }
    const src = trustedAsset(scriptUrl, /^\/s1h2gb\/consent\/complianz\/complianz(?:\.min)?\.js$/);
    const cssUrls = sheets.map((sheet) => trustedAsset(sheet.getAttribute("href"), /^\/s1h2gb\/consent\/complianz\/[a-z0-9_.-]+\.css$/));
    for (const node of [banner, manage]) {
      node.querySelectorAll("script,iframe,object,embed,link,style,base,meta").forEach((element) => element.remove());
      node.querySelectorAll("*").forEach((element) => {
        [...element.attributes].forEach(({ name, value }) => {
          if (/^on/i.test(name) || (/^(href|src|action)$/i.test(name) && /^\s*(javascript|data):/i.test(value))) element.removeAttribute(name);
        });
      });
    }
    window.complianz = settings;
    // Complianz emits this essential utility inline in WordPress's head (not
    // in its linked CSS). It hides unused legal-link placeholders and controls.
    const utility = document.createElement("style");
    utility.id = "heimkoma-complianz-utility";
    utility.textContent = ".cmplz-hidden{display:none!important}";
    document.head.append(utility);
    banner.hidden = true;
    manage.hidden = true;
    document.body.append(banner);
    if (!document.getElementById("cmplz-manage-consent")) document.body.append(manage);
    await Promise.all(cssUrls.map((href, i) => new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.id = sheets[i].id;
      link.rel = "stylesheet";
      link.href = href;
      link.onload = resolve;
      link.onerror = () => reject(new Error("Complianz stylesheet unavailable"));
      document.head.append(link);
    })));
    if (failed) return;
    banner.hidden = false;
    manage.hidden = false;
    await new Promise((resolve, reject) => {
      const script = appendScript(src, "cmplz-cookiebanner-js");
      script.onload = resolve;
      script.onerror = () => reject(new Error("Complianz script unavailable"));
    });
    if (!ready) throw new Error("Complianz did not initialise");
  };

  const start = () => {
    if (started) return;
    started = true;
    document.querySelectorAll("[data-cookie-settings]").forEach((link) => {
      link.href = config.cookieSettingsUrl || "/cookies-settings/";
      link.addEventListener("click", (event) => {
        if (!ready) return; // The real WP settings page is the accessible fallback.
        event.preventDefault();
        document.querySelector("#cmplz-manage-consent button")?.click();
      });
    });
    // Current Complianz checks old policies before selecting its banner element.
    // Initialise that element through its own public renderer first, otherwise
    // its policy-reset path throws when trying to show the renewal prompt.
    document.addEventListener("cmplz_before_cookiebanner", () => {
      const oldPolicy = window.cmplz_get_cookie?.("policy_id");
      if (oldPolicy && oldPolicy !== String(window.complianz.current_policy_id)) {
        window.show_cookie_banner?.();
      }
    });
    // This event is after Complianz has invalidated outdated saved policies.
    document.addEventListener("cmplz_cookie_banner_data", () => {
      if (failed) return;
      ready = true;
      sync();
      loadGtm();
    });
    ["cmplz_status_change", "cmplz_revoke", "cmplz_fire_categories", "cmplz_banner_status"].forEach((name) => {
      document.addEventListener(name, () => { sync(); queueMicrotask(sync); });
    });
    window.addEventListener("focus", sync);
    window.addEventListener("pageshow", sync);
    document.addEventListener("visibilitychange", sync);
    // CMP cookies are the sole source of truth, including edits in WP/other tabs.
    window.setInterval(sync, 1000);
    const timeout = window.setTimeout(() => {
      failed = true;
      ready = false;
      document.getElementById("cmplz-cookiebanner-container")?.setAttribute("hidden", "");
      document.getElementById("cmplz-manage-consent")?.setAttribute("hidden", "");
      sync();
      console.error("Shared Complianz timed out; use the cookie settings link.");
    }, 15000);
    importSharedBanner().catch((error) => {
      failed = true;
      ready = false;
      document.getElementById("cmplz-cookiebanner-container")?.setAttribute("hidden", "");
      document.getElementById("cmplz-manage-consent")?.setAttribute("hidden", "");
      sync();
      console.error("Shared Complianz unavailable; optional tracking remains denied.", error);
    }).finally(() => window.clearTimeout(timeout));
  };
  window.HeimkomaConsent = Object.freeze({
    start, sync,
    has: (category) => { sync(); return ready && state[category] === true; },
    getState: () => ({ ...state, ready }),
  });
})();

