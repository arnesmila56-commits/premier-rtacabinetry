import React, { useEffect, useMemo, useState } from "react";

/* ============================
   CONFIG (edit these 2)
   ============================ */
// Stripe Payment Link (Apple Pay + Card). Create in Stripe -> Payment Links.
const STRIPE_PAYMENT_LINK = "PASTE_STRIPE_PAYMENT_LINK_HERE";

// Paste image URLs per finish (copy image address from Tribeca site).
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
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1800&auto=format&fit=crop";

/* ============================
   GLOBAL STYLES — Classic Luxury / Old Money
   (lighter charcoal, refined red, normal weights)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#232429;
        --bg2:#2a2b31;
        --card:#2f3139;
        --card2:#353744;
        --text:#f4f4f7;
        --muted:#d2d2dc;
        --muted2:#a9abba;

        --primary:#ff1f4a; /* refined bright red */
        --border: rgba(255,255,255,.12);
        --shadow: 0 20px 60px rgba(0,0,0,.40);
        --ring: rgba(255,31,74,.22);
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
        font-family: Georgia, "Times New Roman", serif;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 1.18;
        margin: 0 0 10px;
      }

      p{
        margin: 10px 0;
        line-height: 1.7;
        color: var(--muted);
        font-weight: 400;
      }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section{ padding: 48px 0; }

      @media (max-width:900px){
        section{ padding: 34px 0; }
      }

      header{
        position:sticky;
        top:0;
        z-index:50;
        background: rgba(35,36,41,.88);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--border);
      }

      nav a{
        font-size: 11px;
        letter-spacing: .18em;
        text-transform: uppercase;
        padding: 8px 10px;
        border-radius: 10px;
        font-weight: 600;
        opacity: .92;
      }
      nav a:hover{ background: rgba(255,255,255,.06); opacity:1; }

      .kicker{
        font-size: 11px;
        letter-spacing: .22em;
        text-transform: uppercase;
        color: var(--muted2);
        font-weight: 600;
      }

      .card{
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 18px;
      }

      .card.soft{ background: var(--card2); }

      .grid{ display:grid; gap:16px; }
      .two{ grid-template-columns: 1fr 1fr; }
      .three{ grid-template-columns: repeat(3, 1fr); }

      @media (max-width:900px){
        .two,.three{ grid-template-columns: 1fr; }
      }

      .row{ display:flex; gap:12px; flex-wrap:wrap; align-items:center; }

      .pill{
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--border);
        font-size: 12px;
        font-weight: 600;
        background: rgba(255,255,255,.04);
      }

      .pill.red{
        background: var(--primary);
        border-color: transparent;
        color:#fff;
      }

      .btn{
        padding: 11px 16px;
        border-radius: 12px;
        font-weight: 600;
        border: 1px solid transparent;
        cursor: pointer;
        background: transparent;
        transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease, border-color .12s ease;
      }

      .btn:hover{ transform: translateY(-1px); box-shadow: var(--shadow); }
      .btn:active{ transform: translateY(0px); box-shadow: none; }

      .btn-primary{
        background: var(--primary);
        color:#fff;
      }

      .btn-outline{
        border-color: var(--border);
        color: var(--text);
      }

      label{
        font-size: 11px;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--muted2);
        font-weight: 600;
        display:block;
        margin: 12px 0 6px;
      }

      input,select,textarea{
        width:100%;
        padding: 11px 12px;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: rgba(255,255,255,.04);
        color: var(--text);
        outline: none;
      }

      input:focus,select:focus,textarea:focus{
        border-color: var(--primary);
        box-shadow: 0 0 0 4px var(--ring);
      }

      .finish-img{
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid var(--border);
        background: rgba(255,255,255,.03);
      }

      .finish-img img{
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      table{ width:100%; border-collapse:collapse; }
      th,td{ padding:10px 12px; border-bottom:1px solid var(--border); }
      th{ font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted2); font-weight: 600; }

      .mini{
        font-size: 13px;
        color: var(--muted2);
        line-height: 1.6;
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
  { sku:"B12R", price:225 }, { sku:"B12L", price:225 },
  { sku:"B15R", price:245 }, { sku:"B15L", price:245 },
  { sku:"B18R", price:265 }, { sku:"B18L", price:265 },
  { sku:"B21R", price:285 }, { sku:"B21L", price:285 },
  { sku:"B24", price:305 },  { sku:"B27", price:325 },
  { sku:"B30", price:345 },  { sku:"B33", price:365 },
  { sku:"B36", price:385 },  { sku:"B39", price:405 },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909172-8c2f041fca1f?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?q=80&w=1400&auto=format&fit=crop",
];

