import { create } from 'zustand';
import { initial, type Store } from './types';

export const useDesktop = create<Store>((set)=>({
 windows:[{id:'welcome',...initial.welcome,minimized:false,maximized:false,z:1}],top:1,
 open:id=>set(s=>{const exists=s.windows.find(w=>w.id===id);const top=s.top+1;return {top,windows:exists?s.windows.map(w=>w.id===id?{...w,minimized:false,z:top}:w):[...s.windows,{id,...initial[id],minimized:false,maximized:false,z:top}]};}),
 close:id=>set(s=>({windows:s.windows.filter(w=>w.id!==id)})),
 focus:id=>set(s=>({top:s.top+1,windows:s.windows.map(w=>w.id===id?{...w,z:s.top+1,minimized:false}:w)})),
 minimize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,minimized:true}:w)})),
 maximize:id=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,maximized:!w.maximized}:w)})),
 move:(id,x,y)=>set(s=>({windows:s.windows.map(w=>w.id===id?{...w,x,y}:w)}))
}));
