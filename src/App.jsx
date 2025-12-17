import React, { useEffect, useMemo, useState } from "react";

/* ============================
   CONFIG (edit these)
   ============================ */
const STRIPE_PAYMENT_LINK = "PASTE_STRIPE_PAYMENT_LINK_HERE"; // Apple Pay + card
const SUPPORT_EMAIL = "premier@premierkm.com";
const SUPPORT_PHONE = "800-PREMIER";
const WAREHOUSE_LOCATION = "Staten Island, NY";

/* Finish images (optional) */
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
   GLOBAL STYLES (Luxury: red/white/black + gold)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#ffffff;
        --bg2:#faf7f1;
        --card:#ffffff;
        --card2:#fbf9f4;

        --text:#0f0f10;
        --muted:#2f2f34;
        --muted2:#6a6a72;

        --primary:#c0182a;
        --primary2:#9f1322;

        --gold:#b08d57;
        --gold2:#8d6a3c;

        --border: rgba(15,15,16,.12);
        --ring: rgba(192,24,42,.18);

        --shadow: 0 16px 34px rgba(0,0,0,.10);
        --shadow2: 0 10px 22px rgba(0,0,0,.08);
      }

      html,body{
        margin:0;
        background:
          radial-gradient(900px 520px at 15% 0%, rgba(176,141,87,.12), transparent 55%),
          radial-gradient(900px 520px at 85% 10%, rgba(192,24,42,.08), transparent 60%),
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
        font-weight:700;
        letter-spacing:-0.02em;
        line-height:1.15;
      }
      p{
        margin:10px 0;
        line-height:1.7;
        color:var(--muted);
      }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section.section{ padding:46px 0; }
      @media(max-width:900px){ section.section{ padding:32px 0; } }

      header.sticky{
        position:sticky;
        top:0;
        z-index:40;
        background:rgba(255,255,255,.92);
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
        color: rgba(15,15,16,.86);
      }
      nav a:hover{
        background: rgba(192,24,42,.08);
        color: rgba(15,15,16,.98);
      }

      .kicker{
        font-size:11px;
        letter-spacing:.22em;
        text-transform:uppercase;
        color:var(--muted2);
        font-weight:800;
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
      @media(max-width:1100px){ .four{ grid-template-columns:repeat(2,1fr);} }
      @media(max-width:900px){ .two,.three,.four{ grid-template-columns:1fr; } }

      .row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; }

      .pill{
        padding:7px 12px;
        border-radius:999px;
        border:1px solid var(--border);
        background: rgba(255,255,255,.92);
        font-size:12px;
        font-weight:800;
        color: rgba(15,15,16,.86);
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
        transition: transform .10s ease, box-shadow .10s ease, background .10s ease, opacity .10s ease;
      }
      .btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
      .btn:active{ transform: translateY(0px); box-shadow:none; }
      .btn:disabled{ opacity:.55; cursor:not-allowed; transform:none; box-shadow:none; }

      .btn-primary{
        background: linear-gradient(180deg, var(--primary), var(--primary2));
        color:#fff;
        box-shadow: 0 14px 28px rgba(192,24,42,.22);
      }
      .btn-outline{
        border-color: rgba(15,15,16,.22);
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
        font-weight:800;
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
      .divider{ height:1px; background:var(--border); margin:14px 0; }

      .finish-img{
        border-radius:16px;
        overflow:hidden;
        border:1px solid var(--border);
        background: rgba(0,0,0,.02);
      }
      .finish-img img{ width:100%; height:180px; object-fit:cover; }

      .stickySide{ position: sticky; top: 92px; align-self:start; }
      @media(max-width:900px){ .stickySide{ position: static; } }

      /* Home hero */
      .heroGrid{
        display:grid;
        grid-template-columns: 1.2fr .8fr;
        gap:16px;
        align-items:stretch;
      }
      @media(max-width:900px){ .heroGrid{ grid-template-columns:1fr; } }

      .heroImage{
        border-radius:20px;
        overflow:hidden;
        border:1px solid var(--border);
        box-shadow: var(--shadow);
        min-height: 360px;
      }
      .heroImage img{ width:100%; height:100%; object-fit:cover; }

      /* Learning accordions */
      details.lux{
        border:1px solid var(--border);
        border-radius:16px;
        padding:14px 14px;
        background: rgba(255,255,255,.92);
        box-shadow: var(--shadow2);
      }
      details.lux summary{
        cursor:pointer;
        list-style:none;
        font-weight:900;
        color: var(--text);
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
      }
      details.lux summary::-webkit-details-marker{ display:none; }
      details.lux p{ margin:10px 0 0; color: var(--muted); }
      .luxTag{
        font-size:11px;
        letter-spacing:.16em;
        text-transform:uppercase;
        color: rgba(15,15,16,.60);
        font-weight:850;
        border:1px solid rgba(15,15,16,.14);
        padding:6px 10px;
        border-radius:999px;
        background: rgba(255,255,255,.9);
      }

      /* Floating help + toast */
      .floatingHelp{
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 60;
      }
      .floatingPanel{
        width: 320px;
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
        color: rgba(15,15,16,.88);
      }

      /* Small helpers */
      .mutedLink{
        font-size:12px;
        letter-spacing:.12em;
        text-transform:uppercase;
        color: rgba(15,15,16,.70);
        text-decoration: underline;
        text-underline-offset: 4px;
      }
      .mutedLink:hover{ color: var(--primary); }
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
    { id: "soho-empire-blue", name: "Soho Empire Blue" },
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

const ASSEMBLY_UPCHARGE_PER_CABINET = 99;

/* Catalog (placeholder wall/tall prices — replace later) */
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

/* NEW: “Accessories” category placeholder to make the store feel bigger */
const ACCESSORIES = [
  { sku: "TK96", name: "Toe Kick (96\")", price: 89 },
  { sku: "F3", name: "Filler (3\")", price: 35 },
  { sku: "F6", name: "Filler (6\")", price: 49 },
  { sku: "PANEL24", name: "Side Panel (24\")", price: 120 },
  { sku: "CROWN96", name: "Crown Molding (96\")", price: 95 },
  { sku: "LR96", name: "Light Rail (96\")", price: 85 },
];

/* Gallery placeholders */
const GALLERY = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909172-8c2f041fca1f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=1400&auto=format&fit=crop",
];

