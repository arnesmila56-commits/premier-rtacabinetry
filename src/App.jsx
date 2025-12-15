import React, { useState, useMemo } from "react";

/* =========================
   GLOBAL LUXURY STYLES
========================= */
const Styles = () => (
<style>{`
:root{
  --bg:#26272b;
  --panel:#2e2f35;
  --panel-soft:#34353d;
  --text:#f5f5f7;
  --muted:#cfcfda;
  --accent:#e11d48;
  --border:rgba(255,255,255,.12);
}

body{
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
}

h1,h2,h3{
  font-family:Georgia, "Times New Roman", serif;
  font-weight:600;
  letter-spacing:-0.01em;
}

p{ color:var(--muted); line-height:1.6; }

.container{ max-width:1200px; margin:auto; padding:0 24px; }
section{ padding:60px 0; }

header{
  position:sticky; top:0; z-index:50;
  background:rgba(38,39,43,.9);
  backdrop-filter:blur(10px);
  border-bottom:1px solid var(--border);
}

nav a{
  font-size:11px;
  letter-spacing:.18em;
  text-transform:uppercase;
  padding:10px 12px;
  border-radius:10px;
  cursor:pointer;
}

nav a.active{ background:rgba(255,255,255,.06); }

.panel{
  background:var(--panel);
  border:1px solid var(--border);
  border-radius:18px;
  padding:20px;
}

.btn{
  padding:12px 18px;
  border-radius:12px;
  border:1px solid transparent;
  cursor:pointer;
}

.btn.primary{ background:var(--accent); color:#fff; }
.btn.outline{ border-color:var(--border); }

.grid{ display:grid; gap:24px; }
.two{ grid-template-columns:1fr 1fr; }
@media(max-width:900px){ .two{ grid-template-columns:1fr; } }

.table{
  width:100%;
  border-collapse:collapse;
}
.table th,.table td{
  padding:12px;
  border-bottom:1px solid var(--border);
}
.table th{
  font-size:11px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--muted);
}
`}</style>
);

/* =========================
   DATA
========================= */
const FINISHES = [
  {id:"hudson-snow-white", name:"Hudson Snow White"},
  {id:"hudson-cloud-white", name:"Hudson Cloud White"},
  {id:"hudson-hearthstone", name:"Hudson Hearthstone"},
  {id:"hudson-white-rift-oak", name:"Hudson White Rift Oak"},
  {id:"hudson-cashew", name:"Hudson Cashew"},
];

const BASE_SKUS = [
  {sku:"B12", width:12, price:225},
  {sku:"B15", width:15, price:245},
  {sku:"B18", width:18, price:265},
  {sku:"B21", width:21, price:285},
  {sku:"B24", width:24, price:305},
  {sku:"B30", width:30, price:345},
  {sku:"B36", width:36, price:385},
];

/* =========================
   APP
========================= */
export default function App(){
  const [tab,setTab]=useState("Home");
  const [finish,setFinish]=useState(FINISHES[0]);
  const [cart,setCart]=useState([]);

  const addToCart=(item)=>{
    setCart([...cart,item]);
  };

  return (
    <>
      <Styles/>
      <header>
        <div className="container" style={{display:"flex",gap:12,alignItems:"center"}}>
          <h3>Premier <span style={{color:"var(--accent)"}}>RTA</span> Cabinetry</h3>
          <nav style={{display:"flex",gap:6}}>
            {["Home","Shop","Design Center","Learning","Gallery","Cart","Contact"].map(t=>(
              <a key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t}</a>
            ))}
          </nav>
        </div>
      </header>

      {tab==="Home" && (
        <section>
          <div className="container two grid">
            <div>
              <h1>A private showroom experience.</h1>
              <p>Choose a finish, build your cabinet list, or let our designers create a free 3D plan.</p>
              <div style={{marginTop:20}}>
                <button className="btn primary" onClick={()=>setTab("Shop")}>Browse Finishes</button>{" "}
                <button className="btn outline" onClick={()=>setTab("Design Center")}>Free Design</button>
              </div>
            </div>
            <div className="panel">
              <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200" style={{width:"100%",borderRadius:12}}/>
            </div>
          </div>
        </section>
      )}

      {tab==="Shop" && (
        <section>
          <div className="container two grid">
            {/* LEFT – FINISHES */}
            <div className="panel">
              <h2>Finishes</h2>
              {FINISHES.map(f=>(
                <div key={f.id} style={{padding:"12px",cursor:"pointer",borderBottom:"1px solid var(--border)"}}
                  onClick={()=>setFinish(f)}>
                  {f.name}
                </div>
              ))}
            </div>

            {/* RIGHT – SKU SELECTION */}
            <div className="panel">
              <h2>{finish.name}</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>SKU</th><th>Width</th><th>Price</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {BASE_SKUS.map(s=>(
                    <tr key={s.sku}>
                      <td>{s.sku}</td>
                      <td>{s.width}"</td>
                      <td>${s.price}</td>
                      <td>
                        <button className="btn outline" onClick={()=>addToCart({...s,finish:finish.name})}>
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {tab==="Design Center" && (
        <section>
          <div className="container panel">
            <h2>Free 3D Design</h2>
            <p>Tell us what you want. We’ll design it for you.</p>
            <input placeholder="Name"/><br/>
            <input placeholder="Email"/><br/>
            <input placeholder="Phone"/><br/>
            <textarea placeholder="Tell us about your kitchen"/><br/>
            <button className="btn primary">Request Design</button>
          </div>
        </section>
      )}

      {tab==="Cart" && (
        <section>
          <div className="container panel">
            <h2>Your Cart</h2>
            {cart.map((c,i)=>(
              <p key={i}>{c.finish} – {c.sku} – ${c.price}</p>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
