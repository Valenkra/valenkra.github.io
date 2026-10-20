import type { AppId } from './types';

export const XP={welcome:'/icons/xp/welcome.png',projects:'/icons/xp/projects.png',about:'/icons/xp/about.png',music:'/icons/xp/music.png',terminal:'/icons/xp/terminal.png',paint:'/icons/xp/paint.png',contact:'/icons/xp/contact.png'} as const;
export const titles:Record<AppId,string>={welcome:'Welcome to ValenOS',projects:'My Projects',about:'About Me.txt',music:'Valenkramp',terminal:'Terminal',paint:'Paint',contact:'Contact'};
export const desktopItems:AppId[]=['projects','about','music','terminal','paint','contact'];
