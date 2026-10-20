import { useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';

export function Contact(){
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
