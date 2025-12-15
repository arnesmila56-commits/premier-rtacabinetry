import React, { useEffect, useState } from "react";

/* ============================
   GLOBAL STYLES — Classic Luxury (lighter charcoal + white + bright red)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#191A1F;         /* lighter charcoal (not pure black) */
        --card:#20222A;       /* primary surfaces */
        --card2:#252834;      /* secondary surfaces */
        --text:#F5F5F7;       /* near-white */
        --muted:#C9CBD6;      /* soft text */
        --muted2:#9EA2B2;     /* labels */
        --primary:#E1062C;    /* brighter luxury red */
        --border: rgba(255,255,255,.10);
        --ring: rgba(225,6,44,.28);
        --shadow: 0 18px 45px rgba(0,0,0,.40);
      }

      html,body{
        margin:0;
        background:var(--bg);
        color:var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      *,*::before,*::after{ box-sizing:border-box; }
      a{ color:inherit; text-decoration:none; }
      img{ max-width:100%; display:block; }

      /* Typography — reduce bold/cartoon feel */
      h1,h2,h3{
        margin:0 0 10px;
        line-height:1.15;
        letter-spacing:-0.015em;
        font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
        font-weight: 700;
      }
      p{
        margin:8px 0;
        line-height:1.62;
        color:var(--muted);
        font-weight: 400;
      }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section.section{ padding:46px 0; }

      header.sticky{
        position:sticky; top:0; z-index:40;
        background: rgba(25,26,31,0.82);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--border);
      }

      /* Inputs */
      label{
        font-size:11px;
        font-weight:600;
        display:block;
        margin-top:10px;
        margin-bottom:6px;
        letter-spacing:0.14em;
        text-transform:uppercase;
        color:var(--muted2);
      }
      input,select,textarea{
        width:100%;
        padding:11px 12px;
        border-radius:14px;
        border:1px solid var(--border);
        background:var(--card2);
        color:var(--text);
        outline:none;
      }
      input:focus,select:focus,textarea:focus{
        border-color: var(--primary);
        box-shadow: 0 0 0 4px var(--ring);
      }

      /* Buttons — cleaner, less “gamey” */
      .btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        padding:10px 16px;
        border-radius:14px;
        border:1px solid transparent;
        cursor:pointer;
        font-weight:600;
        letter-spacing:0.02em;
        user-select:none;
        transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease, border-color .12s ease;
      }
      .btn-primary{
        background: var(--primary);
        color:#fff;
        box-shadow: 0 10px 24px rgba(225,6,44,.22);
      }
      .btn-outline{
        background: transparent;
        border-color: var(--border);
        color: var(--text);
      }
      .btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
      .btn:active{ transform: translateY(0px); box-shadow:none; }

      /* Cards */
      .card{
        background: var(--card);
        border:1px solid var(--border);
        border-radius:18px;
        padding:16px;
      }
      .card.soft{ background: var(--card2); }

      .grid{ display:grid; gap:16px; }
      .row{ display:flex; gap:14px; }
      .wrap{ flex-wrap:wrap; }

      /* Pills */
      .pill{
        display:inline-flex;
        align-items:center;
        padding:6px 10px;
        border-radius:999px;
        font-size:12px;
        font-weight:600;
        letter-spacing:0.02em;
        border:1px solid var(--border);
        color: var(--text);
        background: rgba(255,255,255,.04);
      }
      .pill.red{
        background: var(--primary);
        border-color: transparent;
      }

      /* Tabs */
      .tab-list{
        display:inline-flex;
        gap:10px;
        padding:6px;
        border-radius:14px;
        flex-wrap:wrap;
        border:1px solid var(--border);
        background: rgba(255,255,255,.03);
      }
      .tab-btn{
        padding:9px 14px;
        border-radius:12px;
        line-height:1;
        font-weight:600;
        border:1px solid transparent;
        background: transparent;
        color: var(--text);
        cursor:pointer;
      }
      .tab-btn[aria-selected="true"]{
        background: var(--primary);
        color:#fff;
      }

      /* Tables */
      table{ width:100%; border-collapse:collapse; }
      th,td{ padding:10px 12px; border-bottom:1px solid var(--border); text-align:left; color: var(--text); }
      th{ color: var(--muted2); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; }

      /* Nav */
      nav a{
        padding:6px 10px;
        border-radius:12px;
        color: var(--text);
        opacity: .92;
        font-weight: 600;
        letter-spacing: .10em;
        text-transform: uppercase;
        font-size: 11px;
      }
      nav a:hover{ background: rgba(255,255,255,.05); }

      /* Responsive */
      .two-col{ grid-template-columns: 1.1fr .9fr; }
      .two-eq{ grid-template-columns: 1fr 1fr; }
      .three-col{ grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 900px){
        section.section{ padding:32px 0; }
        .two-col, .two-eq, .three-col{ grid-template-columns: 1fr; }
      }
    `}</style>
  );
}

/* ============================
   DATA
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const TRIBECA_FINISH_TABS = [
  {
    tab: "Hudson",
    finishes: [
      { id: "hudson-snow-white", name: "Hudson Snow White" },
      { id: "hudson-cloud-white", name: "Hudson Cloud White" },
      { id: "hudson-hearthstone", name: "Hudson Hearthstone" },
      { id: "hudson-white-rift-oak", name: "Hudson White Rift Oak" },
      { id: "hudson-cashew", name: "Hudson Cashew" },
    ],
  },
  {
    tab: "Soho",
    finishes: [
      { id: "soho-snow-white", name: "Soho Snow White" },
      { id: "soho-empire-blue", name: "Soho Empire Blue" },
    ],
  },
  {
    tab: "Southampton",
    finishes: [
      { id: "southampton-snow-white", name: "Southampton Snow White" },
      { id: "southampton-white-rift-oak", name: "Southampton White Rift Oak" },
      { id: "southampton-carbon-black-oak", name: "Southampton Carbon Black Oak" },
    ],
  },
];

const DEFAULT_FINISH_ID = "hudson-snow-white";

/** IMPORTANT:
 * Paste real image URLs from tribecacabinetry.com here.
 * You can right-click an image on their site -> "Copy image address" and paste.
 */
const TRIBECA_FINISH_IMAGES = {
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
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop";

function getFinishById(id) {
  for (const group of TRIBECA_FINISH_TABS) {
    for (const f of group.finishes) {
      if (f.id === id) return f;
    }
  }
  return TRIBECA_FINISH_TABS[0].finishes[0];
}

function finishImage(id) {
  const url = TRIBECA_FINISH_IMAGES[id];
  if (!url || url === "REPLACE_WITH_IMAGE_URL") return FALLBACK_IMAGE;
  return url;
}

const CABINET_SKUS = [
  { sku: "B12R", name: 'Base 12" Right', width: 12, height: 34.5, depth: 24, hinge: "Right", price: 225 },
  { sku: "B12L", name: 'Base 12" Left', width: 12, height: 34.5, depth: 24, hinge: "Left", price: 225 },
  { sku: "B15R", name: 'Base 15" Right', width: 15, height: 34.5, depth: 24, hinge: "Right", price: 245 },
  { sku: "B15L", name: 'Base 15" Left', width: 15, height: 34.5, depth: 24, hinge: "Left", price: 245 },
  { sku: "B18R", name: 'Base 18" Right', width: 18, height: 34.5, depth: 24, hinge: "Right", price: 265 },
  { sku: "B18L", name: 'Base 18" Left', width: 18, height: 34.5, depth: 24, hinge: "Left", price: 265 },
  { sku: "B21R", name: 'Base 21" Right', width: 21, height: 34.5, depth: 24, hinge: "Right", price: 285 },
  { sku: "B21L", name: 'Base 21" Left', width: 21, height: 34.5, depth: 24, hinge: "Left", price: 285 },
  { sku: "B24",  name: 'Base 24" Double', width: 24, height: 34.5, depth: 24, hinge: "Double", price: 305 },
  { sku: "B27",  name: 'Base 27" Double', width: 27, height: 34.5, depth: 24, hinge: "Double", price: 325 },
  { sku: "B30",  name: 'Base 30" Double', width: 30, height: 34.5, depth: 24, hinge: "Double", price: 345 },
  { sku: "B33",  name: 'Base 33" Double', width: 33, height: 34.5, depth: 24, hinge: "Double", price: 365 },
  { sku: "B36",  name: 'Base 36" Double', width: 36, height: 34.5, depth: 24, hinge: "Double", price: 385 },
  { sku: "B39",  name: 'Base 39" Double', width: 39, height: 34.5, depth: 24, hinge: "Double", price: 405 },
];

/* ============================
   ROUTER
   ============================ */
function parseRouteFromHash(hash) {
  const h = (hash || "").replace(/^#\/?/, "").trim().toLowerCase();
  const parts = h.split("/");
  const first = parts[0];
  const valid = ["home","shop","builder","learn","gallery","contact","cart"];
  return valid.includes(first) ? { route:first, sub: parts[1] } : { route:"home", sub: undefined };
}

/* ============================
   HEADER / LOGO
   ============================ */
function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"baseline", gap:8, lineHeight:1 }}>
      <span style={{ fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif', fontWeight:700, fontSize:20 }}>
        Premier
      </span>
      <span style={{ fontWeight:700, fontSize:16, color:"var(--primary)", letterSpacing:".12em" }}>
        RTA
      </span>
      <span style={{ fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif', fontWeight:600, fontSize:16, opacity:.95 }}>
        Cabinetry
      </span>
    </div>
  );
}

function Header({ cartCount }) {
  const links = [
    ["#/home", "Home"],
    ["#/shop", "Shop"],
    ["#/builder", "Design Center"],
    ["#/learn", "Learning"],
    ["#/gallery", "Gallery"],
    ["#/contact", "Contact"],
    ["#/cart", `Cart (${cartCount})`],
  ];
  return (
    <header className="sticky">
      <div className="container" style={{ display:"flex", alignItems:"center", gap:16, padding:"12px 0", flexWrap:"wrap" }}>
        <a href="#/home" aria-label="Home"><Logo /></a>

        <nav style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <a className="btn btn-outline" href="tel:18007736437">Call</a>
          <a href="#/cart" className="btn btn-primary">Cart ({cartCount})</a>
        </div>
      </div>
    </header>
  );
}

/* ============================
   HOME
   ============================ */
function Home() {
  return (
    <section className="section">
      <div className="container grid two-col" style={{ alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:40 }}>Classic Luxury Kitchens, Designer-Led</h1>
          <p>
            Staten Island based, 20+ years experience. We guide you through finish selection, cabinet sizing,
            and ordering—without confusion.
          </p>
          <p>
            Free 3D Design: submit walls, windows, budget, and style. Our pro design team sends a 3D layout
            and an itemized cabinet list.
          </p>

          <div className="row wrap" style={{ marginTop:14 }}>
            <a href="#/shop" className="btn btn-primary">Shop Tribeca</a>
            <a href="#/builder" className="btn btn-outline">Start Free Design</a>
          </div>

          <div className="row wrap" style={{ marginTop:14 }}>
            <span className="pill">Nationwide Shipping</span>
            <span className="pill">Designer Support</span>
            <span className="pill red">Luxury Finishes</span>
          </div>
        </div>

        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img
            src={FALLBACK_IMAGE}
            alt="Kitchen"
            style={{ width:"100%", height:"min(520px, 70vh)", objectFit:"cover" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================
   SHOP (Tabs + per-finish images)
   ============================ */
function Shop() {
  const [activeTab, setActiveTab] = useState("Hudson");
  const tabObj = TRIBECA_FINISH_TABS.find(t => t.tab === activeTab) || TRIBECA_FINISH_TABS[0];

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28 }}>Shop — Tribeca Finish Collections</h2>
        <p>Select a collection, choose a finish, then configure your SKUs.</p>

        <div className="tab-list" role="tablist" style={{ marginTop:12 }}>
          {TRIBECA_FINISH_TABS.map(t => (
            <button
              key={t.tab}
              className="tab-btn"
              aria-selected={activeTab === t.tab}
              onClick={() => setActiveTab(t.tab)}
              type="button"
            >
              {t.tab}
            </button>
          ))}
        </div>

        <div className="grid three-col" style={{ marginTop:16 }}>
          {tabObj.finishes.map(f => (
            <div key={f.id} className="card">
              <img
                src={finishImage(f.id)}
                alt={f.name}
                style={{ width:"100%", height:190, objectFit:"cover", borderRadius:14 }}
              />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                <div style={{ fontSize:16 }}>{f.name}</div>
                <span className="pill red">Tribeca</span>
              </div>
              <p style={{ color:"var(--muted2)" }}>RTA • Nationwide shipping • Same base SKU set</p>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
                <div style={{ color:"var(--muted)" }}>From selection</div>
                <a className="btn btn-primary" href={`#/shop/${f.id}`}>Configure</a>
              </div>
            </div>
          ))}
        </div>

        <div className="card soft" style={{ marginTop:16 }}>
          <p style={{ margin:0, color:"var(--muted2)" }}>
            Need help choosing finishes? Email us: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================
   CONFIGURATOR
   ============================ */
