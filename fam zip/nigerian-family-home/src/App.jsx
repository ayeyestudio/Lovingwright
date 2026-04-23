import { useState } from "react";

const COLORS = {
  terracotta: "#C1440E", terracottaLight: "#E8663A",
  gold: "#D4A017", goldLight: "#F0C040",
  green: "#2D6A4F", greenLight: "#52B788",
  cream: "#FFF8EE", creamDark: "#F5E6CC",
  brown: "#6B3A2A", text: "#2C1810", textLight: "#7A4A35",
  white: "#FFFFFF", pink: "#E07A5F", blue: "#3D405B", purple: "#81B29A",
};
const MEMBER_COLORS = ["#C1440E", "#D4A017", "#2D6A4F", "#3D405B", "#81B29A", "#E07A5F"];

const NIGERIAN_MEALS = [
  "Jollof Rice","Egusi Soup","Fried Rice","Moi Moi","Akara","Pounded Yam",
  "Pepper Soup","Efo Riro","Ofe Onugbu","Banga Soup","Ofada Rice","Àmàlà",
  "Eba","Semovita","Oha Soup","Catfish Stew","Ogbono Soup","Vegetable Soup",
  "Beans & Plantain","Yam Porridge","Tuwo Shinkafa","Suya","Nkwobi",
  "Bread & Egg","Oats & Fruit","Pancakes","Noodles","Rice & Stew","Yam & Egg",
];

const GROCERY_CATEGORIES = ["Proteins","Vegetables","Grains","Drinks","Condiments","Household"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const FULL_DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_TIMES = ["Breakfast","Lunch","Dinner"];
const DATE_TYPES = [
  { label:"Birthday", emoji:"🎂" },{ label:"Anniversary", emoji:"💍" },
  { label:"School Event", emoji:"🎒" },{ label:"Prayer Day", emoji:"🙏" },
  { label:"House Event", emoji:"🏠" },{ label:"Other", emoji:"📅" },
];

const HABIT_CATEGORIES = {
  spiritual: { color:"#9B59B6", emoji:"🙏" },
  health:    { color:"#27AE60", emoji:"💪" },
  household: { color:"#E67E22", emoji:"🏠" },
  family:    { color:"#E91E63", emoji:"❤️" },
  school:    { color:"#2980B9", emoji:"📚" },
  work:      { color:"#16A085", emoji:"💼" },
  personal:  { color:"#8E44AD", emoji:"✨" },
};

const initialMembers = [
  { id:1, name:"Abisola",   emoji:"👩🏾", color: MEMBER_COLORS[0] },
  { id:2, name:"Bankole",   emoji:"👨🏾", color: MEMBER_COLORS[1] },
  { id:3, name:"EniObanke", emoji:"👧🏾", color: MEMBER_COLORS[2] },
  { id:4, name:"Eniiwaju",  emoji:"👦🏾", color: MEMBER_COLORS[3] },
];

const initialChores = [
  { id:1, title:"Sweep the compound", memberId:3, day:"Monday",    repeat:"daily",  done:false },
  { id:2, title:"Wash the dishes",    memberId:4, day:"Monday",    repeat:"daily",  done:false },
  { id:3, title:"Buy groceries",      memberId:1, day:"Wednesday", repeat:"weekly", done:false },
  { id:4, title:"Pay NEPA bill",      memberId:2, day:"Friday",    repeat:"weekly", done:false },
  { id:5, title:"Mop the floors",     memberId:1, day:"Saturday",  repeat:"weekly", done:false },
];

const initialGroceries = [
  { id:1, name:"Garri",         qty:"2kg",       category:"Grains",     bought:false },
  { id:2, name:"Palm Oil",      qty:"1 bottle",  category:"Condiments", bought:false },
  { id:3, name:"Stock Fish",    qty:"3 pieces",  category:"Proteins",   bought:true  },
  { id:4, name:"Tomatoes",      qty:"1 basket",  category:"Vegetables", bought:false },
  { id:5, name:"Semovita",      qty:"1 bag",     category:"Grains",     bought:false },
  { id:6, name:"Malt Drinks",   qty:"6 cans",    category:"Drinks",     bought:false },
  { id:7, name:"Egusi",         qty:"500g",      category:"Condiments", bought:false },
  { id:8, name:"Spinach (Efo)", qty:"2 bunches", category:"Vegetables", bought:true  },
];

const today = new Date();
const todayDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;

const initialMeals = {
  Mon:{ Breakfast:{meal:"Akara & Pap",memberId:1},     Lunch:{meal:"Jollof Rice",memberId:1},         Dinner:{meal:"Egusi Soup & Eba",memberId:1}       },
  Tue:{ Breakfast:{meal:"Bread & Egg",memberId:2},     Lunch:{meal:"",memberId:null},                 Dinner:{meal:"Pepper Soup",memberId:2}            },
  Wed:{ Breakfast:{meal:"Oats & Fruit",memberId:3},    Lunch:{meal:"Fried Rice",memberId:1},          Dinner:{meal:"",memberId:null}                    },
  Thu:{ Breakfast:{meal:"",memberId:null},             Lunch:{meal:"Beans & Plantain",memberId:4},    Dinner:{meal:"Efo Riro & Pounded Yam",memberId:1} },
  Fri:{ Breakfast:{meal:"Moi Moi",memberId:1},         Lunch:{meal:"",memberId:null},                 Dinner:{meal:"Ofada Rice & Stew",memberId:2}      },
  Sat:{ Breakfast:{meal:"Pancakes",memberId:3},        Lunch:{meal:"Nkwobi",memberId:2},              Dinner:{meal:"Suya & Fries",memberId:2}           },
  Sun:{ Breakfast:{meal:"Yam & Egg",memberId:1},       Lunch:{meal:"Ogbono Soup & Amala",memberId:1}, Dinner:{meal:"",memberId:null}                   },
};

const futureDate = n => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().split("T")[0]; };

const initialDates = [
  { id:1, title:"EniObanke's Birthday",          date:futureDate(3),  type:"Birthday",    memberId:3    },
  { id:2, title:"Abisola & Bankole Anniversary", date:futureDate(12), type:"Anniversary", memberId:2    },
  { id:3, title:"Eniiwaju's School Sports Day",  date:futureDate(7),  type:"School Event",memberId:4    },
  { id:4, title:"Family Prayer Sunday",          date:futureDate(18), type:"Prayer Day",  memberId:null },
  { id:5, title:"Wright House Meeting",          date:futureDate(25), type:"House Event", memberId:null },
];

