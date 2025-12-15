import React, { useEffect, useMemo, useState } from "react";

/* ============================
   GLOBAL STYLES — Dark Gray + White + Red (Classic Luxury)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#111216;
        --card:#171821;
        --card2:#1c1d28;
        --text:#f5f5f7;
        --muted:#c3c3cf;
        --muted2:#9b9bab;
        --primary:#c8102e;
        --border: rgba(255,255,255,.10);
        --ring: rgba(200,16,46,.28);
        --shadow: 0 22px 60px rgba(0,0,0,.55);
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

      /* Typography */
      h1,h2,h3{
        margin:0 0 10px;
        line-height:1.12;
        letter-spacing:-0.02em;
        font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
      }
      p{ margin:8px 0; line-height:1.55; color:var(--muted); }

      /* Layout */
      .container{ max-width:1200px; margin:0 auto; padding:0 20px; }
      section.section{ padding:44px 0; }
      @media (max-width: 900px){
        section.section{ padding:32px 0; }
      }

      /* Header */
      header.sticky{
        position:sticky;
        top:0;
        z-index:40;
        background: rgba(17,18,22,0.88);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--border);
      }

      /* Controls */
      label{
        font-size:12px;
        font-weight:800;
        display:block;
        margin-top:10px;
        margin-bottom:6px;
        letter-spacing:0.08em;
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

      /* Buttons */
      .btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        padding:10px 16px;
        border-radius:14px;
        border:1px solid transparent;
        cursor:pointer;
        font-weight:800;
        letter-spacing:0.02em;
        user-select:none;
        transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease, color .12s ease, border-color .12s ease;
      }
      .btn-primary{
        background: var(--primary);
        color:#fff;
        box-shadow: 0 14px 32px rgba(200,16,46,.22);
      }
      .btn-outline{
        background: transparent;
        border-color: var(--border);
        color: var(--text);
      }
      .btn:hover{ transform: translateY(-1px); }
      .btn:active{ transform: translateY(0px) scale(0.99); }

      /* Cards */
      .card{
        background: var(--card);
        border:1px solid var(--border);
        border-radius:18px;
        padding:16px;
      }
      .card.soft{ background: var(--card2); }
      .grid{ display:grid; gap:16px; }
      .row{ display:flex; gap:16px; }
      .wrap{ flex-wrap:wrap; }

      /* Pills */
      .pill{
        display:inline-flex;
        align-items:center;
        padding:6px 10px;
        border-radius:999px;
        font-size:12px;
        font-weight:900;
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
        font-weight:900;
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
      th{ color: var(--muted2); font-size: 12px; letter-spacing: .08em; text-transform: uppercase; font-weight: 900; }

      /* Nav */
      nav a{
        padding:6px 10px;
        border-radius:12px;
        color: var(--text);
        opacity: .92;
      }
      nav a:hover{ background: rgba(255,255,255,.05); }

      /* Responsive helpers */
      .two-col{ grid-template-columns: 1.1fr .9fr; }
      .two-eq{ grid-template-columns: 1fr 1fr; }
      .three-col{ grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 900px){
        .two-col, .two-eq{ grid-template-columns: 1fr; }
        .three-col{ grid-template-columns: 1fr; }
      }
    `}</style>
  );
}

/* ============================
   DATA
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const TRIBECA_IMAGE =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop";

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

function getFinishById(id) {
  for (const group of TRIBECA_FINISH_TABS) {
    for (const f of group.finishes) {
      if (f.id === id) return f;
    }
  }
  return TRIBECA_FINISH_TABS[0].finishes[0];
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
   LOGO
   ============================ */
function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"baseline", gap:8, lineHeight:1 }}>
      <span style={{ fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif', fontWeight:900, fontSize:22 }}>
        Premier
      </span>
      <span style={{ fontWeight:900, fontSize:18, color:"var(--primary)", letterSpacing:".12em" }}>
        RTA
      </span>
      <span style={{ fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif', fontWeight:800, fontSize:18, opacity:.95 }}>
        Cabinetry
      </span>
    </div>
  );
}

/* ============================
   HEADER
   ============================ */
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
        <a href="#/home" aria-label="Home" style={{ display:"flex", alignItems:"center" }}>
          <Logo />
        </a>

        <nav style={{ display:"flex", gap:10, flexWrap:"wrap", fontSize:12, fontWeight:900, letterSpacing:"0.10em", textTransform:"uppercase" }}>
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
    <section className="section" style={{ background:"linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,0))" }}>
      <div className="container grid two-col" style={{ alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:40, fontWeight:900 }}>Classic Luxury Kitchens, Designer-Led</h1>
          <p>
            Based in <b>Staten Island</b> with 20+ years of experience. We help homeowners nationwide
            design and purchase premium RTA cabinetry — without confusion.
          </p>
          <p>
            <b>Free 3D Design:</b> Submit your walls, windows, budget, and style, and our in-house team creates a 3D layout,
            cabinet placement, and an itemized cabinet list.
          </p>

          <div className="row wrap" style={{ marginTop:12 }}>
            <a href="#/shop" className="btn btn-primary">Shop Tribeca</a>
            <a href="#/builder" className="btn btn-outline">Start Free Design</a>
          </div>

          <div className="row wrap" style={{ marginTop:12 }}>
            <span className="pill">Nationwide Shipping</span>
            <span className="pill">Designer Support</span>
            <span className="pill red">Luxury Finishes</span>
          </div>
        </div>

        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={TRIBECA_IMAGE} alt="Kitchen" style={{ width:"100%", height:420, objectFit:"cover" }} />
        </div>
      </div>
    </section>
  );
}

/* ============================
   SHOP (TABS)
   ============================ */
function Shop() {
  const [activeTab, setActiveTab] = useState("Hudson");
  const tabObj = TRIBECA_FINISH_TABS.find(t => t.tab === activeTab) || TRIBECA_FINISH_TABS[0];

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Shop — Tribeca Finish Collections</h2>
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
              <img src={TRIBECA_IMAGE} alt={f.name} style={{ width:"100%", height:180, objectFit:"cover", borderRadius:14 }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                <div style={{ fontWeight:900 }}>{f.name}</div>
                <span className="pill red">Tribeca</span>
              </div>
              <p style={{ color:"var(--muted2)" }}>RTA • Nationwide shipping • Same base SKU set</p>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
                <div style={{ fontWeight:900 }}>From selection</div>
                <a className="btn btn-primary" href={`#/shop/${f.id}`}>Configure</a>
              </div>
            </div>
          ))}
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
          <img src={TRIBECA_IMAGE} alt={finish.name} style={{ width:"100%", height:420, objectFit:"cover" }} />
          <div style={{ padding:16 }}>
            <h2 style={{ fontSize:24, fontWeight:900 }}>{finish.name}</h2>
            <p style={{ color:"var(--muted2)" }}>Tribeca • RTA • Quick-ship options available</p>
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
                <div style={{ fontSize:12, color:"var(--muted2)", fontWeight:900, letterSpacing:".08em", textTransform:"uppercase" }}>Unit</div>
                <div style={{ fontSize:22, fontWeight:900 }}>{usd(unit)}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, color:"var(--muted2)", fontWeight:900, letterSpacing:".08em", textTransform:"uppercase" }}>Total</div>
                <div style={{ fontSize:22, fontWeight:900 }}>{usd(total)}</div>
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
   DESIGN CENTER — FULL VERSION
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
      <div style={{ textAlign:"center", fontWeight:900 }}>{name}</div>
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
          <h2 style={{ fontSize:32, fontWeight:900 }}>Design Center — Free 3D Kitchen Design</h2>
          <p>
            If you’re not sure what to order, you’re in the right place. Submit your layout, walls, windows, budget, and style —
            our in-house team will deliver a <b>custom 3D design + cabinet placement</b> before you buy.
          </p>
          <div className="row wrap" style={{ marginTop:10 }}>
            <span className="pill red">Designer response in 24 hours</span>
            <span className="pill">3D render included</span>
            <span className="pill">Nationwide shipping</span>
          </div>
        </div>

        <div className="card soft">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:900 }}>Step {step} of 5</div>
            <div style={{ color:"var(--muted2)", fontSize:13 }}>Auto-saved</div>
          </div>
        </div>

        {/* Step 1 */}
        {step===1 && (
          <div className="card">
            <h3>1) Choose the closest layout</h3>
            <p style={{ color:"var(--muted2)" }}>Pick “Not Sure” if you don’t know — we’ll guide you.</p>
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

        {/* Step 2 */}
        {step===2 && (
          <div className="card">
            <h3>2) Wall sizes (inches)</h3>
            <p style={{ color:"var(--muted2)" }}>Even rough numbers help. Leave blank if unsure — we’ll follow up.</p>

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

        {/* Step 3 */}
        {step===3 && (
          <div className="card">
            <h3>3) Window locations</h3>
            <p style={{ color:"var(--muted2)" }}>Windows are critical — they affect wall cabinet placement.</p>

            <div className="grid" style={{ gap:12, marginTop:12 }}>
              {windows.map((w)=>(
                <div key={w.id} className="card soft">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontWeight:900 }}>Window {w.id}</div>
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

        {/* Step 4 */}
        {step===4 && (
          <div className="card">
            <h3>4) Budget & color direction</h3>

            <div className="grid two-eq" style={{ marginTop:12 }}>
              <div className="card soft">
                <h3 style={{ marginBottom:6 }}>Budget comfort</h3>
                <p style={{ color:"var(--muted2)" }}>Pick a range — we design around it.</p>
                <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))}/>
                <div style={{ fontWeight:900, marginTop:8 }}>{usd(budget)}</div>
              </div>

              <div className="card soft">
                <h3 style={{ marginBottom:6 }}>Color palette</h3>
                <p style={{ color:"var(--muted2)" }}>Classic luxury options.</p>
                <select value={palette} onChange={(e)=>setPalette(e.target.value)}>
                  <option>Snow White + Brass</option>
                  <option>Snow White + Matte Black</option>
                  <option>Two-Tone: White + Warm Oak</option>
                  <option>Two-Tone: White + Deep Walnut</option>
                  <option>All White (bright + timeless)</option>
                </select>
                <div className="row wrap" style={{ marginTop:10 }}>
                  <span className="pill">Classic</span>
                  <span className="pill">Luxury</span>
                  <span className="pill red">Tribeca</span>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(3)}>Back</button>
              <button className="btn btn-primary" type="button" onClick={()=>setStep(5)}>Next</button>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step===5 && (
          <div className="card soft">
            <h3>5) Submit your free design request</h3>
            <p style={{ maxWidth:900 }}>
              After you submit, our <b>professional in-house design team</b> will create a <b>custom 3D design</b> of your kitchen.
              You’ll receive realistic <b>3D renderings</b>, cabinet placement guidance, and expert recommendations — completely free.
            </p>

            <div className="row wrap" style={{ marginTop:10 }}>
              <span className="pill red">Designer response within 24 hours</span>
              <span className="pill">3D render delivered</span>
              <span className="pill">Cabinet list + quote</span>
            </div>

            <div className="grid two-eq" style={{ marginTop:12 }}>
              <div><label>Name</label><input value={contact.name} onChange={(e)=>setContact(c=>({...c,name:e.target.value}))} /></div>
              <div><label>Email</label><input value={contact.email} onChange={(e)=>setContact(c=>({...c,email:e.target.value}))} /></div>
              <div><label>Phone</label><input value={contact.phone} onChange={(e)=>setContact(c=>({...c,phone:e.target.value}))} /></div>
              <div><label>Notes</label><input value={contact.notes} onChange={(e)=>setContact(c=>({...c,notes:e.target.value}))} placeholder="timeline, preferences, address (optional)" /></div>
            </div>

            <div className="row wrap" style={{ marginTop:12 }}>
              <button className="btn btn-primary" type="button">Request Free Design Help</button>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(1)}>Start Over</button>
              <a className="btn btn-outline" href="#/shop">Go to Shop</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================
   LEARNING / GALLERY / CONTACT / CART / FOOTER
   ============================ */
