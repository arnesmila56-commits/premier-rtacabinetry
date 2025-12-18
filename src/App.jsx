import React, { useEffect, useMemo, useState } from "react";

/* ============================
   CONFIG
   ============================ */
const STRIPE_PAYMENT_LINK = "PASTE_STRIPE_PAYMENT_LINK_HERE";

const SUPPORT_EMAIL = "premier@premierkm.com";
const SUPPORT_PHONE = "800-PREMIER";
const SHOWROOM_ADDRESS = "3761D Victory Blvd, Staten Island, NY";

const SAMPLE_PRICE = 25; // door sample price
const SAMPLE_CREDIT_PLACEHOLDER = 25; // UI-only placeholder credit
const ASSEMBLY_UPCHARGE_PER_CABINET = 99;

const FINISH_IMAGES = {
  "hudson-snow-white":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_1-1-788x1024.jpg",
  "hudson-cloud-white":
    "https://tribecacabinetry.com/wp-content/uploads/2025/03/HD-CW-2-788x1024.jpg",
  "hudson-hearthstone":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_1-788x1024.jpg",
  "hudson-white-rift-oak":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_7-788x1024.jpg",
  "hudson-cashew":
    "https://tribecacabinetry.com/wp-content/uploads/2025/05/HD-CA-4-788x1024.jpg",

  "soho-snow-white":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_4-788x1024.jpg",
  "soho-empire-blue":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_EP-rev-788x1024.jpg",

  "southampton-snow-white":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_7-1-788x1024.jpg",
  "southampton-white-rift-oak":
    "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_6-788x1024.jpg",
  "southampton-carbon-black-oak":
    "https://tribecacabinetry.com/wp-content/uploads/2025/03/STH-CBO-2-788x1024.jpg",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1800&auto=format&fit=crop";

/* ============================
   STYLES (WHITE / RED / BLACK ONLY)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#ffffff;
        --bg2:#f6f6f7;
        --card:#ffffff;
        --card2:#fafafa;

        --text:#0f0f10;
        --muted:#2f2f34;
        --muted2:#6a6a72;

        --primary:#c0182a;
        --primary2:#9f1322;

        --border: rgba(15,15,16,.12);
        --ring: rgba(192,24,42,.18);

        --shadow: 0 16px 34px rgba(0,0,0,.10);
        --shadow2: 0 10px 22px rgba(0,0,0,.08);
      }

      html,body{
        margin:0;
        background:
          radial-gradient(900px 520px at 85% 10%, rgba(192,24,42,.06), transparent 60%),
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
      @media(max-width:900px){ .two,.three{ grid-template-columns:1fr; } }

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

      .floatingHelp{
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 60;
      }
      .floatingPanel{
        width: 340px;
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

      .footer{
        border-top:1px solid var(--border);
        padding:22px 0;
        background: rgba(255,255,255,.75);
      }
    `}</style>
  );
}

/* ============================
   HELPERS
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const uid = () => Math.random().toString(36).slice(2, 10);

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
   DATA
   ============================ */
const FINISH_GROUPS = [
  {
    group: "Hudson",
    finishes: [
      { id: "hudson-snow-white", name: "Hudson Snow White" },
      { id: "hudson-cloud-white", name: "Hudson Cloud White" },
      { id: "hudson-hearthstone", name: "Hudson Hearthstone" },
      { id: "hudson-white-rift-oak", name: "Hudson White Rift Oak" },
      { id: "hudson-cashew", name: "Hudson Cashew" },
    ],
  },
  {
    group: "Soho",
    finishes: [
      { id: "soho-snow-white", name: "Soho Snow White" },
      { id: "soho-empire-blue", name: "Soho Empire Blue" },
    ],
  },
  {
    group: "Southampton",
    finishes: [
      { id: "southampton-snow-white", name: "Southampton Snow White" },
      { id: "southampton-white-rift-oak", name: "Southampton White Rift Oak" },
      { id: "southampton-carbon-black-oak", name: "Southampton Carbon Black Oak" },
    ],
  },
];

function getFinishById(id) {
  for (const g of FINISH_GROUPS) for (const f of g.finishes) if (f.id === id) return f;
  return FINISH_GROUPS[0].finishes[0];
}

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

const ACCESSORIES = [
  { sku: "TK96", name: "Toe Kick (96\")", price: 89 },
  { sku: "F3", name: "Filler (3\")", price: 35 },
  { sku: "F6", name: "Filler (6\")", price: 49 },
  { sku: "F9", name: "Filler (9\")", price: 69 },
  { sku: "PANEL24", name: "Side Panel (24\")", price: 120 },
  { sku: "PANEL96", name: "Tall Panel (96\")", price: 195 },
  { sku: "CROWN96", name: "Crown Molding (96\")", price: 95 },
  { sku: "LR96", name: "Light Rail (96\")", price: 85 },
];

const CASE_STUDIES = [
  {
    title: "Bright classic kitchen",
    location: "Staten Island, NY",
    finishId: "hudson-snow-white",
    cabinetCount: 18,
    range: "$9k–$14k (example)",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Warm oak + white quartz",
    location: "New Jersey",
    finishId: "southampton-white-rift-oak",
    cabinetCount: 20,
    range: "$11k–$16k (example)",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Bold pantry wall",
    location: "Pennsylvania",
    finishId: "southampton-carbon-black-oak",
    cabinetCount: 16,
    range: "$10k–$15k (example)",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
  },
];

const REVIEWS = [
  { name: "M. R.", text: "Cabinet list was spot on. Finish looked even better in person.", meta: "Homeowner • NY" },
  { name: "S. D.", text: "Smooth delivery and easy ordering. Great support when I had questions.", meta: "Contractor • NJ" },
  { name: "K. L.", text: "Design help saved us time. Shopping by SKU was way easier than showrooms.", meta: "Homeowner • PA" },
];

/* ============================
   CART TOTALS
   ============================ */
function computeCartTotals(cart) {
  let cabinetsSubtotal = 0;
  let accessoriesSubtotal = 0;
  let samplesSubtotal = 0;
  let assemblySubtotal = 0;

  for (const it of cart) {
    const lineBase = (it.unitPrice || 0) * (it.qty || 0);
    const lineAssembly = (it.assemblyFeeEach || 0) * (it.qty || 0);

    if (it.cabinetType === "accessory") accessoriesSubtotal += lineBase;
    else if (it.cabinetType === "sample") samplesSubtotal += lineBase;
    else cabinetsSubtotal += lineBase;

    assemblySubtotal += lineAssembly;
  }

  const subtotal = cabinetsSubtotal + accessoriesSubtotal + samplesSubtotal + assemblySubtotal;
  return { cabinetsSubtotal, accessoriesSubtotal, samplesSubtotal, assemblySubtotal, subtotal };
}

/* ============================
   UI COMPONENTS
   ============================ */
function AnnouncementBar() {
  return (
    <div className="announce">
      <div className="container">
        <div>Showroom • {SHOWROOM_ADDRESS} • Now shipping RTA nationwide</div>
        <div>
          <a href="#/design">Free 3D Design</a>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 8, lineHeight: 1 }}>
      <span style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 900, fontSize: 20 }}>
        Premier
      </span>
      <span style={{ fontWeight: 950, fontSize: 14, color: "var(--primary)", letterSpacing: ".20em" }}>
        RTA
      </span>
      <span style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 800, fontSize: 16, opacity: 0.95 }}>
        Cabinetry
      </span>
    </div>
  );
}

