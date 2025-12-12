import React, { useEffect, useMemo, useState } from "react";

/* ============================
   GLOBAL STYLES (classic luxury + dark mode)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#ffffff; --text:#0a0a0a; --muted:#4b4b55; --subtle:#f5f3f1; --card:#ffffff;
        --primary:#c8102e; --ring: rgba(200,16,46,.28); --border: rgba(10,10,10,.10);
        --shadow: 0 18px 50px rgba(10,10,10,.08);
      }
      .dark{
        --bg:#0b0b0d; --text:#f5f5f7; --muted:#c8c8d0; --subtle:#141418; --card:#111114;
        --primary:#ff3b57; --ring: rgba(255,59,87,.28); --border: rgba(255,255,255,.10);
        --shadow: 0 22px 60px rgba(0,0,0,.55);
      }
      html,body{margin:0;background:var(--bg);color:var(--text);
        font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
      }
      *,*::before,*::after{box-sizing:border-box;}
      a{color:inherit;text-decoration:none;}
      h1,h2,h3{margin:0 0 10px;line-height:1.12;letter-spacing:-0.02em;
        font-family:ui-serif,Georgia,"Times New Roman",Times,serif;
      }
      p{margin:8px 0;line-height:1.55;color:var(--muted);}
      .container{max-width:1200px;margin:0 auto;padding:0 24px;}
      section.section{padding:44px 0;}
      header.sticky{position:sticky;top:0;z-index:40;
        background:color-mix(in srgb, var(--bg) 86%, transparent);
        backdrop-filter:blur(10px);
        border-bottom:1px solid var(--border);
      }
      label{font-size:12px;font-weight:800;display:block;margin-top:10px;margin-bottom:6px;
        letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);}
      input,select,textarea{width:100%;padding:11px 12px;border-radius:14px;border:1px solid var(--border);
        background:var(--card);color:var(--text);
      }
      input:focus,select:focus,textarea:focus{border-color:var(--primary);box-shadow:0 0 0 4px var(--ring);outline:none;}
      .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:10px 16px;border-radius:14px;
        border:1px solid transparent;cursor:pointer;font-weight:800;letter-spacing:0.02em;
        transition:transform .14s ease, box-shadow .14s ease, background-color .14s ease, color .14s ease, border-color .14s ease;
        user-select:none;
      }
      .btn-primary{background:var(--primary);color:#fff;box-shadow:0 14px 32px rgba(200,16,46,.18);}
      .btn-outline{border-color:var(--border);color:var(--text);background:color-mix(in srgb, var(--card) 92%, transparent);}
      .btn:hover{transform:translateY(-1px);box-shadow:var(--shadow);}
      .btn:active{transform:translateY(0px) scale(0.99);box-shadow:none;}
      .card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:16px;
        box-shadow:0 1px 0 rgba(0,0,0,.03);transition:transform .16s ease, box-shadow .16s ease, border-color .16s ease;}
      .card:hover{transform:translateY(-2px);box-shadow:var(--shadow);}
      .grid{display:grid;gap:16px;}
      .pill{display:inline-flex;align-items:center;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:900;
        letter-spacing:0.02em;background:color-mix(in srgb, var(--subtle) 92%, transparent);border:1px solid var(--border);color:var(--text);}
      .pill.red{background:var(--primary);border-color:transparent;color:#fff;}
      table{width:100%;border-collapse:collapse;}
      th,td{padding:10px 12px;border-bottom:1px solid var(--border);text-align:left;}
      nav a{padding:6px 10px;border-radius:12px;transition:background-color .14s ease,transform .14s ease;}
      nav a:hover{background:color-mix(in srgb, var(--subtle) 85%, transparent);transform:translateY(-1px);}
      .tabs{margin-top:12px;}
      .tab-list{display:inline-flex;gap:10px;background:color-mix(in srgb, var(--subtle) 92%, transparent);
        padding:6px;border-radius:14px;flex-wrap:wrap;border:1px solid var(--border);}
      .tab-btn{padding:9px 14px;border-radius:12px;line-height:1;font-weight:900;border:1px solid transparent;background:transparent;color:var(--text);cursor:pointer;}
      .tab-btn:hover{transform:translateY(-1px);background:color-mix(in srgb, var(--card) 85%, transparent);border-color:var(--border);}
      .tab-btn[aria-selected="true"]{background:var(--primary);color:#fff;}
    `}</style>
  );
}

/* ============================
   DATA
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const LINE = {
  id: "tribeca-snow-white",
  name: "Tribeca Snow White",
  quickShip: true,
  finish: "Matte",
  door: "Shaker",
  image:
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1400&auto=format&fit=crop",
  leadTime: "2–5 biz days",
};

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
   HEADER
   ============================ */