/* Reviews */
const REVIEWS = [
  { name: "M. R.", text: "Cabinet list was spot on. Finish looked even better in person.", meta: "Homeowner • NY" },
  { name: "S. D.", text: "Smooth delivery and easy ordering. Great support when I had questions.", meta: "Contractor • NJ" },
  { name: "K. L.", text: "Design help saved us time. Shopping by SKU was way easier than showrooms.", meta: "Homeowner • PA" },
];

/* Learning guide (expanded) */
const LEARNING_TOPICS = [
  { tag: "Ordering", title: "RTA vs Assembled", body: `RTA ships flat-packed. Assembled arrives built. Assembled adds ${usd(ASSEMBLY_UPCHARGE_PER_CABINET)} per cabinet and shows in your cart.` },
  { tag: "Measuring", title: "What to measure for a quote & 3D design", body: "Wall lengths, ceiling height, window/door positions, and appliance sizes. Photos from each corner help. Upload sketches/photos in Design Center." },
  { tag: "Shipping", title: "Freight shipping (LTL) & delivery day", body: "Most orders ship LTL freight. Freight is quoted after order based on destination and order size. Inspect packaging before signing and take photos of any damage." },
  { tag: "Support", title: "Damages & replacements", body: "Report issues quickly with photos. Policies vary by order type and timing — email us and we’ll guide you through the fastest resolution path." },
  { tag: "Planning", title: "A simple cabinet planning checklist", body: "Base run + sink location, wall cabinet heights, tall pantry location, fillers/panels, crown/light rail. If you’re unsure, request a free 3D plan." },
  { tag: "Install", title: "Basic install notes", body: "Start level, mark studs, hang uppers first, then bases. Use shims and a long level. Ask for install recommendations if you need them." },
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
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Quick Question — Premier RTA Cabinetry")}&body=${encodeURIComponent(
    "Hi Premier team,\n\nI have a question about:\n- Finish:\n- Cabinets/SKUs:\n- Measurements:\n\nThanks!"
  )}`;

  return (
    <div className="floatingHelp">
      {open && (
        <div className="floatingPanel">
          <div className="kicker">Need help?</div>
          <div style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 900, marginTop: 6 }}>
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
            <a className="btn btn-ghost" href="#/learn">Guide</a>
            <a className="btn btn-ghost" href="#/shop">Shop</a>
            <a className="btn btn-ghost" href="#/contact">Contact</a>
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
      <span style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 800, fontSize: 16, opacity: 0.95 }}>Cabinetry</span>
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
          <a className="btn btn-outline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          <a className="btn btn-primary" href="#/cart">Checkout</a>
        </div>
      </div>
    </header>
  );
}

/* ============================
   HOME (NEATER, not too much)
   ============================ */
function Home() {
  const finishesFlat = useMemo(() => FINISH_GROUPS.flatMap(g => g.finishes), []);
  const [finishId, setFinishId] = useState(finishesFlat[0]?.id || "");
  const selectedFinish = finishesFlat.find(f => f.id === finishId) || finishesFlat[0];

  // Reviews (small, not overwhelming)
  const [reviewIdx, setReviewIdx] = useState(0);
  const review = REVIEWS[reviewIdx % REVIEWS.length];

  return (
    <section className="section">
      <div className="container">
        {/* neat hero */}
        <div className="heroGrid">
          <div className="card">
            <div className="kicker">Premier RTA Cabinetry</div>
            <h1 style={{ fontSize: 44, marginTop: 8 }}>A calmer way to buy cabinets.</h1>
            <p style={{ color: "rgba(15,15,16,.78)" }}>
              Choose a finish, add cabinets by SKU, and checkout. Want a full plan first? We’ll create a free 3D layout + itemized list.
            </p>
            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn btn-primary" href="#/shop">Shop Finishes</a>
              <a className="btn btn-outline" href="#/design">Free 3D Design</a>
              <a className="btn btn-ghost" href="#/learn">Customer Guide</a>
            </div>

            <div className="row" style={{ marginTop: 14 }}>
              <span className="pill">Nationwide Shipping</span>
              <span className="pill">Warehouse Pickup</span>
              <span className="pill gold">Gold accents</span>
            </div>

            <div className="divider" />

            <div className="mini" style={{ marginTop: 0 }}>
              <b style={{ color: "var(--text)" }}>Customer review:</b> “{review.text}” — {review.name}
              <div className="row" style={{ marginTop: 10 }}>
                <button className="btn btn-outline" type="button" onClick={()=>setReviewIdx(i=>Math.max(0,i-1))}>Prev</button>
                <button className="btn btn-primary" type="button" onClick={()=>setReviewIdx(i=>i+1)}>Next</button>
              </div>
            </div>
          </div>

          <div className="heroImage">
            <img src="https://premierkm.com/wp-content/uploads/2021/09/DSC_3484.jpg" alt="Kitchen" />
          </div>
        </div>

        {/* Quick Start (simple) */}
        <div className="grid two" style={{ marginTop: 16 }}>
          <div className="card soft">
            <div className="kicker">Quick Start</div>
            <h2 style={{ fontSize: 28, marginTop: 10 }}>Pick a finish → start building</h2>
            <label>Finish</label>
            <select value={finishId} onChange={(e)=>setFinishId(e.target.value)}>
              {FINISH_GROUPS.map(g => (
                <optgroup key={g.group} label={g.group}>
                  {g.finishes.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </optgroup>
              ))}
            </select>

            <div className="finish-img" style={{ marginTop: 12 }}>
              <img src={imgForFinish(selectedFinish?.id)} alt={selectedFinish?.name || "Finish"} style={{ height: 170 }} />
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href={`#/shop/${finishId}`}>Configure</a>
              <a className="btn btn-outline" href="#/shop">Browse all</a>
            </div>
          </div>

          <div className="card">
            <div className="kicker">What we do</div>
            <h2 style={{ fontSize: 28, marginTop: 10 }}>Two ways to buy</h2>

            <div className="grid two" style={{ marginTop: 12 }}>
              <div className="card soft">
                <div className="pill red" style={{ display:"inline-flex" }}>DIY</div>
                <p className="mini">Shop finishes → add base/wall/tall by SKU → checkout.</p>
                <a className="mutedLink" href="#/shop">Start shopping</a>
              </div>
              <div className="card soft">
                <div className="pill gold" style={{ display:"inline-flex" }}>Designer-led</div>
                <p className="mini">Submit measurements/photos → get a 3D plan + itemized list.</p>
                <a className="mutedLink" href="#/design">Request design</a>
              </div>
            </div>

            <div className="divider" />
            <div className="mini">
              Want the site to feel bigger? We now also sell accessories like toe kicks, panels, and crown.
              <div className="row" style={{ marginTop: 10 }}>
                <a className="btn btn-ghost" href="#/learn">See accessories</a>
                <a className="btn btn-ghost" href="#/gallery">View installs</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ============================
   SHOP (bigger: search + sort + filters + featured)
   ============================ */
