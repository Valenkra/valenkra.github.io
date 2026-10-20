import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { AppId } from '../desktop/types';
import { useDesktop } from '../desktop/store';
import { XPImg } from '../desktop/XPImg';

export function Welcome(){
  const open=useDesktop(s=>s.open);
  const [expandedPanels,setExpandedPanels]=useState({tasks:true,places:true,details:true});
  const togglePanel=(panel:'tasks'|'places'|'details')=>setExpandedPanels(prev=>({...prev,[panel]:!prev[panel]}));
  const actions: {id:AppId;title:string;detail:string}[] = [
    {id:'projects',title:'Explore my projects',detail:"Check out what I've built"},
    {id:'about',title:'Get to know me',detail:'A little more about who I am'},
    {id:'music',title:'Listen to some music',detail:'Open Valenkramp'},
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