function Header({ dark, onToggleDark, cartCount }) {
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
      <div className="container" style={{ display:"flex", alignItems:"center", gap:18, padding:"12px 0" }}>
        <a href="#/home" aria-label="Home" style={{ display:"flex", alignItems:"center" }}>
          <svg width="360" height="54" viewBox="0 0 620 100" role="img" aria-label="Premier RTA Cabinetry">
            <text x="0" y="68" fontFamily='ui-serif, Georgia' fontWeight="800" fontSize="58" fill="var(--text)">Premier</text>
            <text x="290" y="68" fontFamily='ui-sans-serif, system-ui' fontWeight="900" fontSize="52" fill="var(--primary)">RTA</text>
            <text x="420" y="68" fontFamily='ui-serif, Georgia' fontWeight="700" fontSize="44" fill="var(--text)">Cabinetry</text>
          </svg>
        </a>

        <nav style={{ display:"flex", gap:12, fontSize:13, fontWeight:900, letterSpacing:"0.04em", textTransform:"uppercase" }}>
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
          <a className="btn btn-outline" href="tel:18007736437">Call</a>
          <a href="#/cart" className="btn btn-primary">Cart ({cartCount})</a>
          <button className="btn btn-outline" onClick={onToggleDark} type="button">
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================
   HOME
   ============================ */
function Home() {
  const imgs = [
    LINE.image,
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1400&auto=format&fit=crop",
  ];
  return (
    <section className="section" style={{ background:"linear-gradient(to bottom right, var(--bg), var(--subtle))" }}>
      <div className="container" style={{ display:"grid", gridTemplateColumns:"1.1fr .9fr", gap:20, alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:36, fontWeight:900 }}>Luxury Kitchens, Professionally Designed</h1>
          <p>Based in <b>Staten Island</b> with 20+ years of experience. Nationwide shipping. Concierge-level design help.</p>
          <p><b>Free 3D Design:</b> Submit your room details and our in-house team creates a custom 3D layout and cabinet placement.</p>
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <a href="#/shop" className="btn btn-primary">Shop Tribeca Snow White</a>
            <a href="#/builder" className="btn btn-outline">Start Free Design</a>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
            <span className="pill">Staten Island • Nationwide</span>
            <span className="pill">CNC Precision • Pro Quality</span>
            <span className="pill red">Designer-Led</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateRows:"repeat(3, 1fr)", gap:10 }}>
          {imgs.map((src,i)=>(
            <div key={i} className="card" style={{ padding:0, overflow:"hidden" }}>
              <img src={src} alt="project" style={{ width:"100%", height:150, objectFit:"cover" }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   SHOP + CONFIGURATOR
   ============================ */
function Shop() {
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Shop</h2>
        <p><b>{LINE.name}</b> — Matte Snow White Shaker. Select SKUs to price your order.</p>

        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", marginTop:16 }}>
          <div className="card">
            <img src={LINE.image} alt={LINE.name} style={{ width:"100%", height:180, objectFit:"cover", borderRadius:12 }}/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              <div style={{ fontWeight:900 }}>{LINE.name}</div>
              <span className="pill red">Quick-Ship</span>
            </div>
            <p>Finish: {LINE.finish} • Door: {LINE.door} • Lead time: {LINE.leadTime}</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              <div style={{ fontWeight:900 }}>From selection</div>
              <a href={`#/shop/${LINE.id}`} className="btn btn-primary">Configure</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Configurator({ onAddToCart }) {
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
      <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={LINE.image} alt={LINE.name} style={{ width:"100%", height:360, objectFit:"cover" }}/>
          <div style={{ padding:14 }}>
            <h2 style={{ fontSize:24, fontWeight:900 }}>{LINE.name}</h2>
            <p>Ships flat in labeled boxes. Hardware, cams & instructions included.</p>
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

          <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", marginTop:8 }}>
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
            <table style={{ marginTop:10, fontSize:14 }}>
              <tbody>
                <tr><th>Width</th><td>{chosen.width}"</td></tr>
                <tr><th>Height</th><td>{chosen.height}"</td></tr>
                <tr><th>Depth</th><td>{chosen.depth}"</td></tr>
                <tr><th>Hinge</th><td>{chosen.hinge}</td></tr>
              </tbody>
            </table>
          )}

          <div className="card" style={{ background:"var(--subtle)", marginTop:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:12, color:"var(--muted)" }}>Unit</div>
                <div style={{ fontSize:22, fontWeight:900 }}>{usd(unit)}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, color:"var(--muted)" }}>Total</div>
                <div style={{ fontSize:22, fontWeight:900 }}>{usd(total)}</div>
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:12 }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => onAddToCart({ sku, qty, assembly, unitPrice: unit })}
            >
              Add to Cart
            </button>
            <a href="#/shop" className="btn btn-outline">Back</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   DESIGN CENTER (with windows/walls/budget/colors + 3D promise)
   ============================ */
function LayoutCard({ name, selected, onSelect }) {
  return (
    <div className="card" style={{ cursor:"pointer", borderColor: selected ? "var(--primary)" : undefined }} onClick={()=>onSelect(name)}>
      <svg viewBox="0 0 120 80" width="100%" height="90">
        <text x="6" y="10" fontSize="6">B=Base</text>
        <text x="42" y="10" fontSize="6">W=Wall</text>
        <text x="80" y="10" fontSize="6">T=Tall</text>
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
      <p style={{ fontSize:12, textAlign:"center" }}>Typical cabinet placement</p>
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
    try { localStorage.setItem("design_center_progress", JSON.stringify({ step, layout, walls, windows, budget, palette, contact })); } catch {}
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
          <p>Answer a few questions and our professional in-house team will deliver a <b>custom 3D design</b>, cabinet placement, and recommendations — free.</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:8 }}>
            <span className="pill red">Free Design • No Pressure</span>
            <span className="pill">Response in 24 Hours</span>
            <span className="pill">3D Render Included</span>
          </div>
        </div>

        <div className="card" style={{ background:"var(--subtle)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontWeight:900 }}>Step {step} of 5</div>
            <div style={{ color:"var(--muted)", fontSize:13 }}>Auto-saves</div>
          </div>
        </div>

        {step===1 && (
          <div className="card">
            <h3>1) Pick the closest layout</h3>
            <div className="grid" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
              {["Not Sure","L-Shape","U-Shape","Galley","Single Wall","Island Kitchen"].map((l)=>(
                l==="Not Sure"
                  ? <button key={l} className={`btn ${layout===l?"btn-primary":"btn-outline"}`} onClick={()=>setLayout(l)}>Not Sure — Help Me</button>
                  : <LayoutCard key={l} name={l} selected={layout===l} onSelect={setLayout} />
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
              <div><label>Wall A</label><input value={walls.wallA} onChange={(e)=>updateWall("wallA",e.target.value)} placeholder="192"/></div>
              <div><label>Wall B</label><input value={walls.wallB} onChange={(e)=>updateWall("wallB",e.target.value)} placeholder="120"/></div>
              <div><label>Wall C</label><input value={walls.wallC} onChange={(e)=>updateWall("wallC",e.target.value)} placeholder="optional"/></div>
              <div><label>Ceiling</label><input value={walls.ceiling} onChange={(e)=>updateWall("ceiling",e.target.value)} placeholder="108"/></div>
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
            <p>Windows affect where wall cabinets can go. Add each window you have.</p>
            <div className="grid" style={{ gap:12 }}>
              {windows.map((w)=>(
                <div key={w.id} className="card">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ fontWeight:900 }}>Window {w.id}</div>
                    <button className="btn btn-outline" type="button" onClick={()=>removeWindow(w.id)}>Remove</button>
                  </div>
                  <div className="grid" style={{ gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:8 }}>
                    <div>
                      <label>Wall</label>
                      <select value={w.wall} onChange={(e)=>updateWindow(w.id,{ wall:e.target.value })}>
                        <option value="A">Wall A</option>
                        <option value="B">Wall B</option>
                        <option value="C">Wall C</option>
                      </select>
                    </div>
                    <div><label>Width</label><input value={w.width} onChange={(e)=>updateWindow(w.id,{ width:e.target.value })} placeholder="36"/></div>
                    <div><label>Height</label><input value={w.height} onChange={(e)=>updateWindow(w.id,{ height:e.target.value })} placeholder="48"/></div>
                    <div><label>Sill</label><input value={w.sill} onChange={(e)=>updateWindow(w.id,{ sill:e.target.value })} placeholder="from floor"/></div>
                  </div>
                  <div style={{ marginTop:10 }}>
                    <label>Offset from left corner</label>
                    <input value={w.offset} onChange={(e)=>updateWindow(w.id,{ offset:e.target.value })} placeholder="distance from left corner"/>
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
            <div className="grid" style={{ gridTemplateColumns:"1fr 1fr" }}>
              <div className="card" style={{ background:"var(--subtle)" }}>
                <h3 style={{ marginBottom:6 }}>Budget comfort</h3>
                <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))}/>
                <div style={{ fontWeight:900, marginTop:8 }}>{usd(budget)}</div>
              </div>
              <div className="card" style={{ background:"var(--subtle)" }}>
                <h3 style={{ marginBottom:6 }}>Color palette</h3>
                <select value={palette} onChange={(e)=>setPalette(e.target.value)}>
                  <option>Snow White + Brass</option>
                  <option>Snow White + Matte Black</option>
                  <option>Two-Tone: White + Warm Oak</option>
                  <option>Two-Tone: White + Deep Walnut</option>
                  <option>All White (clean + bright)</option>
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
          <div className="card" style={{ background:"var(--subtle)" }}>
            <h3>5) Submit your free design request</h3>
            <p style={{ maxWidth:760 }}>
              After you submit, our <b>professional in-house design team</b> will create a <b>custom 3D design</b> of your kitchen.
              You’ll receive realistic <b>3D renderings</b>, cabinet placement guidance, and expert recommendations — completely free.
            </p>

            <div className="grid" style={{ gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label>Name</label><input value={contact.name} onChange={(e)=>setContact(c=>({...c,name:e.target.value}))} /></div>
              <div><label>Email</label><input value={contact.email} onChange={(e)=>setContact(c=>({...c,email:e.target.value}))} /></div>
              <div><label>Phone</label><input value={contact.phone} onChange={(e)=>setContact(c=>({...c,phone:e.target.value}))} /></div>
              <div><label>Notes</label><input value={contact.notes} onChange={(e)=>setContact(c=>({...c,notes:e.target.value}))} placeholder="timeline, preferences, etc."/></div>
            </div>

            <div style={{ display:"flex", gap:10, marginTop:12 }}>
              <button className="btn btn-primary" type="button">Request Free Design Help</button>
              <button className="btn btn-outline" type="button" onClick={()=>setStep(1)}>Start Over</button>
              <a className="btn btn-outline" href="#/shop">View Shop</a>
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
    ["faq","FAQs"],["measure","How to Measure"],["design","Free Design Process"],
    ["assembly","Assembly"],["shipping","Shipping & Delivery"],["returns","Returns & Damages"],
    ["care","Care & Cleaning"],["warranty","Warranty"]
  ];
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Learning Center</h2>
        <p>Guides and tips for measuring, ordering, delivery, assembly, and care.</p>
        <div className="tabs">
          <div className="tab-list" role="tablist">
            {tabs.map(([k,l])=>(
              <button key={k} className="tab-btn" aria-selected={tab===k} onClick={()=>setTab(k)}>{l}</button>
            ))}
          </div>
          <div style={{ marginTop:12 }}>
            {tab==="faq" && <div className="card"><h3>FAQs</h3><p>Ask us anything — we guide you start to finish.</p></div>}
            {tab==="measure" && <div className="card"><h3>How to Measure</h3><p>Sketch walls A/B/C, mark windows & doors, then measure lengths and heights.</p></div>}
            {tab==="design" && <div className="card"><h3>Free Design Process</h3><p>Submit → Review → 3D layout → Cabinet list → Quote.</p></div>}
            {tab==="assembly" && <div className="card"><h3>Assembly</h3><p>RTA ships flat with hardware and instructions.</p></div>}
            {tab==="shipping" && <div className="card"><h3>Shipping</h3><p>Freight delivery options available. Inspect boxes before signing.</p></div>}
            {tab==="returns" && <div className="card"><h3>Returns</h3><p>Policies vary by order type. Contact us before returning anything.</p></div>}
            {tab==="care" && <div className="card"><h3>Care</h3><p>Soft cloth + mild soap. Avoid abrasives and harsh chemicals.</p></div>}
            {tab==="warranty" && <div className="card"><h3>Warranty</h3><p>Warranty terms provided with your quote/order confirmation.</p></div>}
          </div>
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
        <p>Upload your project photos later — placeholder grid for now.</p>
        <div className="grid" style={{ gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginTop:12 }}>
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} className="card" style={{ padding:0, aspectRatio:"4/3", background:"var(--subtle)" }} />
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
        <p>Phone: 800-PREMIER • Email: hello@premierrtacabinetry.com</p>
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
                  <tr><th>SKU</th><th>Assembly</th><th>Qty</th><th>Unit</th><th>Total</th><th></th></tr>
                </thead>
                <tbody>
                  {cart.map((it)=>(
                    <tr key={it.key}>
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
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={onClear}>Clear Cart</button>
              <button className="btn btn-primary" type="button">Checkout (stub)</button>
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
      <div className="container" style={{ padding:"20px 0", fontSize:14, color:"var(--muted)" }}>
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
          <pre style={{ whiteSpace:"pre-wrap", fontSize:12 }}>{String(this.state.err)}</pre>
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
  const [dark, setDark] = useState(() => (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches));
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

  useEffect(()=>{ document.body.classList.toggle("dark", dark); },[dark]);
  useEffect(()=>{ localStorage.setItem("premier_cart", JSON.stringify(cart)); },[cart]);

  const { route, sub } = parseRouteFromHash(hash);

  const addToCart = ({ sku, qty, assembly, unitPrice }) => {
    const key = `${LINE.id}|${sku}|${assembly}`;
    setCart(prev=>{
      const idx = prev.findIndex(x=>x.key===key);
      if (idx>=0){
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { key, sku, qty, assembly, unitPrice }];
    });
    window.location.hash = "/cart";
  };

  const removeFromCart = (key)=>setCart(prev=>prev.filter(x=>x.key!==key));
  const clearCart = ()=>setCart([]);

  return (
    <div>
      <GlobalStyles />
      <ErrorBoundary>
        <Header dark={dark} onToggleDark={()=>setDark(!dark)} cartCount={cart.reduce((s,it)=>s+it.qty,0)} />
        {route==="home" && <Home />}
        {route==="shop" && (!sub ? <Shop /> : <Configurator onAddToCart={addToCart} />)}
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
