import React, { useEffect, useState } from "react";

/* ============================
   GLOBAL STYLES (luxury, same as before)
   ============================ */
function GlobalStyles() {
  return (
    <style>{`
      :root{
        --bg:#24252a;
        --subtle:#2b2c33;
        --card:#30323a;
        --text:#f5f5f7;
        --muted:#cfcfda;
        --muted2:#a7a7b5;
        --primary:#e11d48;
        --border: rgba(255,255,255,.12);
        --shadow: 0 18px 50px rgba(0,0,0,.40);
      }

      html,body{
        margin:0;
        background:var(--bg);
        color:var(--text);
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }
      *,*::before,*::after{ box-sizing:border-box; }
      a{ color:inherit; text-decoration:none; }
      img{ max-width:100%; display:block; }

      h1,h2,h3{
        font-family: Georgia, "Times New Roman", serif;
        font-weight:600;
        letter-spacing:-0.01em;
      }
      p{ color:var(--muted); line-height:1.6; }

      .container{ max-width:1200px; margin:0 auto; padding:0 22px; }
      section{ padding:50px 0; }

      header{
        position:sticky;
        top:0;
        z-index:40;
        background:rgba(36,37,42,.9);
        backdrop-filter:blur(10px);
        border-bottom:1px solid var(--border);
      }

      nav a{
        font-size:11px;
        letter-spacing:.18em;
        text-transform:uppercase;
        padding:8px 10px;
        border-radius:10px;
        font-weight:600;
      }
      nav a:hover{ background:rgba(255,255,255,.06); }

      .card{
        background:var(--card);
        border:1px solid var(--border);
        border-radius:16px;
        padding:18px;
      }

      .grid{ display:grid; gap:16px; }
      .two{ grid-template-columns:1fr 1fr; }
      .three{ grid-template-columns:repeat(3,1fr); }
      @media(max-width:900px){
        .two,.three{ grid-template-columns:1fr; }
      }

      .btn{
        padding:10px 16px;
        border-radius:12px;
        border:1px solid transparent;
        font-weight:600;
        cursor:pointer;
        background:transparent;
      }
      .btn-primary{ background:var(--primary); color:#fff; }
      .btn-outline{ border-color:var(--border); color:var(--text); }

      table{ width:100%; border-collapse:collapse; }
      th,td{ padding:10px 12px; border-bottom:1px solid var(--border); }
      th{ font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted2); }
    `}</style>
  );
}

/* ============================
   DATA
   ============================ */
const FINISHES = [
  { id:"hudson-snow-white", name:"Hudson Snow White" },
  { id:"hudson-cloud-white", name:"Hudson Cloud White" },
  { id:"hudson-hearthstone", name:"Hudson Hearthstone" },
  { id:"hudson-white-rift-oak", name:"Hudson White Rift Oak" },
  { id:"hudson-cashew", name:"Hudson Cashew" },
  { id:"soho-snow-white", name:"Soho Snow White" },
  { id:"soho-empire-blue", name:"Soho Empire Blue" },
  { id:"southampton-snow-white", name:"Southampton Snow White" },
  { id:"southampton-white-rift-oak", name:"Southampton White Rift Oak" },
  { id:"southampton-carbon-black-oak", name:"Southampton Carbon Black Oak" },
];

const BASE_SKUS = [
  { sku:"B12R", width:12, price:225 },
  { sku:"B15R", width:15, price:245 },
  { sku:"B18R", width:18, price:265 },
  { sku:"B21R", width:21, price:285 },
  { sku:"B24", width:24, price:305 },
  { sku:"B30", width:30, price:345 },
  { sku:"B36", width:36, price:385 },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200",
  "https://images.unsplash.com/photo-1556909172-8c2f041fca1f?w=1200",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
];

/* ============================
   ROUTER
   ============================ */
function routeFromHash() {
  const h = window.location.hash.replace("#/", "");
  return h || "home";
}

/* ============================
   HEADER
   ============================ */