function imgFor(id) {
  const u = FINISH_IMAGES[id];
  if (!u || u === "PASTE_IMAGE_URL") return FALLBACK_IMAGE;
  return u;
}

/* ============================
   UI
   ============================ */
function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"baseline", gap:8, lineHeight:1 }}>
      <span style={{ fontFamily:'Georgia, "Times New Roman", serif', fontWeight:600, fontSize:20 }}>
        Premier
      </span>
      <span style={{ fontWeight:600, fontSize:16, color:"var(--primary)", letterSpacing:".14em" }}>
        RTA
      </span>
      <span style={{ fontFamily:'Georgia, "Times New Roman", serif', fontWeight:500, fontSize:16, opacity:.95 }}>
        Cabinetry
      </span>
    </div>
  );
}

function Header({ tab, setTab, cartCount }) {
  const tabs = ["Home","Shop","Design Center","Learning","Gallery","Cart","Contact"];

  return (
    <header>
      <div className="container" style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", flexWrap:"wrap" }}>
        <a href="#" onClick={(e)=>{e.preventDefault(); setTab("Home");}}><Logo /></a>

        <nav style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {tabs.map(t=>(
            <a
              key={t}
              href="#"
              onClick={(e)=>{e.preventDefault(); setTab(t);}}
              style={{ background: tab===t ? "rgba(255,255,255,.06)" : "transparent" }}
            >
              {t}{t==="Cart" ? ` (${cartCount})` : ""}
            </a>
          ))}
        </nav>

        <div style={{ marginLeft:"auto", display:"flex", gap:10 }}>
          <a className="btn btn-outline" href="mailto:premier@premierkm.com">Email</a>
          <button className="btn btn-primary" onClick={()=>setTab("Cart")} type="button">Checkout</button>
        </div>
      </div>
    </header>
  );
}

/* ============================
   PAGES
   ============================ */
