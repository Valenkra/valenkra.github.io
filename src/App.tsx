import { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { Monitor, X, Minus, Square, Maximize2, Power, Github, ExternalLink, Volume2, VolumeX, Play, Pause, ChevronRight } from 'lucide-react';

type AppId = 'welcome'|'projects'|'about'|'music'|'terminal'|'paint'|'contact';
type Win = {id: AppId; x:number; y:number; w:number; h:number; minimized:boolean; maximized:boolean; z:number};
type Store = {windows:Win[]; top:number; open:(id:AppId)=>void; close:(id:AppId)=>void; focus:(id:AppId)=>void; minimize:(id:AppId)=>void; maximize:(id:AppId)=>void; move:(id:AppId,x:number,y:number)=>void};
const initial: Record<AppId,Pick<Win,'x'|'y'|'w'|'h'>> = {
  welcome:{x:180,y:75,w:680,h:420}, projects:{x:260,y:175,w:600,h:430}, about:{x:330,y:100,w:490,h:370},music:{x:400,y:105,w:650,h:460},terminal:{x:400,y:225,w:510,h:330},paint:{x:410,y:150,w:500,h:400},contact:{x:315,y:120,w:650,h:450}
};
const useDesktop = create<Store>((set)=>({
 windows:[{id:'welcome',...initial.welcome,minimized:false,maximized:false,z:1}],top:1,
 open:id=>set(s=>{const exists=s.windows.find(w=>w.id===id);const top=s.top+1;return {top,windows:exists?s.windows.map(w=>w.id===id?{...w,minimized:false,z:top}:w):[...s.windows,{id,...initial[id],minimized:false,maximized:false,z:top}]};}),
 close:id=>set(s=>({windows:s.windows.filter(w=>w.id!==id)})),
 focus:id=>set(s=>({top:s.top+1,windows:s.windows.map(w=>w.id===id?{...w,z:s.top+1,minimized:false}:w)})),
 minimize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,minimized:true}:w)})),
 maximize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,maximized:!w.maximized}:w)})),
 move:(id,x,y)=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,x,y}:w)}))
}));