function ProjectSwitcher({ projects, currentProjectId, onSwitch, onCreate }) {
  const current = projects.find((p) => p.id === currentProjectId) || projects[0];
  return (
    <div className="row" style={{ gap: 8 }}>
      <select
        value={current?.id || ""}
        onChange={(e) => onSwitch(e.target.value)}
        style={{ width: 240, maxWidth: "70vw" }}
        aria-label="Project"
      >
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <button className="btn btn-outline" type="button" onClick={onCreate}>
        New Project
      </button>
    </div>
  );
}

function Header({ cartCount, projects, currentProjectId, onSwitchProject, onCreateProject }) {
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
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", flexWrap: "wrap" }}
      >
        <a href="#/home">
          <Logo />
        </a>

        <nav style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <ProjectSwitcher
            projects={projects}
            currentProjectId={currentProjectId}
            onSwitch={onSwitchProject}
            onCreate={onCreateProject}
          />
          <a className="btn btn-outline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          <a className="btn btn-primary" href="#/cart">
            Checkout
          </a>
        </div>
      </div>
    </header>
  );
}

function Toast({ text }) {
  if (!text) return null;
  return <div className="toast">{text}</div>;
}

function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Quick Question — Premier RTA Cabinetry")}&body=${encodeURIComponent(
    `Hi Premier team,\n\nI have a question about:\n- Finish:\n- Cabinets/SKUs:\n- Measurements:\n\nThanks!\n\nShowroom: ${SHOWROOM_ADDRESS}\n`
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
            Visit the showroom or email measurements/photos — we’ll guide your cabinet list.
          </p>
          <div className="row" style={{ marginTop: 10 }}>
            <a className="btn btn-primary" href={mailto}>
              Email
            </a>
            <a className="btn btn-outline" href="#/design">
              Free Design
            </a>
          </div>
          <div className="row" style={{ marginTop: 8 }}>
            <a className="btn btn-ghost" href="#/shop">
              Shop
            </a>
            <a className="btn btn-ghost" href="#/contact">
              Contact
            </a>
          </div>
        </div>
      )}

      <button className="btn btn-primary" type="button" onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : "Need help?"}
      </button>
    </div>
  );
}

/* ============================
   PAGES
   ============================ */