function Header({ cartCount }) {
  return (
    <header>
      <div className="container" style={{display:"flex",alignItems:"center",gap:12}}>
        <h3>Premier <span style={{color:"var(--primary)"}}>RTA</span> Cabinetry</h3>
        <nav style={{display:"flex",gap:6}}>
          <a href="#/home">Home</a>
          <a href="#/shop">Shop</a>
          <a href="#/design">Design Center</a>
          <a href="#/learn">Learning</a>
          <a href="#/gallery">Gallery</a>
          <a href="#/cart">Cart ({cartCount})</a>
          <a href="#/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

/* ============================
   PAGES
   ============================ */
function Home() {
  return (
    <section>
      <div className="container two grid">
        <div>
          <h1>A calm way to buy a kitchen.</h1>
          <p>
            Browse finishes, select cabinet sizes, or let our designers create
            a free 3D layout before you buy.
          </p>
          <a className="btn btn-primary" href="#/shop">Shop Finishes</a>
        </div>
        <div className="card">
          <img src={GALLERY[0]} alt="Kitchen" style={{borderRadius:12}} />
        </div>
      </div>
    </section>
  );
}

/* SHOP – SAME FLOW AS BEFORE */
function Shop({ onAdd }) {
  return (
    <section>
      <div className="container">
        <h2>Finishes</h2>
        <div className="grid three">
          {FINISHES.map(f=>(
            <div key={f.id} className="card">
              <h3>{f.name}</h3>
              <a className="btn btn-outline" href={`#/shop/${f.id}`}>Configure</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CONFIGURE PAGE (FIXED) */
function Configure({ finishId, onAdd }) {
  const finish = FINISHES.find(f=>f.id===finishId);
  const [qty,setQty]=useState(1);

  return (
    <section>
      <div className="container card">
        <h2>{finish?.name}</h2>
        <table>
          <thead>
            <tr><th>SKU</th><th>Width</th><th>Price</th><th>Qty</th><th></th></tr>
          </thead>
          <tbody>
            {BASE_SKUS.map(s=>(
              <tr key={s.sku}>
                <td>{s.sku}</td>
                <td>{s.width}"</td>
                <td>${s.price}</td>
                <td>
                  <input type="number" min={1} value={qty} onChange={e=>setQty(+e.target.value)} />
                </td>
                <td>
                  <button className="btn btn-primary" onClick={()=>onAdd({finish:finish.name,sku:s.sku,qty,price:s.price})}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GalleryPage() {
  return (
    <section>
      <div className="container grid three">
        {GALLERY.map((img,i)=>(
          <div key={i} className="card">
            <img src={img} alt="Gallery" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Cart({ cart }) {
  return (
    <section>
      <div className="container card">
        <h2>Your Cart</h2>
        {cart.length===0 ? <p>Your cart is empty.</p> :
          cart.map((c,i)=><p key={i}>{c.finish} – {c.sku} × {c.qty}</p>)
        }
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <div className="container card">
        <h2>Contact</h2>
        <p>Email: premier@premierkm.com</p>
      </div>
    </section>
  );
}

/* ============================
   APP
   ============================ */
export default function App() {
  const [route,setRoute]=useState(routeFromHash());
  const [cart,setCart]=useState([]);

  useEffect(()=>{
    const h=()=>setRoute(routeFromHash());
    window.addEventListener("hashchange",h);
    return ()=>window.removeEventListener("hashchange",h);
  },[]);

  const addToCart=(item)=>setCart([...cart,item]);

  return (
    <>
      <GlobalStyles/>
      <Header cartCount={cart.length}/>
      {route==="home" && <Home/>}
      {route==="shop" && <Shop/>}
      {route.startsWith("shop/") && <Configure finishId={route.split("/")[1]} onAdd={addToCart}/>}
      {route==="gallery" && <GalleryPage/>}
      {route==="cart" && <Cart cart={cart}/>}
      {route==="contact" && <Contact/>}
    </>
  );
}