function Learn(){
  const [tab, setTab] = useState("faq");
  const tabs = [
    ["faq","FAQs"],["measure","How to Measure"],["design","Design Process"],
    ["assembly","Assembly"],["shipping","Shipping"],["returns","Returns"],
    ["care","Care"],["warranty","Warranty"]
  ];
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Learning Center</h2>
        <p>Simple guides so customers don’t feel lost.</p>

        <div className="tab-list" role="tablist" style={{ marginTop:12 }}>
          {tabs.map(([k,l])=>(
            <button key={k} className="tab-btn" aria-selected={tab===k} onClick={()=>setTab(k)} type="button">{l}</button>
          ))}
        </div>

        <div style={{ marginTop:12 }}>
          {tab==="faq" && <div className="card"><h3>FAQs</h3><p>We help you pick sizes, fillers, and finish details — no guesswork.</p></div>}
          {tab==="measure" && <div className="card"><h3>How to Measure</h3><p>Sketch walls A/B/C, mark windows, then measure lengths and ceiling height.</p></div>}
          {tab==="design" && <div className="card"><h3>Design Process</h3><p>Submit → Review → 3D layout → cabinet list → itemized quote.</p></div>}
          {tab==="assembly" && <div className="card"><h3>Assembly</h3><p>RTA ships flat with labeled boxes, hardware, and instructions.</p></div>}
          {tab==="shipping" && <div className="card"><h3>Shipping</h3><p>Freight delivery options available. Inspect boxes before signing.</p></div>}
          {tab==="returns" && <div className="card"><h3>Returns</h3><p>Policies vary by order type. Contact us before returning anything.</p></div>}
          {tab==="care" && <div className="card"><h3>Care</h3><p>Soft cloth + mild soap. Avoid abrasives and harsh chemicals.</p></div>}
          {tab==="warranty" && <div className="card"><h3>Warranty</h3><p>Warranty terms provided with your quote/order confirmation.</p></div>}
        </div>
      </div>
    </section>
  );
}

function Gallery(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Gallery</h2>
        <p>Upload project photos later — premium placeholder grid for now.</p>
        <div className="grid three-col" style={{ marginTop:12 }}>
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} className="card soft" style={{ padding:0, aspectRatio:"4/3" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Contact</h2>
        <p>Staten Island, NY — Warehouse & Showroom</p>
        <p><b>Phone:</b> 800-PREMIER • <b>Email:</b> hello@premierrtacabinetry.com</p>
      </div>
    </section>
  );
}

function Cart({ cart, onRemove, onClear }){
  const subtotal = cart.reduce((s,it)=>s + it.unitPrice * it.qty, 0);
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Your Cart</h2>

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

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12, fontSize:18, fontWeight:900 }}>
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
        © {new Date().getFullYear()} Premier RTA Cabinetry • Staten Island, NY
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