function HomePage({ setTab }) {
  return (
    <section>
      <div className="container grid two" style={{ alignItems:"center" }}>
        <div>
          <div className="kicker">Old Money • Classic Luxury</div>
          <h1 style={{ fontSize:42, marginTop:10 }}>A calmer way to buy a kitchen.</h1>
          <p>
            Browse all Tribeca finish options, build your cabinet list, and checkout securely.
            If you don’t know what to order, our pro design team creates a free 3D layout and cabinet list first.
          </p>
          <div className="row" style={{ marginTop:14 }}>
            <button className="btn btn-primary" type="button" onClick={()=>setTab("Shop")}>Browse Finishes</button>
            <button className="btn btn-outline" type="button" onClick={()=>setTab("Design Center")}>Free 3D Design</button>
          </div>
          <div className="row" style={{ marginTop:14 }}>
            <span className="pill">Nationwide</span>
            <span className="pill">20+ Years</span>
            <span className="pill red">Designer-Led</span>
          </div>
          <p className="mini" style={{ marginTop:14 }}>
            Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
          </p>
        </div>

        <div className="card" style={{ padding:0, overflow:"hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1556909172-8c2f041fca1f?q=80&w=1800&auto=format&fit=crop"
            alt="Luxury kitchen"
            style={{ width:"100%", height:"min(520px, 70vh)", objectFit:"cover" }}
          />
        </div>
      </div>
    </section>
  );
}

function ShopPage({ onAddToCart }) {
  const [selectedFinishId, setSelectedFinishId] = useState(FINISH_GROUPS[0].finishes[0].id);
  const selectedFinish = useMemo(() => {
    for (const g of FINISH_GROUPS) {
      const f = g.finishes.find(x => x.id === selectedFinishId);
      if (f) return { ...f, group: g.group };
    }
    return { ...FINISH_GROUPS[0].finishes[0], group: FINISH_GROUPS[0].group };
  }, [selectedFinishId]);

  const [sku, setSku] = useState(CABINET_SKUS[0].sku);
  const [qty, setQty] = useState(1);
  const [assembly, setAssembly] = useState("rta");

  const basePrice = useMemo(() => CABINET_SKUS.find(s=>s.sku===sku)?.price || 0, [sku]);
  const unit = basePrice + (assembly==="assembled" ? 99 : 0);
  const total = unit * qty;

  return (
    <section>
      <div className="container">
        <div className="kicker">Shop</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>All Finishes — One Shop Page</h2>
        <p>All colors are visible here. Select a finish, build SKUs on the right. You never leave Shop.</p>

        {/* ALL finishes visible (grouped) */}
        {FINISH_GROUPS.map(group => (
          <div key={group.group} style={{ marginTop:22 }}>
            <div className="row" style={{ justifyContent:"space-between", alignItems:"baseline" }}>
              <h3 style={{ margin:0 }}>{group.group}</h3>
              <span className="pill">Tribeca</span>
            </div>

            <div className="grid three" style={{ marginTop:12 }}>
              {group.finishes.map(f => {
                const active = f.id===selectedFinishId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className="card"
                    onClick={()=>setSelectedFinishId(f.id)}
                    style={{
                      textAlign:"left",
                      cursor:"pointer",
                      borderColor: active ? "var(--primary)" : "var(--border)",
                      background: active ? "rgba(255,31,74,.10)" : "var(--card)",
                    }}
                  >
                    <div className="finish-img">
                      <img src={imgFor(f.id)} alt={f.name} />
                    </div>
                    <div className="row" style={{ justifyContent:"space-between", marginTop:10 }}>
                      <div style={{ fontWeight:600 }}>{f.name}</div>
                      <span className={active ? "pill red" : "pill"}>{active ? "Selected" : "Select"}</span>
                    </div>
                    <p className="mini" style={{ marginTop:8 }}>Same base SKU set • Configure right side</p>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Inline builder stays in Shop */}
        <div className="grid two" style={{ marginTop:26, alignItems:"start" }}>
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <img src={imgFor(selectedFinish.id)} alt={selectedFinish.name} style={{ width:"100%", height:420, objectFit:"cover" }} />
            <div style={{ padding:18 }}>
              <div className="kicker">{selectedFinish.group}</div>
              <h3 style={{ fontSize:24, marginTop:10 }}>{selectedFinish.name}</h3>
              <p className="mini">RTA • Nationwide shipping • Add SKUs to cart below.</p>
              <p className="mini">Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b></p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize:22 }}>Cabinet Builder (Simple)</h3>

            <label>SKU</label>
            <select value={sku} onChange={(e)=>setSku(e.target.value)}>
              {CABINET_SKUS.map(s=>(
                <option key={s.sku} value={s.sku}>
                  {s.sku} — {usd(s.price)}
                </option>
              ))}
            </select>

            <div className="grid two" style={{ marginTop:10 }}>
              <div>
                <label>Quantity</label>
                <input type="number" min={1} value={qty} onChange={(e)=>setQty(Math.max(1, parseInt(e.target.value||"1")))} />
              </div>
              <div>
                <label>Assembly</label>
                <select value={assembly} onChange={(e)=>setAssembly(e.target.value)}>
                  <option value="rta">RTA (unassembled)</option>
                  <option value="assembled">Assembled (+$99)</option>
                </select>
              </div>
            </div>

            <div className="card soft" style={{ marginTop:14 }}>
              <div className="row" style={{ justifyContent:"space-between" }}>
                <div>
                  <div className="kicker">Unit</div>
                  <div style={{ fontSize:22, fontFamily:'Georgia, "Times New Roman", serif' }}>{usd(unit)}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div className="kicker">Total</div>
                  <div style={{ fontSize:22, fontFamily:'Georgia, "Times New Roman", serif' }}>{usd(total)}</div>
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
            </div>

            <p className="mini" style={{ marginTop:12 }}>
              Want Apple Pay / card checkout? Add Stripe payment link in code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Design Center: NEW, easier, “fun” */
function DesignCenterPage() {
  const [mode, setMode] = useState("Design It For Me"); // Design It For Me | I Have Measurements | I Want Advice
  const [budget, setBudget] = useState(25000);
  const [style, setStyle] = useState("Classic White + Brass");
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name:"", email:"", phone:"" });

  return (
    <section style={{ background:"var(--bg2)" }}>
      <div className="container">
        <div className="kicker">Design Center</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Free 3D Design — pick a path</h2>
        <p>Choose what fits you. This is designed for people who don’t know what they’re ordering.</p>

        <div className="row" style={{ marginTop:14 }}>
          {["Design It For Me","I Have Measurements","I Want Advice"].map(m=>(
            <button
              key={m}
              className={mode===m ? "btn btn-primary" : "btn btn-outline"}
              type="button"
              onClick={()=>setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="grid two" style={{ marginTop:16, alignItems:"start" }}>
          <div className="card">
            <h3 style={{ fontSize:22 }}>{mode}</h3>
            <p className="mini">
              {mode==="Design It For Me" && "Upload photos + tell us budget. We’ll handle layout, cabinet sizing, and a 3D render."}
              {mode==="I Have Measurements" && "Send wall lengths, ceiling height, and window locations. We’ll create a 3D plan + cabinet list."}
              {mode==="I Want Advice" && "Tell us your goal and budget. We’ll recommend finishes + layout direction and next steps."}
            </p>

            <label>Budget comfort</label>
            <input type="range" min={8000} max={80000} step={1000} value={budget} onChange={(e)=>setBudget(parseInt(e.target.value||"25000"))} />
            <div className="mini">Target: <b style={{ color:"var(--text)" }}>{usd(budget)}</b></div>

            <label>Style direction</label>
            <select value={style} onChange={(e)=>setStyle(e.target.value)}>
              <option>Classic White + Brass</option>
              <option>White + Matte Black</option>
              <option>Two Tone White + Rift Oak</option>
              <option>Warm Neutral + Brass</option>
            </select>

            <label>Notes</label>
            <textarea rows={5} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Walls/windows, appliances, timeline, anything important…" />
          </div>

          <div className="card soft">
            <h3 style={{ fontSize:22 }}>Submit (Free)</h3>
            <p>
              After you submit, our <b style={{ color:"var(--text)" }}>professional design team</b> will create a
              <b style={{ color:"var(--text)" }}> custom 3D kitchen design</b> + cabinet placement + itemized list.
            </p>
            <div className="row" style={{ marginTop:10 }}>
              <span className="pill red">24 hour response</span>
              <span className="pill">3D render</span>
              <span className="pill">Cabinet list</span>
            </div>

            <label>Name</label>
            <input value={contact.name} onChange={(e)=>setContact(c=>({ ...c, name:e.target.value }))} />

            <label>Email</label>
            <input value={contact.email} onChange={(e)=>setContact(c=>({ ...c, email:e.target.value }))} />

            <label>Phone</label>
            <input value={contact.phone} onChange={(e)=>setContact(c=>({ ...c, phone:e.target.value }))} />

            <div className="row" style={{ marginTop:14 }}>
              <button className="btn btn-primary" type="button">Request Free Design</button>
              <a className="btn btn-outline" href="mailto:premier@premierkm.com">Email Us</a>
            </div>

            <p className="mini" style={{ marginTop:12 }}>
              Email: <b style={{ color:"var(--text)" }}>premier@premierkm.com</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningPage() {
  const items = [
    { title:"What is RTA?", body:"Ready-to-Assemble cabinets ship flat-packed for easier delivery and handling. We help you pick SKUs and provide guidance."},
    { title:"How to measure", body:"Measure wall lengths, ceiling height, and mark windows/doors. Take photos from each corner. If unsure, use Design Center."},
    { title:"Freight shipping", body:"Most cabinet orders ship LTL freight. Inspect boxes before signing. We can coordinate delivery."},
    { title:"Assembly & install", body:"RTA includes hardware and instructions. A mallet, driver, level, and square help. Keep boxes organized by wall/run."},
    { title:"Damages / returns", body:"Report issues quickly with photos. Policies vary by order type. We coordinate replacements where applicable."},
    { title:"Ordering help", body:"If you feel stuck, email premier@premierkm.com and we’ll guide you through finish + cabinet list."},
  ];
  return (
    <section>
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

function GalleryPage() {
  return (
    <section style={{ background:"var(--bg2)" }}>
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

function CartPage({ cart, onRemove, onClear }) {
  const subtotal = cart.reduce((s,it)=> s + it.unitPrice * it.qty, 0);
  const checkoutOk = STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== "PASTE_STRIPE_PAYMENT_LINK_HERE";

  return (
    <section>
      <div className="container">
        <div className="kicker">Cart</div>
        <h2 style={{ fontSize:30, marginTop:10 }}>Checkout</h2>

        {cart.length===0 ? (
          <div className="card">
            <p>Your cart is empty. Add SKUs in the Shop tab.</p>
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
                        <button className="btn btn-outline" type="button" onClick={()=>onRemove(it.key)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12, fontSize:18 }}>
              Subtotal: <span style={{ marginLeft:10, fontFamily:'Georgia, "Times New Roman", serif' }}>{usd(subtotal)}</span>
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
                  Paste your Stripe Payment Link into STRIPE_PAYMENT_LINK at the top of this file.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section>
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
export default function App() {
  const [tab, setTab] = useState("Home");

  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("premier_cart") || "[]"); } catch { return []; }
  });

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
  };

  const removeFromCart = (key) => setCart(prev => prev.filter(x => x.key !== key));
  const clearCart = () => setCart([]);

  return (
    <>
      <GlobalStyles />
      <Header tab={tab} setTab={setTab} cartCount={cart.reduce((s,it)=>s+it.qty,0)} />

      {tab === "Home" && <HomePage setTab={setTab} />}
      {tab === "Shop" && <ShopPage onAddToCart={addToCart} />}
      {tab === "Design Center" && <DesignCenterPage />}
      {tab === "Learning" && <LearningPage />}
      {tab === "Gallery" && <GalleryPage />}
      {tab === "Cart" && <CartPage cart={cart} onRemove={removeFromCart} onClear={clearCart} />}
      {tab === "Contact" && <ContactPage />}
    </>
  );
}
