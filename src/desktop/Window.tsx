import { useEffect, useRef } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import type { Win } from './types';
import { useDesktop } from './store';
import { titles } from './config';
import { XPImg } from './XPImg';
import { Welcome } from '../apps/Welcome';
import { Projects } from '../apps/Projects';
import { About } from '../apps/About';
import { Music } from '../apps/Music';
import { Terminal } from '../apps/Terminal';
import { Paint } from '../apps/Paint';
import { Contact } from '../apps/Contact';
import { SkillsFolder } from '../apps/SkillsFolder';
import { Certifications } from '../apps/Certifications';
import type { SkillCategory } from '../apps/SkillsPopups';

export function Window({win,onLaunchSkill}:{win:Win;onLaunchSkill:(category:SkillCategory)=>void}){
 const {close,focus,minimize,maximize,move}=useDesktop();const start=useRef<{px:number;py:number;x:number;y:number}|null>(null);
 useEffect(()=>{function onMove(e:PointerEvent){if(start.current)move(win.id,Math.max(0,start.current.x+e.clientX-start.current.px),Math.max(0,start.current.y+e.clientY-start.current.py));}function onUp(){start.current=null;}window.addEventListener('pointermove',onMove);window.addEventListener('pointerup',onUp);return()=>{window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);};},[move,win.id]);
 if(win.minimized)return null;
 
 return <section className={'xp-window '+(win.maximized?'maximized':'')} style={win.maximized?{zIndex:win.z}:{left:win.x,top:win.y,width:win.w,height:win.h,zIndex:win.z}} onPointerDown={()=>focus(win.id)} aria-label={titles[win.id]}>
 <div className="window-title" onPointerDown={e=>{if(win.maximized|| (e.target as HTMLElement).closest('button'))return;start.current={px:e.clientX,py:e.clientY,x:win.x,y:win.y};}} onDoubleClick={()=>maximize(win.id)}><span className="title-label"><XPImg id={win.id} size={17}/>{titles[win.id]}</span><div className="window-buttons"><button aria-label="Minimizar" onClick={()=>minimize(win.id)}><Minus size={13}/></button><button aria-label="Maximizar" onClick={()=>maximize(win.id)}>{win.maximized?<Maximize2 size={12}/>:<Square size={12}/>}</button><button className="close-btn" aria-label="Cerrar" onClick={()=>close(win.id)}><X size={14}/></button></div></div>
 <div className="window-content">{win.id==='welcome'?<Welcome/>:win.id==='projects'?<Projects/>:win.id==='about'?<About/>:win.id==='music'?<Music/>:win.id==='terminal'?<Terminal onLaunchSkill={onLaunchSkill}/>:win.id==='paint'?<Paint/>:win.id==='skills'?<SkillsFolder onLaunch={onLaunchSkill}/>:win.id==='certifications'?<Certifications/>:<Contact/>}</div></section>;
}