const initialRoutines = {
  1: {
    wakeTime:"5:30 AM", sleepTime:"10:00 PM",
    morning:[
      { id:101, text:"Fajr / morning prayers",   done:false, category:"spiritual" },
      { id:102, text:"Morning devotion & Bible",  done:false, category:"spiritual" },
      { id:103, text:"Prepare family breakfast",  done:false, category:"household" },
      { id:104, text:"30 min walk / exercise",    done:false, category:"health"    },
      { id:105, text:"Review family schedule",    done:false, category:"family"    },
    ],
    evening:[
      { id:106, text:"Cook dinner",               done:false, category:"household" },
      { id:107, text:"Check kids' homework",      done:false, category:"family"    },
      { id:108, text:"Evening prayers",           done:false, category:"spiritual" },
      { id:109, text:"Skincare routine",          done:false, category:"health"    },
    ],
    habits:[
      { id:110, text:"Drink 8 glasses of water",  done:false, category:"health"   },
      { id:111, text:"Read for 20 mins",          done:false, category:"personal"  },
    ],
  },
  2: {
    wakeTime:"6:00 AM", sleepTime:"11:00 PM",
    morning:[
      { id:201, text:"Morning prayers",           done:false, category:"spiritual" },
      { id:202, text:"Exercise 45 mins",          done:false, category:"health"    },
      { id:203, text:"Read the news",             done:false, category:"personal"  },
      { id:204, text:"Prepare work bag",          done:false, category:"work"      },
    ],
    evening:[
      { id:205, text:"Family dinner time",        done:false, category:"family"    },
      { id:206, text:"Review work emails",        done:false, category:"work"      },
      { id:207, text:"Night prayers",             done:false, category:"spiritual" },
      { id:208, text:"Plan tomorrow's tasks",     done:false, category:"personal"  },
    ],
    habits:[
      { id:209, text:"No phone after 10pm",       done:false, category:"health"    },
      { id:210, text:"Call a friend or family",   done:false, category:"personal"  },
    ],
  },
  3: {
    wakeTime:"6:30 AM", sleepTime:"9:00 PM",
    morning:[
      { id:301, text:"Morning prayers",           done:false, category:"spiritual" },
      { id:302, text:"Brush & wash up",           done:false, category:"health"    },
      { id:303, text:"Pack school bag",           done:false, category:"school"    },
      { id:304, text:"Eat breakfast",             done:false, category:"health"    },
    ],
    evening:[
      { id:305, text:"Do homework",               done:false, category:"school"    },
      { id:306, text:"Read storybook",            done:false, category:"personal"  },
      { id:307, text:"Night prayers",             done:false, category:"spiritual" },
    ],
    habits:[
      { id:308, text:"Practice piano 20 mins",    done:false, category:"personal"  },
      { id:309, text:"Tidy bedroom",              done:false, category:"household" },
    ],
  },
  4: {
    wakeTime:"6:45 AM", sleepTime:"8:30 PM",
    morning:[
      { id:401, text:"Morning prayers",           done:false, category:"spiritual" },
      { id:402, text:"Brush teeth & wash up",     done:false, category:"health"    },
      { id:403, text:"Get dressed for school",    done:false, category:"school"    },
      { id:404, text:"Eat breakfast",             done:false, category:"health"    },
    ],
    evening:[
      { id:405, text:"Finish homework",           done:false, category:"school"    },
      { id:406, text:"Football practice",         done:false, category:"health"    },
      { id:407, text:"Bath time",                 done:false, category:"health"    },
      { id:408, text:"Night prayers",             done:false, category:"spiritual" },
    ],
    habits:[
      { id:409, text:"Read for 15 mins",          done:false, category:"school"    },
      { id:410, text:"Tidy up toys",              done:false, category:"household" },
    ],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────
const getHour     = () => new Date().getHours();
const getGreeting = () => { const h=getHour(); return h<12?"Good morning":h<17?"Good afternoon":"Good evening"; };
const formatDate  = s  => new Date(s).toLocaleDateString("en-NG",{weekday:"short",month:"short",day:"numeric"});
const getDaysUntil= s  => { const a=new Date();a.setHours(0,0,0,0);const b=new Date(s);b.setHours(0,0,0,0);return Math.round((b-a)/86400000); };

const ankraPattern = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect width='60' height='60' fill='none'/><circle cx='30' cy='30' r='8' fill='none' stroke='rgba(212,160,23,0.15)' stroke-width='2'/><circle cx='30' cy='30' r='14' fill='none' stroke='rgba(193,68,14,0.1)' stroke-width='1'/><line x1='0' y1='30' x2='60' y2='30' stroke='rgba(212,160,23,0.08)' stroke-width='1'/><line x1='30' y1='0' x2='30' y2='60' stroke='rgba(212,160,23,0.08)' stroke-width='1'/><path d='M0 0 L15 15 M45 15 L60 0 M0 60 L15 45 M45 45 L60 60' stroke='rgba(193,68,14,0.07)' stroke-width='1.5' fill='none'/></svg>`;

// ── Shared Styles ────────────────────────────────────────────────────
const S = {
  app:      { fontFamily:"'DM Sans', sans-serif", background:COLORS.cream, minHeight:"100vh", maxWidth:480, margin:"0 auto", position:"relative", overflowX:"hidden" },
  header:   { background:`linear-gradient(135deg,${COLORS.terracotta} 0%,${COLORS.terracottaLight} 100%)`, padding:"20px 20px 16px", position:"relative", overflow:"hidden" },
  hPattern: { position:"absolute", top:0, left:0, right:0, bottom:0, backgroundImage:`url("data:image/svg+xml,${encodeURIComponent(ankraPattern)}")`, backgroundRepeat:"repeat", opacity:0.6 },
  greeting: { fontFamily:"'Playfair Display', serif", color:COLORS.white, fontSize:22, fontWeight:700, position:"relative", zIndex:1, margin:0, textShadow:"0 1px 3px rgba(0,0,0,0.2)" },
  subHead:  { color:"rgba(255,255,255,0.85)", fontSize:13, position:"relative", zIndex:1, margin:"4px 0 0" },
  nav:      { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:COLORS.white, borderTop:`3px solid ${COLORS.creamDark}`, display:"flex", justifyContent:"space-around", padding:"8px 0 12px", zIndex:100, boxShadow:"0 -4px 20px rgba(0,0,0,0.08)" },
  navBtn:   a=>({ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 6px", color:a?COLORS.terracotta:COLORS.textLight, fontFamily:"'DM Sans', sans-serif", fontSize:9, fontWeight:a?700:400, transition:"all 0.2s" }),
  navIcon:  a=>({ fontSize:17, transform:a?"scale(1.2)":"scale(1)", transition:"transform 0.2s" }),
  content:  { padding:"16px 16px 100px" },
  card:     { background:COLORS.white, borderRadius:16, padding:16, marginBottom:12, boxShadow:"0 2px 12px rgba(44,24,16,0.08)", border:`1px solid ${COLORS.creamDark}`, position:"relative" },
  cardTitle:{ fontFamily:"'Playfair Display', serif", color:COLORS.brown, fontSize:16, fontWeight:700, margin:"0 0 12px", display:"flex", alignItems:"center", gap:6 },
  secTitle: { fontFamily:"'Playfair Display', serif", color:COLORS.terracotta, fontSize:18, fontWeight:700, margin:"0 0 12px", display:"flex", alignItems:"center", gap:6 },
  chip:     c=>({ display:"inline-flex", alignItems:"center", gap:4, background:c+"20", color:c, border:`1.5px solid ${c}40`, borderRadius:20, padding:"4px 10px", fontSize:12, fontWeight:600 }),
  btn:      v=>({ background:v==="primary"||!v?COLORS.terracotta:v==="green"?COLORS.green:v==="gold"?COLORS.gold:COLORS.creamDark, color:v==="ghost"?COLORS.brown:COLORS.white, border:"none", borderRadius:10, padding:"10px 16px", fontFamily:"'DM Sans', sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s", display:"inline-flex", alignItems:"center", gap:6 }),
  input:    { width:"100%", padding:"10px 12px", border:`2px solid ${COLORS.creamDark}`, borderRadius:10, fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.text, background:COLORS.cream, outline:"none", boxSizing:"border-box" },
  select:   { width:"100%", padding:"10px 12px", border:`2px solid ${COLORS.creamDark}`, borderRadius:10, fontFamily:"'DM Sans', sans-serif", fontSize:13, color:COLORS.text, background:COLORS.cream, outline:"none", boxSizing:"border-box" },
  label:    { fontSize:11, fontWeight:700, color:COLORS.textLight, textTransform:"uppercase", letterSpacing:0.5, display:"block", marginBottom:4 },
  row:      { display:"flex", gap:8, alignItems:"center" },
  tag:      c=>({ background:c, color:COLORS.white, borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700 }),
  modal:    { position:"fixed", inset:0, background:"rgba(44,24,16,0.55)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:200 },
  modalBox: { background:COLORS.white, borderRadius:"20px 20px 0 0", padding:20, width:"100%", maxWidth:480, maxHeight:"88vh", overflowY:"auto" },
};

// ── Avatar ──────────────────────────────────────────────────────────
const Avatar = ({ member, size=32, showName=false }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
    <div style={{ width:size, height:size, borderRadius:"50%", background:member.color+"25", border:`2px solid ${member.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.55 }}>{member.emoji}</div>
    {showName && <span style={{ fontSize:10, color:COLORS.textLight, fontWeight:600 }}>{member.name}</span>}
  </div>
);

