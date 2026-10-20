import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { certifications } from '../data/certifications';

export function Certifications(){
 const [selected,setSelected]=useState<string|null>(null);
 const [opened,setOpened]=useState<string|null>(null);
 const current=certifications.find(c=>c.id===opened);
 return <div className="certs-explorer">
  <div className="skills-folder-menu">File　 Edit　 View　 Favorites　 Tools　 Help</div>
  <div className="skills-folder-toolbar"><img src="/icons/xp/folder.png" width="19" height="19" alt=""/> Certifications <span>·</span> Double-click a certificate to view</div>
  <div className="skills-folder-address"><span>Address</span><div><img src="/icons/xp/folder.png" width="15" height="15" alt=""/> Certifications</div></div>
  <div className="certs-workspace">
   <div className="certs-files">{certifications.map(c=><button type="button" key={c.id} className={'certs-file '+(selected===c.id?'is-selected':'')} onClick={()=>setSelected(c.id)} onDoubleClick={()=>{setSelected(c.id);setOpened(c.id);}} aria-label={'Open '+c.name}>
     <img src="/icons/xp/certificate-xp.png" width="35" height="35" alt="" draggable={false}/><span>{c.name}</span>
    </button>)}</div>
   {current&&<section className="certs-preview" aria-label="Certificate details"><div className="certs-preview-heading"><span>{current.award?'Award details':'Certificate details'}</span><button type="button" aria-label="Close details" onClick={()=>setOpened(null)}>×</button></div><div className="certs-preview-body"><div className="certs-preview-icon"><img src="/icons/xp/certificate-xp.png" width="39" height="39" alt="" draggable={false}/></div><strong>{current.name}</strong><dl><dt>Issued by:</dt><dd>{current.issuer}</dd><dt>Issued:</dt><dd>{current.date}</dd>{current.credentialId&&<><dt>Credential ID:</dt><dd>{current.credentialId}</dd></>}</dl><p>{current.detail}</p>{current.url?<a className="certs-view" href={current.url} target="_blank" rel="noopener noreferrer"><ExternalLink size={13}/> View credential</a>:<p className="certs-no-link">Verification link not yet added.</p>}</div></section>}
  </div>
  <div className="skills-folder-status"><span>{certifications.length} objects</span>{selected&&<button type="button" onClick={()=>setOpened(selected)}>Open selected</button>}</div>
 </div>;
}