function ShopList(){
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("az"); // az | za

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();

    const groups = FINISH_GROUPS
      .filter(g => group === "all" ? true : g.group.toLowerCase() === group)
      .map(g => ({
        group: g.group,
        finishes: g.finishes
          .filter(f => !query ? true : (f.name.toLowerCase().includes(query) || f.id.toLowerCase().includes(query)))
          .slice()
          .sort((a,b)=>{
            const A = a.name.toLowerCase();
            const B = b.name.toLowerCase();
            return sort === "az" ? A.localeCompare(B) : B.localeCompare(A);
          })
      }))
      .filter(g => g.finishes.length > 0);

    return groups;
  }, [group, q, sort]);

  const featured = useMemo(() => FINISH_GROUPS.flatMap(g=>g.finishes).slice(0,4), []);

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Shop</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Tribeca Finishes</h2>
        <p>Search finishes, filter collections, then configure cabinets by SKU.</p>

        {/* Filters */}
        <div className="card soft" style={{ marginTop: 14 }}>
          <div className="grid three">
            <div>
              <label>Search</label>
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Snow White, Rift Oak, Hudson…" />
            </div>
            <div>
              <label>Collection</label>
              <select value={group} onChange={(e)=>setGroup(e.target.value)}>
                <option value="all">All</option>
                {FINISH_GROUPS.map(g => <option key={g.group} value={g.group.toLowerCase()}>{g.group}</option>)}
              </select>
            </div>
            <div>
              <label>Sort</label>
              <select value={sort} onChange={(e)=>setSort(e.target.value)}>
                <option value="az">Name (A–Z)</option>
                <option value="za">Name (Z–A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured finishes */}
        <div className="card" style={{ marginTop: 16 }}>
          <div className="row" style={{ justifyContent:"space-between", alignItems:"baseline" }}>
            <div>
              <div className="kicker">Featured</div>
              <h3 style={{ fontSize: 22, marginTop: 8 }}>Popular finishes</h3>
            </div>
            <span className="pill gold">Fast start</span>
          </div>

          <div className="grid four" style={{ marginTop: 14 }}>
            {featured.map(f=>(
              <a key={f.id} href={`#/shop/${f.id}`} className="card soft" style={{ display:"block" }}>
                <div className="finish-img">
                  <img src={imgForFinish(f.id)} alt={f.name} style={{ height:150 }} />
                </div>
                <div style={{ marginTop:10, fontWeight:900 }}>{f.name}</div>
                <div className="mini">Click to configure</div>
              </a>
            ))}
          </div>
        </div>

        {/* Full lists */}
        {results.map(g=>(
          <div key={g.group} style={{ marginTop: 22 }}>
            <div className="row" style={{ justifyContent:"space-between", alignItems:"baseline" }}>
              <h3 style={{ margin:0 }}>{g.group}</h3>
              <span className="pill gold">Tribeca</span>
            </div>

            <div className="grid three" style={{ marginTop: 12 }}>
              {g.finishes.map(f=>(
                <div key={f.id} className="card">
                  <div className="finish-img">
                    <img src={imgForFinish(f.id)} alt={f.name} />
                  </div>
                  <div className="row" style={{ justifyContent:"space-between", marginTop:10 }}>
                    <div style={{ fontWeight:900 }}>{f.name}</div>
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
   CONFIGURATOR (bigger: accessories + recent adds)
   ============================ */
function Configurator({ finishId, cart, onAddToCart, onExportCartCSV, onToast }){
  const finish = getFinishById(finishId);

  const [assembly, setAssembly] = useState("rta");
  const [cabType, setCabType] = useState("base");
  const [skuSearch, setSkuSearch] = useState("");
  const [selectedSku, setSelectedSku] = useState(() => CABINET_CATALOG.base.items[0].sku);

  const [depth, setDepth] = useState(CABINET_CATALOG.base.depthOptions[0]);
  const [height, setHeight] = useState(CABINET_CATALOG.base.heightOptions[0]);
  const [qty, setQty] = useState(1);

  // accessories quick add
  const [accSku, setAccSku] = useState(ACCESSORIES[0]?.sku || "");
  const [accQty, setAccQty] = useState(1);

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

  const recent = useMemo(() => cart.slice(-4).reverse(), [cart]);

  const accItem = ACCESSORIES.find(a => a.sku === accSku) || ACCESSORIES[0];

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
            <p className="mini">Choose cabinet type + SKU. Search, set height/depth, add quantities. Add accessories too.</p>

            <div className="divider" />
            <div className="row">
              <span className="pill red">Lead time: 2–5 weeks (typical)</span>
              <span className="pill gold">Warranty: Limited</span>
              <span className="pill">Accessories available</span>
            </div>
          </div>
        </div>

        <div className="stickySide" style={{ display: "grid", gap: 16 }}>
          {/* mini cart */}
          <div className="card soft">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div style={{ fontWeight: 900 }}>Mini Cart</div>
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

          {/* add cabinets */}
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

            <div className="divider" />

            {/* accessories */}
            <h3 style={{ fontSize: 18, margin: "0 0 6px" }}>Accessories</h3>
            <div className="mini">Toe kick, panels, fillers, crown. Add to cart.</div>

            <label style={{ marginTop: 10 }}>Accessory</label>
            <select value={accSku} onChange={(e)=>setAccSku(e.target.value)}>
              {ACCESSORIES.map(a => (
                <option key={a.sku} value={a.sku}>
                  {a.sku} — {a.name} — {usd(a.price)}
                </option>
              ))}
            </select>

            <label>Qty</label>
            <input
              type="number"
              min={1}
              value={accQty}
              onChange={(e)=>setAccQty(Math.max(1, parseInt(e.target.value || "1")))}
            />

            <div className="row" style={{ marginTop: 12 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={()=>{
                  onAddToCart({
                    finishId: finish.id,
                    finishName: finish.name,
                    cabinetType: "accessory",
                    cabinetTypeLabel: "Accessories",
                    sku: accItem.sku,
                    qty: accQty,
                    unitPrice: accItem.price,
                    assembly: "rta",
                    assemblyFeeEach: 0,
                    width: 0,
                    height: 0,
                    depth: 0,
                  });
                  onToast("Accessory added");
                }}
              >
                Add accessory
              </button>
              <a className="btn btn-outline" href="#/learn">How these work</a>
            </div>
          </div>

          {/* recent adds */}
          {recent.length > 0 && (
            <div className="card soft">
              <div className="kicker">Recently added</div>
              <div style={{ marginTop: 10, display:"grid", gap:10 }}>
                {recent.map(it=>(
                  <div key={it.key} className="mini">
                    <b style={{ color:"var(--text)" }}>{it.sku}</b> • {it.cabinetTypeLabel} • Qty {it.qty}
                  </div>
                ))}
              </div>
              <div className="divider" />
              <a className="mutedLink" href="#/cart">Review cart →</a>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

/* ============================
   CART (bigger: notes + email quote)
   ============================ */
function Cart({ cart, onRemove, onClear, onExportCSV, onShareLink, onToast }){
  const subtotal = useMemo(() => {
    return cart.reduce((s, it) => {
      const assemblyFee = (it.assemblyFeeEach || 0) * it.qty;
      return s + it.unitPrice * it.qty + assemblyFee;
    }, 0);
  }, [cart]);

  const checkoutOk = STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== "PASTE_STRIPE_PAYMENT_LINK_HERE";
  const [freightOk, setFreightOk] = useState(false);
  const canPay = checkoutOk && cart.length > 0 && freightOk;

  const [notes, setNotes] = useState("");

  const emailQuoteHref = useMemo(() => {
    const subject = encodeURIComponent("Cabinet Quote Request — Premier RTA Cabinetry");
    const lines = cart.map(it => {
      const size = `${it.width ?? "-"}W x ${it.height ?? "-"}H x ${it.depth ?? "-"}D`;
      const assembly = it.assembly === "assembled" ? `Assembled (+${it.assemblyFeeEach || 0}/ea)` : "RTA";
      return `- ${it.finishName} | ${it.cabinetTypeLabel} | ${it.sku} | ${size} | Qty ${it.qty} | ${assembly}`;
    });
    const body = encodeURIComponent(
      `Hi Premier team,\n\nPlease review my cart / quote:\n\n${lines.join("\n")}\n\nCustomer notes:\n${notes || "(none)"}\n\nSubtotal shown: ${usd(subtotal)}\n\nThanks!`
    );
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [cart, notes, subtotal]);

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Cart</div>
        <h2 style={{ fontSize: 30, marginTop: 10 }}>Checkout</h2>

        {cart.length === 0 ? (
          <div className="card">
            <p>Your cart is empty.</p>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/shop">Shop finishes</a>
              <a className="btn btn-outline" href="#/design">Free 3D Design</a>
            </div>
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
              Subtotal: <span style={{ marginLeft: 10, fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 900 }}>{usd(subtotal)}</span>
            </div>

            <div className="grid two" style={{ marginTop: 16 }}>
              <div className="card soft">
                <div className="kicker">Order notes</div>
                <h3 style={{ fontSize: 20, marginTop: 8 }}>Add notes for your quote</h3>
                <textarea rows={5} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Apartment delivery? Stairs? Timeline? Any special instructions…" />
                <div className="row" style={{ marginTop: 12 }}>
                  <a className="btn btn-primary" href={emailQuoteHref} onClick={()=>onToast("Email draft opened")}>Email quote</a>
                  <button className="btn btn-outline" type="button" onClick={()=>{ onExportCSV(); onToast("CSV exported"); }}>Export CSV</button>
                </div>
                <div className="mini" style={{ marginTop: 10 }}>
                  This opens your email app with your cart formatted inside.
                </div>
              </div>

              <div className="card">
                <div className="kicker">Tools</div>
                <h3 style={{ fontSize: 20, marginTop: 8 }}>Save & share your cart</h3>
                <div className="row" style={{ marginTop: 12 }}>
                  <button className="btn btn-outline" type="button" onClick={onClear}>Clear Cart</button>
                  <button className="btn btn-ghost" type="button" onClick={async ()=>{ await onShareLink(); onToast("Share link copied"); }}>
                    Share Cart
                  </button>
                </div>

                <div className="divider" />

                {checkoutOk ? (
                  <a
                    className="btn btn-primary"
                    href={canPay ? STRIPE_PAYMENT_LINK : undefined}
                    onClick={(e) => { if (!canPay) e.preventDefault(); }}
                    target="_blank"
                    rel="noreferrer"
                    style={{ opacity: canPay ? 1 : 0.55, pointerEvents: canPay ? "auto" : "none", width:"100%" }}
                  >
                    Pay (Apple Pay / Card)
                  </a>
                ) : (
                  <a className="btn btn-primary" href={`mailto:${SUPPORT_EMAIL}`} style={{ width:"100%" }}>
                    Checkout Setup Needed
                  </a>
                )}

                {!checkoutOk && (
                  <div className="mini" style={{ marginTop: 10 }}>
                    Paste your Stripe payment link into STRIPE_PAYMENT_LINK at the top of this file.
                  </div>
                )}
                {checkoutOk && !freightOk && (
                  <div className="mini" style={{ marginTop: 10 }}>
                    Check the freight acknowledgement to enable checkout.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ============================
   DESIGN CENTER (bigger: steps + tips)
   ============================ */
function DesignCenter(){
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
      `Measurements to include: wall lengths, ceiling height, windows/doors, appliances.`,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [path, budget, contact, notes, files]);

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Design Center</div>
        <h2 style={{ fontSize: 32, marginTop: 10 }}>Free 3D Design & Cabinet List</h2>
        <p>Submit measurements/photos. We return a 3D layout and itemized list before you buy.</p>

        <div className="grid three" style={{ marginTop: 14 }}>
          {[
            { t:"1) Send measurements", b:"Wall lengths, ceiling height, windows/doors, appliance sizes." },
            { t:"2) We design & list", b:"You get a cabinet placement plan and itemized list." },
            { t:"3) Order confidently", b:"Use your list to shop and checkout online." },
          ].map(x=>(
            <div key={x.t} className="card soft">
              <div style={{ fontFamily:'Georgia,"Times New Roman",serif', fontWeight:700, fontSize:18 }}>{x.t}</div>
              <p className="mini" style={{ marginTop: 6 }}>{x.b}</p>
            </div>
          ))}
        </div>

        <div className="grid two" style={{ marginTop: 16 }}>
          <div className="card">
            <h3 style={{ fontSize: 22 }}>Request (Free)</h3>

            <div className="row" style={{ marginTop: 10 }}>
              {["Design It For Me","I Have Measurements","I Just Want Advice"].map(p=>(
                <button
                  key={p}
                  type="button"
                  className={path===p ? "btn btn-primary" : "btn btn-outline"}
                  onClick={()=>setPath(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            <label style={{ marginTop: 14 }}>Budget comfort</label>
            <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))} />
            <div className="mini">Target: <b style={{ color:"var(--text)" }}>{usd(budget)}</b></div>

            <div className="grid two" style={{ marginTop: 10 }}>
              <div>
                <label>Name</label>
                <input value={contact.name} onChange={(e)=>setContact(c=>({ ...c, name:e.target.value }))} />
              </div>
              <div>
                <label>Phone</label>
                <input value={contact.phone} onChange={(e)=>setContact(c=>({ ...c, phone:e.target.value }))} />
              </div>
            </div>

            <label>Email</label>
            <input value={contact.email} onChange={(e)=>setContact(c=>({ ...c, email:e.target.value }))} />

            <label>Upload measurements/photos</label>
            <input type="file" multiple onChange={(e)=>setFiles(Array.from(e.target.files || []))} />
            <div className="mini" style={{ marginTop: 6 }}>
              {files.length ? `Selected: ${files.map(f=>f.name).join(", ")}` : "Add photos/sketches. Attach them after the email opens."}
            </div>

            <label>Notes</label>
            <textarea rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Layout goals, appliances, timeline…" />

            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn btn-primary" href={mailtoHref}>Request Free Design (Email)</a>
              <a className="btn btn-outline" href={`mailto:${SUPPORT_EMAIL}`}>Email</a>
            </div>
          </div>

          <div className="card soft">
            <div className="kicker">Tips</div>
            <h3 style={{ fontSize: 22, marginTop: 8 }}>What makes the best design request</h3>
            <ul className="mini" style={{ marginTop: 10, paddingLeft: 18, color:"var(--muted2)" }}>
              <li>Photos from each corner of the room</li>
              <li>Appliance sizes (range, fridge, dishwasher)</li>
              <li>Ceiling height + window/door positions</li>
              <li>Preferred style: shaker, slab, rift oak, etc.</li>
              <li>Any “must-haves”: pantry, trash pullout, island</li>
            </ul>

            <div className="divider" />
            <div className="kicker">Next</div>
            <div className="mini">
              After you get your list, go to <a className="mutedLink" href="#/shop">Shop</a> and add items by SKU.
            </div>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/shop">Shop</a>
              <a className="btn btn-outline" href="#/learn">Customer Guide</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   LEARNING (bigger)
   ============================ */
function Learning(){
  return (
    <section className="section" style={{ background:"var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Learning</div>
        <h2 style={{ fontSize: 32, marginTop: 10 }}>Customer Guide</h2>
        <p>Everything customers usually ask — in one clean place.</p>

        <div className="grid two" style={{ marginTop: 14 }}>
          {LEARNING_TOPICS.map((t) => (
            <details key={t.title} className="lux">
              <summary>
                <span>{t.title}</span>
                <span className="luxTag">{t.tag}</span>
              </summary>
              <p className="mini">{t.body}</p>
            </details>
          ))}
        </div>

        <div className="grid two" style={{ marginTop: 16 }}>
          <div className="card">
            <div className="kicker">Accessories</div>
            <h3 style={{ fontSize: 22, marginTop: 8 }}>Common add-ons</h3>
            <p className="mini">Toe kick, crown, panels, fillers — available in Configurator.</p>
            <div className="grid two" style={{ marginTop: 10 }}>
              {ACCESSORIES.slice(0,4).map(a=>(
                <div key={a.sku} className="card soft" style={{ padding: 14 }}>
                  <div style={{ fontWeight: 900 }}>{a.sku}</div>
                  <div className="mini">{a.name}</div>
                  <div className="mini" style={{ marginTop: 6 }}><b style={{ color:"var(--text)" }}>{usd(a.price)}</b></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card soft">
            <div className="kicker">Still unsure?</div>
            <h3 style={{ fontSize: 22, marginTop: 8 }}>We’ll build your list for free</h3>
            <p className="mini">Use Design Center for a free 3D layout + itemized list.</p>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/design">Request Free Design</a>
              <a className="btn btn-outline" href={`mailto:${SUPPORT_EMAIL}`}>Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   GALLERY (bigger: filter + “submit your install”)
   ============================ */
function Gallery(){
  const [tag, setTag] = useState("all");

  // simple filter placeholder
  const items = useMemo(() => {
    const withTags = GALLERY.map((src, i) => ({
      src,
      tag: i % 3 === 0 ? "modern" : i % 3 === 1 ? "classic" : "bright",
    }));
    return tag === "all" ? withTags : withTags.filter(x => x.tag === tag);
  }, [tag]);

  const submitMailto = useMemo(() => {
    const subject = encodeURIComponent("Install Photo Submission — Premier RTA Cabinetry");
    const body = encodeURIComponent("Hi Premier team,\n\nHere are install photos to add to the gallery.\nFinish used:\nCity/State:\nNotes:\n\n(Attach photos)\n");
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="row" style={{ justifyContent:"space-between", alignItems:"baseline" }}>
          <div>
            <div className="kicker">Gallery</div>
            <h2 style={{ fontSize: 32, marginTop: 10 }}>Project Inspiration</h2>
            <p>Placeholders now — replace with your installs and tag the finish used.</p>
          </div>
          <a className="btn btn-primary" href={submitMailto}>Submit your install</a>
        </div>

        <div className="card soft" style={{ marginTop: 14 }}>
          <div className="grid three">
            <div>
              <label>Filter style</label>
              <select value={tag} onChange={(e)=>setTag(e.target.value)}>
                <option value="all">All</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="bright">Bright</option>
              </select>
            </div>
            <div className="mini" style={{ alignSelf:"end" }}>
              Tip: Add “Finish used” tags later to make this feel like a real store.
            </div>
            <div style={{ alignSelf:"end" }}>
              <a className="btn btn-outline" href="#/shop">Shop finishes</a>
            </div>
          </div>
        </div>

        <div className="grid three" style={{ marginTop: 14 }}>
          {items.map((x,i)=>(
            <div key={i} className="card" style={{ padding:0, overflow:"hidden" }}>
              <img src={x.src} alt="Gallery" style={{ width:"100%", height:240, objectFit:"cover" }} />
              <div style={{ padding: 14 }}>
                <span className="pill gold" style={{ display:"inline-flex" }}>{x.tag}</span>
                <div className="mini" style={{ marginTop: 8 }}>Replace with your install + finish tag.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CONTACT (bigger: form + hours + location)
   ============================ */
function Contact(){
  const [msg, setMsg] = useState({ name:"", email:"", phone:"", body:"" });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Website Inquiry — Premier RTA Cabinetry");
    const body = encodeURIComponent(
      `Name: ${msg.name}\nEmail: ${msg.email}\nPhone: ${msg.phone}\n\nMessage:\n${msg.body}\n`
    );
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [msg]);

  return (
    <section className="section" style={{ background:"var(--bg2)" }}>
      <div className="container grid two">
        <div className="card">
          <div className="kicker">Contact</div>
          <h2 style={{ fontSize: 32, marginTop: 10 }}>Premier RTA Cabinetry</h2>
          <p className="mini">
            Email: <b style={{ color:"var(--text)" }}>{SUPPORT_EMAIL}</b><br/>
            Phone: <b style={{ color:"var(--text)" }}>{SUPPORT_PHONE}</b><br/>
            Location: <b style={{ color:"var(--text)" }}>{WAREHOUSE_LOCATION}</b>
          </p>

          <div className="divider" />
          <div className="kicker">Hours</div>
          <p className="mini" style={{ marginTop: 8 }}>
            Mon–Fri: 9am–6pm<br/>
            Sat: 10am–3pm<br/>
            Sun: Closed
          </p>

          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn btn-primary" href="#/design">Free 3D Design</a>
            <a className="btn btn-outline" href="#/shop">Shop</a>
          </div>
        </div>

        <div className="card soft">
          <div className="kicker">Message</div>
          <h3 style={{ fontSize: 22, marginTop: 8 }}>Send us a quick note</h3>

          <div className="grid two" style={{ marginTop: 10 }}>
            <div>
              <label>Name</label>
              <input value={msg.name} onChange={(e)=>setMsg(m=>({ ...m, name:e.target.value }))} />
            </div>
            <div>
              <label>Phone</label>
              <input value={msg.phone} onChange={(e)=>setMsg(m=>({ ...m, phone:e.target.value }))} />
            </div>
          </div>

          <label>Email</label>
          <input value={msg.email} onChange={(e)=>setMsg(m=>({ ...m, email:e.target.value }))} />

          <label>Message</label>
          <textarea rows={5} value={msg.body} onChange={(e)=>setMsg(m=>({ ...m, body:e.target.value }))} placeholder="Finish, SKUs, measurements, timeline…" />

          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn btn-primary" href={mailtoHref}>Send Email</a>
            <a className="btn btn-outline" href={`mailto:${SUPPORT_EMAIL}`}>Open Mail</a>
          </div>

          <div className="mini" style={{ marginTop: 10 }}>
            This opens your email client with your message prefilled.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   APP
   ============================ */
export default function App(){
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