// ── HOME ─────────────────────────────────────────────────────────────
const HomeTab = ({ members, chores, groceries, meals, dates, routines }) => {
  const todayName  = FULL_DAYS[todayDayIndex];
  const todayShort = DAYS[todayDayIndex];
  const todayChores   = chores.filter(c=>c.day===todayName&&!c.done);
  const tonightDinner = meals[todayShort]?.Dinner?.meal;
  const dinnerMId     = meals[todayShort]?.Dinner?.memberId;
  const upcomingDates = dates.map(d=>({...d,daysUntil:getDaysUntil(d.date)})).filter(d=>d.daysUntil>=0&&d.daysUntil<=7).sort((a,b)=>a.daysUntil-b.daysUntil);
  const lowGroceries  = groceries.filter(g=>!g.bought).length;

  const routineSummary = members.map(m=>{
    const r=routines[m.id]; const all=[...(r.morning||[]),...(r.evening||[]),...(r.habits||[])];
    return { member:m, done:all.filter(i=>i.done).length, total:all.length };
  });

  return (
    <div>
      <div style={{...S.card, background:`linear-gradient(135deg,${COLORS.green} 0%,${COLORS.greenLight} 100%)`, border:"none"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:1,color:"rgba(255,255,255,0.8)",marginBottom:4}}>🍲 TONIGHT'S DINNER</div>
        <div style={{fontFamily:"'Playfair Display', serif",fontSize:20,fontWeight:700,color:COLORS.white}}>{tonightDinner||"Not planned yet"}</div>
        {dinnerMId&&(()=>{const m=members.find(x=>x.id===dinnerMId);return m?<div style={{marginTop:6,opacity:0.85,fontSize:12,color:COLORS.white}}>Planned by {m.emoji} {m.name}</div>:null;})()}
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>⚡ Today's Routine Check-in</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {routineSummary.map(({member,done,total})=>{
            const pct=total?Math.round((done/total)*100):0;
            return (
              <div key={member.id} style={{background:member.color+"10",borderRadius:12,padding:"10px 12px",border:`1px solid ${member.color}30`}}>
                <div style={{...S.row,marginBottom:6}}><Avatar member={member} size={26}/><div style={{fontSize:12,fontWeight:700,color:COLORS.text}}>{member.name}</div></div>
                <div style={{height:6,background:COLORS.creamDark,borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${pct}%`,background:member.color,borderRadius:3,transition:"width 0.4s"}}/>
                </div>
                <div style={{fontSize:10,color:COLORS.textLight,marginTop:4}}>{done}/{total} · {pct}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}>🧹 Today's Chores <span style={S.tag(COLORS.terracotta)}>{todayChores.length}</span></div>
        {todayChores.length===0
          ? <div style={{color:COLORS.textLight,fontSize:13}}>✅ All chores done today!</div>
          : todayChores.map(c=>{const m=members.find(x=>x.id===c.memberId);return(
            <div key={c.id} style={{...S.row,marginBottom:8}}>
              {m&&<Avatar member={m} size={28}/>}
              <div style={{flex:1,fontSize:13,color:COLORS.text}}>{c.title}</div>
              <div style={S.chip(m?.color||COLORS.terracotta)}>{m?.name}</div>
            </div>
          );})}
      </div>

      {upcomingDates.length>0&&(
        <div style={S.card}>
          <div style={S.cardTitle}>📅 Coming Up This Week</div>
          {upcomingDates.map(d=>{
            const type=DATE_TYPES.find(t=>t.label===d.type)||DATE_TYPES[5];
            return(
              <div key={d.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${COLORS.creamDark}`}}>
                <div style={{fontSize:22}}>{type.emoji}</div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:COLORS.text}}>{d.title}</div><div style={{fontSize:11,color:COLORS.textLight}}>{formatDate(d.date)}</div></div>
                <div style={S.tag(d.daysUntil===0?COLORS.terracotta:d.daysUntil<=2?COLORS.gold:COLORS.green)}>{d.daysUntil===0?"Today!":`in ${d.daysUntil}d`}</div>
              </div>
            );
          })}
        </div>
      )}

      <div style={S.card}>
        <div style={S.cardTitle}>🛒 Grocery Status</div>
        <div style={{fontSize:13,color:COLORS.text}}><span style={{fontWeight:700,color:COLORS.terracotta,fontSize:18}}>{lowGroceries}</span> items still to buy</div>
        <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:6}}>
          {groceries.filter(g=>!g.bought).slice(0,4).map(g=><span key={g.id} style={S.chip(COLORS.gold)}>{g.name}</span>)}
          {lowGroceries>4&&<span style={S.chip(COLORS.textLight)}>+{lowGroceries-4} more</span>}
        </div>
      </div>
    </div>
  );
};

