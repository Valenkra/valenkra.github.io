import { useEffect, useRef, useState } from 'react';

import skillExperience from '../data/skillExperience.json';

// Editá src/data/skillExperience.json para actualizar proyectos y experiencia.
export const SKILL_GROUPS = skillExperience;
export type SkillCategory = keyof typeof SKILL_GROUPS;
export const SKILL_EXECUTABLES: { id: SkillCategory; name: string; description: string }[] = [
  {id:'frontend',name:'frontend.exe',description:'Web interfaces and styling'},
  {id:'backend',name:'backend.exe',description:'Servers and APIs'},
  {id:'databases',name:'databases.exe',description:'Data and persistence'},
  {id:'languages',name:'languages.exe',description:'Programming languages'},
  {id:'tools',name:'tools.exe',description:'Development tools'},
];
type SkillPopup = {id:number;name:string;experience:string;x:number;y:number;z:number;closed:boolean};
const POPUP_WIDTH = 360;
const POPUP_HEIGHT = 190;

export function SkillsPopups({launch}:{launch:{category:SkillCategory;run:number}|null}){
  const [popups,setPopups]=useState<SkillPopup[]>([]);
  const drag=useRef<{id:number;startX:number;startY:number;x:number;y:number}|null>(null);
  const topZ=useRef(1);

  useEffect(()=>{
    if(!launch)return;
    const entries=Object.entries(SKILL_GROUPS[launch.category]);
    const availableWidth=Math.max(280,window.innerWidth-24);
    const availableHeight=Math.max(180,window.innerHeight-54);
    const popupWidth=Math.min(POPUP_WIDTH,availableWidth);
    const columns=Math.max(1,Math.floor((availableWidth+12)/(popupWidth+12)));
    const rows=Math.ceil(entries.length/columns);
    const gapX=12;
    const gapY=12;
    const startX=Math.max(8,Math.floor((window.innerWidth-Math.min(columns,entries.length)*popupWidth-(Math.min(columns,entries.length)-1)*gapX)/2));
    const startY=Math.max(8,Math.floor((availableHeight-rows*(POPUP_HEIGHT+gapY)+gapY)/2));
    topZ.current=entries.length+1;
    setPopups(entries.map(([name,experience],id)=>({
      id,name,experience:String(experience),closed:false,
      x:startX+(id%columns)*(popupWidth+gapX),
      y:startY+Math.floor(id/columns)*(POPUP_HEIGHT+gapY),z:id+1
    })));
  },[launch]);

  useEffect(()=>{
    function onMove(e:PointerEvent){
      if(!drag.current)return;
      const d=drag.current;
      setPopups(old=>old.map(p=>p.id===d.id?{...p,x:Math.max(0,Math.min(window.innerWidth-90,d.x+e.clientX-d.startX)),y:Math.max(0,Math.min(window.innerHeight-95,d.y+e.clientY-d.startY))}:p));
    }
    function onUp(){drag.current=null;}
    window.addEventListener('pointermove',onMove);
    window.addEventListener('pointerup',onUp);
    window.addEventListener('pointercancel',onUp);
    return()=>{window.removeEventListener('pointermove',onMove);window.removeEventListener('pointerup',onUp);window.removeEventListener('pointercancel',onUp);};
  },[]);

  if(!launch||!popups.some(p=>!p.closed))return null;
  const closePopup=(id:number)=>setPopups(old=>old.map(p=>p.id===id?{...p,closed:true}:p));
  const focusPopup=(id:number)=>{const z=++topZ.current;setPopups(old=>old.map(p=>p.id===id?{...p,z}:p));};
  return <div className="skills-popups" aria-label="Skill level windows">
    {popups.filter(p=>!p.closed).map(p=><section className="skills-dialog" key={`${launch.run}-${p.id}`} style={{left:p.x,top:p.y,zIndex:p.z}} onPointerDown={()=>focusPopup(p.id)} aria-label={'Skill '+p.name}>
      <div className="skills-dialog-title" onPointerDown={e=>{if((e.target as HTMLElement).closest('button'))return;drag.current={id:p.id,startX:e.clientX,startY:e.clientY,x:p.x,y:p.y};e.preventDefault();}}><span>Skill</span><button type="button" aria-label={'Close '+p.name} onClick={()=>closePopup(p.id)}>×</button></div>
      <div className="skills-dialog-content">
        <div className="skills-dialog-name">{p.name}</div>
        <div className="skills-unlocked">✓ Skill unlocked!</div>
        <div className="skills-experience"><span>Experience:</span><strong>{p.experience}</strong></div>
        <div className="skills-dialog-actions"><button type="button" className="skills-cancel" onClick={()=>closePopup(p.id)}>OK</button></div>
      </div>
    </section>)}
  </div>;
}
