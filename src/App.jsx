import React, { useEffect, useMemo, useState } from "react";

/* ============================
   CONFIG (edit these)
   ============================ */
const STRIPE_PAYMENT_LINK = "PASTE_STRIPE_PAYMENT_LINK_HERE"; // Apple Pay + card

// Paste Tribeca image URLs later if you want (optional). If blank, fallback image shows.
const FINISH_IMAGES = {
  "hudson-snow-white": "https://tribecacabinetry.com/wp-content/uploads/2023/08/Web-doors_1-1-788x1024.jpg",
  "hudson-cloud-white": "",
  "hudson-hearthstone": "",
  "hudson-white-rift-oak": "",
  "hudson-cashew": "",

  "soho-snow-white": "",
  "soho-empire-blue": "",

  "southampton-snow-white": "",
  "southampton-white-rift-oak": "",
  "southampton-carbon-black-oak": "",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1800&auto=format&fit=crop";

/* ============================
   GLOBAL STYLES (classic luxury)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#25262b;
        --bg2:#2c2d33;
        --card:#32343c;
        --card2:#383a45;
        --text:#f5f5f7;
        --muted:#d1d1dc;
        --muted2:#a9a9b8;

        --primary:#e11d48;
        --border: rgba(255,255,255,.12);
        --ring: rgba(225,29,72,.22);
        --shadow: 0 18px 50px rgba(0,0,0,.40);
      }

      html,body{
        margin:0;
        background:var(--bg);
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
        font-weight:600;
        letter-spacing:-0.01em;
        line-height:1.18;
      }
      p{
        margin:10px 0;
        line-height:1.65;
        color:var(--muted);
        font-weight:400;
      }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section.section{ padding:52px 0; }
      @media(max-width:900px){ section.section{ padding:36px 0; } }

      header.sticky{
        position:sticky;
        top:0;
        z-index:40;
        background:rgba(37,38,43,.90);
        backdrop-filter: blur(10px);
        border-bottom:1px solid var(--border);
      }

      nav a{
        font-size:11px;
        letter-spacing:.18em;
        text-transform:uppercase;
        padding:8px 10px;
        border-radius:10px;
        font-weight:600;
        opacity:.92;
      }
      nav a:hover{ background:rgba(255,255,255,.06); opacity:1; }

      .kicker{
        font-size:11px;
        letter-spacing:.22em;
        text-transform:uppercase;
        color:var(--muted2);
        font-weight:600;
      }

      .card{
        background:var(--card);
        border:1px solid var(--border);
        border-radius:16px;
        padding:18px;
      }
      .card.soft{ background:var(--card2); }

      .grid{ display:grid; gap:16px; }
      .two{ grid-template-columns:1fr 1fr; }
      .three{ grid-template-columns:repeat(3,1fr); }
      @media(max-width:900px){ .two,.three{ grid-template-columns:1fr; } }

      .row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; }

      .pill{
        padding:6px 10px;
        border-radius:999px;
        border:1px solid var(--border);
        background: rgba(255,255,255,.04);
        font-size:12px;
        font-weight:600;
      }
      .pill.red{ background:var(--primary); border-color:transparent; color:#fff; }

      .btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        padding:11px 16px;
        border-radius:12px;
        border:1px solid transparent;
        font-weight:600;
        cursor:pointer;
        background:transparent;
        transition: transform .12s ease, box-shadow .12s ease;
      }
      .btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
      .btn:active{ transform: translateY(0px); box-shadow:none; }
      .btn-primary{ background:var(--primary); color:#fff; }
      .btn-outline{ border-color:var(--border); color:var(--text); }

      label{
        font-size:11px;
        letter-spacing:.18em;
        text-transform:uppercase;
        color:var(--muted2);
        font-weight:600;
        display:block;
        margin:12px 0 6px;
      }
      input,select,textarea{
        width:100%;
        padding:11px 12px;
        border-radius:12px;
        border:1px solid var(--border);
        background: rgba(255,255,255,.04);
        color:var(--text);
        outline:none;
      }
      input:focus,select:focus,textarea:focus{
        border-color:var(--primary);
        box-shadow:0 0 0 4px var(--ring);
      }

      table{ width:100%; border-collapse:collapse; }
      th,td{ padding:10px 12px; border-bottom:1px solid var(--border); vertical-align:middle; }
      th{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted2); font-weight:600; }

      .mini{ font-size:13px; color:var(--muted2); line-height:1.6; }
      .finish-img{
        border-radius:14px;
        overflow:hidden;
        border:1px solid var(--border);
        background: rgba(255,255,255,.03);
      }
      .finish-img img{ width:100%; height:180px; object-fit:cover; }
    `}</style>
  );
}

/* ============================
   DATA
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const FINISH_GROUPS = [
  { group:"Hudson", finishes:[
    { id:"hudson-snow-white", name:"Hudson Snow White" },
    { id:"hudson-cloud-white", name:"Hudson Cloud White" },
    { id:"hudson-hearthstone", name:"Hudson Hearthstone" },
    { id:"hudson-white-rift-oak", name:"Hudson White Rift Oak" },
    { id:"hudson-cashew", name:"Hudson Cashew" },
  ]},
  { group:"Soho", finishes:[
    { id:"soho-snow-white", name:"Soho Snow White" },
    { id:"soho-empire-blue", name:"Soho Empire Blue" },
  ]},
  { group:"Southampton", finishes:[
    { id:"southampton-snow-white", name:"Southampton Snow White" },
    { id:"southampton-white-rift-oak", name:"Southampton White Rift Oak" },
    { id:"southampton-carbon-black-oak", name:"Southampton Carbon Black Oak" },
  ]},
];

const BASE_SKUS = [
  { sku:"B12R", width:12, price:225 },
  { sku:"B12L", width:12, price:225 },
  { sku:"B15R", width:15, price:245 },
  { sku:"B15L", width:15, price:245 },
  { sku:"B18R", width:18, price:265 },
  { sku:"B18L", width:18, price:265 },
  { sku:"B21R", width:21, price:285 },
  { sku:"B21L", width:21, price:285 },
  { sku:"B24",  width:24, price:305 },
  { sku:"B27",  width:27, price:325 },
  { sku:"B30",  width:30, price:345 },
  { sku:"B33",  width:33, price:365 },
  { sku:"B36",  width:36, price:385 },
  { sku:"B39",  width:39, price:405 },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909172-8c2f041fca1f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=1400&auto=format&fit=crop",
];

function imgForFinish(id){
  const u = FINISH_IMAGES[id];
  return u && u.trim().length > 0 ? u : FALLBACK_IMAGE;
}

function getFinishById(id){
  for (const g of FINISH_GROUPS){
    for (const f of g.finishes){
      if (f.id === id) return f;
    }
  }
  return FINISH_GROUPS[0].finishes[0];
}

/* ============================
   ROUTER (hash + subroutes)
   ============================ */
function parseRouteFromHash(hash){
  const h = (hash || "").replace(/^#\/?/, "").trim().toLowerCase();
  const parts = h.split("/");
  const first = parts[0] || "home";
  const valid = ["home","shop","design","learn","gallery","cart","contact"];
  return valid.includes(first) ? { route:first, sub: parts[1] } : { route:"home", sub: undefined };
}

/* ============================
   HEADER
   ============================ */
function Logo(){
  return (
    <div style={{ display:"flex", alignItems:"baseline", gap:8, lineHeight:1 }}>
      <span style={{ fontFamily:'Georgia,"Times New Roman",serif', fontWeight:600, fontSize:20 }}>Premier</span>
      <span style={{ fontWeight:600, fontSize:16, color:"var(--primary)", letterSpacing:".14em" }}>RTA</span>
      <span style={{ fontFamily:'Georgia,"Times New Roman",serif', fontWeight:500, fontSize:16, opacity:.95 }}>Cabinetry</span>
    </div>
  );
}

function Header({ cartCount }){
  const links = [
    ["#/home","Home"],
    ["#/shop","Shop"],
    ["#/design","Design Center"],
    ["#/learn","Learning"],
    ["#/gallery","Gallery"],
    ["#/cart",`Cart (${cartCount})`],
    ["#/contact","Contact"],
  ];
  return (
    <header className="sticky">
      <div className="container" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", flexWrap:"wrap" }}>
        <a href="#/home"><Logo/></a>
        <nav style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {links.map(([href,label])=>(
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div style={{ marginLeft:"auto", display:"flex", gap:10 }}>
          <a className="btn btn-outline" href="mailto:premier@premierkm.com">premier@premierkm.com</a>
          <a className="btn btn-primary" href="#/cart">Checkout</a>
        </div>
      </div>
    </header>
  );
}

/* ============================
   PAGES
   ============================ */
function Home(){
  return (
    <section className="section">
      <div className="container grid two" style={{ alignItems:"center" }}>
        <div>
          <div className="pill red">Classic Luxury • Designer Led</div>
          <h1 style={{ fontSize:44, marginTop:12 }}>A calmer way to buy a kitchen.</h1>
          <p>
            Browse Tribeca finishes, configure base cabinet sizes, and order with confidence.
            If you don’t know where to start, our team creates a free 3D layout and cabinet list first.
          </p>
          <div className="row" style={{ marginTop:14 }}>
            <a className="btn btn-primary" href="#/shop">Shop Finishes</a>
            <a className="btn btn-outline" href="#/design">Free 3D Design</a>
          </div>
          <div className="row" style={{ marginTop:14 }}>
            <span className="pill">Nationwide Shipping</span>
            <span className="pill">20+ Years</span>
            <span className="pill">Staten Island Warehouse</span>
          </div>
        </div>
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={GALLERY[0]} alt="Kitchen" style={{ width:"100%", height:"min(520px,70vh)", objectFit:"cover" }} />
        </div>
      </div>
    </section>
  );
}

/** Shop list page (all colors visible, click Configure like before) */
function ShopList(){
  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Shop</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Tribeca Finishes</h2>
        <p>Select a finish to configure SKUs and add to cart.</p>

        {FINISH_GROUPS.map(g=>(
          <div key={g.group} style={{ marginTop:22 }}>
            <div className="row" style={{ justifyContent:"space-between", alignItems:"baseline" }}>
              <h3 style={{ margin:0 }}>{g.group}</h3>
              <span className="pill">Tribeca</span>
            </div>

            <div className="grid three" style={{ marginTop:12 }}>
              {g.finishes.map(f=>(
                <div key={f.id} className="card">
                  <div className="finish-img">
                    <img src={imgForFinish(f.id)} alt={f.name} />
                  </div>
                  <div className="row" style={{ justifyContent:"space-between", marginTop:10 }}>
                    <div style={{ fontWeight:600 }}>{f.name}</div>
                    <span className="pill red">Finish</span>
                  </div>
                  <p className="mini">Click configure to choose base SKUs and add to cart.</p>
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

/** Configurator page (choose SKU/qty/assembly and add to cart) */
function Configurator({ finishId, onAddToCart }){
  const finish = getFinishById(finishId);
  const [qty, setQty] = useState({});
  const [assembly, setAssembly] = useState("rta");

  const qtyFor = (sku) => qty[sku] ?? 1;
  const setQtyFor = (sku,v) => setQty(m=>({ ...m, [sku]: v }));

  return (
    <section className="section">
      <div className="container grid two" style={{ alignItems:"start" }}>
        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img src={imgForFinish(finish.id)} alt={finish.name} style={{ width:"100%", height:420, objectFit:"cover" }} />
          <div style={{ padding:18 }}>
            <div className="kicker">Tribeca Finish</div>
            <h2 style={{ fontSize:28, marginTop:10 }}>{finish.name}</h2>
            <p className="mini">
              Choose your base cabinet sizes. Add to cart. Need a full plan? Use Design Center.
            </p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize:22 }}>Base Cabinets</h3>

          <label>Assembly</label>
          <select value={assembly} onChange={(e)=>setAssembly(e.target.value)}>
            <option value="rta">RTA (unassembled)</option>
            <option value="assembled">Assembled (+$99 add-on later)</option>
          </select>

          <div className="card soft" style={{ marginTop:14, padding:0, overflow:"hidden" }}>
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Width</th>
                  <th>Price</th>
                  <th style={{ width:90 }}>Qty</th>
                  <th style={{ width:120 }}></th>
                </tr>
              </thead>
              <tbody>
                {BASE_SKUS.map(s=>(
                  <tr key={s.sku}>
                    <td>{s.sku}</td>
                    <td>{s.width}"</td>
                    <td>{usd(s.price)}</td>
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={qtyFor(s.sku)}
                        onChange={(e)=>setQtyFor(s.sku, Math.max(1, parseInt(e.target.value||"1")))}
                        style={{ padding:"8px 10px", borderRadius:10 }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={()=>onAddToCart({
                          finishId: finish.id,
                          finishName: finish.name,
                          sku: s.sku,
                          qty: qtyFor(s.sku),
                          unitPrice: s.price,
                          assembly
                        })}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row" style={{ marginTop:14 }}>
            <a className="btn btn-outline" href="#/shop">Back to finishes</a>
            <a className="btn btn-primary" href="#/cart">Go to cart</a>
          </div>

          <div className="card soft" style={{ marginTop:14 }}>
            <p className="mini" style={{ margin:0 }}>
              Questions or want wall/tall cabinets next? Email <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignCenter(){
  const [path, setPath] = useState("Design It For Me");
  const [budget, setBudget] = useState(25000);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name:"", email:"", phone:"" });

  return (
    <section className="section" style={{ background:"var(--subtle)" }}>
      <div className="container grid two">
        <div>
          <div className="kicker">Design Center</div>
          <h2 style={{ fontSize:30, marginTop:10 }}>Free 3D Design</h2>
          <p>Pick a path. We deliver a 3D layout + cabinet list before you buy.</p>
          <div className="row" style={{ marginTop:12 }}>
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
          <div className="card soft" style={{ marginTop:14 }}>
            <p className="mini" style={{ margin:0 }}>
              After you submit, our professional team creates a custom 3D kitchen design + cabinet placement + itemized list — free.
            </p>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize:20 }}>Request (Free)</h3>

          <label>Budget comfort</label>
          <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))} />
          <div className="mini">Target: <b style={{ color:"var(--text)" }}>{usd(budget)}</b></div>

          <label>Name</label>
          <input value={contact.name} onChange={(e)=>setContact(c=>({ ...c, name:e.target.value }))} />

          <label>Email</label>
          <input value={contact.email} onChange={(e)=>setContact(c=>({ ...c, email:e.target.value }))} />

          <label>Phone</label>
          <input value={contact.phone} onChange={(e)=>setContact(c=>({ ...c, phone:e.target.value }))} />

          <label>Notes</label>
          <textarea rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Walls/windows, appliances, timeline…" />

          <div className="row" style={{ marginTop:14 }}>
            <button className="btn btn-primary" type="button">Request Free Design</button>
            <a className="btn btn-outline" href="mailto:premier@premierkm.com">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning(){
  const items = [
    { title:"What is RTA?", body:"Ready-to-Assemble ships flat-packed for easier delivery and handling." },
    { title:"How to measure", body:"Measure wall lengths, ceiling height, and mark windows/doors. Take photos from each corner." },
    { title:"Freight shipping", body:"Most cabinet orders ship LTL freight. Inspect boxes before signing." },
    { title:"Assembly", body:"Hardware/instructions included. A mallet, driver, level, and square help." },
    { title:"Damages/returns", body:"Report issues quickly with photos. Policies vary by order type." },
    { title:"Need help?", body:"Email premier@premierkm.com and we’ll guide you through finish + SKU list." },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Learning</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Learning Center</h2>
        <p>Clear answers so customers feel confident ordering online.</p>

        <div className="grid two" style={{ marginTop:14 }}>
          {items.map(it=>(
            <div key={it.title} className="card">
              <h3 style={{ fontSize:18 }}>{it.title}</h3>
              <p className="mini">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery(){
  return (
    <section className="section" style={{ background:"var(--subtle)" }}>
      <div className="container">
        <div className="kicker">Gallery</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Project Inspiration</h2>
        <p>Luxury placeholders now — replace with your installs anytime.</p>

        <div className="grid three" style={{ marginTop:14 }}>
          {GALLERY.map((src,i)=>(
            <div key={i} className="card" style={{ padding:0, overflow:"hidden" }}>
              <img src={src} alt="Gallery" style={{ width:"100%", height:240, objectFit:"cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cart({ cart, onRemove, onClear }){
  const subtotal = cart.reduce((s,it)=> s + it.unitPrice * it.qty, 0);
  const checkoutOk = STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== "PASTE_STRIPE_PAYMENT_LINK_HERE";

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Cart</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Checkout</h2>

        {cart.length===0 ? (
          <div className="card">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="card" style={{ padding:0, overflow:"hidden", marginTop:14 }}>
              <table>
                <thead>
                  <tr>
                    <th>Finish</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(it=>(
                    <tr key={it.key}>
                      <td>{it.finishName}</td>
                      <td>{it.sku}</td>
                      <td>{it.qty}</td>
                      <td>{usd(it.unitPrice)}</td>
                      <td>{usd(it.unitPrice * it.qty)}</td>
                      <td>
                        <button className="btn btn-outline" type="button" onClick={()=>onRemove(it.key)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12, fontSize:18 }}>
              Subtotal: <span style={{ marginLeft:10, fontFamily:'Georgia,"Times New Roman",serif' }}>{usd(subtotal)}</span>
            </div>

            <div className="row" style={{ justifyContent:"flex-end", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={onClear}>Clear Cart</button>
              {checkoutOk ? (
                <a className="btn btn-primary" href={STRIPE_PAYMENT_LINK} target="_blank" rel="noreferrer">
                  Pay (Apple Pay / Card)
                </a>
              ) : (
                <a className="btn btn-primary" href="mailto:premier@premierkm.com">
                  Checkout Setup Needed
                </a>
              )}
            </div>

            {!checkoutOk && (
              <div className="card soft" style={{ marginTop:14 }}>
                <p className="mini" style={{ margin:0 }}>
                  Paste your Stripe payment link into STRIPE_PAYMENT_LINK at the top of this file.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Contact(){
  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Contact</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Premier RTA Cabinetry</h2>
        <p>Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b></p>
        <p>Phone: 800-PREMIER</p>
      </div>
    </section>
  );
}

/* ============================
   APP
   ============================ */
export default function App(){
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

  const addToCart = ({ finishId, finishName, sku, qty, unitPrice, assembly }) => {
    const key = `${finishId}|${sku}|${assembly}`;
    setCart(prev=>{
      const idx = prev.findIndex(x=>x.key===key);
      if (idx>=0){
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { key, finishId, finishName, sku, qty, unitPrice, assembly }];
    });
    window.location.hash = "/cart";
  };

  const removeFromCart = (key)=>setCart(prev=>prev.filter(x=>x.key!==key));
  const clearCart = ()=>setCart([]);

  return (
    <div>
      <GlobalStyles />
      <Header cartCount={cart.reduce((s,it)=>s+it.qty,0)} />

      {route==="home" && <Home />}
      {route==="shop" && (!sub ? <ShopList /> : <Configurator finishId={sub} onAddToCart={addToCart} />)}
      {route==="design" && <DesignCenter />}
      {route==="learn" && <Learning />}
      {route==="gallery" && <Gallery />}
      {route==="cart" && <Cart cart={cart} onRemove={removeFromCart} onClear={clearCart} />}
      {route==="contact" && <Contact />}
    </div>
  );
}
