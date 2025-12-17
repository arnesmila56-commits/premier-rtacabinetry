import React, { useEffect, useMemo, useState } from "react";

/* ============================
   CONFIG (edit these)
   ============================ */
const STRIPE_PAYMENT_LINK = "PASTE_STRIPE_PAYMENT_LINK_HERE"; // Apple Pay + card

const FINISH_IMAGES = {
  "hudson-snow-white": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_1-1-788x1024.jpg",
  "hudson-cloud-white": "https://tribecacabinetry.com/wp-content/uploads/2025/03/HD-CW-2-788x1024.jpg",
  "hudson-hearthstone": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_1-788x1024.jpg",
  "hudson-white-rift-oak": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_7-788x1024.jpg",
  "hudson-cashew": "https://tribecacabinetry.com/wp-content/uploads/2025/05/HD-CA-4-788x1024.jpg",

  "soho-snow-white": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_4-788x1024.jpg",
  "soho-empire-blue": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_EP-rev-788x1024.jpg",

  "southampton-snow-white": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_7-1-788x1024.jpg",
  "southampton-white-rift-oak": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_6-788x1024.jpg",
  "southampton-carbon-black-oak": "https://tribecacabinetry.com/wp-content/uploads/2025/03/STH-CBO-2-788x1024.jpg",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1800&auto=format&fit=crop";

/* ============================
   GLOBAL STYLES (Red / White / Black + Gold)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#ffffff;
        --bg2:#faf7f1;          /* warm light stone */
        --card:#ffffff;
        --card2:#fbf9f4;

        --text:#0f0f10;         /* near-black */
        --muted:#2f2f34;
        --muted2:#6a6a72;

        --primary:#c0182a;      /* red */
        --primary2:#9f1322;     /* deeper red */
        --gold:#b08d57;
        --gold2:#8d6a3c;

        --border: rgba(15,15,16,.12);
        --ring: rgba(192,24,42,.20);

        --shadow: 0 18px 44px rgba(0,0,0,.10);
        --shadow2: 0 10px 24px rgba(0,0,0,.08);
      }

      html,body{
        margin:0;
        background:
          radial-gradient(900px 520px at 15% 0%, rgba(176,141,87,.14), transparent 55%),
          radial-gradient(900px 520px at 85% 10%, rgba(192,24,42,.10), transparent 60%),
          var(--bg);
        color:var(--text);
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      *,*::before,*::after{ box-sizing:border-box; }
      a{ color:inherit; text-decoration:none; }
      img{ display:block; max-width:100%; }

      h1,h2,h3{
        margin:0 0 10px;
        font-family: Georgia, "Times New Roman", serif;
        font-weight:750;
        letter-spacing:-0.02em;
        line-height:1.15;
      }
      p{
        margin:10px 0;
        line-height:1.7;
        color:var(--muted);
      }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section.section{ padding:48px 0; }
      @media(max-width:900px){ section.section{ padding:32px 0; } }

      header.sticky{
        position:sticky;
        top:0;
        z-index:40;
        background:rgba(255,255,255,.86);
        backdrop-filter: blur(12px);
        border-bottom:1px solid var(--border);
      }

      .announce{
        background: linear-gradient(90deg, var(--text), rgba(15,15,16,.92));
        color:#fff;
        border-bottom:1px solid rgba(255,255,255,.14);
      }
      .announce .container{
        display:flex;
        gap:12px;
        align-items:center;
        justify-content:space-between;
        padding:10px 22px;
        font-size:12px;
        letter-spacing:.12em;
        text-transform:uppercase;
        opacity:.95;
      }
      .announce a{
        color:#fff;
        text-decoration: underline;
        text-underline-offset: 4px;
      }

      nav a{
        font-size:11px;
        letter-spacing:.18em;
        text-transform:uppercase;
        padding:8px 10px;
        border-radius:10px;
        font-weight:750;
        color: rgba(15,15,16,.85);
      }
      nav a:hover{
        background: rgba(192,24,42,.08);
        color: rgba(15,15,16,.95);
      }

      .kicker{
        font-size:11px;
        letter-spacing:.22em;
        text-transform:uppercase;
        color:var(--muted2);
        font-weight:850;
      }

      .card{
        background:var(--card);
        border:1px solid var(--border);
        border-radius:18px;
        padding:18px;
        box-shadow: var(--shadow2);
      }
      .card.soft{ background:var(--card2); }

      .grid{ display:grid; gap:16px; }
      .two{ grid-template-columns:1fr 1fr; }
      .three{ grid-template-columns:repeat(3,1fr); }
      .four{ grid-template-columns:repeat(4,1fr); }
      @media(max-width:1100px){ .four{ grid-template-columns:repeat(2,1fr); } }
      @media(max-width:900px){ .two,.three,.four{ grid-template-columns:1fr; } }

      .row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; }

      .pill{
        padding:7px 12px;
        border-radius:999px;
        border:1px solid var(--border);
        background: rgba(255,255,255,.9);
        font-size:12px;
        font-weight:850;
        color: rgba(15,15,16,.85);
      }
      .pill.gold{
        background: rgba(176,141,87,.16);
        border-color: rgba(176,141,87,.30);
        color: #6c4f24;
      }
      .pill.red{
        background: rgba(192,24,42,.10);
        border-color: rgba(192,24,42,.22);
        color: var(--primary2);
      }

      .btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        padding:12px 16px;
        border-radius:12px;
        border:1px solid transparent;
        font-weight:900;
        cursor:pointer;
        background:transparent;
        transition: transform .12s ease, box-shadow .12s ease, background .12s ease, opacity .12s ease;
      }
      .btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
      .btn:active{ transform: translateY(0px); box-shadow:none; }
      .btn:disabled{ opacity:.55; cursor:not-allowed; transform:none; box-shadow:none; }

      /* ✅ buttons POP */
      .btn-primary{
        background: linear-gradient(180deg, var(--primary), var(--primary2));
        color:#fff;
        box-shadow: 0 12px 24px rgba(192,24,42,.22);
      }
      .btn-outline{
        border-color: rgba(15,15,16,.18);
        background: #fff;
        color: var(--text);
      }
      .btn-ghost{
        border-color: transparent;
        background: rgba(15,15,16,.06);
        color: var(--text);
      }

      label{
        font-size:11px;
        letter-spacing:.18em;
        text-transform:uppercase;
        color:var(--muted2);
        font-weight:850;
        display:block;
        margin:12px 0 6px;
      }

      input,select,textarea{
        width:100%;
        padding:11px 12px;
        border-radius:12px;
        border:1px solid var(--border);
        background: #fff;
        color: var(--text);
        outline:none;
      }
      input:focus,select:focus,textarea:focus{
        border-color: var(--primary);
        box-shadow:0 0 0 4px var(--ring);
      }

      /* ✅ dropdown readability */
      select option{ color:#111; background:#fff; }

      table{ width:100%; border-collapse:collapse; }
      th,td{ padding:10px 12px; border-bottom:1px solid var(--border); vertical-align:middle; }
      th{
        font-size:11px;
        letter-spacing:.18em;
        text-transform:uppercase;
        color: var(--muted2);
        font-weight:850;
      }

      .mini{ font-size:13px; color:var(--muted2); line-height:1.65; }

      .finish-img{
        border-radius:16px;
        overflow:hidden;
        border:1px solid var(--border);
        background: rgba(0,0,0,.02);
      }
      .finish-img img{ width:100%; height:180px; object-fit:cover; }

      .divider{ height:1px; background:var(--border); margin:14px 0; }

      .stickySide{ position: sticky; top: 92px; align-self:start; }
      @media(max-width:900px){ .stickySide{ position: static; } }

      /* ✅ HOME one-screen layout */
      .homeOneScreen{
        padding: 22px 0 18px;
      }
      .homeViewport{
        min-height: calc(100vh - 120px); /* header + announce approx */
        display:grid;
        grid-template-columns: 1.25fr .75fr;
        gap:16px;
        align-items:stretch;
      }
      @media(max-width:900px){
        .homeViewport{
          min-height: auto;
          grid-template-columns:1fr;
        }
      }

      .hero{
        border:1px solid var(--border);
        border-radius:20px;
        overflow:hidden;
        position:relative;
        background:#eee;
        box-shadow: var(--shadow);
      }
      .hero img{
        width:100%;
        height:100%;
        object-fit:cover;
        filter: saturate(1.03) contrast(1.03);
      }
      /* ✅ reduce “fade” so buttons stand out */
      .hero::after{
        content:"";
        position:absolute;
        inset:0;
        background:
          linear-gradient(90deg, rgba(255,255,255,.86) 0%, rgba(255,255,255,.52) 46%, rgba(255,255,255,.20) 100%),
          radial-gradient(820px 520px at 26% 52%, rgba(176,141,87,.18), transparent 58%);
        pointer-events:none;
      }
      .heroInner{
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
      }
      .heroContent{
        max-width: 620px;
        padding: 22px;
      }
      .heroTitle{ font-size: 46px; margin-top: 10px; }
      .heroSub{ color: rgba(15,15,16,.74); }
      @media(max-width:900px){
        .hero{ min-height: 520px; }
        .heroTitle{ font-size: 36px; }
      }

      details.faq{
        border:1px solid var(--border);
        border-radius:14px;
        padding:12px 14px;
        background: rgba(255,255,255,.92);
      }
      details.faq summary{
        cursor:pointer;
        list-style:none;
        font-weight:900;
        color: var(--text);
      }
      details.faq summary::-webkit-details-marker{ display:none; }
      details.faq p{ margin:10px 0 0; color: var(--muted); }

      .smallLink{
        font-size:12px;
        letter-spacing:.12em;
        text-transform:uppercase;
        color: rgba(15,15,16,.78);
        text-decoration: underline;
        text-underline-offset: 4px;
      }
      .smallLink:hover{ color: var(--primary); }

      .floatingHelp{
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 60;
      }
      .floatingPanel{
        width: 300px;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: rgba(255,255,255,.97);
        box-shadow: var(--shadow);
        padding: 14px;
        margin-bottom: 10px;
      }
      .toast{
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 18px;
        z-index: 80;
        background: rgba(255,255,255,.97);
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 10px 14px;
        box-shadow: var(--shadow);
        font-size: 13px;
        font-weight: 900;
        color: rgba(15,15,16,.85);
      }
    `}</style>
  );
}

/* ============================
   HELPERS
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function imgForFinish(id) {
  const u = FINISH_IMAGES[id];
  return u && u.trim().length > 0 ? u : FALLBACK_IMAGE;
}

function b64urlEncode(str) {
  const b64 = btoa(unescape(encodeURIComponent(str)));
  return b64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
function b64urlDecode(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = (str + pad).replaceAll("-", "+").replaceAll("_", "/");
  return decodeURIComponent(escape(atob(b64)));
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ============================
   DATA
   ============================ */
const FINISH_GROUPS = [
  { group: "Hudson", finishes: [
    { id: "hudson-snow-white", name: "Hudson Snow White" },
    { id: "hudson-cloud-white", name: "Hudson Cloud White" },
    { id: "hudson-hearthstone", name: "Hudson Hearthstone" },
    { id: "hudson-white-rift-oak", name: "Hudson White Rift Oak" },
    { id: "hudson-cashew", name: "Hudson Cashew" },
  ]},
  { group: "Soho", finishes: [
    { id: "soho-snow-white", name: "Soho Snow White" },
    { id: "soho-empire-blue", name: "Soho Empire Blue" }, // keep if you want, but theme is red/white/black
  ]},
  { group: "Southampton", finishes: [
    { id: "southampton-snow-white", name: "Southampton Snow White" },
    { id: "southampton-white-rift-oak", name: "Southampton White Rift Oak" },
    { id: "southampton-carbon-black-oak", name: "Southampton Carbon Black Oak" },
  ]},
];

function getFinishById(id) {
  for (const g of FINISH_GROUPS) for (const f of g.finishes) if (f.id === id) return f;
  return FINISH_GROUPS[0].finishes[0];
}

/* Pricing */
const ASSEMBLY_UPCHARGE_PER_CABINET = 99; // change to your real number

/* Catalog (replace wall/tall placeholders with real SKUs/prices) */
const CABINET_CATALOG = {
  base: {
    label: "Base Cabinets",
    depthOptions: [24, 21],
    heightOptions: [34.5],
    items: [
      { sku: "B12R", width: 12, price: 225 },
      { sku: "B12L", width: 12, price: 225 },
      { sku: "B15R", width: 15, price: 245 },
      { sku: "B15L", width: 15, price: 245 },
      { sku: "B18R", width: 18, price: 265 },
      { sku: "B18L", width: 18, price: 265 },
      { sku: "B21R", width: 21, price: 285 },
      { sku: "B21L", width: 21, price: 285 },
      { sku: "B24", width: 24, price: 305 },
      { sku: "B27", width: 27, price: 325 },
      { sku: "B30", width: 30, price: 345 },
      { sku: "B33", width: 33, price: 365 },
      { sku: "B36", width: 36, price: 385 },
      { sku: "B39", width: 39, price: 405 },
    ],
  },
  wall: {
    label: "Wall Cabinets",
    depthOptions: [12],
    heightOptions: [30, 36, 42],
    items: [
      { sku: "W12", width: 12, price: 199 },
      { sku: "W15", width: 15, price: 219 },
      { sku: "W18", width: 18, price: 239 },
      { sku: "W21", width: 21, price: 259 },
      { sku: "W24", width: 24, price: 279 },
      { sku: "W30", width: 30, price: 319 },
      { sku: "W36", width: 36, price: 359 },
    ],
  },
  tall: {
    label: "Tall / Pantry Cabinets",
    depthOptions: [24],
    heightOptions: [84, 90, 96],
    items: [
      { sku: "T18", width: 18, price: 699 },
      { sku: "T21", width: 21, price: 749 },
      { sku: "T24", width: 24, price: 799 },
    ],
  },
};

const GALLERY = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909172-8c2f041fca1f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=1400&auto=format&fit=crop",
];

const FAQS = [
  { q: "RTA vs Assembled — what’s the difference?", a: "RTA ships flat-packed. Assembled arrives built. Assembly pricing shows per cabinet in the cart." },
  { q: "How does freight shipping work?", a: "Most orders ship LTL freight. We confirm freight cost based on destination and order size. Inspect boxes before signing." },
  { q: "What should I measure?", a: "Wall lengths, ceiling height, window/door locations, and appliance sizes. Photos from each corner help a lot." },
  { q: "What if something arrives damaged?", a: "Report issues quickly with photos. Policies vary by order type and timing, but we’ll guide you." },
  { q: "Not sure what cabinets I need?", a: "Use the Design Center. We’ll create a 3D layout and itemized list before you buy." },
];

/* ============================
   ROUTER
   ============================ */
function parseRouteFromHash(hash) {
  const raw = (hash || "").replace(/^#\/?/, "").trim();
  const [pathPart, queryPart] = raw.split("?");
  const h = (pathPart || "").trim().toLowerCase();
  const parts = h.split("/");
  const first = parts[0] || "home";
  const valid = ["home", "shop", "design", "learn", "gallery", "cart", "contact"];
  const route = valid.includes(first) ? first : "home";
  const sub = parts[1];
  const params = {};
  if (queryPart) {
    const usp = new URLSearchParams(queryPart);
    for (const [k, v] of usp.entries()) params[k] = v;
  }
  return { route, sub, params };
}

/* ============================
   UI bits
   ============================ */
function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="container">
        <div>Free 3D Design • Nationwide Shipping • Secure Checkout</div>
        <div><a href="#/design">Request Design</a></div>
      </div>
    </div>
  );
}

function Toast({ text }) {
  if (!text) return null;
  return <div className="toast">{text}</div>;
}

function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const mailto = `mailto:premier@premierkm.com?subject=${encodeURIComponent("Quick Question — Premier RTA Cabinetry")}&body=${encodeURIComponent(
    "Hi Premier team,\n\nI have a question about:\n- Finish:\n- Cabinets/SKUs:\n- Measurements:\n\nThanks!"
  )}`;

  return (
    <div className="floatingHelp">
      {open && (
        <div className="floatingPanel">
          <div className="kicker">Need help?</div>
          <div style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 850, marginTop: 6 }}>
            Quick Support
          </div>
          <p className="mini" style={{ marginTop: 8 }}>
            Email measurements/photos and we’ll guide your cabinet list.
          </p>
          <div className="row" style={{ marginTop: 10 }}>
            <a className="btn btn-primary" href={mailto}>Email</a>
            <a className="btn btn-outline" href="#/design">Free Design</a>
          </div>
          <div className="row" style={{ marginTop: 8 }}>
            <a className="btn btn-ghost" href="#/learn">Learning</a>
            <a className="btn btn-ghost" href="#/shop">Shop</a>
          </div>
        </div>
      )}

      <button className="btn btn-primary" type="button" onClick={() => setOpen(v => !v)}>
        {open ? "Close" : "Need help?"}
      </button>
    </div>
  );
}

/* ============================
   HEADER
   ============================ */
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, lineHeight: 1 }}>
      <span style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 900, fontSize: 20 }}>Premier</span>
      <span style={{ fontWeight: 950, fontSize: 14, color: "var(--primary)", letterSpacing: ".20em" }}>RTA</span>
      <span style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 750, fontSize: 16, opacity: 0.95 }}>Cabinetry</span>
    </div>
  );
}

function Header({ cartCount }) {
  const links = [
    ["#/home", "Home"],
    ["#/shop", "Shop"],
    ["#/design", "Design Center"],
    ["#/learn", "Learning"],
    ["#/gallery", "Gallery"],
    ["#/cart", `Cart (${cartCount})`],
    ["#/contact", "Contact"],
  ];
  return (
    <header className="sticky">
      <AnnouncementBar />
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", flexWrap: "wrap" }}>
        <a href="#/home"><Logo /></a>
        <nav style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <a className="btn btn-outline" href="mailto:premier@premierkm.com">premier@premierkm.com</a>
          <a className="btn btn-primary" href="#/cart">Checkout</a>
        </div>
      </div>
    </header>
  );
}

/* ============================
   HOME (ONE SCREEN, NO FAQ)
   ============================ */
function Home() {
  const quickFinishes = useMemo(() => FINISH_GROUPS.flatMap(g => g.finishes).slice(0, 3), []);

  return (
    <section className="homeOneScreen">
      <div className="container homeViewport">
        {/* LEFT: HERO */}
        <div className="hero">
          <img src="https://premierkm.com/wp-content/uploads/2021/09/DSC_3484.jpg" alt="Kitchen" />
          <div className="heroInner">
            <div className="heroContent">
              <div className="row">
                <span className="pill gold">Gold accents</span>
                <span className="pill red">Red • White • Black</span>
              </div>

              <h1 className="heroTitle">A refined way to buy cabinets.</h1>
              <p className="heroSub">
                Choose a finish. Add base/wall/tall cabinets by SKU. Checkout confidently.
                If you want a full plan first — we’ll create a free 3D layout + cabinet list.
              </p>

              <div className="row" style={{ marginTop: 14 }}>
                <a className="btn btn-primary" href="#/shop">Shop Finishes</a>
                <a className="btn btn-outline" href="#/design">Free 3D Design</a>
              </div>

              <div className="row" style={{ marginTop: 14 }}>
                <span className="pill">Nationwide Shipping</span>
                <span className="pill">Warehouse Pickup</span>
                <span className="pill">Secure Checkout</span>
              </div>

              <div style={{ marginTop: 12 }}>
                <a className="smallLink" href="#/learn">Questions? Read the Learning Center →</a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS (compact, no-scroll) */}
        <div style={{ display: "grid", gap: 16 }}>
          {/* shop by type */}
          <div className="card">
            <div className="kicker">Start Here</div>
            <h3 style={{ fontSize: 18, marginTop: 8 }}>Shop by Cabinet Type</h3>
            <div className="grid three" style={{ marginTop: 12 }}>
              {[
                { t: "Base", d: "Foundation", href: "#/shop" },
                { t: "Wall", d: "Uppers", href: "#/shop" },
                { t: "Tall", d: "Pantry", href: "#/shop" },
              ].map(x => (
                <a key={x.t} href={x.href} className="card soft" style={{ padding: 14, textAlign: "center" }}>
                  <div style={{ fontWeight: 950 }}>{x.t}</div>
                  <div className="mini">{x.d}</div>
                </a>
              ))}
            </div>
          </div>

          {/* quick finishes */}
          <div className="card">
            <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <div className="kicker">Quick Picks</div>
                <h3 style={{ fontSize: 18, marginTop: 8 }}>Popular finishes</h3>
              </div>
              <a className="smallLink" href="#/shop">All finishes →</a>
            </div>

            <div className="grid three" style={{ marginTop: 12 }}>
              {quickFinishes.map(f => (
                <a key={f.id} href={`#/shop/${f.id}`} className="card soft" style={{ padding: 10 }}>
                  <div className="finish-img">
                    <img src={imgForFinish(f.id)} alt={f.name} style={{ height: 110 }} />
                  </div>
                  <div style={{ marginTop: 8, fontWeight: 900, fontSize: 13 }}>{f.name}</div>
                </a>
              ))}
            </div>
          </div>

          {/* keep the Need Guidance CTA */}
          <div className="card soft">
            <div className="kicker">Need guidance?</div>
            <h3 style={{ fontSize: 18, marginTop: 8 }}>Get a free 3D plan before you buy</h3>
            <p className="mini" style={{ marginTop: 6 }}>
              Send measurements/photos. We return a layout + cabinet list so you order confidently.
            </p>
            <div className="row" style={{ marginTop: 10 }}>
              <a className="btn btn-primary" href="#/design">Request Free Design</a>
              <a className="btn btn-outline" href="#/shop">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   SHOP LIST
   ============================ */