function Configurator({ finishId, onAddToCart }) {
  const finish = getFinishById(finishId || DEFAULT_FINISH_ID);

  const [sku, setSku] = useState("B12R");
  const [qty, setQty] = useState(1);
  const [assembly, setAssembly] = useState("rta");

  const chosen = CABINET_SKUS.find((s) => s.sku === sku);
  const base = chosen ? chosen.price : 0;
  const assemblyUp = assembly === "assembled" ? 99 : 0;
  const unit = base + assemblyUp;
  const total = unit * qty;

  return (
    <section className="section">
      <div className="container grid two-eq">
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={finishImage(finish.id)} alt={finish.name} style={{ width:"100%", height:440, objectFit:"cover" }} />
          <div style={{ padding:16 }}>
            <h2 style={{ fontSize:24 }}>{finish.name}</h2>
            <p style={{ color:"var(--muted2)" }}>Tribeca • RTA • Configure SKUs below</p>
          </div>
        </div>

        <div className="card">
          <label>Cabinet SKU</label>
          <select value={sku} onChange={(e)=>setSku(e.target.value)}>
            {CABINET_SKUS.map((s)=>(
              <option key={s.sku} value={s.sku}>
                {s.sku} — {s.name} ({s.width}"W) — {usd(s.price)}
              </option>
            ))}
          </select>

          <div className="grid two-eq" style={{ marginTop:8 }}>
            <div>
              <label>Quantity</label>
              <input type="number" min={1} value={qty} onChange={(e)=>setQty(Math.max(1, parseInt(e.target.value||"1")))} />
            </div>
            <div>
              <label>Assembly</label>
              <select value={assembly} onChange={(e)=>setAssembly(e.target.value)}>
                <option value="rta">Ship RTA (unassembled)</option>
                <option value="assembled">Pre-assemble (+$99)</option>
              </select>
            </div>
          </div>

          {chosen && (
            <table style={{ marginTop:12 }}>
              <tbody>
                <tr><th>Width</th><td>{chosen.width}"</td></tr>
                <tr><th>Height</th><td>{chosen.height}"</td></tr>
                <tr><th>Depth</th><td>{chosen.depth}"</td></tr>
                <tr><th>Hinge</th><td>{chosen.hinge}</td></tr>
              </tbody>
            </table>
          )}

          <div className="card soft" style={{ marginTop:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:11, color:"var(--muted2)", letterSpacing:".14em", textTransform:"uppercase" }}>Unit</div>
                <div style={{ fontSize:22 }}>{usd(unit)}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:11, color:"var(--muted2)", letterSpacing:".14em", textTransform:"uppercase" }}>Total</div>
                <div style={{ fontSize:22 }}>{usd(total)}</div>
              </div>
            </div>
          </div>

          <div className="row wrap" style={{ marginTop:12 }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => onAddToCart({
                finishId: finish.id,
                finishName: finish.name,
                sku,
                qty,
                assembly,
                unitPrice: unit
              })}
            >
              Add to Cart
            </button>
            <a className="btn btn-outline" href="#/shop">Back</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   DESIGN CENTER — Full
   ============================ */
function LayoutDiagram({ name, selected, onSelect }) {
  return (
    <div
      className="card"
      style={{ cursor:"pointer", borderColor: selected ? "var(--primary)" : "var(--border)" }}
      onClick={() => onSelect(name)}
      role="button"
    >
      <svg viewBox="0 0 120 80" width="100%" height="90" style={{ color:"var(--text)" }}>
        <text x="6" y="10" fontSize="6" fill="currentColor">B=Base</text>
        <text x="42" y="10" fontSize="6" fill="currentColor">W=Wall</text>
        <text x="80" y="10" fontSize="6" fill="currentColor">T=Tall</text>
        {name==="L-Shape" && <path d="M10 20 H80 V30 H30 V65 H10 Z" fill="none" stroke="currentColor" strokeWidth="3" />}
        {name==="U-Shape" && <path d="M10 20 H90 V65 H70 V35 H30 V65 H10 Z" fill="none" stroke="currentColor" strokeWidth="3" />}
        {name==="Galley" && <>
          <rect x="10" y="20" width="25" height="45" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="85" y="20" width="25" height="45" fill="none" stroke="currentColor" strokeWidth="3" />
        </>}
        {name==="Single Wall" && <rect x="10" y="40" width="100" height="18" fill="none" stroke="currentColor" strokeWidth="3" />}
        {name==="Island Kitchen" && <>
          <rect x="10" y="40" width="80" height="18" fill="none" stroke="currentColor" strokeWidth="3" />
          <rect x="40" y="62" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="3" />
        </>}
      </svg>
      <div style={{ textAlign:"center", fontWeight:600 }}>{name}</div>
      <p style={{ fontSize:12, textAlign:"center", color:"var(--muted2)" }}>Cabinet placement guide</p>
    </div>
  );
}

function DesignCenter() {
  const saved = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("design_center_progress") || "{}") : {};
  const [step, setStep] = useState(saved.step || 1);

  const [layout, setLayout] = useState(saved.layout || "Not Sure");
  const [walls, setWalls] = useState(saved.walls || { wallA:"", wallB:"", wallC:"", ceiling:"" });
  const [windows, setWindows] = useState(saved.windows || [{ id:1, wall:"A", width:"", height:"", sill:"", offset:"" }]);
  const [budget, setBudget] = useState(saved.budget || 25000);
  const [palette, setPalette] = useState(saved.palette || "Snow White + Brass");
  const [contact, setContact] = useState(saved.contact || { name:"", email:"", phone:"", notes:"" });

  useEffect(() => {
    try {
      localStorage.setItem("design_center_progress", JSON.stringify({ step, layout, walls, windows, budget, palette, contact }));
    } catch {}
  }, [step, layout, walls, windows, budget, palette, contact]);

  const updateWall = (k,v)=>setWalls((w)=>({ ...w, [k]: v }));
  const updateWindow = (id, patch)=>setWindows((ws)=>ws.map((w)=>w.id===id?{...w,...patch}:w));
  const addWindow = ()=>setWindows((ws)=>[...ws,{ id:(ws[ws.length-1]?.id||0)+1, wall:"A", width:"", height:"", sill:"", offset:"" }]);
  const removeWindow = (id)=>setWindows((ws)=>ws.length<=1?ws:ws.filter((w)=>w.id!==id));

  return (
    <section className="section">
      <div className="container grid" style={{ gap:16 }}>
        <div>
          <h2 style={{ fontSize:32 }}>Design Center — Free 3D Kitchen Design</h2>
          <p>
            Submit layout, walls, windows, budget, and style. Our pro team delivers a custom 3D design
            + cabinet placement + recommendations before you buy.
          </p>
          <div className="row wrap" style={{ marginTop:10 }}>
            <span className="pill red">Response within 24 hours</span>
            <span className="pill">3D render included</span>
            <span className="pill">Designer-led</span>
          </div>
        </div>

        <div className="card soft">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:600 }}>Step {step} of 5</div>
            <div style={{ color:"var(--muted2)", fontSize:13 }}>Auto-saved</div>
          </div>
        </div>

        {step===1 && (
          <div className="card">
            <h3>1) Choose the closest layout</h3>
            <div className="grid three-col" style={{ marginTop:12 }}>
              {["Not Sure","L-Shape","U-Shape","Galley","Single Wall","Island Kitchen"].map((l)=>(
                l==="Not Sure"
                  ? <button key={l} className={`btn ${layout===l ? "btn-primary" : "btn-outline"}`} onClick={()=>setLayout(l)} type="button">Not Sure — Help Me</button>
                  : <LayoutDiagram key={l} name={l} selected={layout===l} onSelect={setLayout} />
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12 }}>
              <button className="btn btn-primary" type="button" onClick={()=>setStep(2)}>Next</button>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="card">
            <h3>2) Wall sizes (inches)</h3>
            <div className="grid" style={{ gridTemplateColumns:"repeat(4,1fr)" }}>
              <div><label>Wall A</label><input value={walls.wallA} onChange={(e)=>updateWall("wallA",e.target.value)} placeholder="192" /></div>
              <div><label>Wall B</label><input value={walls.wallB} onChange={(e)=>updateWall("wallB",e.target.value)} placeholder="120" /></div>
              <div><label>Wall C</label><input value={walls.wallC} onChange={(e)=>updateWall("wallC",e.target.value)} placeholder="optional" /></div>
              <div><label>Ceiling</label><input value={walls.ceiling} onChange={(e)=>updateWall("ceiling",e.target.value)} placeholder="108" /></div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(1)}>Back</button>
              <button className="btn btn-primary" type="button" onClick={()=>setStep(3)}>Next</button>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="card">
            <h3>3) Window locations</h3>
            <div className="grid" style={{ gap:12, marginTop:12 }}>
              {windows.map((w)=>(
                <div key={w.id} className="card soft">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontWeight:600 }}>Window {w.id}</div>
                    <button className="btn btn-outline" type="button" onClick={()=>removeWindow(w.id)}>Remove</button>
                  </div>

                  <div className="grid" style={{ gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:10 }}>
                    <div>
                      <label>Wall</label>
                      <select value={w.wall} onChange={(e)=>updateWindow(w.id,{ wall:e.target.value })}>
                        <option value="A">Wall A</option>
                        <option value="B">Wall B</option>
                        <option value="C">Wall C</option>
                      </select>
                    </div>
                    <div><label>Width</label><input value={w.width} onChange={(e)=>updateWindow(w.id,{ width:e.target.value })} placeholder="36" /></div>
                    <div><label>Height</label><input value={w.height} onChange={(e)=>updateWindow(w.id,{ height:e.target.value })} placeholder="48" /></div>
                    <div><label>Sill height</label><input value={w.sill} onChange={(e)=>updateWindow(w.id,{ sill:e.target.value })} placeholder="from floor" /></div>
                  </div>

                  <div style={{ marginTop:10 }}>
                    <label>Offset from left corner</label>
                    <input value={w.offset} onChange={(e)=>updateWindow(w.id,{ offset:e.target.value })} placeholder="distance from left corner" />
                  </div>
                </div>
              ))}
              <button className="btn btn-outline" type="button" onClick={addWindow}>+ Add another window</button>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(2)}>Back</button>
              <button className="btn btn-primary" type="button" onClick={()=>setStep(4)}>Next</button>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="card">
            <h3>4) Budget & color direction</h3>

            <div className="grid two-eq" style={{ marginTop:12 }}>
              <div className="card soft">
                <h3 style={{ marginBottom:6 }}>Budget comfort</h3>
                <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))}/>
                <div style={{ marginTop:8 }}>{usd(budget)}</div>
              </div>

              <div className="card soft">
                <h3 style={{ marginBottom:6 }}>Color palette</h3>
                <select value={palette} onChange={(e)=>setPalette(e.target.value)}>
                  <option>Snow White + Brass</option>
                  <option>Snow White + Matte Black</option>
                  <option>Two-Tone: White + Warm Oak</option>
                  <option>Two-Tone: White + Deep Walnut</option>
                  <option>All White</option>
                </select>
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(3)}>Back</button>
              <button className="btn btn-primary" type="button" onClick={()=>setStep(5)}>Next</button>
            </div>
          </div>
        )}

        {step===5 && (
          <div className="card soft">
            <h3>5) Submit your free design request</h3>
            <p>
              After you submit, our professional design team will create a custom 3D kitchen design,
              cabinet placement, and recommendations — free.
            </p>

            <div className="grid two-eq" style={{ marginTop:12 }}>
              <div><label>Name</label><input value={contact.name} onChange={(e)=>setContact(c=>({...c,name:e.target.value}))} /></div>
              <div><label>Email</label><input value={contact.email} onChange={(e)=>setContact(c=>({...c,email:e.target.value}))} /></div>
              <div><label>Phone</label><input value={contact.phone} onChange={(e)=>setContact(c=>({...c,phone:e.target.value}))} /></div>
              <div><label>Notes</label><input value={contact.notes} onChange={(e)=>setContact(c=>({...c,notes:e.target.value}))} placeholder="timeline, preferences, etc." /></div>
            </div>

            <div className="row wrap" style={{ marginTop:12 }}>
              <button className="btn btn-primary" type="button">Request Free Design Help</button>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(1)}>Start Over</button>
            </div>

            <div className="card" style={{ marginTop:16 }}>
              <p style={{ margin:0, color:"var(--muted2)" }}>
                Email us any inspiration photos: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================
   LEARN / GALLERY / CONTACT / CART / FOOTER
   ============================ */
