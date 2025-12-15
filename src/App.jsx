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

const TRIBECA_IMAGE =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1400&auto=format&fit=crop";

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
  // fallback
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
            <text x="0" y="68" fontFamily="ui-serif, Georgia" fontWeight="800" fontSize="58" fill="var(--text)">Premier</text>
            <text x="290" y="68" fontFamily="ui-sans-serif, system-ui" fontWeight="900" fontSize="52" fill="var(--primary)">RTA</text>
            <text x="420" y="68" fontFamily="ui-serif, Georgia" fontWeight="700" fontSize="44" fill="var(--text)">Cabinetry</text>
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
  return (
    <section className="section" style={{ background:"linear-gradient(to bottom right, var(--bg), var(--subtle))" }}>
      <div className="container" style={{ display:"grid", gridTemplateColumns:"1.1fr .9fr", gap:20, alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:36, fontWeight:900 }}>Luxury Kitchens, Professionally Designed</h1>
          <p>Based in <b>Staten Island</b> with 20+ years of experience. Nationwide shipping. Concierge-level design help.</p>
          <p><b>Free 3D Design:</b> Submit your room details and our in-house team creates a custom 3D layout and cabinet placement.</p>
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <a href="#/shop" className="btn btn-primary">Shop Tribeca</a>
            <a href="#/builder" className="btn btn-outline">Start Free Design</a>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
            <span className="pill">Staten Island • Nationwide</span>
            <span className="pill">CNC Precision • Pro Quality</span>
            <span className="pill red">Designer-Led</span>
          </div>
        </div>
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={TRIBECA_IMAGE} alt="Kitchen" style={{ width:"100%", height:360, objectFit:"cover" }} />
        </div>
      </div>
    </section>
  );
}

/* ============================
   SHOP (TABS + FINISH OPTIONS)
   ============================ */
function Shop() {
  const [activeTab, setActiveTab] = useState("Hudson");
  const tabObj = TRIBECA_FINISH_TABS.find(t => t.tab === activeTab) || TRIBECA_FINISH_TABS[0];

  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Shop — Tribeca Finishes</h2>
        <p>Select a finish family, then choose your finish. All finishes use the same base cabinet SKU set.</p>

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

        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", marginTop:16 }}>
          {tabObj.finishes.map(f => (
            <div key={f.id} className="card">
              <img src={TRIBECA_IMAGE} alt={f.name} style={{ width:"100%", height:180, objectFit:"cover", borderRadius:12 }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                <div style={{ fontWeight:900 }}>{f.name}</div>
                <span className="pill red">Tribeca</span>
              </div>
              <p>RTA • Nationwide shipping • Build an itemized quote by selecting SKUs.</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                <div style={{ fontWeight:900 }}>From selection</div>
                <a href={`#/shop/${f.id}`} className="btn btn-primary">Configure</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CONFIGURATOR (USES FINISH ID)
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
      <div className="container" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={TRIBECA_IMAGE} alt={finish.name} style={{ width:"100%", height:360, objectFit:"cover" }}/>
          <div style={{ padding:14 }}>
            <h2 style={{ fontSize:24, fontWeight:900 }}>{finish.name}</h2>
            <p>Tribeca cabinetry • Ships flat with hardware and instructions.</p>
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
            <a href="#/shop" className="btn btn-outline">Back</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   DESIGN CENTER (kept simple here)
   ============================ */
function DesignCenter() {
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Design Center — Free 3D Kitchen Design</h2>
        <p>Submit your room details and our professional team will deliver a custom 3D design + cabinet placement, free.</p>
        <div style={{ display:"flex", gap:10, marginTop:12 }}>
          <a className="btn btn-primary" href="#/contact">Request Free Design</a>
          <a className="btn btn-outline" href="#/shop">Shop Tribeca</a>
        </div>
      </div>
    </section>
  );
}

/* ============================
   LEARN / GALLERY / CONTACT
   ============================ */
function Learn(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Learning</h2>
        <p>Guides and tips for measuring, ordering, delivery, assembly, and care.</p>
      </div>
    </section>
  );
}

function Gallery(){
  return (
    <section className="section">
      <div className="container">
        <h2 style={{ fontSize:28, fontWeight:900 }}>Gallery</h2>
        <p>Project gallery coming soon.</p>
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

/* ============================
   CART
   ============================ */
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
        <Header dark={dark} onToggleDark={()=>setDark(!dark)} cartCount={cart.reduce((s,it)=>s+it.qty,0)} />

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