function ShopList() {
  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Shop</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Tribeca Finishes</h2>
        <p>Select a finish to configure cabinet SKUs and add to cart.</p>

        {FINISH_GROUPS.map((g) => (
          <div key={g.group} style={{ marginTop: 22 }}>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ margin: 0 }}>{g.group}</h3>
              <span className="pill gold">Tribeca</span>
            </div>

            <div className="grid three" style={{ marginTop: 12 }}>
              {g.finishes.map((f) => (
                <div key={f.id} className="card">
                  <div className="finish-img">
                    <img src={imgForFinish(f.id)} alt={f.name} />
                  </div>
                  <div className="row" style={{ justifyContent: "space-between", marginTop: 10 }}>
                    <div style={{ fontWeight: 950 }}>{f.name}</div>
                    <span className="pill red">Finish</span>
                  </div>
                  <p className="mini">Configure base/wall/tall cabinets in this finish.</p>
                  <a className="btn btn-primary" href={`#/shop/${f.id}`}>Configure</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================
   CONFIGURATOR
   ============================ */
function Configurator({ finishId, cart, onAddToCart, onExportCartCSV, onToast }) {
  const finish = getFinishById(finishId);

  const [assembly, setAssembly] = useState("rta");
  const [cabType, setCabType] = useState("base");
  const [skuSearch, setSkuSearch] = useState("");
  const [selectedSku, setSelectedSku] = useState(() => CABINET_CATALOG.base.items[0].sku);

  const [depth, setDepth] = useState(CABINET_CATALOG.base.depthOptions[0]);
  const [height, setHeight] = useState(CABINET_CATALOG.base.heightOptions[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const cat = CABINET_CATALOG[cabType];
    setSelectedSku(cat.items[0]?.sku || "");
    setSkuSearch("");
    setDepth(cat.depthOptions[0]);
    setHeight(cat.heightOptions[0]);
    setQty(1);
  }, [cabType]);

  const catalogItems = CABINET_CATALOG[cabType].items;

  const filteredItems = useMemo(() => {
    const q = skuSearch.trim().toLowerCase();
    if (!q) return catalogItems;
    return catalogItems.filter((it) => it.sku.toLowerCase().includes(q) || String(it.width).includes(q));
  }, [catalogItems, skuSearch]);

  useEffect(() => {
    if (!filteredItems.find((x) => x.sku === selectedSku) && filteredItems.length > 0) {
      setSelectedSku(filteredItems[0].sku);
    }
  }, [filteredItems, selectedSku]);

  const chosen =
    filteredItems.find((x) => x.sku === selectedSku) ||
    catalogItems.find((x) => x.sku === selectedSku) ||
    catalogItems[0];

  const assemblyFeeEach = assembly === "assembled" ? ASSEMBLY_UPCHARGE_PER_CABINET : 0;
  const unitTotal = (chosen?.price ?? 0) + assemblyFeeEach;
  const lineTotal = unitTotal * qty;

  const cartSubtotal = useMemo(() => {
    return cart.reduce((s, it) => {
      const assemblyLine = (it.assemblyFeeEach || 0) * it.qty;
      return s + it.unitPrice * it.qty + assemblyLine;
    }, 0);
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);
  const dimsLabel = `${chosen?.width ?? "-"}" W × ${height}" H × ${depth}" D`;

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container grid two" style={{ alignItems: "start" }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <img
            src={imgForFinish(finish.id)}
            alt={finish.name}
            style={{ width: "100%", height: 420, objectFit: "cover" }}
          />
          <div style={{ padding: 18 }}>
            <div className="kicker">Tribeca Finish</div>
            <h2 style={{ fontSize: 28, marginTop: 10 }}>{finish.name}</h2>
            <p className="mini">Choose cabinet type + SKU. Search, set height/depth, and add to cart.</p>

            <div className="divider" />

            <div className="row">
              <span className="pill red">Lead time: 2–5 weeks (typical)</span>
              <span className="pill gold">Warranty: Limited</span>
            </div>
          </div>
        </div>

        <div className="stickySide" style={{ display: "grid", gap: 16 }}>
          <div className="card soft">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div style={{ fontWeight: 950 }}>Mini Cart</div>
              <span className="pill">{cartCount} items</span>
            </div>
            <div className="mini" style={{ marginTop: 8 }}>
              Subtotal: <b style={{ color: "var(--text)" }}>{usd(cartSubtotal)}</b>
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/cart">Go to cart</a>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => { onExportCartCSV(); onToast("CSV exported"); }}
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 22 }}>Add Cabinets</h3>

            <label>Assembly</label>
            <select value={assembly} onChange={(e) => setAssembly(e.target.value)}>
              <option value="rta">RTA (unassembled)</option>
              <option value="assembled">Assembled (+{usd(ASSEMBLY_UPCHARGE_PER_CABINET)} each)</option>
            </select>

            <label>Cabinet type</label>
            <select value={cabType} onChange={(e) => setCabType(e.target.value)}>
              <option value="base">{CABINET_CATALOG.base.label}</option>
              <option value="wall">{CABINET_CATALOG.wall.label}</option>
              <option value="tall">{CABINET_CATALOG.tall.label}</option>
            </select>

            <label>Search SKU</label>
            <input value={skuSearch} onChange={(e) => setSkuSearch(e.target.value)} placeholder='Type "B30" or "24"...' />

            <label>SKU</label>
            <select value={selectedSku} onChange={(e) => setSelectedSku(e.target.value)}>
              {filteredItems.map((it) => (
                <option key={it.sku} value={it.sku}>
                  {it.sku} — {it.width}" — {usd(it.price)}
                </option>
              ))}
            </select>

            <div className="grid two" style={{ marginTop: 8 }}>
              <div>
                <label>Height</label>
                <select value={height} onChange={(e) => setHeight(parseFloat(e.target.value))}>
                  {CABINET_CATALOG[cabType].heightOptions.map((h) => (
                    <option key={h} value={h}>{h}"</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Depth</label>
                <select value={depth} onChange={(e) => setDepth(parseFloat(e.target.value))}>
                  {CABINET_CATALOG[cabType].depthOptions.map((d) => (
                    <option key={d} value={d}>{d}"</option>
                  ))}
                </select>
              </div>
            </div>

            <label>Quantity</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1")))}
            />

            <div className="card soft" style={{ marginTop: 14 }}>
              <div className="mini" style={{ display: "grid", gap: 6 }}>
                <div><b style={{ color: "var(--text)" }}>Size:</b> {dimsLabel}</div>
                <div>
                  <b style={{ color: "var(--text)" }}>Unit:</b> {usd(chosen.price)}
                  {assembly === "assembled" ? ` + ${usd(ASSEMBLY_UPCHARGE_PER_CABINET)} assembly` : ""}
                </div>
                <div><b style={{ color: "var(--text)" }}>Unit Total:</b> {usd(unitTotal)}</div>
                <div><b style={{ color: "var(--text)" }}>Line Total:</b> {usd(lineTotal)}</div>
              </div>
            </div>

            <div className="row" style={{ marginTop: 14 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  onAddToCart({
                    finishId: finish.id,
                    finishName: finish.name,
                    cabinetType: cabType,
                    cabinetTypeLabel: CABINET_CATALOG[cabType].label,
                    sku: chosen.sku,
                    qty,
                    unitPrice: chosen.price,
                    assembly,
                    assemblyFeeEach,
                    width: chosen.width,
                    height,
                    depth,
                  });
                  onToast("Added to cart");
                }}
              >
                Add to cart
              </button>
              <a className="btn btn-outline" href="#/shop">Back</a>
              <a className="btn btn-ghost" href="#/cart">Checkout</a>
            </div>

            <div className="card soft" style={{ marginTop: 14 }}>
              <p className="mini" style={{ margin: 0 }}>
                Want fillers/panels/crown or a full layout? Email <b style={{ color: "var(--text)" }}>premier@premierkm.com</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   DESIGN CENTER
   ============================ */
function DesignCenter() {
  const [path, setPath] = useState("Design It For Me");
  const [budget, setBudget] = useState(25000);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [files, setFiles] = useState([]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Free 3D Design Request — Premier RTA Cabinetry");
    const bodyLines = [
      `Path: ${path}`,
      `Budget: ${usd(budget)}`,
      ``,
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      `Phone: ${contact.phone}`,
      ``,
      `Notes:`,
      notes || "(none)",
      ``,
      `Uploads (attach these to this email):`,
      files.length ? files.map((f) => `- ${f.name}`).join("\n") : "- (none)",
      ``,
      `Photos/Measurements to include: wall lengths, ceiling height, windows/doors, appliance sizes.`,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:premier@premierkm.com?subject=${subject}&body=${body}`;
  }, [path, budget, contact, notes, files]);

  return (
    <section className="section">
      <div className="container grid two">
        <div>
          <div className="kicker">Design Center</div>
          <h2 style={{ fontSize: 30, marginTop: 10 }}>Free 3D Design</h2>
          <p>Pick a path. We deliver a 3D layout + cabinet list before you buy.</p>

          <div className="row" style={{ marginTop: 12 }}>
            {["Design It For Me", "I Have Measurements", "I Just Want Advice"].map((p) => (
              <button
                key={p}
                type="button"
                className={path === p ? "btn btn-primary" : "btn btn-outline"}
                onClick={() => setPath(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid two" style={{ marginTop: 14 }}>
            <div className="card soft">
              <div className="kicker">What you get</div>
              <p className="mini" style={{ margin: 0 }}>3D layout + cabinet placement + itemized list.</p>
            </div>
            <div className="card soft">
              <div className="kicker">What to send</div>
              <p className="mini" style={{ margin: 0 }}>Wall lengths, ceiling height, photos, appliances.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 20 }}>Request (Free)</h3>

          <label>Budget comfort</label>
          <input
            type="range"
            min={8000}
            max={80000}
            step={1000}
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value || "25000"))}
          />
          <div className="mini">Target: <b style={{ color: "var(--text)" }}>{usd(budget)}</b></div>

          <label>Name</label>
          <input value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} />

          <label>Email</label>
          <input value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />

          <label>Phone</label>
          <input value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />

          <label>Upload measurements/photos</label>
          <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          <div className="mini" style={{ marginTop: 6 }}>
            {files.length ? `Selected: ${files.map((f) => f.name).join(", ")}` : "Add photos/sketches. (Attach them when your email opens.)"}
          </div>

          <label>Notes</label>
          <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Walls/windows, appliances, timeline…" />

          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn btn-primary" href={mailtoHref}>Request Free Design (Email)</a>
            <a className="btn btn-outline" href="mailto:premier@premierkm.com">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   LEARNING (FAQ moved here)
   ============================ */
function Learning() {
  const items = [
    { title: "What is RTA?", body: "Ready-to-Assemble ships flat-packed for easier delivery and handling." },
    { title: "How to measure", body: "Measure wall lengths, ceiling height, and mark windows/doors. Take photos from each corner." },
    { title: "Freight shipping", body: "Most cabinet orders ship LTL freight. Inspect boxes before signing." },
    { title: "Assembly pricing", body: `Assembled adds ${usd(ASSEMBLY_UPCHARGE_PER_CABINET)} per cabinet (shown in the cart).` },
    { title: "Damages/returns", body: "Report issues quickly with photos. Policies vary by order type." },
    { title: "Need help?", body: "Email premier@premierkm.com and we’ll guide you through finish + cabinet list." },
  ];

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Learning</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Learning Center</h2>
        <p>Clear answers so customers feel confident ordering online.</p>

        <div className="grid two" style={{ marginTop: 14 }}>
          {items.map((it) => (
            <div key={it.title} className="card">
              <h3 style={{ fontSize: 18 }}>{it.title}</h3>
              <p className="mini">{it.body}</p>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div className="kicker">FAQ</div>
        <h2 style={{ fontSize: 26, marginTop: 10 }}>Quick answers</h2>

        <div className="grid two" style={{ marginTop: 14 }}>
          {FAQS.map((f) => (
            <details key={f.q} className="faq">
              <summary>{f.q}</summary>
              <p className="mini">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   GALLERY
   ============================ */
function Gallery() {
  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Gallery</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Project Inspiration</h2>
        <p>Placeholders now — replace with your installs and tag the finish used.</p>

        <div className="grid three" style={{ marginTop: 14 }}>
          {GALLERY.map((src, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <img src={src} alt="Gallery" style={{ width: "100%", height: 240, objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CART
   ============================ */
function Cart({ cart, onRemove, onClear, onExportCSV, onShareLink, onToast }) {
  const subtotal = useMemo(() => {
    return cart.reduce((s, it) => {
      const assemblyFee = (it.assemblyFeeEach || 0) * it.qty;
      return s + it.unitPrice * it.qty + assemblyFee;
    }, 0);
  }, [cart]);

  const checkoutOk = STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== "PASTE_STRIPE_PAYMENT_LINK_HERE";
  const [freightOk, setFreightOk] = useState(false);
  const canPay = checkoutOk && cart.length > 0 && freightOk;

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Cart</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Checkout</h2>

        {cart.length === 0 ? (
          <div className="card">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="card soft" style={{ marginTop: 14 }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="pill red">Freight shipping is quoted after order</span>
                <span className="pill gold">Export + share tools below</span>
              </div>
              <div className="mini" style={{ marginTop: 10 }}>
                Most orders ship LTL freight. We confirm freight cost based on destination and order size.
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <input
                  id="freight-ok"
                  type="checkbox"
                  checked={freightOk}
                  onChange={(e) => setFreightOk(e.target.checked)}
                  style={{ width: 18, height: 18 }}
                />
                <label htmlFor="freight-ok" style={{ margin: 0, textTransform: "none", letterSpacing: 0, fontSize: 13, color: "var(--muted)" }}>
                  I understand freight will be quoted separately.
                </label>
              </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: "hidden", marginTop: 14 }}>
              <table>
                <thead>
                  <tr>
                    <th>Finish</th>
                    <th>Type</th>
                    <th>SKU</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Assembly</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((it) => {
                    const assemblyFeeLine = (it.assemblyFeeEach || 0) * it.qty;
                    const lineTotal = it.unitPrice * it.qty + assemblyFeeLine;
                    const size = `${it.width ?? "-"}"W × ${it.height ?? "-"}"H × ${it.depth ?? "-"}"D`;

                    return (
                      <tr key={it.key}>
                        <td>{it.finishName}</td>
                        <td>{it.cabinetTypeLabel || it.cabinetType || "-"}</td>
                        <td>{it.sku}</td>
                        <td>{size}</td>
                        <td>{it.qty}</td>
                        <td>{usd(it.unitPrice)}</td>
                        <td>{it.assembly === "assembled" ? usd(it.assemblyFeeEach || 0) : usd(0)}</td>
                        <td>{usd(lineTotal)}</td>
                        <td>
                          <button className="btn btn-outline" type="button" onClick={() => onRemove(it.key)}>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12, fontSize: 18 }}>
              Subtotal: <span style={{ marginLeft: 10, fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 850 }}>{usd(subtotal)}</span>
            </div>

            <div className="row" style={{ justifyContent: "space-between", marginTop: 12 }}>
              <div className="row">
                <button className="btn btn-outline" type="button" onClick={onClear}>Clear Cart</button>
                <button className="btn btn-outline" type="button" onClick={() => { onExportCSV(); onToast("CSV exported"); }}>
                  Export CSV
                </button>
                <button className="btn btn-ghost" type="button" onClick={async () => { await onShareLink(); onToast("Share link copied"); }}>
                  Share Cart
                </button>
              </div>

              {checkoutOk ? (
                <a
                  className="btn btn-primary"
                  href={canPay ? STRIPE_PAYMENT_LINK : undefined}
                  onClick={(e) => { if (!canPay) e.preventDefault(); }}
                  target="_blank"
                  rel="noreferrer"
                  style={{ opacity: canPay ? 1 : 0.55, pointerEvents: canPay ? "auto" : "none" }}
                >
                  Pay (Apple Pay / Card)
                </a>
              ) : (
                <a className="btn btn-primary" href="mailto:premier@premierkm.com">Checkout Setup Needed</a>
              )}
            </div>

            {!checkoutOk && (
              <div className="card soft" style={{ marginTop: 14 }}>
                <p className="mini" style={{ margin: 0 }}>
                  Paste your Stripe payment link into STRIPE_PAYMENT_LINK at the top of this file.
                </p>
              </div>
            )}

            {checkoutOk && !freightOk && (
              <div className="card soft" style={{ marginTop: 14 }}>
                <p className="mini" style={{ margin: 0 }}>
                  Check the freight acknowledgement above to enable checkout.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ============================
   CONTACT
   ============================ */
function Contact() {
  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Contact</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Premier RTA Cabinetry</h2>
        <p>Email: <b style={{ color: "var(--text)" }}>premier@premierkm.com</b></p>
        <p>Phone: 800-PREMIER</p>
      </div>
    </section>
  );
}

/* ============================
   APP
   ============================ */
export default function App() {
  const [hash, setHash] = useState(typeof window !== "undefined" ? (window.location.hash || "#/home") : "#/home");
  const [toast, setToast] = useState("");

  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("premier_cart") || "[]"); } catch { return []; }
  });

  const { route, sub, params } = parseRouteFromHash(hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/home");
    if (!window.location.hash) window.location.hash = "/home";
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => { localStorage.setItem("premier_cart", JSON.stringify(cart)); }, [cart]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const onToast = (msg) => setToast(msg);

  // Auto-load shared cart links: #/cart?data=XXXX
  useEffect(() => {
    if (route !== "cart") return;
    const data = params?.data;
    if (!data) return;
    try {
      const decoded = b64urlDecode(data);
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed)) {
        setCart(parsed);
        window.location.hash = "/cart";
        setToast("Cart loaded");
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const addToCart = ({ finishId, finishName, cabinetType, cabinetTypeLabel, sku, qty, unitPrice, assembly, assemblyFeeEach, width, height, depth }) => {
    const key = `${finishId}|${cabinetType}|${sku}|${assembly}|${width}|${height}|${depth}`;

    setCart((prev) => {
      const idx = prev.findIndex((x) => x.key === key);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { key, finishId, finishName, cabinetType, cabinetTypeLabel, sku, qty, unitPrice, assembly, assemblyFeeEach, width, height, depth }];
    });

    window.location.hash = "/cart";
  };

  const removeFromCart = (key) => setCart((prev) => prev.filter((x) => x.key !== key));
  const clearCart = () => setCart([]);

  const exportCartCSV = () => {
    const header = ["Finish", "Type", "SKU", "Width", "Height", "Depth", "Qty", "UnitPrice", "AssemblyEach", "LineTotal"].join(",");
    const rows = cart.map((it) => {
      const assemblyLine = (it.assemblyFeeEach || 0) * it.qty;
      const lineTotal = it.unitPrice * it.qty + assemblyLine;
      const cols = [
        it.finishName,
        it.cabinetTypeLabel || it.cabinetType || "",
        it.sku,
        it.width ?? "",
        it.height ?? "",
        it.depth ?? "",
        it.qty,
        it.unitPrice,
        it.assembly === "assembled" ? (it.assemblyFeeEach || 0) : 0,
        lineTotal,
      ];
      return cols.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",");
    });
    downloadTextFile("premier-cart.csv", [header, ...rows].join("\n"));
  };

  const shareCartLink = async () => {
    const payload = JSON.stringify(cart);
    const token = b64urlEncode(payload);
    const url = `${window.location.origin}${window.location.pathname}#/cart?data=${token}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      prompt("Copy this share link:", url);
    }
  };

  return (
    <div>
      <GlobalStyles />
      <Header cartCount={cart.reduce((s, it) => s + it.qty, 0)} />

      {route === "home" && <Home />}
      {route === "shop" && (!sub ? <ShopList /> : (
        <Configurator
          finishId={sub}
          cart={cart}
          onAddToCart={addToCart}
          onExportCartCSV={exportCartCSV}
          onToast={onToast}
        />
      ))}
      {route === "design" && <DesignCenter />}
      {route === "learn" && <Learning />}
      {route === "gallery" && <Gallery />}
      {route === "cart" && (
        <Cart
          cart={cart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onExportCSV={exportCartCSV}
          onShareLink={shareCartLink}
          onToast={onToast}
        />
      )}
      {route === "contact" && <Contact />}

      <FloatingHelp />
      <Toast text={toast} />
    </div>
  );
}
