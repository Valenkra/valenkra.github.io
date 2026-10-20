import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

export function Paint(){
  const canvas=useRef<HTMLCanvasElement>(null);
  const drawing=useRef(false);
  const [color,setColor]=useState('#000000');
  const [tool,setTool]=useState<'pencil'|'brush'|'eraser'>('pencil');
  const colors=['#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080','#808040','#004040','#0080ff','#004080','#4000ff','#804000','#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#ffff80','#80ff80','#80ffff','#8080ff','#ff80ff','#ff8040'];
  function draw(e:ReactPointerEvent<HTMLCanvasElement>){
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