function Home() {
  const [reviewIdx, setReviewIdx] = useState(0);
  const review = REVIEWS[reviewIdx % REVIEWS.length];

  return (
    <section className="section">
      <div className="container">
        <div className="heroGrid">
          <div className="card">
            <div className="kicker">Showroom & Warehouse</div>
            <h1 style={{ fontSize: 44, marginTop: 8 }}>From Staten Island to nationwide RTA shipping.</h1>
            <p style={{ color: "rgba(15,15,16,.78)" }}>
              We’ve served customers for years from our Staten Island showroom/warehouse at{" "}
              <b>{SHOWROOM_ADDRESS}</b>. Now we’re bringing that same experience online — curated finishes, SKU-based
              ordering, and designer-led help when you need it.
            </p>

            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn btn-primary" href="#/shop">
                Shop Finishes
              </a>
              <a className="btn btn-outline" href="#/design">
                Free 3D Design
              </a>
              <a className="btn btn-ghost" href="#/contact">
                Visit / Contact
              </a>
            </div>

            <div className="row" style={{ marginTop: 14 }}>
              <span className="pill">Nationwide Freight</span>
              <span className="pill">Local Pickup</span>
              <span className="pill red">Red • White • Black</span>
            </div>

            <div className="divider" />
            <div className="mini">
              <b style={{ color: "var(--text)" }}>Customer review:</b> “{review.text}” — {review.name} • {review.meta}
              <div className="row" style={{ marginTop: 10 }}>
                <button className="btn btn-outline" type="button" onClick={() => setReviewIdx((i) => Math.max(0, i - 1))}>
                  Prev
                </button>
                <button className="btn btn-primary" type="button" onClick={() => setReviewIdx((i) => i + 1)}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="heroImage">
            <img src="https://premierkm.com/wp-content/uploads/2021/09/DSC_3484.jpg" alt="Kitchen" />
          </div>
        </div>

        <div className="grid three" style={{ marginTop: 16 }}>
          <div className="card soft">
            <div className="kicker">Door samples</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Order a sample</h3>
            <p className="mini">Try a sample before committing. Order from Shop.</p>
            <a className="btn btn-primary" href="#/shop">
              Shop + Samples
            </a>
          </div>
          <div className="card soft">
            <div className="kicker">Shipping</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Freight done right</h3>
            <p className="mini">Residential/commercial, liftgate, appointment — set options at checkout.</p>
            <a className="btn btn-outline" href="#/cart">
              Checkout tools
            </a>
          </div>
          <div className="card soft">
            <div className="kicker">Design help</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>We’ll build your list</h3>
            <p className="mini">Send measurements/photos. We return a 3D plan + itemized SKUs.</p>
            <a className="btn btn-primary" href="#/design">
              Design Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopList({ onAddSample }) {
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("az");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return FINISH_GROUPS.filter((g) => (group === "all" ? true : g.group.toLowerCase() === group))
      .map((g) => ({
        group: g.group,
        finishes: g.finishes
          .filter((f) => (!query ? true : f.name.toLowerCase().includes(query) || f.id.toLowerCase().includes(query)))
          .slice()
          .sort((a, b) => (sort === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))),
      }))
      .filter((g) => g.finishes.length > 0);
  }, [group, q, sort]);

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Shop</div>
        <h2 style={{ fontSize: 32, marginTop: 10 }}>Finishes + Door Samples</h2>
        <p>Search finishes, configure cabinets by SKU, and order door samples.</p>

        <div className="card soft" style={{ marginTop: 14 }}>
          <div className="grid three">
            <div>
              <label>Search</label>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Snow White, Rift Oak, Hudson…" />
            </div>
            <div>
              <label>Collection</label>
              <select value={group} onChange={(e) => setGroup(e.target.value)}>
                <option value="all">All</option>
                {FINISH_GROUPS.map((g) => (
                  <option key={g.group} value={g.group.toLowerCase()}>
                    {g.group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Sort</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="az">Name (A–Z)</option>
                <option value="za">Name (Z–A)</option>
              </select>
            </div>
          </div>

          <div className="mini" style={{ marginTop: 10 }}>
            Door sample price: <b style={{ color: "var(--text)" }}>{usd(SAMPLE_PRICE)}</b> • Showroom:{" "}
            <b style={{ color: "var(--text)" }}>{SHOWROOM_ADDRESS}</b>
          </div>
        </div>

        {results.map((g) => (
          <div key={g.group} style={{ marginTop: 22 }}>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 style={{ margin: 0 }}>{g.group}</h3>
              <span className="pill">Tribeca</span>
            </div>

            <div className="grid three" style={{ marginTop: 12 }}>
              {g.finishes.map((f) => (
                <div key={f.id} className="card">
                  <div className="finish-img">
                    <img src={imgForFinish(f.id)} alt={f.name} />
                  </div>
                  <div className="row" style={{ justifyContent: "space-between", marginTop: 10 }}>
                    <div style={{ fontWeight: 900 }}>{f.name}</div>
                    <span className="pill red">Finish</span>
                  </div>

                  <p className="mini">Configure cabinets by SKU or order a door sample.</p>

                  <div className="row" style={{ marginTop: 10 }}>
                    <a className="btn btn-primary" href={`#/shop/${f.id}`}>
                      Configure
                    </a>
                    <button className="btn btn-outline" type="button" onClick={() => onAddSample(f.id, f.name)}>
                      Order sample
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Configurator({ finishId, cart, onAddToCart, onExportCartCSV, onToast, onAddSample }) {
  const finish = getFinishById(finishId);

  const [assembly, setAssembly] = useState("rta");
  const [cabType, setCabType] = useState("base");
  const [skuSearch, setSkuSearch] = useState("");
  const [selectedSku, setSelectedSku] = useState(CABINET_CATALOG.base.items[0].sku);

  const [depth, setDepth] = useState(CABINET_CATALOG.base.depthOptions[0]);
  const [height, setHeight] = useState(CABINET_CATALOG.base.heightOptions[0]);
  const [qty, setQty] = useState(1);

  const [accSku, setAccSku] = useState(ACCESSORIES[0].sku);
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

  const chosen = filteredItems.find((x) => x.sku === selectedSku) || catalogItems[0];

  const assemblyFeeEach = assembly === "assembled" ? ASSEMBLY_UPCHARGE_PER_CABINET : 0;
  const unitTotal = (chosen?.price ?? 0) + assemblyFeeEach;
  const lineTotal = unitTotal * qty;

  const totals = useMemo(() => computeCartTotals(cart), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);

  const dimsLabel = `${chosen?.width ?? "-"}" W × ${height}" H × ${depth}" D`;
  const accItem = ACCESSORIES.find((a) => a.sku === accSku) || ACCESSORIES[0];

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container grid two" style={{ alignItems: "start" }}>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <img src={imgForFinish(finish.id)} alt={finish.name} style={{ width: "100%", height: 420, objectFit: "cover" }} />
          <div style={{ padding: 18 }}>
            <div className="kicker">Tribeca Finish</div>
            <h2 style={{ fontSize: 28, marginTop: 10 }}>{finish.name}</h2>
            <p className="mini">Add cabinets by SKU — plus accessories. Order a sample if you want to see the finish in your space.</p>

            <div className="row" style={{ marginTop: 10 }}>
              <button className="btn btn-outline" type="button" onClick={() => onAddSample(finish.id, finish.name)}>
                Order sample ({usd(SAMPLE_PRICE)})
              </button>
              <a className="btn btn-ghost" href="#/design">
                Design Center
              </a>
            </div>

            <div className="divider" />
            <div className="row">
              <span className="pill red">Lead time: 2–5 weeks (typical)</span>
              <span className="pill">Freight quoted after order</span>
              <span className="pill">Showroom: {SHOWROOM_ADDRESS}</span>
            </div>
          </div>
        </div>

        <div className="stickySide" style={{ display: "grid", gap: 16 }}>
          <div className="card soft">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div style={{ fontWeight: 900 }}>Mini Cart</div>
              <span className="pill">{cartCount} items</span>
            </div>

            <div className="mini" style={{ marginTop: 8 }}>
              Cabinets: <b style={{ color: "var(--text)" }}>{usd(totals.cabinetsSubtotal)}</b>
              <br />
              Accessories: <b style={{ color: "var(--text)" }}>{usd(totals.accessoriesSubtotal)}</b>
              <br />
              Samples: <b style={{ color: "var(--text)" }}>{usd(totals.samplesSubtotal)}</b>
              <br />
              Assembly: <b style={{ color: "var(--text)" }}>{usd(totals.assemblySubtotal)}</b>
              <div className="divider" />
              Subtotal: <b style={{ color: "var(--text)" }}>{usd(totals.subtotal)}</b>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/cart">
                Go to cart
              </a>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => {
                  onExportCartCSV();
                  onToast("CSV exported");
                }}
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
                    <option key={h} value={h}>
                      {h}"
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Depth</label>
                <select value={depth} onChange={(e) => setDepth(parseFloat(e.target.value))}>
                  {CABINET_CATALOG[cabType].depthOptions.map((d) => (
                    <option key={d} value={d}>
                      {d}"
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label>Quantity</label>
            <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1")))} />

            <div className="card soft" style={{ marginTop: 14 }}>
              <div className="mini" style={{ display: "grid", gap: 6 }}>
                <div>
                  <b style={{ color: "var(--text)" }}>Size:</b> {dimsLabel}
                </div>
                <div>
                  <b style={{ color: "var(--text)" }}>Line Total:</b> {usd(lineTotal)}
                </div>
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
              <a className="btn btn-outline" href="#/shop">
                Back
              </a>
            </div>

            <div className="divider" />
            <h3 style={{ fontSize: 18, margin: "0 0 6px" }}>Accessories</h3>

            <label>Accessory</label>
            <select value={accSku} onChange={(e) => setAccSku(e.target.value)}>
              {ACCESSORIES.map((a) => (
                <option key={a.sku} value={a.sku}>
                  {a.sku} — {a.name} — {usd(a.price)}
                </option>
              ))}
            </select>

            <label>Qty</label>
            <input type="number" min={1} value={accQty} onChange={(e) => setAccQty(Math.max(1, parseInt(e.target.value || "1")))} />

            <div className="row" style={{ marginTop: 12 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cart({
  cart,
  onRemove,
  onClear,
  onExportCSV,
  onShareLink,
  onToast,
  projectName,
  measurementSummaryText,
}) {
  const totals = useMemo(() => computeCartTotals(cart), [cart]);

  const checkoutOk = STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== "PASTE_STRIPE_PAYMENT_LINK_HERE";
  const [freightOk, setFreightOk] = useState(false);

  const [shipType, setShipType] = useState("residential");
  const [liftgate, setLiftgate] = useState(true);
  const [appointment, setAppointment] = useState(true);
  const [zip, setZip] = useState("");

  const [applySampleCredit, setApplySampleCredit] = useState(true);
  const [notes, setNotes] = useState("");

  const estimatedFreight = useMemo(() => {
    const baseLow = shipType === "commercial" ? 350 : 450;
    const baseHigh = shipType === "commercial" ? 650 : 850;
    const addLift = liftgate ? 75 : 0;
    const addAppt = appointment ? 50 : 0;
    const tighten = zip.trim().length >= 5 ? 0.9 : 1;
    const low = Math.round((baseLow + addLift + addAppt) * tighten);
    const high = Math.round((baseHigh + addLift + addAppt) * (zip.trim().length >= 5 ? 0.95 : 1.15));
    return { low, high };
  }, [shipType, liftgate, appointment, zip]);

  const sampleCredit = applySampleCredit ? Math.min(SAMPLE_CREDIT_PLACEHOLDER, totals.samplesSubtotal) : 0;
  const totalAfterCredit = Math.max(0, totals.subtotal - sampleCredit);

  const canPay = checkoutOk && cart.length > 0 && freightOk;

  const emailQuoteHref = useMemo(() => {
    const subject = encodeURIComponent(`Cart / Quote Review — ${projectName || "Premier Project"}`);
    const lines = cart.map((it) => {
      const size = `${it.width ?? "-"}W x ${it.height ?? "-"}H x ${it.depth ?? "-"}D`;
      const assembly = it.assembly === "assembled" ? `Assembled (+${it.assemblyFeeEach || 0}/ea)` : "RTA";
      return `- ${it.finishName} | ${it.cabinetTypeLabel} | ${it.sku} | ${size} | Qty ${it.qty} | ${assembly}`;
    });

    const shipLine =
      `Shipping options:\n- Type: ${shipType}\n- Liftgate: ${liftgate ? "Yes" : "No"}\n- Appointment: ${appointment ? "Yes" : "No"}\n- Zip: ${zip || "-"}\n`;

    const body = encodeURIComponent(
      `Hi Premier team,\n\nPlease review my cart / quote:\n\n${lines.join("\n")}\n\n` +
        `Itemized totals:\n- Cabinets: ${usd(totals.cabinetsSubtotal)}\n- Accessories: ${usd(
          totals.accessoriesSubtotal
        )}\n- Samples: ${usd(totals.samplesSubtotal)}\n- Assembly: ${usd(totals.assemblySubtotal)}\nSubtotal: ${usd(
          totals.subtotal
        )}\n` +
        `Sample credit applied (placeholder): ${usd(sampleCredit)}\nTotal after credit: ${usd(totalAfterCredit)}\n\n` +
        `${shipLine}\nCustomer notes:\n${notes || "(none)"}\n\n` +
        `Showroom: ${SHOWROOM_ADDRESS}\n`
    );
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [cart, notes, totals, shipType, liftgate, appointment, zip, sampleCredit, totalAfterCredit, projectName]);

  const exportProjectPacket = () => {
    onExportCSV();

    const measurementText =
      measurementSummaryText?.trim?.() ? measurementSummaryText.trim() : "No measurement summary saved for this project yet.";

    const deliveryChecklist =
`Premier RTA Cabinetry — Delivery Checklist

Before delivery:
- Confirm delivery address + phone number
- Choose Residential vs Commercial
- Liftgate needed? (Yes/No)
- Appointment needed? (Yes/No)
- Clear pathway for boxes

On delivery day:
- Inspect packaging BEFORE signing
- Take photos of any visible damage
- Note issues on the delivery receipt
- Count boxes/pallets

After delivery:
- Open boxes carefully
- Save labels + paperwork
- Report issues quickly with photos to: ${SUPPORT_EMAIL}

Showroom/Warehouse:
${SHOWROOM_ADDRESS}
`;
    downloadTextFile(`${projectName || "project"}-measurements.txt`, measurementText + "\n");
    downloadTextFile(`${projectName || "project"}-delivery-checklist.txt`, deliveryChecklist);
    onToast("Project Packet exported");
  };

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Cart</div>
        <h2 style={{ fontSize: 32, marginTop: 10 }}>Checkout</h2>

        {cart.length === 0 ? (
          <div className="card">
            <p>Your cart is empty.</p>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/shop">
                Shop finishes
              </a>
              <a className="btn btn-outline" href="#/design">
                Free 3D Design
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="card soft" style={{ marginTop: 14 }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="pill red">Freight shipping is quoted after order</span>
                <span className="pill">Lead time: 2–5 weeks (typical)</span>
              </div>

              <div className="grid two" style={{ marginTop: 12 }}>
                <div>
                  <div className="kicker">Shipping options</div>
                  <div className="grid two" style={{ marginTop: 10 }}>
                    <div>
                      <label>Type</label>
                      <select value={shipType} onChange={(e) => setShipType(e.target.value)}>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label>ZIP</label>
                      <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="e.g. 10314" />
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: 10 }}>
                    <input type="checkbox" checked={liftgate} onChange={(e) => setLiftgate(e.target.checked)} style={{ width: 18, height: 18 }} />
                    <label style={{ margin: 0, fontSize: 13, letterSpacing: 0, textTransform: "none", color: "var(--muted)" }}>
                      Liftgate
                    </label>

                    <input type="checkbox" checked={appointment} onChange={(e) => setAppointment(e.target.checked)} style={{ width: 18, height: 18 }} />
                    <label style={{ margin: 0, fontSize: 13, letterSpacing: 0, textTransform: "none", color: "var(--muted)" }}>
                      Appointment
                    </label>
                  </div>

                  <div className="mini" style={{ marginTop: 10 }}>
                    Estimated freight range: <b style={{ color: "var(--text)" }}>{usd(estimatedFreight.low)} – {usd(estimatedFreight.high)}</b> (ballpark)
                  </div>

                  <div className="row" style={{ marginTop: 10 }}>
                    <input id="freight-ok" type="checkbox" checked={freightOk} onChange={(e) => setFreightOk(e.target.checked)} style={{ width: 18, height: 18 }} />
                    <label htmlFor="freight-ok" style={{ margin: 0, textTransform: "none", letterSpacing: 0, fontSize: 13, color: "var(--muted)" }}>
                      I understand freight will be quoted separately.
                    </label>
                  </div>
                </div>

                <div>
                  <div className="kicker">Itemized totals</div>
                  <div className="mini" style={{ marginTop: 10 }}>
                    Cabinets: <b style={{ color: "var(--text)" }}>{usd(totals.cabinetsSubtotal)}</b>
                    <br />
                    Accessories: <b style={{ color: "var(--text)" }}>{usd(totals.accessoriesSubtotal)}</b>
                    <br />
                    Samples: <b style={{ color: "var(--text)" }}>{usd(totals.samplesSubtotal)}</b>
                    <br />
                    Assembly: <b style={{ color: "var(--text)" }}>{usd(totals.assemblySubtotal)}</b>
                    <div className="divider" />
                    Subtotal: <b style={{ color: "var(--text)" }}>{usd(totals.subtotal)}</b>
                  </div>

                  <div className="row" style={{ marginTop: 10 }}>
                    <input type="checkbox" checked={applySampleCredit} onChange={(e) => setApplySampleCredit(e.target.checked)} style={{ width: 18, height: 18 }} />
                    <label style={{ margin: 0, fontSize: 13, letterSpacing: 0, textTransform: "none", color: "var(--muted)" }}>
                      Apply sample credit (placeholder): {usd(sampleCredit)}
                    </label>
                  </div>

                  <div className="mini" style={{ marginTop: 10 }}>
                    Total after credit: <b style={{ color: "var(--text)" }}>{usd(totalAfterCredit)}</b>
                  </div>
                </div>
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
                          <button className="btn btn-outline" type="button" onClick={() => onRemove(it.key)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid two" style={{ marginTop: 16 }}>
              <div className="card soft">
                <div className="kicker">Order notes</div>
                <h3 style={{ fontSize: 20, marginTop: 8 }}>Add notes</h3>
                <textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Apartment delivery? Stairs? Timeline? Any special instructions…" />
                <div className="row" style={{ marginTop: 12 }}>
                  <a className="btn btn-primary" href={emailQuoteHref} onClick={() => onToast("Email draft opened")}>
                    Email quote
                  </a>
                  <button className="btn btn-outline" type="button" onClick={() => { onExportCSV(); onToast("CSV exported"); }}>
                    Export CSV
                  </button>
                </div>
                <div className="mini" style={{ marginTop: 10 }}>
                  Showroom: <b style={{ color: "var(--text)" }}>{SHOWROOM_ADDRESS}</b>
                </div>
              </div>

              <div className="card">
                <div className="kicker">Tools</div>
                <h3 style={{ fontSize: 20, marginTop: 8 }}>Save & export</h3>
                <div className="row" style={{ marginTop: 12 }}>
                  <button className="btn btn-outline" type="button" onClick={onClear}>
                    Clear cart
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={async () => { await onShareLink(); onToast("Share link copied"); }}>
                    Share cart
                  </button>
                </div>

                <div className="row" style={{ marginTop: 12 }}>
                  <button className="btn btn-outline" type="button" onClick={exportProjectPacket}>
                    Export Project Packet
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
                    style={{ opacity: canPay ? 1 : 0.55, pointerEvents: canPay ? "auto" : "none", width: "100%" }}
                  >
                    Pay (Apple Pay / Card)
                  </a>
                ) : (
                  <a className="btn btn-primary" href={`mailto:${SUPPORT_EMAIL}`} style={{ width: "100%" }}>
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

function DesignCenter({ onSaveMeasurementSummary, savedMeasurementSummary }) {
  const [path, setPath] = useState("Design It For Me");
  const [budget, setBudget] = useState(25000);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [files, setFiles] = useState([]);

  const [wiz, setWiz] = useState({
    ceiling: "",
    wallA: "",
    wallB: "",
    windowsDoors: "",
    appliances: "",
    mnotes: "",
  });

  const measurementSummaryText = useMemo(() => {
    return (
`Premier RTA Cabinetry — Measurement Summary

Showroom/Warehouse:
${SHOWROOM_ADDRESS}

Ceiling height: ${wiz.ceiling || "-"}
Wall A length: ${wiz.wallA || "-"}
Wall B length: ${wiz.wallB || "-"}
Windows/doors: ${wiz.windowsDoors || "-"}
Appliances: ${wiz.appliances || "-"}
Notes: ${wiz.mnotes || "-"}

(Attach photos/sketches when emailing.)
`
    );
  }, [wiz]);

  // small “cool” add: quick range calc
  const [linFeet, setLinFeet] = useState(20);
  const [uppers, setUppers] = useState(6);
  const [pantry, setPantry] = useState(false);
  const [calcAssembly, setCalcAssembly] = useState(false);

  const estRange = useMemo(() => {
    const base = linFeet * 450 + uppers * 300 + (pantry ? 800 : 0);
    const assembly = calcAssembly ? (Math.round((linFeet * 2 + uppers + (pantry ? 1 : 0))) * ASSEMBLY_UPCHARGE_PER_CABINET) : 0;
    const total = base + assembly;
    return { low: Math.round(total * 0.8), high: Math.round(total * 1.2) };
  }, [linFeet, uppers, pantry, calcAssembly]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Free 3D Design Request — Premier RTA Cabinetry");
    const bodyLines = [
      `Showroom/Warehouse: ${SHOWROOM_ADDRESS}`,
      `Path: ${path}`,
      `Budget: ${usd(budget)}`,
      ``,
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      `Phone: ${contact.phone}`,
      ``,
      `Measurement summary:`,
      measurementSummaryText,
      ``,
      `Project notes:`,
      notes || "(none)",
      ``,
      `Uploads (attach these to this email):`,
      files.length ? files.map((f) => `- ${f.name}`).join("\n") : "- (none)",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [path, budget, contact, notes, files, measurementSummaryText]);

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Design Center</div>
        <h2 style={{ fontSize: 34, marginTop: 10 }}>One form: measurements + free 3D design request</h2>
        <p>
          Fill this out once. We’ll use your measurements and photos to create a 3D layout + an itemized SKU list.
        </p>

        <div className="grid two" style={{ marginTop: 16 }}>
          <div className="card">
            <div className="kicker">Free 3D Design Request</div>

            <div className="row" style={{ marginTop: 10 }}>
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

            <label style={{ marginTop: 14 }}>Budget comfort</label>
            <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e) => setBudget(parseInt(e.target.value || "25000"))} />
            <div className="mini">
              Target: <b style={{ color: "var(--text)" }}>{usd(budget)}</b>
            </div>

            <div className="grid two" style={{ marginTop: 10 }}>
              <div>
                <label>Name</label>
                <input value={contact.name} onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))} />
              </div>
              <div>
                <label>Phone</label>
                <input value={contact.phone} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} />
              </div>
            </div>

            <label>Email</label>
            <input value={contact.email} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} />

            <div className="divider" />

            <div className="kicker">Measurements</div>
            <div className="grid two" style={{ marginTop: 10 }}>
              <div>
                <label>Ceiling height</label>
                <input value={wiz.ceiling} onChange={(e) => setWiz((w) => ({ ...w, ceiling: e.target.value }))} placeholder='e.g. 96"' />
              </div>
              <div>
                <label>Wall A length</label>
                <input value={wiz.wallA} onChange={(e) => setWiz((w) => ({ ...w, wallA: e.target.value }))} placeholder='e.g. 144"' />
              </div>
              <div>
                <label>Wall B length</label>
                <input value={wiz.wallB} onChange={(e) => setWiz((w) => ({ ...w, wallB: e.target.value }))} placeholder='e.g. 120"' />
              </div>
              <div>
                <label>Windows/doors</label>
                <input value={wiz.windowsDoors} onChange={(e) => setWiz((w) => ({ ...w, windowsDoors: e.target.value }))} placeholder="sizes + locations" />
              </div>
            </div>

            <label>Appliances</label>
            <input value={wiz.appliances} onChange={(e) => setWiz((w) => ({ ...w, appliances: e.target.value }))} placeholder="range/fridge/dishwasher sizes" />

            <label>Measurement notes</label>
            <textarea rows={3} value={wiz.mnotes} onChange={(e) => setWiz((w) => ({ ...w, mnotes: e.target.value }))} placeholder="pantry? island? timeline?" />

            <label>Upload photos/sketches</label>
            <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
            <div className="mini" style={{ marginTop: 6 }}>
              {files.length ? `Selected: ${files.map((f) => f.name).join(", ")}` : "Attach photos/sketches after the email opens."}
            </div>

            <label>Project notes</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Layout goals, appliances, timeline…" />

            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn btn-primary" href={mailtoHref}>
                Send Request (Email)
              </a>
              <button className="btn btn-outline" type="button" onClick={() => onSaveMeasurementSummary(measurementSummaryText)}>
                Save measurements to project
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => downloadTextFile("measurements.txt", measurementSummaryText)}>
                Download
              </button>
            </div>

            {savedMeasurementSummary?.trim?.() && (
              <div className="mini" style={{ marginTop: 10 }}>
                <b style={{ color: "var(--text)" }}>Saved to this project.</b>
              </div>
            )}
          </div>

          <div className="card soft">
            <div className="kicker">Quick tools</div>
            <h3 style={{ fontSize: 22, marginTop: 8 }}>Ballpark range (not a quote)</h3>

            <label>Base run (linear feet)</label>
            <input type="number" min={1} value={linFeet} onChange={(e) => setLinFeet(Math.max(1, parseInt(e.target.value || "1")))} />

            <label># of upper cabinets</label>
            <input type="number" min={0} value={uppers} onChange={(e) => setUppers(Math.max(0, parseInt(e.target.value || "0")))} />

            <div className="row" style={{ marginTop: 10 }}>
              <input type="checkbox" checked={pantry} onChange={(e) => setPantry(e.target.checked)} style={{ width: 18, height: 18 }} />
              <label style={{ margin: 0, fontSize: 13, letterSpacing: 0, textTransform: "none", color: "var(--muted)" }}>
                Include pantry/tall cabinet
              </label>
            </div>

            <div className="row" style={{ marginTop: 10 }}>
              <input type="checkbox" checked={calcAssembly} onChange={(e) => setCalcAssembly(e.target.checked)} style={{ width: 18, height: 18 }} />
              <label style={{ margin: 0, fontSize: 13, letterSpacing: 0, textTransform: "none", color: "var(--muted)" }}>
                Include assembled
              </label>
            </div>

            <div className="divider" />
            <div style={{ fontSize: 18, fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 700 }}>
              Estimated range: {usd(estRange.low)} – {usd(estRange.high)}
            </div>
            <div className="mini" style={{ marginTop: 10 }}>
              Freight/tax not included. Lead time typically 2–5 weeks.
            </div>

            <div className="divider" />
            <div className="kicker">Showroom</div>
            <div className="mini" style={{ marginTop: 8 }}>
              <b style={{ color: "var(--text)" }}>{SHOWROOM_ADDRESS}</b>
              <br />
              Phone: <b style={{ color: "var(--text)" }}>{SUPPORT_PHONE}</b>
              <br />
              Email: <b style={{ color: "var(--text)" }}>{SUPPORT_EMAIL}</b>
            </div>

            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/shop">
                Shop
              </a>
              <a className="btn btn-outline" href="#/cart">
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning() {
  const measurementSteps = [
    "Measure wall lengths (in inches)",
    "Measure ceiling height",
    "Mark windows/doors (width + height + distance from corners)",
    "List appliances (range, fridge, dishwasher sizes)",
    "Take photos from each corner",
  ];

  const emailTemplateHref = useMemo(() => {
    const subject = encodeURIComponent("Measurements — Premier RTA Cabinetry");
    const body = encodeURIComponent(
      `Hi Premier team,\n\nHere are my measurements:\n- Ceiling height:\n- Wall A length:\n- Wall B length:\n- Windows/doors:\n- Appliances:\n- Notes:\n\n(Attached photos/sketches)\n\nShowroom: ${SHOWROOM_ADDRESS}\n`
    );
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, []);

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Learning</div>
        <h2 style={{ fontSize: 34, marginTop: 10 }}>How we work</h2>
        <p>
          We’ve served customers for years from our Staten Island showroom/warehouse at <b>{SHOWROOM_ADDRESS}</b>. Now we ship
          RTA nationwide — with the same planning support and clean ordering experience.
        </p>

        <div className="grid three" style={{ marginTop: 14 }}>
          <div className="card">
            <div className="kicker">1) Choose your path</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Shop or request a plan</h3>
            <p className="mini">Shop finishes and add cabinets by SKU — or request a free 3D layout + list first.</p>
          </div>
          <div className="card">
            <div className="kicker">2) We support the order</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Experience-led support</h3>
            <p className="mini">We help confirm cabinets, order flow, and delivery expectations so installs go smooth.</p>
          </div>
          <div className="card">
            <div className="kicker">3) Delivery expectations</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Freight + lead time</h3>
            <p className="mini">Lead time is typically 2–5 weeks. Freight is confirmed after order based on delivery options.</p>
          </div>
        </div>

        <div className="grid two" style={{ marginTop: 16 }}>
          <div className="card soft">
            <div className="kicker">How to send measurements</div>
            <h3 style={{ fontSize: 22, marginTop: 8 }}>Send these 5 items</h3>
            <ul className="mini" style={{ marginTop: 10, paddingLeft: 18 }}>
              {measurementSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/design">
                Use Design Center form
              </a>
              <a className="btn btn-outline" href={emailTemplateHref}>
                Email template
              </a>
            </div>
          </div>

          <div className="card">
            <div className="kicker">Visit us</div>
            <h3 style={{ fontSize: 22, marginTop: 8 }}>Showroom & warehouse</h3>
            <p className="mini">
              <b style={{ color: "var(--text)" }}>{SHOWROOM_ADDRESS}</b>
              <br />
              Phone: <b style={{ color: "var(--text)" }}>{SUPPORT_PHONE}</b>
              <br />
              Email: <b style={{ color: "var(--text)" }}>{SUPPORT_EMAIL}</b>
            </p>
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href="#/shop">
                Shop
              </a>
              <a className="btn btn-outline" href="#/contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const finishesFlat = useMemo(() => FINISH_GROUPS.flatMap((g) => g.finishes), []);
  const [filterFinish, setFilterFinish] = useState("all");

  const studies = useMemo(() => {
    if (filterFinish === "all") return CASE_STUDIES;
    return CASE_STUDIES.filter((s) => s.finishId === filterFinish);
  }, [filterFinish]);

  const submitMailto = useMemo(() => {
    const subject = encodeURIComponent("Install Photo Submission — Premier RTA Cabinetry");
    const body = encodeURIComponent(
      `Hi Premier team,\n\nHere are install photos to add to the gallery.\nFinish used:\nCity/State:\nCabinet count:\nNotes:\n\n(Attach photos)\n\nShowroom: ${SHOWROOM_ADDRESS}\n`
    );
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div className="kicker">Gallery</div>
            <h2 style={{ fontSize: 34, marginTop: 10 }}>Installs & Case Studies</h2>
            <p>Replace the examples with real installs and tag the finish used.</p>
          </div>
          <a className="btn btn-primary" href={submitMailto}>
            Submit your install
          </a>
        </div>

        <div className="card soft" style={{ marginTop: 14 }}>
          <div className="grid three">
            <div>
              <label>Filter by finish</label>
              <select value={filterFinish} onChange={(e) => setFilterFinish(e.target.value)}>
                <option value="all">All</option>
                {finishesFlat.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mini" style={{ alignSelf: "end" }}>
              Tip: Real installs + finish tags convert fast.
            </div>
            <div style={{ alignSelf: "end" }}>
              <a className="btn btn-outline" href="#/shop">
                Shop finishes
              </a>
            </div>
          </div>
        </div>

        <div className="grid three" style={{ marginTop: 14 }}>
          {studies.map((s, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <img src={s.image} alt={s.title} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <div style={{ padding: 14 }}>
                <div className="kicker">{s.location}</div>
                <div style={{ fontFamily: 'Georgia,"Times New Roman",serif', fontWeight: 700, fontSize: 18, marginTop: 6 }}>
                  {s.title}
                </div>
                <div className="mini" style={{ marginTop: 8 }}>
                  <b>Finish:</b> {getFinishById(s.finishId).name}
                  <br />
                  <b>Cabinets:</b> {s.cabinetCount}
                  <br />
                  <b>Range:</b> {s.range}
                </div>
                <div className="row" style={{ marginTop: 12 }}>
                  <a className="btn btn-primary" href={`#/shop/${s.finishId}`}>
                    Shop this finish
                  </a>
                  <a className="btn btn-outline" href="#/design">
                    Get a design
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [msg, setMsg] = useState({ name: "", email: "", phone: "", body: "" });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Website Inquiry — Premier RTA Cabinetry");
    const body = encodeURIComponent(
      `Name: ${msg.name}\nEmail: ${msg.email}\nPhone: ${msg.phone}\n\nMessage:\n${msg.body}\n\nShowroom: ${SHOWROOM_ADDRESS}\n`
    );
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [msg]);

  return (
    <section className="section" style={{ background: "var(--bg2)" }}>
      <div className="container grid two">
        <div className="card">
          <div className="kicker">Contact</div>
          <h2 style={{ fontSize: 34, marginTop: 10 }}>Premier RTA Cabinetry</h2>
          <p className="mini">
            Showroom/Warehouse: <b style={{ color: "var(--text)" }}>{SHOWROOM_ADDRESS}</b>
            <br />
            Email: <b style={{ color: "var(--text)" }}>{SUPPORT_EMAIL}</b>
            <br />
            Phone: <b style={{ color: "var(--text)" }}>{SUPPORT_PHONE}</b>
          </p>

          <div className="divider" />
          <p className="mini">
            Serving Staten Island for years — now shipping RTA nationwide with designer-led support when you want it.
          </p>

          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn btn-primary" href="#/design">
              Free 3D Design
            </a>
            <a className="btn btn-outline" href="#/shop">
              Shop
            </a>
          </div>
        </div>

        <div className="card soft">
          <div className="kicker">Message</div>
          <h3 style={{ fontSize: 22, marginTop: 8 }}>Send us a quick note</h3>

          <div className="grid two" style={{ marginTop: 10 }}>
            <div>
              <label>Name</label>
              <input value={msg.name} onChange={(e) => setMsg((m) => ({ ...m, name: e.target.value }))} />
            </div>
            <div>
              <label>Phone</label>
              <input value={msg.phone} onChange={(e) => setMsg((m) => ({ ...m, phone: e.target.value }))} />
            </div>
          </div>

          <label>Email</label>
          <input value={msg.email} onChange={(e) => setMsg((m) => ({ ...m, email: e.target.value }))} />

          <label>Message</label>
          <textarea
            rows={5}
            value={msg.body}
            onChange={(e) => setMsg((m) => ({ ...m, body: e.target.value }))}
            placeholder="Finish, SKUs, measurements, timeline…"
          />

          <div className="row" style={{ marginTop: 12 }}>
            <a className="btn btn-primary" href={mailtoHref}>
              Send Email
            </a>
            <a className="btn btn-outline" href={`mailto:${SUPPORT_EMAIL}`}>
              Open Mail
            </a>
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
   PROJECT STORAGE
   ============================ */
function getDefaultProjects() {
  return [{ id: "p_" + uid(), name: "My Project", cart: [], measurementSummary: "" }];
}

/* ============================
   APP
   ============================ */
export default function App() {
  const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash || "#/home" : "#/home");
  const [toast, setToast] = useState("");

  const [projects, setProjects] = useState(() => {
    if (typeof window === "undefined") return getDefaultProjects();
    try {
      const raw = localStorage.getItem("premier_projects_v3");
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) && parsed.length ? parsed : getDefaultProjects();
    } catch {
      return getDefaultProjects();
    }
  });

  const [currentProjectId, setCurrentProjectId] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("premier_current_project_v3") || "";
  });

  // Ensure current project is valid
  useEffect(() => {
    if (!projects.length) return;
    const exists = projects.some((p) => p.id === currentProjectId);
    if (!exists) setCurrentProjectId(projects[0].id);
  }, [projects, currentProjectId]);

  const currentProject = useMemo(() => {
    return projects.find((p) => p.id === currentProjectId) || projects[0];
  }, [projects, currentProjectId]);

  const cart = currentProject?.cart || [];
  const measurementSummary = currentProject?.measurementSummary || "";

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("premier_projects_v3", JSON.stringify(projects));
    localStorage.setItem("premier_current_project_v3", currentProjectId || "");
  }, [projects, currentProjectId]);

  // Hash routing listener
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/home");
    if (!window.location.hash) window.location.hash = "/home";
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Toast auto clear
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const onToast = (msg) => setToast(msg);

  const { route, sub, params } = parseRouteFromHash(hash);

  // Load shared cart into current project
  useEffect(() => {
    if (route !== "cart") return;
    const data = params?.data;
    if (!data) return;
    try {
      const decoded = b64urlDecode(data);
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed)) {
        setProjects((prev) => prev.map((p) => (p.id === currentProjectId ? { ...p, cart: parsed } : p)));
        window.location.hash = "/cart";
        setToast("Cart loaded");
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + (it.qty || 0), 0), [cart]);

  const switchProject = (id) => setCurrentProjectId(id);

  const createProject = () => {
    const name = prompt("Project name:", `Project ${projects.length + 1}`);
    if (!name) return;
    const p = { id: "p_" + uid(), name, cart: [], measurementSummary: "" };
    setProjects((prev) => [p, ...prev]);
    setCurrentProjectId(p.id);
    setToast("Project created");
  };

  const updateCurrentProject = (patch) => {
    setProjects((prev) => prev.map((p) => (p.id === currentProjectId ? { ...p, ...patch } : p)));
  };

  const addToCart = (item) => {
    const {
      finishId,
      finishName,
      cabinetType,
      cabinetTypeLabel,
      sku,
      qty,
      unitPrice,
      assembly,
      assemblyFeeEach,
      width,
      height,
      depth,
    } = item;

    const key = `${finishId}|${cabinetType}|${sku}|${assembly}|${width}|${height}|${depth}`;

    const idx = cart.findIndex((x) => x.key === key);
    let next;
    if (idx >= 0) {
      const copy = cart.slice();
      copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 0) + qty };
      next = copy;
    } else {
      next = [
        ...cart,
        {
          key,
          finishId,
          finishName,
          cabinetType,
          cabinetTypeLabel,
          sku,
          qty,
          unitPrice,
          assembly,
          assemblyFeeEach,
          width,
          height,
          depth,
        },
      ];
    }

    updateCurrentProject({ cart: next });
    window.location.hash = "/cart";
  };

  const removeFromCart = (key) => updateCurrentProject({ cart: cart.filter((x) => x.key !== key) });
  const clearCart = () => updateCurrentProject({ cart: [] });

  const exportCartCSV = () => {
    const header = ["Finish", "Type", "SKU", "Width", "Height", "Depth", "Qty", "UnitPrice", "AssemblyEach", "LineTotal"].join(
      ","
    );
    const rows = cart.map((it) => {
      const assemblyLine = (it.assemblyFeeEach || 0) * (it.qty || 0);
      const lineTotal = (it.unitPrice || 0) * (it.qty || 0) + assemblyLine;
      const cols = [
        it.finishName,
        it.cabinetTypeLabel || it.cabinetType || "",
        it.sku,
        it.width ?? "",
        it.height ?? "",
        it.depth ?? "",
        it.qty ?? 0,
        it.unitPrice ?? 0,
        it.assembly === "assembled" ? it.assemblyFeeEach || 0 : 0,
        lineTotal,
      ];
      return cols.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",");
    });
    downloadTextFile(`${currentProject?.name || "project"}-cart.csv`, [header, ...rows].join("\n"));
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

  const addSample = (finishId, finishName) => {
    addToCart({
      finishId,
      finishName,
      cabinetType: "sample",
      cabinetTypeLabel: "Door Sample",
      sku: "SAMPLE",
      qty: 1,
      unitPrice: SAMPLE_PRICE,
      assembly: "rta",
      assemblyFeeEach: 0,
      width: 0,
      height: 0,
      depth: 0,
    });
    setToast("Sample added");
  };

  return (
    <div>
      <GlobalStyles />

      <Header
        cartCount={cartCount}
        projects={projects}
        currentProjectId={currentProjectId}
        onSwitchProject={switchProject}
        onCreateProject={createProject}
      />

      {route === "home" && <Home />}

      {route === "shop" &&
        (!sub ? (
          <ShopList onAddSample={addSample} />
        ) : (
          <Configurator
            finishId={sub}
            cart={cart}
            onAddToCart={addToCart}
            onExportCartCSV={exportCartCSV}
            onToast={onToast}
            onAddSample={addSample}
          />
        ))}

      {route === "design" && (
        <DesignCenter
          onSaveMeasurementSummary={(txt) => {
            updateCurrentProject({ measurementSummary: txt });
            onToast("Measurements saved to project");
          }}
          savedMeasurementSummary={measurementSummary}
        />
      )}

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
          projectName={currentProject?.name || "Project"}
          measurementSummaryText={measurementSummary}
        />
      )}

      {route === "contact" && <Contact />}

      <div className="footer">
        <div className="container">
          <div className="grid two">
            <div className="mini">
              <b style={{ color: "var(--text)" }}>Showroom/Warehouse:</b> {SHOWROOM_ADDRESS}
              <br />
              <b style={{ color: "var(--text)" }}>Email:</b> {SUPPORT_EMAIL}
              <br />
              <b style={{ color: "var(--text)" }}>Phone:</b> {SUPPORT_PHONE}
            </div>
            <div className="mini">
              <b style={{ color: "var(--text)" }}>About:</b> Serving Staten Island for years — now offering RTA cabinetry
              shipping nationwide with designer-led support when you want it.
            </div>
          </div>
        </div>
      </div>

      <FloatingHelp />
      <Toast text={toast} />
    </div>
  );
}
