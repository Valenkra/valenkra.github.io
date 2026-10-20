import { create } from 'zustand';
import { initial, type Store } from './types';

// Keep the title bar visible when opening windows on shorter desktop viewports.
const openingPosition = (id: keyof typeof initial) => {
 const base = initial[id];
 if (typeof window === 'undefined' || window.innerWidth <= 700) return base;
 const usableHeight = Math.max(120, window.innerHeight - 42);
 return { ...base, y: Math.max(8, Math.min(base.y, usableHeight - Math.min(base.h, usableHeight) - 8)) };
};

export const useDesktop = create<Store>((set)=>({
 windows:[{id:'welcome',...openingPosition('welcome'),minimized:false,maximized:false,z:1}],top:1,
 open:id=>set(s=>{const exists=s.windows.find(w=>w.id===id);const top=s.top+1;return {top,windows:exists?s.windows.map(w=>w.id===id?{...w,minimized:false,z:top}:w):[...s.windows,{id,...openingPosition(id),minimized:false,maximized:false,z:top}]};}),
 close:id=>set(s=>({windows:s.windows.filter(w=>w.id!==id)})),
 focus:id=>set(s=>({top:s.top+1,windows:s.windows.map(w=>w.id===id?{...w,z:s.top+1,minimized:false}:w)})),
 minimize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,minimized:true}:w)})),
 maximize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,maximized:!w.maximized}:w)})),
 move:(id,x,y)=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,x,y}:w)}))
}));
