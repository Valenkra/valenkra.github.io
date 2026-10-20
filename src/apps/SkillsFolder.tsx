import { useState } from 'react';
import { SKILL_EXECUTABLES, type SkillCategory } from './SkillsPopups';

export function SkillsFolder({onLaunch}:{onLaunch:(category:SkillCategory)=>void}){
  const [selected,setSelected]=useState<SkillCategory|null>(null);
  return <div className="skills-folder">
    <div className="skills-folder-menu">File　 Edit　 View　 Favorites　 Tools　 Help</div>
    <div className="skills-folder-toolbar"><img src="/icons/xp/folder.png" width="19" height="19" alt=""/> Skills <span>·</span> Double-click an executable to run</div>
    <div className="skills-folder-address"><span>Address</span><div><img src="/icons/xp/folder.png" width="15" height="15" alt=""/> Skills</div></div>
    <div className="skills-folder-files">{SKILL_EXECUTABLES.map(exe=><button key={exe.id} type="button" className={'skills-folder-file '+(selected===exe.id?'is-selected':'')} onClick={()=>setSelected(exe.id)} onDoubleClick={()=>onLaunch(exe.id)} aria-label={'Run '+exe.name}>
      <img src="/icons/xp/skills.png" width="38" height="38" alt=""/><span>{exe.name}</span>
    </button>)}</div>
    <div className="skills-folder-status"><span>{SKILL_EXECUTABLES.length} objects</span>{selected&&<button type="button" onClick={()=>onLaunch(selected)}>▶ Run {SKILL_EXECUTABLES.find(exe=>exe.id===selected)?.name}</button>}</div>
  </div>;
}
