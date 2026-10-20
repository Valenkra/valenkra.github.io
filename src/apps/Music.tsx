import { useState } from 'react';
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';

export function Music() {
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
