import React, { useEffect, useMemo, useState } from "react";

/* ============================
   CONFIG YOU EDIT (2 things)
   ============================ */

// 1) Stripe payment link (create in Stripe -> Payment Links)
const STRIPE_PAYMENT_LINK = "PASTE_YOUR_STRIPE_PAYMENT_LINK_HERE";

// 2) Finish images: copy image address from tribecacabinetry.com and paste
const FINISH_IMAGES = {
  "hudson-snow-white": "PASTE_IMAGE_URL",
  "hudson-cloud-white": "PASTE_IMAGE_URL",
  "hudson-hearthstone": "PASTE_IMAGE_URL",
  "hudson-white-rift-oak": "PASTE_IMAGE_URL",
  "hudson-cashew": "PASTE_IMAGE_URL",

  "soho-snow-white": "PASTE_IMAGE_URL",
  "soho-empire-blue": "PASTE_IMAGE_URL",

  "southampton-snow-white": "PASTE_IMAGE_URL",
  "southampton-white-rift-oak": "PASTE_IMAGE_URL",
  "southampton-carbon-black-oak": "PASTE_IMAGE_URL",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1800&auto=format&fit=crop";

/* ============================
   GLOBAL STYLES — Old-money luxury
   (not too dark, not cartoon)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#1a1b1f;          /* softer charcoal */
        --bg2:#202126;         /* section tint */
        --card:#24252b;        /* surface */
        --card2:#2a2b33;       /* surface alt */
        --text:#f4f4f6;        /* warm white */
        --muted:#c9c9d2;
        --muted2:#a7a7b5;

        --primary:#e20b2f;     /* bright luxury red */
        --border: rgba(255,255,255,.10);
        --shadow: 0 24px 70px rgba(0,0,0,.45);
        --ring: rgba(226,11,47,.28);
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

      /* Type: classic, not bold/cartoon */
      h1,h2,h3{
        font-family: ui-serif, Georgia, "Times New Roman", Times, serif;
        letter-spacing:-0.015em;
        line-height:1.14;
        margin:0 0 10px;
        font-weight: 600;
      }
      p{
        margin:10px 0;
        line-height:1.65;
        color:var(--muted);
        font-weight: 400;
      }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section.section{ padding:48px 0; }
      @media (max-width: 900px){
        section.section{ padding:34px 0; }
      }

      header{
        position:sticky; top:0; z-index:50;
        background: rgba(26,27,31,.80);
        backdrop-filter: blur(10px);
        border-bottom:1px solid var(--border);
      }

      nav a{
        font-size:11px;
        font-weight:600;
        letter-spacing:.18em;
        text-transform:uppercase;
        padding:8px 10px;
        border-radius:12px;
        color:var(--text);
        opacity:.92;
      }
      nav a:hover{ background: rgba(255,255,255,.05); opacity:1; }

      /* Cards */
      .card{
        background: var(--card);
        border: 1px solid var(--border);
        border-radius:18px;
        padding:18px;
        box-shadow: 0 1px 0 rgba(0,0,0,.20);
      }
      .card.soft{ background: var(--card2); }
      .shadow{ box-shadow: var(--shadow); }

      /* Buttons: subtle, premium */
      .btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        padding:11px 16px;
        border-radius:14px;
        border:1px solid transparent;
        cursor:pointer;
        font-weight:600;
        letter-spacing:.02em;
        transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease, border-color .12s ease;
        user-select:none;
      }
      .btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
      .btn:active{ transform: translateY(0px); box-shadow:none; }

      .btn-primary{
        background: var(--primary);
        color:#fff;
      }
      .btn-outline{
        background: transparent;
        border-color: var(--border);
        color: var(--text);
      }

      /* Inputs */
      label{
        font-size:11px;
        font-weight:600;
        letter-spacing:.18em;
        text-transform:uppercase;
        color:var(--muted2);
        display:block;
        margin:12px 0 6px;
      }
      input,select,textarea{
        width:100%;
        padding:11px 12px;
        border-radius:14px;
        border:1px solid var(--border);
        background: rgba(255,255,255,.04);
        color:var(--text);
        outline:none;
      }
      input:focus,select:focus,textarea:focus{
        border-color: var(--primary);
        box-shadow: 0 0 0 4px var(--ring);
      }

      /* Layout helpers */
      .grid{ display:grid; gap:16px; }
      .two{ grid-template-columns: 1fr 1fr; }
      .three{ grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 900px){
        .two,.three{ grid-template-columns:1fr; }
      }
      .row{ display:flex; gap:12px; flex-wrap:wrap; }

      /* Pills */
      .pill{
        display:inline-flex;
        align-items:center;
        padding:6px 10px;
        border-radius:999px;
        font-size:12px;
        border:1px solid var(--border);
        background: rgba(255,255,255,.04);
        color: var(--text);
        font-weight: 600;
      }
      .pill.red{ background: var(--primary); border-color: transparent; }

      /* Finish card */
      .finish-img{
        border-radius:16px;
        overflow:hidden;
        border:1px solid var(--border);
        background: rgba(255,255,255,.03);
      }
      .finish-img img{ width:100%; height:180px; object-fit:cover; }

      /* Table */
      table{ width:100%; border-collapse:collapse; }
      th,td{ padding:10px 12px; border-bottom:1px solid var(--border); }
      th{ color:var(--muted2); font-size:11px; letter-spacing:.18em; text-transform:uppercase; font-weight:600; }

      /* Section headers */
      .kicker{
        font-size:11px;
        letter-spacing:.22em;
        text-transform:uppercase;
        color:var(--muted2);
        font-weight:600;
      }
    `}</style>
  );
}

/* ============================
   DATA
   ============================ */
const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

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

function getFinishImage(id) {
  const url = FINISH_IMAGES[id];
  if (!url || url === "PASTE_IMAGE_URL") return FALLBACK_IMAGE;
  return url;
}

/* ============================
   BRAND HEADER
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
  return (
    <header>
      <div className="container" style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", flexWrap:"wrap" }}>
        <a href="#top"><Logo /></a>
        <nav style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <a href="#shop">Shop</a>
          <a href="#design">Design Center</a>
          <a href="#learning">Learning</a>
          <a href="#gallery">Gallery</a>
          <a href="#cart">Cart ({cartCount})</a>
          <a href="#contact">Contact</a>
        </nav>
        <div style={{ marginLeft:"auto" }}>
          <a className="btn btn-primary" href="#cart">Checkout</a>
        </div>
      </div>
    </header>
  );
}

/* ============================
   HOME (scaled correctly)
   ============================ */
function HomeHero() {
  return (
    <section className="section" id="top" style={{ background:"linear-gradient(135deg, rgba(255,255,255,.04), rgba(255,255,255,0))" }}>
      <div className="container grid two" style={{ alignItems:"center" }}>
        <div>
          <div className="kicker">Classic Luxury • Designer Led</div>
          <h1 style={{ fontSize:42, marginTop:10 }}>Cabinetry that feels like a private showroom.</h1>
          <p>
            We design and ship Tribeca cabinetry nationwide. If you’re overwhelmed, our team makes it simple—
            with a free 3D kitchen design, cabinet placement, and an itemized list before you buy.
          </p>
          <div className="row" style={{ marginTop:14 }}>
            <a className="btn btn-primary" href="#shop">Browse Finishes</a>
            <a className="btn btn-outline" href="#design">Start Free 3D Design</a>
          </div>
          <div className="row" style={{ marginTop:14 }}>
            <span className="pill">Nationwide Shipping</span>
            <span className="pill">20+ Years Experience</span>
            <span className="pill red">Free 3D Render</span>
          </div>
        </div>

        <div className="card shadow" style={{ padding:0, overflow:"hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1800&auto=format&fit=crop"
            alt="Luxury kitchen"
            style={{ width:"100%", height:"min(520px, 70vh)", objectFit:"cover" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ============================
   SHOP — All finishes on ONE PAGE + inline configurator + cart + checkout
   ============================ */
function ShopSection({ onAddToCart, selectedFinishId, setSelectedFinishId }) {
  const selectedFinish = useMemo(() => {
    for (const g of FINISH_GROUPS) {
      const f = g.finishes.find(x => x.id === selectedFinishId);
      if (f) return { ...f, group: g.group };
    }
    return { ...FINISH_GROUPS[0].finishes[0], group: FINISH_GROUPS[0].group };
  }, [selectedFinishId]);

  const [sku, setSku] = useState("B12R");
  const [qty, setQty] = useState(1);
  const [assembly, setAssembly] = useState("rta");

  const chosen = useMemo(() => CABINET_SKUS.find(s => s.sku === sku), [sku]);
  const unit = (chosen?.price || 0) + (assembly === "assembled" ? 99 : 0);
  const total = unit * qty;

  return (
    <section className="section" id="shop">
      <div className="container">
        <div className="kicker">Shop</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Tribeca Finishes</h2>
        <p>All collections below. Choose a finish and build your SKU list without leaving the page.</p>

        {/* Finish grid */}
        {FINISH_GROUPS.map(group => (
          <div key={group.group} style={{ marginTop:20 }}>
            <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
              <h3 style={{ margin:0 }}>{group.group}</h3>
              <span className="pill">Tribeca Collection</span>
            </div>

            <div className="grid three" style={{ marginTop:12 }}>
              {group.finishes.map(f => {
                const active = f.id === selectedFinishId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFinishId(f.id)}
                    className="card"
                    style={{
                      textAlign:"left",
                      cursor:"pointer",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      background: active ? "rgba(225,11,47,.08)" : "var(--card)",
                    }}
                  >
                    <div className="finish-img">
                      <img src={getFinishImage(f.id)} alt={f.name} />
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                      <div style={{ fontWeight:600 }}>{f.name}</div>
                      <span className={active ? "pill red" : "pill"}>{active ? "Selected" : "Select"}</span>
                    </div>
                    <p style={{ color:"var(--muted2)", marginTop:8 }}>
                      RTA • Ships nationwide • Configure SKUs below
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Inline Configurator */}
        <div className="grid two" style={{ marginTop:26, alignItems:"start" }}>
          <div className="card shadow" style={{ padding:0, overflow:"hidden" }}>
            <img
              src={getFinishImage(selectedFinish.id)}
              alt={selectedFinish.name}
              style={{ width:"100%", height:420, objectFit:"cover" }}
            />
            <div style={{ padding:18 }}>
              <div className="kicker">{selectedFinish.group}</div>
              <h3 style={{ fontSize:24, marginTop:10 }}>{selectedFinish.name}</h3>
              <p style={{ color:"var(--muted2)" }}>
                Add SKUs to cart. Checkout is handled through Stripe (Apple Pay / card supported).
              </p>
              <p style={{ color:"var(--muted2)" }}>
                Questions? Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
              </p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize:22 }}>Build Your Cabinet List</h3>

            <label>Cabinet SKU</label>
            <select value={sku} onChange={(e)=>setSku(e.target.value)}>
              {CABINET_SKUS.map(s => (
                <option key={s.sku} value={s.sku}>
                  {s.sku} — {s.name} ({s.width}"W) — {usd(s.price)}
                </option>
              ))}
            </select>

            <div className="grid two" style={{ marginTop:10 }}>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e)=>setQty(Math.max(1, parseInt(e.target.value || "1")))}
                />
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
              <table style={{ marginTop:14 }}>
                <tbody>
                  <tr><th>Width</th><td>{chosen.width}"</td></tr>
                  <tr><th>Height</th><td>{chosen.height}"</td></tr>
                  <tr><th>Depth</th><td>{chosen.depth}"</td></tr>
                  <tr><th>Hinge</th><td>{chosen.hinge}</td></tr>
                </tbody>
              </table>
            )}

            <div className="card soft" style={{ marginTop:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <div className="kicker">Unit</div>
                  <div style={{ fontSize:22, fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif' }}>{usd(unit)}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div className="kicker">Total</div>
                  <div style={{ fontSize:22, fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif' }}>{usd(total)}</div>
                </div>
              </div>
            </div>

            <div className="row" style={{ marginTop:14 }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => onAddToCart({
                  finishId: selectedFinish.id,
                  finishName: selectedFinish.name,
                  sku,
                  qty,
                  assembly,
                  unitPrice: unit
                })}
              >
                Add to Cart
              </button>
              <a className="btn btn-outline" href="#cart">View Cart</a>
            </div>

            <div className="card soft" style={{ marginTop:14 }}>
              <p style={{ margin:0, color:"var(--muted2)" }}>
                Checkout is powered by Stripe. Add items to cart, then click Checkout in Cart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   FUN, SIMPLE DESIGN CENTER (less confusing)
   ============================ */
function DesignCenter() {
  const [mode, setMode] = useState("Quick"); // Quick | Guided
  const [layout, setLayout] = useState("Not Sure");
  const [budget, setBudget] = useState(25000);
  const [style, setStyle] = useState("Classic White + Brass");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name:"", email:"", phone:"" });

  return (
    <section className="section" id="design" style={{ background:"var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Design Center</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Free 3D Design — made easy</h2>
        <p>
          Choose “Quick” if you want it simple, or “Guided” if you want more detail.
          Our pro design team will send a 3D layout and cabinet plan.
        </p>

        <div className="row" style={{ marginTop:14 }}>
          <button className={mode==="Quick" ? "btn btn-primary" : "btn btn-outline"} onClick={()=>setMode("Quick")} type="button">Quick (Recommended)</button>
          <button className={mode==="Guided" ? "btn btn-primary" : "btn btn-outline"} onClick={()=>setMode("Guided")} type="button">Guided</button>
        </div>

        <div className="grid two" style={{ marginTop:18, alignItems:"start" }}>
          <div className="card">
            <h3 style={{ fontSize:22 }}>Your Preferences</h3>

            <label>Layout</label>
            <select value={layout} onChange={(e)=>setLayout(e.target.value)}>
              <option>Not Sure</option>
              <option>L-Shape</option>
              <option>U-Shape</option>
              <option>Galley</option>
              <option>Single Wall</option>
              <option>Island Kitchen</option>
            </select>

            <label>Budget Comfort</label>
            <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))}/>
            <div style={{ marginTop:8, color:"var(--muted)" }}>Target: <b style={{ color:"var(--text)" }}>{usd(budget)}</b></div>

            <label>Style Direction</label>
            <select value={style} onChange={(e)=>setStyle(e.target.value)}>
              <option>Classic White + Brass</option>
              <option>White + Matte Black</option>
              <option>Two-Tone White + Rift Oak</option>
              <option>Warm Neutral + Brass</option>
            </select>

            <label>Notes</label>
            <textarea rows={mode==="Guided" ? 5 : 3} value={notes} onChange={(e)=>setNotes(e.target.value)}
              placeholder={mode==="Guided"
                ? "Walls, windows, ceiling height, sink location, appliances, anything important…"
                : "Any quick notes (optional)…"
              }
            />
          </div>

          <div className="card soft">
            <h3 style={{ fontSize:22 }}>Submit (Free)</h3>
            <p>
              After you submit, our <b style={{ color:"var(--text)" }}>in-house design team</b> will create a
              <b style={{ color:"var(--text)" }}> custom 3D kitchen design</b> and cabinet plan.
            </p>
            <div className="row wrap" style={{ marginTop:10 }}>
              <span className="pill red">24 hour response</span>
              <span className="pill">3D render</span>
              <span className="pill">Cabinet list</span>
            </div>

            <label>Name</label>
            <input value={contact.name} onChange={(e)=>setContact(c=>({...c,name:e.target.value}))} />

            <label>Email</label>
            <input value={contact.email} onChange={(e)=>setContact(c=>({...c,email:e.target.value}))} placeholder="Use your best email" />

            <label>Phone</label>
            <input value={contact.phone} onChange={(e)=>setContact(c=>({...c,phone:e.target.value}))} />

            <div className="row" style={{ marginTop:14 }}>
              <button className="btn btn-primary" type="button">Request Free 3D Design</button>
              <a className="btn btn-outline" href="mailto:premier@premierkm.com">Email Us</a>
            </div>

            <p style={{ color:"var(--muted2)" }}>
              Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   LEARNING (expanded + better)
   ============================ */
function LearningCenter() {
  const items = [
    { title: "What is RTA?", body: "Ready-to-Assemble cabinets ship flat-packed. Easier delivery, easier handling, and fast install. We provide guidance and a cabinet list before purchase." },
    { title: "How to measure your kitchen", body: "Measure wall lengths, ceiling height, and mark windows/doors. Take photos from each corner. If you’re unsure, submit the Design Center and we guide you." },
    { title: "How shipping works (freight)", body: "Most cabinet orders ship via LTL freight. Inspect boxes before signing. We can coordinate delivery windows and guidance." },
    { title: "Assembly & installation", body: "RTA includes hardware and instructions. A mallet, driver, level, and square help. Keep parts organized by wall/run." },
    { title: "Returns / Damages", body: "If anything arrives damaged, notify us quickly with photos. Policies vary by order type. We’ll coordinate replacement parts where applicable." },
  ];
  return (
    <section className="section" id="learning">
      <div className="container">
        <div className="kicker">Learning</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Learning Center</h2>
        <p>Clear answers so customers feel confident before ordering.</p>

        <div className="grid two" style={{ marginTop:14 }}>
          {items.map((it) => (
            <div key={it.title} className="card">
              <h3 style={{ fontSize:18 }}>{it.title}</h3>
              <p style={{ color:"var(--muted2)" }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   GALLERY (with real photos)
   ============================ */
function Gallery() {
  const photos = [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556909172-8c2f041fca1f?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  ];
  return (
    <section className="section" id="gallery" style={{ background:"var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Gallery</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Project Inspiration</h2>
        <p>Luxury references now — replace with your real installs anytime.</p>

        <div className="grid three" style={{ marginTop:14 }}>
          {photos.map((src,i)=>(
            <div key={i} className="card" style={{ padding:0, overflow:"hidden" }}>
              <img src={src} alt="Gallery" style={{ width:"100%", height:240, objectFit:"cover" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CART + CHECKOUT
   ============================ */
function Cart({ cart, onRemove, onClear }) {
  const subtotal = cart.reduce((s,it)=> s + it.unitPrice * it.qty, 0);

  const checkoutUrl = STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== "PASTE_YOUR_STRIPE_PAYMENT_LINK_HERE"
    ? STRIPE_PAYMENT_LINK
    : null;

  return (
    <section className="section" id="cart">
      <div className="container">
        <div className="kicker">Cart</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Your Cart</h2>

        {cart.length === 0 ? (
          <div className="card">
            <p>Your cart is empty. Add SKUs from the Shop section above.</p>
            <a className="btn btn-primary" href="#shop">Go to Shop</a>
          </div>
        ) : (
          <>
            <div className="card" style={{ padding:0, overflow:"hidden", marginTop:14 }}>
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
                  {cart.map(it=>(
                    <tr key={it.key}>
                      <td>{it.finishName}</td>
                      <td>{it.sku}</td>
                      <td>{it.assembly}</td>
                      <td>{it.qty}</td>
                      <td>{usd(it.unitPrice)}</td>
                      <td>{usd(it.unitPrice * it.qty)}</td>
                      <td>
                        <button className="btn btn-outline" type="button" onClick={()=>onRemove(it.key)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12, fontSize:18, color:"var(--text)" }}>
              Subtotal: <span style={{ marginLeft:10, fontFamily:'ui-serif, Georgia, "Times New Roman", Times, serif' }}>{usd(subtotal)}</span>
            </div>

            <div className="row" style={{ justifyContent:"flex-end", marginTop:12 }}>
              <button className="btn btn-outline" type="button" onClick={onClear}>Clear Cart</button>

              {checkoutUrl ? (
                <a className="btn btn-primary" href={checkoutUrl} target="_blank" rel="noreferrer">
                  Checkout (Apple Pay / Card)
                </a>
              ) : (
                <a className="btn btn-primary" href="#contact">
                  Add Stripe Link (required)
                </a>
              )}
            </div>

            {!checkoutUrl && (
              <div className="card soft" style={{ marginTop:14 }}>
                <p style={{ margin:0, color:"var(--muted2)" }}>
                  To enable real checkout (Apple Pay / card), create a Stripe Payment Link and paste it into
                  <b style={{ color:"var(--text)" }}> STRIPE_PAYMENT_LINK</b> at the top of this file.
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
   CONTACT / FOOTER
   ============================ */
function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="kicker">Contact</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Premier RTA Cabinetry</h2>
        <p>Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b></p>
        <p>Phone: 800-PREMIER</p>
        <div className="card soft" style={{ marginTop:14 }}>
          <p style={{ margin:0, color:"var(--muted2)" }}>
            Want QuickBooks syncing? Use Stripe for checkout, then sync payments into QuickBooks Online via Synder/A2X.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", marginTop:20 }}>
      <div className="container" style={{ padding:"20px 0", fontSize:14, color:"var(--muted2)" }}>
        © {new Date().getFullYear()} Premier RTA Cabinetry • premier@premierkm.com
      </div>
    </footer>
  );
}

/* ============================
   ROOT APP (single-page, no confusing routing)
   ============================ */
export default function App() {
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("premier_cart") || "[]"); } catch { return []; }
  });

  const [selectedFinishId, setSelectedFinishId] = useState(DEFAULT_FINISH_ID);

  useEffect(() => {
    localStorage.setItem("premier_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = ({ finishId, finishName, sku, qty, assembly, unitPrice }) => {
    const key = `${finishId}|${sku}|${assembly}`;
    setCart(prev => {
      const idx = prev.findIndex(x => x.key === key);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { key, finishId, finishName, sku, qty, assembly, unitPrice }];
    });
    // scroll to cart
    const el = document.getElementById("cart");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const removeFromCart = (key) => setCart(prev => prev.filter(x => x.key !== key));
  const clearCart = () => setCart([]);

  return (
    <div>
      <GlobalStyles />
      <Header cartCount={cart.reduce((s,it)=>s + it.qty, 0)} />

      <HomeHero />

      <ShopSection
        onAddToCart={addToCart}
        selectedFinishId={selectedFinishId}
        setSelectedFinishId={setSelectedFinishId}
      />

      <DesignCenter />

      <LearningCenter />

      <Gallery />

      <Cart cart={cart} onRemove={removeFromCart} onClear={clearCart} />

      <Contact />

      <Footer />
    </div>
  );
}
