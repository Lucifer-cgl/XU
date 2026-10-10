const configUrl = "/site-mirrors.json";
const preferenceKey = "xu-site-line";
const autoRoutedKey = "xu-site-auto-routed";
const routeChoiceParam = "xu_line";
const escapeHtml = (value = "") => String(value).replace(/[&<>'\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

const normalizeBaseUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return "";
    return url.origin;
  } catch {
    return "";
  }
};

function safeConfig(raw) {
  const routes = Array.isArray(raw?.routes) ? raw.routes.flatMap((route) => {
    const baseUrl = normalizeBaseUrl(route?.baseUrl);
    const id = String(route?.id || "").replace(/[^a-z0-9_-]/gi, "").slice(0, 32);
    if (!baseUrl || !id) return [];
    return [{
      id,
      name: String(route.name || id).slice(0, 40),
      baseUrl,
      role: route.role === "direct" ? "direct" : "domestic"
    }];
  }) : [];
  return {
    routes,
    probePath: String(raw?.probePath || "/static/site-probe.svg").startsWith("/") ? String(raw?.probePath || "/static/site-probe.svg") : "/static/site-probe.svg",
    timeoutMs: Math.max(1500, Math.min(8000, Number(raw?.timeoutMs) || 4500)),
    directMaxMs: Math.max(800, Math.min(5000, Number(raw?.directMaxMs) || 2500))
  };
}

function probeRoute(route, config) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    const image = new Image();
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve({ ...route, ok, latency: ok ? Math.round(performance.now() - startedAt) : null });
    };
    const timer = window.setTimeout(() => finish(false), config.timeoutMs);
    image.referrerPolicy = "no-referrer";
    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = `${route.baseUrl}${config.probePath}?xu_probe=${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  });
}

function currentRoute(routes) {
  return routes.find((route) => route.baseUrl === window.location.origin) || null;
}

function routeUrl(route, choice = "") {
  const destination = new URL(`${window.location.pathname}${window.location.search}${window.location.hash}`, route.baseUrl);
  if (choice) destination.searchParams.set(routeChoiceParam, choice);
  return destination.href;
}

function renderMenu(menu, results, current, preference) {
  const successful = results.filter((route) => route.ok);
  menu.innerHTML = `<div class="site-line-menu-head"><strong>访问线路</strong><small>${successful.length}/${results.length} 条可用</small></div>
    <button type="button" role="menuitem" class="site-line-choice ${preference === "auto" ? "active" : ""}" data-site-line="auto">
      <span><strong>自动选择</strong><small>直连可用时不绕行</small></span>
      <span>${preference === "auto" ? "已选" : ""}</span>
    </button>
    ${results.map((route) => `<button type="button" role="menuitem" class="site-line-choice ${current?.id === route.id ? "current" : ""} ${preference === route.id ? "active" : ""}" data-site-line="${route.id}" ${route.ok ? "" : "disabled"}>
      <span><strong>${escapeHtml(route.name)}</strong><small>${current?.id === route.id ? "当前入口" : route.role === "direct" ? "代理或海外网络优先" : "中国大陆网络优先"}</small></span>
      <span class="site-line-latency ${route.ok ? "" : "failed"}">${route.ok ? `${route.latency} ms` : "不可达"}</span>
    </button>`).join("")}
    <p>检测只请求 1 像素静态图片，不上传网络信息。切换时保留当前页面。</p>`;
}

function updateButton(button, current, results) {
  const currentResult = results.find((route) => route.id === current?.id);
  button.textContent = current ? (current.role === "domestic" ? "国内线路" : "直连") : "线路";
  button.title = currentResult?.ok ? `${current.name} · ${currentResult.latency} ms` : "查看访问线路";
  button.dataset.state = currentResult?.ok ? "ready" : "checking";
}

export async function initializeSiteMirrors({ button, menu }) {
  if (!button || !menu || !/^https?:$/.test(window.location.protocol)) return;
  let config;
  try {
    const response = await fetch(configUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`线路配置读取失败（${response.status}）`);
    config = safeConfig(await response.json());
  } catch {
    button.hidden = true;
    return;
  }
  if (config.routes.length < 2) {
    button.hidden = true;
    return;
  }

  const current = currentRoute(config.routes);
  const incomingUrl = new URL(window.location.href);
  const incomingChoice = incomingUrl.searchParams.get(routeChoiceParam);
  if (incomingChoice === "auto" || config.routes.some((route) => route.id === incomingChoice)) {
    localStorage.setItem(preferenceKey, incomingChoice);
    incomingUrl.searchParams.delete(routeChoiceParam);
    history.replaceState(history.state, "", `${incomingUrl.pathname}${incomingUrl.search}${incomingUrl.hash}`);
  }
  const saved = localStorage.getItem(preferenceKey);
  const preference = saved && (saved === "auto" || config.routes.some((route) => route.id === saved)) ? saved : "auto";
  const navigation = performance.getEntriesByType("navigation")[0];
  const results = await Promise.all(config.routes.map((route) => route.id === current?.id
    ? Promise.resolve({ ...route, ok: true, latency: Math.max(0, Math.round(navigation?.responseStart || 0)) })
    : probeRoute(route, config)));
  updateButton(button, current, results);
  renderMenu(menu, results, current, preference);

  const direct = results.find((route) => route.role === "direct");
  const explicitlyDomestic = preference && preference !== "auto" && config.routes.find((route) => route.id === preference)?.role === "domestic";
  if (current?.role === "domestic" && !explicitlyDomestic && direct?.ok && direct.latency <= config.directMaxMs && !sessionStorage.getItem(autoRoutedKey)) {
    sessionStorage.setItem(autoRoutedKey, "1");
    window.location.replace(routeUrl(direct, "auto"));
    return;
  }

  button.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-site-line]");
    if (!choice || choice.disabled) return;
    const id = choice.dataset.siteLine;
    if (id === "auto") {
      localStorage.setItem(preferenceKey, "auto");
      sessionStorage.removeItem(autoRoutedKey);
      const preferred = direct?.ok && direct.latency <= config.directMaxMs ? direct : results.filter((route) => route.ok).sort((a, b) => a.latency - b.latency)[0];
      if (preferred && preferred.id !== current?.id) window.location.assign(routeUrl(preferred, "auto"));
      else renderMenu(menu, results, current, "auto");
      return;
    }
    const selected = results.find((route) => route.id === id && route.ok);
    if (!selected) return;
    localStorage.setItem(preferenceKey, selected.id);
    sessionStorage.setItem(autoRoutedKey, "1");
    if (selected.id !== current?.id) window.location.assign(routeUrl(selected, selected.id));
    else {
      renderMenu(menu, results, current, selected.id);
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("click", (event) => {
    if (menu.hidden || event.target.closest("#site-line-control")) return;
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });
}