function Learn(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28 }}>Learning Center</h2>
        <p>Measuring, ordering, shipping, assembly, care, and returns.</p>
      </div>
    </section>
  );
}

function Gallery(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28 }}>Gallery</h2>
        <p>Project gallery coming soon.</p>
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28 }}>Contact</h2>
        <p>Phone: 800-PREMIER</p>
        <p>Email: premier@premierkm.com</p>
      </div>
    </section>
  );
}

function Cart({ cart, onRemove, onClear }){
  const subtotal = cart.reduce((s,it)=>s + it.unitPrice * it.qty, 0);
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28 }}>Your Cart</h2>
        {cart.length===0 ? (
          <>
            <p>Your cart is empty.</p>
            <a className="btn btn-outline" href="#/shop">Back to Shop</a>
          </>
        ) : (
          <>
            <div className="card" style={{ padding:0, overflow:"hidden", marginTop:12 }}>
              <table>
                <thead>
                  <tr>
                    <th>Finish</th>
                    <th>SKU</th>
                    <th>Assembly</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((it)=>(
                    <tr key={it.key}>
                      <td>{it.finishName}</td>
                      <td>{it.sku}</td>
                      <td>{it.assembly}</td>
                      <td>{it.qty}</td>
                      <td>{usd(it.unitPrice)}</td>
                      <td>{usd(it.unitPrice * it.qty)}</td>
                      <td><button className="btn btn-outline" type="button" onClick={()=>onRemove(it.key)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12, fontSize:18 }}>
              Subtotal: {usd(subtotal)}
            </div>

            <div className="row wrap" style={{ justifyContent:"flex-end", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={onClear}>Clear Cart</button>
              <button className="btn btn-primary" type="button">Checkout (next step)</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer style={{ borderTop:"1px solid var(--border)", marginTop:20 }}>
      <div className="container" style={{ padding:"20px 0", fontSize:14, color:"var(--muted2)" }}>
        © {new Date().getFullYear()} Premier RTA Cabinetry • Email: premier@premierkm.com
      </div>
    </footer>
  );
}

/* ============================
   ERROR BOUNDARY
   ============================ */
class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, err:null }; }
  static getDerivedStateFromError(err){ return { hasError:true, err }; }
  componentDidCatch(err, info){ console.error(err, info); }
  render(){
    if(this.state.hasError){
      return (
        <div className="container" style={{ padding:"24px 0" }}>
          <h3>Something went wrong.</h3>
          <pre style={{ whiteSpace:"pre-wrap", fontSize:12, color:"var(--muted)" }}>{String(this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================
   ROOT APP
   ============================ */
function AppRoot(){
  const [hash, setHash] = useState(typeof window !== "undefined" ? (window.location.hash || "#/home") : "#/home");

  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("premier_cart") || "[]"); } catch { return []; }
  });

  useEffect(()=>{
    const onHash = ()=>setHash(window.location.hash || "#/home");
    if (!window.location.hash) window.location.hash = "/home";
    onHash();
    window.addEventListener("hashchange", onHash);
    return ()=>window.removeEventListener("hashchange", onHash);
  },[]);

  useEffect(()=>{ localStorage.setItem("premier_cart", JSON.stringify(cart)); },[cart]);

  const { route, sub } = parseRouteFromHash(hash);

  const addToCart = ({ finishId, finishName, sku, qty, assembly, unitPrice }) => {
    const key = `${finishId}|${sku}|${assembly}`;
    setCart(prev=>{
      const idx = prev.findIndex(x=>x.key===key);
      if (idx>=0){
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { key, finishId, finishName, sku, qty, assembly, unitPrice }];
    });
    window.location.hash = "/cart";
  };

  const removeFromCart = (key)=>setCart(prev=>prev.filter(x=>x.key!==key));
  const clearCart = ()=>setCart([]);

  return (
    <div>
      <GlobalStyles />
      <ErrorBoundary>
        <Header cartCount={cart.reduce((s,it)=>s+it.qty,0)} />
        {route==="home" && <Home />}
        {route==="shop" && (!sub ? <Shop /> : <Configurator finishId={sub} onAddToCart={addToCart} />)}
        {route==="builder" && <DesignCenter />}
        {route==="learn" && <Learn />}
        {route==="gallery" && <Gallery />}
        {route==="contact" && <Contact />}
        {route==="cart" && <Cart cart={cart} onRemove={removeFromCart} onClear={clearCart} />}
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default AppRoot;
