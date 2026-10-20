import { useEffect, useState } from 'react';

export function Clock(){const [now,setNow]=useState(new Date());useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);return <span>{now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}</span>}
