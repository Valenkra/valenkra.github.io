import { useState } from 'react';
import { ChevronRight, ExternalLink, Github } from 'lucide-react';
import { projectData, type ProjectKey } from '../data/projects';

export function Projects(){
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
        <section className="xp-project-sidebox"><button className="xp-project-sideheading" onClick={()=>toggle('tasks')} aria-expanded={expanded.tasks}><span>Project Tasks</span><span className={'xp-project-chevron '+(expanded.tasks?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>{expanded.tasks&&<div className="xp-project-sidebody"><button onClick={()=>setSelected('valenshop')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View ValenShop</button><button onClick={()=>setSelected('valenos')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View ValenOS</button><button onClick={()=>setSelected('wordle')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View Wordle C++</button><button onClick={()=>setSelected('progress')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View Progress Tracker</button><button onClick={()=>setSelected('caete')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View Caéte</button><button onClick={()=>setSelected('finaldeeventos')}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>View FinalDeEventos</button>{selected!==null&&selected!=='valenos'&&item&&item.repo&&<a href={item.repo} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/>Source code</a>}</div>}</section>
        <section className="xp-project-sidebox"><button className="xp-project-sideheading" onClick={()=>toggle('places')} aria-expanded={expanded.places}><span>Other Places</span><span className={'xp-project-chevron '+(expanded.places?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>{expanded.places&&<div className="xp-project-sidebody"><button onClick={()=>setSelected(null)}><img src="/icons/xp/folder.png" width="17" height="17" alt=""/>My Projects</button><a href="https://github.com/Valenkra" target="_blank" rel="noopener noreferrer"><Github size={16}/>GitHub</a></div>}</section>
        <section className="xp-project-sidebox"><button className="xp-project-sideheading" onClick={()=>toggle('details')} aria-expanded={expanded.details}><span>Details</span><span className={'xp-project-chevron '+(expanded.details?'is-open':'')} aria-hidden="true"><ChevronRight size={12} strokeWidth={2.5}/></span></button>{expanded.details&&<div className="xp-project-sidebody xp-project-side-details"><strong>{item?.name??'My Projects'}</strong><span>{item?.type??'6 project folders'}</span></div>}</section>
      </aside>
      <main className="xp-project-main">{!item?<><div className="xp-project-group-title">Files Stored in This Folder</div><div className="xp-project-folders">{folder('valenshop')}{folder('valenos')}{folder('wordle')}{folder('progress')}{folder('caete')}{folder('finaldeeventos')}</div><p className="xp-project-hint">Select a folder to view its details.</p></>:<>
        <div className="xp-project-detail-title"><img src="/icons/xp/folder.png" alt="" width="44" height="44"/><div><h2>{item.name}</h2><span>{item.type}</span></div></div>
        <div className="xp-project-group-title">Description</div><p className="xp-project-description">{item.description}</p>
        <div className="xp-project-group-title">Technologies</div><p className="xp-project-description">{item.stack}</p>
        {selected!=='valenos'&&<><div className="xp-project-group-title">Links</div><div className="xp-project-links">{item.demo&&<a href={item.demo} target="_blank" rel="noopener noreferrer"><img src="/icons/xp/welcome.png" alt="" width="18" height="18"/><span>Visit live website</span></a>}{item.repo&&<a href={item.repo} target="_blank" rel="noopener noreferrer"><img src="/icons/xp/projects.png" alt="" width="18" height="18"/><span>View source code</span></a>}</div></>}
      </>}</main>
    </div>
    <div className="xp-project-status">{item?'1 object selected':'6 objects'}</div>
  </div>;
}