// ── CHORES ────────────────────────────────────────────────────────────
const ChoresTab = ({ members, chores, setChores }) => {
  const [form,setForm]=useState({title:"",memberId:members[0]?.id,day:"Monday",repeat:"weekly"});
  const [adding,setAdding]=useState(false);
  const toggle=id=>setChores(c=>c.map(ch=>ch.id===id?{...ch,done:!ch.done}:ch));
  const del=id=>setChores(c=>c.filter(ch=>ch.id!==id));
  const add=()=>{if(!form.title.trim())return;setChores(c=>[...c,{...form,id:Date.now(),done:false,memberId:Number(form.memberId)}]);setForm({title:"",memberId:members[0]?.id,day:"Monday",repeat:"weekly"});setAdding(false);};
  const todayName=FULL_DAYS[todayDayIndex];
  const todayChores=chores.filter(c=>c.day===todayName);
  const otherChores=chores.filter(c=>c.day!==todayName);

  const Item=({chore})=>{
    const m=members.find(x=>x.id===chore.memberId);
    return(
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${COLORS.creamDark}`,opacity:chore.done?0.5:1,transition:"opacity 0.3s"}}>
        <button onClick={()=>toggle(chore.id)} style={{width:26,height:26,borderRadius:"50%",border:`2px solid ${m?.color||COLORS.terracotta}`,background:chore.done?(m?.color||COLORS.terracotta):"transparent",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.3s",color:COLORS.white}}>{chore.done?"✓":""}</button>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:COLORS.text,textDecoration:chore.done?"line-through":"none"}}>{chore.title}</div><div style={{fontSize:11,color:COLORS.textLight,marginTop:2}}>{chore.day} · {chore.repeat}</div></div>
        {m&&<Avatar member={m} size={28}/>}
        <button onClick={()=>del(chore.id)} style={{background:"none",border:"none",cursor:"pointer",color:COLORS.textLight,fontSize:18}}>×</button>
      </div>
    );
  };

  return(
    <div>
      {todayChores.length>0&&(
        <div style={{...S.card,background:`linear-gradient(135deg,${COLORS.gold}20,${COLORS.goldLight}10)`,border:`2px solid ${COLORS.gold}40`}}>
          <div style={S.cardTitle}>⭐ Chore of the Day — {FULL_DAYS[todayDayIndex]}</div>
          {todayChores.map(c=><Item key={c.id} chore={c}/>)}
        </div>
      )}
      <div style={S.card}>
        <div style={{...S.row,justifyContent:"space-between",marginBottom:12}}>
          <div style={S.cardTitle}>📋 All Chores</div>
          <button style={S.btn()} onClick={()=>setAdding(!adding)}>{adding?"Cancel":"+ Add"}</button>
        </div>
        {adding&&(
          <div style={{background:COLORS.cream,borderRadius:12,padding:14,marginBottom:12,border:`2px dashed ${COLORS.creamDark}`}}>
            <label style={S.label}>Chore</label>
            <input style={{...S.input,marginBottom:8}} placeholder="e.g. Wash the car" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
              <div><label style={S.label}>Assign To</label><select style={S.select} value={form.memberId} onChange={e=>setForm(f=>({...f,memberId:e.target.value}))}>{members.map(m=><option key={m.id} value={m.id}>{m.emoji} {m.name}</option>)}</select></div>
              <div><label style={S.label}>Day</label><select style={S.select} value={form.day} onChange={e=>setForm(f=>({...f,day:e.target.value}))}>{FULL_DAYS.map(d=><option key={d}>{d}</option>)}</select></div>
            </div>
            <label style={S.label}>Repeat</label>
            <select style={{...S.select,marginBottom:10}} value={form.repeat} onChange={e=>setForm(f=>({...f,repeat:e.target.value}))}><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="once">Once</option></select>
            <button style={{...S.btn(),width:"100%",justifyContent:"center"}} onClick={add}>✅ Add Chore</button>
          </div>
        )}
        {otherChores.map(c=><Item key={c.id} chore={c}/>)}
      </div>
    </div>
  );
};

// ── GROCERIES ────────────────────────────────────────────────────────
const GroceriesTab = ({ groceries, setGroceries }) => {
  const [form,setForm]=useState({name:"",qty:"",category:"Grains"});
  const [adding,setAdding]=useState(false);
  const toggle=id=>setGroceries(g=>g.map(i=>i.id===id?{...i,bought:!i.bought}:i));
  const clearBought=()=>setGroceries(g=>g.filter(i=>!i.bought));
  const add=()=>{if(!form.name.trim())return;setGroceries(g=>[...g,{...form,id:Date.now(),bought:false}]);setForm({name:"",qty:"",category:"Grains"});setAdding(false);};
  const catColors={Proteins:COLORS.terracotta,Vegetables:COLORS.green,Grains:COLORS.gold,Drinks:COLORS.blue,Condiments:COLORS.pink,Household:COLORS.textLight};
  const grouped=GROCERY_CATEGORIES.reduce((a,c)=>({...a,[c]:groceries.filter(g=>g.category===c)}),{});
  const boughtCount=groceries.filter(g=>g.bought).length;
  return(
    <div>
      <div style={{...S.card,background:`linear-gradient(135deg,${COLORS.green}15,${COLORS.greenLight}10)`,border:`1px solid ${COLORS.green}30`}}>
        <div style={{...S.row,justifyContent:"space-between"}}>
          <div><div style={{fontSize:11,color:COLORS.textLight,fontWeight:700,letterSpacing:0.5}}>SHOPPING PROGRESS</div><div style={{fontSize:20,fontWeight:700,color:COLORS.green,marginTop:2}}>{boughtCount}/{groceries.length} items</div></div>
          <div style={{fontSize:40}}>🛒</div>
        </div>
        <div style={{height:8,background:COLORS.creamDark,borderRadius:4,marginTop:10,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,width:`${groceries.length?(boughtCount/groceries.length)*100:0}%`,background:`linear-gradient(90deg,${COLORS.green},${COLORS.greenLight})`,transition:"width 0.4s ease"}}/></div>
      </div>
      <div style={{...S.row,justifyContent:"space-between",marginBottom:12}}>
        <button style={S.btn()} onClick={()=>setAdding(!adding)}>+ Add Item</button>
        {boughtCount>0&&<button style={S.btn("ghost")} onClick={clearBought}>Clear Bought ({boughtCount})</button>}
      </div>
      {adding&&(
        <div style={{...S.card,border:`2px dashed ${COLORS.terracotta}40`,background:COLORS.cream}}>
          <label style={S.label}>Item Name</label>
          <input style={{...S.input,marginBottom:8}} placeholder="e.g. Onions" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            <div><label style={S.label}>Quantity</label><input style={S.input} placeholder="e.g. 2kg" value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))}/></div>
            <div><label style={S.label}>Category</label><select style={S.select} value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{GROCERY_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
          </div>
          <button style={{...S.btn(),width:"100%",justifyContent:"center"}} onClick={add}>➕ Add to List</button>
        </div>
      )}
      {GROCERY_CATEGORIES.map(cat=>{
        const items=grouped[cat];if(!items.length)return null;
        const color=catColors[cat]||COLORS.textLight;
        return(
          <div key={cat} style={S.card}>
            <div style={{...S.row,marginBottom:10}}><div style={{width:10,height:10,borderRadius:"50%",background:color,flexShrink:0}}/><div style={{fontWeight:700,fontSize:13,color:COLORS.brown}}>{cat}</div><div style={{...S.tag(color),marginLeft:"auto"}}>{items.filter(i=>!i.bought).length} left</div></div>
            {items.map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${COLORS.creamDark}`,opacity:item.bought?0.45:1,transition:"opacity 0.3s"}}>
                <button onClick={()=>toggle(item.id)} style={{width:22,height:22,borderRadius:6,border:`2px solid ${color}`,background:item.bought?color:"transparent",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s",color:COLORS.white}}>{item.bought?"✓":""}</button>
                <div style={{flex:1,fontSize:13,color:COLORS.text,textDecoration:item.bought?"line-through":"none"}}>{item.name}</div>
                {item.qty&&<span style={{fontSize:11,color:COLORS.textLight}}>{item.qty}</span>}
                <button onClick={()=>setGroceries(g=>g.filter(i=>i.id!==item.id))} style={{background:"none",border:"none",cursor:"pointer",color:COLORS.textLight,fontSize:18}}>×</button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// ── DATES ────────────────────────────────────────────────────────────
const DatesTab = ({ members, dates, setDates }) => {
  const [form,setForm]=useState({title:"",date:"",type:"Birthday",memberId:""});
  const [adding,setAdding]=useState(false);
  const add=()=>{if(!form.title.trim()||!form.date)return;setDates(d=>[...d,{...form,id:Date.now(),memberId:form.memberId?Number(form.memberId):null}]);setForm({title:"",date:"",type:"Birthday",memberId:""});setAdding(false);};
  const sorted=[...dates].map(d=>({...d,daysUntil:getDaysUntil(d.date)})).sort((a,b)=>a.daysUntil-b.daysUntil);
  const upcoming=sorted.filter(d=>d.daysUntil>=0);
  const past=sorted.filter(d=>d.daysUntil<0);

  const DateCard=({d})=>{
    const type=DATE_TYPES.find(t=>t.label===d.type)||DATE_TYPES[5];
    const m=members.find(x=>x.id===d.memberId);
    const urgent=d.daysUntil>=0&&d.daysUntil<=3;
    return(
      <div style={{...S.card,border:urgent?`2px solid ${COLORS.gold}`:`1px solid ${COLORS.creamDark}`,background:urgent?`${COLORS.gold}08`:COLORS.white}}>
        <div style={{...S.row,justifyContent:"space-between"}}>
          <div style={{...S.row,gap:10}}><div style={{fontSize:28}}>{type.emoji}</div><div><div style={{fontWeight:700,fontSize:14,color:COLORS.text}}>{d.title}</div><div style={{fontSize:12,color:COLORS.textLight,marginTop:2}}>{formatDate(d.date)}</div></div></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
            {d.daysUntil>=0?<div style={S.tag(d.daysUntil===0?COLORS.terracotta:d.daysUntil<=3?COLORS.gold:COLORS.green)}>{d.daysUntil===0?"🎉 Today!":`in ${d.daysUntil} days`}</div>:<div style={S.tag(COLORS.textLight)}>Past</div>}
            {m&&<Avatar member={m} size={24}/>}
          </div>
        </div>
        <button onClick={()=>setDates(ds=>ds.filter(i=>i.id!==d.id))} style={{position:"absolute",top:8,right:8,background:"none",border:"none",cursor:"pointer",color:COLORS.textLight,fontSize:14}}>×</button>
      </div>
    );
  };

  return(
    <div>
      <div style={{marginBottom:12}}><button style={S.btn()} onClick={()=>setAdding(!adding)}>{adding?"Cancel":"📅 Add Date"}</button></div>
      {adding&&(
        <div style={{...S.card,border:`2px dashed ${COLORS.gold}60`,background:`${COLORS.gold}08`}}>
          <label style={S.label}>Event Title</label>
          <input style={{...S.input,marginBottom:8}} placeholder="e.g. Abisola's Birthday" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div><label style={S.label}>Date</label><input type="date" style={S.input} value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div><label style={S.label}>Type</label><select style={S.select} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>{DATE_TYPES.map(t=><option key={t.label} value={t.label}>{t.emoji} {t.label}</option>)}</select></div>
          </div>
          <label style={S.label}>For (optional)</label>
          <select style={{...S.select,marginBottom:10}} value={form.memberId} onChange={e=>setForm(f=>({...f,memberId:e.target.value}))}><option value="">Everyone</option>{members.map(m=><option key={m.id} value={m.id}>{m.emoji} {m.name}</option>)}</select>
          <button style={{...S.btn("gold"),width:"100%",justifyContent:"center"}} onClick={add}>💾 Save Date</button>
        </div>
      )}
      {upcoming.length>0&&<div style={{marginBottom:20}}><div style={S.secTitle}>📌 Upcoming</div>{upcoming.map(d=><DateCard key={d.id} d={d}/>)}</div>}
      {past.length>0&&<div><div style={{...S.secTitle,color:COLORS.textLight,fontSize:14}}>🕰 Past</div>{past.map(d=><DateCard key={d.id} d={d}/>)}</div>}
    </div>
  );
};

// ── MEAL PLANNER ─────────────────────────────────────────────────────
const MealsTab = ({ members, meals, setMeals }) => {
  const [editing,setEditing]=useState(null);
  const [mealInput,setMealInput]=useState("");
  const [memberSel,setMemberSel]=useState(members[0]?.id);
  const [searchQ,setSearchQ]=useState("");

  const openEdit=(day,time)=>{
    const ex=meals[day]?.[time];
    setEditing({day,time});
    setMealInput(ex?.meal||"");
    setMemberSel(ex?.memberId||members[0]?.id);
    setSearchQ("");
  };
  const saveMeal=()=>{
    if(!editing)return;
    setMeals(m=>({...m,[editing.day]:{...(m[editing.day]||{}),[editing.time]:{meal:mealInput,memberId:Number(memberSel)}}}));
    setEditing(null);
  };
  const clearSlot=()=>{
    if(!editing)return;
    setMeals(m=>({...m,[editing.day]:{...(m[editing.day]||{}),[editing.time]:{meal:"",memberId:null}}}));
    setEditing(null);
  };

  const suggestions=NIGERIAN_MEALS.filter(m=>!searchQ||m.toLowerCase().includes(searchQ.toLowerCase()));
  const tonightDinner=meals[DAYS[todayDayIndex]]?.Dinner?.meal;

  return(
    <div>
      {tonightDinner&&(
        <div style={{...S.card,background:`linear-gradient(135deg,${COLORS.terracotta},${COLORS.terracottaLight})`,border:"none",marginBottom:12}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.8)",fontWeight:700,letterSpacing:1}}>🍲 TONIGHT'S DINNER</div>
          <div style={{fontFamily:"'Playfair Display', serif",color:COLORS.white,fontSize:20,fontWeight:700,marginTop:4}}>{tonightDinner}</div>
        </div>
      )}
      <div style={S.card}>
        <div style={S.cardTitle}>📅 Weekly Meal Plan</div>
        <div style={{fontSize:11,color:COLORS.textLight,marginBottom:10}}>Tap any slot to plan a meal ✏️</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
            <thead><tr>
              <th style={{padding:"6px 4px",textAlign:"left",color:COLORS.textLight,fontWeight:700}}>Day</th>
              {MEAL_TIMES.map(t=><th key={t} style={{padding:"6px 4px",textAlign:"center",color:COLORS.textLight,fontWeight:700}}>{t}</th>)}
            </tr></thead>
            <tbody>
              {DAYS.map((day,idx)=>{
                const isToday=idx===todayDayIndex;
                return(
                  <tr key={day} style={{background:isToday?`${COLORS.terracotta}08`:"transparent"}}>
                    <td style={{padding:"6px 4px",fontWeight:700,color:isToday?COLORS.terracotta:COLORS.brown,fontSize:12,whiteSpace:"nowrap"}}>{day}{isToday?" •":""}</td>
                    {MEAL_TIMES.map(time=>{
                      const slot=meals[day]?.[time];
                      const m=members.find(x=>x.id===slot?.memberId);
                      return(
                        <td key={time} style={{padding:"4px"}}>
                          <button onClick={()=>openEdit(day,time)} style={{width:"100%",minHeight:50,padding:"4px 6px",background:slot?.meal?`${COLORS.green}12`:COLORS.cream,border:`1.5px solid ${slot?.meal?COLORS.green+"40":COLORS.creamDark}`,borderRadius:8,cursor:"pointer",textAlign:"center",fontSize:10,color:COLORS.text,fontFamily:"'DM Sans', sans-serif",transition:"all 0.2s"}}>
                            {slot?.meal?(<><div style={{fontWeight:600,lineHeight:1.3}}>{slot.meal}</div>{m&&<div style={{marginTop:3}}>{m.emoji}</div>}</>):(<span style={{color:COLORS.textLight,fontSize:16}}>+</span>)}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editing&&(
        <div style={S.modal} onClick={()=>setEditing(null)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Playfair Display', serif",fontSize:18,fontWeight:700,color:COLORS.brown,marginBottom:2}}>{editing.day} — {editing.time}</div>
            <div style={{fontSize:12,color:COLORS.textLight,marginBottom:14}}>Type freely or pick from the suggestions 🍽️</div>

            <label style={S.label}>Meal Name</label>
            <input style={{...S.input,marginBottom:12}} placeholder="e.g. Jollof Rice, Weetabix, Pancakes..."
              value={mealInput} onChange={e=>setMealInput(e.target.value)} autoFocus/>

            <label style={S.label}>Search Nigerian Meals</label>
            <input style={{...S.input,marginBottom:8}} placeholder="Search suggestions..."
              value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>

            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14,maxHeight:130,overflowY:"auto",padding:"4px 0"}}>
              {suggestions.map(m=>(
                <button key={m} onClick={()=>{setMealInput(m);setSearchQ("");}} style={{background:mealInput===m?COLORS.terracotta:COLORS.creamDark,color:mealInput===m?COLORS.white:COLORS.brown,border:"none",borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.15s",fontFamily:"'DM Sans', sans-serif"}}>{m}</button>
              ))}
              {suggestions.length===0&&<div style={{fontSize:12,color:COLORS.textLight}}>No match — just type it above!</div>}
            </div>

            <label style={S.label}>Planned by</label>
            <select style={{...S.select,marginBottom:16}} value={memberSel} onChange={e=>setMemberSel(e.target.value)}>
              {members.map(m=><option key={m.id} value={m.id}>{m.emoji} {m.name}</option>)}
            </select>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <button style={{...S.btn("green"),justifyContent:"center"}} onClick={saveMeal}>✅ Save Meal</button>
              <button style={{...S.btn("ghost"),justifyContent:"center"}} onClick={clearSlot}>🗑 Clear Slot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ROUTINES ─────────────────────────────────────────────────────────
const RoutinesTab = ({ members, routines, setRoutines }) => {
  const [activeMember,setActiveMember]=useState(members[0]?.id);
  const [view,setView]=useState("mine");
  const [addingTo,setAddingTo]=useState(null);
  const [newItem,setNewItem]=useState({text:"",category:"personal"});
  const [editingTime,setEditingTime]=useState(null);
  const [timeVal,setTimeVal]=useState("");

  const memberData=routines[activeMember]||{morning:[],evening:[],habits:[],wakeTime:"",sleepTime:""};
  const activeMemberObj=members.find(m=>m.id===activeMember);

  const toggleItem=(section,id)=>{
    setRoutines(r=>({...r,[activeMember]:{...r[activeMember],[section]:r[activeMember][section].map(i=>i.id===id?{...i,done:!i.done}:i)}}));
  };
  const addItem=()=>{
    if(!newItem.text.trim()||!addingTo)return;
    setRoutines(r=>({...r,[activeMember]:{...r[activeMember],[addingTo]:[...(r[activeMember][addingTo]||[]),{id:Date.now(),text:newItem.text,category:newItem.category,done:false}]}}));
    setNewItem({text:"",category:"personal"});setAddingTo(null);
  };
  const deleteItem=(section,id)=>{
    setRoutines(r=>({...r,[activeMember]:{...r[activeMember],[section]:r[activeMember][section].filter(i=>i.id!==id)}}));
  };
  const saveTime=()=>{
    if(!editingTime)return;
    setRoutines(r=>({...r,[activeMember]:{...r[activeMember],[editingTime==="wake"?"wakeTime":"sleepTime"]:timeVal}}));
    setEditingTime(null);
  };

  const Section=({title,icon,section,items,color})=>(
    <div style={S.card}>
      <div style={{...S.row,justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontFamily:"'Playfair Display', serif",fontSize:15,fontWeight:700,color:COLORS.brown,display:"flex",gap:6,alignItems:"center"}}>
          <span>{icon}</span>{title}<span style={S.tag(color)}>{items.filter(i=>i.done).length}/{items.length}</span>
        </div>
        <button onClick={()=>setAddingTo(addingTo===section?null:section)} style={{...S.btn("ghost"),padding:"6px 10px",fontSize:12}}>+ Add</button>
      </div>

      {addingTo===section&&(
        <div style={{background:COLORS.cream,borderRadius:10,padding:12,marginBottom:10,border:`2px dashed ${color}50`}}>
          <input style={{...S.input,marginBottom:8}} placeholder="Add a task..."
            value={newItem.text} onChange={e=>setNewItem(n=>({...n,text:e.target.value}))}
            onKeyDown={e=>e.key==="Enter"&&addItem()}/>
          <div style={{...S.row,gap:8}}>
            <select style={{...S.select,flex:1}} value={newItem.category} onChange={e=>setNewItem(n=>({...n,category:e.target.value}))}>
              {Object.keys(HABIT_CATEGORIES).map(c=><option key={c} value={c}>{HABIT_CATEGORIES[c].emoji} {c}</option>)}
            </select>
            <button style={{...S.btn("green"),padding:"10px 14px"}} onClick={addItem}>Add</button>
          </div>
        </div>
      )}

      {items.length===0&&addingTo!==section&&(
        <div style={{fontSize:13,color:COLORS.textLight,textAlign:"center",padding:"8px 0"}}>No tasks yet — tap "+ Add" to start!</div>
      )}

      {items.map(item=>{
        const cat=HABIT_CATEGORIES[item.category]||HABIT_CATEGORIES.personal;
        return(
          <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${COLORS.creamDark}`,opacity:item.done?0.5:1,transition:"opacity 0.3s"}}>
            <button onClick={()=>toggleItem(section,item.id)} style={{width:24,height:24,borderRadius:6,border:`2px solid ${activeMemberObj?.color||color}`,background:item.done?(activeMemberObj?.color||color):"transparent",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s",color:COLORS.white}}>{item.done?"✓":""}</button>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:COLORS.text,textDecoration:item.done?"line-through":"none"}}>{item.text}</div>
              <div style={{...S.row,gap:4,marginTop:3}}><span style={{fontSize:10}}>{cat.emoji}</span><span style={{fontSize:10,color:cat.color,fontWeight:600}}>{item.category}</span></div>
            </div>
            <button onClick={()=>deleteItem(section,item.id)} style={{background:"none",border:"none",cursor:"pointer",color:COLORS.textLight,fontSize:16}}>×</button>
          </div>
        );
      })}
    </div>
  );

  const FamilyView=()=>(
    <div>
      {members.map(m=>{
        const r=routines[m.id];
        const all=[...(r.morning||[]),...(r.evening||[]),...(r.habits||[])];
        const done=all.filter(i=>i.done).length;
        const pct=all.length?Math.round((done/all.length)*100):0;
        const pending=all.filter(i=>!i.done);
        return(
          <div key={m.id} style={{...S.card,border:`2px solid ${m.color}25`}}>
            <div style={{...S.row,marginBottom:10}}>
              <Avatar member={m} size={42}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Playfair Display', serif",fontSize:15,fontWeight:700,color:COLORS.text}}>{m.name}</div>
                <div style={{fontSize:11,color:COLORS.textLight,marginTop:2}}>🌅 {r.wakeTime||"—"} &nbsp;·&nbsp; 🌙 {r.sleepTime||"—"}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:22,fontWeight:700,color:m.color}}>{pct}%</div>
                <div style={{fontSize:10,color:COLORS.textLight}}>{done}/{all.length} done</div>
              </div>
            </div>
            <div style={{height:8,background:COLORS.creamDark,borderRadius:4,overflow:"hidden",marginBottom:10}}>
              <div style={{height:"100%",width:`${pct}%`,background:m.color,borderRadius:4,transition:"width 0.4s"}}/>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {pending.slice(0,3).map(i=>{const cat=HABIT_CATEGORIES[i.category]||HABIT_CATEGORIES.personal;return<span key={i.id} style={{...S.chip(cat.color),fontSize:11}}>{cat.emoji} {i.text}</span>;})}
              {pending.length>3&&<span style={S.chip(COLORS.textLight)}>+{pending.length-3} more</span>}
              {pending.length===0&&<span style={{fontSize:12,color:COLORS.green,fontWeight:600}}>🎉 All done!</span>}
            </div>
          </div>
        );
      })}
    </div>
  );

  const TIME_PRESETS_WAKE=["5:00 AM","5:30 AM","6:00 AM","6:30 AM","7:00 AM","7:30 AM"];
  const TIME_PRESETS_SLEEP=["8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM","10:30 PM","11:00 PM"];

  return(
    <div>
      {/* View toggle */}
      <div style={{...S.row,gap:6,marginBottom:14,background:COLORS.creamDark,borderRadius:12,padding:4}}>
        {[{id:"mine",label:"My Routine",icon:"👤"},{id:"family",label:"Family View",icon:"👨‍👩‍👧‍👦"}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,padding:"8px 0",border:"none",borderRadius:9,background:view===v.id?COLORS.white:"transparent",cursor:"pointer",fontFamily:"'DM Sans', sans-serif",fontSize:12,fontWeight:700,color:view===v.id?COLORS.terracotta:COLORS.textLight,transition:"all 0.2s",boxShadow:view===v.id?"0 2px 8px rgba(0,0,0,0.1)":"none"}}>
            {v.icon} {v.label}
          </button>
        ))}
      </div>

      {view==="family"?<FamilyView/>:(
        <>
          {/* Member picker */}
          <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
            {members.map(m=>(
              <button key={m.id} onClick={()=>setActiveMember(m.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"8px 14px",border:`2px solid ${activeMember===m.id?m.color:COLORS.creamDark}`,borderRadius:12,background:activeMember===m.id?m.color+"15":COLORS.white,cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
                <div style={{fontSize:24}}>{m.emoji}</div>
                <div style={{fontSize:11,fontWeight:700,color:activeMember===m.id?m.color:COLORS.textLight}}>{m.name}</div>
              </button>
            ))}
          </div>

          {/* Sleep/wake card */}
          <div style={{...S.card,background:`linear-gradient(135deg,${activeMemberObj?.color}15,${activeMemberObj?.color}05)`,border:`2px solid ${activeMemberObj?.color}30`,marginBottom:14}}>
            <div style={{...S.row,justifyContent:"space-around"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:26}}>🌅</div>
                <div style={{fontSize:10,color:COLORS.textLight,fontWeight:700,marginTop:2,letterSpacing:0.5}}>WAKE UP</div>
                <button onClick={()=>{setEditingTime("wake");setTimeVal(memberData.wakeTime||"");}} style={{fontFamily:"'Playfair Display', serif",fontSize:18,fontWeight:700,color:activeMemberObj?.color||COLORS.terracotta,background:"none",border:"none",cursor:"pointer",marginTop:4,display:"block"}}>
                  {memberData.wakeTime||"Set time"}
                </button>
              </div>
              <div style={{width:1,background:COLORS.creamDark}}/>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:26}}>🌙</div>
                <div style={{fontSize:10,color:COLORS.textLight,fontWeight:700,marginTop:2,letterSpacing:0.5}}>BEDTIME</div>
                <button onClick={()=>{setEditingTime("sleep");setTimeVal(memberData.sleepTime||"");}} style={{fontFamily:"'Playfair Display', serif",fontSize:18,fontWeight:700,color:activeMemberObj?.color||COLORS.terracotta,background:"none",border:"none",cursor:"pointer",marginTop:4,display:"block"}}>
                  {memberData.sleepTime||"Set time"}
                </button>
              </div>
            </div>
          </div>

          <Section title="Morning Routine" icon="☀️" section="morning" items={memberData.morning||[]} color={COLORS.gold}/>
          <Section title="Evening Routine" icon="🌆" section="evening" items={memberData.evening||[]} color={COLORS.terracotta}/>
          <Section title="Daily Habits"    icon="⚡" section="habits"  items={memberData.habits||[]}  color={COLORS.green}/>
        </>
      )}

      {/* Time modal */}
      {editingTime&&(
        <div style={S.modal} onClick={()=>setEditingTime(null)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Playfair Display', serif",fontSize:16,fontWeight:700,color:COLORS.brown,marginBottom:14}}>
              {editingTime==="wake"?"🌅 Wake-up Time":"🌙 Bedtime"} for {activeMemberObj?.name}
            </div>
            <input style={{...S.input,marginBottom:14,fontSize:20,textAlign:"center",fontWeight:700}} placeholder="e.g. 6:30 AM" value={timeVal} onChange={e=>setTimeVal(e.target.value)}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
              {(editingTime==="wake"?TIME_PRESETS_WAKE:TIME_PRESETS_SLEEP).map(t=>(
                <button key={t} onClick={()=>setTimeVal(t)} style={{padding:"10px 6px",border:`2px solid ${timeVal===t?(activeMemberObj?.color||COLORS.terracotta):COLORS.creamDark}`,borderRadius:10,background:timeVal===t?(activeMemberObj?.color||COLORS.terracotta)+"20":COLORS.cream,cursor:"pointer",fontFamily:"'DM Sans', sans-serif",fontSize:12,fontWeight:600,color:timeVal===t?(activeMemberObj?.color||COLORS.terracotta):COLORS.text,transition:"all 0.15s"}}>{t}</button>
              ))}
            </div>
            <button style={{...S.btn("green"),width:"100%",justifyContent:"center"}} onClick={saveTime}>💾 Save Time</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── MAIN APP ─────────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState("home");
  const [members]         =useState(initialMembers);
  const [chores,setChores]=useState(initialChores);
  const [groceries,setGroceries]=useState(initialGroceries);
  const [dates,setDates]  =useState(initialDates);
  const [meals,setMeals]  =useState(initialMeals);
  const [routines,setRoutines]=useState(initialRoutines);

  const tabs=[
    {id:"home",      label:"Home",     icon:"🏠"},
    {id:"chores",    label:"Chores",   icon:"🧹"},
    {id:"groceries", label:"Shop",     icon:"🛒"},
    {id:"dates",     label:"Dates",    icon:"📅"},
    {id:"meals",     label:"Meals",    icon:"🍲"},
    {id:"routines",  label:"Routines", icon:"⚡"},
  ];
  const tabTitle={home:null,chores:"Chore Manager",groceries:"Grocery List",dates:"Family Dates",meals:"Meal Planner",routines:"Daily Routines"};

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #E8D5B7; }
        button:active { opacity: 0.75; }
        input:focus, select:focus { border-color: #C1440E !important; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #C1440E40; border-radius: 4px; }
      `}</style>
      <div style={S.app}>
        <div style={S.header}>
          <div style={S.hPattern}/>
          {tab==="home"?(
            <>
              <p style={S.greeting}>{getGreeting()}, Wright Family! {getHour()<12?"☀️":getHour()<18?"🌤":"🌙"}</p>
              <p style={S.subHead}>{new Date().toLocaleDateString("en-NG",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
              <div style={{display:"flex",gap:8,marginTop:10,position:"relative",zIndex:1,flexWrap:"wrap"}}>
                {members.map(m=><Avatar key={m.id} member={m} size={36} showName={true}/>)}
              </div>
            </>
          ):(
            <p style={S.greeting}>{tabs.find(t=>t.id===tab)?.icon} {tabTitle[tab]}</p>
          )}
        </div>

        <div style={S.content}>
          {tab==="home"      &&<HomeTab      members={members} chores={chores} groceries={groceries} meals={meals} dates={dates} routines={routines}/>}
          {tab==="chores"    &&<ChoresTab    members={members} chores={chores} setChores={setChores}/>}
          {tab==="groceries" &&<GroceriesTab groceries={groceries} setGroceries={setGroceries}/>}
          {tab==="dates"     &&<DatesTab     members={members} dates={dates} setDates={setDates}/>}
          {tab==="meals"     &&<MealsTab     members={members} meals={meals} setMeals={setMeals}/>}
          {tab==="routines"  &&<RoutinesTab  members={members} routines={routines} setRoutines={setRoutines}/>}
        </div>

        <nav style={S.nav}>
          {tabs.map(t=>(
            <button key={t.id} style={S.navBtn(tab===t.id)} onClick={()=>setTab(t.id)}>
              <span style={S.navIcon(tab===t.id)}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