const XP={welcome:'/icons/xp/welcome.png',projects:'/icons/xp/projects.png',about:'/icons/xp/about.png',music:'/icons/xp/music.png',terminal:'/icons/xp/terminal.png',paint:'/icons/xp/paint.png',contact:'/icons/xp/contact.png'} as const;
function XPImg({id,size=24}:{id:AppId;size?:number}){return <img className="xp-icon-image" src={XP[id]} alt="" width={size} height={size}/>;}
const titles:Record<AppId,string>={welcome:'Welcome to ValenOS',projects:'My Projects',about:'About Me.txt',music:'Valenamp',terminal:'Terminal',paint:'Paint',contact:'Contact'};
const desktopItems:AppId[]=['projects','about','music','terminal','paint','contact'];
function Window({win}:{win:Win}){
 const {close,focus,minimize,maximize,move}=useDesktop();const start=useRef<{px:number;py:number;x:number;y:number}|null>(null);
 useEffect(()=>{function onMove(e:PointerEvent){if(start.current)move(win.id,Math.max(0,start.current.x+e.clientX-start.current.px),Math.max(0,start.current.y+e.clientY-start.current.py));}function onUp(){start.current=null;}window.addEventListener('pointermove',onMove);window.addEventListener('pointerup',onUp);return()=>{window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);};},[move,win.id]);
 if(win.minimized)return null;
 
 return <section className={'xp-window '+(win.maximized?'maximized':'')} style={win.maximized?{zIndex:win.z}:{left:win.x,top:win.y,width:win.w,height:win.h,zIndex:win.z}} onPointerDown={()=>focus(win.id)} aria-label={titles[win.id]}>
 <div className="window-title" onPointerDown={e=>{if(win.maximized|| (e.target as HTMLElement).closest('button'))return;start.current={px:e.clientX,py:e.clientY,x:win.x,y:win.y};}} onDoubleClick={()=>maximize(win.id)}><span className="title-label"><XPImg id={win.id} size={17}/>{titles[win.id]}</span><div className="window-buttons"><button aria-label="Minimizar" onClick={()=>minimize(win.id)}><Minus size={13}/></button><button aria-label="Maximizar" onClick={()=>maximize(win.id)}>{win.maximized?<Maximize2 size={12}/>:<Square size={12}/>}</button><button className="close-btn" aria-label="Cerrar" onClick={()=>close(win.id)}><X size={14}/></button></div></div>
 <div className="window-content">{win.id==='welcome'?<Welcome/>:win.id==='projects'?<Projects/>:win.id==='about'?<About/>:win.id==='music'?<Music/>:win.id==='terminal'?<Terminal/>:win.id==='paint'?<Paint/>:<Contact/>}</div></section>;
}
function Welcome(){
  const open=useDesktop(s=>s.open);
  const [expandedPanels,setExpandedPanels]=useState({tasks:true,places:true,details:true});
  const togglePanel=(panel:'tasks'|'places'|'details')=>setExpandedPanels(prev=>({...prev,[panel]:!prev[panel]}));
  const actions: {id:AppId;title:string;detail:string}[] = [
    {id:'projects',title:'Explore my projects',detail:"Check out what I've built"},
    {id:'about',title:'Get to know me',detail:'A little more about who I am'},
    {id:'music',title:'Listen to some music',detail:'Open Valenamp'},
    {id:'terminal',title:'Open the terminal',detail:'Try some commands'},
  ];
  return <div className="welcome-xp">
    <header className="welcome-xp-banner"><div className="welcome-xp-brand"><img className="welcome-xp-butterfly" src="/icons/valenos-butterfly.svg" alt="" /><div><h1>ValenOS</h1><p>a place where code and music meet</p></div></div></header>
    <div className="welcome-xp-layout">
      <aside className="welcome-xp-sidebar" aria-label="Windows XP task pane">
        <section className="welcome-xp-sidebox">
          <button type="button" className="welcome-xp-panel-heading" aria-expanded={expandedPanels.places} onClick={()=>togglePanel('places')}>
            <span>Other Places</span><span className={'welcome-xp-panel-chevron '+(expandedPanels.places?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span>
          </button>
          {expandedPanels.places&&<div className="welcome-xp-panel-body">
            <button type="button" className="welcome-xp-side-link" onClick={()=>open('projects')}><XPImg id="projects" size={17}/>My Projects</button>
            <button type="button" className="welcome-xp-side-link" onClick={()=>open('about')}><XPImg id="about" size={17}/>About Me.txt</button>
            <button type="button" className="welcome-xp-side-link" onClick={()=>open('paint')}><XPImg id="paint" size={17}/>Paint</button>
            <button type="button" className="welcome-xp-side-link" onClick={()=>open('contact')}><XPImg id="contact" size={17}/>Contact</button>
          </div>}
        </section>
        <section className="welcome-xp-sidebox welcome-xp-details">
          <button type="button" className="welcome-xp-panel-heading" aria-expanded={expandedPanels.details} aria-controls="valenos-details-content" onClick={()=>togglePanel('details')}>
            <span>Details</span><span className={'welcome-xp-panel-chevron '+(expandedPanels.details?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span>
          </button>
          {expandedPanels.details&&<div id="valenos-details-content" className="welcome-xp-panel-body welcome-xp-details-body">
            <strong>ValenOS</strong>
            <span>Personal portfolio</span>
            <span>Version 1.0</span>
          </div>}
        </section>
      </aside>
      <main className="welcome-xp-main">
        <h2>Choose a task...</h2>
        <div className="welcome-xp-tasks">{actions.map(a=><button key={a.id} onClick={()=>open(a.id)}><span className="welcome-xp-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="23" height="23" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="welcome-xp-task-text"><b>{a.title}</b><small>{a.detail}</small></span></button>)}</div>
        <p className="welcome-xp-footer">made with curiosity, code &amp; music ♡</p>
      </main>
    </div>
  </div>;
}
type ProjectKey = 'valenshop' | 'valenos';
const projectData: Record<ProjectKey,{name:string;type:string;description:string;stack:string;repo:string;demo:string}> = {
  valenshop: {
    name:'ValenShop', type:'Full-stack e-commerce · In development',
    description:'An e-commerce platform for retail and wholesale shopping, with a responsive product catalog, categories, sizes and product variants. Built with a separate backend API.',
    stack:'Next.js · React · TypeScript · Fastify · PostgreSQL',
    repo:'https://github.com/Valenkra/E-commerce', demo:'https://valenkra-ecommerce.vercel.app/'
  },
  valenos: {
    name:'ValenOS', type:'Interactive portfolio',
    description:'A nostalgic interactive portfolio inspired by Windows XP, with draggable application windows, desktop shortcuts and custom interfaces.',
    stack:'React · TypeScript · Vite · Zustand',
    repo:'https://github.com/Valenkra/Valenkra', demo:'https://valenkra.github.io/'
  }
};
function Projects(){
  const [selected,setSelected]=useState<ProjectKey|null>(null);
  const [expanded,setExpanded]=useState({tasks:true,places:true,details:true});
  const toggle=(key:'tasks'|'places'|'details')=>setExpanded(s=>({...s,[key]:!s[key]}));
  const item=selected?projectData[selected]:null;
  const folder=(id:ProjectKey)=><button type="button" key={id} className={'xp-project-folder '+(selected===id?'is-selected':'')} onClick={()=>setSelected(id)} onDoubleClick={()=>setSelected(id)} aria-label={'Open '+projectData[id].name}>
    <img src="/icons/xp/folder.png" width="45" height="45" alt=""/><span>{projectData[id].name}</span>
  </button>;
  return <div className="xp-project-explorer">
    <div className="xp-project-menu">File　 Edit　 View　 Favorites　 Tools　 Help</div>
    <div className="xp-project-toolbar"><button type="button" onClick={()=>setSelected(null)} disabled={!selected}>◀ <span>Back</span></button><span className="xp-project-toolbar-sep"/><span>📁 Folders</span><span className="xp-project-toolbar-sep"/><span>⌕ Search</span></div>
    <div className="xp-project-address"><span>Address</span><div><img src="/icons/xp/projects.png" alt="" width="15" height="15"/> My Projects{item?' / '+item.name:''}</div></div>
    <div className="xp-project-content">
      <aside className="xp-project-sidebar" aria-label="Project tasks">
        <section className="xp-project-sidebox"><button className="xp-project-sideheading" onClick={()=>toggle('tasks')} aria-expanded={expanded.tasks}><span>Project Tasks</span><span className={'xp-project-chevron '+(expanded.tasks?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>{expanded.tasks&&<div className="xp-project-sidebody"><button onClick={()=>setSelected('valenshop')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View ValenShop</button><button onClick={()=>setSelected('valenos')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View ValenOS</button>{selected==='valenshop'&&item&&<a href={item.repo} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/>Source code</a>}</div>}</section>
        <section className="xp-project-sidebox"><button className="xp-project-sideheading" onClick={()=>toggle('places')} aria-expanded={expanded.places}><span>Other Places</span><span className={'xp-project-chevron '+(expanded.places?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>{expanded.places&&<div className="xp-project-sidebody"><button onClick={()=>setSelected(null)}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>My Projects</button><a href="https://github.com/Valenkra" target="_blank" rel="noopener noreferrer"><Github size={16}/>GitHub</a></div>}</section>
        <section className="xp-project-sidebox"><button className="xp-project-sideheading" onClick={()=>toggle('details')} aria-expanded={expanded.details}><span>Details</span><span className={'xp-project-chevron '+(expanded.details?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>{expanded.details&&<div className="xp-project-sidebody xp-project-side-details"><strong>{item?.name??'My Projects'}</strong><span>{item?.type??'2 project folders'}</span></div>}</section>
      </aside>
      <main className="xp-project-main">{!item?<><div className="xp-project-group-title">Files Stored in This Folder</div><div className="xp-project-folders">{folder('valenshop')}{folder('valenos')}</div><p className="xp-project-hint">Select a folder to view its details.</p></>:<>
        <div className="xp-project-detail-title"><img src="/icons/xp/folder.png" alt="" width="44" height="44"/><div><h2>{item.name}</h2><span>{item.type}</span></div></div>
        <div className="xp-project-group-title">Description</div><p className="xp-project-description">{item.description}</p>
        <div className="xp-project-group-title">Technologies</div><p className="xp-project-description">{item.stack}</p>
        {selected==='valenshop'&&<><div className="xp-project-group-title">Links</div><div className="xp-project-links"><a href={item.demo} target="_blank" rel="noopener noreferrer">🌐 Visit live website ↗</a><a href={item.repo} target="_blank" rel="noopener noreferrer">📁 View source code ↗</a></div></>}
      </>}</main>
    </div>
    <div className="xp-project-status">{item?'1 object selected':'2 objects'}</div>
  </div>;
}

function About() {
  return (
    <div className="notepad">
      <div className="notepad-menu">
        File　 Edit　 Format　 View　 Help
      </div>

      <div className="notepad-text">
        <p>Hey there! It's Valen :)</p>

        <p>
          I'm a Computer Science student who loves
          bringing technology, design, and creativity
          together.
        </p>

        <p>
          I'm passionate about music, exploring new
          technologies, and turning ideas into
          real-world projects.
        </p>

        <p>
          This portfolio is my little corner of the internet, 
          designed to capture my journey in tech. 
          It takes me back to where it all started: 
          just me and an old PC running Windows XP.
        </p>

        <p>
          Thank you for stopping by! Feel free to explore my projects, 
          listen to some tunes, or just say hi.
        </p>

        <span className="cursor">▍</span>
      </div>
    </div>
  );
}
function Music() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [position, setPosition] = useState(0);
  const [section, setSection] = useState('Now Playing');
  const sections = ['Now Playing', 'Media Guide', 'Copy from CD', 'Media Library', 'Radio Tuner', 'Copy to CD or Device'];
  return (
    <div className="wmp9">
      <div className="wmp9-menubar"><span>File</span><span>View</span><span>Play</span><span>Tools</span><span>Help</span></div>
      <div className="wmp9-shell">
        <div className="wmp9-topline"><span className="wmp9-back">‹</span><div className="wmp9-view">▶ &nbsp; {section} <span>⌄</span></div></div>
        <div className="wmp9-main">
          <nav className="wmp9-sidebar" aria-label="Media Player sections">
            {sections.map(s => <button key={s} className={section === s ? 'active' : ''} onClick={() => setSection(s)}>{s}{section === s && <span>›</span>}</button>)}
            <span className="wmp9-sidebar-bottom">⌄</span>
          </nav>
          <div className="wmp9-content">
            {section === 'Now Playing' ? <>
              <div className="wmp9-visual"><div className="wmp9-visual-inner"><span className="wmp9-visual-note">♫</span></div></div>
              <div className="wmp9-information"><div className="wmp9-placeholder-art">♫</div><div className="wmp9-track">No Better <small>Lorde · Coming soon</small></div></div>
            </> : <div className="wmp9-empty"><strong>{section}</strong><p>This section is coming soon.</p></div>}
          </div>
        </div>
        <div className="wmp9-status"><span>▣</span><button onClick={() => setPlaying(false)}>◀</button><button onClick={() => setPlaying(false)}>▶</button><span>{playing ? 'Playing preview (visual only)' : 'Ready'} · No Better — Lorde</span><span className="wmp9-status-end">▣ &nbsp; ▤</span></div>
        <div className="wmp9-seek"><span>◀◀</span><input aria-label="Playback position (visual demo)" type="range" min="0" max="100" value={position} onChange={e => setPosition(Number(e.target.value))}/><span>▶▶</span></div>
        <div className="wmp9-controls">
          <button className="wmp9-play" aria-label={playing ? 'Pause visual demo' : 'Play visual demo'} onClick={() => setPlaying(v => !v)}>{playing ? <Pause size={19}/> : <Play size={19}/>}</button>
          <button aria-label="Stop visual demo" onClick={() => {setPlaying(false);setPosition(0);}}><Square size={12}/></button>
          <button aria-label="Previous track" onClick={() => setPosition(0)}>◀❙</button>
          <button aria-label="Next track" onClick={() => setPosition(0)}>❙▶</button>
          <Volume2 size={17}/><input className="wmp9-volume" aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))}/>{volume === 0 && <VolumeX size={15}/>}
          <span className="wmp9-controls-spacer"/><span className="wmp9-demo">Visual demo · No audio yet</span>
        </div>
      </div>
    </div>
  );
}
function Terminal(){const [lines,setLines]=useState<string[]>(['ValenOS [Version 1.0.0]','(c) 2026 Valen. All rights reserved.','','Type "help" for available commands.']);const [cmd,setCmd]=useState('');const answers:Record<string,string>={help:'Available commands: help, whoami, skills, projects, music, contact, clear',whoami:'Valen — informática, código, música y creatividad.',skills:'React · TypeScript · JavaScript · y mucho por aprender',projects:'Abrí My Projects desde el escritorio.',music:'Abrí Valenamp desde el escritorio.',contact:'Abrí Contact desde el escritorio.'};return <div className="terminal-body" onClick={()=>document.getElementById('cmd-input')?.focus()}>{lines.map((l,i)=><div key={i}>{l||'\u00a0'}</div>)}<form onSubmit={e=>{e.preventDefault();const c=cmd.trim().toLowerCase();setLines(old=>c==='clear'?[]:[...old,`C:\\Users\\Valen> ${cmd}`,answers[c]??`'${cmd}' is not recognized as a command.`]);setCmd('');}}><span>C:\Users\Valen&gt;</span><input id="cmd-input" autoComplete="off" value={cmd} onChange={e=>setCmd(e.target.value)} aria-label="Comando de terminal"/></form></div>}
function Paint(){
  const canvas=useRef<HTMLCanvasElement>(null);
  const drawing=useRef(false);
  const [color,setColor]=useState('#000000');
  const [tool,setTool]=useState<'pencil'|'brush'|'eraser'>('pencil');
  const colors=['#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080','#808040','#004040','#0080ff','#004080','#4000ff','#804000','#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#ffff80','#80ff80','#80ffff','#8080ff','#ff80ff','#ff8040'];
  function draw(e:React.PointerEvent<HTMLCanvasElement>){
    if(!drawing.current)return;
    const c=canvas.current;if(!c)return;
    const rect=c.getBoundingClientRect();const ctx=c.getContext('2d');if(!ctx)return;
    const x=(e.clientX-rect.left)*c.width/rect.width;
    const y=(e.clientY-rect.top)*c.height/rect.height;
    ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=tool==='eraser'?17:tool==='brush'?7:2;
    ctx.strokeStyle=tool==='eraser'?'#ffffff':color;
    ctx.lineTo(x,y);ctx.stroke();ctx.beginPath();ctx.moveTo(x,y);
  }
  const clear=()=>{const c=canvas.current;if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;ctx.clearRect(0,0,c.width,c.height);};
  return <div className="paint-xp">
    <div className="paint-xp-menu"><span>File</span><span>Edit</span><span>View</span><span>Image</span><span>Colors</span><span>Help</span></div>
    <div className="paint-xp-workspace">
      <div className="paint-xp-tools" aria-label="Paint tools">
        <button type="button" title="Free-form select" disabled>⌁</button><button type="button" title="Select" disabled>▧</button>
        <button type="button" title="Eraser" aria-pressed={tool==='eraser'} className={tool==='eraser'?'active':''} onClick={()=>setTool('eraser')}>▱</button><button type="button" title="Fill" disabled>◈</button>
        <button type="button" title="Eyedropper" disabled>♢</button><button type="button" title="Magnifier" disabled>⌕</button>
        <button type="button" title="Pencil" aria-pressed={tool==='pencil'} className={tool==='pencil'?'active':''} onClick={()=>setTool('pencil')}>✎</button><button type="button" title="Brush" aria-pressed={tool==='brush'} className={tool==='brush'?'active':''} onClick={()=>setTool('brush')}>🖌</button>
        <button type="button" title="Airbrush" disabled>✺</button><button type="button" title="Text" disabled>A</button>
        <button type="button" title="Line" disabled>╱</button><button type="button" title="Curve" disabled>⌁</button>
        <button type="button" title="Rectangle" disabled>▭</button><button type="button" title="Polygon" disabled>⬠</button>
        <button type="button" title="Ellipse" disabled>◯</button><button type="button" title="Rounded rectangle" disabled>▢</button>
      </div>
      <div className="paint-xp-canvas-frame"><div className="paint-xp-canvas-sheet"><canvas ref={canvas} width={1100} height={740} aria-label="Paint drawing canvas" onPointerDown={e=>{drawing.current=true;e.currentTarget.setPointerCapture(e.pointerId);const ctx=canvas.current?.getContext('2d');ctx?.beginPath();draw(e);}} onPointerMove={draw} onPointerUp={()=>{drawing.current=false;canvas.current?.getContext('2d')?.beginPath();}} onPointerCancel={()=>{drawing.current=false;canvas.current?.getContext('2d')?.beginPath();}}/></div></div>
    </div>
    <div className="paint-xp-bottom"><div className="paint-xp-current"><span style={{background:color}}/><span style={{background:'#ffffff'}}/></div><div className="paint-xp-palette">{colors.map((c,i)=><button type="button" key={i} title={'Color '+c} aria-label={'Color '+c} className={color===c?'active':''} style={{background:c}} onClick={()=>setColor(c)}/>)}</div><button type="button" className="paint-xp-clear" onClick={clear}>Clear</button></div>
    <div className="paint-xp-status">For Help, click Help Topics on the Help Menu. <span>{tool==='eraser'?'Eraser':tool==='brush'?'Brush':'Pencil'} selected</span></div>
  </div>;
}

function Contact(){
  const [openPanels,setOpenPanels]=useState({tasks:true,details:true});
  const toggle=(key:'tasks'|'details')=>setOpenPanels(s=>({...s,[key]:!s[key]}));
  return <div className="contact-xp">
    <div className="contact-xp-menu">File　 Edit　 View　 Favorites　 Tools　 Help</div>
    <div className="contact-xp-bar"><img src="/icons/xp/contact.png" width="19" height="19" alt=""/><span>Contact</span><span className="contact-xp-bar-separator"/>My contact information</div>
    <div className="contact-xp-layout">
      <aside className="contact-xp-sidebar" aria-label="Contact sidebar">
        <section className="welcome-xp-sidebox">
          <button type="button" className="welcome-xp-panel-heading" onClick={()=>toggle('tasks')} aria-expanded={openPanels.tasks}><span>Contact Tasks</span><span className={'welcome-xp-panel-chevron '+(openPanels.tasks?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>
          {openPanels.tasks&&<div className="contact-xp-sidebody"><a href="https://github.com/Valenkra" target="_blank" rel="noopener noreferrer"><img src="/icons/xp/projects.png" width="16" height="16" alt=""/>View GitHub profile</a><a href="https://www.linkedin.com/in/valenkra/" target="_blank" rel="noopener noreferrer"><img src="/icons/xp/about.png" width="16" height="16" alt=""/>View LinkedIn profile</a></div>}
        </section>
        <section className="welcome-xp-sidebox">
          <button type="button" className="welcome-xp-panel-heading" onClick={()=>toggle('details')} aria-expanded={openPanels.details}><span>Details</span><span className={'welcome-xp-panel-chevron '+(openPanels.details?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>
          {openPanels.details&&<div className="contact-xp-side-details"><strong>Valen</strong><span>Computer Science student</span><span>Open to connecting</span></div>}
        </section>
      </aside>
      <main className="contact-xp-main">
        <div className="contact-xp-heading"><img src="/icons/xp/contact.png" width="36" height="36" alt=""/><div><h2>Let's connect!</h2><p>I'd love to hear from you.</p></div></div>
        <div className="contact-xp-section-title">Find me online</div>
        <a className="contact-xp-link" href="https://github.com/Valenkra" target="_blank" rel="noopener noreferrer"><img src="/icons/xp/projects.png" width="28" height="28" alt=""/><span><strong>GitHub</strong><small>github.com/Valenkra</small></span><ExternalLink size={13}/></a>
        <a className="contact-xp-link" href="https://www.linkedin.com/in/valenkra/" target="_blank" rel="noopener noreferrer"><img src="/icons/xp/about.png" width="28" height="28" alt=""/><span><strong>LinkedIn</strong><small>linkedin.com/in/valenkra/</small></span><ExternalLink size={13}/></a>
        <p className="contact-xp-note">Thanks for stopping by my little corner of the internet! ♡</p>
      </main>
    </div>
    <div className="contact-xp-status">Contact · ValenOS</div>
  </div>;
}
function Clock(){const [now,setNow]=useState(new Date());useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);return <span>{now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}</span>}
export default function App(){const {windows,open,focus,minimize}=useDesktop();const [startOpen,setStartOpen]=useState(false);const [selected,setSelected]=useState<AppId|null>(null);return <div className="desktop" onClick={()=>{if(startOpen)setStartOpen(false);}}><div className="desktop-shine"/><div className="desktop-icons">{desktopItems.map(id=>{return <button key={id} className={'desktop-icon '+(selected===id?'selected':'')} onClick={()=>setSelected(id)} onDoubleClick={()=>open(id)}><span className={'desktop-icon-art icon-'+id}><XPImg id={id} size={34}/></span><span>{titles[id]}</span></button>})}</div><div className="mobile-launcher"><span>Open an app</span>{desktopItems.map(id=>{return <button key={id} onClick={()=>open(id)}><XPImg id={id} size={56}/><span>{titles[id]}</span></button>})}</div>{windows.map(w=><Window key={w.id} win={w}/>)}{startOpen&&<div className="start-menu" onClick={e=>e.stopPropagation()}><div className="start-header"><div className="avatar"><img src="/icons/xp/user.png" alt="" width="34" height="34" /></div><strong>Valencha</strong></div><div className="start-items">{desktopItems.map(id=>{return <button key={id} onClick={()=>{open(id);setStartOpen(false);}}><XPImg id={id} size={27}/>{titles[id]}</button>})}</div><div className="start-bottom"><button onClick={()=>setStartOpen(false)}><Power size={16}/> Close menu</button></div></div>}<footer className="taskbar"><button className="start-button" onClick={e=>{e.stopPropagation();setStartOpen(s=>!s);}}><img className="start-custom-icon" src="/icons/xp/valenos-start.png" alt="" /> <span>start</span></button><div className="task-items">{windows.map(w=>{return <button key={w.id} className={!w.minimized?'task-active':''} onClick={()=>w.minimized?focus(w.id):minimize(w.id)}><XPImg id={w.id} size={19}/><span>{titles[w.id]}</span></button>})}</div><div className="tray"><img src="/icons/xp/volume.png" alt="" width="20" height="20"/><Clock/></div></footer><div className="desktop-hint"><Monitor size={14}/> Double click an icon to open it</div></div>}
